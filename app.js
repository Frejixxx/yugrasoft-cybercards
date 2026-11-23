// Кибер-карточки Югры — Полный движок тренажёра для платформы «Цифровой гражданин Югры»
// Включает: 5 типов карточек, адаптивную сложность, мультиязычность RU/EN,
// графики аналитики (Canvas), профиль ученика, ачивки, PNG-сертификат,
// симулятор мессенджера (SMS, дипфейк, звонки, фейк-галочка) и postMessage API.

const STORAGE_KEY = 'cybercards_yugra_portal_v1';
const CUSTOM_CARDS_KEY = 'cybercards_custom_cards_v1';
const CUSTOM_SCENARIOS_KEY = 'cybershield_custom_scenarios_v1';

let CARDS = [];
let SCENARIOS = [];

// ==================== СЛОВАРЬ МУЛЬТИЯЗЫЧНОСТИ (RU / EN) ====================
const I18N = {
  ru: {
    portal_name: 'Цифровой гражданин Югры',
    app_title: 'Кибер-карточки Югры',
    tab_cards: 'Кибер-карточки',
    tab_chat: 'Симулятор чатов',
    tab_blitz: 'Блиц-атака',
    blitz_title: 'Блиц: отбей атаку скамеров!',
    blitz_sub: '60 секунд • 3 сердечка • комбо за скорость',
    blitz_record_lbl: 'Рекорд',
    blitz_rules: 'На экран летят сообщения от друзей, учителей и мошенников. Успей за 60 секунд решить: пропустить безопасное сообщение или отправить скамера в БАН!',
    blitz_btn_safe: 'Безопасно',
    blitz_btn_ban: 'В БАН! (Скам)',
    blitz_start_btn: 'Поехали! (60 сек)',
    blitz_score_lbl: 'Очки',
    blitz_acc_lbl: 'Верно',
    blitz_again_btn: 'Сыграть ещё раз',
    tab_results: 'Аналитика и сертификат',
    overall_progress: 'Общий прогресс:',
    card_counter_label: 'Миссия:',
    adaptive_label: 'Сложность:',
    btn_restart_cards: 'Начать заново',
    score_now: 'Собрано звёзд:',
    btn_read_aloud: 'Озвучить',
    btn_stop_aloud: 'Стоп',
    btn_hint: 'Подсказка',
    yugorka_name: 'Кибер-Стив',
    yugorka_role: 'Кибер-герой Югры',
    detective_bar: 'Лупа детектива: нажми на подозрительные места на картинке!',
    detective_done: 'Все улики найдены! Молодец, кибердетектив!',
    clue_xp: '+15 XP • Улика!',
    yugorka_idle: [
      'Привет! Я {HERO}. Давай вместе разберём эту ситуацию и не дадим гриферам-мошенникам шанса!',
      'Не спеши кликать! Если сомневаешься — жми «Подсказка» или проверяй улики лупой.',
      'Настоящий профи сначала проверяет, потом нажимает. Выбери самый безопасный шаг!'
    ],
    yugorka_win: [
      'Отлично! +100 XP! Очень умное и безопасное решение!',
      'Точно в цель! Твой Кибер-щит Югры стал ещё крепче!',
      'Супер! Всё верно — работа настоящего кибердетектива!'
    ],
    yugorka_oops: [
      'Ой, хитрая ловушка! Ничего страшного — давай посмотрим, в чём подвох, и попробуем ещё раз!',
      'Не переживай! Даже у профи бывают фейлы. Читай разбор ниже и бери реванш!'
    ],
    yugorka_pet: [
      'Эй, я на страже кибербезопасности! Погнали дальше!',
      'Собирай звёзды — откроешь алмазный щит и крутой ранг!',
      'Гриферы и мошенники не пройдут, пока мы в одной команде!'
    ],
    yugorka_drag: [
      'Ого, телепорт сработал! Отсюда всё отлично видно!',
      'Эй, аккуратнее, мои пиксельные блоки рассыплются!',
      'Лечу на разведку! Тащи меня куда удобно!'
    ],
    hotbar_title: 'Инвентарь кибер-лута',
    hotbar_sub: 'Решай карточки и собирай защиту!',
    btn_try_chat: 'Открыть симулятор чатов',
    btn_open_cert: 'Сертификат и награды',
    grade_5_7: '5–7 кл.',
    grade_8_11: '8–11 кл.',
    chat_tip: 'Не все чаты — мошенники! Проверяй профиль, SMS и пробуй позвонить.',
    chat_empty_title: 'Симулятор чатов',
    chat_empty_desc: 'Потренируйся в живой переписке: отличи фейковую галочку, проверь входящие SMS и не попадись на уловки мошенников.',
    chat_open_first: 'Открыть первый чат',
    btn_block: 'Заблокировать',
    btn_replay: 'Заново',
    chat_done_short: 'Чат пройден!',
    btn_next_short: 'Дальше',
    kpi_loot: 'Собранный лут',
    prof_fio_lbl: 'ФИО ученика',
    prof_fio_hint: 'Подставится в сертификат и автоматически подберёт напарника.',
    prof_grade_lbl: 'Класс',
    prof_hero_lbl: 'Твой напарник',
    opt_grade_1_4: '1–4 классы',
    opt_grade_5_7: '5–7 классы',
    opt_grade_8_11: '8–11 классы',
    btn_cancel: 'Отмена',
    btn_save: 'Сохранить',
    chars_6: '6 символов',
    grade_word: 'Класс',
    chat_today: 'Сегодня',
    chat_online: 'в сети',
    chat_bot: 'бот',
    chat_blocked: 'заблокирован',
    chat_typing: 'печатает...',
    chat_typing_full: 'Собеседник печатает...',
    chat_pick_reply: 'Выбери свой ответ:',
    chat_done_choices: 'Сценарий завершён:',
    chat_next_btn: 'Следующий чат',
    chat_replay_btn: 'Переиграть',
    chat_passed_prefix: 'Пройдено',
    chat_you_prefix: 'Вы: ',
    chat_voice_lbl: 'Голосовое',
    chat_transcript_btn: 'Расшифровать',
    chat_safe_done: 'Пройдено! Контакт безопасен',
    chat_scam_done: 'Пройдено! Мошенник заблокирован',
    chat_no_sms: 'Пока нет входящих SMS. Они приходят в ходе диалогов в «Симуляторе чатов».',
    btn_pass_lab: 'Тест пароля',
    pass_lab_title: 'Взломают ли твой пароль?',
    pass_lab_sub: 'Придумай тестовый пароль — проверь защиту!',
    pass_lab_gen: 'Супер-пароль',
    pass_lab_time_lbl: 'Время взлома хакером:',
    pl_len: 'От 10 символов',
    pl_case: 'Большие и малые буквы',
    pl_num: 'Есть цифры',
    pl_sym: 'Спецсимвол (! @ # $)',
    cards_done_title: 'Все кибер-карточки пройдены!',
    sim_inbox: 'Входящие чаты',
    kpi_cards: 'Кибер-карточки',
    kpi_chats: 'Чаты с мошенниками',
    kpi_errors: 'Ошибки',
    kpi_rank: 'Твой ранг',
    cert_fio_label: 'Введи ФИО для скачивания именного сертификата',
    btn_download_cert: 'Скачать сертификат (PNG)',
    chart_types_title: 'Результаты по типам заданий',
    chart_types_sub: 'Процент верных ответов по каждому навыку',
    chart_dyn_title: 'Динамика прохождений',
    chart_dyn_sub: 'Рост результата по попыткам и сессиям (%)',
    ach_title: 'Достижения (ачивки)',
    ach_sub: 'Выполняй задания без ошибок, чтобы открыть все значки',
    btn_reset_all: 'Сбросить весь прогресс',
    profile_modal_title: 'Профиль ученика',
    check_answer: 'Проверить ответ',
    retry_card: 'Попробовать ещё раз',
    next_card: 'Следующая карточка',
    to_results: 'Смотреть результаты',
    correct_title: 'Верно! Отличная работа',
    wrong_title: 'Есть ошибка — разберёмся',
    true_btn: 'Верно',
    false_btn: 'Неверно',
    levels: { 1: 'Базовый (1/3)', 2: 'Средний (2/3)', 3: 'Продвинутый (3/3)' },
    levelShort: { 1: 'Уровень 1', 2: 'Уровень 2', 3: 'Уровень 3' },
    types: {
      choice: 'Выбор ответа',
      truefalse: 'Верно / Неверно',
      sort: 'Сортировка',
      match: 'Сопоставление',
      order: 'Порядок действий'
    },
    typesShort: {
      choice: 'Выбор',
      truefalse: 'Верно/Нет',
      sort: 'Сортировка',
      match: 'Пары',
      order: 'Порядок'
    },
    of_word: 'из',
    student_default: 'Ученик',
    class_suffix: 'кл.',
    adaptive_up: 'Адаптивная сложность повышена — следующее задание будет интереснее.',
    adaptive_down: 'Адаптивная сложность скорректирована — подберём следующее задание проще для закрепления.',
    match_hint_left: '1. Выбери ситуацию слева',
    match_hint_right: '2. Теперь выбери реакцию справа',
    sort_hint: 'Распредели каждый пункт в нужную категорию:',
    order_hint: 'Перетащи шаги мышкой за ручку слева или используй стрелки (от 1 до 4):',
    sort_drag_hint: 'Перетащи карточки в нужную корзину (или нажми на карточку, а затем на корзину):',
    sort_pool_empty: 'Все карточки разложены! Нажми «Проверить ответ».',
    match_drag_hint: 'Перетащи ситуацию слева на реакцию справа (или кликни по паре):',
    drop_here: 'Перетащи сюда',
    streak_label: 'Серия'
  },
  en: {
    portal_name: 'Digital Citizen of Yugra',
    app_title: 'Yugra Cyber-Cards',
    tab_cards: 'Cyber-Cards',
    tab_chat: 'Chat Simulator',
    tab_blitz: '60s Blitz',
    blitz_title: '60s Blitz: Stop the Scammers!',
    blitz_sub: '60 seconds • 3 hearts • speed combo',
    blitz_record_lbl: 'Best',
    blitz_rules: 'Messages from friends, teachers, and scammers fly onto the screen. Decide fast: let safe messages pass or BAN the scammer!',
    blitz_btn_safe: 'Safe',
    blitz_btn_ban: 'BAN! (Scam)',
    blitz_start_btn: 'Start! (60 sec)',
    blitz_score_lbl: 'Score',
    blitz_acc_lbl: 'Correct',
    blitz_again_btn: 'Play Again',
    tab_results: 'Analytics & Certificate',
    overall_progress: 'Overall progress:',
    card_counter_label: 'Mission:',
    adaptive_label: 'Difficulty:',
    btn_restart_cards: 'Restart cards',
    score_now: 'Stars collected:',
    btn_read_aloud: 'Read aloud',
    btn_stop_aloud: 'Stop',
    btn_hint: 'Hint',
    yugorka_name: 'Cyber-Steve',
    yugorka_role: 'Yugra Cyber-Hero',
    detective_bar: 'Detective Magnifier: click suspicious clues in the picture!',
    detective_done: 'All clues found! Awesome detective work!',
    clue_xp: '+15 XP • Clue!',
    yugorka_idle: [
      'Hey! I am {HERO}. Let’s outsmart the scammers and griefers together!',
      'Stay sharp! Need help? Tap "Hint" or inspect glowing clues with the magnifier.',
      'A true pro checks twice before clicking. Pick the safest move!'
    ],
    yugorka_win: [
      'Awesome job! Smart and safe choice!',
      'Bullseye! Your diamond Cyber-Shield just got stronger!',
      'Spot on! That is how a true cyber-detective acts!'
    ],
    yugorka_oops: [
      'Whoa, tricky trap! No worries — let’s see why and try again!',
      'Don’t worry! Every hero learns by practicing. Check the tip below!'
    ],
    yugorka_pet: [
      'Hey, I’m on cyber-patrol! Let’s beat the next mission!',
      'Collect stars to unlock awesome detective gear!',
      'Yugra is safe with us on the team!'
    ],
    yugorka_drag: [
      'Whoa, teleport worked! Great view from here!',
      'Careful, don’t drop my voxel blocks!',
      'Flying to scout for scammers!'
    ],
    hotbar_title: 'Cyber-Loot Hotbar',
    hotbar_sub: 'Solve cards to collect cyber-gear!',
    btn_try_chat: 'Try Chat Simulator',
    btn_open_cert: 'Certificate & Rewards',
    grade_5_7: 'Gr. 5–7',
    grade_8_11: 'Gr. 8–11',
    chat_tip: 'Not every chat is a scam! Check profiles, SMS, and try calling.',
    chat_empty_title: 'Chat Simulator',
    chat_empty_desc: 'Practice in live chats: spot fake checkmarks, inspect SMS codes, and outsmart scammers.',
    chat_open_first: 'Open First Chat',
    btn_block: 'Block',
    btn_replay: 'Replay',
    chat_done_short: 'Chat completed!',
    btn_next_short: 'Next',
    kpi_loot: 'Loot Collected',
    prof_fio_lbl: 'Full Name',
    prof_fio_hint: 'Added to your certificate and auto-picks your cyber buddy.',
    prof_grade_lbl: 'Grade',
    prof_hero_lbl: 'Your Cyber Buddy',
    opt_grade_1_4: 'Grades 1–4',
    opt_grade_5_7: 'Grades 5–7',
    opt_grade_8_11: 'Grades 8–11',
    btn_cancel: 'Cancel',
    btn_save: 'Save',
    chars_6: '6 chars',
    grade_word: 'Grade',
    chat_today: 'Today',
    chat_online: 'online',
    chat_bot: 'bot',
    chat_blocked: 'blocked',
    chat_typing: 'typing...',
    chat_typing_full: 'Contact is typing...',
    chat_pick_reply: 'Choose your reply:',
    chat_done_choices: 'Chat completed:',
    chat_next_btn: 'Next Chat',
    chat_replay_btn: 'Replay',
    chat_passed_prefix: 'Done',
    chat_you_prefix: 'You: ',
    chat_voice_lbl: 'Voice message',
    chat_transcript_btn: 'Transcript',
    chat_safe_done: 'Done! Safe contact',
    chat_scam_done: 'Done! Scammer blocked',
    chat_no_sms: 'No incoming SMS yet. They arrive during chats in the Chat Simulator.',
    btn_pass_lab: 'Password Lab',
    pass_lab_title: 'Can Hackers Crack Your Password?',
    pass_lab_sub: 'Type a test password to check its shield!',
    pass_lab_gen: 'Super Password',
    pass_lab_time_lbl: 'Estimated crack time:',
    pl_len: '10+ characters',
    pl_case: 'UPPER & lowercase',
    pl_num: 'Includes numbers',
    pl_sym: 'Special symbol (! @ # $)',
    cards_done_title: 'All Cyber-Cards Completed!',
    sim_inbox: 'Incoming Chats',
    kpi_cards: 'Cyber-Cards',
    kpi_chats: 'Scam Chats',
    kpi_errors: 'Mistakes',
    kpi_rank: 'Your Rank',
    cert_fio_label: 'Enter your full name to download your certificate',
    btn_download_cert: 'Download Certificate (PNG)',
    chart_types_title: 'Accuracy by Task Type',
    chart_types_sub: 'Percentage of correct answers per skill',
    chart_dyn_title: 'Progress Dynamics',
    chart_dyn_sub: 'Score growth across attempts & sessions (%)',
    ach_title: 'Achievements',
    ach_sub: 'Complete tasks accurately to unlock every badge',
    btn_reset_all: 'Reset all progress',
    profile_modal_title: 'Student Profile',
    check_answer: 'Check Answer',
    retry_card: 'Try Again',
    next_card: 'Next Card',
    to_results: 'View Results',
    correct_title: 'Correct! Well done',
    wrong_title: 'Not quite — let’s review',
    true_btn: 'True',
    false_btn: 'False',
    levels: { 1: 'Basic (1/3)', 2: 'Medium (2/3)', 3: 'Advanced (3/3)' },
    levelShort: { 1: 'Level 1', 2: 'Level 2', 3: 'Level 3' },
    types: {
      choice: 'Multiple Choice',
      truefalse: 'True / False',
      sort: 'Categorize',
      match: 'Matching',
      order: 'Action Order'
    },
    typesShort: {
      choice: 'Choice',
      truefalse: 'True/False',
      sort: 'Sorting',
      match: 'Matching',
      order: 'Order'
    },
    of_word: 'of',
    student_default: 'Student',
    class_suffix: 'gr.',
    adaptive_up: 'Adaptive difficulty increased — next task will be more challenging.',
    adaptive_down: 'Adaptive difficulty adjusted — next task will be gentler to reinforce basics.',
    match_hint_left: '1. Pick a situation on the left',
    match_hint_right: '2. Now pick the matching reaction on the right',
    sort_hint: 'Assign each item to the right category:',
    order_hint: 'Drag steps using the handle on the left or use the arrows (1 to 4):',
    sort_drag_hint: 'Drag cards into the right basket (or tap a card, then tap a basket):',
    sort_pool_empty: 'All cards sorted! Click "Check Answer".',
    match_drag_hint: 'Drag a situation on the left onto a reaction on the right (or click to connect):',
    drop_here: 'Drop here',
    streak_label: 'Streak'
  },
  kca: {
    portal_name: 'Югра цифровой хоят',
    app_title: 'Югра кибер-карточкат',
    tab_cards: 'Кибер-карточкат',
    tab_chat: 'Потӑр симулятор',
    tab_blitz: 'Блиц 60с',
    blitz_title: 'Блиц: мошенникӑт пӑнтэ!',
    blitz_sub: '60 секунда • 3 сӑм • комбо',
    blitz_record_lbl: 'Рекорд',
    blitz_rules: '60 секундайн пириэ: тәса нєпек аӆпа мошенник!',
    blitz_btn_safe: 'Тәса',
    blitz_btn_ban: 'БАН! (Мошенник)',
    blitz_start_btn: 'Оӆӊӑӆ! (60с)',
    blitz_score_lbl: 'Очки',
    blitz_acc_lbl: 'Тәса',
    blitz_again_btn: 'Иӆпийн',
    tab_results: 'Аналитика па сертификат',
    overall_progress: 'Иса вєр:',
    card_counter_label: 'Миссия:',
    adaptive_label: 'Уровень:',
    btn_restart_cards: 'Оӆӊӑӆ эвӑӆт',
    score_now: 'Звёздат:',
    btn_read_aloud: 'Ӆўӊӑтты',
    btn_stop_aloud: 'Пӑнтты',
    btn_hint: 'Нётты ясӑӊ',
    yugorka_name: 'Кибер-Стив',
    yugorka_role: 'Югра кибер-герой',
    detective_bar: 'Детектив лупа: картинкайн ӑн тәса тӑхет пириэ!',
    detective_done: 'Иса уликайт кӑншсыйт! Ёмӑщ вєр!',
    clue_xp: '+15 XP • Улика!',
    yugorka_idle: [
      'Вўща! Ма {HERO}. Ияха мошенникӑт эвӑӆт ӆавӑӆӆўв!',
      'Вәньщэ! Нётты мӑсӆ ки — «Нётты ясӑӊ» пириэ!'
    ],
    yugorka_win: [
      'Ёмӑщ! Пәмащипа! Тәса ястӑсэн!',
      'Тәса! Нӑӊ кибер-щитэн тӑкшӑк йис!'
    ],
    yugorka_oops: [
      'Ӑн тәса — ӑн ӆӑвӑрт! Ияха вәньщӆўв па иӆпийн вєрӆўв!'
    ],
    yugorka_pet: [
      'Вўща! Иса звёздат ӑкӑтэ!'
    ],
    yugorka_drag: [
      'Вўща! Тӑта ёмӑщ тӑхи!',
      'Еӆӆы вәньщӆўв!'
    ],
    hotbar_title: 'Кибер-лут инвентарь',
    hotbar_sub: 'Карточкат вєрэ па лут ӑкӑтэ!',
    btn_try_chat: 'Потӑр симулятор пуншты',
    btn_open_cert: 'Сертификат па ачивкат',
    grade_5_7: '5–7 кл.',
    grade_8_11: '8–11 кл.',
    chat_tip: 'Иса чатӑт мошенникӑт ӑн вәӆӆӑт! Профиль, SMS па телефон вәньщэ.',
    chat_empty_title: 'Потӑр симулятор',
    chat_empty_desc: 'Потӑрӑтн ӑн тәса хоятӑт кӑншэ, SMS вәньщэ па мошенникӑт эвӑӆт ӆавӑӆты.',
    chat_open_first: 'Оӆӑӊ чат пуншты',
    btn_block: 'Пӑнтты (Блок)',
    btn_replay: 'Иӆпийн',
    chat_done_short: 'Чат вєрсы!',
    btn_next_short: 'Єӆӆы',
    kpi_loot: 'Ӑкӑтӑм лут',
    prof_fio_lbl: 'Нємєн (ФИО)',
    prof_fio_hint: 'Сертификата хӑншӆ.',
    prof_grade_lbl: 'Класс',
    prof_hero_lbl: 'Нӑӊ юрєн',
    opt_grade_1_4: '1–4 классат',
    opt_grade_5_7: '5–7 классат',
    opt_grade_8_11: '8–11 классат',
    btn_cancel: 'Ӑн мӑсӆ',
    btn_save: 'Пунты',
    chars_6: '6 знак',
    grade_word: 'Класс',
    chat_today: 'Тӑм хӑтӆ',
    chat_online: 'онлайн',
    chat_bot: 'бот',
    chat_blocked: 'пӑнтсы',
    chat_typing: 'хӑншӆ...',
    chat_typing_full: 'Хоят хӑншӆ...',
    chat_pick_reply: 'Ястӑпсы пириэ:',
    chat_done_choices: 'Чат вєрсы:',
    chat_next_btn: 'Єӆӆы чат',
    chat_replay_btn: 'Иӆпийн',
    chat_passed_prefix: 'Вєрсы',
    chat_you_prefix: 'Нӑӊ: ',
    chat_voice_lbl: 'Голос нєпек',
    chat_transcript_btn: 'Ӆўӊӑтты',
    chat_safe_done: 'Вєрсы! Тәса хоят',
    chat_scam_done: 'Вєрсы! Мошенник пӑнтсы',
    chat_no_sms: 'SMS ӑнтєм. Ӆыв «Потӑр симулятор» чатӑтн юхӑтӆӑт.',
    btn_pass_lab: 'Пароль вәньщты',
    pass_lab_title: 'Парольэн тӑк аӆпа ӑн?',
    pass_lab_sub: 'Йиӆуп пароль хӑншэ па вәньщэ!',
    pass_lab_gen: 'Тӑк пароль',
    pass_lab_time_lbl: 'Взлом время:',
    pl_len: '10 знак эвӑӆт',
    pl_case: 'Вән па ай буквайт',
    pl_num: 'Цифрайт вәӆӆӑт',
    pl_sym: 'Знак (! @ # $)',
    cards_done_title: 'Иса кибер-карточкат вєрӑн!',
    sim_inbox: 'Юхтӑм потӑрӑт',
    kpi_cards: 'Кибер-карточкат',
    kpi_chats: 'Потӑр симулятор',
    kpi_errors: 'Ӑн тәса вєрӑт',
    kpi_rank: 'Нӑӊ рангэн',
    cert_fio_label: 'Сертификат пӑта нємєн (ФИО) хӑншэ',
    btn_download_cert: 'Сертификат вўты (PNG)',
    chart_types_title: 'Вєр тӑхи эвӑӆт результат',
    chart_types_sub: 'Иса тип эвӑӆт тәса ястӑпсэт (%)',
    chart_dyn_title: 'Прогресс динамика',
    chart_dyn_sub: 'Попыткат эвӑӆт результат (%)',
    ach_title: 'Ачивкат (достиженият)',
    ach_sub: 'Ӑн тәса ӆыпи вєрӑт вєрэ — иса значокӑт вўӆӑн',
    btn_reset_all: 'Иса прогресс єсӑӆты',
    profile_modal_title: 'Утӆты хоят профиль',
    check_answer: 'Вәньщты',
    retry_card: 'Иӆпийн вєрты',
    next_card: 'Єӆӆы карточка',
    to_results: 'Результат вәньщты',
    correct_title: 'Тәса! Ёмӑщ вєр!',
    wrong_title: 'Ӑн тәса — вәньщӆўв',
    true_btn: 'Тәса (Верно)',
    false_btn: 'Ӑн тәса (Неверно)',
    levels: { 1: 'Оӆӑӊ (1/3)', 2: 'Кутоп (2/3)', 3: 'Вән (3/3)' },
    levelShort: { 1: 'Уровень 1', 2: 'Уровень 2', 3: 'Уровень 3' },
    types: {
      choice: 'Ястӑпсы пириты',
      truefalse: 'Тәса / Ӑн тәса',
      sort: 'Пєӆӑкн пунты',
      match: 'Кимӑӆтӑты',
      order: 'Вєрӑт тӑхи'
    },
    typesShort: {
      choice: 'Пириты',
      truefalse: 'Тәса/Ӑн',
      sort: 'Пєӆӑкн',
      match: 'Кимӑӆтӑты',
      order: 'Тӑхи'
    },
    of_word: 'эвӑӆт',
    student_default: 'Утӆты хоят',
    class_suffix: 'кл.',
    adaptive_up: 'Уровень вәнӑмӑс — єӆӆы вєр ӆӑвӑртшӑк вәӆӆ.',
    adaptive_down: 'Уровень айшӑк вєрсы — єӆӆы вєр моньщшӑк вәӆӆ.',
    match_hint_left: '1. Хӑӆ пєӆӑк вєр пириэ',
    match_hint_right: '2. Ин ем пєӆӑк тәса ястӑпсы пириэ',
    sort_hint: 'Иса пунктӑт тәса пєӆӑкн пунэ:',
    order_hint: 'Карточкат вўсэ па тәса тӑхийн пунэ аӆпа стрелкайтн (1 эвӑӆт 4 вәнта):',
    sort_drag_hint: 'Карточкат тәса корзинайн вўсэ (аӆпа карточка па корзина пириэ):',
    sort_pool_empty: 'Иса карточкат пунсыйт! «Вәньщты» кнопка пириэ.',
    match_drag_hint: 'Хӑӆ пєӆӑк вєр ем пєӆӑк ястӑпсыйн вўсэ (аӆпа пириэ):',
    drop_here: 'Тӑта пунэ',
    streak_label: 'Серия'
  }
};

function t(key) {
  return (I18N[state.lang] && I18N[state.lang][key]) || I18N.ru[key] || key;
}

function L(val) {
  if (val && typeof val === 'object') {
    return val[state.lang] || val.ru || '';
  }
  return val || '';
}

// ==================== СОСТОЯНИЕ ПРИЛОЖЕНИЯ ====================
const state = {
  lang: 'ru',
  activeTab: 'cards',         // 'cards' | 'chat' | 'blitz' | 'results'
  heroSkin: 'steve',          // 'steve' | 'alex'
  heroSkinManual: false,      // true, если ученик вручную переключил героя в профиле
  blitzBest: 0,
  profile: {
    fio: '',
    gradeClass: '5-7'         // '1-4' | '5-7' | '8-11'
  },
  // Состояние карточек
  currentCardId: null,
  adaptiveLevel: 1,           // 1, 2, 3
  supportMode: false,         // true после ошибки или для 1-4 кл.: реально упрощает задание (50/50, примеры, 1-й шаг)
  streak: 0,
  unlockedAchIds: [],
  cardResults: {},            // cardId -> { answered: bool, correct: bool, firstTryCorrect: bool, attempts: n }
  cardDraft: {},              // временный ответ на активной карточке
  sessionHistory: [],         // [{ label, pct }] для графика динамики

  // Состояние симулятора чатов
  chatGradeMode: '8-11',
  chatCompleted: [],
  chats: {},
  smsInbox: [],
  chatStats: {
    mistakes: 0,
    falseAlarms: 0,
    failedScenarioIds: []
  },
  activeScenarioId: null,
  replayingId: null,
  isTyping: false,
  typingTimers: [],
  callTimer: null,
  smsBannerTimer: null,
  activeVoiceTimer: null,
  chatSearch: '',

  // Прочее
  certId: '',
  embedMode: false,
  soundOn: true
};

// Специальные нативные SVG для мессенджера (фейковая галочка Premium и двойная галочка прочтения)
const TG_SVG = {
  fakePremiumBadge: (clickable = true) => `
    <span ${clickable ? `onclick="event.stopPropagation(); inspectFakeBadge()"` : ''}
      title="Эмодзи-статус Telegram Premium (нажми для проверки)"
      class="fake-prem-badge inline-flex items-center align-middle">
      <svg class="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="premGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6"/>
            <stop offset="55%" stop-color="#7c3aed"/>
            <stop offset="100%" stop-color="#c084fc"/>
          </linearGradient>
        </defs>
        <path d="M12 2.2l2.35 1.85 2.98-.12 1.04 2.8 2.66 1.38-.62 2.92 1.66 2.49-2.06 2.17.12 2.98-2.8 1.04-1.38 2.66-2.92-.62L10.54 22l-2.17-2.06-2.98.12-1.04-2.8-2.66-1.38.62-2.92-1.66-2.49 2.06-2.17-.12-2.98 2.8-1.04 1.38-2.66 2.92.62L12 2.2z" fill="url(#premGrad)"/>
        <path d="M8.7 12.2l2.1 2.1 4.6-4.6" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="19.5" cy="4.5" r="2.2" fill="#ec4899"/>
      </svg>
    </span>
  `,
  botTag: () => `<span class="px-1.5 py-[1px] rounded text-[10px] font-bold bot-pill">бот</span>`,
  doubleCheck: () => `<svg class="w-3.5 h-3.5 inline-block text-[#1e5aa8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 13 5 17 14 8"/><polyline points="7 13 11 17 22 6"/></svg>`
};

