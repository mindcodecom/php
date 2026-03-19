import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, onSnapshot, Timestamp, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// Firestore test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

// Error handling
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Business logic helpers
export const checkIfEmailAllowed = async (email: string) => {
  const path = 'allowed_emails';
  try {
    const q = query(collection(db, path), where("email", "==", email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as { name: string; email: string; role: string };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const createUserProfile = async (user: any, role: string, name: string) => {
  const path = `users/${user.uid}`;
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name || user.displayName || 'مستخدم جديد',
        email: user.email,
        role: role,
        photoURL: user.photoURL || null,
        createdAt: Timestamp.now()
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getUserProfile = async (uid: string) => {
  const path = `users/${uid}`;
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const recordProgress = async (uid: string, type: 'lesson' | 'module' | 'assessment' | 'activity', targetId: string, score?: number) => {
  const achievementId = `${uid}_${type}_${targetId}`;
  const path = `achievements/${achievementId}`;
  try {
    await setDoc(doc(db, 'achievements', achievementId), {
      uid,
      type,
      targetId,
      score,
      timestamp: Timestamp.now()
    });
    
    // Update user's last active
    await setDoc(doc(db, 'users', uid), { 
      lastActive: Timestamp.now() 
    }, { merge: true });
    
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getAllUsersProgress = async () => {
  const usersPath = 'users';
  const achievementsPath = 'achievements';
  try {
    const usersSnapshot = await getDocs(collection(db, usersPath));
    const achievementsSnapshot = await getDocs(collection(db, achievementsPath));
    
    const users = usersSnapshot.docs.map(doc => doc.data());
    const achievements = achievementsSnapshot.docs.map(doc => doc.data());
    
    return users.map(user => {
      const userAchievements = achievements.filter(a => a.uid === user.uid);
      return {
        ...user,
        completedLessons: userAchievements.filter(a => a.type === 'lesson').map(a => a.targetId),
        completedModules: userAchievements.filter(a => a.type === 'module').map(a => a.targetId),
        activitiesCompleted: userAchievements.filter(a => a.type === 'activity').map(a => a.targetId),
        diagnosticScore: userAchievements.find(a => a.type === 'assessment' && a.targetId === 'diagnostic')?.score,
        finalAssessmentScore: userAchievements.find(a => a.type === 'assessment' && a.targetId === 'final')?.score
      };
    });
  } catch (error) {
    console.error("Error fetching all progress:", error);
    return [];
  }
};

export const syncAllowedUsersFromSheet = async (sheetUrl: string) => {
  try {
    const response = await fetch(sheetUrl);
    const text = await response.text();
    const rows = text.split('\n').slice(1); // Skip header
    let count = 0;
    
    for (const row of rows) {
      const cols = row.split(',');
      if (cols.length >= 4) {
        const name = cols[0].trim();
        const email = cols[1].trim().toLowerCase();
        const roleCode = cols[3].trim();
        
        let role = 'student';
        if (roleCode === '1') role = 'admin';
        else if (roleCode === '3') role = 'teacher';
        
        if (email) {
          const allowedRef = doc(db, 'allowed_emails', email);
          await setDoc(allowedRef, { name, email, role });
          count++;
        }
      }
    }
    return count;
  } catch (error) {
    console.error("Error syncing from sheet:", error);
    throw error;
  }
};

export type { FirebaseUser };
