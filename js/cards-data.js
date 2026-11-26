// массив с 8 заданиями-карточками на трех языках (ru, en, хантыйский)
// здесь все 5 типов заданий для тренажера:
// 1. choice - выбор ответа
// 2. truefalse - верно / неверно
// 3. sort - сортировка по корзинам
// 4. match - соединить пары
// 5. order - расставить по порядку

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
        match: { ru: 'бесплатную АДМИНКУ на сервере', en: 'free ADMIN on the server', kca: 'Вух ӆыпи АДМИНКА' },
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
        ru: 'Обнаружен вход в ваш аккаунт с неизвестного устройства (другой город)',
        en: 'New login detected from an unknown device (another city)',
        kca: 'Йиӆуп телефон эвӑӆт нӑӊ аккаунтэна ӆәӊсы'
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
  },
  // 9. кибер-верстак 3x3: защита аккаунта (глава 1)
  {
    id: 'card_craft_account',
    chapter: 1,
    type: 'craft',
    level: 2,
    topic: 'password',
    topicLabel: { ru: 'Защита аккаунта', en: 'Account Defense', kca: 'Аккаунт ӆавӑӆты' },
    loot: {
      icon: 'helmet',
      name: { ru: 'Щит Аккаунта', en: 'Account Shield', kca: 'Аккаунт щит' },
      desc: { ru: 'Скрафтил надёжную защиту для профиля!', en: 'Crafted strong protection for your profile!', kca: 'Аккаунт пӑта тӑк щит вєрӑн!' }
    },
    title: {
      ru: 'Кибер-верстак: скрафти защиту для аккаунта',
      en: 'Cyber Crafting Table: craft account armor',
      kca: 'Кибер-верстак: аккаунт пӑта щит вєрэ'
    },
    prompt: {
      ru: 'Собери Алмазный Щит: положи на верстак ровно 3 правильных блока защиты и не трогай опасные ловушки!',
      en: 'Craft a Diamond Shield: place exactly 3 safe defense blocks on the crafting table and avoid traps!',
      kca: 'Алмаз щит пӑта верстак эӆты 3 тәса блок пунэ, ӑтӑм блокӑт ӑн вўэ!'
    },
    mascotTip: {
      ru: 'Для крепкого щита нужны: сложный пароль, вход по коду (2FA) и секретность — никому не давать логин!',
      en: 'A strong shield needs: a complex password, 2FA login code, and keeping your password secret!',
      kca: 'Тӑк щит пӑта: тӑк пароль, 2FA па пароль хәйата ӑн мӑты!'
    },
    craftTarget: {
      icon: 'shield',
      name: { ru: 'Алмазный Щит', en: 'Diamond Shield', kca: 'Алмаз щит' }
    },
    needCount: 3,
    ingredients: [
      { id: 'c1', icon: 'key', correct: true, label: { ru: 'Пароль от 12 знаков', en: '12+ char password', kca: '12 знак пароль' } },
      { id: 'c2', icon: 'shield', correct: true, label: { ru: 'Вход по 2FA', en: '2FA protection', kca: '2FA ӆавӑӆты' } },
      { id: 'c3', icon: 'book', correct: true, label: { ru: 'Секретность пароля', en: 'Keep password secret', kca: 'Пароль ӑн мӑты' } },
      { id: 'c4', icon: 'chest', correct: false, label: { ru: 'Пароль «123456»', en: 'Password "123456"', kca: 'Пароль «123456»' } },
      { id: 'c5', icon: 'emerald', correct: false, label: { ru: 'Сказать код в чате', en: 'Share SMS code', kca: 'SMS-код чатӑн мӑты' } },
      { id: 'c6', icon: 'spyglass', correct: false, label: { ru: 'Один пароль везде', en: 'Same password everywhere', kca: 'И пароль иса тӑхийн' } }
    ],
    explanation: {
      ru: 'Рецепт надёжного аккаунта простой: уникальный сложный пароль, включённая двухфакторка (2FA) и правило никогда не делиться паролем и кодами.',
      en: 'The recipe for a safe account: a strong unique password, 2FA enabled, and never sharing passwords or SMS codes.',
      kca: 'Тӑк аккаунт рецепт: тӑк пароль, 2FA па пароль-код хәйата ӑн мӑты.'
    }
  },
  // 10. QR-фишинг на объявлении (глава 2)
  {
    id: 'card_qr_choice',
    chapter: 2,
    type: 'choice',
    level: 2,
    topic: 'phishing',
    topicLabel: { ru: 'QR-фишинг', en: 'QR Phishing', kca: 'QR-фишинг' },
    loot: {
      icon: 'compass',
      name: { ru: 'Сканер QR', en: 'QR Scanner', kca: 'QR сканер' },
      desc: { ru: 'Умеет отличать поддельные QR-наклейки!', en: 'Spots fake QR code stickers!', kca: 'Ӑн тәса QR-кодӑт вәӆ!' }
    },
    title: {
      ru: 'Странный QR-код на объявлении у школы',
      en: 'Suspicious QR code on a poster near school',
      kca: 'Ӑшкола хося ӑн тәса QR-код'
    },
    prompt: {
      ru: 'На столбе висит объявление «Бесплатные билеты в кино», а поверх старого QR-кода криво наклеена новая наклейка с адресом kino-priz-86.xyz. Что делать?',
      en: 'A street poster promises "Free movie tickets", with a fresh sticker pasted over the original QR pointing to kino-priz-86.xyz. What should you do?',
      kca: 'Объявлениейн «Вух ӆыпи кино билет» хӑншӑм, QR-код эӆты йиӆуп наклейка kino-priz-86.xyz. Муй вєрӆӑн?'
    },
    mascotTip: {
      ru: 'Мошенники часто клеят свой QR поверх настоящего — всегда проверяй адрес сайта до ввода данных!',
      en: 'Scammers often paste fake QR stickers over real posters — always inspect the URL first!',
      kca: 'Мошенникӑт ӑн тәса QR-наклейка пунӆӑт — оӆӑӊ домен вәньщэ!'
    },
    visual: {
      kind: 'qr_poster',
      heading: { ru: 'БЕСПЛАТНЫЕ БИЛЕТЫ В КИНО!', en: 'FREE MOVIE TICKETS!', kca: 'ВУХ ӅЫПИ КИНО БИЛЕТ!' },
      url: 'https://kino-priz-86.xyz/card-pay',
      note: {
        ru: 'Поверх афиши криво приклеена новая наклейка — сайт просит ввести номер карты для «проверки».',
        en: 'A crooked sticker was pasted over the poster — the page asks for a bank card number to "verify".',
        kca: 'Афиша эӆты йиӆуп наклейка пунсы — сайт «проверка» пӑта карта номер вохӆ.'
      }
    },
    clues: [
      {
        id: 'qr_url',
        match: { ru: 'kino-priz-86.xyz', en: 'kino-priz-86.xyz', kca: 'kino-priz-86.xyz' },
        note: { ru: 'Левый домен .xyz не имеет отношения к настоящему кинотеатру!', en: 'Fake .xyz domain has nothing to do with a real cinema!', kca: 'Ӑн тәса .xyz домен — мошенник сайт!' }
      },
      {
        id: 'qr_card',
        match: { ru: 'номер карты', en: 'bank card number', kca: 'карта номер' },
        note: { ru: 'Для «бесплатных» билетов никогда не просят данные банковской карты!', en: 'Free tickets never require your bank card details!', kca: 'Вух ӆыпи билет пӑта карта номер ӑн вохӆӑт!' }
      }
    ],
    options: [
      { id: 'a', text: { ru: 'Отсканировать и ввести карту родителей — билеты же бесплатные', en: 'Scan it and enter parents’ card — tickets are free', kca: 'Сканируйтты па аӊки карта хӑншты' }, correct: false },
      { id: 'b', text: { ru: 'Не переходить и не вводить данные — это поддельный QR-код (квишинг)', en: 'Do not open or enter data — it is a fake QR scam (quishing)', kca: 'Ӑн ӆәӊты па карта ӑн хӑншты — щит QR-мошенник' }, correct: true },
      { id: 'c', text: { ru: 'Переслать фото кода всем друзьям в чат класса', en: 'Forward the QR photo to the whole class chat', kca: 'Иса юратна QR фото китты' }, correct: false }
    ],
    explanation: {
      ru: 'Это QR-фишинг (квишинг): мошенники клеят свой код поверх афиш и ведут на поддельный сайт для кражи данных карт. Всегда смотри на домен перед переходом.',
      en: 'This is QR phishing (quishing): scammers paste fake stickers over posters to steal card details on lookalike sites.',
      kca: 'Щит QR-фишинг: мошенникӑт йиӆуп QR пунӆӑт па карта вух ӆӑӆьмӑты кӑншӆӑт.'
    }
  },
  // 11. Открытый Wi-Fi в ТЦ (глава 2)
  {
    id: 'card_wifi_tf',
    chapter: 2,
    type: 'truefalse',
    level: 2,
    topic: 'phishing',
    topicLabel: { ru: 'Открытый Wi-Fi', en: 'Public Wi-Fi', kca: 'Публичной Wi-Fi' },
    loot: {
      icon: 'beacon',
      name: { ru: 'Щит Трафика', en: 'Traffic Armor', kca: 'Трафик щит' },
      desc: { ru: 'Не вводит пароли и карты в чужом открытом Wi-Fi!', en: 'Never types passwords or cards on open public Wi-Fi!', kca: 'Йиӆуп Wi-Fi-ӑн пароль ӑн хӑншӆ!' }
    },
    title: {
      ru: 'Бесплатный Wi-Fi без пароля в торговом центре',
      en: 'Free open Wi-Fi at the shopping mall',
      kca: 'ТЦ-ӑн пароль ӆыпи Wi-Fi'
    },
    prompt: {
      ru: 'Утверждение: «Через открытый бесплатный Wi-Fi без пароля в кафе или ТЦ полностью безопасно оплачивать покупки и входить в Госуслуги». Это верно?',
      en: 'Statement: "Using free open Wi-Fi without a password in a mall is completely safe for banking and government accounts." True or False?',
      kca: 'Ясӑӊ: «Пароль ӆыпи Wi-Fi эвӑӆт Госуслуги па банк ӆәӊты иса ёмӑщ». Тәса аӆпа ӑн тәса?'
    },
    mascotTip: {
      ru: 'Подумай: кто угодно в зале может создать фейковую точку Free_WiFi_Mall и перехватывать трафик!',
      en: 'Anyone nearby can create a fake Free_WiFi_Mall hotspot and snoop on unencrypted traffic!',
      kca: 'Хәйат ӑн тәса Free_WiFi_Mall вєрты рӑхӆ па пароль вўты!'
    },
    visual: {
      kind: 'wifi_list',
      ssid: 'Free_WiFi_Mall_VIP',
      note: {
        ru: 'Открытая сеть без замка. После подключения сразу открылось окно: «Войдите через Госуслуги или VK».',
        en: 'Unsecured network without a lock. A popup asks: "Sign in with your account password".',
        kca: 'Замок ӆыпи Wi-Fi. Окно пуншӑс: «Госуслуги аӆпа VK пароль хӑншэ».'
      }
    },
    clues: [
      {
        id: 'wifi_open',
        match: { ru: 'без замка', en: 'without a lock', kca: 'Замок ӆыпи' },
        note: { ru: 'Открытая точка без шифрования может оказаться ловушкой мошенника!', en: 'An open hotspot with no lock can be an attacker’s trap!', kca: 'Замок ӆыпи сеть мошенник тӑхи вәӆты рӑхӆ!' }
      },
      {
        id: 'wifi_login',
        match: { ru: 'Войдите через Госуслуги', en: 'Sign in with your account', kca: 'Госуслуги аӆпа VK пароль' },
        note: { ru: 'Настоящий Wi-Fi в ТЦ не просит пароль от Госуслуг или VK!', en: 'Real mall Wi-Fi never asks for your personal account password!', kca: 'Тәса Wi-Fi Госуслуги пароль ӑн вохӆ!' }
      }
    ],
    correctAnswer: false,
    explanation: {
      ru: 'Неверно! В открытом Wi-Fi злоумышленник может подменить точку доступа и украсть пароли. Для банков, покупок и важных аккаунтов используй мобильный интернет.',
      en: 'False! Attackers can spoof open Wi-Fi hotspots to steal logins. Always use mobile data for banking, shopping, and important accounts.',
      kca: 'Ӑн тәса! Пароль ӆыпи Wi-Fi-ӑн мошенник пароль вўты рӑхӆ. Банк па Госуслуги пӑта мобильной интернет юнтэ.'
    }
  },
  // 12. Фейковый чит / APK с вирусом (глава 2)
  {
    id: 'card_apk_choice',
    chapter: 2,
    type: 'choice',
    level: 2,
    topic: 'game',
    topicLabel: { ru: 'Вирусы и моды', en: 'Malware & Mods', kca: 'Вирусӑт' },
    loot: {
      icon: 'potion',
      name: { ru: 'Антивирус-Изумруд', en: 'Antivirus Emerald', kca: 'Антивирус' },
      desc: { ru: 'Не качает подозрительные .apk читы из чатов!', en: 'Never installs shady .apk cheats from chats!', kca: 'Ӑтӑм .apk файлӑт ӑн вўӆ!' }
    },
    title: {
      ru: '«Чит на бесконечные гемы» — файл free_gems_mod.apk',
      en: '"Unlimited Gems Cheat" — free_gems_mod.apk file',
      kca: '«Вух ӆыпи гемӑт» — free_gems_mod.apk файл'
    },
    prompt: {
      ru: 'В комментариях под видео скинули файл free_gems_mod.apk и написали: «Отключи антивирус и дай доступ к SMS, чтобы гемы пришли». Как поступишь?',
      en: 'A video comment shares free_gems_mod.apk saying: "Disable antivirus and allow SMS access to get gems." What do you do?',
      kca: 'Комментарийӑн free_gems_mod.apk файл китсы: «Антивирус пӑнтэ па SMS доступ мӑэ». Муй вєрӆӑн?'
    },
    mascotTip: {
      ru: 'Зачем моду для игры доступ к твоим SMS и отключение защиты? Чтобы украсть коды банка!',
      en: 'Why would a game mod need access to your SMS and antivirus disabled? To steal codes!',
      kca: 'Муй пӑта юнт мода SMS доступ? Банк кодӑт ӆӑӆьмӑты!'
    },
    visual: {
      kind: 'apk_download',
      filename: 'free_gems_mod_2026.apk',
      size: '4.2 MB',
      note: {
        ru: 'Требуемые разрешения: «Чтение SMS», «Доступ к контактам». Автор просит отключить защиту Google Play.',
        en: 'Requested permissions: "Read SMS", "Access Contacts". Author tells you to disable Play Protect.',
        kca: 'Вохӆ: «SMS ӆўӊӑтты», «Контактӑт». Google Play ӆавӑӆты пӑнтты вохӆ.'
      }
    },
    clues: [
      {
        id: 'apk_ext',
        match: { ru: '.apk', en: '.apk', kca: '.apk' },
        note: { ru: 'Установочный файл из неизвестного источника — главный способ заразить телефон трояном!', en: 'Installing an .apk from an unknown source is the #1 way trojans infect phones!', kca: 'Ӑн вәтӑм тӑхи эвӑӆт .apk файл — вирус!' }
      },
      {
        id: 'apk_sms',
        match: { ru: 'Чтение SMS', en: 'Read SMS', kca: 'SMS ӆўӊӑтты' },
        note: { ru: 'Троян просит доступ к SMS, чтобы тайно перехватывать коды от банков и мессенджеров!', en: 'Trojans request SMS permission to secretly steal banking & messenger codes!', kca: 'Вирус SMS эвӑӆт кодӑт ӆӑӆьмӑты кӑншӆ!' }
      }
    ],
    options: [
      { id: 'a', text: { ru: 'Скачать и отключить защиту на 5 минут ради гемов', en: 'Download and turn off protection for 5 minutes', kca: 'Вўты па 5 минута пӑта ӆавӑӆты пӑнтты' }, correct: false },
      { id: 'b', text: { ru: 'Не скачивать — это троян, игры и моды берут только из официальных магазинов', en: 'Do not download — it is a trojan; install apps only from official stores', kca: 'Ӑн вўты — щит вирус, иса официальной магазин эвӑӆт вўты' }, correct: true },
      { id: 'c', text: { ru: 'Попросить друга сначала проверить файл на своём телефоне', en: 'Ask a friend to test the file on their phone first', kca: 'Юрэн телефон эӆты вәньщты вохты' }, correct: false }
    ],
    explanation: {
      ru: 'Под видом «читов на гемы и робуксы» почти всегда прячут трояны. Они просят доступ к SMS и контактам, чтобы украсть аккаунты и деньги. Качай игры только с официальных площадок.',
      en: 'Fake "free gems cheats" almost always hide trojans that steal SMS codes and accounts. Only install apps from official stores.',
      kca: '«Вух ӆыпи гемӑт» файлӑтн вирус вәӆӆ. Иса официальной магазин эвӑӆт вўты мосӆ.'
    }
  },
  // 13. Угон Telegram через голосование (глава 3)
  {
    id: 'card_vote_choice',
    chapter: 3,
    type: 'choice',
    level: 3,
    topic: 'phishing',
    topicLabel: { ru: 'Угон мессенджера', en: 'Account Hijack', kca: 'Чат ӆӑӆьмӑты' },
    loot: {
      icon: 'scroll',
      name: { ru: 'Кодекс Чатов', en: 'Chat Codex', kca: 'Потӑр книга' },
      desc: { ru: 'Знает ловушку «Проголосуй за племянницу»!', en: 'Knows the "Vote for my niece" hijack trap!', kca: '«Голосование» мошенник вєр вәӆ!' }
    },
    title: {
      ru: '«Проголосуй за мою племянницу в конкурсе!»',
      en: '"Please vote for my niece in a contest!"',
      kca: '«Конкурсӑн ма ӑӊкем пӑта голос мӑэ!»'
    },
    prompt: {
      ru: 'Знакомый прислал ссылку на конкурс талантов. Сайт просит ввести твой номер телефона и 5-значный код, который только что пришёл от Telegram. Что происходит?',
      en: 'An acquaintance sends a contest voting link. The site asks for your phone number and a 5-digit code that just arrived from Telegram. What is happening?',
      kca: 'Юрэн конкурс ссылка китӑс. Сайт телефон номер па Telegram эвӑӆт юхтӑм 5 цифра код вохӆ. Муй щит?'
    },
    mascotTip: {
      ru: 'Если ввести код от Telegram на чужом сайте — мошенник мгновенно войдёт в твой аккаунт!',
      en: 'Typing a Telegram login code on a third-party site instantly hands over your account!',
      kca: 'Telegram код йиӆуп сайтӑн хӑншӆӑн ки — аккаунтэн ӆӑӆьмӑӆӑт!'
    },
    visual: {
      kind: 'chat_snippet',
      sender: 'Дядя Коля (взломан?)',
      tag: { ru: 'Личное сообщение', en: 'Direct message', kca: 'Потӑр' },
      bubble: {
        ru: 'Привет! Выручи, проголосуй за племянницу на konkurs-deti-86.ru — просто введи код из Telegram!',
        en: 'Hi! Please vote for my niece on konkurs-deti-86.ru — just enter the code from Telegram!',
        kca: 'Вўща! konkurs-deti-86.ru эӆты голос мӑэ — Telegram эвӑӆт код хӑншэ!'
      }
    },
    clues: [
      {
        id: 'vote_code',
        match: { ru: 'код из Telegram', en: 'code from Telegram', kca: 'Telegram эвӑӆт код' },
        note: { ru: 'Код от Telegram нужен ТОЛЬКО для входа в твой аккаунт, никогда не для голосований!', en: 'A Telegram code is ONLY for logging into your account, never for voting!', kca: 'Telegram код аӆ аккаунт ӆәӊты пӑта!' }
      },
      {
        id: 'vote_site',
        match: { ru: 'konkurs-deti-86.ru', en: 'konkurs-deti-86.ru', kca: 'konkurs-deti-86.ru' },
        note: { ru: 'Фишинговый сайт-однодневка: аккаунт знакомого уже взломали и шлют спам по его контактам!', en: 'Phishing site: your contact’s account was already hijacked!', kca: 'Фишинг сайт: юрэн аккаунт уша вєрсы!' }
      }
    ],
    options: [
      { id: 'a', text: { ru: 'Ввести код — неудобно отказывать знакомому', en: 'Enter the code to be polite', kca: 'Код хӑншты' }, correct: false },
      { id: 'b', text: { ru: 'Закрыть сайт, никуда не вводить код и позвонить знакомому предупредить о взломе', en: 'Close the site, never enter the code, and warn the contact by phone', kca: 'Сайт пӑнтты, код ӑн хӑншты па телефонн юрэнна ястӑты' }, correct: true },
      { id: 'c', text: { ru: 'Переслать код прямо ему в чат вместо сайта', en: 'Send the code directly to him in chat instead', kca: 'Код чатӑн китты' }, correct: false }
    ],
    explanation: {
      ru: '«Проголосуй в конкурсе» — одна из самых массовых схем угона Telegram. Вводишь код входа на фейковом сайте — и через секунду твой аккаунт уже рассылает просьбы о деньгах всем друзьям.',
      en: '"Vote in a contest" is one of the most common Telegram hijacking scams. Never enter login codes on external websites.',
      kca: '«Конкурсӑн голос мӑэ» — Telegram ӆӑӆьмӑты мошенник вєр. Код йиӆуп сайтӑн хӑншты ӑн рӑхӆ.'
    }
  },
  // 14. ИИ-дипфейк голоса друга (глава 3)
  {
    id: 'card_deepfake_choice',
    chapter: 3,
    type: 'choice',
    level: 3,
    topic: 'hacked',
    topicLabel: { ru: 'ИИ-дипфейк', en: 'AI Deepfake', kca: 'ИИ-дипфейк' },
    loot: {
      icon: 'bell',
      name: { ru: 'Детектор Голоса', en: 'Voice Detector', kca: 'Голос вәтты' },
      desc: { ru: 'Не ведётся на поддельные голосовые нейросети!', en: 'Spots AI-cloned voice scams!', kca: 'ИИ-голос мошенникӑт вәӆ!' }
    },
    title: {
      ru: 'Голосовое от друга: «Срочно скинь 2000 ₽ на карту брата!»',
      en: 'Voice note from a friend: "Urgently send money to my cousin’s card!"',
      kca: 'Юрэн эвӑӆт голос нєпек: «Щимӑщ 2000 ₽ йиӆуп картайн китэ!»'
    },
    prompt: {
      ru: 'Пришло короткое голосовое — голос очень похож на твоего друга, но фраза обрывистая и просит срочно перевести деньги на чужую карту, а трубку не берёт. Что делать?',
      en: 'A short voice note sounds just like your friend, urgently asking to send money to a stranger’s card while refusing to answer calls. What do you do?',
      kca: 'Голос юрэн кємӑн, щит щимӑщ йиӆуп картайн 2000 ₽ вохӆ, телефон ӑн вўӆ. Муй вєрӆӑн?'
    },
    mascotTip: {
      ru: 'Нейросети умеют клонировать голос по 10 секундам старых голосовых! Всегда проверяй звонком или кодовым вопросом.',
      en: 'AI can clone a voice from 10 seconds of old voice notes! Always verify with a real call or secret question.',
      kca: 'Нейросеть голос вєрты рӑхӆ! Телефонн вохэ аӆпа аӊки-ащийн ястӑэ.'
    },
    visual: {
      kind: 'alert_banner',
      title: { ru: 'Входящее голосовое (0:06)', en: 'Incoming Voice Note (0:06)', kca: 'Голос нєпек (0:06)' },
      text: {
        ru: '«Бро, срочно выручи, скинь 2000 ₽ на чужую карту 2202..., говорить не могу, вечером отдам!»',
        en: '"Bro, urgent favor, send money to a stranger’s card right now, can’t talk on phone, I’ll pay back tonight!"',
        kca: '«Юр, щимӑщ 2000 ₽ йиӆуп картайн китэ, телефонн потӑрты ӑн рӑхӆум!»'
      }
    },
    clues: [
      {
        id: 'df_card',
        match: { ru: 'чужую карту', en: 'stranger’s card', kca: 'йиӆуп картайн' },
        note: { ru: 'Перевод на карту незнакомого человека — главный признак взломанного аккаунта!', en: 'Sending money to a stranger’s card is the #1 sign of a hacked account!', kca: 'Йиӆуп хоят карта — аккаунт взлом!' }
      },
      {
        id: 'df_cant_talk',
        match: { ru: 'говорить не могу', en: 'can’t talk on phone', kca: 'потӑрты ӑн рӑхӆум' },
        note: { ru: 'Отказ от живого звонка нужен, чтобы ты не заметил подделку голоса нейросетью!', en: 'Refusing a live call hides the AI voice clone!', kca: 'Телефонн ӑн потӑрӆ — щит ИИ-голос!' }
      }
    ],
    options: [
      { id: 'a', text: { ru: 'Перевести деньги — ведь это точно его голос!', en: 'Send the money — it clearly sounds like him!', kca: 'Вух китты — голос юрэн кємӑн!' }, correct: false },
      { id: 'b', text: { ru: 'Не переводить: позвонить другу по обычной связи или задать личный вопрос, который знает только он', en: 'Do not send money: call them on regular phone or ask a personal question only they know', kca: 'Вух ӑн китты: телефонн вохты аӆпа личной вопрос мӑты' }, correct: true },
      { id: 'c', text: { ru: 'Отправить половину суммы для проверки', en: 'Send half the amount as a test', kca: 'Пєӆӑк вух китты' }, correct: false }
    ],
    explanation: {
      ru: 'Мошенники взламывают аккаунт, скачивают старые голосовые и синтезируют новое сообщение через ИИ. Деньги никогда не переводят на чужую карту без живой проверки звонком.',
      en: 'Scammers clone voices using AI from stolen voice notes. Never send money without verifying on a live phone call or with parents.',
      kca: 'Мошенникӑт ИИ эвӑӆт голос вєрӆӑт. Телефонн ӑн вәньщӑм вух китты ӑн рӑхӆ.'
    }
  },
  // 15. Сортировка: что выдаёт адрес на фото (глава 3)
  {
    id: 'card_geotag_sort',
    chapter: 3,
    type: 'sort',
    level: 2,
    topic: 'privacy',
    topicLabel: { ru: 'Безопасные фото', en: 'Safe Photos', kca: 'Фото ӆавӑӆты' },
    loot: {
      icon: 'map',
      name: { ru: 'Сейф Фото', en: 'Photo Vault', kca: 'Фото сундук' },
      desc: { ru: 'Не палит свой адрес и школу на фотографиях!', en: 'Never leaks home address or school in photos!', kca: 'Фото эвӑӆт хот адрес ӑн китӆ!' }
    },
    title: {
      ru: 'Что можно выложить на фото, а что выдаст твой адрес?',
      en: 'Safe to post in photos vs. reveals your address',
      kca: 'Фотойн муй рӑхӆ, муй хот адрес этӑӆтӆ?'
    },
    prompt: {
      ru: 'Разложи карточки по корзинам: что безопасно выкладывать в соцсеть, а что поможет незнакомцу вычислить, где ты живёшь или учишься.',
      en: 'Sort what is safe to post publicly vs. details that let strangers track your home or school.',
      kca: 'Карточкат корзинайн пунэ: муй выкладывать рӑхӆ, муй хот-ӑшкола этӑӆтӆ.'
    },
    mascotTip: {
      ru: 'Номер школы на бейдже, табличка улицы из окна и геолокация сразу выдают, где тебя найти!',
      en: 'School badges, street signs outside your window, and live geotags reveal your exact location!',
      kca: 'Ӑшкола номер, улица табличка па геолокация хотэн этӑӆтӆӑт!'
    },
    buckets: {
      safe: { ru: 'Безопасно для фото', en: 'Safe to post', kca: 'Рӑхӆ выкладывать' },
      private: { ru: 'Выдаст адрес / школу', en: 'Leaks address / school', kca: 'Хот / ӑшкола этӑӆтӆ' }
    },
    items: [
      { id: 'g1', text: { ru: 'Фото своего рисунка или поделки', en: 'Photo of your drawing or craft', kca: 'Нӑӊ хӑншӑм картинка фото' }, bucket: 'safe' },
      { id: 'g2', text: { ru: 'Вид из окна с табличкой улицы и дома', en: 'Window view showing street & house sign', kca: 'Улица па хот номер пиӆа фото' }, bucket: 'private' },
      { id: 'g3', text: { ru: 'Скриншот постройки в игре', en: 'Screenshot of your game build', kca: 'Юнтӑн вєрӑм хот скриншот' }, bucket: 'safe' },
      { id: 'g4', text: { ru: 'Фото с геолокацией «Я дома сейчас»', en: 'Post with live geotag "Home right now"', kca: 'Геолокация «Ма хотӑн ин»' }, bucket: 'private' },
      { id: 'g5', text: { ru: 'Бейдж с номером школы и ФИО', en: 'School ID badge with school # and full name', kca: 'Ӑшкола номер па ФИО бейдж' }, bucket: 'private' },
      { id: 'g6', text: { ru: 'Фото заката в парке без геометки', en: 'Park sunset photo with no geotag', kca: 'Геометка ӆыпи хӑтӆ фото' }, bucket: 'safe' }
    ],
    explanation: {
      ru: 'Даже без указания адреса в тексте незнакомец легко найдёт тебя по табличке дома из окна, бейджу школы или включённой геометке. Отключай геолокацию в камере для соцсетей.',
      en: 'Strangers can locate you through street signs in window photos, school badges, or live geotags. Keep location tags off for public posts.',
      kca: 'Хот номер, ӑшкола бейдж па геолокация хотэн этӑӆтӆӑт. Камерайн геолокация пӑнтэ.'
    }
  },
  // 16. Порядок действий: настройка 2FA (глава 3)
  {
    id: 'card_2fa_order',
    chapter: 3,
    type: 'order',
    level: 3,
    topic: 'password',
    topicLabel: { ru: 'Защита 2FA', en: '2FA Setup', kca: '2FA ӆавӑӆты' },
    loot: {
      icon: 'padlock',
      name: { ru: 'Ключ 2FA', en: '2FA Master Key', kca: '2FA ключ' },
      desc: { ru: 'Умеет настраивать двухфакторную защиту!', en: 'Knows how to set up two-factor security!', kca: '2FA тәса вєрты вәӆ!' }
    },
    title: {
      ru: 'Как правильно включить двухфакторную защиту (2FA)?',
      en: 'How to enable Two-Factor Authentication (2FA) properly?',
      kca: '2FA ӆавӑӆты хуты тәса вєрты?'
    },
    prompt: {
      ru: 'Расставь 4 шага в правильном порядке, чтобы надёжно защитить свой мессенджер или игровой аккаунт.',
      en: 'Put the 4 steps in the right order to secure your messenger or gaming account.',
      kca: 'Аккаунт тӑк ӆавӑӆты пӑта 4 вєр тәса тӑхийн пунэ.'
    },
    mascotTip: {
      ru: 'Сначала заходим в настройки безопасности, затем включаем 2FA, придумываем облачный пароль и сохраняем резерв с родителями!',
      en: 'First open Security Settings, enable 2FA, set a strong cloud password, and save backup access with parents!',
      kca: 'Оӆӑӊ настройки пуншэ, 2FA вєрэ, пароль хӑншэ па аӊки-ащи пиӆа ӆавӑӆэ!'
    },
    steps: [
      { id: 'f1', text: { ru: 'Открыть раздел «Настройки → Конфиденциальность / Безопасность»', en: 'Open "Settings → Privacy & Security"', kca: '«Настройки → Безопасность» пуншты' }, correctPos: 0 },
      { id: 'f2', text: { ru: 'Включить «Двухэтапная аутентификация (2FA)»', en: 'Turn on "Two-Step Verification (2FA)"', kca: '«2FA» (Двухэтапная защита) вєрты' }, correctPos: 1 },
      { id: 'f3', text: { ru: 'Задать сложный облачный пароль (отличный от пароля почты)', en: 'Create a strong cloud password (different from email)', kca: 'Тӑк облачной пароль хӑншты' }, correctPos: 2 },
      { id: 'f4', text: { ru: 'Привязать почту восстановления и записать резерв вместе с родителями', en: 'Link recovery email and save backup with parents', kca: 'Почта пунты па аӊки-ащи пиӆа ӆавӑӆты' }, correctPos: 3 }
    ],
    explanation: {
      ru: 'С включённой 2FA мошенник не сможет войти в твой аккаунт, даже если узнает основной пароль или перехватит SMS — без второго пароля вход заблокирован!',
      en: 'With 2FA enabled, a scammer cannot log in even if they steal your password or SMS code!',
      kca: '2FA пиӆа мошенник аккаунтэна ӆәӊты ӑн рӑхӆ!'
    }
  },
  // 17. Кибер-верстак 3x3: защита нового смартфона (глава 3)
  {
    id: 'card_craft_phone',
    chapter: 3,
    type: 'craft',
    level: 3,
    topic: 'privacy',
    topicLabel: { ru: 'Защита смартфона', en: 'Phone Security', kca: 'Телефон ӆавӑӆты' },
    loot: {
      icon: 'phone',
      name: { ru: 'Броня Смартфона', en: 'Phone Armor', kca: 'Телефон броня' },
      desc: { ru: 'Скрафтил идеальную настройку смартфона!', en: 'Crafted the ultimate phone security setup!', kca: 'Телефон пӑта тӑк броня вєрӑн!' }
    },
    title: {
      ru: 'Кибер-верстак: защити новый смартфон!',
      en: 'Cyber Crafting Table: armor up your new phone!',
      kca: 'Кибер-верстак: йиӆуп телефон ӆавӑӆэ!'
    },
    prompt: {
      ru: 'Тебе подарили новый телефон. Положи на верстак ровно 3 правильных блока, чтобы скрафтить Броню Смартфона!',
      en: 'You got a new phone. Place exactly 3 right security blocks on the table to craft Phone Armor!',
      kca: 'Йиӆуп телефон мӑсы. Броня пӑта верстак эӆты 3 тәса блок пунэ!'
    },
    mascotTip: {
      ru: 'Смартфону нужны: блокировка экрана, приложения только из официального магазина и выключенные геотеги в соцсетях!',
      en: 'A safe phone needs: screen lock, official app store only, and geotags turned off for social posts!',
      kca: 'Телефон пӑта: экран пароль, официальной магазин па геолокация пӑнтты!'
    },
    craftTarget: {
      icon: 'armor',
      name: { ru: 'Броня Смартфона', en: 'Phone Armor', kca: 'Телефон броня' }
    },
    needCount: 3,
    ingredients: [
      { id: 'p1', icon: 'key', correct: true, label: { ru: 'PIN / отпечаток экрана', en: 'Screen PIN / fingerprint', kca: 'Экран PIN-код' } },
      { id: 'p2', icon: 'shield', correct: true, label: { ru: 'Только официальный Store', en: 'Official App Store only', kca: 'Официальной магазин' } },
      { id: 'p3', icon: 'spyglass', correct: true, label: { ru: 'Выкл. геотеги в постах', en: 'Disable post geotags', kca: 'Геолокация пӑнтты' } },
      { id: 'p4', icon: 'emerald', correct: false, label: { ru: 'Качать .apk из комментов', en: 'Install .apk from comments', kca: 'Коммент эвӑӆт .apk' } },
      { id: 'p5', icon: 'chest', correct: false, label: { ru: 'Без пароля на экране', en: 'No screen lock', kca: 'Пароль ӆыпи экран' } },
      { id: 'p6', icon: 'book', correct: false, label: { ru: 'Авто-вход в открытый Wi-Fi', en: 'Auto-join open Wi-Fi', kca: 'Иса Wi-Fi ӆәӊты' } }
    ],
    explanation: {
      ru: 'Правильная защита телефона: блокировка экрана, установка приложений только из официальных магазинов и отключённые геометки для публичных фото.',
      en: 'Smart phone protection: screen lock, official app stores only, and geotags disabled for public photos.',
      kca: 'Телефон ӆавӑӆты: экран PIN, официальной магазин па геолокация ӆыпи фото.'
    }
  },
  // 18. ФИНАЛЬНЫЙ БОСС-КРАФТ: Полный Кибер-Щит Югры (глава 3)
  {
    id: 'card_craft_boss',
    chapter: 3,
    type: 'craft',
    level: 3,
    topic: 'hacked',
    topicLabel: { ru: 'Финал • Босс-крафт', en: 'Final Boss Craft', kca: 'Финал • Верстак' },
    loot: {
      icon: 'star',
      name: { ru: 'Звезда КиберЩита', en: 'CyberShield Star', kca: 'КиберЩит звезда' },
      desc: { ru: 'Собрал финальный Кибер-Щит Югры!', en: 'Forged the final Yugra CyberShield!', kca: 'Югра Кибер-Щит вєрӑн!' }
    },
    title: {
      ru: 'Финальный крафт: собери Главный Кибер-Щит Югры!',
      en: 'Final Craft: forge the Ultimate Yugra CyberShield!',
      kca: 'Финал верстак: Югра Вән Кибер-Щит вєрэ!'
    },
    prompt: {
      ru: 'Против тебя все уловки мошенников сразу! Положи на верстак 4 главных правила кибергероя и отбей финальную атаку!',
      en: 'Every scammer trick at once! Place the 4 golden rules of a cyber-hero on the table to win the final mission!',
      kca: 'Иса мошенникӑт юхӑтсӑт! 4 вән правило верстак эӆты пунэ па щит вєрэ!'
    },
    mascotTip: {
      ru: 'Выбирай всё, что про проверку, секретность кодов и помощь родителей — и никаких «секретных» переводов!',
      en: 'Pick verification, keeping codes secret, checking domains, and telling parents!',
      kca: 'Вәньщты, код ӑн мӑты, домен вәньщты па аӊки-ащийн ястӑты пириэ!'
    },
    craftTarget: {
      icon: 'star',
      name: { ru: 'Звезда КиберЩита', en: 'CyberShield Star', kca: 'КиберЩит звезда' }
    },
    needCount: 4,
    ingredients: [
      { id: 'b1', icon: 'shield', correct: true, label: { ru: 'Никому не давать SMS-код', en: 'Never share SMS codes', kca: 'SMS-код ӑн мӑты' } },
      { id: 'b2', icon: 'spyglass', correct: true, label: { ru: 'Проверять адрес сайта', en: 'Always inspect URLs', kca: 'Домен вәньщты' } },
      { id: 'b3', icon: 'heart', correct: true, label: { ru: 'Звонить и говорить взрослым', en: 'Verify by call & tell parents', kca: 'Телефонн па аӊки-ащийн ястӑты' } },
      { id: 'b4', icon: 'key', correct: true, label: { ru: 'Сложный пароль + 2FA', en: 'Strong password + 2FA', kca: 'Тӑк пароль + 2FA' } },
      { id: 'b5', icon: 'chest', correct: false, label: { ru: 'Скрыть всё от родителей', en: 'Hide it from parents', kca: 'Аӊки-ащийн ӑн ястӑты' } },
      { id: 'b6', icon: 'emerald', correct: false, label: { ru: 'Оплатить «доставку приза»', en: 'Pay "prize delivery fee"', kca: 'Приз доставка пӑта китты' } }
    ],
    explanation: {
      ru: 'Поздравляем! Ты собрал Главный Кибер-Щит Югры: проверяй ссылки, береги пароли и 2FA, никому не диктуй SMS-коды и всегда советуйся с родителями.',
      en: 'Congrats! You forged the Ultimate Yugra CyberShield: check URLs, protect passwords & 2FA, never share SMS codes, and verify with parents.',
      kca: 'Ёмӑщ вєр! Нӑӊ Югра Вән Кибер-Щит вєрӑн!'
    }
  }
];