// Офлайн-фолбэк векторных иконок (если в школе закрыт CDN)
const OFFLINE_ICONS = {
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  'arrow-up': '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  'arrow-down': '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  'play': '<polygon points="5 3 19 12 5 21 5 3"/>',
  'square': '<rect x="6" y="6" width="12" height="12" rx="1"/>',
  'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'ban': '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
  'award': '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  'lock': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'grip-vertical': '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
  'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'
};

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
    return;
  }
  document.querySelectorAll('i[data-lucide]').forEach(el => {
    const name = el.getAttribute('data-lucide');
    const paths = OFFLINE_ICONS[name] || '<circle cx="12" cy="12" r="8"/>';
    const cls = el.getAttribute('class') || 'w-4 h-4';
    el.outerHTML = `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  });
}

// ==================== ИНТЕГРАЦИЯ С ПЛАТФОРМОЙ «ЦИФРОВОЙ ГРАЖДАНИН ЮГРЫ» ====================

function emitPortalEvent(eventName, payload = {}) {
  try {
    const msg = {
      source: 'cybercards-yugra',
      version: '1.0',
      event: eventName,
      timestamp: new Date().toISOString(),
      payload
    };
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(msg, '*');
    }
    window.dispatchEvent(new CustomEvent('cybercards:event', { detail: msg }));
  } catch (e) {}
}

function applyUrlParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') === '1') {
      state.embedMode = true;
      const brandRow = document.getElementById('portal-brand-row');
      if (brandRow) brandRow.classList.add('hidden');
    }
    const langParam = params.get('lang');
    if (['ru', 'en', 'kca'].includes(langParam)) state.lang = langParam;
    const fioParam = params.get('fio');
    if (fioParam && fioParam.trim()) {
      state.profile.fio = fioParam.trim();
      const autoSkin = window.FioGender ? window.FioGender.detectHeroSkin(state.profile.fio) : null;
      if (autoSkin) {
        state.heroSkin = autoSkin;
        state.heroSkinManual = false;
      }
    }
    const heroParam = params.get('hero');
    if (heroParam === 'steve' || heroParam === 'alex') {
      state.heroSkin = heroParam;
      state.heroSkinManual = true;
    }
    const classParam = params.get('grade');
    if (['1-4', '5-7', '8-11'].includes(classParam)) {
      state.profile.gradeClass = classParam;
      state.chatGradeMode = classParam === '8-11' ? '8-11' : '5-7';
      if (Object.keys(state.cardResults || {}).length === 0) {
        state.adaptiveLevel = classParam === '8-11' ? 3 : 1;
        state.supportMode = classParam === '1-4';
      }
    }
    const tabParam = params.get('tab');
    if (['cards', 'chat', 'blitz', 'results'].includes(tabParam)) {
      state.activeTab = tabParam;
    }
  } catch (e) {}
}

window.addEventListener('message', (e) => {
  const data = e.data;
  if (!data || data.target !== 'cybercards-yugra') return;
  if (data.action === 'setLang' && ['ru', 'en', 'kca'].includes(data.value)) setLang(data.value);
  if (data.action === 'setTab' && ['cards', 'chat', 'blitz', 'results'].includes(data.value)) switchMainTab(data.value);
});

// ==================== ЗАГРУЗКА ДАННЫХ ====================

function loadDataSources() {
  CARDS = Array.isArray(DEFAULT_CARDS) ? [...DEFAULT_CARDS] : [];
  try {
    const rawC = localStorage.getItem(CUSTOM_CARDS_KEY);
    if (rawC) {
      const customCards = JSON.parse(rawC);
      if (Array.isArray(customCards)) {
        customCards.forEach(c => { if (c && c.id && c.type) CARDS.push(c); });
      }
    }
  } catch (e) {}

  SCENARIOS = Array.isArray(DEFAULT_SCENARIOS) ? [...DEFAULT_SCENARIOS] : [];
  try {
    const rawS = localStorage.getItem(CUSTOM_SCENARIOS_KEY);
    if (rawS) {
      const customSc = JSON.parse(rawS);
      if (Array.isArray(customSc)) {
        customSc.forEach(s => { if (s && s.id && s.steps && s.steps.start) SCENARIOS.push(s); });
      }
    }
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const p = JSON.parse(raw);
    if (['ru', 'en', 'kca'].includes(p.lang)) state.lang = p.lang;
    if (p.heroSkin === 'steve' || p.heroSkin === 'alex') state.heroSkin = p.heroSkin;
    if (typeof p.heroSkinManual === 'boolean') state.heroSkinManual = p.heroSkinManual;
    if (typeof p.blitzBest === 'number') state.blitzBest = p.blitzBest;
    if (p.profile) state.profile = { ...state.profile, ...p.profile };
    if (p.currentCardId) state.currentCardId = p.currentCardId;
    if (typeof p.adaptiveLevel === 'number') state.adaptiveLevel = p.adaptiveLevel;
    if (typeof p.supportMode === 'boolean') state.supportMode = p.supportMode;
    if (typeof p.streak === 'number') state.streak = p.streak;
    if (Array.isArray(p.unlockedAchIds)) state.unlockedAchIds = p.unlockedAchIds;
    if (p.cardResults) state.cardResults = p.cardResults;
    if (Array.isArray(p.sessionHistory)) state.sessionHistory = p.sessionHistory;
    if (p.chatGradeMode === '5-7' || p.chatGradeMode === '8-11') state.chatGradeMode = p.chatGradeMode;
    if (Array.isArray(p.chatCompleted)) state.chatCompleted = p.chatCompleted;
    if (p.chats) state.chats = p.chats;
    if (Array.isArray(p.smsInbox)) state.smsInbox = p.smsInbox;
    if (p.chatStats) state.chatStats = { ...state.chatStats, ...p.chatStats };
    if (p.certId) state.certId = p.certId;
    if (typeof p.soundOn === 'boolean') {
      state.soundOn = p.soundOn;
      SoundFX.setEnabled(state.soundOn);
    }
  } catch (e) {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      lang: state.lang,
      heroSkin: state.heroSkin,
      heroSkinManual: state.heroSkinManual,
      blitzBest: state.blitzBest,
      profile: state.profile,
      currentCardId: state.currentCardId,
      adaptiveLevel: state.adaptiveLevel,
      supportMode: state.supportMode,
      streak: state.streak,
      unlockedAchIds: state.unlockedAchIds,
      cardResults: state.cardResults,
      sessionHistory: state.sessionHistory,
      chatGradeMode: state.chatGradeMode,
      chatCompleted: state.chatCompleted,
      chats: state.chats,
      smsInbox: state.smsInbox,
      chatStats: state.chatStats,
      certId: state.certId,
      soundOn: state.soundOn
    }));
  } catch (e) {}
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

function init() {
  loadDataSources();
  loadState();
  applyUrlParams();

  if (!state.certId) {
    state.certId = 'YUGRA-2026-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    saveState();
  }
  if (!state.currentCardId || !CARDS.some(c => c.id === state.currentCardId)) {
    state.currentCardId = CARDS[0].id;
  }

  // Если ФИО уже задано (и скин не закреплён вручную), подбираем Стива/Алекс автоматически
  if (state.profile.fio && !state.heroSkinManual && window.FioGender) {
    const autoSkin = window.FioGender.detectHeroSkin(state.profile.fio);
    if (autoSkin) state.heroSkin = autoSkin;
  }

  // Привязка поля ФИО на вкладке результатов
  const certInp = document.getElementById('cert-name-input');
  if (certInp) {
    certInp.value = state.profile.fio || '';
    certInp.addEventListener('input', () => {
      state.profile.fio = certInp.value;
      if (!state.heroSkinManual && window.FioGender) {
        const autoSkin = window.FioGender.detectHeroSkin(state.profile.fio);
        if (autoSkin && autoSkin !== state.heroSkin) {
          state.heroSkin = autoSkin;
          updateMascot('idle', null, false);
        }
      }
      saveState();
      updateHeaderProfileUI();
      updateCertFormUI();
    });
  }

  // Поиск в чатах
  const chatSearch = document.getElementById('chat-search');
  if (chatSearch) {
    chatSearch.addEventListener('input', (e) => {
      state.chatSearch = e.target.value.trim().toLowerCase();
      renderChatList();
    });
  }

  window.addEventListener('resize', () => {
    if (state.activeTab === 'cards') drawMatchConnectorLines();
    if (state.activeTab === 'chat') scrollChatToBottom(false);
  });
  const choicesDock = document.getElementById('chat-choices-dock');
  if (choicesDock && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
      if (state.activeTab === 'chat') scrollChatToBottom(false);
    }).observe(choicesDock);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeStudentProfileModal();
      closeSmsModal();
      closeProfileModal();
      closeReportModal();
      closeFalseAlarmModal();
      closeCallModal();
      closePasswordLab();
    }
  });

  applyLanguageUI();
  updateHeaderProfileUI();
  updateSoundIcon();
  updateSmsBadge();
  updateChatGradeUI();
  initDraggableSteve();
  initVoxelBackground();
  updateBlitzStartUI();
  renderCurrentCard();
  renderChatList();
  updateAllProgressBadges();
  switchMainTab(state.activeTab, false);
  refreshIcons();

  emitPortalEvent('ready', {
    lang: state.lang,
    totalCards: CARDS.length,
    totalChats: getActiveGradeScenarios().length
  });
}

// ==================== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК И ЯЗЫКА ====================

function switchMainTab(tab, announce = true) {
  stopReadAloud();
  if (tab !== 'blitz') stopBlitzTimerOnly();
  state.activeTab = tab;
  ['cards', 'chat', 'blitz', 'results'].forEach(name => {
    const v = document.getElementById(`view-${name}`);
    const n = document.getElementById(`nav-tab-${name}`);
    if (v) v.classList.toggle('hidden', name !== tab);
    if (n) n.classList.toggle('active', name === tab);
  });

  // Для вкладки «Симулятор чатов» фиксируем высоту ровно под экран — никаких прокруток всей страницы!
  const mainEl = document.getElementById('app-main');
  if (tab === 'chat') {
    document.body.classList.remove('min-h-screen');
    document.body.classList.add('h-[100dvh]', 'overflow-hidden');
    if (mainEl) {
      mainEl.classList.remove('py-5', 'sm:py-6');
      mainEl.classList.add('min-h-0', 'overflow-hidden', 'py-2.5', 'sm:py-3');
    }
    window.scrollTo(0, 0);
  } else {
    document.body.classList.remove('h-[100dvh]', 'overflow-hidden');
    document.body.classList.add('min-h-screen');
    if (mainEl) {
      mainEl.classList.remove('min-h-0', 'overflow-hidden', 'py-2.5', 'sm:py-3');
      mainEl.classList.add('py-5', 'sm:py-6');
    }
  }

  if (tab === 'cards') {
    renderCurrentCard();
  } else if (tab === 'chat') {
    renderChatList();
    scrollChatToBottom(false);
  } else if (tab === 'blitz') {
    updateBlitzStartUI();
  } else if (tab === 'results') {
    renderResultsDashboard();
  }
  refreshIcons();
}

function setLang(lang) {
  if (!['ru', 'en', 'kca'].includes(lang)) return;
  stopReadAloud();
  state.lang = lang;
  saveState();
  applyLanguageUI();
  updateReadAloudAvailability();
  renderCurrentCard();
  renderChatList();
  if (state.activeScenarioId) {
    const activeSc = getScenarioById(state.activeScenarioId);
    if (activeSc) {
      const hdrName = document.getElementById('chat-header-name');
      if (hdrName) hdrName.textContent = activeSc.title;
      openOrRestoreConversation(activeSc);
    }
  }
  if (state.activeTab === 'results') renderResultsDashboard();
  refreshIcons();
}

function applyLanguageUI() {
  document.documentElement.lang = state.lang;
  ['ru', 'kca', 'en'].forEach(code => {
    const btn = document.getElementById(`lang-${code}`);
    if (btn) {
      btn.className = state.lang === code
        ? 'px-2 py-1 rounded-md bg-cgy-accent text-white transition'
        : 'px-2 py-1 rounded-md text-cgy-muted hover:text-cgy-text transition';
    }
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  updateHeaderProfileUI();
}

// ==================== ПРОФИЛЬ УЧЕНИКА И АВТОВЫБОР ГЕРОЯ ====================

let modalHeroDraft = 'steve';
let modalHeroManual = false;

function renderHeaderHeroMini() {
  const mini = document.getElementById('header-hero-mini');
  if (!mini) return;
  const stars = getCardStatsSummary().correct;
  mini.innerHTML = getYugorkaSvg('idle', stars, state.heroSkin);
}

function updateHeaderProfileUI() {
  const shortName = (state.profile.fio || '').trim().split(/\s+/)[0] || t('student_default');
  document.getElementById('header-profile-label').textContent = `${shortName} • ${state.profile.gradeClass} ${t('class_suffix')}`;
  const pill = document.getElementById('cert-class-pill');
  if (pill) pill.textContent = `${t('grade_word')}: ${state.profile.gradeClass} ${t('class_suffix')}`;
  renderHeaderHeroMini();
}

function updateProfileHeroPickerUI(statusKind = 'auto') {
  const stars = getCardStatsSummary().correct;
  const prevSteve = document.getElementById('prof-hero-preview-steve');
  const prevAlex = document.getElementById('prof-hero-preview-alex');
  if (prevSteve) prevSteve.innerHTML = getYugorkaSvg('idle', stars, 'steve');
  if (prevAlex) prevAlex.innerHTML = getYugorkaSvg('idle', stars, 'alex');

  const cardSteve = document.getElementById('prof-hero-card-steve');
  const cardAlex = document.getElementById('prof-hero-card-alex');
  const isEn = state.lang === 'en';
  if (cardSteve) {
    const active = modalHeroDraft === 'steve';
    cardSteve.className = active
      ? 'flex items-center gap-2.5 p-2.5 rounded-xl border-2 border-cgy-accent bg-[#eef5ff] text-left transition shadow-sm'
      : 'flex items-center gap-2.5 p-2.5 rounded-xl border-2 border-cgy-border bg-white hover:bg-cgy-bg text-left transition';
    const titleEl = cardSteve.querySelector('.font-bold');
    const subEl = cardSteve.querySelector('.text-\\[11px\\]');
    if (titleEl) titleEl.textContent = isEn ? 'Cyber-Steve' : 'Кибер-Стив';
    if (subEl) subEl.textContent = isEn ? 'Male buddy' : 'Напарник';
  }
  if (cardAlex) {
    const active = modalHeroDraft === 'alex';
    cardAlex.className = active
      ? 'flex items-center gap-2.5 p-2.5 rounded-xl border-2 border-[#16a34a] bg-[#ecfdf5] text-left transition shadow-sm'
      : 'flex items-center gap-2.5 p-2.5 rounded-xl border-2 border-cgy-border bg-white hover:bg-cgy-bg text-left transition';
    const titleEl = cardAlex.querySelector('.font-bold');
    const subEl = cardAlex.querySelector('.text-\\[11px\\]');
    if (titleEl) titleEl.textContent = isEn ? 'Cyber-Alex' : 'Кибер-Алекс';
    if (subEl) subEl.textContent = isEn ? 'Female buddy' : 'Напарница';
  }

  const badge = document.getElementById('prof-hero-auto-badge');
  if (badge) {
    if (statusKind === 'manual') {
      badge.textContent = isEn ? 'Picked manually' : 'Выбрано вручную';
      badge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-cgy-text border border-slate-300';
    } else if (statusKind === 'androgynous') {
      badge.textContent = isEn ? 'Unisex name — pick one' : 'Подходит обоим — выбери сам';
      badge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#f59e0b]/60';
    } else if (statusKind === 'detected') {
      badge.textContent = isEn ? 'Auto-matched by name' : 'Подобрано по имени';
      badge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#15803d] border border-[#86efac]';
    } else {
      badge.textContent = isEn ? 'Auto by name' : 'Автовыбор по имени';
      badge.className = 'text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#eef5ff] text-cgy-accent border border-[#bfd7f5]';
    }
  }
}

function onProfileFioInput() {
  const val = (document.getElementById('prof-fio-input')?.value || '').trim();
  if (!window.FioGender || !val) {
    updateProfileHeroPickerUI(modalHeroManual ? 'manual' : 'idle');
    return;
  }
  const gender = window.FioGender.detect(val);
  if (gender === 'female') {
    modalHeroDraft = 'alex';
    modalHeroManual = false;
    updateProfileHeroPickerUI('detected');
  } else if (gender === 'male') {
    modalHeroDraft = 'steve';
    modalHeroManual = false;
    updateProfileHeroPickerUI('detected');
  } else if (gender === 'androgynous') {
    updateProfileHeroPickerUI('androgynous');
  } else {
    updateProfileHeroPickerUI(modalHeroManual ? 'manual' : 'idle');
  }
}

function selectProfileHero(skin) {
  if (skin !== 'steve' && skin !== 'alex') return;
  modalHeroDraft = skin;
  modalHeroManual = true;
  SoundFX.playPick();
  updateProfileHeroPickerUI('manual');
}

function openStudentProfileModal() {
  document.getElementById('prof-fio-input').value = state.profile.fio || '';
  document.getElementById('prof-class-select').value = state.profile.gradeClass || '5-7';
  modalHeroDraft = state.heroSkin || 'steve';
  modalHeroManual = !!state.heroSkinManual;

  let statusKind = modalHeroManual ? 'manual' : 'idle';
  if (!modalHeroManual && state.profile.fio && window.FioGender) {
    const g = window.FioGender.detect(state.profile.fio);
    if (g === 'female') { modalHeroDraft = 'alex'; statusKind = 'detected'; }
    else if (g === 'male') { modalHeroDraft = 'steve'; statusKind = 'detected'; }
    else if (g === 'androgynous') { statusKind = 'androgynous'; }
  }
  updateProfileHeroPickerUI(statusKind);
  document.getElementById('student-profile-modal').classList.remove('hidden');
  refreshIcons();
}

function closeStudentProfileModal() {
  document.getElementById('student-profile-modal').classList.add('hidden');
}

function saveStudentProfile(e) {
  e.preventDefault();
  const prevSkin = state.heroSkin;
  const prevGrade = state.profile.gradeClass;
  state.profile.fio = document.getElementById('prof-fio-input').value.trim();
  state.profile.gradeClass = document.getElementById('prof-class-select').value;
  state.chatGradeMode = state.profile.gradeClass === '8-11' ? '8-11' : '5-7';
  state.heroSkin = modalHeroDraft === 'alex' ? 'alex' : 'steve';
  state.heroSkinManual = modalHeroManual;

  if (state.profile.gradeClass !== prevGrade) {
    if (state.profile.gradeClass === '1-4') {
      state.adaptiveLevel = 1;
      state.supportMode = true;
    } else if (state.profile.gradeClass === '8-11') {
      state.adaptiveLevel = 3;
      state.supportMode = false;
    } else if (Object.keys(state.cardResults || {}).length === 0) {
      state.adaptiveLevel = 1;
      state.supportMode = false;
    }
    // Пересобираем черновик текущей нерешённой карточки под новый режим сложности
    const curRes = state.cardResults[state.currentCardId];
    if (!curRes || !curRes.answered || state.cardDraft.retrying) {
      state.cardDraft = { retrying: Boolean(state.cardDraft.retrying) };
    }
  }
  saveState();

  const certInp = document.getElementById('cert-name-input');
  if (certInp) certInp.value = state.profile.fio;

  updateHeaderProfileUI();
  updateChatGradeUI();
  updateCertFormUI();
  updateAllProgressBadges();
  renderCurrentCard();
  renderChatList();
  closeStudentProfileModal();

  if (state.heroSkin !== prevSkin) {
    stopReadAloud();
    SoundFX.playConnect();
    const isAlex = state.heroSkin === 'alex';
    const greet = state.lang === 'en'
      ? (isAlex ? 'Hey! I am Cyber-Alex — ready to catch scammers together!' : 'Hey! Cyber-Steve is on patrol with you!')
      : (isAlex ? 'Привет! Я Кибер-Алекс — погнали ловить мошенников вместе!' : 'Привет! Я Кибер-Стив — погнали ловить мошенников!');
    updateMascot('happy', greet, true);
  } else {
    updateMascot('idle', null, false);
  }

  showToast(state.lang === 'en' ? 'Profile saved' : 'Профиль ученика сохранён', 'success');
}

// ==================== ДВИЖОК КИБЕР-КАРТОЧЕК (5 ТИПОВ ЗАДАНИЙ + АДАПТИВНАЯ СЛОЖНОСТЬ) ====================

function getCardById(id) {
  return CARDS.find(c => c.id === id) || CARDS[0];
}

function getCardStatsSummary() {
  const total = CARDS.length;
  let answered = 0;
  let correct = 0;
  let firstTryCorrect = 0;
  let totalErrors = 0;

  CARDS.forEach(c => {
    const r = state.cardResults[c.id];
    if (r && r.answered) {
      answered++;
      if (r.correct) correct++;
      if (r.firstTryCorrect) firstTryCorrect++;
      totalErrors += (r.wrongCount || 0);
    }
  });

  const pct = total ? Math.round((correct / total) * 100) : 0;
  return { total, answered, correct, firstTryCorrect, totalErrors, pct };
}

function renderCardsStepper() {
  const box = document.getElementById('cards-stepper');
  box.innerHTML = '';

  CARDS.forEach((c, idx) => {
    const r = state.cardResults[c.id];
    const isCurrent = c.id === state.currentCardId;
    let cls = 'bg-[#f8fafc] text-cgy-muted border-[#cbd5e1] hover:border-cgy-accent hover:text-cgy-accent';
    let inner = `<span>${idx + 1}</span>`;

    if (r && r.answered && r.correct) {
      cls = 'bg-[#fef3c7] text-[#b45309] border-[#f59e0b] font-extrabold shadow-sm';
      inner = '<i data-lucide="star" class="w-4 h-4 fill-[#f59e0b] text-[#d97706]"></i>';
    } else if (r && r.answered && !r.correct) {
      cls = 'bg-[#fdecec] text-cgy-err border-cgy-err font-extrabold';
      inner = '<i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>';
    }
    if (isCurrent) {
      cls = 'bg-cgy-accent text-white border-[#133b72] font-extrabold mission-node-current';
      if (r && r.answered && r.correct) {
        inner = '<i data-lucide="star" class="w-4 h-4 fill-[#fde047] text-[#fde047]"></i>';
      }
    }

    const btn = document.createElement('button');
    btn.className = `mission-node w-9 h-9 rounded-full border-2 text-xs flex items-center justify-center ${cls}`;
    btn.innerHTML = inner;
    btn.title = `${idx + 1}. ${L(c.title)} (${t('types')[c.type]})`;
    btn.onclick = () => selectCardById(c.id);
    box.appendChild(btn);
  });
}

function selectCardById(cardId) {
  stopReadAloud();
  state.currentCardId = cardId;
  state.cardDraft = {};
  saveState();
  SoundFX.playPick();
  renderCurrentCard(true);
}

function isSupportModeActive(card) {
  if (!card) return false;
  const res = state.cardResults[card.id];
  const isRetryingAfterError = Boolean(state.cardDraft && state.cardDraft.retrying && res && !res.correct);
  return Boolean(state.supportMode || isRetryingAfterError);
}

function getNextAdaptiveTarget() {
  const unanswered = CARDS.filter(c => !(state.cardResults[c.id] && state.cardResults[c.id].answered));
  if (unanswered.length > 0) {
    unanswered.sort((a, b) => Math.abs((a.level || 1) - state.adaptiveLevel) - Math.abs((b.level || 1) - state.adaptiveLevel));
    return { card: unanswered[0], reason: 'adaptive' };
  }
  const wrongCards = CARDS.filter(c => {
    const r = state.cardResults[c.id];
    return r && r.answered && !r.correct && c.id !== state.currentCardId;
  });
  if (wrongCards.length > 0) {
    return { card: wrongCards[0], reason: 'review' };
  }
  return null;
}

function initCardDraftIfNeeded(card) {
  if (state.cardDraft.cardId === card.id) return;
  const savedRes = state.cardResults[card.id];
  const wasRetrying = Boolean(state.cardDraft.retrying);
  const restoringEvaluated = Boolean(savedRes && savedRes.answered && savedRes.savedDraft && !wasRetrying);
  state.cardDraft = { cardId: card.id, retrying: wasRetrying };
  if (restoringEvaluated) {
    state.cardDraft = { cardId: card.id, ...JSON.parse(JSON.stringify(savedRes.savedDraft)) };
    return;
  }

  const supportOn = isSupportModeActive(card);
  state.cardDraft.supportApplied = supportOn;

  if (card.type === 'choice') {
    if (supportOn && Array.isArray(card.options) && card.options.length >= 3) {
      const wrongOpt = card.options.find(o => !o.correct);
      if (wrongOpt) state.cardDraft.eliminatedOptId = wrongOpt.id;
    }
  } else if (card.type === 'truefalse') {
    state.cardDraft.showHint = supportOn;
  } else if (card.type === 'sort') {
    state.cardDraft.assignments = {}; // itemId -> 'safe' | 'private'
    state.cardDraft.lockedIds = [];
    if (supportOn && Array.isArray(card.items)) {
      const oneSafe = card.items.find(it => it.bucket === 'safe');
      const onePriv = card.items.find(it => it.bucket === 'private');
      [oneSafe, onePriv].forEach(it => {
        if (it) {
          state.cardDraft.assignments[it.id] = it.bucket;
          state.cardDraft.lockedIds.push(it.id);
        }
      });
    }
  } else if (card.type === 'match') {
    state.cardDraft.selectedLeft = null;
    state.cardDraft.pairs = {}; // leftId -> rightId
    state.cardDraft.lockedLeftId = null;
    // Детерминированно перемешанный правый столбец
    const rightIds = card.pairs.map(p => p.id);
    const shuffled = [...rightIds];
    if (shuffled.length > 1) {
      const first = shuffled.shift();
      shuffled.push(first);
      if (shuffled.length > 3) {
        [shuffled[0], shuffled[2]] = [shuffled[2], shuffled[0]];
      }
    }
    state.cardDraft.rightOrder = shuffled;
    if (supportOn && card.pairs.length >= 3) {
      const starter = card.pairs[0];
      state.cardDraft.pairs[starter.id] = starter.id;
      state.cardDraft.lockedLeftId = starter.id;
    }
  } else if (card.type === 'order') {
    // Перемешанный порядок шагов (отличный от правильного)
    const ids = card.steps.map(s => s.id);
    if (supportOn && ids.length >= 3) {
      // В облегчённом режиме шаг №1 сразу зафиксирован на месте, а остальные 3 перемешаны!
      const firstStep = card.steps.find(s => s.correctPos === 0);
      const rest = card.steps.filter(s => s.id !== (firstStep ? firstStep.id : ids[0])).map(s => s.id);
      if (rest.length >= 2) {
        const last = rest.pop();
        rest.unshift(last);
      }
      state.cardDraft.order = [firstStep ? firstStep.id : ids[0], ...rest];
      state.cardDraft.lockedFirst = true;
    } else {
      state.cardDraft.order = ids.length === 4 ? [ids[2], ids[0], ids[3], ids[1]] : [...ids].reverse();
      state.cardDraft.lockedFirst = false;
    }
  }
}

function renderCurrentCard(animateEntrance = false) {
  const card = getCardById(state.currentCardId);
  if (!card) return;
  initCardDraftIfNeeded(card);

  if (animateEntrance) {
    const stage = document.getElementById('card-stage');
    if (stage) {
      stage.classList.remove('card-enter');
      void stage.offsetWidth;
      stage.classList.add('card-enter');
    }
  }

  const idx = CARDS.findIndex(c => c.id === card.id);
  const stats = getCardStatsSummary();
  const res = state.cardResults[card.id];
  const isEvaluated = Boolean(res && res.answered && !state.cardDraft.retrying);

  // Верхняя строка статуса
  document.getElementById('card-step-text').textContent = `${idx + 1} ${t('of_word')} ${CARDS.length}`;
  const lvlText = t('levels')[state.adaptiveLevel] || t('levels')[1];
  const adaptBadge = document.getElementById('adaptive-level-badge');
  const adaptWrap = document.getElementById('adaptive-pill-wrap');
  const supportApplied = !isEvaluated && Boolean(state.cardDraft.supportApplied);
  if (adaptBadge) {
    adaptBadge.textContent = state.supportMode
      ? `${lvlText} • ${state.lang === 'en' ? 'Guided' : 'Облегчено'}`
      : lvlText;
    adaptBadge.className = state.supportMode ? 'font-extrabold text-[#15803d]' : 'font-extrabold text-cgy-accent';
  }
  if (adaptWrap) {
    adaptWrap.className = state.supportMode
      ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ecfdf5] border-2 border-[#86efac] text-xs font-bold text-[#166534] transition'
      : 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border-2 border-[#d1d5db] text-xs font-bold text-cgy-muted transition';
  }
  document.getElementById('cards-live-score').textContent = `${stats.correct} / ${stats.total}`;

  // Наглядная плашка облегчённого режима (чтобы было сразу видно, ЧТО именно упростилось!)
  const assistBar = document.getElementById('adaptive-assist-bar');
  const assistText = document.getElementById('adaptive-assist-text');
  if (assistBar && assistText) {
    if (supportApplied) {
      const isEn = state.lang === 'en';
      let msg = '';
      if (card.type === 'choice' && state.cardDraft.eliminatedOptId) {
        msg = isEn
          ? 'Guided mode active: 1 wrong option has been crossed out (50/50).'
          : 'Облегчённый режим: 1 неверный вариант уже убран — осталось выбрать из двух.';
      } else if (card.type === 'sort' && (state.cardDraft.lockedIds || []).length > 0) {
        msg = isEn
          ? `Guided mode active: ${state.cardDraft.lockedIds.length} example cards are already sorted for you.`
          : `Облегчённый режим: ${state.cardDraft.lockedIds.length} карточки уже разложены по корзинам как пример.`;
      } else if (card.type === 'match' && state.cardDraft.lockedLeftId) {
        msg = isEn
          ? 'Guided mode active: pair #1 is already connected as an example.'
          : 'Облегчённый режим: первая пара уже соединена для примера — осталось соединить остальные.';
      } else if (card.type === 'order' && state.cardDraft.lockedFirst) {
        msg = isEn
          ? 'Guided mode active: Step #1 is locked in the right spot — arrange the remaining steps.'
          : 'Облегчённый режим: шаг №1 уже поставлен на верное место — расставь остальные.';
      } else if (card.type === 'truefalse') {
        const tip = card.mascotTip ? L(card.mascotTip) : '';
        msg = isEn
          ? `Guided mode active — detective hint unlocked: ${tip}`
          : `Облегчённый режим — подсказка открыта сразу: ${tip}`;
      }
      if (msg) {
        assistText.textContent = msg;
        assistBar.classList.remove('hidden');
      } else {
        assistBar.classList.add('hidden');
      }
    } else {
      assistBar.classList.add('hidden');
    }
  }

  // Теги карточки
  const typeIcons = {
    choice: 'check-square',
    truefalse: 'scale',
    sort: 'folder-input',
    match: 'git-compare-arrows',
    order: 'list-ordered'
  };
  document.getElementById('card-type-pill').innerHTML = `
    <i data-lucide="${typeIcons[card.type] || 'check-square'}" class="w-3.5 h-3.5"></i>
    <span>${t('types')[card.type]}</span>
  `;
  document.getElementById('card-topic-pill').textContent = L(card.topicLabel);
  const lvl = card.level || 1;
  document.getElementById('card-diff-pill').textContent = `${'★'.repeat(lvl)}${'☆'.repeat(Math.max(0, 3 - lvl))} ${t('levelShort')[lvl]}`;

  // Яркая игровая цветовая шапка карточки под каждую тему (никакой «белой бумаги»!)
  const topicThemes = {
    game:     { banner: 'from-[#dbeafe] via-[#e0f2fe] to-[#eff6ff] border-[#93c5fd]', stage: 'border-[#93c5fd]' },
    password: { banner: 'from-[#fef3c7] via-[#fef9c3] to-[#fffbeb] border-[#fcd34d]', stage: 'border-[#f59e0b]/70' },
    privacy:  { banner: 'from-[#d1fae5] via-[#e6f9ef] to-[#ecfdf5] border-[#6ee7b7]', stage: 'border-[#34d399]' },
    bullying: { banner: 'from-[#ede9fe] via-[#f3e8ff] to-[#faf5ff] border-[#c4b5fd]', stage: 'border-[#a78bfa]' },
    phishing: { banner: 'from-[#e0f2fe] via-[#dbeafe] to-[#eef6ff] border-[#7dd3fc]', stage: 'border-[#60a5fa]' },
    hacked:   { banner: 'from-[#ffedd5] via-[#fef3c7] to-[#fff7ed] border-[#fdba74]', stage: 'border-[#fb923c]' },
    shopping: { banner: 'from-[#ccfbf1] via-[#e0f2fe] to-[#f0fdfa] border-[#5eead4]', stage: 'border-[#2dd4bf]' }
  };
  const theme = topicThemes[card.topic] || topicThemes.game;
  const bannerEl = document.getElementById('card-banner');
  const stageEl = document.getElementById('card-stage');
  if (bannerEl) {
    bannerEl.className = `bg-gradient-to-r ${theme.banner} border-b-2 px-4 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-2`;
  }
  if (stageEl) {
    stageEl.className = `bg-white border-2 ${theme.stage} border-b-[6px] rounded-3xl shadow-md overflow-hidden flex flex-col`;
  }

  document.getElementById('card-title').textContent = L(card.title);
  document.getElementById('card-prompt').textContent = L(card.prompt);

  // Обновляем живого маскота Югорку под текущее состояние карточки
  if (isEvaluated) {
    const winList = t('yugorka_win');
    const oopsList = t('yugorka_oops');
    const speech = res.correct
      ? winList[idx % winList.length]
      : oopsList[idx % oopsList.length];
    updateMascot(res.correct ? 'happy' : 'oops', speech, false);
  } else {
    const idleList = t('yugorka_idle');
    const defaultMsg = (card.clues && card.clues.length)
      ? `${idleList[idx % idleList.length]}`
      : idleList[idx % idleList.length];
    updateMascot('idle', defaultMsg, false);
  }

  // Обновляем серию (комбо)
  const streakPill = document.getElementById('streak-pill');
  const streakText = document.getElementById('streak-text');
  if (streakPill && streakText) {
    if (state.streak >= 2) {
      streakPill.classList.remove('hidden');
      streakText.textContent = `${t('streak_label')}: ${state.streak}`;
    } else {
      streakPill.classList.add('hidden');
    }
  }

  // Рендерим наглядный визуальный блок ситуации (мини-чат / браузер / индикатор пароля / алерт)
  renderCardVisual(card);

  renderCardsStepper();
  renderLootHotbar();
  updateReadAloudAvailability();

  const body = document.getElementById('card-interactive-body');
  body.innerHTML = '';

  // Рендерим механику в зависимости от типа карточки
  if (card.type === 'choice') {
    renderChoiceTask(card, body, isEvaluated, res);
  } else if (card.type === 'truefalse') {
    renderTrueFalseTask(card, body, isEvaluated, res);
  } else if (card.type === 'sort') {
    renderSortTask(card, body, isEvaluated);
  } else if (card.type === 'match') {
    renderMatchTask(card, body, isEvaluated);
  } else if (card.type === 'order') {
    renderOrderTask(card, body, isEvaluated);
  }

  // Обратная связь и кнопки действий
  const fb = document.getElementById('card-feedback');
  const checkBtn = document.getElementById('btn-card-check');
  const retryBtn = document.getElementById('btn-card-retry');
  const nextBtn = document.getElementById('btn-card-next');

  checkBtn.textContent = t('check_answer');
  retryBtn.textContent = t('retry_card');

  const allDone = stats.answered === stats.total;
  const nextTarget = getNextAdaptiveTarget();
  const nextLblEl = document.getElementById('btn-card-next-label');
  if (nextLblEl) {
    if (!nextTarget) {
      nextLblEl.textContent = t('to_results');
    } else {
      const nextNum = CARDS.findIndex(c => c.id === nextTarget.card.id) + 1;
      const nextLvl = nextTarget.card.level || 1;
      const starsStr = '★'.repeat(nextLvl) + '☆'.repeat(Math.max(0, 3 - nextLvl));
      if (nextTarget.reason === 'review') {
        nextLblEl.textContent = state.lang === 'en'
          ? `Review #${nextNum} (Guided)`
          : `Закрепить №${nextNum} (облегчённо)`;
      } else {
        nextLblEl.textContent = state.lang === 'en'
          ? `Next: #${nextNum} (${starsStr})`
          : `Дальше: №${nextNum} (${starsStr} ${t('levelShort')[nextLvl]})`;
      }
    }
  }

  if (isEvaluated) {
    showCardFeedbackUI(card, res.correct, res.adaptiveNote || '');
    checkBtn.classList.add('hidden');
    retryBtn.classList.toggle('hidden', res.correct);
    nextBtn.classList.remove('hidden');
  } else {
    fb.classList.add('hidden');
    retryBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    // Для choice и truefalse проверка идёт сразу по клику; для sort/match/order — по кнопке «Проверить»
    if (card.type === 'sort' || card.type === 'match' || card.type === 'order') {
      checkBtn.classList.remove('hidden');
      updateCheckBtnReadiness(card);
    } else {
      checkBtn.classList.add('hidden');
    }
  }

  // Баннер завершения всех карточек
  const doneBanner = document.getElementById('cards-complete-banner');
  if (allDone) {
    doneBanner.classList.remove('hidden');
    document.getElementById('cards-done-summary').textContent = state.lang === 'en'
      ? `Result: ${stats.correct} of ${stats.total} (${stats.pct}%). Check your analytics charts or try the Chat Simulator!`
      : (state.lang === 'kca'
        ? `Результат: ${stats.correct} / ${stats.total} (${stats.pct}%). Аналитика па сертификат вәньщэ аӆпа Потӑр симуляторӑн вєрэ!`
        : `Результат: ${stats.correct} из ${stats.total} (${stats.pct}%). Открой графики и сертификат или проверь себя в симуляторе чатов!`);
  } else {
    doneBanner.classList.add('hidden');
  }

  refreshIcons();
  if (card.type === 'match') {
    requestAnimationFrame(drawMatchConnectorLines);
  }
}

