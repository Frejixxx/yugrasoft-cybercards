// 8 интерактивных карточек «Кибер-карточки Югры» (RU / EN / ХАН — Хантыйский язык, казымский диалект)
// Закрывают ВСЕ 6 обязательных тем из ТЗ и ВСЕ 5 типов заданий:
// 1. choice (Выбор ответа)
// 2. truefalse (Верно / Неверно)
// 3. sort (Сортировка по категориям)
// 4. match (Сопоставление пар)
// 5. order (Порядок действий)

const DEFAULT_CARDS = [
  {
    id: 'card_game_scam',
    loot: { icon: 'shield', name: { ru: 'Анти-админка', en: 'Anti-Admin Shield', kca: 'Анти-админка' }, desc: { ru: 'Иммунитет к фейковым админам на серверах!', en: 'Immunity to fake server admins!', kca: 'Фейк-админ эвӑӆт ӆавӑӆты!' } },
    mascotTip: {
      ru: 'Подумай: настоящий админ сервера выдаёт права по нику, ему НИКОГДА не нужен твой пароль! Проверь улики лупой!',
      en: 'Think: a real server admin grants permissions by username — they NEVER need your password! Tap the clues!',
      kca: 'Нумӑсэ: тәса админ пароль ӑн вохӆ! Уликайт вәньщэ!'
    },
    clues: [
      {
        id: 'c_game_1',
        match: { ru: 'бесплатную АДМИНКУ на сервере', en: 'free ADMIN on the server', kca: 'вух ӆыпи АДМИНКА' },
        note: {
          ru: 'Улика №1: «Бесплатная админка» — классическая приманка для школьников! Настоящую админку не раздают незнакомцам в чате.',
          en: 'Clue #1: "Free admin" is classic bait! Real server admins never hand out admin rights to strangers in chat.',
          kca: 'Улика №1: «Вух ӆыпи админка» — щит мошенник приманка!'
        }
      },
      {
        id: 'c_game_2',
        match: { ru: 'скинь логин и пароль на 2 минуты', en: 'send your login & password for 2 mins', kca: '2 минута пӑта логин па пароль китэ' },
        note: {
          ru: 'Улика №2: За «2 минуты» грифер сменит почту, заберёт все ресурсы и украдёт твой аккаунт!',
          en: 'Clue #2: In just "2 minutes" a griefer changes your email and steals your entire account!',
          kca: 'Улика №2: 2 минутайн мошенник пароль пєӆӑк пунӆ па аккаунт вўӆӆы!'
        }
      }
    ],
    visual: {
      kind: 'chat_snippet',
      sender: 'Admin_Pro99',
      tag: { ru: 'Игровой чат сервера', en: 'Server Game Chat', kca: 'Сервер юнт чат' },
      bubble: {
        ru: 'Дарова! Выдаю бесплатную АДМИНКУ на сервере — скинь логин и пароль на 2 минуты, зайду и пропишу тебе права!',
        en: 'Hey! Giving away free ADMIN on the server — send your login & password for 2 mins so I can set your permissions!',
        kca: 'Вўща! Вух ӆыпи АДМИНКА мӑӆум — 2 минута пӑта логин па пароль китэ!'
      }
    },
    type: 'choice',
    level: 1,
    topic: 'game',
    topicLabel: {
      ru: 'Мошенничество в игре',
      en: 'Gaming Scam',
      kca: 'Юнтӑн ӑн тәса вєр'
    },
    title: {
      ru: 'Бесплатная админка за пароль на сервере',
      en: 'Free Server Admin for Your Password',
      kca: 'Серверӑн пароль эвӑӆт админка мӑты'
    },
    prompt: {
      ru: 'В онлайн-игре незнакомый игрок пишет тебе в чат: «Хочешь бесплатную админку на сервере? Дай свой логин и пароль на 2 минуты, я зайду и выдам тебе права!». Как поступить?',
      en: 'A stranger in an online game messages you: "Want free admin on the server? Give me your login and password for 2 minutes so I can set up your permissions!" What should you do?',
      kca: 'Онлайн-юнтӑн ӑн вәтӑм хоят нӑӊэн хӑншӆ: «Вух ӆыпи админка мӑсты? 2 минута пӑта логин па пароль мӑсэ, ма ӆәӊӆум па правайт мӑӆум!». Муй вєрты мӑсӆ?'
    },
    options: [
      {
        id: 'a',
        text: {
          ru: 'Дать пароль, а потом сразу поменять его обратно',
          en: 'Share the password and change it right after',
          kca: 'Пароль мӑты, щи юпийн иӆпийн пєӆӑк пунты'
        },
        correct: false
      },
      {
        id: 'b',
        text: {
          ru: 'Отказать, не сообщать пароль и пожаловаться на игрока модераторам',
          en: 'Refuse, never share your password, and report the player',
          kca: 'Ӑн мӑты, пароль ӆавӑӆты па модераторӑтн ястӑты'
        },
        correct: true
      },
      {
        id: 'c',
        text: {
          ru: 'Сказать только логин и код из СМС, без пароля',
          en: 'Send only the login and SMS code without the password',
          kca: 'Пароль ӆыпи логин па SMS-код тәп мӑты'
        },
        correct: false
      }
    ],
    explanation: {
      ru: 'Никому и никогда нельзя отдавать пароль или код из СМС — даже на «две минуты». Мошенник мгновенно сменит почту и украдёт твой аккаунт вместе со всеми предметами.',
      en: 'Never share your password or SMS codes — not even for "two minutes". A scammer will instantly change your email and steal your account.',
      kca: 'Хәйата па хәтыйн пароль па SMS-код мӑты ӑн рӑхӆ — 2 минута пӑта па ӑн рӑхӆ! Мошенник аккаунтэн па иса скинӆӑн вўӆӆы.'
    }
  },

  {
    id: 'card_password_tf',
    loot: { icon: 'key', name: { ru: 'Алмазный ключ', en: 'Diamond Key', kca: 'Алмаз ключ' }, desc: { ru: 'Запирает аккаунт на супер-сложный пароль!', en: 'Locks your account with an unbreakable password!', kca: 'Тӑк пароль аккаунт ӆавӑӆӆ!' } },
    mascotTip: {
      ru: 'Представь, что твой пароль — это ключ от дома. Надёжен ли ключ, который есть у каждого? Кликни на пароль лупой!',
      en: 'Imagine your password is your house key. Would you use the easiest key in the world? Tap the password with the magnifier!',
      kca: 'Пароль — щит хот ключ. 123456 — тӑк ключ аӆпа ӑн? Пароль пириэ!'
    },
    clues: [
      {
        id: 'c_pass_1',
        match: { ru: '123456', en: '123456', kca: '123456' },
        note: {
          ru: 'Улика найдена! «123456» — самый частый пароль в мире. Взломщик подберёт его за 0.01 секунды!',
          en: 'Clue found! "123456" is the #1 most common password — bots crack it in 0.01 seconds!',
          kca: 'Улика кӑншсы! «123456» — программа 0.01 секундайн вәӆӆы!'
        }
      }
    ],
    visual: {
      kind: 'password_box',
      sample: '123456',
      label: { ru: 'Проверка надёжности пароля', en: 'Password Strength Check', kca: 'Пароль тӑк вәньщты' },
      meterText: { ru: 'Очень слабый • Подбирается за 0.01 сек', en: 'Very weak • Cracked in 0.01 sec', kca: 'Ӑн тӑк • 0.01 секундайн вәӆӆы' }
    },
    type: 'truefalse',
    level: 1,
    topic: 'password',
    topicLabel: {
      ru: 'Пароли и защита',
      en: 'Passwords & Safety',
      kca: 'Парольӑт па ӆавӑӆты вєр'
    },
    title: {
      ru: 'Простой пароль легче запомнить?',
      en: 'Is a Simple Password Better?',
      kca: 'Ай па моньщ пароль ёмӑщ?'
    },
    prompt: {
      ru: 'Оцени утверждение: «Пароль должен быть простым — например, 123456 или дата рождения, чтобы его было легко запомнить и использовать на всех сайтах сразу».',
      en: 'Evaluate the statement: "A password should be simple — like 123456 or your birthday — so it is easy to remember and reuse on every website."',
      kca: 'Щи ясӑӊ вәньщэ: «Пароль моньщ вәӆты мӑсӆ — 123456 аӆпа сємӑн питӑм хӑтӆ, иса сайтӑтн и пароль ӆўӊӑтты ёмӑщ».'
    },
    correctAnswer: false,
    explanation: {
      ru: 'Утверждение неверно: простые пароли (123456, qwerty, дата рождения) программы подбирают меньше чем за секунду. Используй длинный пароль из букв, цифр и символов — и разный для важных аккаунтов.',
      en: 'This statement is false: simple passwords like 123456 or birthdays are cracked in under a second. Use a long mix of letters, numbers, and symbols — and unique passwords for important accounts.',
      kca: 'Щи ясӑӊ ӑн тәса: моньщ парольӑт (123456, сємӑн питӑм хӑтӆ) программа секундайн вәӆӆы. Хәв па тӑк пароль (буквайт, цифрайт) хӑншты мӑсӆ.'
    }
  },

  {
    id: 'card_personal_sort',
    loot: { icon: 'chest', name: { ru: 'Сундук-сейф', en: 'Ender Safe', kca: 'Сундук-сейф' }, desc: { ru: 'Прячет адрес и пароли от чужих глаз!', en: 'Keeps your address and passwords locked away!', kca: 'Адрес па парольӑт ӆавӑӆӆ!' } },
    mascotTip: {
      ru: 'Спроси себя: «А если это прочитает незнакомец на улице — будет ли мне опасно?» Перетащи карточки в нужные корзинки!',
      en: 'Ask yourself: "Would it be safe if a stranger on the street knew this?" Drag each card into the right basket!',
      kca: 'Нумӑсэ: ӑн вәтӑм хоята щит вәты рӑхӆ аӆпа ӑн? Карточкат корзинайн вўсэ!'
    },
    type: 'sort',
    level: 2,
    topic: 'privacy',
    topicLabel: {
      ru: 'Публикация личных данных',
      en: 'Personal Data Privacy',
      kca: 'Нєм па хот вєрӑт ӆавӑӆты'
    },
    title: {
      ru: 'Что можно писать о себе в интернете?',
      en: 'What Is Safe to Share Online?',
      kca: 'Интернетӑн муй хӑншты рӑхӆ, муй ӑн рӑхӆ?'
    },
    prompt: {
      ru: 'Разложи карточки по двум корзинам: что МОЖНО рассказать в открытом профиле или чате, а что НЕЛЬЗЯ публиковать никому.',
      en: 'Sort each item into two categories: what is SAFE to share in a public profile/chat, and what must stay PRIVATE.',
      kca: 'Карточкат кӑт пєӆӑкн пунэ: муй интернетӑн ястӑты РӐХӅ, а муй хӑншты ӐН РӐХӅ.'
    },
    buckets: {
      safe: {
        ru: 'Можно делиться',
        en: 'Safe to Share',
        kca: 'Ястӑты рӑхӆ'
      },
      private: {
        ru: 'Нельзя публиковать',
        en: 'Keep Private',
        kca: 'Хӑншты ӑн рӑхӆ'
      }
    },
    items: [
      { id: 's1', text: { ru: 'Любимая видеоигра', en: 'Favorite video game', kca: 'Сӑм видеоюнт' }, bucket: 'safe' },
      { id: 's2', text: { ru: 'Домашний адрес и номер квартиры', en: 'Home address & apartment number', kca: 'Хот адрес па квартира номер' }, bucket: 'private' },
      { id: 's3', text: { ru: 'Пароль от электронного дневника', en: 'School portal password', kca: 'Ӑшкола дневник пароль' }, bucket: 'private' },
      { id: 's4', text: { ru: 'Любимый цвет или мультфильм', en: 'Favorite color or cartoon', kca: 'Сӑм хӑнш аӆпа мультфильм' }, bucket: 'safe' },
      { id: 's5', text: { ru: 'Фото банковской карты родителей', en: 'Photo of parents’ bank card', kca: 'Аӊки-ащи банк карта фото' }, bucket: 'private' },
      { id: 's6', text: { ru: 'Хобби (рисование, футбол)', en: 'Hobby (drawing, football)', kca: 'Сӑм вєр (хӑншты, футбол)' }, bucket: 'safe' }
    ],
    explanation: {
      ru: 'Хобби, любимые игры и фильмы не выдают твою безопасность. А вот домашний адрес, пароли, фото документов и банковских карт — это личные данные, которые нельзя публиковать в сети.',
      en: 'Hobbies and favorite games are safe to discuss. Home addresses, passwords, documents, and bank card photos must always remain strictly private.',
      kca: 'Сӑм юнтӑт па мультфильмӑт ястӑты рӑхӆ. А хот адрес, парольӑт па аӊки-ащи банк карта фото интернетӑн хӑншты ӑн рӑхӆ!'
    }
  },

  {
    id: 'card_bullying_choice',
    loot: { icon: 'heart', name: { ru: 'Тотем дружбы', en: 'Friendship Totem', kca: 'Юр тотем' }, desc: { ru: 'Защищает класс от обидчиков в чатах!', en: 'Protects classmates from online bullies!', kca: 'Класс ӑтӑм ясӑӊӑт эвӑӆт ӆавӑӆӆ!' } },
    mascotTip: {
      ru: 'Обидчики ждут шума и лайков. Подумай, какое действие реально остановит травлю и защитит одноклассника!',
      en: 'Bullies want attention and reactions. Which action actually protects your classmate and stops the bullying?',
      kca: 'Ӑтӑм хоят ӆӑхты смайлик вохӆ. Муй вєр тәса юрєн ӆавӑӆӆ?'
    },
    clues: [
      {
        id: 'c_bully_1',
        match: { ru: 'Давайте все пересылать его в параллель!', en: 'Everyone forward it to other classes!', kca: 'Иса классатн єӆӆы китӆўв!' },
        note: {
          ru: 'Улика найдена! Призыв массово рассылать неудачное фото — это кибербуллинг. Не пересылай и сделай скриншот для взрослых!',
          en: 'Clue found! Encouraging everyone to spread an embarrassing photo is cyberbullying. Screenshot it and tell an adult!',
          kca: 'Улика кӑншсы! Щит кибербуллинг! Скриншот вєрэ па аӊки-ащийн ястӑэ!'
        }
      }
    ],
    visual: {
      kind: 'chat_snippet',
      sender: 'Аноним в 6Б',
      tag: { ru: 'Школьный чат', en: 'School Chat', kca: 'Ӑшкола чат' },
      bubble: {
        ru: 'Хаха, смотрите какое смешное фото я нашёл! Давайте все пересылать его в параллель!',
        en: 'Haha look at this embarrassing photo I found! Everyone forward it to other classes!',
        kca: 'Хаха, щи фото вәньщӑты! Иса классатн єӆӆы китӆўв!'
      }
    },
    type: 'choice',
    level: 1,
    topic: 'bullying',
    topicLabel: {
      ru: 'Травля в сети (кибербуллинг)',
      en: 'Cyberbullying',
      kca: 'Интернетӑн ӑтӑм ясӑӊӑт (кибербуллинг)'
    },
    title: {
      ru: 'Обидные сообщения в общем чате',
      en: 'Mean Messages in a Group Chat',
      kca: 'Ӑшкола чатӑн ӑтӑм ясӑӊӑт хӑншӆӑт'
    },
    prompt: {
      ru: 'В школьном чате кто-то начал писать обидные прозвища твоему однокласснику и выкладывать его неудачные фото. Что будет самым правильным действием?',
      en: 'Someone in your school chat starts calling a classmate mean names and posting embarrassing photos of them. What is the right action?',
      kca: 'Ӑшкола чатӑн хоят нӑӊ юрєн пӑта ӑтӑм ясӑӊӑт хӑншӆ па ӑн ёмӑщ фотойт китӆ. Муй тәса вєрты мӑсӆ?'
    },
    options: [
      {
        id: 'a',
        text: {
          ru: 'Начать грубить обидчику в ответ и пересылать мемы дальше',
          en: 'Insult the bully back and forward the memes',
          kca: 'Ищи ӑтӑм ясӑӊӑт хӑншты па мемӑт єӆӆы китты'
        },
        correct: false
      },
      {
        id: 'b',
        text: {
          ru: 'Не поддерживать травлю, сделать скриншоты, поддержать одноклассника и рассказать взрослым (родителям или учителю)',
          en: 'Do not join in, take screenshots, support your classmate, and tell a trusted adult',
          kca: 'Ӑтӑм вєр ӑн нётты, скриншот вєрты, юрєн нётты па аӊки-ащийн аӆпа утӆты хоята ястӑты'
        },
        correct: true
      },
      {
        id: 'c',
        text: {
          ru: 'Поставить смеющийся смайлик, чтобы не выделиться',
          en: 'React with a laughing emoji to fit in',
          kca: 'Ӆӑхты смайлик пунты'
        },
        correct: false
      }
    ],
    explanation: {
      ru: 'В ответной грубости обидчик только получает то, чего хотел — эмоции. Скриншоты помогают зафиксировать травлю, а обращение к родителям, учителю или школьному психологу реально останавливает кибербуллинг.',
      en: 'Fighting back with insults fuels the bully. Taking screenshots as evidence, supporting the target, and telling parents or teachers is the right way to stop cyberbullying.',
      kca: 'Ӑтӑм ясӑӊӑтн воӆты ӑн мӑсӆ. Скриншот вєрты, юрєн нётты па аӊки-ащийн аӆпа утӆты хоята ястӑты — щит тәса па вуй вєр!'
    }
  },

  {
    id: 'card_phishing_match',
    loot: { icon: 'spyglass', name: { ru: 'Подзорная труба', en: 'Spyglass', kca: 'Лупа-труба' }, desc: { ru: 'За километр видит поддельные ссылки!', en: 'Spots fake links from a mile away!', kca: 'Ӑн тәса ссылкат вәӆӆ!' } },
    mascotTip: {
      ru: 'Соедини каждую хитрую ловушку слева с правильным ответом кибердетектива справа — можно перетаскивать или кликать!',
      en: 'Connect each tricky trap on the left with the cyber-detective move on the right — drag or click!',
      kca: 'Хӑӆ пєӆӑк вєр па ем пєӆӑк тәса ястӑпсы кимӑӆтӑэ!'
    },
    type: 'match',
    level: 2,
    topic: 'phishing',
    topicLabel: {
      ru: 'Фишинг и незнакомцы в сети',
      en: 'Phishing & Strangers',
      kca: 'Фишинг па ӑн вәтӑм хоятӑт'
    },
    title: {
      ru: 'Сопоставь ситуацию и правильную реакцию',
      en: 'Match the Situation to the Safe Reaction',
      kca: 'Вєр па тәса ястӑпсы кимӑӆтӑэ'
    },
    prompt: {
      ru: 'Нажми сначала на ситуацию слева, а затем выбери подходящую безопасную реакцию справа — соедини все 4 пары.',
      en: 'Click a situation on the left, then select the matching safe reaction on the right to connect all 4 pairs.',
      kca: 'Оӆӑӊӑн хӑӆ пєӆӑк вєр пириэ, щи юпийн ем пєӆӑк тәса ястӑпсы пириэ — иса 4 кимӑӆтӑэ.'
    },
    pairs: [
      {
        id: 'p1',
        left: {
          ru: 'Письмо от «банка» со странной ссылкой sber-podarok-free.ru',
          en: 'Email from a "bank" with a weird link like bank-free-prize.ru',
          kca: '«Банк» нєпек, странной ссылка sber-podarok-free.ru'
        },
        right: {
          ru: 'Это фишинг — не переходить и удалить письмо',
          en: 'It is phishing — do not click and delete',
          kca: 'Щит фишинг — ӑн мӑнты па нєпек єсӑӆты'
        }
      },
      {
        id: 'p2',
        left: {
          ru: 'Незнакомец в соцсети просит прислать фото школы и класса',
          en: 'A stranger online asks for photos of your school and class',
          kca: 'Ӑн вәтӑм хоят ӑшкола па класс фото вохӆ'
        },
        right: {
          ru: 'Отказать, не слать фото и рассказать родителям',
          en: 'Refuse, never send photos, and tell parents',
          kca: 'Фото ӑн китты па аӊки-ащийн ястӑты'
        }
      },
      {
        id: 'p3',
        left: {
          ru: 'Друг внезапно просит срочно скинуть код из СМС',
          en: 'A friend suddenly asks for an SMS code urgently',
          kca: 'Юр щимӑщ SMS-код китты вохӆ'
        },
        right: {
          ru: 'Проверить друга звонком и не отдавать код',
          en: 'Call your friend to verify and never share the code',
          kca: 'Юра телефонӑн вәньщты па код ӑн мӑты'
        }
      },
      {
        id: 'p4',
        left: {
          ru: 'Всплывающее окно: «Вы выиграли смартфон, введите карту!»',
          en: 'Pop-up: "You won a smartphone, enter your card!"',
          kca: 'Экранӑн: «Смартфон вўсэн, карта хӑншэ!»'
        },
        right: {
          ru: 'Закрыть вкладку — бесплатных призов за карту не бывает',
          en: 'Close the tab — real prizes never ask for card details',
          kca: 'Пӑнтты — карта эвӑӆт приз ӑнтєм'
        }
      }
    ],
    explanation: {
      ru: 'Правило кибердетектива: фишинговые ссылки сразу закрываем, фото школы незнакомцам не отправляем, а любые срочные просьбы «друзей» о деньгах или кодах всегда проверяем звонком.',
      en: 'Cyber-detective rule: never click fake domains, never send personal or school photos to strangers, and always verify urgent friend requests with a real phone call.',
      kca: 'Тәса правило: фишинг ссылкатн ӑн мӑнӆўв, ӑн вәтӑм хоятӑта фото ӑн китӆўв, а юрӑт вохты вух па SMS-код телефонӑн вәньщӆўв.'
    }
  },

  {
    id: 'card_hacked_order',
    loot: { icon: 'armor', name: { ru: 'Щит 2FA', en: '2FA Shield', kca: '2FA Щит' }, desc: { ru: 'Выкидывает взломщиков и ставит двойную защиту!', en: 'Kicks out hackers and locks down your account!', kca: 'Взломщик эвӑӆт кӑт пєӆӑк ӆавӑӆты!' } },
    mascotTip: {
      ru: 'Представь: в твою комнату зашёл чужой. Сначала выгоняем его (меняем замок — пароль!), потом ставим второй замок (2FA)!',
      en: 'Imagine an intruder entered your room: first kick them out (change password + sessions), then add a second lock (2FA)!',
      kca: 'Оӆӑӊӑн пароль пєӆӑк пунты па сеансӑт пӑнтты, щи юпийн 2FA пунты!'
    },
    clues: [
      {
        id: 'c_hack_1',
        match: { ru: 'с неизвестного устройства (другой город)', en: 'from an unknown device (another city)', kca: 'Йиӆуп телефон эвӑӆт' },
        note: {
          ru: 'Улика найдена! Вход из другого города — верный признак взлома. Первым делом нужно сменить пароль и завершить чужие сеансы!',
          en: 'Clue found! A login from another city means a breach. Step 1 is always changing your password and ending all sessions!',
          kca: 'Улика кӑншсы! Йиӆуп телефон эвӑӆт ӆәӊсы — єӆӆы пароль пєӆӑк пунэ!'
        }
      }
    ],
    visual: {
      kind: 'alert_banner',
      title: { ru: 'Уведомление безопасности', en: 'Security Alert', kca: 'Ӆавӑӆты нєпек' },
      text: {
        ru: 'Обнаружен вход в ваш аккаунт с неизвестного устройства (другой город).',
        en: 'New login detected from an unknown device (another city).',
        kca: 'Йиӆуп телефон эвӑӆт нӑӊ аккаунтэна ӆәӊсы.'
      }
    },
    type: 'order',
    level: 3,
    topic: 'hacked',
    topicLabel: {
      ru: 'Взлом аккаунта',
      en: 'Account Hacked',
      kca: 'Аккаунт вўсы (взлом)'
    },
    title: {
      ru: 'Что делать, если аккаунт всё-таки взломали?',
      en: 'What to Do If Your Account Gets Hacked?',
      kca: 'Аккаунт вўсы ки — муй оӆӑӊӑн вєрты?'
    },
    prompt: {
      ru: 'Расставь 4 шага в правильном порядке от первого к последнему (используй стрелки вверх/вниз), чтобы быстро вернуть контроль и защитить друзей.',
      en: 'Put the 4 steps in the correct order from first to last (use the up/down arrows) to regain control and protect your friends.',
      kca: '4 вєр тәса тӑхийн пунэ (оӆӑӊ эвӑӆт юпи вәнта), ӆәӆн аккаунт па юрӑт ӆавӑӆты.'
    },
    steps: [
      {
        id: 'o1',
        correctPos: 0,
        text: {
          ru: 'Немедленно сменить пароль и завершить все чужие сеансы входа',
          en: 'Immediately change your password and terminate all active sessions',
          kca: 'Пароль єӆӆы пєӆӑк пунты па иса йиӆуп хоят сеансӑт пӑнтты'
        }
      },
      {
        id: 'o2',
        correctPos: 1,
        text: {
          ru: 'Включить двухфакторную аутентификацию (2FA / облачный пароль)',
          en: 'Enable two-factor authentication (2FA)',
          kca: 'Кӑт пєӆӑк ӆавӑӆты вєр (2FA) пунты'
        }
      },
      {
        id: 'o3',
        correctPos: 2,
        text: {
          ru: 'Предупредить друзей и родителей, чтобы не переводили деньги мошеннику',
          en: 'Warn friends and parents not to send money or codes',
          kca: 'Юрӑта па аӊки-ащийн ястӑты, ӆәӆн вух ӑн китты'
        }
      },
      {
        id: 'o4',
        correctPos: 3,
        text: {
          ru: 'Если доступ уже потерян — написать в официальную поддержку сервиса',
          en: 'If locked out, contact official platform support',
          kca: 'Аккаунта ӆәӊты ӑн рӑхӆ ки — официальной техподдержкайн хӑншты'
        }
      }
    ],
    explanation: {
      ru: 'Правильный порядок действий: в первую минуту нужно выкинуть взломщика (сменить пароль и закрыть чужие сеансы), затем включить 2FA, предупредить друзей и родителей, а при потере доступа обращаться только в официальную поддержку.',
      en: 'Correct sequence: first kick the attacker out (change password + end sessions), then enable 2FA, warn friends and parents, and contact official support if locked out.',
      kca: 'Тәса вєрӑт: оӆӑӊӑн пароль пєӆӑк пунты па сеансӑт пӑнтты, 2FA пунты, юрӑта ястӑты па мӑсӆ ки — официальной поддержкайн хӑншты.'
    }
  },

  {
    id: 'card_shopping_tf',
    loot: { icon: 'emerald', name: { ru: 'Изумруд сделок', en: 'Safe Emerald', kca: 'Изумруд' }, desc: { ru: 'Бережёт деньги от фальшивых ссылок на оплату!', en: 'Protects your coins from fake payment links!', kca: 'Вух ӑн тәса ссылкат эвӑӆт ӆавӑӆӆ!' } },
    mascotTip: {
      ru: 'Включи «Лупу детектива» и посмотри на адрес сайта и на то, какие цифры просит форма — там сразу 2 опасные улики!',
      en: 'Use your Detective Magnifier on the website address and the form — there are 2 big red flags hiding there!',
      kca: 'Сайт адрес па форма вәньщэ — тӑта кӑт ӑн тәса улика вәӆӆ!'
    },
    clues: [
      {
        id: 'c_shop_1',
        match: { ru: 'avito-oplata-free.ru', en: 'avito-oplata-free.ru', kca: 'avito-oplata-free.ru' },
        note: {
          ru: 'Улика №1: Поддельный сайт с лишними словами «oplata-free»! Настоящий магазин оплачивается только внутри самого приложения.',
          en: 'Clue #1: Fake lookalike link with extra words! Real stores only take payment inside the official app.',
          kca: 'Улика №1: «oplata-free» — щит ӑн тәса фишинг сайт!'
        }
      },
      {
        id: 'c_shop_2',
        match: { ru: '3 секретные цифры с оборота карты и код из СМС', en: '3 secret digits on the back of the card and SMS code', kca: 'карта юпи 3 цифра па SMS-код' },
        note: {
          ru: 'Улика №2: Чтобы ПОЛУЧИТЬ деньги, никогда не нужны 3 цифры с обратной стороны карты (CVV) и код из СМС — их просят только воры!',
          en: 'Clue #2: You NEVER need the 3 back digits (CVV) or an SMS code to RECEIVE money — only scammers ask for those!',
          kca: 'Улика №2: Вух вўты пӑта карта юпи 3 цифра па SMS-код ӑн мӑсӆ — щит мошенникӑт вохӆӑт!'
        }
      }
    ],
    visual: {
      kind: 'browser_bar',
      url: 'https://avito-oplata-free.ru/get-money',
      note: {
        ru: 'Форма на чужом сайте: «Введите номер карты, 3 секретные цифры с оборота карты и код из СМС, чтобы ПОЛУЧИТЬ деньги»',
        en: 'External form: "Enter card number, 3 secret digits on the back of the card and SMS code to RECEIVE money"',
        kca: 'Йиӆуп сайтӑн: «Вух вўты пӑта карта номер, карта юпи 3 цифра па SMS-код хӑншэ»'
      }
    },
    type: 'truefalse',
    level: 2,
    topic: 'shopping',
    topicLabel: {
      ru: 'Покупки в интернете',
      en: 'Online Shopping',
      kca: 'Интернетӑн тыныты-вўты'
    },
    title: {
      ru: 'Оплата товара по ссылке из чата',
      en: 'Paying via a Link in Chat',
      kca: 'Чат ссылка эвӑӆт вух мӑты'
    },
    prompt: {
      ru: 'Оцени утверждение: «Если продавец скинул в чат отдельную ссылку для "безопасной оплаты" и просит ввести три секретные цифры с обратной стороны карты (CVV) и код из СМС — это нормально».',
      en: 'Evaluate the statement: "If a seller sends you a private chat link for \'safe payment\' and asks for the 3 secret digits on the back of your card (CVV) and an SMS code, that is normal."',
      kca: 'Щи ясӑӊ вәньщэ: «Тыныты хоят чата ссылка китӑс па карта юпи 3 цифра (CVV) па SMS-код хӑншты вохӆ — щит ёмӑщ вєр».'
    },
    correctAnswer: false,
    explanation: {
      ru: 'Утверждение неверно: все покупки нужно оплачивать только внутри официального приложения или сайта магазина. Переход по сторонней ссылке из чата и ввод 3 цифр с оборота карты (CVV) и кода из СМС — это кража денег с карты.',
      en: 'This statement is false: always pay strictly inside the official app or store website. External chat links asking for the 3 back digits (CVV) and SMS codes are classic card theft.',
      kca: 'Щи ясӑӊ ӑн тәса: вух мӑты тәп официальной приложение аӆпа сайтӑн рӑхӆ. Чат ссылкайн CVV па SMS-код хӑншты — карта эвӑӆт вух вўты вєр!'
    }
  },

  {
    id: 'card_domains_match',
    loot: { icon: 'book', name: { ru: 'Книга кибер-магии', en: 'Cyber Spellbook', kca: 'Кибер-книга' }, desc: { ru: 'Раскрывает все современные уловки мошенников!', en: 'Reveals every modern scammer trick!', kca: 'Иса мошенник вєрӑт вәӆӆ!' } },
    mascotTip: {
      ru: 'Последняя миссия! Ты уже настоящий кибердетектив — соедини 3 современные уловки мошенников с их разоблачением!',
      en: 'Final mission! You are a real cyber-detective now — match these 3 modern scam tricks with how to spot them!',
      kca: 'Юпи миссия! 3 мошенник вєр па тәса вәты ясӑӊ кимӑӆтӑэ!'
    },
    type: 'match',
    level: 3,
    topic: 'phishing',
    topicLabel: {
      ru: 'Уловки мошенников',
      en: 'Scammer Tricks',
      kca: 'Мошенник вєрӑт'
    },
    title: {
      ru: 'Найди подвох в каждом сообщении',
      en: 'Spot the Trick in Each Message',
      kca: 'Иса нєпекӑн ӑн тәса вєр кӑншэ'
    },
    prompt: {
      ru: 'Соедини уловку мошенника слева с тем, как она называется или как её распознать справа.',
      en: 'Match each scammer trick on the left with how to spot it on the right.',
      kca: 'Хӑӆ пєӆӑк мошенник вєр па ем пєӆӑк тәса вәты ясӑӊ кимӑӆтӑэ.'
    },
    pairs: [
      {
        id: 'd1',
        left: {
          ru: 'Ссылка gosuslugi-podarok-vhod.ru вместо gosuslugi.ru',
          en: 'Link gosuslugi-prize-login.ru instead of gosuslugi.ru',
          kca: 'Ссылка gosuslugi-podarok-vhod.ru (тәса: gosuslugi.ru)'
        },
        right: {
          ru: 'Поддельный сайт с лишними словами в адресе',
          en: 'Fake website with extra words in the address',
          kca: 'Ӑн тәса сайт (адресӑн йиӆуп ясӑӊӑт)'
        }
      },
      {
        id: 'd2',
        left: {
          ru: 'Синяя галочка у «блогера», который просит 490 ₽ за приз',
          en: 'Blue checkmark on a "blogger" asking for a $5 prize fee',
          kca: '«Блогер» галочка, приз пӑта 490 ₽ вохӆ'
        },
        right: {
          ru: 'Эмодзи-статус Telegram Premium вместо верификации',
          en: 'Telegram Premium emoji status instead of real verification',
          kca: 'Тәса верификация ӆыпи Telegram Premium эмодзи-статус'
        }
      },
      {
        id: 'd3',
        left: {
          ru: '«Никому не говори, даже родителям — тайная проверка!»',
          en: '"Tell no one, not even parents — secret check!"',
          kca: '«Хәйата ӑн ястӑэ, аӊки-ащийн па ӑн ястӑэ!»'
        },
        right: {
          ru: 'Давление авторитетом и изоляция от взрослых',
          en: 'Authority pressure and isolation from parents',
          kca: 'Вән хоятӑт эвӑӆт пєӆӑк тәты вєр (мошенник вєр)'
        }
      }
    ],
    explanation: {
      ru: 'Главные уловки мошенников: поддельные адреса сайтов с лишними словами, фейковые премиум-галочки вместо настоящей проверки и запрет рассказывать родителям.',
      en: 'Key scammer tricks to watch for: lookalike domains with extra words, fake Premium checkmarks instead of real verification, and demands to hide things from parents.',
      kca: 'Мошенник вєрӑт: ӑн тәса доменӑт, Premium-галочкат па аӊки-ащийн ястӑты ӑн мӑты ясӑӊӑт.'
    }
  }
];