// описание 3 глав-биомов (по 6 карточек в каждой главе = 18 миссий)
const CARD_CHAPTERS = [
  {
    id: 1,
    icon: 'trees',
    badge: '1',
    title: { ru: 'Деревня Югры', en: 'Yugra Village', kca: 'Югра кәрт' },
    sub: { ru: 'База: игры, пароли, данные', en: 'Basics: games, passwords, privacy', kca: 'Оӆӑӊ вєрӑт' }
  },
  {
    id: 2,
    icon: 'pickaxe',
    badge: '2',
    title: { ru: 'Пещера Фишинга', en: 'Phishing Cave', kca: 'Фишинг тӑхи' },
    sub: { ru: 'QR, Wi-Fi, вирусы и ссылки', en: 'QR, Wi-Fi, mods & links', kca: 'QR, Wi-Fi, ссылкат' }
  },
  {
    id: 3,
    icon: 'castle',
    badge: '3',
    title: { ru: 'Цитадель Профи', en: 'Pro Citadel', kca: 'Вән тӑхи' },
    sub: { ru: 'Дипфейки, 2FA, верстак-босс', en: 'Deepfakes, 2FA & final craft', kca: 'Дипфейк, 2FA, финал' }
  }
];

// назначаем главы первым 8 базовым карточкам и сортируем по порядку глав
(function assignChapters() {
  const chMap = {
    card_game_scam: 1,
    card_password_tf: 1,
    card_personal_sort: 1,
    card_bullying_choice: 1,
    card_shopping_tf: 1,
    card_craft_account: 1,
    card_phishing_match: 2,
    card_qr_choice: 2,
    card_wifi_tf: 2,
    card_apk_choice: 2,
    card_domains_match: 2,
    card_hacked_order: 2,
    card_vote_choice: 3,
    card_deepfake_choice: 3,
    card_geotag_sort: 3,
    card_2fa_order: 3,
    card_craft_phone: 3,
    card_craft_boss: 3
  };
  const orderList = Object.keys(chMap);
  DEFAULT_CARDS.forEach(c => {
    if (!c.chapter) c.chapter = chMap[c.id] || 1;
  });
  DEFAULT_CARDS.sort((a, b) => {
    const ia = orderList.indexOf(a.id);
    const ib = orderList.indexOf(b.id);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
})();