// ==================== МАСКОТ «ЮГОРКА», ОЗВУЧКА И ЛУПА ДЕТЕКТИВА ====================

let isReadingAloud = false;

function getYugorkaSvg(mood = 'idle', stars = 0, skinOverride = null) {
  // Аутентичный пиксель-арт Кибер-Стив / Кибер-Алекс (в стиле Minecraft, crispEdges, 100% офлайн!)
  // Крутые пиксельные тёмные очки с живым бликом за мышкой — всегда на герое!
  // За собранные звёзды прокачивается броня: 4+ — алмазный щит, 6+ — алмазный шлем!
  const hasGlasses = true;
  const hasDiamondHelmet = stars >= 6;
  const hasShield = stars >= 4 || mood === 'happy';

  const isAlex = (skinOverride || state.heroSkin) === 'alex';
  const skinMain = isAlex ? '#f3cfb3' : '#c69272';
  const skinShade = isAlex ? '#e2b796' : '#bd8867';
  const skinDark = isAlex ? '#c79774' : '#9c6a4d';
  const hairMain = isAlex ? '#d96b27' : '#3b2715';
  const hairLight = isAlex ? '#ea853a' : '#4a321b';
  const hairDark = isAlex ? '#b55017' : '#2f1f10';
  const eyeCol = isAlex ? '#1e7e34' : '#49399b';
  const sleeveL = isAlex ? '#4ade80' : '#00a8a8';
  const sleeveR = isAlex ? '#22c55e' : '#008c8c';
  const tunicMain = isAlex ? '#16a34a' : '#1e5aa8';
  const tunicDark = isAlex ? '#15803d' : '#164482';

  // Глаза и эмоции героя (пиксельная сетка 24x24, масштаб x4 = 96x96)
  let eyes = `
    <rect x="30" y="34" width="12" height="6" fill="#ffffff"/>
    <rect x="54" y="34" width="12" height="6" fill="#ffffff"/>
    <g class="steve-pupils">
      <rect x="36" y="34" width="6" height="6" fill="${eyeCol}"/>
      <rect x="54" y="34" width="6" height="6" fill="${eyeCol}"/>
    </g>
    <g class="steve-blink" opacity="0">
      <rect x="30" y="34" width="12" height="6" fill="${skinMain}"/>
      <rect x="30" y="38" width="12" height="2" fill="${skinDark}"/>
      <rect x="54" y="34" width="12" height="6" fill="${skinMain}"/>
      <rect x="54" y="38" width="12" height="2" fill="${skinDark}"/>
    </g>
  `;

  let mouth = `
    <rect x="42" y="40" width="12" height="5" fill="${skinDark}"/>
    <g class="steve-mouth-idle">
      <rect x="36" y="45" width="6" height="6" fill="${isAlex ? '#b86e5a' : '#6b3e26'}"/>
      <rect x="42" y="47" width="12" height="5" fill="${isAlex ? '#b86e5a' : '#6b3e26'}"/>
      <rect x="54" y="45" width="6" height="6" fill="${isAlex ? '#b86e5a' : '#6b3e26'}"/>
    </g>
  `;

  let extraProp = '';

  if (mood === 'happy') {
    eyes = `
      <rect x="30" y="33" width="12" height="4" fill="#2f1f10"/>
      <rect x="32" y="31" width="8" height="3" fill="#2f1f10"/>
      <rect x="54" y="33" width="12" height="4" fill="#2f1f10"/>
      <rect x="56" y="31" width="8" height="3" fill="#2f1f10"/>
    `;
    mouth = `
      <rect x="42" y="39" width="12" height="4" fill="#9c6a4d"/>
      <g class="steve-mouth-idle">
        <rect x="36" y="44" width="24" height="4" fill="#ffffff"/>
        <rect x="38" y="48" width="20" height="4" fill="#c62828"/>
      </g>
    `;
    // Пиксельные золотые звёздочки вокруг
    extraProp = `
      <rect x="8" y="14" width="6" height="6" fill="#f59e0b"/>
      <rect x="10" y="10" width="2" height="14" fill="#fde047"/>
      <rect x="4" y="16" width="14" height="2" fill="#fde047"/>
      <rect x="82" y="12" width="6" height="6" fill="#f59e0b"/>
      <rect x="84" y="8" width="2" height="14" fill="#fde047"/>
      <rect x="78" y="14" width="14" height="2" fill="#fde047"/>
    `;
  } else if (mood === 'oops') {
    eyes = `
      <rect x="30" y="32" width="6" height="8" fill="#ffffff"/>
      <rect x="36" y="34" width="6" height="6" fill="#49399b"/>
      <rect x="54" y="34" width="6" height="6" fill="#49399b"/>
      <rect x="60" y="32" width="6" height="8" fill="#ffffff"/>
    `;
    mouth = `
      <rect x="42" y="40" width="12" height="4" fill="#9c6a4d"/>
      <g class="steve-mouth-idle">
        <rect x="43" y="46" width="10" height="6" fill="#5c331e"/>
      </g>
    `;
    // Пиксельная капля удивления
    extraProp = `
      <rect x="78" y="24" width="4" height="4" fill="#38bdf8"/>
      <rect x="76" y="28" width="8" height="8" fill="#38bdf8"/>
      <rect x="78" y="29" width="2" height="3" fill="#e0f2fe"/>
    `;
  } else if (mood === 'detective') {
    // Пиксельная лупа детектива!
    extraProp = `
      <g>
        <rect x="66" y="54" width="16" height="16" fill="#e0f2fe" stroke="#1e5aa8" stroke-width="4"/>
        <rect x="70" y="58" width="4" height="4" fill="#ffffff"/>
        <rect x="80" y="68" width="5" height="5" fill="#7c4a21"/>
        <rect x="84" y="72" width="5" height="5" fill="#5c331e"/>
        <rect x="88" y="76" width="5" height="5" fill="#3b2715"/>
      </g>
    `;
  }

  // Брутальные пиксельные тёмные очки с живым бликом (блик сдвигается за мышкой!)
  const glassesSvg = hasGlasses ? `
    <g>
      <rect x="27" y="32" width="18" height="10" fill="#0f172a"/>
      <rect x="45" y="34" width="6" height="3" fill="#0f172a"/>
      <rect x="51" y="32" width="18" height="10" fill="#0f172a"/>
      <g class="steve-glint">
        <rect x="29" y="34" width="4" height="3" fill="#38bdf8"/>
        <rect x="33" y="37" width="3" height="2" fill="#93c5fd"/>
        <rect x="53" y="34" width="4" height="3" fill="#38bdf8"/>
        <rect x="57" y="37" width="3" height="2" fill="#93c5fd"/>
      </g>
    </g>
  ` : '';

  const helmetSvg = hasDiamondHelmet ? `
    <g>
      <rect x="22" y="8" width="52" height="14" fill="#22d3ee"/>
      <rect x="22" y="8" width="52" height="4" fill="#67e8f9"/>
      <rect x="22" y="22" width="8" height="12" fill="#06b6d4"/>
      <rect x="66" y="22" width="8" height="12" fill="#06b6d4"/>
      <rect x="44" y="22" width="8" height="10" fill="#06b6d4"/>
      <rect x="74" y="10" width="5" height="22" fill="#0891b2"/>
    </g>
  ` : '';

  const shieldSvg = hasShield ? `
    <g>
      <rect x="8" y="58" width="18" height="24" fill="#22d3ee" stroke="#1e5aa8" stroke-width="3"/>
      <rect x="13" y="64" width="8" height="12" fill="#ffffff"/>
      <rect x="15" y="68" width="4" height="4" fill="#1e7e34"/>
    </g>
  ` : '';

  return `
    <svg viewBox="0 0 96 96" class="w-full h-full select-none" shape-rendering="crispEdges" aria-hidden="true">
      <!-- Мягкий игровой фон -->
      <rect width="96" height="96" fill="#f0f7ff"/>
      <rect x="0" y="76" width="96" height="20" fill="#e2effd"/>

      <!-- Тело героя (Стив / Алекс + 3D-тень справа) -->
      <rect x="14" y="60" width="14" height="36" fill="${sleeveL}"/>
      <rect x="14" y="74" width="14" height="22" fill="${skinMain}"/>
      <rect x="68" y="60" width="14" height="36" fill="${sleeveR}"/>
      <rect x="68" y="74" width="14" height="22" fill="${skinShade}"/>
      <rect x="28" y="60" width="40" height="36" fill="${tunicMain}"/>
      <rect x="62" y="60" width="6" height="36" fill="${tunicDark}"/>
      <rect x="40" y="60" width="16" height="6" fill="${skinShade}"/>
      <rect x="44" y="66" width="8" height="4" fill="${skinShade}"/>
      <rect x="42" y="74" width="12" height="12" fill="#ffffff"/>
      <rect x="45" y="77" width="6" height="6" fill="${isAlex ? '#1e5aa8' : '#1e7e34'}"/>

      <!-- 3D-тень головы справа (воксельный объём!) -->
      <rect x="72" y="14" width="6" height="46" fill="${skinDark}"/>
      <rect x="72" y="14" width="6" height="14" fill="${hairDark}"/>

      <!-- Голова героя (8x8 блоков) -->
      <rect x="24" y="12" width="48" height="48" fill="${skinMain}"/>
      <rect x="24" y="48" width="6" height="12" fill="${skinShade}"/>
      <rect x="66" y="48" width="6" height="12" fill="${skinShade}"/>
      <rect x="24" y="12" width="48" height="12" fill="${hairMain}"/>
      <rect x="24" y="12" width="48" height="4" fill="${hairLight}"/>
      <rect x="24" y="24" width="6" height="${isAlex ? 14 : 6}" fill="${hairDark}"/>
      <rect x="66" y="24" width="6" height="${isAlex ? 26 : 6}" fill="${hairMain}"/>
      ${isAlex ? `<rect x="64" y="50" width="8" height="18" fill="${hairDark}"/><rect x="66" y="66" width="6" height="8" fill="${hairMain}"/>` : ''}

      ${eyes}
      ${mouth}
      <!-- Анимация открытого рта и звуковых волн во время озвучки! -->
      <g class="steve-mouth-talk" style="display:none">
        <rect x="36" y="45" width="24" height="8" fill="#4b2316"/>
        <rect x="40" y="45" width="16" height="2.5" fill="#ffffff"/>
        <rect x="42" y="50" width="12" height="3" fill="#e11d48"/>
      </g>
      <g class="steve-mouth-talk-mid" style="display:none">
        <rect x="39" y="46" width="18" height="5" fill="#4b2316"/>
        <rect x="42" y="46" width="12" height="2" fill="#ffffff"/>
      </g>
      <g class="steve-sound-waves" style="display:none">
        <rect x="81" y="36" width="3" height="8" fill="#1e5aa8"/>
        <rect x="87" y="32" width="3" height="16" fill="#38bdf8"/>
      </g>
      ${glassesSvg}
      ${helmetSvg}
      ${shieldSvg}
      ${extraProp}
    </svg>
  `;
}

function updateMascot(mood = 'idle', speechText = '', animate = true) {
  const avatar = document.getElementById('yugorka-avatar');
  const speech = document.getElementById('yugorka-speech');
  const nameBadge = document.getElementById('yugorka-name-badge');
  const roleTag = document.getElementById('yugorka-status-tag');
  const bubble = document.getElementById('yugorka-bubble');
  if (!avatar || !speech) return;

  const stars = getCardStatsSummary().correct;
  const isAlex = state.heroSkin === 'alex';
  const heroLabel = state.lang === 'en'
    ? (isAlex ? 'Cyber-Alex' : 'Cyber-Steve')
    : (isAlex ? 'Кибер-Алекс' : 'Кибер-Стив');

  avatar.innerHTML = getYugorkaSvg(mood, stars);
  if (nameBadge) nameBadge.textContent = heroLabel;
  if (roleTag) roleTag.textContent = heroLabel;
  if (speechText) speech.textContent = String(speechText).replace(/\{HERO\}/g, heroLabel);
  renderHeaderHeroMini();

  // Цвет рамки облачка под настроение
  if (bubble) {
    bubble.classList.remove('border-[#cfe0f5]', 'border-[#86efac]', 'border-[#fca5a5]', 'border-[#f59e0b]');
    if (mood === 'happy') bubble.classList.add('border-[#86efac]');
    else if (mood === 'oops') bubble.classList.add('border-[#fca5a5]');
    else if (mood === 'detective') bubble.classList.add('border-[#f59e0b]');
    else bubble.classList.add('border-[#cfe0f5]');
  }

  if (animate) {
    if (bubble) bubble.classList.remove('hidden');
    avatar.classList.remove('yugorka-float', 'yugorka-jump', 'yugorka-oops');
    void avatar.offsetWidth;
    if (mood === 'happy') {
      avatar.classList.add('yugorka-jump');
      setTimeout(() => { avatar.classList.remove('yugorka-jump'); avatar.classList.add('yugorka-float'); }, 680);
    } else if (mood === 'oops') {
      avatar.classList.add('yugorka-oops');
      setTimeout(() => { avatar.classList.remove('yugorka-oops'); avatar.classList.add('yugorka-float'); }, 580);
    } else {
      avatar.classList.add('yugorka-float');
    }
  }
}

function askMascotHint() {
  const card = getCardById(state.currentCardId);
  if (!card) return;
  SoundFX.playPick();
  const bubble = document.getElementById('yugorka-bubble');
  if (bubble) bubble.classList.remove('hidden');
  const tip = card.mascotTip ? L(card.mascotTip) : t('yugorka_idle')[1];
  updateMascot('detective', tip, true);
}

function petYugorka() {
  SoundFX.playConnect();
  const bubble = document.getElementById('yugorka-bubble');
  if (bubble) bubble.classList.remove('hidden');
  const list = t('yugorka_pet');
  const msg = list[Math.floor(Math.random() * list.length)];
  updateMascot('happy', msg, true);
}

function toggleSteveBubble() {
  const bubble = document.getElementById('yugorka-bubble');
  if (!bubble) return;
  bubble.classList.toggle('hidden');
  SoundFX.playPick();
}

// Перетаскиваемый по всей странице Кибер-Стив (мышь + тач)
function initDraggableSteve() {
  const host = document.getElementById('floating-steve');
  const handle = document.getElementById('steve-drag-handle');
  if (!host || !handle) return;

  let dragging = false;
  let moved = false;
  let startX = 0, startY = 0;
  let origLeft = 0, origTop = 0;

  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragging = true;
    moved = false;
    const rect = host.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    origLeft = rect.left;
    origTop = rect.top;
    host.style.left = `${origLeft}px`;
    host.style.top = `${origTop}px`;
    host.style.right = 'auto';
    host.style.bottom = 'auto';
    host.classList.add('is-dragging');
    try { handle.setPointerCapture(e.pointerId); } catch (err) {}
  });

  handle.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
    if (!moved) return;

    const w = host.offsetWidth || 100;
    const h = host.offsetHeight || 100;
    const maxL = Math.max(8, window.innerWidth - w - 8);
    const maxT = Math.max(8, window.innerHeight - h - 8);
    const nextL = Math.min(maxL, Math.max(8, origLeft + dx));
    const nextT = Math.min(maxT, Math.max(8, origTop + dy));
    host.style.left = `${nextL}px`;
    host.style.top = `${nextT}px`;
  });

  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    host.classList.remove('is-dragging');
    try { handle.releasePointerCapture(e.pointerId); } catch (err) {}

    if (moved) {
      SoundFX.playDrop();
      const dragLines = t('yugorka_drag');
      const bubble = document.getElementById('yugorka-bubble');
      if (bubble) bubble.classList.remove('hidden');
      updateMascot('idle', dragLines[Math.floor(Math.random() * dragLines.length)], true);
    } else {
      petYugorka();
    }
  };

  handle.addEventListener('pointerup', endDrag);
  handle.addEventListener('pointercancel', endDrag);

  // Живой 3D-поворот Стива к курсору мышки + сдвиг блика на крутых очках (видно в любом настроении!)
  window.addEventListener('mousemove', (e) => {
    const avatar = document.getElementById('yugorka-avatar');
    const cardBox = handle.firstElementChild;
    if (!avatar || !cardBox || dragging) return;
    const r = cardBox.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const rx = Math.max(-14, Math.min(14, (cy - e.clientY) / 28));
    const ry = Math.max(-16, Math.min(16, (e.clientX - cx) / 28));
    cardBox.style.transform = `perspective(360px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg)`;

    const glint = avatar.querySelector('.steve-glint');
    if (glint) {
      const gx = Math.max(-2, Math.min(6, (e.clientX - cx) / 70));
      glint.setAttribute('transform', `translate(${gx.toFixed(1)}, 0)`);
    }
    const pupils = avatar.querySelector('.steve-pupils');
    if (pupils) {
      const dx = Math.max(-2.4, Math.min(2.4, (e.clientX - cx) / 90));
      const dy = Math.max(-1.4, Math.min(1.4, (e.clientY - cy) / 110));
      pupils.setAttribute('transform', `translate(${dx.toFixed(1)}, ${dy.toFixed(1)})`);
    }
  }, { passive: true });

  setInterval(() => {
    if (document.hidden || isReadingAloud) return;
    const blink = document.querySelector('#yugorka-avatar .steve-blink');
    if (!blink) return;
    blink.setAttribute('opacity', '1');
    setTimeout(() => {
      const b2 = document.querySelector('#yugorka-avatar .steve-blink');
      if (b2) b2.setAttribute('opacity', '0');
    }, 150);
  }, 4200);
}

let steveTalkInterval = null;
let steveTalkFrame = 0;

function setSteveTalking(active) {
  const avatar = document.getElementById('yugorka-avatar');
  if (steveTalkInterval) {
    clearInterval(steveTalkInterval);
    steveTalkInterval = null;
  }

  const applyMouthFrame = (mode) => {
    const idleM = document.querySelector('#yugorka-avatar .steve-mouth-idle');
    const openM = document.querySelector('#yugorka-avatar .steve-mouth-talk');
    const midM = document.querySelector('#yugorka-avatar .steve-mouth-talk-mid');
    const waves = document.querySelector('#yugorka-avatar .steve-sound-waves');
    if (idleM) idleM.style.display = mode === 'idle' ? '' : 'none';
    if (openM) openM.style.display = mode === 'open' ? '' : 'none';
    if (midM) midM.style.display = mode === 'mid' ? '' : 'none';
    if (waves) waves.style.display = mode === 'idle' ? 'none' : '';
  };

  if (!active) {
    if (avatar) avatar.classList.remove('steve-talking');
    applyMouthFrame('idle');
    return;
  }

  if (avatar) avatar.classList.add('steve-talking');
  steveTalkFrame = 0;
  const seq = ['open', 'mid', 'open', 'idle', 'mid', 'open'];
  applyMouthFrame('open');
  steveTalkInterval = setInterval(() => {
    steveTalkFrame = (steveTalkFrame + 1) % seq.length;
    applyMouthFrame(seq[steveTalkFrame]);
  }, 135);
}

// Пиксельные иконки предметов для Майнкрафт-хотбара кибер-лута
function getLootPixelSvg(icon) {
  const map = {
    shield: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="3" y="2" width="10" height="10" fill="#22d3ee"/><rect x="4" y="12" width="8" height="2" fill="#06b6d4"/><rect x="6" y="14" width="4" height="1" fill="#0891b2"/><rect x="5" y="4" width="6" height="6" fill="#1e5aa8"/><rect x="7" y="6" width="2" height="2" fill="#ffffff"/></svg>`,
    key: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="3" y="3" width="6" height="6" fill="#38bdf8"/><rect x="5" y="5" width="2" height="2" fill="#ffffff"/><rect x="9" y="5" width="5" height="2" fill="#0284c7"/><rect x="11" y="7" width="2" height="3" fill="#0284c7"/><rect x="13" y="7" width="1" height="2" fill="#38bdf8"/></svg>`,
    chest: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="2" y="3" width="12" height="10" fill="#b45309"/><rect x="2" y="3" width="12" height="4" fill="#d97706"/><rect x="2" y="7" width="12" height="1" fill="#451a03"/><rect x="7" y="6" width="2" height="3" fill="#fde047"/></svg>`,
    heart: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="3" y="4" width="4" height="4" fill="#ef4444"/><rect x="9" y="4" width="4" height="4" fill="#ef4444"/><rect x="2" y="6" width="12" height="3" fill="#dc2626"/><rect x="4" y="9" width="8" height="2" fill="#dc2626"/><rect x="6" y="11" width="4" height="2" fill="#b91c1c"/><rect x="4" y="5" width="2" height="2" fill="#fca5a5"/></svg>`,
    spyglass: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="9" y="2" width="5" height="5" fill="#38bdf8"/><rect x="10" y="3" width="2" height="2" fill="#e0f2fe"/><rect x="6" y="6" width="4" height="4" fill="#d97706"/><rect x="3" y="9" width="4" height="4" fill="#92400e"/><rect x="2" y="12" width="2" height="2" fill="#78350f"/></svg>`,
    armor: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="2" y="3" width="4" height="5" fill="#22d3ee"/><rect x="10" y="3" width="4" height="5" fill="#22d3ee"/><rect x="4" y="4" width="8" height="9" fill="#06b6d4"/><rect x="6" y="3" width="4" height="2" fill="#ffffff"/><rect x="6" y="7" width="4" height="4" fill="#1e5aa8"/></svg>`,
    emerald: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="6" y="2" width="4" height="2" fill="#4ade80"/><rect x="4" y="4" width="8" height="8" fill="#16a34a"/><rect x="6" y="12" width="4" height="2" fill="#15803d"/><rect x="6" y="5" width="3" height="4" fill="#86efac"/></svg>`,
    book: `<svg viewBox="0 0 16 16" class="w-8 h-8" shape-rendering="crispEdges"><rect x="3" y="2" width="10" height="12" fill="#7c3aed"/><rect x="5" y="3" width="7" height="10" fill="#a78bfa"/><rect x="4" y="4" width="1" height="8" fill="#fde047"/><rect x="7" y="5" width="4" height="2" fill="#fef08a"/></svg>`
  };
  return map[icon] || map.emerald;
}

function renderLootHotbar() {
  const wrap = document.getElementById('mc-loot-slots');
  if (!wrap) return;
  wrap.innerHTML = '';

  CARDS.slice(0, 8).forEach((card, idx) => {
    const res = state.cardResults[card.id];
    const unlocked = Boolean(res && res.answered && res.correct);
    const isCurr = card.id === state.currentCardId;
    const loot = card.loot || { icon: 'emerald', name: { ru: 'Кибер-изумруд', en: 'Cyber Emerald', kca: 'Изумруд' }, desc: { ru: 'Трофей за верный ответ!', en: 'Trophy for a right answer!', kca: 'Тәса ястӑпсы!' } };

    const slot = document.createElement('button');
    slot.type = 'button';
    slot.className = `mc-slot relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 ${unlocked ? 'unlocked' : ''} ${isCurr ? 'current-slot' : ''}`;
    slot.title = unlocked ? `${L(loot.name)} — ${L(loot.desc)}` : `#${idx + 1} (${L(card.title)})`;
    slot.innerHTML = `
      <span class="absolute top-1 left-1.5 font-pixel text-[10px] font-bold ${unlocked ? 'text-cgy-accent' : 'text-slate-400'}">${idx + 1}</span>
      ${unlocked ? getLootPixelSvg(loot.icon) : '<span class="font-pixel text-base font-bold text-slate-300">?</span>'}
    `;
    slot.onclick = () => inspectLootItem(card.id, unlocked, loot);
    wrap.appendChild(slot);
  });
}

function inspectLootItem(cardId, unlocked, loot) {
  const bubble = document.getElementById('yugorka-bubble');
  if (bubble) bubble.classList.remove('hidden');
  if (unlocked) {
    SoundFX.playConnect();
    updateMascot('happy', `${L(loot.name)}: ${L(loot.desc)}`, true);
  } else {
    SoundFX.playPick();
    selectCardById(cardId);
  }
}

function updateReadAloudAvailability() {
  const card = getCardById(state.currentCardId);
  const isDefaultCard = !card || !String(card.id).startsWith('custom_');
  const langPref = state.lang === 'en' ? 'en' : 'ru';
  const hasGoodVoice = isDefaultCard || (SoundFX.hasNeuralVoice && SoundFX.hasNeuralVoice(langPref));
  ['btn-read-aloud', 'btn-card-read-aloud'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.toggle('hidden', !hasGoodVoice);
  });
}

let reactionVoiceTimer = null;
let lastWinVoiceIdx = 0;

function setHeroSpeakingUI(active) {
  isReadingAloud = active;
  setSteveTalking(active);
  ['btn-read-aloud', 'btn-card-read-aloud'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.toggle('btn-speaking', active);
  });
  ['btn-read-aloud-label', 'btn-card-read-aloud-label'].forEach(id => {
    const lbl = document.getElementById(id);
    if (lbl) lbl.textContent = active ? t('btn_stop_aloud') : t('btn_read_aloud');
  });
}

function stopReadAloud() {
  if (reactionVoiceTimer) {
    clearTimeout(reactionVoiceTimer);
    reactionVoiceTimer = null;
  }
  setHeroSpeakingUI(false);
  SoundFX.stopSpeech();
}

function getHeroCardAudioUrl(cardId, kind, audioLang) {
  if (state.heroSkin === 'alex') {
    return `audio/alex/${cardId}_${kind}_${audioLang}.mp3`;
  }
  return `audio/${cardId}_${kind}_${audioLang}.mp3`;
}

function getHeroReactionAudioUrl(card, isCorrect) {
  const isAlex = state.heroSkin === 'alex';
  const audioLang = state.lang === 'en' ? 'en' : 'ru';
  const isDefaultCard = card && !String(card.id).startsWith('custom_');

  if (isCorrect) {
    const maxIdx = audioLang === 'en' ? 2 : 4;
    let pick = Math.floor(Math.random() * maxIdx) + 1;
    if (maxIdx > 1 && pick === lastWinVoiceIdx) {
      pick = (pick % maxIdx) + 1;
    }
    lastWinVoiceIdx = pick;
    return isAlex
      ? `audio/alex/win_${pick}_${audioLang}.mp3`
      : `audio/steve_win_${pick}_${audioLang}.mp3`;
  }

  // При ошибке в русском режиме — персональный поддерживающий разбор именно этой карточки!
  if (audioLang === 'ru' && isDefaultCard) {
    return isAlex
      ? `audio/alex/fail_${card.id}_ru.mp3`
      : `audio/steve_fail_${card.id}_ru.mp3`;
  }

  const failIdx = Math.floor(Math.random() * 2) + 1;
  return isAlex
    ? `audio/alex/fail_${failIdx}_en.mp3`
    : `audio/steve_fail_${failIdx}_en.mp3`;
}

function playHeroReactionVoice(card, isCorrect) {
  if (!SoundFX.isEnabled() || !SoundFX.playAudioFile) return;
  stopReadAloud();
  const targetCardId = card ? card.id : null;
  const audioUrl = getHeroReactionAudioUrl(card, isCorrect);
  reactionVoiceTimer = setTimeout(() => {
    reactionVoiceTimer = null;
    if (!SoundFX.isEnabled() || state.activeTab !== 'cards') return;
    if (targetCardId && state.currentCardId !== targetCardId) return;
    if (state.cardDraft && state.cardDraft.retrying) return;
    setHeroSpeakingUI(true);
    SoundFX.playAudioFile(audioUrl, () => stopReadAloud(), () => stopReadAloud());
  }, 260);
}

function toggleReadAloud() {
  if (isReadingAloud) {
    stopReadAloud();
    return;
  }
  const card = getCardById(state.currentCardId);
  if (!card) return;
  if (!SoundFX.isEnabled()) {
    SoundFX.setEnabled(true);
    state.soundOn = true;
    updateSoundIcon();
  }

  const res = state.cardResults[card.id];
  const isEvaluated = Boolean(res && res.answered && !state.cardDraft.retrying);

  const playTtsFallback = () => {
    let toRead = `${L(card.title)}. ${L(card.prompt)}`;
    if (isEvaluated && card.explanation) {
      toRead = `${res.correct ? t('correct_title') : t('wrong_title')}. ${L(card.explanation)}`;
    }
    const speechLang = state.lang === 'en' ? 'en-US' : 'ru-RU';
    const started = SoundFX.speakVoice(toRead, { lang: speechLang, neuralOnly: true, rate: 1.0, pitch: 1.0 }, () => stopReadAloud());
    if (started) setHeroSpeakingUI(true);
    else stopReadAloud();
  };

  // Играем готовую естественную MP3-озвучку под активного героя (Стив или Алекс)!
  const isDefaultCard = !String(card.id).startsWith('custom_');
  if (isDefaultCard && SoundFX.playAudioFile) {
    const audioLang = state.lang === 'en' ? 'en' : 'ru';
    const audioUrl = getHeroCardAudioUrl(card.id, isEvaluated ? 'e' : 'q', audioLang);
    setHeroSpeakingUI(true);
    SoundFX.playAudioFile(audioUrl, () => stopReadAloud(), () => {
      setHeroSpeakingUI(false);
      playTtsFallback();
    });
    return;
  }

  playTtsFallback();
}

// ==================== ПЕСОЧНИЦА «ВЗЛОМАЮТ ЛИ ТВОЙ ПАРОЛЬ?» ====================

let passLabCelebrated = false;

function openPasswordLab() {
  const modal = document.getElementById('password-lab-modal');
  if (!modal) return;
  passLabCelebrated = false;
  modal.classList.remove('hidden');
  const inp = document.getElementById('pass-lab-input');
  if (inp) {
    inp.value = '';
    setTimeout(() => inp.focus(), 50);
  }
  evaluatePasswordLab();
  refreshIcons();
}

function closePasswordLab() {
  const modal = document.getElementById('password-lab-modal');
  if (modal) modal.classList.add('hidden');
}

function generateSuperPassword() {
  const samples = [
    'YugraShield#2026!',
    'CyberBear!86Pro',
    'DiamondLock$2026',
    'TaigaGuard@77!',
    'SteveCraft#86!'
  ];
  const inp = document.getElementById('pass-lab-input');
  if (!inp) return;
  const current = inp.value;
  const pick = samples.find(s => s !== current) || samples[0];
  inp.value = samples[Math.floor(Math.random() * samples.length)];
  if (inp.value === current) inp.value = pick;
  SoundFX.playPick();
  evaluatePasswordLab();
}

