
import { Module, Lesson } from './types';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
}

export const MODULES: Module[] = [
  { 
    id: 'module-1', 
    title: 'الوحدة الأولى: أساسيات تصميم المواقع و لغة HTML', 
    description: 'مقدمة في عالم الويب، تخطيط المواقع، والتعرف على الوسوم الأساسية.',
    icon: 'Globe', 
    color: 'bg-blue-600',
    finalAssessment: [
      'ما الفرق بين ملفات .html و .php؟',
      'اذكر المكونات الأساسية لقالب صفحة HTML.',
      'ما هي وظيفة الوسم <head>؟'
    ]
  },
  { 
    id: 'module-2', 
    title: 'الوحدة الثانية: بناء محتوى الصفحة', 
    description: 'إضافة العناوين، الفقرات، الصور، والروابط التشعبية.',
    icon: 'Code', 
    color: 'bg-orange-600',
    finalAssessment: [
      'كيف ندرج صورة في صفحة الويب؟',
      'ما هو الفرق بين القوائم المرتبة <ol> وغير المرتبة <ul>؟',
      'كيف ننشئ رابطاً تشعبياً ينقلنا لصفحة أخرى؟'
    ]
  },
  { 
    id: 'module-3', 
    title: 'الوحدة الثالثة: تنسيق الصفحات باستخدام CSS', 
    description: 'تعلم كيفية تجميل وتنسيق عناصر الصفحة باستخدام لغة CSS.',
    icon: 'Layout', 
    color: 'bg-indigo-600',
    finalAssessment: [
      'ما هي الطرق الثلاث لإضافة CSS؟',
      'كيف نغير لون خلفية الصفحة؟',
      'ما هي الخاصية المستخدمة لتغيير حجم الخط؟'
    ]
  },
  { 
    id: 'module-4', 
    title: 'الوحدة الرابعة: تخطيط الصفحة المتقدم', 
    description: 'تقسيم الصفحة، استخدام المعرفات، وتنسيق الهيكل الكامل للموقع.',
    icon: 'Terminal', 
    color: 'bg-emerald-600',
    finalAssessment: [
      'ما هي وظيفة الوسم <div>؟',
      'ما الفرق بين المعرف ID والفئة Class؟',
      'كيف ننسق مقطع الـ footer في الصفحة؟'
    ]
  },
];

