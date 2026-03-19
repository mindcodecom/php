import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = "حدث خطأ غير متوقع في المنصة.";
      
      try {
        if (this.state.error?.message) {
          const firestoreError = JSON.parse(this.state.error.message);
          if (firestoreError.error) {
            errorMessage = "عذراً، لا تملك الصلاحيات الكافية للقيام بهذا الإجراء أو الوصول لهذه البيانات.";
          }
        }
      } catch (e) {
        // Not a JSON error, use default
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans" dir="rtl">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 text-center border border-slate-100">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6 mx-auto border border-red-100">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">أوبس! حدث خطأ</h2>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-3 active:scale-95"
            >
              <RefreshCw className="w-6 h-6" />
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