function evaluatePasswordLab() {
  const inp = document.getElementById('pass-lab-input');
  const timeEl = document.getElementById('pass-lab-time');
  const barEl = document.getElementById('pass-lab-bar');
  const badgeEl = document.getElementById('pass-lab-level-badge');
  const commentEl = document.getElementById('pass-lab-comment');
  if (!inp || !timeEl) return;

  const val = inp.value || '';
  const isEn = state.lang === 'en';

  const hasLen = val.length >= 10;
  const hasCase = /[a-zа-яё]/i.test(val) && /[A-ZА-ЯЁ]/.test(val) && /[a-zа-яё]/.test(val);
  const hasNum = /\d/.test(val);
  const hasSym = /[^a-zA-Zа-яА-ЯёЁ0-9\s]/.test(val);

  const setCheck = (id, ok) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = ok
      ? 'flex items-center gap-2 px-3 py-2 rounded-xl bg-[#ecfdf5] text-[#14532d] border-2 border-[#86efac]'
      : 'flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-500 border border-slate-200';
    const ic = el.querySelector('svg, i');
    if (ic) ic.outerHTML = `<i data-lucide="${ok ? 'check-circle-2' : 'circle'}" class="w-4 h-4 shrink-0 ${ok ? 'text-[#16a34a]' : ''}"></i>`;
  };
  setCheck('pl-chk-len', hasLen);
  setCheck('pl-chk-case', hasCase);
  setCheck('pl-chk-num', hasNum);
  setCheck('pl-chk-sym', hasSym);
  refreshIcons();

  if (!val) {
    timeEl.textContent = isEn ? 'Type a password above' : 'Введи пароль выше';
    barEl.style.width = '4%';
    barEl.className = 'h-full rounded-full transition-all duration-300 bg-slate-300';
    badgeEl.textContent = '—';
    badgeEl.className = 'px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600 font-extrabold';
    commentEl.textContent = isEn
      ? 'Don’t type your real password — just test what makes a password unbreakable!'
      : 'Не вводи сюда свой настоящий пароль — просто проверь, какие пароли самые крепкие!';
    return;
  }

  // Проверяем самые популярные словарные пароли
  const lower = val.toLowerCase();
  const commonList = ['123456', '12345678', '123456789', 'qwerty', 'password', 'admin', 'minecraft', 'roblox', 'standoff', '000000', '111111', 'йцукен'];
  const isCommon = commonList.some(w => lower === w || (val.length <= 8 && lower.includes(w)));

  // Расчёт энтропии и скорости перебора (10 млрд попыток/сек — современный GPU-кластер)
  let pool = 0;
  if (/[a-z]/.test(val)) pool += 26;
  if (/[A-Z]/.test(val)) pool += 26;
  if (/[а-яё]/.test(val)) pool += 33;
  if (/[А-ЯЁ]/.test(val)) pool += 33;
  if (/\d/.test(val)) pool += 10;
  if (hasSym) pool += 32;
  if (pool === 0) pool = 10;

  const combos = Math.pow(pool, val.length);
  const seconds = isCommon ? 0.001 : (combos / 1e10);

  let timeTxt = '', lvlTxt = '', commentTxt = '', pct = 15, barCls = 'danger-meter-bar', badgeCls = 'bg-[#fee2e2] text-cgy-err';
  if (seconds < 1) {
    timeTxt = isEn ? 'Instantly (0.01 sec)' : 'Мгновенно (0.01 сек)';
    lvlTxt = isEn ? 'Very Weak' : 'Очень слабый';
    commentTxt = isEn ? 'Hacker bots crack this before you blink! Add length, numbers, and symbols.' : 'Такой пароль программы подбирают быстрее, чем ты моргнёшь! Добавь длину, буквы и символы.';
    pct = 15;
  } else if (seconds < 3600) {
    const mins = Math.max(1, Math.round(seconds / 60));
    timeTxt = isEn ? `~${mins} minutes` : `Около ${mins} мин.`;
    lvlTxt = isEn ? 'Weak' : 'Слабый';
    commentTxt = isEn ? 'Too easy! Add UPPERCASE letters and a symbol like ! or #.' : 'Маловато! Сделай длиннее и добавь заглавные буквы или знак вроде ! или #.';
    pct = 36;
    barCls = 'bg-[#f97316]';
    badgeCls = 'bg-[#ffedd5] text-[#c2410c]';
  } else if (seconds < 86400 * 365) {
    const days = Math.max(1, Math.round(seconds / 86400));
    timeTxt = isEn ? `~${days} days` : `Около ${days} дн.`;
    lvlTxt = isEn ? 'Medium' : 'Неплохо';
    commentTxt = isEn ? 'Getting better! Add 2–3 more characters to reach Diamond level.' : 'Уже неплохо! Добавь ещё пару символов и спецзнак — и будет алмазная защита.';
    pct = 66;
    barCls = 'bg-[#f59e0b]';
    badgeCls = 'bg-[#fef3c7] text-[#b45309]';
  } else if (seconds < 86400 * 365 * 500) {
    const yrs = Math.max(1, Math.round(seconds / (86400 * 365)));
    timeTxt = isEn ? `~${yrs} years!` : `Около ${yrs} лет!`;
    lvlTxt = isEn ? 'Strong' : 'Надёжный';
    commentTxt = isEn ? 'Awesome password! Almost impossible to guess.' : 'Отличный надёжный пароль — взломщикам не по зубам!';
    pct = 86;
    barCls = 'bg-[#22c55e]';
    badgeCls = 'bg-[#dcfce7] text-[#15803d]';
  } else {
    timeTxt = isEn ? 'Centuries! Unbreakable' : 'Сотни лет! Не взломать';
    lvlTxt = isEn ? 'Diamond Shield' : 'Алмазная защита';
    commentTxt = isEn ? 'Even a supercomputer would give up! That’s a true Cyber-Hero password.' : 'Даже суперкомпьютер сдастся! Вот это настоящий пароль кибергероя.';
    pct = 100;
    barCls = 'bg-gradient-to-r from-[#1e5aa8] via-[#06b6d4] to-[#16a34a]';
    badgeCls = 'bg-[#cffafe] text-[#0e7490]';
    if (!passLabCelebrated) {
      passLabCelebrated = true;
      SoundFX.playWin(2);
      burstConfetti('small');
    }
  }

  timeEl.textContent = timeTxt;
  barEl.style.width = `${pct}%`;
  barEl.className = `h-full rounded-full transition-all duration-300 ${barCls}`;
  badgeEl.textContent = lvlTxt;
  badgeEl.className = `px-2.5 py-0.5 rounded-full font-extrabold ${badgeCls}`;
  commentEl.textContent = commentTxt;
}

if (SoundFX.onVoicesReady) {
  SoundFX.onVoicesReady(updateReadAloudAvailability);
}

// Красивая глянцевая иконка Лупы детектива (кастомный SVG)
function getDetectiveMagnifierSvg(allFound = false) {
  return `
    <svg viewBox="0 0 44 44" class="w-9 h-9 shrink-0 detective-lens-bob" aria-hidden="true">
      <defs>
        <linearGradient id="lensGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${allFound ? '#d1fae5' : '#e0f2fe'}"/>
          <stop offset="100%" stop-color="${allFound ? '#6ee7b7' : '#93c5fd'}"/>
        </linearGradient>
      </defs>
      <!-- Ручка лупы -->
      <line x1="27" y1="27" x2="38" y2="38" stroke="#7c4a21" stroke-width="6.5" stroke-linecap="round"/>
      <line x1="27" y1="27" x2="38" y2="38" stroke="#b45309" stroke-width="3.2" stroke-linecap="round"/>
      <!-- Кольцо и стекло -->
      <circle cx="18" cy="18" r="13" fill="url(#lensGlass)" stroke="${allFound ? '#15803d' : '#1e5aa8'}" stroke-width="3.8"/>
      <!-- Блик на стекле -->
      <path d="M11 14 Q14 9 20 10" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.9"/>
      <circle cx="23" cy="13" r="1.4" fill="#ffffff" opacity="0.85"/>
      ${allFound
        ? '<path d="M13 18.5 L16.8 22 L23.5 14.5" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
        : '<circle cx="18" cy="18" r="3" fill="#f59e0b" opacity="0.85"/>'
      }
    </svg>
  `;
}

// Интерактивная «Лупа детектива»: подсвечиваем кликабельные улики красивыми бейджами-линзами
function applyClueHotspots(text, card) {
  if (!card.clues || !card.clues.length) return text;
  const found = state.cardDraft.foundClues || [];
  let html = text;
  card.clues.forEach(cl => {
    const phrase = L(cl.match);
    if (!phrase || !html.includes(phrase)) return;
    const isFound = found.includes(cl.id);
    const badge = isFound
      ? `<span class="clue-hotspot clue-found">
          <span class="clue-lens-dot"><i data-lucide="check" class="w-3 h-3" stroke-width="3"></i></span>
          <span>${phrase}</span>
        </span>`
      : `<button type="button" onclick="inspectClue('${cl.id}')" class="clue-hotspot" title="Нажми лупой, чтобы исследовать!">
          <span class="clue-lens-dot"><i data-lucide="search" class="w-3 h-3" stroke-width="3"></i></span>
          <span>${phrase}</span>
        </button>`;
    html = html.replace(phrase, badge);
  });
  return html;
}

function inspectClue(clueId) {
  const card = getCardById(state.currentCardId);
  if (!card || !card.clues) return;
  const clue = card.clues.find(c => c.id === clueId);
  if (!clue) return;

  if (!Array.isArray(state.cardDraft.foundClues)) state.cardDraft.foundClues = [];
  if (state.cardDraft.foundClues.includes(clueId)) return;

  state.cardDraft.foundClues.push(clueId);
  SoundFX.playConnect();
  burstConfetti('small');
  showFloatingXp(t('clue_xp'), true);

  updateMascot('detective', L(clue.note), true);
  renderCardVisual(card);
  refreshIcons();
}

// Визуальный мини-макет ситуации внутри карточки + Красивая «Лупа детектива» и журнал улик!
function renderCardVisual(card) {
  const slot = document.getElementById('card-visual-slot');
  if (!slot) return;
  const v = card.visual;
  if (!v) {
    slot.classList.add('hidden');
    slot.innerHTML = '';
    return;
  }

  slot.classList.remove('hidden');

  const clues = card.clues || [];
  const foundIds = state.cardDraft.foundClues || [];
  const foundClues = clues.filter(c => foundIds.includes(c.id));
  const foundCount = foundClues.length;
  const allCluesFound = clues.length > 0 && foundCount === clues.length;

  // Красивая верхняя панель «Лупы детектива» с точками прогресса
  const clueDots = clues.map(c => {
    const ok = foundIds.includes(c.id);
    return `<span class="w-3 h-3 rounded-full border-2 transition-all ${ok ? 'bg-[#16a34a] border-[#15803d] scale-110' : 'bg-[#fef3c7] border-[#f59e0b]'}"></span>`;
  }).join('');

  const detectiveHeader = clues.length > 0 ? `
    <div class="flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-3 border-b-2 ${allCluesFound ? 'border-[#bbf7d0]' : 'border-[#d6e4f7]'}">
      <div class="flex items-center gap-2.5 min-w-0">
        ${getDetectiveMagnifierSvg(allCluesFound)}
        <div class="min-w-0">
          <div class="font-bold text-sm ${allCluesFound ? 'text-[#14532d]' : 'text-[#1e5aa8]'} leading-tight">
            ${allCluesFound ? t('detective_done') : t('detective_bar')}
          </div>
          <div class="flex items-center gap-1.5 mt-1">
            ${clueDots}
            <span class="text-xs font-extrabold ml-1 ${allCluesFound ? 'text-[#16a34a]' : 'text-[#b45309]'} tabular-nums">${foundCount} / ${clues.length}</span>
          </div>
        </div>
      </div>
    </div>
  ` : '';

  // Журнал раскрытых улик (красивые плашки прямо под сценкой!)
  const evidenceLog = foundClues.length > 0 ? `
    <div class="mt-3 space-y-2">
      ${foundClues.map(cl => `
        <div class="evidence-card flex items-start gap-2.5 rounded-xl bg-[#ecfdf5] border-2 border-[#86efac] px-3.5 py-2.5 text-xs sm:text-sm text-[#14532d] font-semibold shadow-sm">
          <span class="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="check" class="w-3.5 h-3.5" stroke-width="3"></i>
          </span>
          <span class="leading-snug">${L(cl.note)}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

  let sceneHtml = '';
  if (v.kind === 'chat_snippet') {
    const bubbleHtml = applyClueHotspots(L(v.bubble), card);
    sceneHtml = `
      <div class="rounded-2xl bg-gradient-to-br from-[#e7f1fe] to-[#f4f8ff] border-2 border-[#bdd6f5] overflow-hidden shadow-sm">
        <div class="px-4 py-2.5 bg-white/90 border-b border-[#d6e4f7] flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="relative">
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#1e5aa8] to-[#3b82f6] text-white text-xs font-extrabold flex items-center justify-center shadow-sm">${v.sender.slice(0,2).toUpperCase()}</div>
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-white"></span>
            </div>
            <div>
              <div class="font-extrabold text-sm text-cgy-text leading-tight">${v.sender}</div>
              <div class="text-[11px] font-bold text-cgy-accent">${L(v.tag)}</div>
            </div>
          </div>
          <span class="text-[11px] font-bold text-cgy-muted bg-[#f1f5f9] px-2 py-0.5 rounded-full">14:22</span>
        </div>
        <div class="p-3.5 sm:p-4">
          <div class="bg-white border-2 border-[#d4e3f6] rounded-2xl rounded-tl-sm px-4 py-3 text-sm sm:text-[15px] text-cgy-text font-semibold shadow-sm leading-relaxed">
            ${bubbleHtml}
          </div>
        </div>
      </div>
    `;
  } else if (v.kind === 'password_box') {
    const sampleHtml = applyClueHotspots(v.sample, card);
    sceneHtml = `
      <div class="rounded-2xl bg-gradient-to-br from-[#fff7ed] to-[#ffffff] border-2 border-[#fed7aa] p-4 max-w-lg space-y-3 shadow-sm">
        <div class="flex items-center justify-between text-xs font-extrabold text-[#9a3412]">
          <span class="flex items-center gap-1.5">
            <i data-lucide="shield-alert" class="w-4 h-4 text-cgy-err"></i>
            ${L(v.label)}
          </span>
          <span class="px-2 py-0.5 rounded-full bg-[#fee2e2] text-cgy-err">${t('chars_6')}</span>
        </div>
        <div class="bg-white border-2 border-[#fca5a5] rounded-xl px-4 py-3 font-mono text-xl font-extrabold tracking-widest text-cgy-text flex items-center justify-between gap-2 shadow-inner">
          <span>${sampleHtml}</span>
          <i data-lucide="lock-open" class="w-5 h-5 text-cgy-err shrink-0"></i>
        </div>
        <div class="h-3.5 bg-[#e2e8f0] rounded-full overflow-hidden p-0.5">
          <div class="h-full danger-meter-bar rounded-full" style="width: 22%"></div>
        </div>
        <div class="text-xs font-extrabold text-cgy-err flex items-center gap-1.5">
          <i data-lucide="zap" class="w-3.5 h-3.5"></i>
          <span>${L(v.meterText)}</span>
        </div>
      </div>
    `;
  } else if (v.kind === 'alert_banner') {
    const textHtml = applyClueHotspots(L(v.text), card);
    sceneHtml = `
      <div class="rounded-2xl bg-gradient-to-r from-[#fef2f2] via-[#fff5f5] to-[#fffbeb] border-2 border-[#fca5a5] p-4 flex items-start gap-3.5 shadow-sm">
        <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#ef4444] text-white flex items-center justify-center shrink-0 shadow-md">
          <i data-lucide="shield-alert" class="w-6 h-6"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-extrabold text-sm text-cgy-err">${L(v.title)}</span>
            <span class="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b] text-[10px] font-extrabold uppercase">SOS</span>
          </div>
          <div class="text-sm sm:text-[15px] text-[#7f1d1d] font-semibold mt-1 leading-relaxed">${textHtml}</div>
        </div>
      </div>
    `;
  } else if (v.kind === 'browser_bar') {
    const urlHtml = applyClueHotspots(v.url, card);
    const noteHtml = applyClueHotspots(L(v.note), card);
    sceneHtml = `
      <div class="rounded-2xl bg-white border-2 border-[#fca5a5] overflow-hidden shadow-sm">
        <div class="px-3.5 py-2.5 bg-gradient-to-r from-[#fee2e2] to-[#fef3c7] border-b-2 border-[#fecaca] flex items-center gap-2.5">
          <div class="flex-1 bg-white border-2 border-[#fca5a5] rounded-xl px-3 py-1.5 font-mono text-xs text-cgy-err font-bold flex items-center gap-1.5 flex-wrap shadow-inner">
            <i data-lucide="lock-open" class="w-4 h-4 shrink-0 text-cgy-err"></i>
            <span>${urlHtml}</span>
          </div>
        </div>
        <div class="p-4 bg-[#fffbfb] text-sm sm:text-[15px] text-cgy-text font-semibold leading-relaxed">${noteHtml}</div>
      </div>
    `;
  }

  const shellDoneCls = (clues.length === 0 || allCluesFound) ? 'detective-done' : '';
  slot.innerHTML = `
    <div class="detective-shell ${shellDoneCls} rounded-2xl p-3.5 sm:p-4 max-w-2xl">
      ${detectiveHeader}
      ${sceneHtml}
      ${evidenceLog}
    </div>
  `;
}

// --- Тип 1: Выбор ответа ---
function renderChoiceTask(card, container, isEvaluated, res) {
  const wrap = document.createElement('div');
  wrap.className = 'flex flex-col gap-3';
  const letters = ['A', 'B', 'C', 'D'];
  const pillColors = [
    'bg-[#1e5aa8] text-white',
    'bg-[#7c3aed] text-white',
    'bg-[#0d9488] text-white',
    'bg-[#d97706] text-white'
  ];

  const eliminatedId = !isEvaluated ? state.cardDraft.eliminatedOptId : null;

  card.options.forEach((opt, i) => {
    const isEliminated = Boolean(eliminatedId && opt.id === eliminatedId);
    const btn = document.createElement('button');
    let extra = '';
    if (isEvaluated) {
      if (opt.correct) extra = 'is-correct';
      else if (res && res.chosenId === opt.id) extra = 'is-wrong';
    } else if (isEliminated) {
      extra = 'opacity-45 cursor-not-allowed';
    }
    btn.disabled = isEvaluated || isEliminated;
    btn.className = `card-option ${extra} w-full text-left px-4 sm:px-5 py-4 flex items-start gap-3.5 text-base font-bold`;
    btn.innerHTML = `
      <span class="w-8 h-8 rounded-xl ${isEliminated ? 'bg-slate-400 text-white' : pillColors[i % pillColors.length]} text-sm font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">${letters[i] || (i + 1)}</span>
      <span class="leading-snug flex-1 ${isEliminated ? 'line-through text-slate-500' : ''}">${L(opt.text)}</span>
      ${isEliminated ? `<span class="px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 text-[11px] font-extrabold shrink-0 self-center">${state.lang === 'en' ? '50/50' : 'Убрано (50/50)'}</span>` : ''}
    `;
    if (!isEliminated) {
      btn.onclick = () => evaluateCardResult(card, opt.correct, { chosenId: opt.id });
    }
    wrap.appendChild(btn);
  });

  container.appendChild(wrap);
}

// --- Тип 2: Верно / Неверно ---
function renderTrueFalseTask(card, container, isEvaluated, res) {
  const wrap = document.createElement('div');
  wrap.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3.5';

  [
    { val: true, label: t('true_btn'), icon: 'check-circle-2', cls: 'tf-true-opt', iconColor: 'text-[#1e7e34]' },
    { val: false, label: t('false_btn'), icon: 'x-circle', cls: 'tf-false-opt', iconColor: 'text-[#c62828]' }
  ].forEach(item => {
    const btn = document.createElement('button');
    let extra = item.cls;
    if (isEvaluated) {
      if (item.val === card.correctAnswer) extra = 'is-correct';
      else if (res && res.chosenBool === item.val) extra = 'is-wrong';
    }
    btn.disabled = isEvaluated;
    btn.className = `card-option ${extra} py-5 px-5 flex items-center justify-center gap-3 text-lg font-extrabold`;
    btn.innerHTML = `
      <i data-lucide="${item.icon}" class="w-6 h-6 ${isEvaluated ? '' : item.iconColor}"></i>
      <span>${item.label}</span>
    `;
    btn.onclick = () => evaluateCardResult(card, item.val === card.correctAnswer, { chosenBool: item.val });
    wrap.appendChild(btn);
  });

  container.appendChild(wrap);
}

// --- Тип 3: Сортировка с реальным Drag-and-Drop («Тянучка» + клик для телефонов) ---
function renderSortTask(card, container, isEvaluated) {
  const assignments = state.cardDraft.assignments || {};
  const selectedChip = state.cardDraft.selectedSortItem || null;

  const wrap = document.createElement('div');
  wrap.className = 'space-y-4';

  const hint = document.createElement('div');
  hint.className = 'text-sm font-semibold text-cgy-accent flex items-center gap-2';
  hint.innerHTML = `<i data-lucide="hand" class="w-4 h-4 shrink-0"></i><span>${t('sort_drag_hint')}</span>`;
  wrap.appendChild(hint);

  // 1. Зона нераспределённых карточек-фишек (Пул)
  const unassigned = card.items.filter(it => !assignments[it.id]);
  const poolWrap = document.createElement('div');
  poolWrap.className = 'rounded-xl bg-[#f8fafc] border-2 border-dashed border-cgy-border p-3.5 min-h-[76px] transition';

  if (!isEvaluated) {
    poolWrap.ondragover = (e) => { e.preventDefault(); poolWrap.classList.add('border-cgy-accent', 'bg-cgy-soft'); };
    poolWrap.ondragleave = () => poolWrap.classList.remove('border-cgy-accent', 'bg-cgy-soft');
    poolWrap.ondrop = (e) => {
      e.preventDefault();
      poolWrap.classList.remove('border-cgy-accent', 'bg-cgy-soft');
      const itemId = e.dataTransfer.getData('text/plain');
      if (itemId && assignments[itemId]) {
        delete state.cardDraft.assignments[itemId];
        state.cardDraft.selectedSortItem = null;
        SoundFX.playDrop();
        renderCurrentCard();
      }
    };
  }

  if (unassigned.length === 0) {
    poolWrap.innerHTML = `<div class="py-2 text-center text-sm font-semibold text-cgy-ok flex items-center justify-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4"></i><span>${t('sort_pool_empty')}</span></div>`;
  } else {
    const chipsBox = document.createElement('div');
    chipsBox.className = 'flex flex-wrap gap-2.5';
    unassigned.forEach(item => {
      chipsBox.appendChild(createSortChipEl(item, null, isEvaluated, selectedChip === item.id));
    });
    poolWrap.appendChild(chipsBox);
  }
  wrap.appendChild(poolWrap);

  // 2. Две большие корзины для перетаскивания (Drop Zones)
  const bucketsGrid = document.createElement('div');
  bucketsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

  [
    { key: 'safe', label: L(card.buckets.safe), icon: 'check-circle-2', zoneCls: 'drop-zone-safe', headCls: 'text-cgy-ok' },
    { key: 'private', label: L(card.buckets.private), icon: 'shield-off', zoneCls: 'drop-zone-private', headCls: 'text-cgy-err' }
  ].forEach(b => {
    const zone = document.createElement('div');
    zone.className = `drop-zone ${b.zoneCls} rounded-xl p-4 min-h-[160px] flex flex-col gap-3 cursor-pointer`;

    if (!isEvaluated) {
      zone.ondragover = (e) => { e.preventDefault(); zone.classList.add('drag-over'); };
      zone.ondragleave = () => zone.classList.remove('drag-over');
      zone.ondrop = (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const itemId = e.dataTransfer.getData('text/plain');
        if (itemId) assignSortItem(itemId, b.key);
      };
      // Клик по корзине, если выбрана фишка (суперудобно на телефоне!)
      zone.onclick = (e) => {
        if (e.target.closest('.draggable-chip')) return;
        if (state.cardDraft.selectedSortItem) {
          assignSortItem(state.cardDraft.selectedSortItem, b.key);
        }
      };
    }

    const itemsInBucket = card.items.filter(it => assignments[it.id] === b.key);

    const header = document.createElement('div');
    header.className = `flex items-center justify-between border-b border-black/10 pb-2 ${b.headCls}`;
    header.innerHTML = `
      <div class="font-bold text-base flex items-center gap-2">
        <i data-lucide="${b.icon}" class="w-5 h-5"></i>
        <span>${b.label}</span>
      </div>
      <span class="px-2 py-0.5 rounded-full bg-white/80 text-xs font-bold border border-black/10">${itemsInBucket.length}</span>
    `;
    zone.appendChild(header);

    const innerList = document.createElement('div');
    innerList.className = 'flex flex-col gap-2 flex-1';
    if (itemsInBucket.length === 0) {
      innerList.innerHTML = `<div class="flex-1 flex items-center justify-center text-xs font-semibold text-cgy-muted/75 py-6">${t('drop_here')}</div>`;
    } else {
      itemsInBucket.forEach(item => {
        innerList.appendChild(createSortChipEl(item, b.key, isEvaluated, selectedChip === item.id));
      });
    }
    zone.appendChild(innerList);
    bucketsGrid.appendChild(zone);
  });

  wrap.appendChild(bucketsGrid);
  container.appendChild(wrap);
}

function createSortChipEl(item, currentBucket, isEvaluated, isSelected) {
  const chip = document.createElement('div');
  const isLocked = !isEvaluated && Array.isArray(state.cardDraft.lockedIds) && state.cardDraft.lockedIds.includes(item.id);
  const isOk = isEvaluated && currentBucket === item.bucket;
  const isBad = isEvaluated && currentBucket !== item.bucket;

  let colorCls = 'bg-white border-cgy-border text-cgy-text';
  if (isOk) colorCls = 'bg-[#e9f6ec] border-cgy-ok text-[#14532d]';
  else if (isBad) colorCls = 'bg-[#fdecec] border-cgy-err text-[#7f1d1d]';
  else if (isLocked) colorCls = 'bg-[#eff6ff] border-[#93c5fd] text-[#1e40af]';

  chip.className = `draggable-chip ${isSelected ? 'chip-selected' : ''} ${colorCls} border-2 rounded-xl px-3.5 py-2.5 text-sm sm:text-[15px] font-semibold shadow-sm flex items-center justify-between gap-2.5`;
  chip.draggable = !isEvaluated && !isLocked;

  chip.innerHTML = `
    <div class="flex items-center gap-2 min-w-0">
      ${!isEvaluated && !isLocked ? '<i data-lucide="grip-vertical" class="w-4 h-4 text-slate-400 shrink-0"></i>' : ''}
      ${isLocked ? '<i data-lucide="pin" class="w-3.5 h-3.5 text-cgy-accent shrink-0"></i>' : ''}
      <span class="leading-snug">${L(item.text)}</span>
    </div>
    ${isLocked ? `<span class="px-2 py-0.5 rounded-md bg-white border border-[#bfdbfe] text-[10px] font-extrabold text-cgy-accent shrink-0">${state.lang === 'en' ? 'Example' : 'Пример'}</span>` : ''}
    ${!isEvaluated && !isLocked && currentBucket ? `
      <button type="button" onclick="event.stopPropagation(); removeSortItem('${item.id}')" title="Вернуть обратно"
        class="w-6 h-6 rounded-md hover:bg-black/10 text-cgy-muted flex items-center justify-center shrink-0">
        <i data-lucide="x" class="w-3.5 h-3.5"></i>
      </button>
    ` : ''}
    ${isEvaluated ? `<i data-lucide="${isOk ? 'check-circle-2' : 'x-circle'}" class="w-4 h-4 ${isOk ? 'text-cgy-ok' : 'text-cgy-err'} shrink-0"></i>` : ''}
  `;

  if (!isEvaluated && !isLocked) {
    chip.ondragstart = (e) => {
      e.dataTransfer.setData('text/plain', item.id);
      e.dataTransfer.effectAllowed = 'move';
      chip.classList.add('dragging');
      SoundFX.playPick();
    };
    chip.ondragend = () => chip.classList.remove('dragging');
    chip.onclick = () => {
      state.cardDraft.selectedSortItem = (state.cardDraft.selectedSortItem === item.id) ? null : item.id;
      SoundFX.playPick();
      renderCurrentCard();
    };
  }
  return chip;
}

function assignSortItem(itemId, bucket) {
  const card = getCardById(state.currentCardId);
  if (!card || card.type !== 'sort') return;
  state.cardDraft.assignments = state.cardDraft.assignments || {};
  state.cardDraft.assignments[itemId] = bucket;
  state.cardDraft.selectedSortItem = null;
  SoundFX.playDrop();
  renderCurrentCard();
}

function removeSortItem(itemId) {
  if (state.cardDraft.assignments) {
    delete state.cardDraft.assignments[itemId];
    SoundFX.playPick();
    renderCurrentCard();
  }
}

// --- Тип 4: Сопоставление с Drag-and-Drop + живые SVG-линии между парами ---
function renderMatchTask(card, container, isEvaluated) {
  const pairs = state.cardDraft.pairs || {};
  const selectedLeft = state.cardDraft.selectedLeft;
  const rightOrder = state.cardDraft.rightOrder || card.pairs.map(p => p.id);
  const leftKeys = card.pairs.map(p => p.id);
  const badgeColors = ['#1e5aa8', '#0d9488', '#7c3aed', '#d97706'];

  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';

  const statusLine = document.createElement('div');
  statusLine.className = 'text-sm font-semibold text-cgy-accent flex items-center gap-2';
  statusLine.innerHTML = `<i data-lucide="git-compare-arrows" class="w-4 h-4 shrink-0"></i><span>${selectedLeft ? t('match_hint_right') : t('match_drag_hint')}</span>`;
  wrap.appendChild(statusLine);

  // Относительный контейнер для наложения живых SVG-линий
  const board = document.createElement('div');
  board.id = 'match-board';
  board.className = 'relative';

  // SVG-слой для кривых линий связи (виден на десктопе md+)
  const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgLayer.setAttribute('id', 'match-svg-lines');
  svgLayer.setAttribute('class', 'hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10');
  board.appendChild(svgLayer);

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 relative z-20';

  // Левая колонка (Ситуации — можно перетаскивать на правую колонку!)
  const lockedLeftId = !isEvaluated ? state.cardDraft.lockedLeftId : null;
  const leftCol = document.createElement('div');
  leftCol.className = 'space-y-3';
  card.pairs.forEach((pair, idx) => {
    const num = idx + 1;
    const isLocked = Boolean(lockedLeftId && pair.id === lockedLeftId);
    const isPaired = Boolean(pairs[pair.id]);
    const isSelected = selectedLeft === pair.id;
    let stateCls = '';
    if (isEvaluated) stateCls = pairs[pair.id] === pair.id ? 'is-correct' : 'is-wrong';
    else if (isSelected) stateCls = 'active-pick';
    else if (isPaired) stateCls = 'paired';

    const btn = document.createElement('button');
    btn.id = `match-left-${pair.id}`;
    btn.disabled = isEvaluated || isLocked;
    btn.draggable = !isEvaluated && !isLocked;
    btn.className = `match-btn ${stateCls} w-full text-left p-3.5 rounded-xl flex items-center gap-3 text-sm sm:text-[15px] font-medium relative`;
    btn.innerHTML = `
      ${!isEvaluated && !isLocked ? '<i data-lucide="grip-vertical" class="w-4 h-4 opacity-50 shrink-0 hidden sm:inline"></i>' : ''}
      <span class="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
        style="background-color: ${isSelected ? '#0f172a' : badgeColors[idx % badgeColors.length]}">${num}</span>
      <span class="leading-snug flex-1">${L(pair.left)}</span>
      ${isLocked ? `<span class="px-2 py-0.5 rounded-md bg-[#eff6ff] border border-[#bfdbfe] text-[10px] font-extrabold text-cgy-accent shrink-0">${state.lang === 'en' ? 'Example' : 'Пример'}</span>` : ''}
    `;
    if (!isEvaluated && !isLocked) {
      btn.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', pair.id);
        state.cardDraft.selectedLeft = pair.id;
        SoundFX.playPick();
      };
      btn.onclick = () => {
        state.cardDraft.selectedLeft = (state.cardDraft.selectedLeft === pair.id) ? null : pair.id;
        SoundFX.playPick();
        renderCurrentCard();
      };
    }
    leftCol.appendChild(btn);
  });

  // Правая колонка (Реакции — принимают перетаскивание и клики)
  const rightCol = document.createElement('div');
  rightCol.className = 'space-y-3';
  rightOrder.forEach(rightId => {
    const pairObj = card.pairs.find(p => p.id === rightId);
    if (!pairObj) return;
    const matchedLeftId = Object.keys(pairs).find(k => pairs[k] === rightId);
    const isRightLocked = Boolean(lockedLeftId && rightId === lockedLeftId);
    const leftIdx = matchedLeftId ? leftKeys.indexOf(matchedLeftId) : -1;

    let stateCls = '';
    if (isEvaluated) stateCls = matchedLeftId === rightId ? 'is-correct' : 'is-wrong';
    else if (matchedLeftId) stateCls = 'paired';

    const btn = document.createElement('button');
    btn.id = `match-right-${rightId}`;
    btn.disabled = isEvaluated || isRightLocked;
    btn.className = `match-btn ${stateCls} w-full text-left p-3.5 rounded-xl flex items-center gap-3 text-sm sm:text-[15px] font-medium`;
    btn.innerHTML = `
      <span class="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
        leftIdx >= 0 ? 'text-white' : 'bg-cgy-bg text-cgy-muted border border-cgy-border'
      }" style="${leftIdx >= 0 ? `background-color: ${badgeColors[leftIdx % badgeColors.length]}` : ''}">
        ${leftIdx >= 0 ? leftIdx + 1 : '?'}
      </span>
      <span class="leading-snug flex-1">${L(pairObj.right)}</span>
      ${isRightLocked ? `<span class="px-2 py-0.5 rounded-md bg-[#eff6ff] border border-[#bfdbfe] text-[10px] font-extrabold text-cgy-accent shrink-0">${state.lang === 'en' ? 'Example' : 'Пример'}</span>` : ''}
    `;

    const connectPair = (leftIdToLink) => {
      if (!leftIdToLink || isRightLocked || (lockedLeftId && leftIdToLink === lockedLeftId)) return;
      Object.keys(state.cardDraft.pairs).forEach(k => {
        if (state.cardDraft.pairs[k] === rightId) delete state.cardDraft.pairs[k];
      });
      state.cardDraft.pairs[leftIdToLink] = rightId;
      state.cardDraft.selectedLeft = null;
      SoundFX.playConnect();
      renderCurrentCard();
    };

    if (!isEvaluated && !isRightLocked) {
      btn.ondragover = (e) => { e.preventDefault(); btn.classList.add('drag-over'); };
      btn.ondragleave = () => btn.classList.remove('drag-over');
      btn.ondrop = (e) => {
        e.preventDefault();
        btn.classList.remove('drag-over');
        const draggedLeft = e.dataTransfer.getData('text/plain') || state.cardDraft.selectedLeft;
        connectPair(draggedLeft);
      };
      btn.onclick = () => {
        if (!state.cardDraft.selectedLeft) {
          showToast(t('match_hint_left'), 'info');
          return;
        }
        connectPair(state.cardDraft.selectedLeft);
      };
    }
    rightCol.appendChild(btn);
  });

  grid.appendChild(leftCol);
  grid.appendChild(rightCol);
  board.appendChild(grid);
  wrap.appendChild(board);
  container.appendChild(wrap);
}