export const LESSONS: Lesson[] = [
  // الوحدة الأولى
  {
    id: 'm1-l1',
    moduleId: 'module-1',
    title: 'مقدمة وتخطيط الموقع',
    description: 'التعرف على لغة HTML وكيفية التخطيط لموقع ويب ناجح.',
    content: 'لغة HTML هي لغة توصيف النص التشعبي، وتعتمد على استخدام علامات مخصصة تسمى Tags. قبل البدء بالتصميم، يجب تخطيط هيكل الموقع كالمجلد الأساسي والمجلدات الفرعية (مثل images).',
    objectives: [
      'أن يعرف الطالب لغة HTML ومفهوم الوسوم.',
      'أن يدرك الطالب أهمية تخطيط الموقع قبل البدء في التنفيذ.',
      'أن يميز الطالب بين أنواع الملفات (.html, .php).'
    ],
    initialAssessment: [
      'هل تعرف ماذا يعني اختصار HTML؟',
      'لماذا نحتاج لتنظيم الصور في مجلد خاص؟'
    ],
    trainingActivities: [
      'تصفح مجلد مشروع جاهز ولاحظ أنواع الملفات.',
      'ارسم مخططاً بسيطاً لموقعك المفضل على الورق.'
    ],
    steps: [
      'فتح مجلد المشروع.',
      'ملاحظة أنواع الملفات وامتداداتها.',
      'توزيع ملفات الموقع على مجلدات حسب النوع.'
    ],
    videoUrl: 'https://example.com/videos/site-planning.mp4',
    quiz: [
      {
        id: 'm1-l1-q1',
        text: 'ماذا يعني اختصار HTML؟',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Tool Multi Language', 'Home Tool Markup Language'],
        correctAnswer: 0,
        feedback: 'HTML ترمز إلى Hyper Text Markup Language وهي اللغة الأساسية لوصف وتوصيف صفحات الويب.'
      },
      {
        id: 'm1-l1-q2',
        text: 'يتم تنظيم ملفات الصور الخاصة بالموقع عادة في مجلد يسمى "images" لسهولة إدارتها.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، تنظيم الصور في مجلد خاص يسهل إدارة الملفات البرمجية.'
      },
      {
        id: 'm1-l1-q3',
        text: 'الملفات التي تحتوي على تعليمات برمجية بلغة PHP تنتهي بامتداد:',
        options: ['.html', '.css', '.php', '.js'],
        correctAnswer: 2,
        feedback: 'امتداد ملفات لغة PHP هو .php.'
      }
    ]
  },
  {
    id: 'm1-l2',
    moduleId: 'module-1',
    title: 'إنشاء قالب الصفحة والوسوم الأساسية',
    description: 'بناء الهيكل الأساسي لصفحة الويب باستخدام الوسوم الرئيسية.',
    content: 'يبدأ أي ملف HTML بالوسم <!DOCTYPE html> وينتهي بـ </html>. يتكون الهيكل من قسمين رئيسيين: <head> للبيانات الوصفية و <body> لمحتوى الصفحة.',
    objectives: [
      'أن ينشئ الطالب ملف HTML جديد باستخدام محرر نصوص.',
      'أن يفهم الطالب وظيفة وسوم الهيكل الأساسي (html, head, body).',
      'أن يضيف الطالب عنوان لتبويب الصفحة باستخدام <title>.'
    ],
    initialAssessment: [
      'أين نكتب المحتوى الذي يظهر للزوار؟',
      'ما هو الوسم الذي يحدد عنوان التبويب؟'
    ],
    trainingActivities: [
      'كتابة الكود الأساسي لصفحة فارغة.',
      'تغيير نص العنوان في وسم <title> وملاحظة التغيير في المتصفح.'
    ],
    steps: [
      'فتح برنامج FlashDevelop.',
      'اختيار New HTML document.',
      'كتابة وسوم الهيكل الأساسي.',
      'حفظ الملف باسم index.html.'
    ],
    videoUrl: 'https://example.com/videos/create-template.mp4',
    quiz: [
      {
        id: 'm1-l2-q1',
        text: 'ما هو الجزء الذي يحتوي على البيانات الوصفية (Metadata) التي لا تظهر للمستخدم؟',
        options: ['<body>', '<head>', '<html>', '<title>'],
        correctAnswer: 1,
        feedback: 'قسم <head> يحتوي على البيانات الوصفية للموقع مثل العنوان والترميز.'
      },
      {
        id: 'm1-l2-q2',
        text: 'تتكون معظم وسوم HTML من علامتين، واحدة تدل على البداية والأخرى تدل على النهاية.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، معظم الوسوم زوجية (بداية ونهاية) مثل <p>...</p>.'
      },
      {
        id: 'm1-l2-q3',
        text: 'ما هو الوسم الذي يعلم المتصفح بأن المستند يتبع معايير HTML5؟',
        options: ['<html>', '<head>', '<!DOCTYPE html>', '<body>'],
        correctAnswer: 2,
        feedback: 'الوسم <!DOCTYPE html> يحدد إصدار HTML المستخدم.'
      }
    ]
  },
  // الوحدة الثانية
  {
    id: 'm2-l1',
    moduleId: 'module-2',
    title: 'العناوين والفقرات',
    description: 'تنسيق النصوص باستخدام وسوم العناوين والفقرات.',
    content: 'تستخدم وسوم العناوين من <h1> إلى <h6> لترتيب أهمية العناوين، بينما يستخدم الوسم <p> لإدراج الفقرات النصية.',
    objectives: [
      'أن يستخدم الطالب وسوم العناوين بأحجامها المختلفة.',
      'أن يدرج الطالب فقرات نصية منظمة.',
      'أن يستخدم الطالب الوسم <br> لإنشاء سطر جديد.'
    ],
    initialAssessment: [
      'أي وسم يعطي أكبر حجم للعنوان؟',
      'كيف ننتقل لسطر جديد دون إنهاء الفقرة؟'
    ],
    trainingActivities: [
      'تجربة كتابة نص واحد بجميع وسوم العناوين الستة.',
      'كتابة فقرة تعريفية عن نفسك.'
    ],
    steps: [
      'إضافة وسم <h1> داخل الـ <body>.',
      'إضافة فقرة نصية باستخدام <p>.',
      'استخدام <br> للفصل بين الأسطر.'
    ],
    videoUrl: 'https://example.com/videos/h1-p-tags.mp4',
    quiz: [
      {
        id: 'm2-l1-q1',
        text: 'رتب العناوين التالية تنازلياً (من الأكبر حجماً إلى الأصغر):',
        options: ['h6 -> h3 -> h1', 'h1 -> h3 -> h6', 'h3 -> h1 -> h6', 'h1 -> h6 -> h3'],
        correctAnswer: 1,
        feedback: 'h1 هو الأكبر و h6 هو الأصغر حجماً.'
      },
      {
        id: 'm2-l1-q2',
        text: 'يستخدم الوسم <p> لإدراج نصوص كفقرات مستقلة في الصفحة.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، الوسم <p> (Paragraph) مخصص للفقرات النصية.'
      },
      {
        id: 'm2-l1-q3',
        text: 'لإدراج سطر جديد فارغ دون بدء فقرة جديدة نستخدم الوسم:',
        options: ['<p>', '<br>', '<hr>', '<div>'],
        correctAnswer: 1,
        feedback: 'الوسم <br> (Break) يستخدم لإنشاء سطر جديد.'
      }
    ]
  },
  {
    id: 'm2-l2',
    moduleId: 'module-2',
    title: 'الصور والروابط التشعبية',
    description: 'إضافة الحيوية للصفحة من خلال الصور والربط بين الصفحات.',
    content: 'يستخدم الوسم <img> لإدراج الصور مع خاصية src لتحديد المسار. الروابط التشعبية تُنشأ باستخدام <a> مع خاصية href لتحديد الوجهة.',
    objectives: [
      'أن يدرج الطالب صورة في الصفحة وتحديد مسارها.',
      'أن ينشئ الطالب روابط تشعبية داخلية وخارجية.',
      'أن يفهم الطالب أهمية الروابط في التنقل عبر الويب.'
    ],
    initialAssessment: [
      'ما هي الخاصية التي تحدد مكان الصورة؟',
      'ماذا يحدث عند الضغط على رابط تشعبي؟'
    ],
    trainingActivities: [
      'إضافة صورة من مجلد images للمشروع.',
      'إنشاء رابط ينقل المستخدم من الصفحة الرئيسية لصفحة أخرى.'
    ],
    steps: [
      'استخدام وسم <img src="...">.',
      'استخدام وسم <a href="...">.'
    ],
    videoUrl: 'https://example.com/videos/img-a-tags.mp4',
    quiz: [
      {
        id: 'm2-l2-q1',
        text: 'ترمز الخاصية src في وسم الصور إلى:',
        options: ['حجم الصورة', 'مسار مصدر ملف الصورة', 'عنوان الصورة', 'نوع الصورة'],
        correctAnswer: 1,
        feedback: 'src تعني Source وتحدد مسار ملف الصورة.'
      },
      {
        id: 'm2-l2-q2',
        text: 'الخاصية التي تحدد "مسار" الملف المراد الانتقال إليه في وسم <a> هي:',
        options: ['src', 'href', 'link', 'url'],
        correctAnswer: 1,
        feedback: 'href (Hyperlink Reference) تحدد وجهة الرابط.'
      },
      {
        id: 'm2-l2-q3',
        text: 'ما هو الوسم الصحيح لإدراج ارتباط تشعبي؟',
        options: ['<img>', '<a>', '<link>', '<href>'],
        correctAnswer: 1,
        feedback: 'الوسم <a> هو المستخدم لإنشاء الروابط التشعبية.'
      }
    ]
  },
  {
    id: 'm2-l3',
    moduleId: 'module-2',
    title: 'القوائم في HTML',
    description: 'تنظيم المعلومات باستخدام القوائم المرتبة وغير المرتبة.',
    content: 'تُستخدم القوائم لتنظيم المعلومات بشكل منطقي. نستخدم <ol> للقوائم المرتبة (1, 2, 3) و <ul> للقوائم غير المرتبة (نقطية).',
    objectives: [
      'أن ينشئ الطالب قوائم مرتبة باستخدام <ol>.',
      'أن ينشئ الطالب قوائم غير مرتبة باستخدام <ul>.',
      'أن يدرج الطالب عناصر القائمة باستخدام <li>.'
    ],
    initialAssessment: [
      'كيف نرتب خطوات عمل معينة في صفحة الويب؟',
      'ما هو الوسم المسؤول عن كل عنصر داخل القائمة؟'
    ],
    trainingActivities: [
      'عمل قائمة بأسماء المواد الدراسية.',
      'عمل قائمة مرتبة لخطوات حل مسألة رياضية.'
    ],
    steps: [
      'فتح وسم القائمة المناسب.',
      'إضافة العناصر داخل وسم <li>.',
      'إغلاق وسم القائمة.'
    ],
    videoUrl: 'https://example.com/videos/lists-tags.mp4',
    quiz: [
      {
        id: 'm2-l3-q1',
        text: 'أي من الوسوم التالية يستخدم لإنشاء قائمة نقطية (Unordered List)؟',
        options: ['<ol>', '<ul>', '<li>', '<list>'],
        correctAnswer: 1,
        feedback: 'الوسم <ul> يستخدم للقوائم غير المرتبة (النقطية).'
      },
      {
        id: 'm2-l3-q2',
        text: 'أي من الوسوم التالية يستخدم لإنشاء قائمة رقمية (Ordered List)؟',
        options: ['<ol>', '<ul>', '<li>', '<list>'],
        correctAnswer: 0,
        feedback: 'الوسم <ol> يستخدم للقوائم المرتبة (الرقمية).'
      }
    ]
  },
  // الوحدة الثالثة
  {
    id: 'm3-l1',
    moduleId: 'module-3',
    title: 'مقدمة في CSS وطرق استخدامها',
    description: 'التعرف على لغة التنسيق CSS وطرق دمجها مع HTML.',
    content: 'CSS هي لغة تنسيق تصف كيفية عرض عناصر HTML. هناك ثلاث طرق: Inline (داخل الوسم)، Embedded (داخل <style>)، و External (في ملف خارجي .css).',
    objectives: [
      'أن يعرف الطالب لغة CSS وفائدتها.',
      'أن يميز الطالب بين طرق التنسيق الثلاث.',
      'أن يربط الطالب ملف CSS خارجي بصفحة HTML.'
    ],
    initialAssessment: [
      'لماذا نفضل استخدام ملف CSS خارجي؟',
      'أين نضع وسم <style> في الصفحة؟'
    ],
    trainingActivities: [
      'تغيير لون نص باستخدام Inline CSS.',
      'إنشاء ملف formatting.css وربطه بالصفحة.'
    ],
    steps: [
      'كتابة تعليمات CSS (الطرف الأول: القيمة).',
      'استخدام وسم <link> للربط الخارجي.'
    ],
    quiz: [
      {
        id: 'm3-l1-q1',
        text: 'لغة CSS تصف كيفية ظهور عناصر HTML للمستخدم (تنسيق الصفحة).',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، CSS هي لغة التنسيق والمظهر.'
      },
      {
        id: 'm3-l1-q2',
        text: 'تسمى طريقة كتابة التنسيق مباشرة داخل وسم العنصر باستخدام خاصية style بـ:',
        options: ['External', 'Embedded', 'Inline', 'Internal'],
        correctAnswer: 2,
        feedback: 'تسمى هذه الطريقة Inline CSS.'
      },
      {
        id: 'm3-l1-q3',
        text: 'الرموز المستخدمة لكتابة "تعليق" لا يظهر للمستخدم داخل ملف CSS هي:',
        options: ['<!-- ... -->', '// ...', '/* ... */', '# ...'],
        correctAnswer: 2,
        feedback: 'التعليقات في CSS تكتب بين /* و */.'
      }
    ]
  },
  {
    id: 'm3-l2',
    moduleId: 'module-3',
    title: 'تنسيق النصوص والصور',
    description: 'تغيير مظهر النصوص والصور باستخدام خصائص CSS.',
    content: 'يمكننا تغيير حجم الخط (font-size)، لونه (color)، نوعه (font-family)، وكذلك أبعاد الصور (width, height) وإضافة إطارات لها (border).',
    objectives: [
      'أن يطبق الطالب خصائص تنسيق النص المختلفة.',
      'أن يتحكم الطالب في حجم ومظهر الصور.',
      'أن يضيف الطالب تعليقات توضيحية داخل ملف CSS.'
    ],
    initialAssessment: [
      'ما هي وحدة القياس المستخدمة للأحجام في الويب؟',
      'كيف نجعل الخط مائلاً باستخدام CSS؟'
    ],
    trainingActivities: [
      'تنسيق فقرة لتظهر باللون الأزرق وبخط Times New Roman.',
      'إضافة إطار ملون حول صورة.'
    ],
    steps: [
      'تحديد العنصر المراد تنسيقه.',
      'إضافة الخصائص المطلوبة بين أقواس { }.'
    ],
    quiz: [
      {
        id: 'm3-l2-q1',
        text: 'ما هي الخاصية المستخدمة لتغيير حجم الخط؟',
        options: ['font-style', 'font-size', 'text-size', 'font-weight'],
        correctAnswer: 1,
        feedback: 'نستخدم font-size لتغيير حجم الخط.'
      },
      {
        id: 'm3-l2-q2',
        text: 'لتغيير عرض الصورة نستخدم الخاصية:',
        options: ['height', 'width', 'size', 'border'],
        correctAnswer: 1,
        feedback: 'width تحدد عرض العنصر.'
      }
    ]
  },
  // الوحدة الرابعة
  {
    id: 'm4-l1',
    moduleId: 'module-4',
    title: 'التقسيم باستخدام الوسم <div>',
    description: 'فهم كيفية تقسيم الصفحة إلى مقاطع منطقية.',
    content: 'الوسم <div> هو حاوية تستخدم لتقسيم صفحة الويب إلى مقاطع أو أجزاء مستقلة، مما يسهل تنسيق كل جزء على حدة باستخدام CSS.',
    objectives: [
      'أن يعرف الطالب الوسم <div> وفائدته.',
      'أن يستخدم الطالب <div> لإنشاء حاوية (Container) للمحتوى.',
      'أن يفهم الطالب مفهوم العناصر من نوع block.'
    ],
    initialAssessment: [
      'كيف يمكننا تجميع عدة عناصر معاً لتنسيقها دفعة واحدة؟',
      'ماذا يحدث لو وضعنا نصاً داخل <div>؟'
    ],
    trainingActivities: [
      'إنشاء صفحة تحتوي على ثلاثة مقاطع <div> بألوان خلفية مختلفة.',
      'وضع صورة ونص داخل حاوية واحدة.'
    ],
    steps: [
      'كتابة وسم الفتح <div>.',
      'إضافة المحتوى المطلوب.',
      'إغلاق الوسم </div>.'
    ],
    quiz: [
      {
        id: 'm4-l1-q1',
        text: 'الوسم المستخدم لتقسيم الصفحة إلى مقاطع هو:',
        options: ['<span>', '<div>', '<section>', '<p>'],
        correctAnswer: 1,
        feedback: '<div> هو الوسم الأساسي للتقسيم.'
      }
    ]
  },
  {
    id: 'm4-l2',
    moduleId: 'module-4',
    title: 'المعرفات (ID) والفئات (Class)',
    description: 'التمييز بين ID و Class وكيفية استخدامهما في التنسيق.',
    content: 'المعرف (ID) يستخدم لتمييز عنصر واحد فريد في الصفحة، بينما الفئة (Class) تستخدم لتمييز مجموعة من العناصر التي تشترك في نفس التنسيق.',
    objectives: [
      'أن يوضح الطالب الفرق بين ID و Class.',
      'أن يكتب الطالب محددات ID و Class في CSS.',
      'أن يطبق الطالب تنسيقات مختلفة بناءً على النوع.'
    ],
    initialAssessment: [
      'هل يمكن تكرار الـ ID في نفس الصفحة؟',
      'متى نستخدم الـ Class بدلاً من الـ ID؟'
    ],
    trainingActivities: [
      'تنسيق عنوان فريد باستخدام ID.',
      'تنسيق عدة فقرات معاً باستخدام Class موحد.'
    ],
    steps: [
      'إضافة id="..." أو class="..." للعنصر في HTML.',
      'في CSS، نستخدم # للـ ID و . للـ Class.'
    ],
    quiz: [
      {
        id: 'm4-l2-q1',
        text: 'نستخدم الرمز ........ لتعريف الـ ID في ملف CSS.',
        options: ['.', '#', '*', '@'],
        correctAnswer: 1,
        feedback: 'نستخدم # للـ ID.'
      },
      {
        id: 'm4-l2-q2',
        text: 'يمكن تكرار الـ Class لأكثر من عنصر في الصفحة الواحدة.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، الـ Class مصمم للمجموعات.'
      }
    ]
  },
  {
    id: 'm4-l3',
    moduleId: 'module-4',
    title: 'تنسيق هيكل الصفحة الكامل',
    description: 'تنسيق Header و Footer و Navigation Bar.',
    content: 'في هذه المرحلة، نقوم بتجميع كل ما تعلمناه لتنسيق الهيكل الكامل للموقع، بما في ذلك رأس الصفحة (Header)، القائمة (Nav)، وتذييل الصفحة (Footer).',
    objectives: [
      'أن ينسق الطالب شريط التنقل.',
      'أن يحدد الطالب أبعاد ومواقع المقاطع الأساسية.',
      'أن ينشئ الطالب مظهر متناسق للموقع.'
    ],
    initialAssessment: [
      'ما هي العناصر التي توضع عادة في الـ Footer؟',
      'كيف نجعل القائمة تظهر في أعلى الصفحة؟'
    ],
    trainingActivities: [
      'تنسيق الـ Header ليكون بخلفية ملونة ونص متوسط.',
      'إضافة حقوق الملكية في الـ Footer وتنسيقها.'
    ],
    steps: [
      'تحديد مقاطع الهيكل في HTML.',
      'تطبيق خصائص العرض والارتفاع والمحاذاة في CSS.'
    ],
    quiz: [
      {
        id: 'm4-l3-q1',
        text: 'الوسم الذي يمثل تذييل الصفحة هو:',
        options: ['<header>', '<footer>', '<nav>', '<aside>'],
        correctAnswer: 1,
        feedback: '<footer> هو التذييل.'
      }
    ]
  }
];

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 'diag-1',
    text: 'اختصار لغة HTML يرمز إلى Hyper Text Markup Language، وهي لغة تستخدم لـ:',
    options: ['معالجة الصور', 'وصف وتوصيف صفحات الويب'],
    correctAnswer: 1,
    feedback: 'لغة HTML تستخدم لوصف وتوصيف صفحات الويب.'
  },
  {
    id: 'diag-2',
    text: 'يتم تنظيم ملفات الصور الخاصة بالموقع عادة في مجلد يسمى "images" لسهولة إدارتها.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، تنظيم الصور في مجلد خاص يسهل إدارة الموقع.'
  },
  {
    id: 'diag-3',
    text: 'الملفات التي تحتوي على تعليمات برمجية بلغة PHP تنتهي بامتداد:',
    options: ['.html', '.php', '.css', '.js'],
    correctAnswer: 1,
    feedback: 'ملفات PHP تنتهي بامتداد .php.'
  },
  {
    id: 'diag-4',
    text: 'ملف start.html يمثل الصفحة الرئيسية التي يتم من خلالها الانتقال لبقية صفحات الموقع.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، الصفحة الرئيسية هي نقطة الانطلاق للموقع.'
  },
  {
    id: 'diag-5',
    text: 'لرؤية الأكواد البرمجية (Tags) لأي عنصر في المتصفح، نضغط بالزر الأيمن للفأرة ونختار الأمر:',
    options: ['Inspect Element', 'View Source', 'Open Link', 'Save As'],
    correctAnswer: 0,
    feedback: 'نستخدم Inspect Element لفحص الأكواد البرمجية للعناصر.'
  },
  {
    id: 'diag-6',
    text: 'تسمى العلامات المخصصة التي تتكون منها لغة HTML بـ:',
    options: ['Codes', 'Tags'],
    correctAnswer: 1,
    feedback: 'تسمى العلامات المخصصة في HTML بالوسوم أو Tags.'
  },
  {
    id: 'diag-7',
    text: 'الترتيب التنازلي الصحيح لأحجام العناوين (من الأكبر للأصغر) هو:',
    options: ['h6 -> h3 -> h1', 'h1 -> h3 -> h6', 'h3 -> h1 -> h6', 'h1 -> h6 -> h3'],
    correctAnswer: 1,
    feedback: 'h1 هو الأكبر و h6 هو الأصغر.'
  },
  {
    id: 'diag-8',
    text: 'تتكون معظم وسوم HTML من علامتين، واحدة تدل على البداية والأخرى تدل على النهاية.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، معظم الوسوم لها وسم فتح ووسم إغلاق.'
  },
  {
    id: 'diag-9',
    text: 'أي من الوسوم التالية يعتبر وسماً فردياً (لا يحتاج لوسم إغلاق)؟',
    options: ['<p>', '<br>', '<h1>', '<div>'],
    correctAnswer: 1,
    feedback: 'الوسم <br> هو وسم فردي يستخدم لكسر السطر.'
  },
  {
    id: 'diag-10',
    text: 'الوسم <p> يستخدم لإدراج نصوص كفقرات مستقلة في الصفحة.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، <p> يرمز لـ Paragraph.'
  },
  {
    id: 'diag-11',
    text: 'لإدراج سطر جديد فارغ دون بدء فقرة جديدة نستخدم الوسم:',
    options: ['<p>', '<br>', '<hr>', '<div>'],
    correctAnswer: 1,
    feedback: 'نستخدم <br> لإدراج سطر جديد.'
  },
  {
    id: 'diag-12',
    text: 'الوسم <ol> يستخدم لإنشاء:',
    options: ['قائمة نقطية', 'قائمة رقمية'],
    correctAnswer: 1,
    feedback: '<ol> يرمز لـ Ordered List (قائمة رقمية).'
  },
  {
    id: 'diag-13',
    text: 'الخاصية التي تحدد "مسار" الملف المراد الانتقال إليه في وسم <a> هي:',
    options: ['src', 'href', 'link', 'path'],
    correctAnswer: 1,
    feedback: 'نستخدم href لتحديد وجهة الرابط.'
  },
  {
    id: 'diag-14',
    text: 'ترمز الخاصية src في وسم الصور إلى:',
    options: ['حجم الصورة', 'مسار مصدر ملف الصورة'],
    correctAnswer: 1,
    feedback: 'src ترمز لـ Source (المصدر).'
  },
  {
    id: 'diag-15',
    text: 'وظيفة الوسم <hr> هي:',
    options: ['إدراج صورة', 'إدراج خط أفقي', 'إدراج رابط', 'تغيير اللون'],
    correctAnswer: 1,
    feedback: '<hr> يرمز لـ Horizontal Rule (خط أفقي).'
  },
  {
    id: 'diag-16',
    text: 'يستخدم وسم <div> لتقسيم وتخطيط صفحة الويب إلى مقاطع (Sections).',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، <div> هو حاوية لتقسيم الصفحة.'
  },
  {
    id: 'diag-17',
    text: 'نستخدم خاصية الـ ........ لتعريف مقطع فريد لا يتكرر تنسيقه في الصفحة.',
    options: ['Class', 'ID', 'Style', 'Name'],
    correctAnswer: 1,
    feedback: 'المعرف ID يجب أن يكون فريداً لكل عنصر.'
  },
  {
    id: 'diag-18',
    text: 'لغة CSS تصف كيفية ظهور عناصر HTML للمستخدم (تنسيق الصفحة).',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، CSS هي لغة التنسيق.'
  },
  {
    id: 'diag-19',
    text: 'تسمى طريقة كتابة التنسيق مباشرة داخل وسم العنصر باستخدام خاصية style بـ:',
    options: ['External CSS', 'Internal CSS', 'Inline CSS'],
    correctAnswer: 2,
    feedback: 'كتابة التنسيق داخل الوسم تسمى Inline CSS.'
  },
  {
    id: 'diag-20',
    text: 'الوسم المستخدم لربط صفحة HTML بملف تنسيق خارجي هو:',
    options: ['<style>', '<link>', '<script>', '<css>'],
    correctAnswer: 1,
    feedback: 'نستخدم <link> لربط ملفات CSS الخارجية.'
  },
  {
    id: 'diag-21',
    text: 'الرموز المستخدمة لكتابة "تعليق" داخل ملف CSS هي:',
    options: ['// ...', '<!-- ... -->', '/* ... */', '# ...'],
    correctAnswer: 2,
    feedback: 'التعليقات في CSS توضع بين /* و */.'
  },
  {
    id: 'diag-22',
    text: 'حجم الخط (font-size) المستخدم لتنسيق الفقرات في المثال التطبيقي هو:',
    options: ['10px', '20px'],
    correctAnswer: 1,
    feedback: 'تم استخدام 20px في المثال.'
  },
  {
    id: 'diag-23',
    text: 'الخاصية font-weight: bold; تستخدم لجعل الخط سميكاً.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، bold تجعل الخط سميكاً.'
  },
  {
    id: 'diag-24',
    text: 'لجعل الخط مائلاً (Italic) نستخدم الخاصية:',
    options: ['font-style', 'font-weight', 'text-decoration', 'font-family'],
    correctAnswer: 0,
    feedback: 'font-style: italic تجعل الخط مائلاً.'
  },
  {
    id: 'diag-25',
    text: 'الوحدة القياسية المستخدمة لقياس الخطوط وأبعاد المربعات في CSS هي:',
    options: ['cm', 'px', 'inch', 'pt'],
    correctAnswer: 1,
    feedback: 'البكسل (px) هو الوحدة الأساسية في الويب.'
  },
  {
    id: 'diag-26',
    text: 'الجزء الذي يحتوي على البيانات الوصفية (Metadata) التي لا تظهر للمستخدم هو:',
    options: ['<head>', '<body>', '<html>', '<title>'],
    correctAnswer: 0,
    feedback: 'البيانات الوصفية توضع في قسم <head>.'
  },
  {
    id: 'diag-27',
    text: 'الخاصية المسؤولة عن تغيير لون خلفية الصفحة أو المقطع هي:',
    options: ['color', 'background-color', 'bg-color', 'fill'],
    correctAnswer: 1,
    feedback: 'background-color تغير لون الخلفية.'
  },
  {
    id: 'diag-28',
    text: 'لون الخلفية الذي استخدم للصفحة الكاملة في المثال هو:',
    options: ['White', 'Azure', 'Springgreen', 'Blue'],
    correctAnswer: 1,
    feedback: 'تم استخدام اللون Azure.'
  },
  {
    id: 'diag-29',
    text: 'القيمة solid عند استخدامها مع خاصية border تعني أن الإطار سيكون:',
    options: ['منقطاً', 'خطاً متصلاً'],
    correctAnswer: 1,
    feedback: 'solid تعني خطاً متصلاً.'
  },
  {
    id: 'diag-30',
    text: 'تسمى المسافة أو الهوامش "الداخلية" بين محتوى المقطع وحدوده بـ:',
    options: ['Margin', 'Padding', 'Border', 'Spacing'],
    correctAnswer: 1,
    feedback: 'Padding هي المسافة الداخلية.'
  },
  {
    id: 'diag-31',
    text: 'المقطع المسمى "container" يمثل الحاوية الأساسية التي تضم جميع عناصر الموقع بداخلها.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، الحاوية تجمع عناصر الصفحة.'
  },
  {
    id: 'diag-32',
    text: 'المقطع الذي يوضع عادة في أعلى الصفحة ويحتوي على اسم الموقع هو:',
    options: ['Footer', 'Header', 'Main', 'Aside'],
    correctAnswer: 1,
    feedback: 'Header هو رأس الصفحة.'
  },
  {
    id: 'diag-33',
    text: 'نستخدم الخاصية margin-top لترك مسافة فارغة "خارج" المقطع من جهة الأعلى.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، margin هي المسافة الخارجية.'
  },
  {
    id: 'diag-34',
    text: 'قيمة الخاصية display التي تسمح بظهور المقاطع بجانب بعضها هي:',
    options: ['block', 'none', 'inline-block', 'flex-column'],
    correctAnswer: 2,
    feedback: 'inline-block تسمح بالعرض المتجاور.'
  },
  {
    id: 'diag-35',
    text: 'لمحاذاة العناصر إلى أسفل المقطع الجانبي نستخدم الخاصية vertical-align بالقيمة:',
    options: ['top', 'middle', 'bottom'],
    correctAnswer: 2,
    feedback: 'bottom تحاذي العناصر للأسفل.'
  },
  {
    id: 'diag-36',
    text: 'المقطع الذي يوضع في نهاية الصفحة ويحتوي على بيانات الطالب وحقوق الملكية هو:',
    options: ['Header', 'Footer', 'Sidebar', 'Nav'],
    correctAnswer: 1,
    feedback: 'Footer هو تذييل الصفحة.'
  },
  {
    id: 'diag-37',
    text: 'الوسم <h1> هو وسم زوجي يتطلب وسم فتح وإغلاق.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، <h1>...</h1>.'
  },
  {
    id: 'diag-38',
    text: 'العناصر التي تبدأ دائماً من سطر جديد وتستحوذ على العرض كاملاً تسمى:',
    options: ['inline elements', 'block-level elements'],
    correctAnswer: 1,
    feedback: 'عناصر block تأخذ العرض كاملاً.'
  },
  {
    id: 'diag-39',
    text: 'اللون الذي استخدم كخلفية لمقطع الـ Header هو:',
    options: ['Azure', 'Springgreen', 'White', 'Black'],
    correctAnswer: 1,
    feedback: 'تم استخدام Springgreen.'
  },
  {
    id: 'diag-40',
    text: 'تم تحديد "عرض" الحاوية (Container) في المقرر ليكون بـ:',
    options: ['500px', '800px', '1000px', '1200px'],
    correctAnswer: 2,
    feedback: 'العرض المحدد هو 1000px.'
  },
  {
    id: 'diag-41',
    text: 'ترمز كلمة href في وسم الارتباط التشعبي إلى Hyperlink Reference.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، href هي اختصار لـ Hyperlink Reference.'
  },
  {
    id: 'diag-42',
    text: 'يستخدم الترميز ........ لضمان ظهور النصوص العربية بشكل صحيح في المتصفح.',
    options: ['ASCII', 'UTF-8', 'ISO-8859-1', 'Windows-1256'],
    correctAnswer: 1,
    feedback: 'UTF-8 يدعم جميع اللغات بما فيها العربية.'
  },
  {
    id: 'diag-43',
    text: 'الوسم الذي يعلم المتصفح بأن المستند يتبع معايير HTML5 هو:',
    options: ['<!DOCTYPE html>', '<html>', '<head>', '<body>'],
    correctAnswer: 0,
    feedback: '<!DOCTYPE html> هو إعلان نوع المستند لـ HTML5.'
  },
  {
    id: 'diag-44',
    text: 'يمكننا استخدام برنامج Flash Develop لكتابة وتحرير أكواد الـ HTML.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، Flash Develop هو محرر أكواد.'
  },
  {
    id: 'diag-45',
    text: 'القيمة التي تجعل النص يظهر في منتصف المقطع هي:',
    options: ['text-align: left', 'text-align: right', 'text-align: center'],
    correctAnswer: 2,
    feedback: 'center تعني التوسيط.'
  },
  {
    id: 'diag-46',
    text: 'الوسم الصحيح لإدراج ارتباط تشعبي هو:',
    options: ['<img>', '<a>', '<link>', '<href>'],
    correctAnswer: 1,
    feedback: 'الوسم <a> يستخدم للروابط.'
  },
  {
    id: 'diag-47',
    text: 'لربط صورة بملف HTML، نكتب مسار الصورة داخل خاصية:',
    options: ['href', 'src', 'alt', 'link'],
    correctAnswer: 1,
    feedback: 'src تحدد مصدر الصورة.'
  },
  {
    id: 'diag-48',
    text: 'التنسيقات المطبقة على الحاوية (Container) قد تورث للعناصر التي بداخلها.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، الوراثة (Inheritance) مبدأ أساسي في CSS.'
  },
  {
    id: 'diag-49',
    text: 'الخاصية المسؤولة عن تحديد "نوع الخط" هي:',
    options: ['font-style', 'font-weight', 'font-family', 'font-size'],
    correctAnswer: 2,
    feedback: 'font-family تحدد نوع الخط.'
  },
  {
    id: 'diag-50',
    text: 'الوسم المستخدم لتعريف فقرة نصية هو:',
    options: ['<p>', '<br>', '<span>', '<div>'],
    correctAnswer: 0,
    feedback: '<p> يرمز لـ Paragraph.'
  },
  {
    id: 'diag-51',
    text: 'ترتيب المقاطع داخل كود HTML يحدد ترتيب ظهورها في المتصفح.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، المتصفح يقرأ الكود من الأعلى للأسفل.'
  },
  {
    id: 'diag-52',
    text: 'الارتفاع (height) المحدد لمقطع الـ Footer في الملف هو:',
    options: ['50px', '100px', '150px', '200px'],
    correctAnswer: 1,
    feedback: 'الارتفاع المحدد هو 100px.'
  }
];

export const FINAL_QUESTIONS: Question[] = DIAGNOSTIC_QUESTIONS.map(q => ({
  ...q,
  id: q.id.replace('diag-', 'final-')
}));
