
import { Module, Lesson } from './types';

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
  // Module 1
  {
    id: 'm1-l1',
    moduleId: 'module-1',
    title: 'مقدمة وتخطيط الموقع',
    description: 'التعرف على لغة HTML وكيفية التخطيط لموقع ويب ناجح.',
    content: 'لغة HTML هي لغة توصيف النص التشعبي، وتعتمد على استخدام علامات مخصصة تسمى Tags. قبل البدء بالتصميم، يجب تخطيط هيكل الموقع كالمجلد الأساسي والمجلدات الفرعية (مثل images).',
    objectives: [
      'تعريف لغة HTML ومفهوم الوسوم.',
      'إدراك أهمية تخطيط الموقع قبل البدء في التنفيذ.',
      'التمييز بين أنواع الملفات (.html, .php).'
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
      'إنشاء ملف HTML جديد باستخدام محرر نصوص.',
      'فهم وظيفة وسوم الهيكل الأساسي (html, head, body).',
      'إضافة عنوان لتبويب الصفحة باستخدام <title>.'
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
  // Module 2
  {
    id: 'm2-l1',
    moduleId: 'module-2',
    title: 'العناوين والفقرات',
    description: 'تنسيق النصوص باستخدام وسوم العناوين والفقرات.',
    content: 'تستخدم وسوم العناوين من <h1> إلى <h6> لترتيب أهمية العناوين، بينما يستخدم الوسم <p> لإدراج الفقرات النصية.',
    objectives: [
      'استخدام وسوم العناوين بأحجامها المختلفة.',
      'إدراج فقرات نصية منظمة.',
      'استخدام الوسم <br> لإنشاء سطر جديد.'
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
      'إدراج صورة في الصفحة وتحديد مسارها.',
      'إنشاء روابط تشعبية داخلية وخارجية.',
      'فهم أهمية الروابط في التنقل عبر الويب.'
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
      'إنشاء قوائم مرتبة باستخدام <ol>.',
      'إنشاء قوائم غير مرتبة باستخدام <ul>.',
      'إدراج عناصر القائمة باستخدام <li>.'
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
  // Module 3
  {
    id: 'm3-l1',
    moduleId: 'module-3',
    title: 'مقدمة في CSS وطرق استخدامها',
    description: 'التعرف على لغة التنسيق CSS وطرق دمجها مع HTML.',
    content: 'CSS هي لغة تنسيق تصف كيفية عرض عناصر HTML. هناك ثلاث طرق: Inline (داخل الوسم)، Embedded (داخل <style>)، و External (في ملف خارجي .css).',
    objectives: [
      'تعريف لغة CSS وفائدتها.',
      'التمييز بين طرق التنسيق الثلاث.',
      'ربط ملف CSS خارجي بصفحة HTML.'
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
      'تطبيق خصائص تنسيق النص المختلفة.',
      'التحكم في حجم ومظهر الصور.',
      'إضافة تعليقات توضيحية داخل ملف CSS.'
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
        text: 'الخاصية المسؤولة عن تحديد "نوع الخط" (مثل Times New Roman) هي:',
        options: ['font-size', 'font-weight', 'font-family', 'font-style'],
        correctAnswer: 2,
        feedback: 'font-family تستخدم لتحديد نوع الخط.'
      },
      {
        id: 'm3-l2-q2',
        text: 'تستخدم الخاصية font-weight: bold لجعل الخط سميكاً.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، font-weight تتحكم في سمك الخط.'
      },
      {
        id: 'm3-l2-q3',
        text: 'الوحدة القياسية المستخدمة لقياس الخطوط وأبعاد المربعات في CSS هي:',
        options: ['cm', 'inch', 'px (البكسل)', 'pt'],
        correctAnswer: 2,
        feedback: 'البكسل (px) هو الوحدة الأساسية في تصميم الويب.'
      }
    ]
  },
  // Module 4
  {
    id: 'm4-l1',
    moduleId: 'module-4',
    title: 'تقسيم الصفحة باستخدام div',
    description: 'تنظيم هيكل الصفحة إلى مقاطع منطقية.',
    content: 'يعتبر الوسم <div> من أهم الوسوم لتقسيم الصفحة إلى مقاطع مثل: header, sidebar, contents, footer. نستخدم المعرف id لتمييز كل مقطع وتنسيقه بشكل مستقل.',
    objectives: [
      'فهم فكرة تقسيم الصفحة إلى مقاطع (Sections).',
      'استخدام الوسم <div> لبناء الهيكل.',
      'تطبيق المعرفات id لتنسيق المقاطع.'
    ],
    initialAssessment: [
      'ما فائدة تقسيم الصفحة؟',
      'هل يظهر الوسم <div> للمستخدم بشكل مباشر؟'
    ],
    trainingActivities: [
      'إنشاء هيكل صفحة يحتوي على رأس وتذييل.',
      'تلوين خلفية كل مقطع بلون مختلف لتمييزه.'
    ],
    steps: [
      'إدراج وسوم <div> بمعرفات مختلفة.',
      'تنسيق كل معرف في ملف CSS باستخدام رمز #.'
    ],
    videoUrl: 'https://example.com/videos/div-tag.mp4',
    quiz: [
      {
        id: 'm4-l1-q1',
        text: 'يستخدم الوسم <div> لتقسيم وتخطيط صفحة الويب إلى مقاطع (Sections).',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، <div> هو حاوية لتقسيم الصفحة.'
      },
      {
        id: 'm4-l1-q2',
        text: 'المقطع المسمى "container" يمثل الحاوية الأساسية التي تضم جميع عناصر الموقع بداخلها.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، جرت العادة على تسمية الحاوية الرئيسية بـ container.'
      },
      {
        id: 'm4-l1-q3',
        text: 'المقطع الذي يوضع عادة في أعلى الصفحة ويحتوي على اسم الموقع هو:',
        options: ['Header', 'Footer', 'Sidebar', 'Content'],
        correctAnswer: 0,
        feedback: 'الـ Header هو رأس الصفحة.'
      }
    ]
  },
  {
    id: 'm4-l2',
    moduleId: 'module-4',
    title: 'استخدام المعرفات والفئات',
    description: 'الفرق بين ID و Class وكيفية استخدامهما بفعالية.',
    content: 'المعرف ID يستخدم لعنصر واحد فريد، بينما الفئة Class تستخدم لتطبيق نفس التنسيق على مجموعة من العناصر.',
    objectives: [
      'التمييز بين استخدام ID و Class.',
      'تطبيق تنسيق موحد على عدة عناصر باستخدام Class.',
      'فهم أولوية التنسيقات.'
    ],
    initialAssessment: [
      'متى نستخدم Class بدلاً من ID؟',
      'كيف نستدعي الفئة في ملف CSS؟'
    ],
    trainingActivities: [
      'تطبيق فئة "theborder" على عنوان وصورة في نفس الوقت.',
      'ملاحظة كيف يتغير مظهر جميع العناصر التي تحمل نفس الفئة.'
    ],
    steps: [
      'إضافة خاصية class="..." للعناصر.',
      'تنسيق الفئة في CSS باستخدام رمز النقطة (.).'
    ],
    videoUrl: 'https://example.com/videos/id-class.mp4',
    quiz: [
      {
        id: 'm4-l2-q1',
        text: 'نستخدم خاصية الـ ID لتعريف مقطع فريد لا يتكرر تنسيقه في الصفحة.',
        options: ['صح', 'خطأ'],
        correctAnswer: 0,
        feedback: 'صحيح، الـ ID يجب أن يكون فريداً لكل عنصر.'
      },
      {
        id: 'm4-l2-q2',
        text: 'العناصر التي تبدأ دائماً من سطر جديد وتستحوذ على العرض كاملاً تسمى:',
        options: ['inline', 'block-level', 'float', 'fixed'],
        correctAnswer: 1,
        feedback: 'عناصر block-level تأخذ العرض الكامل وتبدأ من سطر جديد.'
      },
      {
        id: 'm4-l2-q3',
        text: 'ما هي قيمة الخاصية display التي تسمح بظهور مقطع الروابط ومقطع المحتوى بجانب بعضهما؟',
        options: ['block', 'inline', 'inline-block', 'none'],
        correctAnswer: 2,
        feedback: 'inline-block تسمح للعناصر بالظهور بجانب بعضها مع الاحتفاظ بخصائص الـ block.'
      }
    ]
  }
];

export const CURRICULUM_FINAL_ASSESSMENT = [
  'قم بإنشاء صفحة ويب كاملة تحتوي على (عنوان، فقرة، صورة، رابط).',
  'استخدم ملف CSS خارجي لتنسيق الصفحة (تغيير الألوان والخطوط).',
  'قسم الصفحة باستخدام <div> إلى ثلاثة أجزاء على الأقل.',
  'اشرح الفرق بين الوسوم الزوجية والفردية مع ذكر مثال لكل منهما.'
];

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  feedback: string;
};

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 'diag-1',
    text: 'ماذا يعني اختصار HTML؟',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyper Tool Multi Language',
      'Home Tool Markup Language'
    ],
    correctAnswer: 0,
    feedback: 'HTML ترمز إلى Hyper Text Markup Language وهي اللغة الأساسية لوصف وتوصيف صفحات الويب.'
  },
  {
    id: 'diag-2',
    text: 'تسمى العلامات المخصصة التي تتكون منها لغة HTML بـ:',
    options: ['Codes', 'Tags', 'Scripts', 'Links'],
    correctAnswer: 1,
    feedback: 'تتكون لغة HTML من علامات مخصصة تسمى الوسوم أو Tags.'
  },
  {
    id: 'diag-3',
    text: 'ما هي اللغة المستخدمة لتنسيق وتجميل (تنسيق الصفحة) عناصر HTML؟',
    options: ['HTML', 'PHP', 'CSS', 'Python'],
    correctAnswer: 2,
    feedback: 'لغة CSS (Cascading Style Sheets) هي المسؤولة عن وصف كيفية ظهور عناصر HTML وتنسيق الصفحة.'
  },
  {
    id: 'diag-4',
    text: 'ما هو الوسم الذي يعلم المتصفح بأن المستند يتبع معايير HTML5؟',
    options: ['<html>', '<head>', '<!DOCTYPE html>', '<body>'],
    correctAnswer: 2,
    feedback: 'الوسم <!DOCTYPE html> هو الذي يحدد إصدار HTML المستخدم (HTML5).'
  },
  {
    id: 'diag-5',
    text: 'يمكننا استخدام برنامج ........ لكتابة وتحرير أكواد الـ HTML.',
    options: ['Flash Develop', 'Photoshop', 'Excel', 'PowerPoint'],
    correctAnswer: 0,
    feedback: 'برنامج Flash Develop هو أحد البرامج المستخدمة لتحرير وكتابة أكواد البرمجة.'
  }
];