// Рисуем плавные кривые Безье между соединёнными парами
function drawMatchConnectorLines() {
  const board = document.getElementById('match-board');
  const svg = document.getElementById('match-svg-lines');
  if (!board || !svg) return;
  const card = getCardById(state.currentCardId);
  if (!card || card.type !== 'match') return;

  const rect = board.getBoundingClientRect();
  if (rect.width === 0) return;

  const pairs = state.cardDraft.pairs || {};
  const res = state.cardResults[card.id];
  const isEvaluated = Boolean(res && res.answered && !state.cardDraft.retrying);
  const leftKeys = card.pairs.map(p => p.id);
  const badgeColors = ['#1e5aa8', '#0d9488', '#7c3aed', '#d97706'];

  svg.innerHTML = '';
  Object.entries(pairs).forEach(([leftId, rightId]) => {
    const lEl = document.getElementById(`match-left-${leftId}`);
    const rEl = document.getElementById(`match-right-${rightId}`);
    if (!lEl || !rEl) return;

    const lR = lEl.getBoundingClientRect();
    const rR = rEl.getBoundingClientRect();
    const x1 = lR.right - rect.left;
    const y1 = lR.top + lR.height / 2 - rect.top;
    const x2 = rR.left - rect.left;
    const y2 = rR.top + rR.height / 2 - rect.top;

    // Если колонки стоят друг под другом (мобилка) — линии не рисуем
    if (x2 <= x1 + 6) return;

    const idx = leftKeys.indexOf(leftId);
    let color = badgeColors[Math.max(0, idx) % badgeColors.length];
    if (isEvaluated) {
      color = leftId === rightId ? '#1e7e34' : '#c62828';
    }

    const dx = (x2 - x1) * 0.5;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);

    // Аккуратные точки на концах линии
    [[x1, y1], [x2, y2]].forEach(([cx, cy]) => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', cx);
      dot.setAttribute('cy', cy);
      dot.setAttribute('r', '4.5');
      dot.setAttribute('fill', color);
      svg.appendChild(dot);
    });
  });
}

// --- Тип 5: Порядок действий с Drag-and-Drop перетаскиванием + стрелки ---
function renderOrderTask(card, container, isEvaluated) {
  const order = state.cardDraft.order || card.steps.map(s => s.id);
  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';

  const hint = document.createElement('div');
  hint.className = 'text-sm font-semibold text-cgy-accent flex items-center gap-2';
  hint.innerHTML = `<i data-lucide="arrow-up-down" class="w-4 h-4 shrink-0"></i><span>${t('order_hint')}</span>`;
  wrap.appendChild(hint);

  const list = document.createElement('div');
  list.className = 'space-y-2.5';

  const lockedFirst = !isEvaluated && Boolean(state.cardDraft.lockedFirst);

  order.forEach((stepId, pos) => {
    const stepObj = card.steps.find(s => s.id === stepId);
    if (!stepObj) return;
    const isLocked = lockedFirst && pos === 0;
    const isRightPos = isEvaluated && stepObj.correctPos === pos;
    const isWrongPos = isEvaluated && stepObj.correctPos !== pos;

    const row = document.createElement('div');
    row.draggable = !isEvaluated && !isLocked;
    row.className = `order-card p-3.5 rounded-xl border-2 flex items-center gap-3 ${
      isRightPos ? 'bg-[#e9f6ec] border-cgy-ok'
        : (isWrongPos ? 'bg-[#fdecec] border-cgy-err'
          : (isLocked ? 'bg-[#eff6ff] border-[#93c5fd]' : 'bg-white border-cgy-border hover:border-cgy-accent shadow-sm'))
    }`;

    row.innerHTML = `
      ${!isEvaluated && !isLocked ? '<i data-lucide="grip-vertical" class="w-5 h-5 text-slate-400 shrink-0"></i>' : ''}
      ${isLocked ? '<i data-lucide="lock" class="w-4 h-4 text-cgy-accent shrink-0"></i>' : ''}
      <span class="w-8 h-8 rounded-lg ${
        isRightPos ? 'bg-cgy-ok text-white' : (isWrongPos ? 'bg-cgy-err text-white' : (isLocked ? 'bg-[#16a34a] text-white' : 'bg-cgy-accent text-white'))
      } text-sm font-bold flex items-center justify-center shrink-0">
        ${pos + 1}
      </span>
      <div class="flex-1 text-sm sm:text-base font-medium text-cgy-text leading-snug">${L(stepObj.text)}</div>
      ${isLocked ? `<span class="px-2.5 py-1 rounded-lg bg-white border border-[#bfdbfe] text-[11px] font-extrabold text-cgy-accent shrink-0">${state.lang === 'en' ? 'Step 1 locked' : 'Шаг 1 на месте'}</span>` : ''}
      ${!isEvaluated && !isLocked ? `
        <div class="flex flex-col sm:flex-row gap-1 shrink-0">
          <button type="button" onclick="moveOrderStep(${pos}, -1)" ${pos === 0 || (lockedFirst && pos === 1) ? 'disabled' : ''}
            class="w-9 h-9 rounded-lg bg-cgy-bg border border-cgy-border hover:border-cgy-accent disabled:opacity-35 flex items-center justify-center text-cgy-text transition" title="Вверх">
            <i data-lucide="arrow-up" class="w-4 h-4"></i>
          </button>
          <button type="button" onclick="moveOrderStep(${pos}, 1)" ${pos === order.length - 1 ? 'disabled' : ''}
            class="w-9 h-9 rounded-lg bg-cgy-bg border border-cgy-border hover:border-cgy-accent disabled:opacity-35 flex items-center justify-center text-cgy-text transition" title="Вниз">
            <i data-lucide="arrow-down" class="w-4 h-4"></i>
          </button>
        </div>
      ` : ''}
    `;

    if (!isEvaluated && !isLocked) {
      row.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', String(pos));
        e.dataTransfer.effectAllowed = 'move';
        row.classList.add('dragging');
        SoundFX.playPick();
      };
      row.ondragend = () => {
        row.classList.remove('dragging');
        list.querySelectorAll('.order-card').forEach(el => el.classList.remove('drag-over-top', 'drag-over-bottom'));
      };
      row.ondragover = (e) => {
        e.preventDefault();
        const r = row.getBoundingClientRect();
        const isTop = (e.clientY - r.top) < r.height / 2;
        row.classList.toggle('drag-over-top', isTop);
        row.classList.toggle('drag-over-bottom', !isTop);
      };
      row.ondragleave = () => row.classList.remove('drag-over-top', 'drag-over-bottom');
      row.ondrop = (e) => {
        e.preventDefault();
        row.classList.remove('drag-over-top', 'drag-over-bottom');
        const fromIdx = Number(e.dataTransfer.getData('text/plain'));
        if (!Number.isNaN(fromIdx) && fromIdx !== pos) {
          reorderStepDrag(fromIdx, pos);
        }
      };
    }

    list.appendChild(row);
  });

  wrap.appendChild(list);
  container.appendChild(wrap);
}

function reorderStepDrag(fromIdx, toIdx) {
  const order = state.cardDraft.order;
  if (!order) return;
  if (state.cardDraft.lockedFirst && (fromIdx === 0 || toIdx === 0)) return;
  const [moved] = order.splice(fromIdx, 1);
  order.splice(toIdx, 0, moved);
  SoundFX.playDrop();
  renderCurrentCard();
}

function moveOrderStep(pos, delta) {
  const order = state.cardDraft.order;
  if (!order) return;
  const target = pos + delta;
  if (state.cardDraft.lockedFirst && (pos === 0 || target === 0)) return;
  if (target < 0 || target >= order.length) return;
  [order[pos], order[target]] = [order[target], order[pos]];
  SoundFX.playDrop();
  renderCurrentCard();
}

function updateCheckBtnReadiness(card) {
  const btn = document.getElementById('btn-card-check');
  let ready = false;
  if (card.type === 'sort') {
    ready = Object.keys(state.cardDraft.assignments || {}).length === card.items.length;
  } else if (card.type === 'match') {
    ready = Object.keys(state.cardDraft.pairs || {}).length === card.pairs.length;
  } else if (card.type === 'order') {
    ready = true;
  }
  btn.disabled = !ready;
  btn.className = ready
    ? 'px-6 py-3 rounded-lg bg-cgy-accent hover:bg-cgy-accentHover text-white font-bold text-base transition shadow-sm cursor-pointer'
    : 'px-6 py-3 rounded-lg bg-slate-200 text-slate-400 font-bold text-base cursor-not-allowed';
}

function submitCurrentCard() {
  const card = getCardById(state.currentCardId);
  if (!card) return;
  let isCorrect = false;

  if (card.type === 'sort') {
    const a = state.cardDraft.assignments || {};
    isCorrect = card.items.every(item => a[item.id] === item.bucket);
  } else if (card.type === 'match') {
    const p = state.cardDraft.pairs || {};
    isCorrect = card.pairs.every(pair => p[pair.id] === pair.id);
  } else if (card.type === 'order') {
    const ord = state.cardDraft.order || [];
    isCorrect = card.steps.every(step => ord[step.correctPos] === step.id);
  }

  const savedDraft = {};
  if (card.type === 'sort') savedDraft.assignments = { ...(state.cardDraft.assignments || {}) };
  if (card.type === 'match') {
    savedDraft.pairs = { ...(state.cardDraft.pairs || {}) };
    savedDraft.rightOrder = [...(state.cardDraft.rightOrder || card.pairs.map(p => p.id))];
  }
  if (card.type === 'order') savedDraft.order = [...(state.cardDraft.order || [])];

  evaluateCardResult(card, isCorrect, { savedDraft });
}

function evaluateCardResult(card, isCorrect, extra = {}) {
  const prev = state.cardResults[card.id];
  const isFirstAttempt = !prev || !prev.answered;

  // Динамическая сложность + Облегчённый режим поддержки + Комбо-серия!
  if (isCorrect) {
    state.streak = (state.streak || 0) + 1;
    state.supportMode = false;
    SoundFX.playWin(state.streak);
    burstConfetti('small');
    showFloatingXp(state.streak >= 2 ? `+100 XP • ${t('streak_label')} x${state.streak}` : '+100 XP', true);
    if (state.adaptiveLevel < 3) {
      state.adaptiveLevel += 1;
    }
  } else {
    state.streak = 0;
    state.supportMode = true;
    SoundFX.playFail();
    if (state.adaptiveLevel > 1) {
      state.adaptiveLevel -= 1;
    }
  }

  state.cardResults[card.id] = {
    answered: true,
    correct: isCorrect,
    firstTryCorrect: isFirstAttempt ? isCorrect : Boolean(prev.firstTryCorrect),
    wrongCount: (prev ? (prev.wrongCount || 0) : 0) + (isCorrect ? 0 : 1),
    adaptiveNote: '',
    ...extra
  };
  state.cardDraft.retrying = false;

  // Формируем ЧЕСТНУЮ заметку о том, что реально произойдёт дальше (никакого вранья на 8-й карточке!)
  const nextTarget = getNextAdaptiveTarget();
  const isEn = state.lang === 'en';
  let adaptiveNote = '';
  if (!nextTarget) {
    adaptiveNote = isEn
      ? 'All 8 missions completed! Open Analytics to download your Cyber-Hero Diploma.'
      : 'Все 8 карточек решены! Можно переходить к аналитике и именному диплому.';
  } else {
    const nextNum = CARDS.findIndex(c => c.id === nextTarget.card.id) + 1;
    const nextLvlName = t('levelShort')[nextTarget.card.level || 1];
    if (isCorrect) {
      adaptiveNote = isEn
        ? `Adaptive level ${state.adaptiveLevel}/3 — next up: Mission #${nextNum} (${nextLvlName}).`
        : `Уровень сложности ${state.adaptiveLevel}/3 — дальше откроется карточка №${nextNum} (${nextLvlName}).`;
    } else {
      adaptiveNote = isEn
        ? `Guided mode activated (${state.adaptiveLevel}/3): retry or next mission (#${nextNum}) will include built-in help.`
        : `Включён облегчённый режим (${state.adaptiveLevel}/3): при повторе или на карточке №${nextNum} часть задания будет подсказана (50/50, пример или шаг №1).`;
    }
  }
  state.cardResults[card.id].adaptiveNote = adaptiveNote;

  // Записываем точку в историю динамики прохождений при каждом завершении всех карточек
  const summary = getCardStatsSummary();
  if (summary.answered === summary.total) {
    recordSessionHistoryPoint(summary.pct);
    if (summary.pct >= 75) setTimeout(() => burstConfetti('big'), 220);
  }
  checkNewlyUnlockedAchievements();

  saveState();
  updateAllProgressBadges();
  renderCurrentCard();

  // Живая анимация и авто-озвучка героя на ответ ребёнка!
  const winList = t('yugorka_win');
  const oopsList = t('yugorka_oops');
  const msg = isCorrect
    ? winList[Math.floor(Math.random() * winList.length)]
    : oopsList[Math.floor(Math.random() * oopsList.length)];
  updateMascot(isCorrect ? 'happy' : 'oops', msg, true);
  playHeroReactionVoice(card, isCorrect);

  emitPortalEvent('card_answered', {
    cardId: card.id,
    type: card.type,
    topic: card.topic,
    correct: isCorrect,
    adaptiveLevel: state.adaptiveLevel,
    cardsScorePct: summary.pct
  });
}

function recordSessionHistoryPoint(pct) {
  const nextNum = state.sessionHistory.length + 1;
  const label = state.lang === 'en' ? `Run #${nextNum}` : `Попытка ${nextNum}`;
  // Избегаем дубля в одну секунду на одном и том же прохождении
  const last = state.sessionHistory[state.sessionHistory.length - 1];
  if (last && last.sessionTag === state.currentSessionTag) {
    last.pct = pct;
  } else {
    state.currentSessionTag = Date.now();
    state.sessionHistory.push({ label, pct, sessionTag: state.currentSessionTag });
    if (state.sessionHistory.length > 8) state.sessionHistory.shift();
  }
}

function showCardFeedbackUI(card, isCorrect, adaptiveNote) {
  const fb = document.getElementById('card-feedback');
  const icon = document.getElementById('card-feedback-icon');
  const title = document.getElementById('card-feedback-title');
  const text = document.getElementById('card-feedback-text');
  const adapt = document.getElementById('card-adaptive-note');

  fb.classList.remove('hidden');
  if (isCorrect) {
    fb.className = 'rounded-xl p-4 sm:p-5 border-2 bg-[#e9f6ec] border-cgy-ok text-[#14532d] animate-success-pop';
    icon.className = 'w-9 h-9 rounded-lg bg-cgy-ok text-white flex items-center justify-center shrink-0 mt-0.5';
    icon.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i>';
    title.textContent = t('correct_title');
  } else {
    fb.className = 'rounded-xl p-4 sm:p-5 border-2 bg-[#fdecec] border-cgy-err text-[#7f1d1d] animate-shake';
    icon.className = 'w-9 h-9 rounded-lg bg-cgy-err text-white flex items-center justify-center shrink-0 mt-0.5';
    icon.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5"></i>';
    title.textContent = t('wrong_title');
  }

  text.textContent = L(card.explanation);
  adapt.textContent = adaptiveNote || '';
  adapt.classList.toggle('hidden', !adaptiveNote);
}

function retryCurrentCard() {
  stopReadAloud();
  const card = getCardById(state.currentCardId);
  if (!card) return;
  state.cardDraft = { retrying: true };
  initCardDraftIfNeeded(card);
  state.cardDraft.retrying = true;
  renderCurrentCard();
}

function goNextCard() {
  stopReadAloud();
  const nextTarget = getNextAdaptiveTarget();
  if (!nextTarget) {
    switchMainTab('results');
    return;
  }

  if (nextTarget.reason === 'review') {
    state.supportMode = true;
    state.currentCardId = nextTarget.card.id;
    state.cardDraft = { retrying: true };
    saveState();
    SoundFX.playPick();
    renderCurrentCard(true);
    return;
  }

  selectCardById(nextTarget.card.id);
}

function resetCardsSession() {
  const summary = getCardStatsSummary();
  if (summary.answered > 0 && summary.answered < summary.total) {
    recordSessionHistoryPoint(summary.pct);
  }
  state.currentSessionTag = Date.now();
  state.cardResults = {};
  state.cardDraft = {};
  state.adaptiveLevel = state.profile.gradeClass === '8-11' ? 3 : 1;
  state.supportMode = state.profile.gradeClass === '1-4';
  state.streak = 0;
  state.currentCardId = CARDS[0].id;
  stopReadAloud();
  saveState();
  updateAllProgressBadges();
  renderCurrentCard();
  showToast(state.lang === 'en' ? 'Cards restarted' : 'Кибер-карточки сброшены — можно пройти заново', 'info');
}

// ==================== ОБЩИЙ ПРОГРЕСС И БЕЙДЖИ ====================

function updateAllProgressBadges() {
  const cSum = getCardStatsSummary();
  const activeSc = getActiveGradeScenarios();
  const chatDone = activeSc.filter(s => state.chatCompleted.includes(s.id)).length;
  const chatTotal = activeSc.length;

  document.getElementById('badge-cards-progress').textContent = `${cSum.correct}/${cSum.total}`;
  document.getElementById('badge-chat-progress').textContent = `${chatDone}/${chatTotal}`;

  const totalAll = cSum.total + chatTotal;
  const doneAll = cSum.correct + chatDone;
  const pct = totalAll ? Math.round((doneAll / totalAll) * 100) : 0;

  const bar = document.getElementById('overall-bar');
  const pctEl = document.getElementById('overall-pct');
  if (bar) bar.style.width = `${pct}%`;
  if (pctEl) pctEl.textContent = `${pct}%`;
}

// ==================== СИМУЛЯТОР МЕССЕНДЖЕРА (ВКЛАДКА 2) ====================

function getLocalizedScenario(baseSc) {
  if (!baseSc) return null;
  if (state.lang === 'ru' || typeof SCENARIO_I18N === 'undefined') return baseSc;
  const pack = SCENARIO_I18N[state.lang] && SCENARIO_I18N[state.lang][baseSc.id];
  if (!pack) return baseSc;

  const sc = {
    ...baseSc,
    title: pack.title || baseSc.title,
    shortTitle: pack.shortTitle || baseSc.shortTitle,
    preview: pack.preview || baseSc.preview,
    winLesson: pack.winLesson || baseSc.winLesson,
    falseAlarmReason: pack.falseAlarmReason || baseSc.falseAlarmReason,
    callBehavior: baseSc.callBehavior ? { ...baseSc.callBehavior, ...(pack.callBehavior || {}) } : baseSc.callBehavior,
    profile: baseSc.profile ? { ...baseSc.profile, ...(pack.profile || {}) } : baseSc.profile,
    achievement: baseSc.achievement ? { ...baseSc.achievement, ...(pack.achievement || {}) } : baseSc.achievement,
    steps: {}
  };

  Object.keys(baseSc.steps || {}).forEach(stepKey => {
    const bStep = baseSc.steps[stepKey];
    const tStep = (pack.steps && pack.steps[stepKey]) || {};
    const stepCopy = { ...bStep };

    if (bStep.incomingSms) {
      stepCopy.incomingSms = { ...bStep.incomingSms, ...(tStep.incomingSms || {}) };
    }

    if (Array.isArray(bStep.messages)) {
      stepCopy.messages = bStep.messages.map((bMsg, idx) => {
        const tMsg = (tStep.messages && tStep.messages[idx]) || {};
        const mCopy = { ...bMsg };
        if (tMsg.text !== undefined) mCopy.text = tMsg.text;
        if (bMsg.voiceMessage) {
          mCopy.voiceMessage = { ...bMsg.voiceMessage, ...(tMsg.voiceMessage || {}) };
        }
        if (bMsg.linkCard) {
          const tLc = tMsg.linkCard || {};
          mCopy.linkCard = {
            ...bMsg.linkCard,
            ...tLc,
            failData: bMsg.linkCard.failData ? { ...bMsg.linkCard.failData, ...(tLc.failData || {}) } : bMsg.linkCard.failData
          };
        }
        return mCopy;
      });
    }

    if (Array.isArray(bStep.choices)) {
      stepCopy.choices = bStep.choices.map((bCh, idx) => {
        const tCh = (tStep.choices && tStep.choices[idx]) || {};
        const cCopy = { ...bCh };
        if (tCh.text !== undefined) cCopy.text = tCh.text;
        if (tCh.winReply !== undefined) cCopy.winReply = tCh.winReply;
        if (bCh.fail) {
          cCopy.fail = { ...bCh.fail, ...(tCh.fail || {}) };
        }
        return cCopy;
      });
    }

    sc.steps[stepKey] = stepCopy;
  });

  return sc;
}

// Преобразует сохранённое сообщение переписки на текущий выбранный язык (даже если чат уже был открыт!)
function resolveChatMessage(sc, msgObj) {
  if (!sc || !msgObj) return msgObj;
  const baseSc = SCENARIOS.find(s => s.id === sc.id);

  if (msgObj.sender === 'system') {
    if (msgObj.sysKind === 'blocked') {
      return { ...msgObj, text: state.lang === 'en' ? `Contact "${sc.title}" blocked & reported` : (state.lang === 'kca' ? `«${sc.title}» блока пунсы` : `Контакт «${sc.title}» заблокирован, жалоба отправлена`) };
    }
    if (msgObj.sysKind === 'done') {
      return { ...msgObj, text: `${t('chat_passed_prefix')} • ${sc.achievement.title}` };
    }
    return msgObj;
  }

  // Если у сообщения есть точные координаты шага (новые сообщения)
  if (msgObj.stepKey && sc.steps[msgObj.stepKey]) {
    const step = sc.steps[msgObj.stepKey];
    if (msgObj.sender === 'scammer' && typeof msgObj.msgIdx === 'number' && step.messages[msgObj.msgIdx]) {
      const m = step.messages[msgObj.msgIdx];
      return { ...msgObj, text: m.text || '', linkCard: m.linkCard || null, voiceMessage: m.voiceMessage || null };
    }
    if (msgObj.sender === 'user' && typeof msgObj.choiceIdx === 'number' && step.choices[msgObj.choiceIdx]) {
      return { ...msgObj, text: step.choices[msgObj.choiceIdx].text };
    }
  }

  // Фолбэк для старых сообщений из localStorage (сопоставляем по тексту в базовом русском сценарии)
  if (baseSc) {
    for (const stepKey of Object.keys(baseSc.steps || {})) {
      const bStep = baseSc.steps[stepKey];
      const lStep = sc.steps[stepKey];
      if (!lStep) continue;
      if (msgObj.sender === 'scammer') {
        const idx = (bStep.messages || []).findIndex(m => (m.text || '') === (msgObj.text || '') && Boolean(m.voiceMessage) === Boolean(msgObj.voiceMessage));
        if (idx !== -1 && lStep.messages[idx]) {
          const lm = lStep.messages[idx];
          return { ...msgObj, text: lm.text || '', linkCard: lm.linkCard || null, voiceMessage: lm.voiceMessage || null };
        }
      } else if (msgObj.sender === 'user') {
        const idx = (bStep.choices || []).findIndex(c => c.text === msgObj.text);
        if (idx !== -1 && lStep.choices[idx]) {
          return { ...msgObj, text: lStep.choices[idx].text };
        }
      }
    }
  }
  return msgObj;
}

function getActiveGradeScenarios() {
  return SCENARIOS
    .filter(sc => !sc.grades || sc.grades.includes(state.chatGradeMode))
    .map(sc => getLocalizedScenario(sc));
}

function getScenarioById(id) {
  const base = SCENARIOS.find(s => s.id === id);
  return base ? getLocalizedScenario(base) : null;
}

function getChatState(id) {
  if (!state.chats[id]) {
    state.chats[id] = { stepKey: 'start', messages: [], started: false, stepDelivered: false, stepMessagesDeliveredCount: 0 };
  }
  return state.chats[id];
}

function getCurrentTimeStr() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function setGradeMode(mode) {
  if (mode !== '5-7' && mode !== '8-11') return;
  state.chatGradeMode = mode;
  saveState();
  updateChatGradeUI();
  updateAllProgressBadges();
  renderChatList();
  const vis = getActiveGradeScenarios();
  if (state.activeScenarioId && !vis.some(s => s.id === state.activeScenarioId)) {
    clearTypingTimers();
    state.activeScenarioId = null;
    document.getElementById('active-chat').classList.add('hidden');
    document.getElementById('chat-empty-state').classList.remove('hidden');
    closeMobileChat();
  }
}

function updateChatGradeUI() {
  const b1 = document.getElementById('grade-btn-5-7');
  const b2 = document.getElementById('grade-btn-8-11');
  if (!b1 || !b2) return;
  const isJ = state.chatGradeMode === '5-7';
  b1.className = isJ ? 'px-2 py-0.5 rounded bg-cgy-accent text-white' : 'px-2 py-0.5 rounded text-cgy-muted';
  b2.className = !isJ ? 'px-2 py-0.5 rounded bg-cgy-accent text-white' : 'px-2 py-0.5 rounded text-cgy-muted';
}

function renderBadgeHTML(badgeType, clickable = true) {
  if (badgeType === 'fake_premium') return TG_SVG.fakePremiumBadge(clickable);
  if (badgeType === 'bot') return TG_SVG.botTag();
  return '';
}

function inspectFakeBadge() {
  showToast('Это эмодзи-статус Telegram Premium, а НЕ официальная верификация!', 'warn', 4200);
  if (state.activeScenarioId === 'blogger') openProfileModal();
}

function renderChatList() {
  const container = document.getElementById('chat-list');
  if (!container) return;
  container.innerHTML = '';

  const list = getActiveGradeScenarios().filter(sc => {
    if (!state.chatSearch) return true;
    return `${sc.title} ${sc.shortTitle} ${sc.handle} ${sc.preview}`.toLowerCase().includes(state.chatSearch);
  });

  if (list.length === 0) {
    container.innerHTML = '<div class="p-6 text-center text-xs text-cgy-muted">Ничего не найдено</div>';
    return;
  }

  list.forEach(sc => {
    const isCompleted = state.chatCompleted.includes(sc.id);
    const isActive = state.activeScenarioId === sc.id;
    const chatSt = state.chats[sc.id];
    const hasStarted = Boolean(chatSt && chatSt.started);

    let preview = sc.preview;
    if (isCompleted) preview = `${t('chat_passed_prefix')} • ${sc.achievement.title}`;
    else if (chatSt && chatSt.messages && chatSt.messages.length > 0) {
      const last = resolveChatMessage(sc, chatSt.messages[chatSt.messages.length - 1]);
      preview = last.voiceMessage && !last.text
        ? `${t('chat_voice_lbl')} (0:07)`
        : (last.sender === 'user' ? t('chat_you_prefix') : '') + (last.text || '').replace(/<[^>]+>/g, '');
    }

    const btn = document.createElement('button');
    btn.className = `w-full text-left px-3 py-3 flex items-center gap-3 transition border-b border-[#edf0f5] ${
      isActive ? 'chat-item-active' : 'hover:bg-[#f5f7fa] text-cgy-text'
    }`;
    btn.onclick = () => selectScenarioById(sc.id);

    btn.innerHTML = `
      <div class="relative shrink-0">
        <div class="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background-color: ${sc.avatarColor}">
          ${sc.avatarText}
        </div>
        ${isCompleted
          ? `<span class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-cgy-ok border-2 border-white flex items-center justify-center text-white"><i data-lucide="check" class="w-2.5 h-2.5" stroke-width="3"></i></span>`
          : `<span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-cgy-ok border-2 border-white"></span>`
        }
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-1.5">
          <div class="flex items-center gap-1 min-w-0">
            <span class="font-bold text-sm truncate">${sc.title}</span>
            ${renderBadgeHTML(sc.badgeType, false)}
          </div>
          <span class="chat-time text-[11px] ${isActive ? '' : 'text-cgy-muted'} shrink-0 tabular-nums">${sc.time}</span>
        </div>
        <div class="flex items-center justify-between gap-2 mt-0.5">
          <p class="chat-sub text-xs ${isActive ? '' : 'text-cgy-muted'} truncate">${preview}</p>
          ${!isCompleted && !hasStarted
            ? `<span class="min-w-[19px] h-[19px] px-1.5 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-cgy-accent text-white'} text-[11px] font-bold flex items-center justify-center shrink-0">1</span>`
            : ''
          }
        </div>
      </div>
    `;
    container.appendChild(btn);
  });

  refreshIcons();
}

function openFirstVisibleChat() {
  const list = getActiveGradeScenarios();
  if (list.length > 0) selectScenarioById(list[0].id);
}

function clearTypingTimers() {
  state.typingTimers.forEach(t => clearTimeout(t));
  state.typingTimers = [];
  state.isTyping = false;
  SoundFX.stopSpeech();
  const ind = document.getElementById('typing-indicator');
  if (ind) ind.classList.add('hidden');
}

function selectScenarioById(id) {
  const sc = getScenarioById(id);
  if (!sc) return;

  if (state.activeScenarioId === sc.id) {
    document.getElementById('chat-pane').classList.remove('translate-x-full');
    return;
  }

  if (state.isTyping && state.activeScenarioId) {
    finalizeInterruptedStep(state.activeScenarioId);
  }

  clearTypingTimers();
  state.activeScenarioId = sc.id;
  if (state.replayingId && state.replayingId !== sc.id) state.replayingId = null;

  document.getElementById('chat-pane').classList.remove('translate-x-full');
  document.getElementById('chat-empty-state').classList.add('hidden');
  document.getElementById('active-chat').classList.remove('hidden');

  const av = document.getElementById('chat-header-avatar');
  av.style.backgroundColor = sc.avatarColor;
  av.textContent = sc.avatarText;

  document.getElementById('chat-header-name').textContent = sc.title;
  document.getElementById('chat-header-badge').innerHTML = renderBadgeHTML(sc.badgeType, true);

  renderChatList();
  openOrRestoreConversation(sc);
}

function finalizeInterruptedStep(scId) {
  const sc = getScenarioById(scId);
  const chatSt = state.chats[scId];
  if (!sc || !chatSt || chatSt.stepDelivered) return;
  const step = sc.steps[chatSt.stepKey];
  if (!step) return;

  const already = chatSt.stepMessagesDeliveredCount || 0;
  for (let i = already; i < step.messages.length; i++) {
    const msg = step.messages[i];
    chatSt.messages.push({
      sender: 'scammer',
      stepKey: chatSt.stepKey,
      msgIdx: i,
      text: msg.text || '',
      linkCard: msg.linkCard || null,
      voiceMessage: msg.voiceMessage || null,
      time: getCurrentTimeStr()
    });
  }
  chatSt.stepMessagesDeliveredCount = step.messages.length;
  chatSt.stepDelivered = true;
  if (step.incomingSms) deliverIncomingSms(sc.id, step.incomingSms);
  saveState();
}

function closeMobileChat() {
  document.getElementById('chat-pane').classList.add('translate-x-full');
}

function openOrRestoreConversation(sc) {
  clearTypingTimers();
  const chatSt = getChatState(sc.id);
  const isCompleted = state.chatCompleted.includes(sc.id) && state.replayingId !== sc.id;

  const area = document.getElementById('messages-area');
  area.innerHTML = `<div class="flex justify-center my-1"><span class="px-3 py-0.5 rounded-full bg-white/80 border border-[#d6e0ec] text-xs font-medium text-cgy-muted">${t('chat_today')}</span></div>`;

  updateChatCompletedUI(sc, isCompleted);
  updateInlineSmsHint();

  if (chatSt.started && chatSt.messages.length > 0) {
    chatSt.messages.forEach(m => appendMessageDOM(resolveChatMessage(sc, m), false));
    if (isCompleted) renderCompletedChatChoices(sc);
    else {
      const step = sc.steps[chatSt.stepKey];
      if (step) renderChatChoices(sc, step.choices);
    }
    scrollChatToBottom();
    return;
  }

  chatSt.started = true;
  chatSt.stepKey = 'start';
  chatSt.messages = [];
  chatSt.stepDelivered = false;
  chatSt.stepMessagesDeliveredCount = 0;
  saveState();
  renderChatList();
  playStep(sc, 'start');
}

function updateChatCompletedUI(sc, isCompleted) {
  const banner = document.getElementById('chat-completed-banner');
  const blockBtn = document.getElementById('btn-block-header');
  const replayBtn = document.getElementById('btn-replay-header');
  const statusEl = document.getElementById('chat-header-status');

  if (isCompleted) {
    banner.classList.remove('hidden');
    document.getElementById('chat-completed-text').textContent = sc.isLegit
      ? `${t('chat_safe_done')} (${sc.achievement.title}).`
      : `${t('chat_scam_done')} (${sc.achievement.title}).`;
    blockBtn.classList.add('hidden');
    replayBtn.classList.remove('hidden');
    replayBtn.classList.add('flex');
    statusEl.textContent = sc.isLegit ? t('chat_online') : t('chat_blocked');
    statusEl.className = sc.isLegit ? 'text-xs text-cgy-accent truncate' : 'text-xs text-cgy-err font-semibold truncate';
  } else {
    banner.classList.add('hidden');
    blockBtn.classList.remove('hidden');
    replayBtn.classList.add('hidden');
    replayBtn.classList.remove('flex');
    statusEl.textContent = sc.badgeType === 'bot' ? t('chat_bot') : t('chat_online');
    statusEl.className = 'text-xs text-cgy-accent truncate';
  }
}

function playStep(sc, stepKey) {
  const step = sc.steps[stepKey];
  if (!step) return;
  const chatSt = getChatState(sc.id);
  chatSt.stepKey = stepKey;
  chatSt.stepDelivered = false;
  chatSt.stepMessagesDeliveredCount = 0;
  saveState();

  setChatChoicesDisabled(t('chat_typing_full'));
  setTypingStatus(true);

  let delay = 320;
  step.messages.forEach((msg, index) => {
    const timer = setTimeout(() => {
      const freshSc = getScenarioById(sc.id) || sc;
      const freshMsg = (freshSc.steps[stepKey] && freshSc.steps[stepKey].messages[index]) || msg;
      const msgObj = {
        sender: 'scammer',
        stepKey,
        msgIdx: index,
        text: freshMsg.text || '',
        linkCard: freshMsg.linkCard || null,
        voiceMessage: freshMsg.voiceMessage || null,
        time: getCurrentTimeStr()
      };
      chatSt.messages.push(msgObj);
      chatSt.stepMessagesDeliveredCount = index + 1;

      if (state.activeScenarioId === sc.id) {
        appendMessageDOM(msgObj, true);
        SoundFX.playIncoming();
        scrollChatToBottom();
      }

      if (index === step.messages.length - 1) {
        chatSt.stepDelivered = true;
        saveState();
        renderChatList();
        if (state.activeScenarioId === sc.id) {
          setTypingStatus(false);
          const freshStep = freshSc.steps[stepKey] || step;
          renderChatChoices(freshSc, freshStep.choices);
        }
        const freshStepSms = (freshSc.steps[stepKey] && freshSc.steps[stepKey].incomingSms) || step.incomingSms;
        if (freshStepSms) {
          const smsTimer = setTimeout(() => deliverIncomingSms(sc.id, freshStepSms), 400);
          state.typingTimers.push(smsTimer);
        }
      } else {
        saveState();
      }
    }, delay);

    state.typingTimers.push(timer);
    delay += Math.min(780, Math.max(460, (msg.text || '').length * 5));
  });
}

function setTypingStatus(isTyping) {
  state.isTyping = isTyping;
  document.getElementById('typing-indicator').classList.toggle('hidden', !isTyping);
  const statusEl = document.getElementById('chat-header-status');
  if (isTyping) {
    statusEl.textContent = t('chat_typing');
    scrollChatToBottom();
  } else {
    const sc = getScenarioById(state.activeScenarioId);
    if (sc && (!state.chatCompleted.includes(sc.id) || state.replayingId === sc.id)) {
      statusEl.textContent = sc.badgeType === 'bot' ? t('chat_bot') : t('chat_online');
    }
  }
}

function playVoiceMessage(voiceId) {
  const data = window.__voiceMap && window.__voiceMap[voiceId];
  if (!data) return;
  const btn = document.getElementById(`voice-btn-${voiceId}`);
  const bars = document.querySelectorAll(`#voice-bars-${voiceId} .voice-bar`);

  if (btn && btn.dataset.playing === '1') {
    SoundFX.stopSpeech();
    if (state.activeVoiceTimer) clearInterval(state.activeVoiceTimer);
    btn.dataset.playing = '0';
    btn.innerHTML = '<i data-lucide="play" class="w-4 h-4 ml-0.5"></i>';
    bars.forEach(b => b.classList.remove('played'));
    refreshIcons();
    return;
  }

  SoundFX.stopSpeech();
  if (state.activeVoiceTimer) clearInterval(state.activeVoiceTimer);

  if (btn) {
    btn.dataset.playing = '1';
    btn.innerHTML = '<i data-lucide="square" class="w-3.5 h-3.5"></i>';
    refreshIcons();
  }

  let stepIdx = 0;
  const resetUI = () => {
    if (state.activeVoiceTimer) clearInterval(state.activeVoiceTimer);
    if (btn) {
      btn.dataset.playing = '0';
      btn.innerHTML = '<i data-lucide="play" class="w-4 h-4 ml-0.5"></i>';
      refreshIcons();
    }
    bars.forEach(b => b.classList.remove('played'));
  };

  SoundFX.speakVoice(data.speechText, { rate: 1.08, pitch: 0.85 }, resetUI);
  state.activeVoiceTimer = setInterval(() => {
    if (stepIdx < bars.length) {
      bars[stepIdx].classList.add('played');
      stepIdx++;
    } else resetUI();
  }, 260);
}

function toggleVoiceTranscript(voiceId) {
  const el = document.getElementById(`voice-tr-${voiceId}`);
  if (el) {
    el.classList.toggle('hidden');
    scrollChatToBottom(true);
  }
}

function appendMessageDOM(msgObj, animate = true) {
  const area = document.getElementById('messages-area');
  const wrapper = document.createElement('div');
  const isOut = msgObj.sender === 'user';
  const isSystem = msgObj.sender === 'system';

  if (isSystem) {
    wrapper.className = `flex justify-center my-1.5 ${animate ? 'msg-animate' : ''}`;
    wrapper.innerHTML = `<div class="px-3 py-1 rounded-full bg-white/85 border border-[#d6e0ec] text-xs font-semibold text-cgy-muted text-center">${msgObj.text}</div>`;
    area.appendChild(wrapper);
    return;
  }

  wrapper.className = `flex ${isOut ? 'justify-end' : 'justify-start'} ${animate ? 'msg-animate' : ''}`;

  let voiceHTML = '';
  if (msgObj.voiceMessage) {
    const vm = msgObj.voiceMessage;
    const voiceId = 'vm_' + Math.random().toString(36).slice(2, 9);
    window.__voiceMap = window.__voiceMap || {};
    window.__voiceMap[voiceId] = vm;
    const heights = [8, 14, 20, 12, 24, 18, 10, 22, 16, 26, 14, 19, 22, 11, 17, 23, 13, 18, 10, 15, 20, 12];
    const barsHTML = heights.map(h => `<span class="voice-bar" style="height:${h}px"></span>`).join('');
    voiceHTML = `
      <div class="min-w-[230px] sm:min-w-[260px]">
        <div class="flex items-center gap-3">
          <button id="voice-btn-${voiceId}" data-playing="0" onclick="playVoiceMessage('${voiceId}')"
            class="w-10 h-10 rounded-full bg-cgy-accent hover:bg-cgy-accentHover text-white flex items-center justify-center shrink-0 transition">
            <i data-lucide="play" class="w-4 h-4 ml-0.5"></i>
          </button>
          <div class="flex-1 min-w-0">
            <div id="voice-bars-${voiceId}" class="flex items-center gap-[2.5px] h-7">${barsHTML}</div>
            <div class="flex items-center justify-between text-xs text-cgy-muted mt-1">
              <span>${vm.duration} • ${t('chat_voice_lbl')}</span>
              <button onclick="toggleVoiceTranscript('${voiceId}')" class="text-cgy-accent hover:underline font-semibold">${t('chat_transcript_btn')}</button>
            </div>
          </div>
        </div>
        <div id="voice-tr-${voiceId}" class="hidden mt-2 pt-2 border-t border-[#e5e9f0] text-xs text-cgy-text leading-relaxed italic">${vm.transcript}</div>
      </div>
    `;
  }

  let linkCardHTML = '';
  if (msgObj.linkCard) {
    const lc = msgObj.linkCard;
    const failId = 'link_' + Math.random().toString(36).slice(2, 9);
    window.__fakeLinkMap = window.__fakeLinkMap || {};
    window.__fakeLinkMap[failId] = lc.failData;
    linkCardHTML = `
      <div onclick="handleFakeLinkClick('${failId}')" role="button" tabindex="0" class="tg-link-preview mt-2 px-3 py-2 cursor-pointer">
        <div class="text-xs font-bold text-cgy-accent">${lc.siteName}</div>
        <div class="text-sm font-bold text-cgy-text mt-0.5">${lc.title}</div>
        <div class="text-xs text-cgy-muted mt-0.5 leading-snug">${lc.desc}</div>
        <div class="mt-1.5 font-mono text-xs text-cgy-accent underline break-all">${lc.url}</div>
      </div>
    `;
  }

  const formattedText = (msgObj.text || '').replace(/\n/g, '<br>');
  wrapper.innerHTML = `
    <div class="max-w-[88%] sm:max-w-[74%] px-3.5 py-2.5 shadow-sm ${isOut ? 'bubble-out' : 'bubble-in'}">
      ${voiceHTML}
      ${formattedText ? `<div class="text-[15px] leading-relaxed break-words">${formattedText}</div>` : ''}
      ${linkCardHTML}
      <div class="flex items-center justify-end gap-1 mt-1 text-[11px] text-cgy-muted tabular-nums">
        <span>${msgObj.time}</span>
        ${isOut ? TG_SVG.doubleCheck() : ''}
      </div>
    </div>
  `;
  area.appendChild(wrapper);
  if (msgObj.voiceMessage) refreshIcons();
}

function scrollChatToBottom(smooth = true) {
  const area = document.getElementById('messages-area');
  if (!area) return;
  const doScroll = () => {
    area.scrollTo({ top: area.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  };
  requestAnimationFrame(() => {
    doScroll();
    // Повтор после окончательного пересчёта высоты панели ответов / иконок
    setTimeout(doScroll, 60);
  });
}

function setChatChoicesDisabled(placeholder) {
  document.getElementById('choices-hint').firstElementChild.textContent = placeholder;
  document.getElementById('choices-container').innerHTML = `<div class="py-2 text-center text-xs text-cgy-muted bg-cgy-bg rounded-lg border border-cgy-border">${placeholder}</div>`;
  scrollChatToBottom(false);
}

function renderChatChoices(sc, choices) {
  const box = document.getElementById('choices-container');
  document.getElementById('choices-hint').firstElementChild.textContent = t('chat_pick_reply');
  box.innerHTML = '';
  choices.forEach((ch, idx) => {
    const btn = document.createElement('button');
    btn.className = 'card-option w-full text-left px-3.5 py-2 rounded-lg text-sm font-medium leading-snug';
    btn.textContent = ch.text;
    btn.onclick = () => handleChatChoice(sc, ch, idx);
    box.appendChild(btn);
  });
  updateInlineSmsHint();
  refreshIcons();
  // Автопрокрутка ленты сообщений вниз после того как панель ответов раскрылась!
  scrollChatToBottom(true);
}

function renderCompletedChatChoices(sc) {
  const box = document.getElementById('choices-container');
  document.getElementById('choices-hint').firstElementChild.textContent = t('chat_done_choices');
  box.innerHTML = `
    <div class="flex flex-col sm:flex-row gap-2">
      <button onclick="openNextUnfinishedChat()" class="btn-3d flex-1 py-2 px-4 rounded-xl bg-cgy-accent hover:bg-cgy-accentHover border-b-[#133b72] text-white font-bold text-sm transition">
        ${t('chat_next_btn')}
      </button>
      <button onclick="restartCurrentScenario()" class="btn-3d py-2 px-4 rounded-xl bg-cgy-bg hover:bg-cgy-soft border-2 border-cgy-border text-cgy-text font-semibold text-sm transition">
        ${t('chat_replay_btn')}
      </button>
    </div>
  `;
  scrollChatToBottom(true);
}

function handleChatChoice(sc, choice, choiceIdx) {
  if (state.isTyping) return;
  const chatSt = getChatState(sc.id);
  const userMsg = { sender: 'user', stepKey: chatSt.stepKey, choiceIdx, text: choice.text, time: getCurrentTimeStr() };
  chatSt.messages.push(userMsg);
  saveState();
  appendMessageDOM(userMsg, true);
  SoundFX.playOutgoing();
  scrollChatToBottom();
  renderChatList();

  if (choice.fail) {
    setChatChoicesDisabled('Обработка...');
    const t = setTimeout(() => triggerFailScreen(choice.fail, sc.id), 300);
    state.typingTimers.push(t);
    return;
  }
  if (choice.win) {
    completeChatScenario(sc, choice.winReply);
    return;
  }
  if (choice.nextStep) playStep(sc, choice.nextStep);
}

function handleFakeLinkClick(failId) {
  const sc = getScenarioById(state.activeScenarioId);
  if (sc && state.chatCompleted.includes(sc.id) && state.replayingId !== sc.id) {
    showToast('Сценарий уже пройден — ссылка обезврежена', 'info');
    return;
  }
  const failData = window.__fakeLinkMap && window.__fakeLinkMap[failId];
  if (failData) {
    clearTypingTimers();
    triggerFailScreen(failData, sc ? sc.id : null);
  }
}

function triggerFailScreen(failData, scenarioId) {
  SoundFX.playFail();
  state.chatStats.mistakes += 1;
  if (scenarioId && !state.chatStats.failedScenarioIds.includes(scenarioId)) {
    state.chatStats.failedScenarioIds.push(scenarioId);
  }
  saveState();
  emitPortalEvent('chat_mistake', { scenarioId, totalMistakes: state.chatStats.mistakes });

  document.getElementById('fail-title').textContent = failData.title || 'ТЕБЯ РАЗВЕЛИ!';
  document.getElementById('fail-subtitle').textContent = failData.subtitle || 'Мошенник добился своего';
  document.getElementById('fail-reason').innerHTML = failData.reason;

  const urlBox = document.getElementById('fail-url-box');
  const urlDisplay = document.getElementById('fail-url-display');
  if (failData.urlParts && failData.urlParts.length) {
    urlBox.classList.remove('hidden');
    urlDisplay.innerHTML = failData.urlParts.map(p =>
      p.bad ? `<span class="bg-[#fdecec] text-cgy-err font-bold px-1 rounded border border-[#f5c2c2]">${p.text}</span>` : `<span>${p.text}</span>`
    ).join('');
  } else urlBox.classList.add('hidden');

  document.getElementById('fail-flags').innerHTML = (failData.flags || []).map(f => `
    <li class="flex items-start gap-2.5 bg-cgy-bg border border-cgy-border rounded-lg p-2.5">
      <i data-lucide="x-circle" class="w-4 h-4 text-cgy-err shrink-0 mt-0.5"></i>
      <span class="leading-relaxed">${f}</span>
    </li>
  `).join('');

  document.getElementById('fail-modal').classList.remove('hidden');
  refreshIcons();
}

function retryFromFail() {
  document.getElementById('fail-modal').classList.add('hidden');
  if (state.activeScenarioId) restartCurrentScenario();
}

function openReportModal() {
  const sc = getScenarioById(state.activeScenarioId);
  if (!sc || (state.chatCompleted.includes(sc.id) && state.replayingId !== sc.id)) return;
  if (sc.isLegit) {
    SoundFX.playFail();
    state.chatStats.falseAlarms += 1;
    saveState();
    document.getElementById('false-alarm-text').textContent = sc.falseAlarmReason || 'Это безопасный контакт.';
    document.getElementById('false-alarm-modal').classList.remove('hidden');
    refreshIcons();
    return;
  }
  document.getElementById('report-feedback').classList.add('hidden');
  document.getElementById('report-modal').classList.remove('hidden');
  refreshIcons();
}

function closeReportModal() { document.getElementById('report-modal').classList.add('hidden'); }
function closeFalseAlarmModal() { document.getElementById('false-alarm-modal').classList.add('hidden'); }

function submitReport(selectedType) {
  const sc = getScenarioById(state.activeScenarioId);
  if (!sc) return;
  const fb = document.getElementById('report-feedback');
  if (selectedType !== sc.reportType) {
    SoundFX.playFail();
    fb.textContent = 'Не совсем точно. Посмотри на переписку или профиль — какую именно схему использует контакт?';
    fb.classList.remove('hidden');
    return;
  }
  closeReportModal();
  clearTypingTimers();
  const chatSt = getChatState(sc.id);
  const sysMsg = { sender: 'system', sysKind: 'blocked', text: `Контакт «${sc.title}» заблокирован, жалоба отправлена` };
  chatSt.messages.push(sysMsg);
  appendMessageDOM(resolveChatMessage(sc, sysMsg), true);
  scrollChatToBottom();
  completeChatScenario(sc, 'Отличная реакция! Ты точно определил схему и заблокировал мошенника.');
}

function completeChatScenario(sc, customNote) {
  clearTypingTimers();
  state.replayingId = null;
  if (!state.chatCompleted.includes(sc.id)) state.chatCompleted.push(sc.id);

  const chatSt = getChatState(sc.id);
  const sysMsg = { sender: 'system', sysKind: 'done', text: `Сценарий пройден • ${sc.achievement.title}` };
  chatSt.messages.push(sysMsg);
  saveState();

  appendMessageDOM(resolveChatMessage(sc, sysMsg), true);
  scrollChatToBottom();
  updateAllProgressBadges();
  renderChatList();
  updateChatCompletedUI(sc, true);
  renderCompletedChatChoices(sc);

  SoundFX.playWin(2);
  burstConfetti('small');
  showFloatingXp('+150 XP', true);
  checkNewlyUnlockedAchievements();
  showToast(`Сценарий пройден: ${sc.achievement.title}`, 'success');

  document.getElementById('win-badge-icon').innerHTML = `<i data-lucide="${sc.achievement.icon || 'shield-check'}" class="w-7 h-7"></i>`;
  document.getElementById('win-badge-title').textContent = sc.achievement.title;
  document.getElementById('win-badge-desc').textContent = customNote || sc.achievement.desc;
  document.getElementById('win-lesson').textContent = sc.winLesson;

  emitPortalEvent('chat_completed', { scenarioId: sc.id, totalChatCompleted: state.chatCompleted.length });

  setTimeout(() => {
    document.getElementById('win-modal').classList.remove('hidden');
    refreshIcons();
  }, 260);
}

function handleWinNextChat() {
  document.getElementById('win-modal').classList.add('hidden');
  openNextUnfinishedChat();
}

function openNextUnfinishedChat() {
  const nextSc = getActiveGradeScenarios().find(s => !state.chatCompleted.includes(s.id));
  if (nextSc) selectScenarioById(nextSc.id);
  else switchMainTab('results');
}

function restartCurrentScenario() {
  const sc = getScenarioById(state.activeScenarioId);
  if (!sc) return;
  clearTypingTimers();
  state.replayingId = sc.id;
  state.chats[sc.id] = { stepKey: 'start', messages: [], started: true, stepDelivered: false, stepMessagesDeliveredCount: 0 };
  state.smsInbox = state.smsInbox.filter(m => m.scenarioId !== sc.id);
  saveState();
  updateSmsBadge();
  updateInlineSmsHint();
  renderChatList();
  document.getElementById('messages-area').innerHTML = `<div class="flex justify-center my-1"><span class="px-3 py-0.5 rounded-full bg-white/80 border border-[#d6e0ec] text-xs font-medium text-cgy-muted">Новое прохождение</span></div>`;
  updateChatCompletedUI(sc, false);
  playStep(sc, 'start');
}

// ==================== SMS, ПРОФИЛЬ КОНТАКТА И ЗВОНОК ====================

function deliverIncomingSms(scenarioId, smsData) {
  if (!smsData) return;
  const exists = state.smsInbox.find(m => m.id === smsData.id);
  let rec = exists;
  if (!exists) {
    rec = { id: smsData.id, scenarioId, sender: smsData.sender, tag: smsData.tag || 'SMS', text: smsData.text, time: getCurrentTimeStr(), read: false };
    state.smsInbox.unshift(rec);
  } else {
    rec.read = false;
    rec.time = getCurrentTimeStr();
  }
  saveState();
  SoundFX.playSms();
  updateSmsBadge();
  updateInlineSmsHint();
  const banner = document.getElementById('sms-push-banner');
  document.getElementById('sms-push-sender').textContent = rec.sender;
  document.getElementById('sms-push-preview').textContent = rec.text;
  banner.classList.remove('hidden');
  refreshIcons();
  if (state.smsBannerTimer) clearTimeout(state.smsBannerTimer);
  state.smsBannerTimer = setTimeout(() => banner.classList.add('hidden'), 7500);
}

function openSmsModalFromPush() {
  document.getElementById('sms-push-banner').classList.add('hidden');
  openSmsModal();
}

function updateSmsBadge() {
  const unread = state.smsInbox.filter(m => !m.read).length;
  const badge = document.getElementById('sms-unread-badge');
  badge.textContent = unread;
  badge.classList.toggle('hidden', unread === 0);
  badge.classList.toggle('flex', unread > 0);
}

function updateInlineSmsHint() {
  const btn = document.getElementById('btn-check-sms-inline');
  if (!btn) return;
  const has = state.smsInbox.some(m => m.scenarioId === state.activeScenarioId);
  btn.classList.toggle('hidden', !has);
  btn.classList.toggle('inline-flex', has);
}

function openSmsModal() {
  document.getElementById('sms-push-banner').classList.add('hidden');
  const list = document.getElementById('sms-list');
  list.innerHTML = '';
  state.smsInbox.forEach(m => { m.read = true; });
  saveState();
  updateSmsBadge();

  if (state.smsInbox.length === 0) {
    list.innerHTML = `<div class="py-10 text-center text-sm text-cgy-muted">${t('chat_no_sms')}</div>`;
  } else {
    state.smsInbox.forEach((sms, idx) => {
      // Подставляем локализованный текст SMS из текущего языка!
      let smsView = sms;
      const sc = sms.scenarioId ? getScenarioById(sms.scenarioId) : null;
      if (sc && sc.steps) {
        for (const st of Object.values(sc.steps)) {
          if (st.incomingSms && st.incomingSms.id === sms.id) {
            smsView = { ...sms, sender: st.incomingSms.sender, tag: st.incomingSms.tag, text: st.incomingSms.text };
            break;
          }
        }
      }
      const card = document.createElement('div');
      card.className = `rounded-xl p-3.5 border bg-white ${idx === 0 ? 'border-cgy-ok shadow-sm' : 'border-cgy-border'}`;
      card.innerHTML = `
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-2 min-w-0">
            <span class="font-bold text-sm text-cgy-text truncate">${smsView.sender}</span>
            <span class="px-2 py-0.5 rounded bg-cgy-soft text-[11px] text-cgy-accent font-semibold shrink-0">${smsView.tag}</span>
          </div>
          <span class="text-xs text-cgy-muted tabular-nums shrink-0">${smsView.time}</span>
        </div>
        <p class="text-sm text-cgy-text leading-relaxed select-text">${smsView.text}</p>
      `;
      list.appendChild(card);
    });
  }
  document.getElementById('sms-modal').classList.remove('hidden');
  refreshIcons();
}

function closeSmsModal() { document.getElementById('sms-modal').classList.add('hidden'); }

function openProfileModal() {
  const sc = getScenarioById(state.activeScenarioId);
  if (!sc) return;
  const av = document.getElementById('prof-avatar');
  av.style.backgroundColor = sc.avatarColor;
  av.textContent = sc.avatarText;
  document.getElementById('prof-name').textContent = sc.title;
  document.getElementById('prof-badge').innerHTML = renderBadgeHTML(sc.badgeType, false);
  const done = state.chatCompleted.includes(sc.id) && state.replayingId !== sc.id;
  document.getElementById('prof-status').textContent = (done && !sc.isLegit) ? 'заблокирован' : (sc.badgeType === 'bot' ? 'бот' : 'в сети');
  document.getElementById('prof-handle').textContent = sc.handle;
  document.getElementById('prof-bio').textContent = sc.profile.bio;
  document.getElementById('prof-meta').textContent = sc.profile.meta;
  const alertBox = document.getElementById('prof-badge-alert');
  if (sc.profile.badgeAlert) {
    alertBox.innerHTML = sc.profile.badgeAlert;
    alertBox.classList.remove('hidden');
  } else alertBox.classList.add('hidden');
  document.getElementById('prof-block-btn').classList.toggle('hidden', done);
  document.getElementById('profile-modal').classList.remove('hidden');
  refreshIcons();
}

function closeProfileModal() { document.getElementById('profile-modal').classList.add('hidden'); }

function startCallCheck() {
  const sc = getScenarioById(state.activeScenarioId);
  if (!sc) return;
  const av = document.getElementById('call-avatar-wrap');
  av.style.backgroundColor = sc.avatarColor;
  av.textContent = sc.avatarText;
  av.classList.add('call-ringing');
  document.getElementById('call-name').textContent = sc.title;
  document.getElementById('call-status').textContent = 'Вызов...';
  document.getElementById('call-status').className = 'text-sm text-cgy-accent mt-1 font-semibold';
  document.getElementById('call-result-box').classList.add('hidden');
  document.getElementById('call-btn-label').textContent = 'Отменить';
  document.getElementById('call-modal').classList.remove('hidden');
  refreshIcons();

  const b = sc.callBehavior || { canAnswer: false, statusText: 'Вызов отклонён', note: 'Собеседник не отвечает на звонки.' };
  if (state.callTimer) clearTimeout(state.callTimer);

  const finish = () => {
    av.classList.remove('call-ringing');
    const st = document.getElementById('call-status');
    st.textContent = b.statusText;
    st.className = b.canAnswer ? 'text-sm text-cgy-ok mt-1 font-bold' : 'text-sm text-cgy-err mt-1 font-bold';
    const rb = document.getElementById('call-result-box');
    rb.textContent = b.note;
    rb.classList.remove('hidden');
    document.getElementById('call-btn-label').textContent = 'Закрыть';
  };

  if (sc.badgeType === 'bot') { SoundFX.playBusyTone(); finish(); return; }
  SoundFX.playDialTone();
  state.callTimer = setTimeout(() => {
    if (b.canAnswer) SoundFX.playWin(); else SoundFX.playBusyTone();
    finish();
  }, 1400);
}

function closeCallModal() {
  if (state.callTimer) clearTimeout(state.callTimer);
  document.getElementById('call-modal').classList.add('hidden');
}

// ==================== АНАЛИТИКА С ГРАФИКАМИ, АЧИВКИ И СЕРТИФИКАТ ====================

function computeAchievements() {
  const cSum = getCardStatsSummary();
  const isCardOk = (id) => Boolean(state.cardResults[id] && state.cardResults[id].correct);
  const matchAndOrderCards = CARDS.filter(c => c.type === 'match' || c.type === 'order');
  const detectiveDone = matchAndOrderCards.length > 0 && matchAndOrderCards.every(c => isCardOk(c.id));

  return [
    {
      id: 'no_errors',
      icon: 'sparkles',
      title: { ru: 'Без ошибок', en: 'Flawless', kca: 'Ӑн тәса ӆыпи' },
      desc: { ru: 'Все кибер-карточки пройдены без единой ошибки', en: 'All cyber-cards solved with zero mistakes', kca: 'Иса кибер-карточкат ӑн тәса ӆыпи вєрӑн' },
      unlocked: cSum.answered === cSum.total && cSum.correct === cSum.total && cSum.totalErrors === 0
    },
    {
      id: 'password_master',
      icon: 'key-round',
      title: { ru: 'Мастер паролей', en: 'Password Master', kca: 'Пароль мастер' },
      desc: { ru: 'Верно выполнены задания про пароли и защиту от взлома', en: 'Solved password & account recovery tasks', kca: 'Пароль па аккаунт ӆавӑӆты вєрӑт тәса вєрӑн' },
      unlocked: isCardOk('card_password_tf') && isCardOk('card_hacked_order')
    },
    {
      id: 'detective',
      icon: 'search-check',
      title: { ru: 'Сыщик', en: 'Cyber Detective', kca: 'Вәтты хоят (Сыщик)' },
      desc: { ru: 'Все задания на сопоставление и порядок действий выполнены верно', en: 'All matching & action order cards solved correctly', kca: 'Кимӑӆтӑты па вєрӑт тӑхи карточкат иса тәса вєрӑн' },
      unlocked: detectiveDone
    },
    {
      id: 'privacy_guard',
      icon: 'shield-check',
      title: { ru: 'Хранитель данных', en: 'Privacy Guardian', kca: 'Нєм-хот ӆавӑӆты' },
      desc: { ru: 'Верно распределил личные данные в сортировке', en: 'Sorted personal data accurately', kca: 'Нєм па хот вєрӑт тәса пєӆӑкн пунӑн' },
      unlocked: isCardOk('card_personal_sort')
    },
    {
      id: 'anti_bullying',
      icon: 'heart-handshake',
      title: { ru: 'Анти-буллинг', en: 'Kind & Safe', kca: 'Ёмӑщ сӑм (Анти-буллинг)' },
      desc: { ru: 'Выбрал правильную реакцию на травлю в сети', en: 'Chose the right response to cyberbullying', kca: 'Ӑтӑм ясӑӊӑт эвӑӆт юрєн тәса нётӑн' },
      unlocked: isCardOk('card_bullying_choice')
    },
    {
      id: 'chat_agent',
      icon: 'messages-square',
      title: { ru: 'Агент мессенджера', en: 'Messenger Pro', kca: 'Потӑр мастер' },
      desc: { ru: 'Пройдено 3 или более диалогов в симуляторе чатов', en: 'Completed 3+ scenarios in the Chat Simulator', kca: 'Потӑр симуляторӑн 3 аӆпа аршӑк диалог вєрӑн' },
      unlocked: state.chatCompleted.length >= 3
    }
  ];
}

function getRankTitle() {
  const cSum = getCardStatsSummary();
  const chats = state.chatCompleted.length;
  if (cSum.pct === 100 && cSum.totalErrors === 0 && chats >= 3) {
    if (state.lang === 'en') return 'CyberShield Legend';
    if (state.lang === 'kca') return 'КиберЩит вән мастер';
    return 'Легенда КиберЩита';
  }
  if (cSum.pct >= 80) {
    if (state.lang === 'en') return 'Cyber Defender';
    if (state.lang === 'kca') return 'Кибер-ӆавӑӆты хоят';
    return 'Кибер-защитник';
  }
  if (cSum.answered >= 3) {
    if (state.lang === 'en') return 'Alert User';
    if (state.lang === 'kca') return 'Вәтты юзер';
    return 'Бдительный юзер';
  }
  if (state.lang === 'en') return 'Beginner';
  if (state.lang === 'kca') return 'Оӆӑӊ утӆты хоят';
  return 'Новичок';
}

function renderResultsDashboard() {
  const cSum = getCardStatsSummary();
  const activeSc = getActiveGradeScenarios();
  const chatDone = activeSc.filter(s => state.chatCompleted.includes(s.id)).length;
  const chatAcc = chatDone > 0
    ? Math.max(0, Math.round(((chatDone - activeSc.filter(s => state.chatStats.failedScenarioIds.includes(s.id)).length) / chatDone) * 100))
    : 100;

  document.getElementById('res-cards-score').textContent = `${cSum.correct} / ${cSum.total}`;
  document.getElementById('res-cards-pct').textContent = state.lang === 'en'
    ? `${cSum.pct}% correct`
    : (state.lang === 'kca' ? `${cSum.pct}% тәса` : `${cSum.pct}% верно`);
  document.getElementById('res-chats-score').textContent = `${chatDone} / ${activeSc.length}`;
  document.getElementById('res-chats-acc').textContent = state.lang === 'en'
    ? `First try: ${chatAcc}%`
    : (state.lang === 'kca' ? `Оӆӑӊ эвӑӆт: ${chatAcc}%` : `С 1-й попытки: ${chatAcc}%`);

  const lootEl = document.getElementById('res-loot-count');
  if (lootEl) lootEl.textContent = `${cSum.correct} / ${cSum.total}`;
  const errTotal = cSum.totalErrors + state.chatStats.mistakes;
  const errEl = document.getElementById('res-errors-sub');
  if (errEl) {
    errEl.textContent = state.lang === 'en'
      ? `Mistakes: ${errTotal}`
      : (state.lang === 'kca' ? `Ӑн тәса: ${errTotal}` : `Ошибок: ${errTotal}`);
  }
  document.getElementById('res-rank').textContent = getRankTitle();
  const streakSub = document.getElementById('res-streak-sub');
  if (streakSub) {
    streakSub.textContent = state.lang === 'en'
      ? `Win streak: ${state.streak || 0}`
      : (state.lang === 'kca' ? `Серия: ${state.streak || 0}` : `Серия побед: ${state.streak || 0}`);
  }

  // Рендерим ачивки
  const achGrid = document.getElementById('achievements-grid');
  const achs = computeAchievements();
  achGrid.innerHTML = achs.map(a => `
    <div class="rounded-xl p-3.5 border-2 flex items-start gap-3 ${
      a.unlocked ? 'bg-[#e9f6ec] border-cgy-ok' : 'bg-cgy-bg border-cgy-border opacity-75'
    }">
      <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
        a.unlocked ? 'bg-cgy-ok text-white' : 'bg-white border border-cgy-border text-cgy-muted'
      }">
        <i data-lucide="${a.unlocked ? a.icon : 'lock'}" class="w-5 h-5"></i>
      </div>
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-cgy-text">${L(a.title)}</span>
          <span class="text-[11px] font-bold ${a.unlocked ? 'text-cgy-ok' : 'text-cgy-muted'}">
            ${a.unlocked ? (state.lang === 'en' ? 'Unlocked' : (state.lang === 'kca' ? 'Вўсы' : 'Получено')) : (state.lang === 'en' ? 'Locked' : (state.lang === 'kca' ? 'Пӑнтӑм' : 'Закрыто'))}
          </span>
        </div>
        <p class="text-xs text-cgy-muted mt-0.5 leading-snug">${L(a.desc)}</p>
      </div>
    </div>
  `).join('');

  updateCertFormUI();
  drawTaskTypesChart();
  drawDynamicsChart();
  refreshIcons();
}

// График 1: Столбчатая диаграмма точности по типам заданий (Canvas)
function drawTaskTypesChart() {
  const canvas = document.getElementById('chart-task-types');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const types = ['choice', 'truefalse', 'sort', 'match', 'order'];
  const padL = 48, padR = 20, padT = 28, padB = 42;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  // Горизонтальная сетка 0 / 50 / 100%
  ctx.font = '11px -apple-system, Segoe UI, Arial, sans-serif';
  [0, 50, 100].forEach(val => {
    const y = padT + chartH - (val / 100) * chartH;
    ctx.strokeStyle = '#e5e9f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText(val + '%', padL - 8, y + 4);
  });

  const colW = chartW / types.length;
  const barW = Math.min(48, colW * 0.56);

  types.forEach((tp, i) => {
    const cardsOfType = CARDS.filter(c => c.type === tp);
    const total = cardsOfType.length;
    const answered = cardsOfType.filter(c => state.cardResults[c.id] && state.cardResults[c.id].answered).length;
    const correct = cardsOfType.filter(c => state.cardResults[c.id] && state.cardResults[c.id].correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;

    const cx = padL + i * colW + colW / 2;
    const bx = cx - barW / 2;
    const bh = Math.max(answered > 0 ? 6 : 4, (pct / 100) * chartH);
    const by = padT + chartH - bh;

    // Фон-трек столбца
    ctx.fillStyle = '#f1f5f9';
    roundRect(ctx, bx, padT, barW, chartH, 6);
    ctx.fill();

    // Активный столбец
    ctx.fillStyle = answered === 0 ? '#cbd5e1' : (pct >= 80 ? '#1e7e34' : (pct >= 50 ? '#1e5aa8' : '#c62828'));
    roundRect(ctx, bx, by, barW, bh, 6);
    ctx.fill();

    // Значение сверху
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 12px -apple-system, Segoe UI, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(answered === 0 ? '—' : `${pct}%`, cx, by - 6);

    // Подпись типа снизу
    ctx.fillStyle = '#475569';
    ctx.font = '11.5px -apple-system, Segoe UI, Arial, sans-serif';
    ctx.fillText(t('typesShort')[tp], cx, H - 18);
  });
}

// График 2: Линейный график динамики прохождений (Canvas)
function drawDynamicsChart() {
  const canvas = document.getElementById('chart-dynamics');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const cSum = getCardStatsSummary();
  const points = [...state.sessionHistory];
  // Всегда показываем текущую точку в реальном времени
  if (points.length === 0 || cSum.answered < cSum.total) {
    points.push({
      label: state.lang === 'en' ? 'Current' : (state.lang === 'kca' ? 'Ин' : 'Сейчас'),
      pct: cSum.answered > 0 ? Math.round((cSum.correct / cSum.answered) * 100) : 0
    });
  }
  // Чтобы линия наглядно рисовалась даже на первой попытке — добавим стартовую точку 0%
  const series = points.length === 1
    ? [{ label: state.lang === 'en' ? 'Start' : (state.lang === 'kca' ? 'Оӆӑӊ' : 'Старт'), pct: 0 }, points[0]]
    : points;

  const padL = 48, padR = 24, padT = 30, padB = 42;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  // Внутренний отступ по бокам внутри сетки, чтобы «Попытка 2» справа и «88%» слева никогда не обрезались и не наезжали на ось Y
  const innerPadX = 42;
  const plotW = Math.max(40, chartW - innerPadX * 2);

  ctx.font = '11px -apple-system, Segoe UI, Arial, sans-serif';
  [0, 50, 100].forEach(val => {
    const y = padT + chartH - (val / 100) * chartH;
    ctx.strokeStyle = '#e5e9f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText(val + '%', padL - 10, y + 4);
  });

  const coords = series.map((pt, i) => ({
    x: padL + innerPadX + (series.length === 1 ? plotW / 2 : (i / (series.length - 1)) * plotW),
    y: padT + chartH - (pt.pct / 100) * chartH,
    label: pt.label,
    pct: pt.pct
  }));

  // Мягкая заливка под графиком
  ctx.beginPath();
  ctx.moveTo(coords[0].x, padT + chartH);
  coords.forEach(c => ctx.lineTo(c.x, c.y));
  ctx.lineTo(coords[coords.length - 1].x, padT + chartH);
  ctx.closePath();
  ctx.fillStyle = 'rgba(30, 90, 168, 0.10)';
  ctx.fill();

  // Основная линия
  ctx.beginPath();
  coords.forEach((c, i) => (i === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y)));
  ctx.strokeStyle = '#1e5aa8';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Точки и подписи
  coords.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#1e5aa8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 11.5px -apple-system, Segoe UI, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(c.pct + '%', c.x, c.y - 10);

    ctx.fillStyle = '#475569';
    ctx.font = '11px -apple-system, Segoe UI, Arial, sans-serif';
    ctx.fillText(c.label, c.x, H - 18);
  });
}

// ==================== ВАЛИДАЦИЯ ФИО И СКАЧИВАНИЕ PNG-СЕРТИФИКАТА В СТИЛЕ ЦГЮ ====================

function validateFio(raw) {
  const cleaned = raw.trim().replace(/\s+/g, ' ');
  const parts = cleaned.split(' ').filter(Boolean);
  if (parts.length < 2) {
    return {
      valid: false,
      cleaned,
      message: state.lang === 'en'
        ? 'Enter at least First and Last Name separated by a space.'
        : 'Укажи минимум Фамилию и Имя через пробел (например: Иванов Андрей).'
    };
  }
  const wordRe = /^[\p{L}-]{2,}$/u;
  if (!parts.every(p => wordRe.test(p))) {
    return {
      valid: false,
      cleaned,
      message: state.lang === 'en'
        ? 'Use letters only (at least 2 letters per word).'
        : 'Используй только буквы без цифр и лишних символов (от 2 букв в слове).'
    };
  }
  return {
    valid: true,
    cleaned,
    message: state.lang === 'en'
      ? 'Ready! You can download your PNG certificate.'
      : 'Отлично! Сертификат готов к скачиванию.'
  };
}

function updateCertFormUI() {
  const inp = document.getElementById('cert-name-input');
  const btn = document.getElementById('btn-download-cert');
  const hint = document.getElementById('cert-name-hint');
  const validIcon = document.getElementById('cert-name-valid-icon');
  if (!inp || !btn) return;

  const res = validateFio(inp.value);
  if (res.valid) {
    btn.disabled = false;
    btn.className = 'sm:mb-[22px] py-3 px-6 rounded-lg font-bold text-sm sm:text-base transition flex items-center justify-center gap-2 shrink-0 bg-cgy-ok hover:opacity-95 text-white cursor-pointer shadow-sm';
    hint.textContent = res.message;
    hint.className = 'text-xs text-cgy-ok font-semibold mt-1.5';
    validIcon.classList.remove('hidden');
    inp.classList.remove('border-cgy-err');
    inp.classList.add('border-cgy-ok');
  } else {
    btn.disabled = true;
    btn.className = 'sm:mb-[22px] py-3 px-6 rounded-lg font-bold text-sm sm:text-base transition flex items-center justify-center gap-2 shrink-0 bg-slate-200 text-slate-400 cursor-not-allowed';
    hint.textContent = inp.value.trim().length > 0
      ? res.message
      : (state.lang === 'en'
        ? 'Enter First and Last Name to unlock PNG download.'
        : (state.lang === 'kca'
          ? 'PNG сертификат вўты пӑта Фамилия па Нєм хӑншэ.'
          : 'Укажи минимум Фамилию и Имя (через пробел), чтобы скачать PNG.'));
    hint.className = inp.value.trim().length > 0 ? 'text-xs text-[#b45309] font-medium mt-1.5' : 'text-xs text-cgy-muted mt-1.5';
    validIcon.classList.add('hidden');
    inp.classList.remove('border-cgy-ok');
  }
}

// Вспомогательная отрисовка звёздочки на Canvas
function drawCanvasStar(ctx, cx, cy, outerR, innerR, fillColor, strokeColor) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Рисуем пиксельного героя (Стива или Алекс) прямо на игровом дипломе!
function drawCertSteve(ctx, ox, oy, scale, stars) {
  const isAlex = state.heroSkin === 'alex';
  const px = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(ox + x * scale, oy + y * scale, w * scale, h * scale);
  };

  // Карточка-пьедестал под героем
  ctx.fillStyle = isAlex ? '#ecfdf5' : '#e6f2ff';
  ctx.strokeStyle = isAlex ? '#6ee7b7' : '#93c5fd';
  ctx.lineWidth = 3;
  roundRect(ctx, ox - 14, oy - 14, 96 * scale + 28, 96 * scale + 28, 22);
  ctx.fill();
  ctx.stroke();

  const skinM = isAlex ? '#f3cfb3' : '#c69272';
  const skinS = isAlex ? '#e2b796' : '#b37d5c';
  const skinD = isAlex ? '#c79774' : '#9c6a4d';
  const hairM = isAlex ? '#d96b27' : '#3b2715';
  const hairL = isAlex ? '#ea853a' : '#4a321b';
  const hairD = isAlex ? '#b55017' : '#2f1f10';

  // Тело и руки
  px(14, 60, 14, 36, isAlex ? '#4ade80' : '#00a8a8');
  px(14, 74, 14, 22, skinM);
  px(68, 60, 14, 36, isAlex ? '#22c55e' : '#008c8c');
  px(68, 74, 14, 22, skinS);
  px(28, 60, 40, 36, isAlex ? '#16a34a' : '#1e5aa8');
  px(62, 60, 6, 36, isAlex ? '#15803d' : '#164482');
  px(40, 60, 16, 6, skinS);
  px(44, 66, 8, 4, skinS);
  px(42, 74, 12, 12, '#ffffff');
  px(45, 77, 6, 6, isAlex ? '#1e5aa8' : '#1e7e34');

  // 3D тень головы
  px(72, 14, 6, 46, skinD);
  px(72, 14, 6, 14, hairD);
  // Голова + волосы
  px(24, 12, 48, 48, skinM);
  px(24, 48, 6, 12, skinS);
  px(66, 48, 6, 12, skinS);
  px(24, 12, 48, 12, hairM);
  px(24, 12, 48, 4, hairL);
  px(24, 24, 6, isAlex ? 14 : 6, hairD);
  px(66, 24, 6, isAlex ? 26 : 6, hairM);
  if (isAlex) {
    px(64, 50, 8, 18, hairD);
    px(66, 66, 6, 8, hairM);
  }

  // Радостные глаза и улыбка
  px(30, 33, 12, 4, '#2f1f10');
  px(32, 31, 8, 3, '#2f1f10');
  px(54, 33, 12, 4, '#2f1f10');
  px(56, 31, 8, 3, '#2f1f10');
  px(42, 39, 12, 4, '#9c6a4d');
  px(36, 44, 24, 4, '#ffffff');
  px(38, 48, 20, 4, '#c62828');

  // Фирменные тёмные пиксельные очки с синим бликом
  px(27, 32, 18, 10, '#0f172a');
  px(45, 34, 6, 3, '#0f172a');
  px(51, 32, 18, 10, '#0f172a');
  px(29, 34, 4, 3, '#38bdf8');
  px(33, 37, 3, 2, '#93c5fd');
  px(53, 34, 4, 3, '#38bdf8');
  px(57, 37, 3, 2, '#93c5fd');
  // Алмазный шлем при 6+ звёздах
  if (stars >= 6) {
    px(22, 8, 52, 14, '#22d3ee');
    px(22, 8, 52, 4, '#67e8f9');
    px(22, 22, 8, 12, '#06b6d4');
    px(66, 22, 8, 12, '#06b6d4');
    px(44, 22, 8, 10, '#06b6d4');
  }
  // Алмазный щит в руке
  px(6, 56, 20, 26, '#1e5aa8');
  px(9, 59, 14, 20, '#22d3ee');
  px(12, 63, 8, 12, '#ffffff');
  px(14, 67, 4, 4, '#1e7e34');
}