export const FINAL_QUESTIONS: Question[] = [
  {
    id: 'final-1',
    text: 'ماذا يعني اختصار HTML؟',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Tool Multi Language', 'Home Tool Markup Language'],
    correctAnswer: 0,
    feedback: 'HTML ترمز إلى Hyper Text Markup Language.'
  },
  {
    id: 'final-2',
    text: 'ما هو الوسم الذي يعلم المتصفح بأن المستند يتبع معايير HTML5؟',
    options: ['<html>', '<head>', '<!DOCTYPE html>', '<body>'],
    correctAnswer: 2,
    feedback: 'الوسم <!DOCTYPE html> يحدد إصدار HTML المستخدم.'
  },
  {
    id: 'final-3',
    text: 'أين نضع البيانات الوصفية (Metadata) التي لا تظهر للمستخدم؟',
    options: ['<body>', '<head>', '<html>', '<title>'],
    correctAnswer: 1,
    feedback: 'قسم <head> يحتوي على البيانات الوصفية.'
  },
  {
    id: 'final-4',
    text: 'ما هو الوسم الصحيح لإنشاء أكبر عنوان؟',
    options: ['<h6>', '<heading>', '<h1>', '<head>'],
    correctAnswer: 2,
    feedback: '<h1> هو أكبر مستوى للعناوين.'
  },
  {
    id: 'final-5',
    text: 'ما هو الوسم المستخدم لإدراج فقرة نصية؟',
    options: ['<paragraph>', '<p>', '<text>', '<b>'],
    correctAnswer: 1,
    feedback: 'الوسم <p> يستخدم للفقرات.'
  },
  {
    id: 'final-6',
    text: 'لإدراج سطر جديد فارغ نستخدم الوسم:',
    options: ['<break>', '<lb>', '<br>', '<hr>'],
    correctAnswer: 2,
    feedback: '<br> يستخدم لكسر السطر.'
  },
  {
    id: 'final-7',
    text: 'ما هي الخاصية المستخدمة لتحديد مسار الصورة؟',
    options: ['href', 'src', 'alt', 'link'],
    correctAnswer: 1,
    feedback: 'src تحدد مصدر الصورة.'
  },
  {
    id: 'final-8',
    text: 'ما هو الوسم المستخدم لإنشاء رابط تشعبي؟',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctAnswer: 1,
    feedback: 'الوسم <a> (Anchor) يستخدم للروابط.'
  },
  {
    id: 'final-9',
    text: 'الخاصية التي تحدد وجهة الرابط في وسم <a> هي:',
    options: ['src', 'href', 'target', 'rel'],
    correctAnswer: 1,
    feedback: 'href تحدد وجهة الرابط.'
  },
  {
    id: 'final-10',
    text: 'أي وسم يستخدم لإنشاء قائمة نقطية (غير مرتبة)؟',
    options: ['<ol>', '<ul>', '<li>', '<list>'],
    correctAnswer: 1,
    feedback: '<ul> لإنشاء Unordered List.'
  },
  {
    id: 'final-11',
    text: 'أي وسم يستخدم لإنشاء قائمة رقمية (مرتبة)؟',
    options: ['<ol>', '<ul>', '<li>', '<list>'],
    correctAnswer: 0,
    feedback: '<ol> لإنشاء Ordered List.'
  },
  {
    id: 'final-12',
    text: 'ما هو الوسم المستخدم لتعريف عنصر داخل قائمة؟',
    options: ['<list>', '<item>', '<li>', '<ul>'],
    correctAnswer: 2,
    feedback: '<li> لتعريف List Item.'
  },
  {
    id: 'final-13',
    text: 'ماذا يعني اختصار CSS؟',
    options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
    correctAnswer: 1,
    feedback: 'CSS ترمز إلى Cascading Style Sheets.'
  },
  {
    id: 'final-14',
    text: 'أين يتم وضع وسم <style> في طريقة التنسيق الداخلي (Internal CSS)؟',
    options: ['داخل <body>', 'داخل <head>', 'بعد </html>', 'داخل <p>'],
    correctAnswer: 1,
    feedback: 'يوضع وسم <style> داخل قسم <head>.'
  },
  {
    id: 'final-15',
    text: 'ما هو الوسم المستخدم لربف ملف CSS خارجي؟',
    options: ['<style>', '<link>', '<script>', '<css>'],
    correctAnswer: 1,
    feedback: 'الوسم <link> يستخدم للربط الخارجي.'
  },
  {
    id: 'final-16',
    text: 'كيف نكتب تعليقاً في CSS؟',
    options: ['// تعليق', '/* تعليق */', '<!-- تعليق -->', '# تعليق'],
    correctAnswer: 1,
    feedback: 'التعليقات في CSS تكتب بين /* و */.'
  },
  {
    id: 'final-17',
    text: 'أي خاصية تستخدم لتغيير لون النص؟',
    options: ['text-color', 'font-color', 'color', 'bg-color'],
    correctAnswer: 2,
    feedback: 'خاصية color تغير لون النص.'
  },
  {
    id: 'final-18',
    text: 'أي خاصية تستخدم لتغيير نوع الخط؟',
    options: ['font-style', 'font-family', 'font-weight', 'font-type'],
    correctAnswer: 1,
    feedback: 'font-family تحدد نوع الخط.'
  },
  {
    id: 'final-19',
    text: 'لجعل الخط سميكاً نستخدم:',
    options: ['font-weight: bold', 'font-style: bold', 'text-decoration: bold', 'font-size: bold'],
    correctAnswer: 0,
    feedback: 'font-weight تتحكم في سمك الخط.'
  },
  {
    id: 'final-20',
    text: 'أي خاصية تستخدم لتغيير حجم الخط؟',
    options: ['font-size', 'text-size', 'size', 'font-height'],
    correctAnswer: 0,
    feedback: 'font-size تحدد حجم الخط.'
  },
  {
    id: 'final-21',
    text: 'ما هو الوسم المستخدم لتقسيم الصفحة إلى مقاطع؟',
    options: ['<section>', '<div>', '<span>', '<p>'],
    correctAnswer: 1,
    feedback: 'الوسم <div> يستخدم لتقسيم الصفحة.'
  },
  {
    id: 'final-22',
    text: 'نستخدم الرمز ........ لتعريف الـ ID في ملف CSS.',
    options: ['.', '#', '*', '@'],
    correctAnswer: 1,
    feedback: 'الرمز # يستخدم لتعريف ID.'
  },
  {
    id: 'final-23',
    text: 'نستخدم الرمز ........ لتعريف الـ Class في ملف CSS.',
    options: ['.', '#', '*', '@'],
    correctAnswer: 0,
    feedback: 'الرمز . يستخدم لتعريف Class.'
  },
  {
    id: 'final-24',
    text: 'الـ ID يجب أن يكون فريداً ولا يتكرر لنفس العنصر في الصفحة الواحدة.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، الـ ID فريد لكل عنصر.'
  },
  {
    id: 'final-25',
    text: 'يمكن استخدام نفس الـ Class لأكثر من عنصر في الصفحة.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، الـ Class يمكن تكراره.'
  },
  {
    id: 'final-26',
    text: 'ما هي الخاصية التي تحدد المسافة "الخارجية" للعنصر؟',
    options: ['padding', 'margin', 'border', 'spacing'],
    correctAnswer: 1,
    feedback: 'margin تحدد المسافة الخارجية.'
  },
  {
    id: 'final-27',
    text: 'ما هي الخاصية التي تحدد المسافة "الداخلية" للعنصر؟',
    options: ['padding', 'margin', 'border', 'spacing'],
    correctAnswer: 0,
    feedback: 'padding تحدد المسافة الداخلية.'
  },
  {
    id: 'final-28',
    text: 'أي خاصية تستخدم لتغيير لون الخلفية؟',
    options: ['color', 'background-color', 'bg-color', 'fill-color'],
    correctAnswer: 1,
    feedback: 'background-color تغير لون الخلفية.'
  },
  {
    id: 'final-29',
    text: 'لإضافة إطار حول العنصر نستخدم خاصية:',
    options: ['outline', 'frame', 'border', 'box'],
    correctAnswer: 2,
    feedback: 'border تضيف إطاراً.'
  },
  {
    id: 'final-30',
    text: 'أي قيمة لخاصية display تجعل العناصر تظهر بجانب بعضها؟',
    options: ['block', 'inline', 'none', 'flex-column'],
    correctAnswer: 1,
    feedback: 'inline تجعل العناصر تظهر بجانب بعضها.'
  },
  {
    id: 'final-31',
    text: 'عناصر block-level تبدأ دائماً من سطر جديد.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، عناصر block تأخذ سطراً كاملاً.'
  },
  {
    id: 'final-32',
    text: 'ما هو الوسم الذي يمثل رأس الصفحة؟',
    options: ['<head>', '<header>', '<top>', '<nav>'],
    correctAnswer: 1,
    feedback: '<header> يمثل رأس الصفحة.'
  },
  {
    id: 'final-33',
    text: 'ما هو الوسم الذي يمثل تذييل الصفحة؟',
    options: ['<bottom>', '<footer>', '<end>', '<base>'],
    correctAnswer: 1,
    feedback: '<footer> يمثل تذييل الصفحة.'
  },
  {
    id: 'final-34',
    text: 'أي خاصية تستخدم لمحاذاة النص (يمين، يسار، وسط)؟',
    options: ['text-align', 'align-text', 'font-align', 'text-position'],
    correctAnswer: 0,
    feedback: 'text-align تستخدم للمحاذاة.'
  },
  {
    id: 'final-35',
    text: 'لإزالة الخط تحت الروابط نستخدم:',
    options: ['text-style: none', 'text-decoration: none', 'font-style: none', 'link-style: none'],
    correctAnswer: 1,
    feedback: 'text-decoration: none تزيل الخط.'
  },
  {
    id: 'final-36',
    text: 'ما هي الوحدة القياسية الأكثر استخداماً للأبعاد في الويب؟',
    options: ['cm', 'px', 'inch', 'pt'],
    correctAnswer: 1,
    feedback: 'البكسل (px) هو الأكثر استخداماً.'
  },
  {
    id: 'final-37',
    text: 'الوسم <html> هو الحاوية الرئيسية لكل محتويات الصفحة.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، كل الكود يكون داخل <html>.'
  },
  {
    id: 'final-38',
    text: 'الوسم <body> يحتوي على كل ما يراه المستخدم في المتصفح.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، المحتوى المرئي يكون داخل <body>.'
  },
  {
    id: 'final-39',
    text: 'يمكن كتابة أكواد HTML بأي محرر نصوص بسيط مثل Notepad.',
    options: ['صح', 'خطأ'],
    correctAnswer: 0,
    feedback: 'صحيح، HTML ملف نصي في الأساس.'
  },
  {
    id: 'final-40',
    text: 'ما هو امتداد ملفات صفحات الويب؟',
    options: ['.web', '.site', '.html', '.txt'],
    correctAnswer: 2,
    feedback: 'الامتداد الصحيح هو .html.'
  }
];