function downloadCertificatePNG() {
  const inp = document.getElementById('cert-name-input');
  const res = validateFio(inp ? inp.value : '');
  if (!res.valid) {
    if (inp) { inp.focus(); inp.classList.add('border-cgy-err'); }
    showToast(state.lang === 'en' ? 'Enter First and Last Name first' : 'Сначала введи Фамилию и Имя', 'warn');
    return;
  }

  const userName = res.cleaned;
  const cSum = getCardStatsSummary();
  const rank = getRankTitle();
  const isEn = state.lang === 'en';
  const isKca = state.lang === 'kca';

  const W = 1400, H = 940;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // 1. Светлый игровой фон дневного неба Югры (как на сайте!)
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#aad4ff');
  sky.addColorStop(0.55, '#dceeff');
  sky.addColorStop(1, '#c9f1df');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Пиксельное солнышко и воксельные облачка по углам
  ctx.fillStyle = 'rgba(253, 224, 71, 0.35)';
  ctx.fillRect(42, 34, 76, 76);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(56, 48, 48, 48);

  const drawCloud = (cx, cy, cw) => {
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.fillRect(cx, cy, cw, 28);
    ctx.fillRect(cx + cw * 0.2, cy - 12, cw * 0.55, 14);
  };
  drawCloud(190, 42, 120);
  drawCloud(1080, 36, 150);
  drawCloud(1230, 88, 110);

  // Кубические зелёные холмы и ёлочки Югры у самого низа
  for (let x = 0; x < W; x += 70) {
    const hh = 56 + Math.round(Math.sin(x * 0.01) * 18);
    ctx.fillStyle = '#9fe2bf';
    ctx.fillRect(x, H - hh, 72, hh);
    ctx.fillStyle = '#6ad19b';
    ctx.fillRect(x, H - hh, 72, 10);
  }
  const drawMiniTree = (tx, ty) => {
    ctx.fillStyle = '#8d5b34'; ctx.fillRect(tx - 6, ty - 24, 12, 24);
    ctx.fillStyle = '#1e7e34'; ctx.fillRect(tx - 26, ty - 42, 52, 20);
    ctx.fillStyle = '#22a046'; ctx.fillRect(tx - 18, ty - 58, 36, 18);
    ctx.fillStyle = '#4ade80'; ctx.fillRect(tx - 10, ty - 70, 20, 14);
  };
  drawMiniTree(58, H - 16);
  drawMiniTree(122, H - 12);
  drawMiniTree(W - 60, H - 16);
  drawMiniTree(W - 126, H - 12);

  // 2. Главная игровая карточка диплома (тёплый белый + объёмная тень + сине-золотая рамка)
  ctx.fillStyle = 'rgba(30, 90, 168, 0.16)';
  roundRect(ctx, 74, 78, W - 148, H - 144, 34);
  ctx.fill();

  ctx.fillStyle = '#fffef9';
  roundRect(ctx, 64, 64, W - 128, H - 138, 32);
  ctx.fill();
  ctx.strokeStyle = '#1e5aa8';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Внутренняя пунктирная золотая рамка приключения
  ctx.save();
  ctx.setLineDash([12, 8]);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  roundRect(ctx, 82, 82, W - 164, H - 174, 24);
  ctx.stroke();
  ctx.restore();

  // 4 цветных пиксельных самоцвета по углам диплома
  const drawGem = (gx, gy, c1, c2) => {
    ctx.fillStyle = c1; ctx.fillRect(gx, gy, 24, 24);
    ctx.fillStyle = c2; ctx.fillRect(gx + 5, gy + 5, 10, 10);
  };
  drawGem(98, 98, '#22d3ee', '#cffafe');
  drawGem(W - 122, 98, '#22c55e', '#dcfce7');
  drawGem(98, H - 132, '#f59e0b', '#fef08a');
  drawGem(W - 122, H - 132, '#60a5fa', '#dbeafe');

  // 3. Верхняя официальная лента-баннер «Цифровой гражданин Югры»
  const ribGrad = ctx.createLinearGradient(250, 0, W - 250, 0);
  ribGrad.addColorStop(0, '#1e5aa8');
  ribGrad.addColorStop(0.5, '#2563eb');
  ribGrad.addColorStop(1, '#1e5aa8');
  ctx.fillStyle = ribGrad;
  roundRect(ctx, 270, 98, W - 540, 56, 28);
  ctx.fill();
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 22px Rubik, Nunito, Segoe UI, Arial, sans-serif';
  const portalBannerText = isEn
    ? 'DIGITAL CITIZEN OF YUGRA  •  CYBER-CARDS'
    : (isKca ? 'ЮГРА ЦИФРОВОЙ ХОЯТ  •  КИБЕР-КАРТОЧКАТ' : 'ЦИФРОВОЙ ГРАЖДАНИН ЮГРЫ  •  КИБЕР-КАРТОЧКИ ЮГРЫ');
  ctx.fillText(portalBannerText, W / 2, 134);

  // 4. Заголовок «ДИПЛОМ КИБЕРГЕРОЯ»
  ctx.fillStyle = '#1e5aa8';
  ctx.font = '900 54px Rubik, Nunito, Segoe UI, Arial, sans-serif';
  const mainTitle = isEn ? 'CYBER-HERO DIPLOMA' : (isKca ? 'КИБЕРГЕРОЙ ДИПЛОМ' : 'ДИПЛОМ КИБЕРГЕРОЯ');
  ctx.fillText(mainTitle, W / 2, 224);

  // 5. Левая колонка: Пиксельный Кибер-Стив (ровно по центру без лишних табличек)
  drawCertSteve(ctx, 148, 300, 1.95, cSum.correct);

  // 6. Правая основная зона: Вручается + Имя героя + Класс + Звёзды!
  const rightCenterX = 835;
  ctx.fillStyle = '#5b6778';
  ctx.font = '700 22px Nunito, Segoe UI, Arial, sans-serif';
  ctx.fillText(
    isEn ? 'Awarded to:' : (isKca ? 'Утӆты хоят:' : 'Награждается:'),
    rightCenterX, 290
  );

  // Красивая именная табличка под ФИО
  ctx.fillStyle = '#eef5ff';
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 3;
  roundRect(ctx, 415, 310, 840, 84, 22);
  ctx.fill();
  ctx.stroke();

  const nameFontSize = userName.length > 30 ? 34 : (userName.length > 21 ? 40 : 46);
  ctx.fillStyle = '#1f2937';
  ctx.font = `800 ${nameFontSize}px Rubik, Nunito, Segoe UI, Arial, sans-serif`;
  ctx.fillText(userName, rightCenterX, 366);

  // Плашка класса + 8 золотых звёзд миссий
  ctx.fillStyle = '#fef3c7';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  roundRect(ctx, 415, 412, 165, 40, 20);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#92400e';
  ctx.font = '800 18px Nunito, Arial, sans-serif';
  ctx.fillText(`${t('grade_word')}: ${state.profile.gradeClass}`, 497, 438);

  // 8 звёзд (закрашенные золотые за верные карточки!)
  for (let s = 0; s < Math.min(8, cSum.total); s++) {
    const filled = s < cSum.correct;
    drawCanvasStar(
      ctx,
      628 + s * 52,
      432,
      19,
      8.5,
      filled ? '#fbbf24' : '#e2e8f0',
      filled ? '#b45309' : '#94a3b8'
    );
  }

  // 7. Три яркие цветные игровые карточки статистики
  const statCards = [
    {
      label: isEn ? 'CYBER-CARDS' : (isKca ? 'КАРТОЧКАТ' : 'КИБЕР-КАРТОЧКИ'),
      val: `${cSum.correct} / ${cSum.total} (${cSum.pct}%)`,
      bg: '#eaf3ff', brd: '#60a5fa', txt: '#1e5aa8'
    },
    {
      label: isEn ? 'SCAM CHATS' : (isKca ? 'ЧАТӐТ' : 'ЧАТЫ С МОШЕННИКАМИ'),
      val: `${state.chatCompleted.length} / ${SCENARIOS.length}`,
      bg: '#e9f6ec', brd: '#4ade80', txt: '#15803d'
    },
    {
      label: isEn ? 'HERO RANK' : (isKca ? 'РАНГ' : 'ТВОЙ РАНГ'),
      val: rank,
      bg: '#fef7e0', brd: '#f59e0b', txt: '#b45309'
    }
  ];

  statCards.forEach((sc, i) => {
    const sx = 415 + i * 288;
    const sy = 478;
    ctx.fillStyle = sc.bg;
    ctx.strokeStyle = sc.brd;
    ctx.lineWidth = 3;
    roundRect(ctx, sx, sy, 264, 98, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#5b6778';
    ctx.font = '800 14px Nunito, Arial, sans-serif';
    ctx.fillText(sc.label, sx + 132, sy + 32);

    ctx.fillStyle = sc.txt;
    ctx.font = sc.val.length > 16 ? '800 20px Rubik, Nunito, Arial, sans-serif' : '800 25px Rubik, Nunito, Arial, sans-serif';
    ctx.fillText(sc.val, sx + 132, sy + 72);
  });

  // 8. Полоса собранных трофеев (реальные пиксельные иконки предметов, а не просто квадратики!)
  ctx.fillStyle = '#e8f1fc';
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 2.5;
  roundRect(ctx, 134, 616, 860, 114, 22);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#1e5aa8';
  ctx.font = '800 17px Rubik, Nunito, Arial, sans-serif';
  ctx.fillText(
    isEn ? 'COLLECTED TROPHIES:' : (isKca ? 'ӐКӐТӐМ ТРОФЕЙӐТ:' : 'СОБРАННЫЕ ТРОФЕИ:'),
    160, 648
  );

  // Рисуем узнаваемую пиксельную иконку трофея в слоте (сетка 16x16, масштаб 2.4)
  const drawMiniLoot = (icon, ox, oy) => {
    const p = (x, y, w, h, c) => {
      ctx.fillStyle = c;
      ctx.fillRect(ox + x * 2.4, oy + y * 2.4, w * 2.4, h * 2.4);
    };
    if (icon === 'shield') {
      p(3, 2, 10, 10, '#22d3ee'); p(4, 12, 8, 2, '#06b6d4'); p(6, 14, 4, 1, '#0891b2'); p(5, 4, 6, 6, '#1e5aa8'); p(7, 6, 2, 2, '#ffffff');
    } else if (icon === 'key') {
      p(2, 4, 6, 6, '#38bdf8'); p(4, 6, 2, 2, '#ffffff'); p(8, 6, 6, 2, '#0284c7'); p(10, 8, 2, 3, '#0284c7'); p(13, 8, 1, 2, '#38bdf8');
    } else if (icon === 'chest') {
      p(2, 3, 12, 10, '#b45309'); p(2, 3, 12, 4, '#d97706'); p(2, 7, 12, 1, '#451a03'); p(7, 6, 2, 3, '#fde047');
    } else if (icon === 'heart') {
      p(3, 4, 4, 4, '#ef4444'); p(9, 4, 4, 4, '#ef4444'); p(2, 6, 12, 3, '#dc2626'); p(4, 9, 8, 2, '#dc2626'); p(6, 11, 4, 2, '#b91c1c'); p(4, 5, 2, 2, '#fca5a5');
    } else if (icon === 'spyglass') {
      p(9, 2, 5, 5, '#38bdf8'); p(10, 3, 2, 2, '#e0f2fe'); p(6, 6, 4, 4, '#d97706'); p(3, 9, 4, 4, '#92400e'); p(2, 12, 2, 2, '#78350f');
    } else if (icon === 'armor') {
      p(2, 3, 4, 5, '#22d3ee'); p(10, 3, 4, 5, '#22d3ee'); p(4, 4, 8, 9, '#06b6d4'); p(6, 3, 4, 2, '#ffffff'); p(6, 7, 4, 4, '#1e5aa8');
    } else if (icon === 'book') {
      p(3, 2, 10, 12, '#7c3aed'); p(5, 3, 7, 10, '#a78bfa'); p(4, 4, 1, 8, '#fde047'); p(7, 5, 4, 2, '#fef08a');
    } else {
      p(6, 2, 4, 2, '#4ade80'); p(4, 4, 8, 8, '#16a34a'); p(6, 12, 4, 2, '#15803d'); p(6, 5, 3, 4, '#86efac');
    }
  };

  CARDS.slice(0, 8).forEach((card, idx) => {
    const unlocked = Boolean(state.cardResults[card.id] && state.cardResults[card.id].correct);
    const lx = 160 + idx * 102;
    const ly = 662;
    ctx.fillStyle = unlocked ? '#ffffff' : '#dbe7f5';
    ctx.strokeStyle = unlocked ? '#f59e0b' : '#b6cce6';
    ctx.lineWidth = unlocked ? 3 : 2;
    roundRect(ctx, lx, ly, 86, 52, 12);
    ctx.fill();
    ctx.stroke();

    if (unlocked) {
      const iconKey = (card.loot && card.loot.icon) || 'emerald';
      drawMiniLoot(iconKey, lx + 24, ly + 7);
    } else {
      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.font = '800 22px Rubik, Arial, sans-serif';
      ctx.fillText('?', lx + 43, ly + 34);
      ctx.textAlign = 'left';
    }
  });

  // 9. Аккуратная золотая печать-значок справа внизу (весь текст строго внутри круга!)
  ctx.save();
  ctx.translate(1152, 676);
  ctx.rotate(-0.12);
  ctx.beginPath();
  ctx.arc(0, 0, 74, 0, Math.PI * 2);
  ctx.fillStyle = '#fef3c7';
  ctx.fill();
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 62, 0, Math.PI * 2);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();
  drawCanvasStar(ctx, 0, -28, 13, 6, '#f59e0b', '#b45309');
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1e5aa8';
  ctx.font = '800 14px Rubik, Arial, sans-serif';
  ctx.fillText(isEn ? 'DIGITAL' : 'ЦИФРОВОЙ', 0, 4);
  ctx.fillText(isEn ? 'CITIZEN' : 'ГРАЖДАНИН', 0, 22);
  ctx.fillStyle = '#15803d';
  ctx.font = '800 13px Nunito, Arial, sans-serif';
  ctx.fillText(isEn ? 'YUGRA 2026' : 'ЮГРА • 2026', 0, 43);
  ctx.restore();

  // 10. Аккуратная дата и номер в самом низу диплома
  const dateStr = new Date().toLocaleDateString(isEn ? 'en-US' : 'ru-RU');
  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '700 16px Nunito, Segoe UI, Arial, sans-serif';
  ctx.fillText(`${dateStr}   •   ${state.certId}   •   Цифровой гражданин Югры`, W / 2, 804);

  const link = document.createElement('a');
  link.download = `Diplom_Kibergeroja_Yugry_${userName.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  emitPortalEvent('certificate_downloaded', {
    fio: userName,
    gradeClass: state.profile.gradeClass,
    cardsCorrect: cSum.correct,
    cardsTotal: cSum.total,
    cardsPct: cSum.pct,
    chatsCompleted: state.chatCompleted.length,
    rank,
    certId: state.certId
  });

  SoundFX.playAchievement();
  burstConfetti('big');
  showToast(isEn ? 'Cyber-Hero Diploma saved as PNG!' : 'Диплом кибергероя сохранён в PNG!', 'success');
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ==================== УТИЛИТЫ ====================

function toggleSound() {
  state.soundOn = !state.soundOn;
  SoundFX.setEnabled(state.soundOn);
  if (!state.soundOn) stopReadAloud();
  saveState();
  updateSoundIcon();
  if (state.soundOn) SoundFX.playOutgoing();
  showToast(state.soundOn ? 'Звук включён' : 'Звук выключен', 'info');
}

function updateSoundIcon() {
  document.getElementById('sound-icon-on').classList.toggle('hidden', !state.soundOn);
  document.getElementById('sound-icon-off').classList.toggle('hidden', state.soundOn);
}

let resetConfirmArmed = false;
let resetConfirmTimer = null;

function confirmFullReset() {
  const btn = document.getElementById('btn-reset-all');
  const lbl = document.getElementById('btn-reset-all-label');
  if (!resetConfirmArmed) {
    resetConfirmArmed = true;
    if (btn) btn.classList.add('bg-[#fdecec]', 'text-cgy-err', 'border', 'border-[#f5c2c2]');
    if (lbl) lbl.textContent = state.lang === 'en' ? 'Click again to reset' : 'Точно сбросить? Нажми ещё раз';
    if (resetConfirmTimer) clearTimeout(resetConfirmTimer);
    resetConfirmTimer = setTimeout(() => {
      resetConfirmArmed = false;
      if (btn) btn.classList.remove('bg-[#fdecec]', 'text-cgy-err', 'border', 'border-[#f5c2c2]');
      if (lbl) lbl.textContent = t('btn_reset_all');
    }, 3500);
    return;
  }
  resetConfirmArmed = false;
  if (resetConfirmTimer) clearTimeout(resetConfirmTimer);
  if (btn) btn.classList.remove('bg-[#fdecec]', 'text-cgy-err', 'border', 'border-[#f5c2c2]');
  if (lbl) lbl.textContent = t('btn_reset_all');

  clearTypingTimers();
  stopReadAloud();
  state.cardResults = {};
  state.cardDraft = {};
  state.adaptiveLevel = state.profile.gradeClass === '8-11' ? 3 : 1;
  state.supportMode = state.profile.gradeClass === '1-4';
  state.streak = 0;
  state.unlockedAchIds = [];
  state.sessionHistory = [];
  state.chatCompleted = [];
  state.chats = {};
  state.smsInbox = [];
  state.chatStats = { mistakes: 0, falseAlarms: 0, failedScenarioIds: [] };
  state.activeScenarioId = null;
  state.currentCardId = CARDS[0].id;
  saveState();
  updateSmsBadge();
  updateAllProgressBadges();
  renderCurrentCard();
  renderChatList();
  renderResultsDashboard();
  document.getElementById('active-chat').classList.add('hidden');
  document.getElementById('chat-empty-state').classList.remove('hidden');
  showToast(state.lang === 'en' ? 'Progress reset' : 'Весь прогресс сброшен', 'info');
}

function showToast(text, type = 'info', duration = 2600) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  let style = 'bg-[#1f2937] text-white border-[#374151]';
  if (type === 'success') style = 'bg-cgy-ok text-white border-[#155d27]';
  if (type === 'warn') style = 'bg-[#b45309] text-white border-[#92400e]';
  el.className = `toast-enter px-4 py-2.5 rounded-lg border shadow-lg text-xs sm:text-sm font-semibold text-center ${style}`;
  el.textContent = text;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.2s ease';
    setTimeout(() => el.remove(), 220);
  }, duration);
}


// ==================== ВИЗУАЛЬНЫЕ ЭФФЕКТЫ (КОНФЕТТИ, +XP, УВЕДОМЛЕНИЯ ОБ АЧИВКАХ) ====================

function checkNewlyUnlockedAchievements() {
  const achs = computeAchievements();
  const newly = achs.filter(a => a.unlocked && !state.unlockedAchIds.includes(a.id));
  if (newly.length === 0) return;

  newly.forEach((a, idx) => {
    state.unlockedAchIds.push(a.id);
    setTimeout(() => {
      SoundFX.playAchievement();
      burstConfetti('big');
      const prefix = state.lang === 'en' ? 'Achievement unlocked' : (state.lang === 'kca' ? 'Ачивка вўсы' : 'Новая ачивка');
      showToast(`${prefix}: ${L(a.title)}`, 'success', 3400);
    }, 450 + idx * 550);
  });
  saveState();
}

function showFloatingXp(label, isPositive = true) {
  const layer = document.getElementById('fx-xp-layer');
  if (!layer) return;
  const el = document.createElement('div');
  el.className = `xp-float fixed left-1/2 top-[38%] px-4 py-1.5 rounded-full font-extrabold text-sm sm:text-base shadow-lg border ${
    isPositive
      ? 'bg-[#e9f6ec] text-cgy-ok border-cgy-ok'
      : 'bg-[#fdecec] text-cgy-err border-cgy-err'
  }`;
  el.textContent = label;
  layer.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

let confettiAnimId = null;
function burstConfetti(intensity = 'small') {
  const canvas = document.getElementById('fx-confetti');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

  const count = intensity === 'big' ? 95 : 38;
  const colors = ['#1e5aa8', '#1e7e34', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'];
  const cx = canvas.width / 2;
  const cy = intensity === 'big' ? canvas.height * 0.28 : canvas.height * 0.45;

  const pieces = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = (intensity === 'big' ? 4 : 3) + Math.random() * (intensity === 'big' ? 8 : 5);
    return {
      x: cx + (Math.random() - 0.5) * 120,
      y: cy + (Math.random() - 0.5) * 40,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (intensity === 'big' ? 5 : 3.5),
      size: 5 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 12,
      alpha: 1
    };
  });

  let frame = 0;
  const maxFrames = intensity === 'big' ? 125 : 70;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.24; // gravity
      p.vx *= 0.985;
      p.rot += p.vrot;
      if (frame > maxFrames * 0.65) {
        p.alpha = Math.max(0, p.alpha - 0.045);
      }
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
      ctx.restore();
    });
    frame++;
    if (frame < maxFrames) {
      confettiAnimId = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiAnimId = null;
    }
  }
  draw();
}

// ==================== БЛИЦ-АТАКА 60 СЕКУНД («ОТБЕЙ СКАМЕРОВ!») ====================

const BLITZ_POOL = [
  { safe: false, color: '#c97b2b', av: 'AP', sender: 'Admin_Pro99', tag: { ru: 'Игровой чат', en: 'Game Chat', kca: 'Юнт чат' }, text: { ru: 'Дарова! Выдаю бесплатную админку — скинь логин и пароль на 2 минуты!', en: 'Hey! Free admin rights — send your login and password for 2 mins!', kca: 'Вух ӆыпи админка мӑӆум — логин па пароль китэ!' }, why: { ru: 'Админ никогда не просит пароль!', en: 'Admins never ask for passwords!', kca: 'Админ пароль ӑн вохӆ!' } },
  { safe: true,  color: '#4c8c5c', av: 'МА', sender: 'Мама', tag: { ru: 'Семья', en: 'Family', kca: 'Хот' }, text: { ru: 'Привет! Купи хлеба по дороге домой, деньги я оставила на столе.', en: 'Hi! Grab some bread on your way home, I left cash on the table.', kca: 'Вўща! Хот юшӑн нянь вўэ, вух пасан эӆты хӑщсум.' }, why: { ru: 'Обычная просьба мамы без кодов и ссылок.', en: 'Normal family message with no red flags.', kca: 'Ёмӑщ хот потӑр!' } },
  { safe: false, color: '#dc2626', av: 'ГУ', sender: 'Госуслуги_Бот', tag: { ru: 'Неизвестный бот', en: 'Unknown Bot', kca: 'Бот' }, text: { ru: 'СРОЧНО! Вас взломали! Пришлите 6-значный код из СМС прямо сюда за 60 секунд!', en: 'URGENT! Hacked! Send your 6-digit SMS code right here within 60 seconds!', kca: 'ЩИМӐЩ! 60 секундайн SMS-код тӑта хӑншэ!' }, why: { ru: 'Госуслуги не пишут ботами и не просят СМС-коды!', en: 'Official agencies never ask for SMS codes in chat!', kca: 'Госуслуги SMS-код ӑн вохӆ!' } },
  { safe: true,  color: '#1e5aa8', av: '6Б', sender: 'Артём (6Б)', tag: { ru: 'Одноклассник', en: 'Classmate', kca: 'Юр' }, text: { ru: 'Го сегодня в 18:00 в Майнкрафт на нашем сервере? Построим замок!', en: 'Wanna play Minecraft on our server at 6 PM? Let’s build a castle!', kca: '18:00 Майнкрафт юнтӆўв?' }, why: { ru: 'Обычное приглашение поиграть без паролей и денег.', en: 'Just a friendly game invite — totally safe!', kca: 'Ёмӑщ юнт потӑр!' } },
  { safe: false, color: '#a84b7a', av: 'ВЛ', sender: 'Вика_Приз_VIP', tag: { ru: 'Фейк-блогер', en: 'Fake Blogger', kca: 'Блогер' }, text: { ru: 'Ты выиграл iPhone 16! Оплати 490 ₽ за доставку по ссылке cdek-priz86.ru!', en: 'You won an iPhone 16! Pay $5 delivery fee at cdek-priz86.ru!', kca: 'iPhone вўсэн! Доставка пӑта 490 ₽ китэ!' }, why: { ru: 'За настоящий приз никогда не просят платить!', en: 'Real prizes never charge a delivery fee!', kca: 'Приз пӑта вух ӑн вохӆӑт!' } },
  { safe: false, color: '#6d5cae', av: 'ЕВ', sender: 'Завуч (новый акк)', tag: { ru: 'Создан вчера', en: 'Created yesterday', kca: 'Хӑӆєвӑт вєрсы' }, text: { ru: 'В школе секретная проверка! Никому не говори, даже родителям, и перейди по ссылке!', en: 'Secret school inspection! Tell nobody, not even parents, and click this link!', kca: 'Тайной проверка! Аӊки-ащийн ӑн ястӑэ па ссылкайн ӆәӊэ!' }, why: { ru: 'Запрет рассказывать родителям — 100% мошенник!', en: 'Forbidding you to tell parents is 100% a scam!', kca: 'Аӊки-ащийн ӑн мӑты — мошенник!' } },
  { safe: true,  color: '#0d9488', av: 'УЧ', sender: 'Ольга Ивановна', tag: { ru: 'Общий чат класса', en: 'Class Group', kca: 'Класс чат' }, text: { ru: 'Ребята, напоминаю: завтра первый урок начинается в 8:30, принесите тетради.', en: 'Kids, reminder: first class starts at 8:30 tomorrow, bring your notebooks.', kca: 'Хӑӆєвӑт 8:30 урок, тетрадьӑт тәты.' }, why: { ru: 'Обычное объявление учителя в общем чате класса.', en: 'Normal teacher announcement in the class group.', kca: 'Тәса ӑшкола нєпек.' } },
  { safe: false, color: '#2e8b6a', av: 'Р86', sender: 'Работа 86', tag: { ru: 'Скрытый номер', en: 'Hidden Number', kca: 'Ӑн вәтӑм' }, text: { ru: 'Лёгкие 5000 ₽ в день! Просто принимай чужие переводы на свою карту и переводи дальше.', en: 'Easy $50/day! Just receive strangers’ transfers on your card and forward them.', kca: '5000 ₽ хӑтӆӑн! Йиӆуп вух картайн вўэ па єӆӆы китэ.' }, why: { ru: 'Это дропперство — уголовная ответственность и блокировка карт!', en: 'That is illegal money muling (dropper scam)!', kca: 'Щит дропперство — закон эвӑӆт ӑн рӑхӆ!' } },
  { safe: false, color: '#3b82b6', av: 'МК', sender: 'Макс (взломан?)', tag: { ru: 'Личка', en: 'DM', kca: 'Чат' }, text: { ru: 'Бро срочно скинь 1500 ₽ на карту моего кента Руслана, звонить не могу!', en: 'Bro urgently send 1500 ₽ to my buddy’s card, can’t pick up calls!', kca: 'Щимӑщ 1500 ₽ йиӆуп хоят картайн китэ, телефон ӑн вўӆум!' }, why: { ru: 'Деньги на чужую карту без звонка — аккаунт друга взломали!', en: 'Sending money to a stranger’s card without calling = hacked friend!', kca: 'Йиӆуп карта — взлом!' } },
  { safe: true,  color: '#2563eb', av: 'ДР', sender: 'Саша', tag: { ru: 'Друг', en: 'Friend', kca: 'Юр' }, text: { ru: 'Скинь пожалуйста фотку домашнего задания по математике, я страницу забыл!', en: 'Could you send a photo of the math homework? I forgot the page number!', kca: 'Математика дз фото китэ пж!' }, why: { ru: 'Просьба скинуть домашку — полностью безопасно.', en: 'Asking for math homework — completely safe!', kca: 'Ёмӑщ потӑр!' } },
  { safe: false, color: '#b45309', av: 'АВ', sender: 'Продавец куртки', tag: { ru: 'Объявление', en: 'Marketplace', kca: 'Тыныты хоят' }, text: { ru: 'Чтобы получить оплату, перейди по ссылке avito-oplata-free.ru и введи 3 цифры с оборота карты!', en: 'To receive payment, open avito-oplata-free.ru and enter the 3 digits on the back of your card!', kca: 'Вух вўты пӑта avito-oplata-free.ru ссылкайн карта юпи 3 цифра хӑншэ!' }, why: { ru: 'Для получения денег никогда не нужны 3 цифры CVV и левая ссылка!', en: 'You NEVER enter CVV digits on an external link to receive money!', kca: 'CVV па левой ссылка — кража!' } },
  { safe: true,  color: '#7c3aed', av: 'ТР', sender: 'Тренер секции', tag: { ru: 'Чат футбола', en: 'Soccer Chat', kca: 'Спорт чат' }, text: { ru: 'В субботу тренировка переносится в малый зал на 11:00. Возьмите воду и сменку.', en: 'Saturday practice moves to the small gym at 11 AM. Bring water and sneakers.', kca: 'Субботайн тренировка 11:00 вәӆӆ.' }, why: { ru: 'Обычное сообщение от тренера без ссылок и просьб о деньгах.', en: 'Regular coach update — totally safe.', kca: 'Тәса нєпек!' } },
  { safe: false, color: '#0891b2', av: 'КН', sender: 'Конкурс Талантов', tag: { ru: 'Голосование', en: 'Contest', kca: 'Конкурс' }, text: { ru: 'Проголосуй за мою племянницу! Введи свой номер и код из СМС от Telegram на сайте!', en: 'Vote for my niece! Enter your phone and Telegram SMS code on the site!', kca: 'Голосование пӑта Telegram SMS-код хӑншэ!' }, why: { ru: 'Код от Telegram на чужом сайте = мгновенный угон аккаунта!', en: 'Typing a Telegram SMS code on a contest site steals your account!', kca: 'Telegram SMS-код хӑншты ӑн рӑхӆ!' } },
  { safe: true,  color: '#16a34a', av: 'ПА', sender: 'Папа', tag: { ru: 'Семья', en: 'Family', kca: 'Хот' }, text: { ru: 'Я подъехал к школе, стою у главных ворот. Выходи, как закончишь!', en: 'I’m parked by the main school gate. Come out when you’re done!', kca: 'Ӑшкола хося юхӑтсум, єӆӆы ким этэ!' }, why: { ru: 'Обычное сообщение от папы — никаких признаков обмана.', en: 'Normal message from Dad — totally safe.', kca: 'Ёмӑщ хот потӑр!' } }
];

let blitzState = {
  running: false,
  timeLeft: 60,
  hearts: 3,
  score: 0,
  combo: 0,
  correct: 0,
  total: 0,
  queue: [],
  current: null,
  timerId: null
};

function stopBlitzTimerOnly() {
  if (blitzState.timerId) {
    clearInterval(blitzState.timerId);
    blitzState.timerId = null;
  }
  blitzState.running = false;
}

function updateBlitzStartUI() {
  const bestEl = document.getElementById('blitz-start-best');
  const badgeEl = document.getElementById('badge-blitz-best');
  if (bestEl) bestEl.textContent = state.blitzBest || 0;
  if (badgeEl) badgeEl.textContent = state.blitzBest > 0 ? `★ ${state.blitzBest}` : '60с';
}

function shuffleBlitzQueue() {
  const arr = [...BLITZ_POOL];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startBlitzGame() {
  stopBlitzTimerOnly();
  blitzState = {
    running: true,
    timeLeft: 60,
    hearts: 3,
    score: 0,
    combo: 0,
    correct: 0,
    total: 0,
    queue: shuffleBlitzQueue(),
    current: null,
    timerId: null
  };

  document.getElementById('blitz-start').classList.add('hidden');
  document.getElementById('blitz-end').classList.add('hidden');
  document.getElementById('blitz-arena').classList.remove('hidden');
  document.getElementById('blitz-last-fb').classList.add('hidden');

  SoundFX.playConnect();
  nextBlitzCard();
  updateBlitzHud();

  blitzState.timerId = setInterval(() => {
    blitzState.timeLeft -= 1;
    updateBlitzHud();
    if (blitzState.timeLeft <= 0) {
      finishBlitzGame(false);
    }
  }, 1000);
}

function nextBlitzCard() {
  if (!blitzState.queue.length) blitzState.queue = shuffleBlitzQueue();
  blitzState.current = blitzState.queue.pop();
  const c = blitzState.current;

  const av = document.getElementById('blitz-sender-av');
  if (av) { av.style.backgroundColor = c.color; av.textContent = c.av; }
  document.getElementById('blitz-sender-name').textContent = c.sender;
  document.getElementById('blitz-sender-tag').textContent = L(c.tag);
  document.getElementById('blitz-msg-text').textContent = L(c.text);
  document.getElementById('blitz-counter').textContent = `#${blitzState.total + 1}`;

  const cardEl = document.getElementById('blitz-card');
  if (cardEl) {
    cardEl.classList.remove('card-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('card-enter');
  }
  refreshIcons();
}

function updateBlitzHud() {
  const tEl = document.getElementById('blitz-timer-text');
  const bar = document.getElementById('blitz-timer-bar');
  const heartsEl = document.getElementById('blitz-hearts');
  const scoreEl = document.getElementById('blitz-score-text');
  const comboEl = document.getElementById('blitz-combo-pill');

  if (tEl) tEl.textContent = `${blitzState.timeLeft}с`;
  if (bar) bar.style.width = `${Math.max(0, (blitzState.timeLeft / 60) * 100)}%`;
  if (scoreEl) scoreEl.textContent = blitzState.score;
  const mult = Math.min(4, 1 + Math.floor(blitzState.combo / 3));
  if (comboEl) comboEl.textContent = `x${mult}`;
  if (heartsEl) {
    heartsEl.innerHTML = [0, 1, 2].map(i =>
      `<span class="${i < blitzState.hearts ? 'text-[#ef4444]' : 'text-slate-300'}">❤</span>`
    ).join('');
  }
}

function answerBlitz(pickedSafe) {
  if (!blitzState.running || !blitzState.current) return;
  const c = blitzState.current;
  const isOk = pickedSafe === c.safe;
  blitzState.total += 1;

  const fb = document.getElementById('blitz-last-fb');
  fb.classList.remove('hidden');

  if (isOk) {
    blitzState.correct += 1;
    blitzState.combo += 1;
    const mult = Math.min(4, 1 + Math.floor((blitzState.combo - 1) / 3));
    const gain = 25 * mult;
    blitzState.score += gain;
    SoundFX.playWin(Math.min(5, blitzState.combo));
    fb.className = 'rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold border-2 bg-[#ecfdf5] border-[#86efac] text-[#14532d]';
    fb.textContent = `+${gain} XP! ${L(c.why)}`;
    if (blitzState.combo % 4 === 0) updateMascot('happy', `${blitzState.combo} подряд! Так держать!`, true);
  } else {
    blitzState.combo = 0;
    blitzState.hearts -= 1;
    SoundFX.playFail();
    fb.className = 'rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold border-2 bg-[#fdecec] border-[#fca5a5] text-[#7f1d1d]';
    fb.textContent = `Ой! ${L(c.why)}`;
    updateMascot('oops', L(c.why), true);
  }

  updateBlitzHud();
  if (blitzState.hearts <= 0) {
    finishBlitzGame(true);
  } else {
    nextBlitzCard();
  }
}

function finishBlitzGame(outOfHearts) {
  stopBlitzTimerOnly();
  document.getElementById('blitz-arena').classList.add('hidden');
  document.getElementById('blitz-end').classList.remove('hidden');

  const isNewRecord = blitzState.score > (state.blitzBest || 0);
  if (isNewRecord) {
    state.blitzBest = blitzState.score;
    saveState();
  }
  updateBlitzStartUI();

  const isEn = state.lang === 'en';
  document.getElementById('blitz-end-title').textContent = outOfHearts
    ? (isEn ? 'Out of Hearts!' : 'Сердечки закончились!')
    : (isEn ? 'Time’s Up! Great Run!' : 'Время вышло! Крутой результат!');
  document.getElementById('blitz-end-score').textContent = blitzState.score;
  document.getElementById('blitz-end-acc').textContent = `${blitzState.correct}/${blitzState.total}`;
  document.getElementById('blitz-end-best').textContent = state.blitzBest;
  document.getElementById('blitz-new-record').classList.toggle('hidden', !isNewRecord);

  if (blitzState.score >= 100 || isNewRecord) {
    SoundFX.playAchievement();
    burstConfetti('big');
  }
  refreshIcons();
}

// Поддержка стрелок клавиатуры в Блице (← Безопасно / → В БАН!)
document.addEventListener('keydown', (e) => {
  if (state.activeTab !== 'blitz' || !blitzState.running) return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); answerBlitz(true); }
  if (e.key === 'ArrowRight') { e.preventDefault(); answerBlitz(false); }
});

// ==================== ИНТЕРАКТИВНЫЙ МАЙНКРАФТ-ФОН ЮГРЫ (ЖИВОЕ НЕБО, ОБЛАКА, ТАЙГА И КЛИКАБЕЛЬНЫЕ БЛОКИ) ====================

function initVoxelBackground() {
  const canvas = document.getElementById('bg-voxel-world');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W = window.innerWidth;
  let H = window.innerHeight;
  let mouseX = 0.5, mouseY = 0.5;
  let smoothMx = 0.5, smoothMy = 0.5;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  resize();
  window.addEventListener('resize', resize);

  // Облака в стиле 3D-вокселей
  const clouds = Array.from({ length: 7 }, (_, i) => ({
    x: (i / 7) * (W + 240) - 120,
    y: 68 + (i % 3) * 58 + Math.random() * 24,
    w: 92 + (i % 3) * 38,
    h: 24 + (i % 2) * 10,
    speed: 0.18 + (i % 3) * 0.08,
    depth: 0.4 + (i % 3) * 0.25
  }));

  // Палитра кликабельных майнкрафт-блоков (трава, алмаз, изумруд, золото, щит Югры)
  const BLOCK_TYPES = [
    { name: 'diamond', top: '#67e8f9', front: '#22d3ee', side: '#0891b2', speck: '#ecfeff' },
    { name: 'emerald', top: '#86efac', front: '#22c55e', side: '#15803d', speck: '#f0fdf4' },
    { name: 'gold',    top: '#fde047', front: '#f59e0b', side: '#b45309', speck: '#fefce8' },
    { name: 'grass',   top: '#4ade80', front: '#b47b4e', side: '#8d5b34', speck: '#22c55e', isGrass: true },
    { name: 'yugra',   top: '#60a5fa', front: '#1e5aa8', side: '#14407a', speck: '#dbeafe' }
  ];

  // Летающие интерактивные блоки по краям экрана (просто приятный интерактив без баллов и лагов!)
  function resetFloatingBlock(b, sideHint = null) {
    const type = BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)];
    const isLeft = sideHint === 'left' ? true : (sideHint === 'right' ? false : Math.random() < 0.5);
    const marginW = Math.max(70, Math.min(200, W * 0.14));
    b.x = isLeft
      ? 24 + Math.random() * Math.max(24, marginW - 50)
      : W - 56 - Math.random() * Math.max(24, marginW - 50);
    b.baseY = 135 + Math.random() * Math.max(120, H - 280);
    b.y = b.baseY;
    b.size = 28 + Math.floor(Math.random() * 10);
    b.phase = Math.random() * Math.PI * 2;
    b.speed = 0.018 + Math.random() * 0.012;
    b.side = isLeft ? 'left' : 'right';
    b.type = type;
    b.scale = 0.02;
    b.alive = true;
    b.respawnFrames = 0;
    return b;
  }

  const floatingBlocks = ['left', 'left', 'left', 'right', 'right', 'right'].map(side => resetFloatingBlock({}, side));

  const particles = [];

  function spawnMineParticles(x, y, type, count = 12) {
    if (particles.length > 60) particles.splice(0, count);
    const colors = [type.top, type.front, type.side, type.speck];
    for (let i = 0; i < count; i++) {
      const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const spd = 2.2 + Math.random() * 4.0;
      particles.push({
        x, y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 2.2,
        size: 5 + Math.random() * 5,
        color: colors[i % colors.length],
        life: 1
      });
    }
  }

  function drawVoxelCube(cx, cy, s, type, scale = 1) {
    const sz = s * scale;
    const half = sz / 2;
    const d = sz * 0.28; // глубина 3D-грани

    // Мягкая тень под блоком
    ctx.fillStyle = 'rgba(30, 90, 168, 0.12)';
    ctx.fillRect(cx - half + 3, cy + half + 6, sz, 6);

    // Верхняя грань (изометрия)
    ctx.fillStyle = type.top;
    ctx.beginPath();
    ctx.moveTo(cx - half, cy - half);
    ctx.lineTo(cx - half + d, cy - half - d);
    ctx.lineTo(cx + half + d, cy - half - d);
    ctx.lineTo(cx + half, cy - half);
    ctx.closePath();
    ctx.fill();

    // Правая 3D-грань
    ctx.fillStyle = type.side;
    ctx.beginPath();
    ctx.moveTo(cx + half, cy - half);
    ctx.lineTo(cx + half + d, cy - half - d);
    ctx.lineTo(cx + half + d, cy + half - d);
    ctx.lineTo(cx + half, cy + half);
    ctx.closePath();
    ctx.fill();

    // Передняя грань
    ctx.fillStyle = type.front;
    ctx.fillRect(cx - half, cy - half, sz, sz);

    // Пиксельный узор блока (трава сверху или блеск руды)
    if (type.isGrass) {
      ctx.fillStyle = type.top;
      ctx.fillRect(cx - half, cy - half, sz, sz * 0.32);
      ctx.fillRect(cx - half + sz * 0.2, cy - half + sz * 0.3, sz * 0.22, sz * 0.12);
      ctx.fillRect(cx - half + sz * 0.62, cy - half + sz * 0.3, sz * 0.2, sz * 0.14);
    } else {
      ctx.fillStyle = type.speck;
      ctx.fillRect(cx - half + sz * 0.18, cy - half + sz * 0.18, sz * 0.22, sz * 0.22);
      ctx.fillRect(cx - half + sz * 0.56, cy - half + sz * 0.54, sz * 0.2, sz * 0.2);
      ctx.fillRect(cx - half + sz * 0.62, cy - half + sz * 0.22, sz * 0.14, sz * 0.14);
    }

    // Тонкая пиксельная обводка
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - half + 0.75, cy - half + 0.75, sz - 1.5, sz - 1.5);
  }

  // Пиксельная ветряная мельница на холме (крутится сама + ускоряется при клике!)
  let millAngle = 0;
  let millSpeed = 0.014;

  function drawVoxelWindmill(mx, baseY, scale = 1) {
    const u = 8 * scale;
    // Башня мельницы (дерево + камень)
    ctx.fillStyle = 'rgba(148, 163, 184, 0.55)';
    ctx.fillRect(mx - u * 1.6, baseY - u * 2.2, u * 3.2, u * 2.2);
    ctx.fillStyle = 'rgba(217, 179, 130, 0.68)';
    ctx.fillRect(mx - u * 1.3, baseY - u * 6.0, u * 2.6, u * 3.8);
    ctx.fillStyle = 'rgba(180, 123, 78, 0.55)';
    ctx.fillRect(mx + u * 0.7, baseY - u * 6.0, u * 0.6, u * 3.8);
    // Крыша синяя (в цвет Югры)
    ctx.fillStyle = 'rgba(30, 90, 168, 0.62)';
    ctx.fillRect(mx - u * 1.6, baseY - u * 7.0, u * 3.2, u * 1.1);
    ctx.fillRect(mx - u * 0.9, baseY - u * 7.9, u * 1.8, u * 1.0);
    // Окошко
    ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.fillRect(mx - u * 0.4, baseY - u * 4.2, u * 0.8, u * 1.0);

    // Вращающиеся 4 лопасти
    const hubX = mx;
    const hubY = baseY - u * 6.0;
    ctx.save();
    ctx.translate(hubX, hubY);
    ctx.rotate(millAngle);
    for (let k = 0; k < 4; k++) {
      ctx.rotate(Math.PI / 2);
      // Деревянная балка
      ctx.fillStyle = 'rgba(120, 74, 34, 0.72)';
      ctx.fillRect(-u * 0.18, 0, u * 0.36, u * 4.4);
      // Парус лопасти (светлый пиксельный)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.84)';
      ctx.fillRect(u * 0.18, u * 0.9, u * 1.25, u * 3.3);
      ctx.strokeStyle = 'rgba(30, 90, 168, 0.32)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(u * 0.18, u * 0.9, u * 1.25, u * 3.3);
    }
    // Центральная ось
    ctx.fillStyle = '#1e5aa8';
    ctx.fillRect(-u * 0.45, -u * 0.45, u * 0.9, u * 0.9);
    ctx.restore();
  }

  function drawVoxelTree(x, baseY, scale = 1) {
    const u = 10 * scale;
    // Ствол
    ctx.fillStyle = 'rgba(139, 90, 43, 0.38)';
    ctx.fillRect(x - u * 0.5, baseY - u * 2.2, u, u * 2.2);
    // Кубическая крона югорской ели
    ctx.fillStyle = 'rgba(30, 126, 52, 0.26)';
    ctx.fillRect(x - u * 2.1, baseY - u * 3.6, u * 4.2, u * 1.6);
    ctx.fillStyle = 'rgba(34, 158, 70, 0.28)';
    ctx.fillRect(x - u * 1.5, baseY - u * 5.0, u * 3.0, u * 1.5);
    ctx.fillStyle = 'rgba(74, 202, 110, 0.30)';
    ctx.fillRect(x - u * 0.8, baseY - u * 6.1, u * 1.6, u * 1.2);
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / Math.max(1, W);
    mouseY = e.clientY / Math.max(1, H);
  }, { passive: true });

  // Клик по пустому фону или по летающему блоку «добывает» блок в пиксельные частицы!
  window.addEventListener('click', (e) => {
    // Не перехватываем клики по кнопкам, карточкам, формам и ссылкам
    if (e.target.closest('button, a, input, select, textarea, #card-stage, #floating-steve, #chat-sidebar, #chat-pane, .mc-hotbar')) {
      return;
    }
    const cx = e.clientX;
    const cy = e.clientY;
    let hit = false;

    // Клик по мельнице раскручивает её в турбо-режим!
    const millX = 96;
    const millHubY = H - 78;
    if (W >= 820 && Math.hypot(cx - millX, cy - millHubY) <= 58) {
      millSpeed = Math.min(0.22, millSpeed + 0.085);
      SoundFX.playConnect();
      spawnMineParticles(millX, millHubY, { top: '#ffffff', front: '#93c5fd', side: '#1e5aa8', speck: '#fde047' }, 10);
      return;
    }

    for (let i = 0; i < floatingBlocks.length; i++) {
      const b = floatingBlocks[i];
      if (!b.alive) continue;
      const bx = b.x + (smoothMx - 0.5) * -18;
      const by = b.y + (smoothMy - 0.5) * -12;
      if (Math.hypot(cx - bx, cy - by) <= b.size * 0.95) {
        hit = true;
        b.alive = false;
        b.respawnFrames = 150;
        SoundFX.playDrop();
        spawnMineParticles(bx, by, b.type, 12);
        break;
      }
    }

    if (!hit) {
      // Лёгкий клик по небу/облачку — салют из светлых пикселей!
      spawnMineParticles(cx, cy, { top: '#ffffff', front: '#93c5fd', side: '#60a5fa', speck: '#fef08a' }, 8);
    }
  });

  function renderFrame() {
    if (!document.hidden) {
      smoothMx += (mouseX - smoothMx) * 0.06;
      smoothMy += (mouseY - smoothMy) * 0.06;

      ctx.clearRect(0, 0, W, H);

      // 1. Светлое дневное небо (100% светлая палитра без тёмных тем!)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, '#b5daff');
      skyGrad.addColorStop(0.55, '#dff0ff');
      skyGrad.addColorStop(1, '#d1f2e3');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. Пиксельное тёплое солнышко в верхнем левом углу
      const sunX = 88 + (smoothMx - 0.5) * -12;
      const sunY = 104 + (smoothMy - 0.5) * -8;
      ctx.fillStyle = 'rgba(253, 224, 71, 0.22)';
      ctx.fillRect(sunX - 38, sunY - 38, 76, 76);
      ctx.fillStyle = 'rgba(253, 224, 71, 0.42)';
      ctx.fillRect(sunX - 24, sunY - 24, 48, 48);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(sunX - 15, sunY - 15, 30, 30);

      // 3. Плывущие 3D воксельные облака
      clouds.forEach(c => {
        c.x += c.speed;
        if (c.x > W + 140) c.x = -c.w - 60;
        const px = c.x + (smoothMx - 0.5) * -28 * c.depth;
        const py = c.y + (smoothMy - 0.5) * -14 * c.depth;

        // Нижняя 3D-тень облака
        ctx.fillStyle = 'rgba(147, 197, 253, 0.45)';
        ctx.fillRect(px + 6, py + c.h - 4, c.w, 8);
        // Основной блок облака
        ctx.fillStyle = 'rgba(255, 255, 255, 0.86)';
        ctx.fillRect(px, py, c.w, c.h);
        ctx.fillRect(px + c.w * 0.2, py - 10, c.w * 0.56, 12);
      });

      // 4. Дальние пиксельные холмы и кубическая тайга Югры у самого низа экрана
      const hillStep = 64;
      for (let x = 0; x < W + hillStep; x += hillStep) {
        const h1 = 44 + Math.round(Math.sin(x * 0.008) * 18 + Math.cos(x * 0.015) * 12);
        ctx.fillStyle = 'rgba(134, 211, 173, 0.34)';
        ctx.fillRect(x, H - h1, hillStep + 1, h1);
        ctx.fillStyle = 'rgba(74, 189, 134, 0.22)';
        ctx.fillRect(x, H - h1, hillStep + 1, 8);
      }

      // Несколько милых пиксельных ёлочек Югры + крутящаяся ветряная мельница!
      millAngle += millSpeed;
      if (millSpeed > 0.014) millSpeed += (0.014 - millSpeed) * 0.018;
      if (W >= 820) {
        drawVoxelWindmill(96, H - 24, 1.12);
      }
      drawVoxelTree(38, H - 20, 0.95);
      drawVoxelTree(164, H - 16, 0.82);
      drawVoxelTree(W - 64, H - 20, 1.2);
      drawVoxelTree(W - 128, H - 14, 0.9);

      // 5. Летающие кликабельные 3D-блоки по бокам (крутятся и плавно качаются!)
      if (W >= 820) {
        floatingBlocks.forEach(b => {
          if (!b.alive) {
            if (b.respawnFrames > 0) {
              b.respawnFrames -= 1;
              if (b.respawnFrames === 0) resetFloatingBlock(b, b.side);
            }
            return;
          }
          b.phase += b.speed;
          b.y = b.baseY + Math.sin(b.phase) * 9;
          if (b.scale < 0.995) b.scale += (1 - b.scale) * 0.08;
          else b.scale = 1;
          const bx = b.x + (smoothMx - 0.5) * -18;
          const by = b.y + (smoothMy - 0.5) * -12;
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(Math.sin(b.phase * 0.85) * 0.16);
          drawVoxelCube(0, 0, b.size, b.type, b.scale);
          ctx.restore();
        });
      }

      // 6. Частицы разбитых блоков
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.life -= 0.025;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.restore();
      }
    }
    requestAnimationFrame(renderFrame);
  }
  renderFrame();
}

document.addEventListener('DOMContentLoaded', init);
