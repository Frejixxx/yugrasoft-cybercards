// переводы всех 7 чатов на английский и хантыйский
// применяются поверх основных сценариев при смене языка

const SCENARIO_I18N = {
  en: {
    skins: {
      title: 'CS2 & Standoff Drop',
      shortTitle: 'Free skins / giveaway',
      preview: 'Yo! You won a Butterfly Knife | Fade. Claim in 15 min...',
      callBehavior: {
        statusText: 'Cannot call bots',
        note: 'This is an automated bot — you cannot verify it with a phone call.'
      },
      profile: {
        bio: 'Skins & gold giveaway 2026. No support.',
        meta: 'Bot created 2 days ago • Not verified'
      },
      achievement: {
        title: 'Anti-Phishing',
        desc: 'Spotted the fake link and protected your gaming account from a free-skin scam.'
      },
      winLesson: 'Scammers swap 1–2 letters in links (stearn instead of steam) and add a countdown timer so you rush. Nobody gives away rare skins for your login and SMS/Guard code.',
      steps: {
        start: {
          messages: [
            { text: 'Yo! Your profile got picked in our season anniversary drop. You won a <b>Butterfly Knife | Fade</b> (or 5000 gold)!' },
            {
              text: 'Claim your prize within <b>15 minutes</b> or it goes to another player! Just log in on the reward portal:',
              linkCard: {
                siteName: 'Stearn Community • Gift Drop',
                title: 'Claim Butterfly Knife | Fade',
                desc: 'Sign in with your game account for instant inventory delivery.',
                failData: {
                  title: 'YOU GOT HACKED!',
                  subtitle: 'Clicked a phishing link and lost your account',
                  reason: 'This is a fake lookalike website. As soon as you enter your login, password, and code, scammers steal your account, change the email, and take all your items.',
                  flags: [
                    'Fake address: it says <b>stearn</b> instead of <b>steam</b> (r + n looks like m).',
                    'Fake rush: "only 15 minutes left" is meant to make you stop thinking.',
                    'Too good to be true: nobody hands out expensive skins in DMs for free.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Wait, why does the link say "stearn" instead of "steam"?' },
            {
              text: 'Whoa, lucky me! Opening the link and logging in right now',
              fail: {
                title: 'YOU GOT HACKED!',
                subtitle: 'Your account was stolen via a fake login page',
                reason: 'That site had a fake login box. You handed scammers your password and full account access.',
                flags: [
                  'Letter swap in the link: <b>stearn</b> instead of <b>steam</b> plus <b>-drop.ru</b>.',
                  'You never entered any giveaway, yet a huge prize dropped out of nowhere.',
                  'The bot rushes you with a timer so you don’t inspect the link.'
                ]
              }
            },
            { text: 'Cool! What do I need to enter to claim it?' }
          ]
        },
        question_domain: {
          messages: [
            { text: 'Oh don’t worry bro) That’s our official mirror site for fast zero-fee drops! 47 players already claimed theirs today.' },
            {
              text: 'Hurry up, timer is almost zero — <b>2 minutes</b> left! Open the link and enter your login + SMS/Guard code:',
              linkCard: {
                siteName: 'Stearn Fast Mirror',
                title: 'Quick Login — 01:54 Left',
                desc: 'Enter your login and confirmation code to receive the trade',
                failData: {
                  title: 'YOU GOT HACKED!',
                  subtitle: 'Official "fast drop mirrors" do not exist',
                  reason: 'You spotted the weird link, but fell for the "mirror" excuse. Real platforms never ask for passwords or 2FA codes on random sites.',
                  flags: [
                    'The "fast mirror" excuse is a classic phishing lie.',
                    'Entering a Steam Guard / SMS code on a fake site hands over your account.',
                    'Time pressure ("2 minutes left") ramped up as soon as you asked questions.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'There are no "mirrors". This is phishing — reporting and blocking you!', winReply: 'Bot blocked! Sharp eye for fake links!' },
            {
              text: 'Okay, I’ll hurry and enter my login and code before it expires',
              fail: {
                title: 'YOU GOT HACKED!',
                subtitle: 'You shouldn’t have trusted the "official mirror" excuse',
                reason: 'Your gut feeling was right at first, but the countdown tricked you. As soon as you typed the code, the scammer took over your account.',
                flags: [
                  'If the link is fake, no story about a "mirror" makes it real.',
                  'Never enter 2FA/Guard codes anywhere except the official app.',
                  'Scammers yell "2 minutes left!" to make you panic-click.'
                ]
              }
            },
            { text: 'Send proof that you’re a real bot, then I’ll think about it' }
          ]
        },
        ask_details: {
          incomingSms: {
            sender: 'Steam',
            tag: 'Account Security',
            text: 'Confirmation code to REMOVE mobile authenticator and change email: K8X4P. If this wasn’t you, NEVER share this code!'
          },
          messages: [
            { text: 'I already started auto-delivery! You’re getting a one-time confirmation code by SMS right now.' },
            { text: 'Just paste it here in chat or on the site above — and the knife hits your inventory in 10 seconds!' }
          ],
          choices: [
            { text: 'I read the SMS — it says "code to REMOVE Steam authenticator"! Nice try, blocked!', winReply: 'Bullseye! Reading the SMS text immediately exposed the hack attempt.' },
            {
              text: 'Got code K8X4P, here you go — send the knife!',
              fail: {
                title: 'YOU GOT HACKED!',
                subtitle: 'You didn’t read the SMS and turned off your own account protection',
                reason: 'The SMS from Steam clearly warned: code K8X4P was for REMOVING your authenticator and changing email, not claiming a skin.',
                flags: [
                  'The SMS literally said: "to remove mobile authenticator and change email".',
                  'Receiving a gift/trade never requires sharing an SMS security code.',
                  'Fake link <b>stearn-community-drop.ru</b> in the first message.'
                ]
              }
            },
            { text: 'Wait, why would a gift trade need an SMS code?' }
          ]
        },
        fake_proofs: {
          messages: [
            { text: 'Here’s a review: "Got it in 2 mins, thx admin!!" — from Mike228. Look, 1 minute left, take it now or bye!' }
          ],
          choices: [
            { text: 'Hilarious fake "proof". Blocking and reporting you!', winReply: 'Nice! Scammers type fake reviews in 5 seconds.' },
            {
              text: 'Well if there are reviews, okay, opening the link...',
              fail: {
                title: 'YOU GOT SCAMMED!',
                subtitle: 'Fake reviews and screenshots take 5 seconds to make',
                reason: 'Scammers write hundreds of fake reviews themselves. Real prizes never ask for your password on shady websites.',
                flags: [
                  'A random text "review" proves nothing.',
                  'Pressuring you: "last minute or goodbye".',
                  'Fake link <b>stearn-community-drop.ru</b>.'
                ]
              }
            }
          ]
        }
      }
    },

    blogger: {
      title: 'Vika Lime',
      shortTitle: 'Blogger with fake checkmark',
      preview: 'Hiii!! I’m texting giveaway winners myself — you won an iPhone 16 Pro...',
      callBehavior: {
        statusText: 'Call declined by user',
        note: '"Vika" instantly hung up — a real blogger personally chatting with you wouldn’t hide from verification.'
      },
      profile: {
        bio: 'Official channel 2.4M subs • Promo: @pr_lime',
        meta: 'Account created this month • Telegram Premium',
        badgeAlert: '<b>Warning: NOT official verification!</b><br>The icon next to the name is just a Telegram Premium emoji status (pack <i>"BlueChecks"</i>). Any scammer can buy it. A real blogger wouldn’t use a weird handle like <code>@vika_lime_giveaway_vip</code>.'
      },
      achievement: {
        title: 'Badge Hunter',
        desc: 'Spotted the fake Telegram Premium emoji checkmark and refused to pay a fake "delivery fee".'
      },
      winLesson: 'With Telegram Premium anyone can place a blue checkmark emoji next to their name to pretend to be a famous blogger. Always inspect the badge and @username, read bank SMS texts, and remember: real prizes never charge a fee.',
      steps: {
        start: {
          messages: [
            { text: 'Hiii!! While my manager is asleep, I decided to DM the winners of my secret subscriber giveaway myself!' },
            { text: 'Your profile got picked — you won an <b>iPhone 16 Pro 256GB</b> (or $500 to your card if you prefer cash).' },
            { text: 'Let’s arrange delivery fast, I have a shoot in 20 minutes! What do you pick — iPhone or cash?' }
          ],
          choices: [
            { text: 'Whoa Vika, is that really you?! Let’s do the iPhone, what do I do?' },
            { text: 'Hold on, why does your checkmark look weird and your handle is @vika_lime_giveaway_vip?' },
            { text: 'Cash to my card sounds better! Where do I send my number?' }
          ]
        },
        question_badge: {
          messages: [
            { text: 'Haha look at Sherlock here) That’s the new colored TG badge for mega-bloggers, your app just needs an update! And this is my backup account because my main DMs are full.' },
            {
              text: 'Honestly I don’t have time to prove it, 3 more winners are waiting. Just pay the tiny <b>$5 shipping insurance</b> here so the courier reserves your parcel:',
              linkCard: {
                siteName: 'CDEK • Prize Delivery',
                title: 'Pay Shipping Insurance — $5',
                desc: 'Sender: Vika Lime (Giveaway 2026). Winner #4.',
                failData: {
                  title: 'YOU GOT SCAMMED!',
                  subtitle: 'Fake blogger using a Telegram Premium emoji checkmark',
                  reason: 'The real Vika knows nothing about this chat. A scammer bought a checkmark emoji and built a fake delivery page to steal your card details and wipe out the balance.',
                  flags: [
                    '<b>Fake checkmark:</b> it’s a Telegram Premium emoji, not real verification (tap it to check).',
                    '<b>Weird handle:</b> <code>@vika_lime_giveaway_vip</code> instead of the official channel.',
                    '<b>"Pay $5 for prize shipping"</b> — real winners NEVER pay to receive a prize.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Ha, I tapped your checkmark — it’s a Premium emoji! Real bloggers don’t ask for fees on shady sites. Blocked!', winReply: 'Awesome catch! Checking the badge and @username instantly exposes fake bloggers.' },
            {
              text: 'Well $5 for an iPhone is nothing, okay I’ll pay via the link!',
              fail: {
                title: 'YOU GOT SCAMMED!',
                subtitle: 'Instead of $5, scammers drained the entire card',
                reason: 'Fake courier websites don’t stop at $5 — they steal card numbers and SMS codes to empty the whole balance.',
                flags: [
                  'Telegram Premium emoji status disguised as a verification tick.',
                  'Excuses about a "backup account" and "outdated app".',
                  'Asking for a delivery fee on a fake site <b>cdek-prize-delivery86.ru</b>.'
                ]
              }
            }
          ]
        },
        ask_fee: {
          messages: [
            { text: 'Awesome! I already handed your iPhone to the courier, the system just asks winners to pay a tiny <b>$5 insurance fee</b> to stop fake entries.' },
            {
              text: 'Here’s the payment link, takes 1 minute — look, I even have the official checkmark, don’t worry:',
              linkCard: {
                siteName: 'CDEK • Prize Delivery',
                title: 'Pay Shipping Insurance — $5',
                desc: 'Sender: Vika Lime. Enter card details to confirm delivery.',
                failData: {
                  title: 'YOU GOT SCAMMED!',
                  subtitle: 'The fake "delivery payment" drained the card',
                  reason: 'Real bloggers never ask for a "shipping fee". That checkmark is a bought Premium emoji and the site steals bank cards.',
                  flags: [
                    'Tapping the badge shows it is a <b>Telegram Premium emoji</b>, not verification.',
                    'Suspicious handle <code>@vika_lime_giveaway_vip</code> and brand-new account.',
                    'Demanding money to claim a "free" prize.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Wait, that’s a fake Premium checkmark and a shady site! Not paying anything — blocked.', winReply: 'Great job! Bragging "look at my checkmark" is a classic scammer move.' },
            {
              text: 'Okay, $5 is worth it for an iPhone 16 Pro, paying now!',
              fail: {
                title: 'YOU GOT SCAMMED!',
                subtitle: 'There is no iPhone — you handed card details to scammers',
                reason: 'Fake blogger giveaways steal millions by asking for a small "delivery fee" and stealing the card + SMS code.',
                flags: [
                  'Fake checkmark (Telegram Premium emoji).',
                  'Famous bloggers don’t DM random people from backup accounts.',
                  'Any fee/tax/insurance for a giveaway prize is 100% a scam.'
                ]
              }
            },
            { text: 'Can you record a quick video note right now and say my name?' }
          ]
        },
        ask_fee_money: {
          incomingSms: {
            sender: '900 (Bank)',
            tag: 'Payment Confirmation',
            text: 'NEVER share code 7391. Confirm CHARGE of 14,900 ₽ (transfer to unknown card). Do not share codes to "receive" money!'
          },
          messages: [
            { text: 'Sure, I can transfer the cash right now! Because it’s a business account, your bank just texted you a code to link your card for the payout.' },
            { text: 'Send that 4-digit code right here and the money lands in a minute! Waiting 3 minutes.' }
          ],
          choices: [
            { text: 'I read the bank SMS — it says CHARGE 14,900 ₽, not receive! And your badge is fake. Blocked!', winReply: 'Brilliant! Reading the bank SMS caught the theft instantly.' },
            {
              text: 'Got code 7391, sending it now! Waiting for my prize!',
              fail: {
                title: 'YOU LOST 14,900 ₽!',
                subtitle: 'You didn’t read the SMS — it was a charge, not a payout',
                reason: 'The bank SMS clearly warned: "Confirm CHARGE of 14,900 ₽". You NEVER need an SMS code to receive money.',
                flags: [
                  'The SMS literally said: charge of 14,900 ₽.',
                  'The checkmark was a fake Telegram Premium emoji.',
                  'You never share SMS codes to receive a transfer.'
                ]
              }
            },
            { text: 'Record a video note first to prove it’s really you' }
          ]
        },
        refuse_circle: {
          messages: [
            { text: 'Ugh I’m getting my makeup done, no video notes right now) I’m literally trying to give you a free iPhone — if you don’t want it, I’ll pick someone else in 2 minutes!' }
          ],
          choices: [
            { text: 'Got it: can’t send a video, fake Premium badge, asking for money. Bye scammer!', winReply: '10/10! Refusing video + fake badge + fee = 100% scam.' },
            {
              text: 'Okay sorry, don’t be mad — paying the fee right now!',
              fail: {
                title: 'YOU GOT SCAMMED!',
                subtitle: 'The scammer guilt-tripped you into paying',
                reason: '"Don’t want it? I’ll give it to someone else!" is classic manipulation. Fake bloggers can never send a real video calling you by name.',
                flags: [
                  'Refusal to confirm identity with a live video.',
                  'Telegram Premium emoji instead of real verification.',
                  'Asking for a delivery fee for a free prize.'
                ]
              }
            }
          ]
        }
      }
    },

    friend: {
      title: 'Max (Classmate)',
      shortTitle: 'Hacked friend + AI voice',
      preview: 'Bro, hey! Help me out urgently, lend me 1500 ₽ till tonight...',
      callBehavior: {
        statusText: 'Call declined (busy)',
        note: 'They hung up right away! Hacked accounts never answer real calls because the real Max doesn’t even know someone is texting from his account.'
      },
      profile: {
        bio: 'Khanty-Mansiysk • CS2',
        meta: 'Last seen recently • Shared group: Class 9B'
      },
      achievement: {
        title: 'Fake Detector',
        desc: 'Spotted the AI deepfake voice message, checked the SMS, and exposed a hacked friend’s account.'
      },
      winLesson: 'Scammers can clone a friend’s voice using AI from old voice messages! If a friend asks for money to a stranger’s card or an SMS code — call them on their real phone or ask a personal question.',
      steps: {
        start: {
          messages: [
            { text: 'Bro, hey! Need your help super urgently' },
            { text: 'Can you send 1500 ₽ till tonight? I’m stuck at the mall and my card glitched. Send it to my buddy’s card, I’ll pay back 2000 ₽ tonight, promise!' }
          ],
          choices: [
            { text: 'Wait, you sound weird... Send a voice message or let’s call?' },
            { text: 'Sure thing, send the card number!' },
            { text: 'What was our 7th-grade math teacher’s name?' }
          ]
        },
        ask_voice: {
          incomingSms: {
            sender: 'Telegram',
            tag: 'Login Code',
            text: 'Telegram login code: 64192. NEVER share this code with anyone — attackers will get full access to your account!'
          },
          messages: [
            {
              text: '',
              voiceMessage: {
                speechText: 'Hey bro, really urgent, phone is lagging, please vote for my sister and send the SMS code, big help.',
                transcript: '“Hey... bro... really urgent, phone is lagging, please vote for my sister and send the SMS code...” (flat, robotic tone — sounds like an AI voice clone / deepfake)'
              }
            },
            { text: 'Can’t call, too noisy here! If you don’t have cash, help for free: I entered your number to vote for my sister, you just got an SMS code — send it here please!' },
            {
              text: 'Or click the contest site:',
              linkCard: {
                siteName: 'Young Talents Contest 2026',
                title: 'Vote for Contestant #14!',
                desc: 'Sign in with your messenger to prevent fake votes.',
                failData: {
                  title: 'YOU GOT HACKED!',
                  subtitle: 'Your messenger was stolen via a fake voting link',
                  reason: '"Vote for my sister" is one of the biggest account-theft scams. The voice note was cloned by AI from Max’s old voice messages.',
                  flags: [
                    'The voice sounded robotic (AI deepfake), and they decline real phone calls.',
                    'The SMS literally said: "Telegram login code", NOT a voting code.',
                    'A shady link asking to log in to your messenger.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Hold on! The voice sounds fake and the SMS is a Telegram login code! Max was hacked!', winReply: 'Perfect! You checked the SMS sender and didn’t trust the AI voice clone.' },
            {
              text: 'Okay, since you sent a voice note I trust you — here’s code 64192',
              fail: {
                title: 'YOU GOT HACKED!',
                subtitle: 'AI cloned Max’s voice and you handed over your Telegram login code',
                reason: 'Scammers take 10 seconds of old voice messages to make an AI deepfake! The SMS clearly warned: "Telegram login code — never share it".',
                flags: [
                  'Never trust a voice note alone — AI can clone voices easily.',
                  'The SMS explicitly said it was a login code for YOUR Telegram.',
                  'Trying to call (phone icon above) makes the scammer hang up.'
                ]
              }
            }
          ]
        },
        send_card: {
          messages: [
            { text: 'Thanks bro!! Here’s the card: <b>2200 7004 8812 9410</b> (recipient Ruslan K., my buddy). Hurry, the cashier line is staring!' }
          ],
          choices: [
            {
              text: 'Transfer 1500 ₽ to Ruslan K.’s card',
              fail: {
                title: 'YOU LOST 1500 ₽!',
                subtitle: 'That wasn’t Max — his account was hacked',
                reason: 'You sent money to a scammer’s mule card. The real Max didn’t even know someone was messaging all his friends.',
                flags: [
                  'Asking to send money to a stranger’s card ("my buddy").',
                  'Artificial rush ("line at checkout") and promising extra cash back.',
                  'Didn’t verify with a phone call first.'
                ]
              }
            },
            { text: 'Wait, who is Ruslan K.? I’m calling Max’s phone first!', winReply: 'Smart brake! A stranger’s name on the card is a huge red flag.' },
            { text: 'Send a voice note so I know it’s really you' }
          ]
        },
        secret_question: {
          incomingSms: {
            sender: 'Telegram',
            tag: 'Login Code',
            text: 'Telegram login code: 64192. NEVER share this code with anyone — attackers will get full access to your account!'
          },
          messages: [
            { text: 'Why are you messing around right now?? No time to remember, I’m at checkout! Send cash or at least the SMS code you just got so I can recover my account!' }
          ],
          choices: [
            { text: 'Ha! Real Max would know in a second, and the SMS is for MY Telegram! Hacked — blocked!', winReply: 'Brilliant check! Secret question + SMS check exposed the hacker 100%.' },
            {
              text: 'Okay don’t be mad, here’s code 64192',
              fail: {
                title: 'YOU GOT HACKED!',
                subtitle: 'The hacker dodged your question and stole your Telegram code',
                reason: 'Your test worked — the hacker didn’t know the answer and got angry. The SMS clearly said it was a login code for YOUR Telegram.',
                flags: [
                  'SMS explicitly warned: "Telegram login code, never share".',
                  'Dodging a simple personal question + getting angry.',
                  'Constant rushing.'
                ]
              }
            }
          ]
        }
      }
    },

    mom: {
      title: 'Mom',
      shortTitle: 'Normal chat (stay calm check)',
      preview: 'Hi! How was school? Can you grab bread on your way home?',
      callBehavior: {
        statusText: 'Mom answered the call (0:06)',
        note: '“Hi honey! Yes, it’s me, everything’s fine — grab milk too if it’s not heavy!” — identity 100% verified.'
      },
      profile: {
        bio: 'At work until 18:00',
        meta: 'In your contacts • Family group "Home"'
      },
      achievement: {
        title: 'Common Sense',
        desc: 'Told a real message from Mom apart from scammers without panicking.'
      },
      winLesson: 'Cyber safety doesn’t mean blocking everyone — it means checking real clues. Here there are no shady links, no stranger cards, no SMS code requests, and Mom happily answers the phone.',
      falseAlarmReason: 'You tried to block a completely safe contact! Mom didn’t ask for SMS codes, didn’t send weird links, didn’t ask for money transfers, and answers the phone.',
      steps: {
        start: {
          messages: [
            { text: 'Hi! How was school today, how did the test go?' },
            { text: 'Could you stop by the corner store for bread on your way home? I left cash on the kitchen table this morning. And please send your club schedule tonight so I know when to pick you up Thursday.' }
          ],
          choices: [
            { text: 'Hi Mom! Test went well. I’ll grab the bread and snap a photo of my schedule tonight.', winReply: 'Spot on! A completely normal family chat with zero red flags.' },
            { text: 'Mom, just in case — is this really you? What’s our cat’s name?' },
            { text: 'No, you’re a scammer! I trust nobody, blocking this chat!' }
          ]
        },
        mom_check: {
          messages: [
            { text: 'Haha Barsik, the one who knocked over my plant yesterday) Good on you for being careful! I don’t need any codes or transfers, just grab bread and let’s have dinner.' }
          ],
          choices: [
            { text: 'Awesome, now I’m sure! Buying bread and heading home soon.', winReply: 'Great balance: checked politely, verified it’s safe, and replied normally.' }
          ]
        },
        false_alarm_choice: {
          messages: [
            { text: 'Hey, what’s up? I just asked for bread with the cash on the table — no codes, no links. Tap the phone icon at the top and call me right now!' }
          ],
          choices: [
            { text: 'Oops sorry Mom, got nervous! I’ll buy bread and be home soon.', winReply: 'Glad you sorted it out! Always check whether actual red flags are present.' }
          ]
        }
      }
    },

    dropper: {
      title: 'Artem | Jobs 86',
      shortTitle: 'Easy cash trap (money mule)',
      preview: 'Hey! Want an easy after-school job? 4000 ₽ a day...',
      callBehavior: {
        statusText: 'User disabled incoming calls',
        note: 'Money mule recruiters always hide their phone number, refuse calls, and stay anonymous.'
      },
      profile: {
        bio: 'Easy side job for teens • Daily payouts • DM me',
        meta: 'Hidden phone number • No shared groups'
      },
      achievement: {
        title: 'Unbreakable',
        desc: 'Refused a money-mule ("dropper") trap and stayed clear of crime and debt.'
      },
      winLesson: 'Receiving strangers’ transfers on your bank card for a cut or "renting out your card" is illegal money-muling (dropper crime). It leads to bank bans, police investigations, and parents having to repay stolen money.',
      steps: {
        start: {
          messages: [
            { text: 'Hey! Saw you in the city chat. Want an easy after-school gig? <b>3000–5000 ₽ a day</b> from your phone, zero experience needed.' },
            { text: 'Totally legal, crypto/P2P stuff. Got your own bank card? Just receive transfers on your card and forward them to our accounts. <b>You keep 10% of every transfer!</b>' }
          ],
          choices: [
            { text: 'Wait, isn’t that being a money mule (dropper)? Moving stolen money through my card?' },
            { text: 'Sounds cool! What do I do to start today?' },
            {
              text: 'Deal! Sending my card number right now',
              fail: {
                title: 'YOU BECAME A MONEY MULE!',
                subtitle: 'Your card was used in a criminal scam',
                reason: 'Scammers moved stolen money through your card. Police trace the card owner first — you. All accounts get blocked and your family owes the stolen money in court.',
                flags: [
                  'Promising 3000–5000 ₽/day to a student for doing nothing.',
                  'Receiving strangers’ transfers and forwarding them is classic <b>money muling (dropper crime)</b>.',
                  '"Crypto / P2P" is a common cover story for dirty money.'
                ]
              }
            }
          ]
        },
        gaslight: {
          messages: [
            { text: 'Nah man, what dropper) It’s just a regular crypto exchange, we just hit transfer limits and hire helpers.' },
            { text: '150 kids around the region do this, nobody got caught! Plus you’re under 18 — nothing happens, worst case you get a new card. Easy money for a new phone. In?' }
          ],
          choices: [
            { text: 'Liar! Money muling brings police and huge debt to both me and my parents even at 15. Blocked!', winReply: 'Strong answer! "You’re under 18, nothing will happen" is a blatant recruiter lie.' },
            {
              text: 'Well if everyone does it and nothing happens — okay, let’s try once',
              fail: {
                title: 'YOU BECAME A MONEY MULE!',
                subtitle: '"Just once" is enough for bank bans and police trouble',
                reason: '"Nothing happens under 18" is the #1 recruiter lie. Banks blacklist mules and parents have to pay back stolen funds by court order.',
                flags: [
                  'Pressuring with "everyone does it".',
                  'Dangerous myth: "nothing happens if you’re under 18".',
                  'Passing strangers’ money through your card is always illegal.'
                ]
              }
            }
          ]
        },
        ask_card: {
          messages: [
            { text: 'Nice, love the hustle! Two options: forward transfers on your card, OR hand us the card + banking app login and get <b>7000 ₽ cash today</b>.' },
            { text: 'Send photos of both sides of your card or login info and cash drops today.' }
          ],
          choices: [
            { text: 'Card photos and bank login?! That’s straight-up illegal money muling. Bye!', winReply: 'Well done! Never share your bank card or banking app access.' },
            {
              text: 'Whoa 7000 ₽ right away! Sending my card photos and login',
              fail: {
                title: 'YOU GOT DRAGGED INTO A CRIME!',
                subtitle: 'You sold your bank card to criminals',
                reason: 'Criminals will launder millions through your account, and YOU (and your parents) are legally responsible for every transaction.',
                flags: [
                  'Offering to buy or rent your bank card is 100% criminal recruiting.',
                  'Asking for photos of both sides of the card and bank password.',
                  'Huge "easy money" from an anonymous stranger.'
                ]
              }
            },
            { text: 'Do you even have an official contract?' }
          ]
        }
      }
    },

    gosuslugi: {
      title: 'Gosuslugi | Security',
      shortTitle: 'Fake support / Gosuslugi',
      preview: 'URGENT! Unauthorized login detected on your Gosuslugi account...',
      callBehavior: {
        statusText: 'Cannot call bots',
        note: 'Official Gosuslugi NEVER messages people through messenger bots.'
      },
      profile: {
        bio: 'Urgent Gosuslugi account protection service.',
        meta: 'Unofficial bot • Gosuslugi does not use messenger bots'
      },
      achievement: {
        title: 'Cyber Guardian',
        desc: 'Read the SMS, ignored fear tactics, and kept your Gosuslugi code safe.'
      },
      winLesson: 'Gosuslugi, banks, and police NEVER message you in chat apps, never threaten you with loans, and never ask for SMS codes. Always check your account directly in the official app.',
      steps: {
        start: {
          messages: [
            { text: '<b>URGENT SECURITY ALERT</b>\nUnauthorized login detected on your Gosuslugi account from <i>iPhone 15 Pro (unknown region)</i>.' },
            {
              text: 'Attackers are trying to steal your family’s data and take out loans. Cancel the login on our protected portal with an SMS code within <b>3 minutes</b>:',
              linkCard: {
                siteName: 'Gosuslugi — Protection',
                title: 'Cancel Unauthorized Login',
                desc: 'Emergency session block and personal data protection.',
                failData: {
                  title: 'YOU GOT SCAMMED!',
                  subtitle: 'You clicked a fake Gosuslugi website',
                  reason: 'The real address is ONLY short <b>gosuslugi.ru</b>. Sites with extra words like <i>gosuslugi-vhod-proverka.ru</i> are built by scammers to steal your password and SMS code.',
                  flags: [
                    'Extra words in the address: the real site is only <b>gosuslugi.ru</b>.',
                    'Gosuslugi never messages users first in chat apps.',
                    'Fear tactics ("family loans", "3 minutes left") to make you panic.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Wait, since when does Gosuslugi text people from a random bot?' },
            {
              text: 'Oh no! Clicking the link and entering the SMS code right now!',
              fail: {
                title: 'YOU GOT HACKED!',
                subtitle: 'Panic made you hand over your account',
                reason: 'There was no real hack — scammers invented it to scare you into typing your password and code on their fake page.',
                flags: [
                  'Fake address with extra words <b>gosuslugi-vhod-proverka.ru</b> instead of <b>gosuslugi.ru</b>.',
                  'Government services do not chat via messenger bots.',
                  'Demanding an SMS code using scary threats.'
                ]
              }
            },
            { text: 'Not clicking anything. Closing this chat and checking the official Gosuslugi app myself!', winReply: 'Nerves of steel! Checking manually in the official app is the gold standard.' }
          ]
        },
        intimidation: {
          incomingSms: {
            sender: 'Gosuslugi',
            tag: 'Password Reset',
            text: 'Code to RESET PASSWORD for Gosuslugi: 482910. NEVER share this code — support staff will never ask for it!'
          },
          messages: [
            { text: 'This is an emergency channel of the Cyber Department! If you ignore this, loans will be taken out on your parents!' },
            { text: 'A 6-digit cancellation code was just sent to your phone. <b>Type it in this chat RIGHT NOW</b>! 45 seconds left!' }
          ],
          choices: [
            { text: 'I read the SMS — it’s a PASSWORD RESET code, not a cancellation! Blocked!', winReply: 'Brilliant! You stayed calm, read the SMS, and caught the scammer lying.' },
            {
              text: 'Okay okay, don’t touch my parents! Here’s the SMS code: 482910',
              fail: {
                title: 'YOU GOT SCAMMED!',
                subtitle: 'You gave scammers the code to reset your Gosuslugi password',
                reason: 'The SMS explicitly warned: "Code to RESET PASSWORD. Never share it with anyone".',
                flags: [
                  'The SMS literally warned: password reset code, never share.',
                  'Scaring you about your parents and loans is a classic scammer tactic.',
                  'Fake "Cyber Department" bot in a messenger.'
                ]
              }
            },
            { text: 'If you’re real support — tell me my birthday right now' }
          ]
        },
        angry_scammer: {
          messages: [
            { text: 'Don’t waste an officer’s time! All data is classified for security. Last chance — send the SMS code or click the link!' }
          ],
          choices: [
            { text: 'Nice act, "officer". The SMS says support never asks for codes — blocked!', winReply: '10/10! The scammer folded as soon as you checked the SMS.' },
            {
              text: 'Sorry, here’s the SMS code: 482910',
              fail: {
                title: 'YOU GOT SCAMMED!',
                subtitle: 'Real agencies never bully you or ask for SMS codes',
                reason: 'Acting angry ("officer on duty!") is cheap theater. The SMS clearly said it was a password reset code.',
                flags: [
                  'Aggression and threats ("last chance!") in chat.',
                  'SMS text clearly stated it was a password reset.',
                  'Shady bot handle <b>@gosuslugi_sec_help_bot</b>.'
                ]
              }
            }
          ]
        }
      }
    },

    director: {
      title: 'Elena Viktorovna (Vice Principal)',
      shortTitle: 'Fake teacher / "secret check"',
      preview: 'Hello! Our school is having an urgent inspection from the Department...',
      callBehavior: {
        statusText: 'Call declined by user',
        note: 'The "Vice Principal" instantly hung up! Scammers create a fake account using a real teacher’s name and photo.'
      },
      profile: {
        bio: 'Vice Principal for Student Affairs',
        meta: 'Account created yesterday • Not in your contacts • Hidden phone'
      },
      achievement: {
        title: 'Panic-Proof',
        desc: 'Spotted the fake teacher account and didn’t fall for a "secret inspection".'
      },
      winLesson: 'The "Fake Principal / Teacher" scam copies a teacher’s name from the school website, forbids telling parents ("secret check!"), and tries to get your password or SMS code. Always double-check with your parents or real teacher!',
      steps: {
        start: {
          messages: [
            { text: 'Hello! Sorry for texting from my new work account. Our school is having an urgent electronic diary inspection right now.' },
            { text: 'They found a strange data leak under your name. A security inspector will contact you soon — <b>don’t tell anyone, not even your parents</b>, until it’s over or your family will be called to a hearing!' }
          ],
          choices: [
            { text: 'Wait, why are you texting from a brand-new account and forbidding me to tell my parents?' },
            { text: 'Oh no, what do I have to do so they don’t call a hearing?' },
            { text: 'There are no "secret checks" without parents! I’m asking my real teacher and Mom, and blocking this fake.', winReply: 'Awesome composure! Forbidding you to tell parents is the #1 sign of a scammer.' }
          ]
        },
        pressure_secret: {
          messages: [
            { text: 'It’s confidential during the check! Please don’t argue with adults — just confirm your school diary login on this link so we clear your name:' },
            {
              text: 'Do it right now, I submit the report in 5 minutes:',
              linkCard: {
                siteName: 'School Diary Check',
                title: 'Confirm Student Account',
                desc: 'Sign in with Gosuslugi so your family isn’t called to a hearing.',
                failData: {
                  title: 'YOU GOT SCAMMED!',
                  subtitle: 'That was a fake Vice Principal account',
                  reason: 'The real teacher knows nothing about this! A scammer copied her name from the school website, made an account yesterday, and used authority pressure to lure you onto a fake site.',
                  flags: [
                    'Forbidding you to tell parents is 100% a scam (real teachers ALWAYS involve parents!).',
                    'Account created yesterday, hidden number, weird handle <code>@ev_zavuch_school_reserve</code>.',
                    'Shady link <b>dnevnik-srochno-vhod.ru</b> — not the real school portal.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Hold on — account made yesterday, shady link, and you forbid telling parents! Fake — blocked!', winReply: 'Bravo! No real teacher ever demands secrets from parents or logins on shady sites.' },
            {
              text: 'Okay Elena Viktorovna, sorry — opening the link and logging in!',
              fail: {
                title: 'YOU GOT SCAMMED!',
                subtitle: 'Authority pressure tricked you into giving away your password',
                reason: 'Scammers say "don’t argue with adults" and "tell nobody" so students feel scared to ask their parents. The account is fake and the site steals passwords.',
                flags: [
                  'Demanding silence from parents.',
                  'Profile created yesterday; calling them gets instantly declined.',
                  'Shady link <b>dnevnik-srochno-vhod.ru</b>.'
                ]
              }
            }
          ]
        },
        fake_doc: {
          incomingSms: {
            sender: 'Gosuslugi',
            tag: 'Account Login',
            text: 'Gosuslugi login code: 904512. If you didn’t request this, NEVER share it — not even with "school staff"!'
          },
          messages: [
            { text: 'Good, glad you’re listening! I just submitted the form — you got a 6-digit confirmation code. Send it here fast so we close this without calling your parents!' }
          ],
          choices: [
            { text: 'I read the SMS — that’s a Gosuslugi login, not a school check! And your account is from yesterday. Blocked!', winReply: 'Great work! Checking the SMS shattered the scammer’s story.' },
            {
              text: 'Here’s the SMS code: 904512, just don’t call my parents!',
              fail: {
                title: 'YOU GOT HACKED!',
                subtitle: 'Fear of "calling parents" made you give away your Gosuslugi code',
                reason: 'Real schools never hide issues from parents and never ask for Gosuslugi codes. The SMS clearly warned not to share it.',
                flags: [
                  'SMS warned: "Gosuslugi login code. Never share with anyone".',
                  'Fear manipulation ("we’ll close it without parents").',
                  'Brand-new fake account created yesterday.'
                ]
              }
            }
          ]
        }
      }
    }
  },

  kca: {
    skins: {
      title: 'CS2 & Standoff Дроп',
      shortTitle: 'Вух ӆыпи скинӑт / донат',
      preview: 'Вўща! Нӑӊэн скин-нож выпал. 15 минутайн вўэ...',
      callBehavior: {
        statusText: 'Бота телефонӑн вохты ӑн рӑхӆ',
        note: 'Щит автомат бот — телефонӑн вәньщты ӑн рӑхӆ.'
      },
      profile: {
        bio: 'Скинӑт па голда мӑты 2026.',
        meta: '2 хӑтӆ оӆӑӊӑн вєрсы • Верификация ӑнтєм'
      },
      achievement: {
        title: 'Анти-фишинг',
        desc: 'Ӑн тәса ссылка кӑншсэн па аккаунтэн ӆавӑӆсэн!'
      },
      winLesson: 'Мошенникӑт ссылкайн буквайт пєӆӑк пунӆӑт (steam ӆыпи stearn) па таймер пунӆӑт. Вух ӆыпи скин пӑта пароль па SMS-код мӑты ӑн рӑхӆ!',
      steps: {
        start: {
          messages: [
            { text: 'Вўща! Нӑӊ профилен <b>Нож-бабочка | Градиент</b> (аӆпа 5000 голда) вўс!' },
            {
              text: 'Приз <b>15 минутайн</b> вўты мӑсӆ! Щи ссылкайн аккаунта ӆәӊэ:',
              linkCard: {
                siteName: 'Stearn Community • Gift Drop',
                title: 'Нож-бабочка | Градиент вўты',
                desc: 'Скин вўты пӑта аккаунта ӆәӊэ.',
                failData: {
                  title: 'АККАУНТЭН ВЎСЫ!',
                  subtitle: 'Фишинг ссылкайн мӑнсӑн',
                  reason: 'Щит ӑн тәса фишинг сайт! Пароль хӑншты юпийн мошенник аккаунтэн вўӆӆы.',
                  flags: [
                    'Ӑн тәса адрес: <b>steam</b> ӆыпи <b>stearn</b> хӑншсы.',
                    'Таймер «15 минута» — нӑӊэн ӑн нумӑсты пӑта.',
                    'Вух ӆыпи вән приз хәят па ӑн мӑӆ.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Пәта! Муй пӑта ссылкайн «steam» ӆыпи «stearn» хӑншсы?' },
            {
              text: 'Ёмӑщ! Ссылкайн мӑнӆум па пароль хӑншӆум!',
              fail: {
                title: 'АККАУНТЭН ВЎСЫ!',
                subtitle: 'Мошенник парольэн вўс',
                reason: 'Щи сайтӑн ӑн тәса форма — нӑӊ парольэн мошенника мӑсэн.',
                flags: [
                  'Ссылкайн <b>stearn</b> (<b>steam</b> ӆыпи).',
                  'Розыгрышӑн ӑн вәӆсэн, а приз «юхӑтс».',
                  'Бот таймерн щимӑщ тәӆ.'
                ]
              }
            },
            { text: 'Ёмӑщ! Муй хӑншты мӑсӆ приз вўты пӑта?' }
          ]
        },
        question_domain: {
          messages: [
            { text: 'Ӑн пӑӆэ, бро! Щит «официальной зеркало», 47 хоят ин вўсӑт!' },
            {
              text: 'Єӆӆы, <b>2 минута</b> хӑщӑс! Ссылкайн ӆәӊэ па SMS/Guard код хӑншэ:',
              linkCard: {
                siteName: 'Stearn Fast Mirror',
                title: 'Єӆӆы ӆәӊты — 01:54 хӑщӑс',
                desc: 'Логин па код хӑншэ',
                failData: {
                  title: 'АККАУНТЭН ВЎСЫ!',
                  subtitle: '«Зеркало» ӑнтєм — щит ӑн тәса!',
                  reason: 'Тәса сайтӑт йиӆуп адресӑн пароль па код ӑн вохӆӑт.',
                  flags: [
                    '«Зеркало» — мошенник моньщ.',
                    'SMS/Guard код йиӆуп сайтӑн хӑншты ӑн рӑхӆ.',
                    'Таймер «2 минута» — пӑӆтӑпты вєр.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: '«Зеркало» ӑнтєм! Щит фишинг — блока пунӆум!', winReply: 'Бот пӑнтсы! Тәса вєр!' },
            {
              text: 'Ёмӑщ, 2 минутайн логин па код хӑншӆум!',
              fail: {
                title: 'АККАУНТЭН ВЎСЫ!',
                subtitle: '«Зеркало» моньща эвӑӆт пароль мӑсэн',
                reason: 'Код хӑншты юпийн мошенник аккаунтэн пєӆӑк пунӑс.',
                flags: [
                  'Ӑн тәса ссылка — щит фишинг.',
                  'SMS/Guard код хәйата ӑн мӑӆўв.',
                  'Таймерн щимӑщ тәӆ.'
                ]
              }
            },
            { text: 'Пруф китэ — тәса бот аӆпа ӑн?' }
          ]
        },
        ask_details: {
          incomingSms: {
            sender: 'Steam',
            tag: 'Аккаунт ӆавӑӆты',
            text: 'Аутентификатор пӑнтты па почта пєӆӑк пунты код: K8X4P. Хәйата ӑн ястӑэ!'
          },
          messages: [
            { text: 'Приз китты вєр пуншсум! Ин нӑӊ телефона SMS-код юхӑтӆ.' },
            { text: 'Щи код тӑта чата хӑншэ — 10 секундайн нож нӑӊэн вәӆӆ!' }
          ],
          choices: [
            { text: 'SMS ӆўӊӑтсум — тӑта «аутентификатор пӑнтты код» хӑншсы! Блока пунӆум!', winReply: 'Пәмащипа! SMS ӆўӊӑтты — тәса вєр!' },
            {
              text: 'Код K8X4P юхӑтс, вўэ — нож китэ!',
              fail: {
                title: 'АККАУНТЭН ВЎСЫ!',
                subtitle: 'SMS ӑн ӆўӊӑтсэн па код мӑсэн',
                reason: 'SMS нєпекӑн хӑншсы: K8X4P — аутентификатор пӑнтты код! Мошенник аккаунтэн вўс.',
                flags: [
                  'SMS нєпекӑн: «аутентификатор пӑнтты код».',
                  'Приз вўты пӑта SMS-код ӑн мӑсӆ.',
                  'Ӑн тәса ссылка <b>stearn-community-drop.ru</b>.'
                ]
              }
            },
            { text: 'Муй пӑта приз пӑта SMS-код мӑсӆ?' }
          ]
        },
        fake_proofs: {
          messages: [
            { text: 'Вәньщэ отзыв: «2 минутайн юхӑтс, спс!!» — Ваня228. 1 минута хӑщӑс, єӆӆы вўэ!' }
          ],
          choices: [
            { text: 'Щит ӑн тәса отзыв! Блока пунӆум!', winReply: 'Ёмӑщ! Мошенник отзыв 5 секундайн хӑншӆ.' },
            {
              text: 'Отзыв вәӆ ки — ссылкайн ӆәӊӆум...',
              fail: {
                title: 'МОШЕННИК ВЎС!',
                subtitle: 'Ӑн тәса отзыв эвӑӆт мӑнсӑн',
                reason: 'Мошенникӑт ӑн тәса отзывӑт ӆыв хӑншӆӑт.',
                flags: [
                  'Ӑн вәтӑм хоят отзыв — ӑн пруф.',
                  '«1 минута хӑщӑс» — щимӑщ тәты вєр.',
                  'Ӑн тәса ссылка <b>stearn-community-drop.ru</b>.'
                ]
              }
            }
          ]
        }
      }
    },

    blogger: {
      title: 'Вика Лайм',
      shortTitle: 'Блогер (ӑн тәса галочка)',
      preview: 'Вўща!! Нӑӊ iPhone 16 Pro вўсэн...',
      callBehavior: {
        statusText: 'Телефон ӑн вўсы',
        note: '«Вика» телефон пӑнтӑс — тәса блогер щиты ӑн вєрӆ.'
      },
      profile: {
        bio: 'Канал 2.4 млн • Официальной акк',
        meta: 'Щи тыӆӑщӑн вєрсы • Telegram Premium',
        badgeAlert: '<b>Вәньщэ: щит ӐН ТӘСА верификация!</b><br>Галочка — щит Telegram Premium эмодзи-статус. Хәят па пунты вєритӆ!'
      },
      achievement: {
        title: 'Галочка вәтты хоят',
        desc: 'Ӑн тәса Premium-галочка кӑншсэн па 490 ₽ ӑн китсэн!'
      },
      winLesson: 'Telegram Premium эмодзи-галочка хәят па пунты вєритӆ. Тәса приз пӑта вух ӑн вохӆӑт па банк SMS-код хәйата ӑн мӑӆўв!',
      steps: {
        start: {
          messages: [
            { text: 'Вўща!! Ма нӑӊэн хӑншӆум — нӑӊ розыгрышӑн <b>iPhone 16 Pro</b> (аӆпа 50 000 ₽ картайн) вўсэн!' },
            { text: '20 минутайн мӑнты мӑсӆум — муй пириӆӑн: айфон аӆпа вух?' }
          ],
          choices: [
            { text: 'Вика, щит тәса нӑӊ?! Айфон мӑсты — муй вєрты?' },
            { text: 'Пәта, муй пӑта нӑӊ галочкан странной па ник @vika_lime_giveaway_vip?' },
            { text: '50 000 ₽ картайн ёмӑщ! Номер хута китты?' }
          ]
        },
        question_badge: {
          messages: [
            { text: 'Щит йиӆуп блогер галочка! Посылка пӑта <b>490 ₽</b> страховка щи ссылкайн мӑсэ:' ,
              linkCard: {
                siteName: 'СДЭК • Приз китты',
                title: 'Доставка пӑта — 490 ₽',
                desc: 'Вика Лайм эвӑӆт посылка.',
                failData: {
                  title: 'ВУХЭН ВЎСЫ!',
                  subtitle: 'Щит ӑн тәса блогер (Premium-галочка)',
                  reason: 'Тәса Вика щи чат ӑн вәӆӆы. Галочка — эмодзи, а сайт карта эвӑӆт иса вух вўӆӆы.',
                  flags: [
                    '<b>Ӑн тәса галочка:</b> Telegram Premium эмодзи.',
                    'Странной ник <code>@vika_lime_giveaway_vip</code>.',
                    'Приз пӑта <b>490 ₽</b> вохӆ — щит мошенник!'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Галочка вәньщсум — щит Premium-эмодзи! 490 ₽ ӑн мӑӆум — блока пунӆум!', winReply: 'Ёмӑщ! Галочка па ник вәньщты — тәса вєр!' },
            {
              text: '490 ₽ айфон пӑта — мӑӆум ссылкайн!',
              fail: {
                title: 'ВУХЭН ВЎСЫ!',
                subtitle: 'Карта эвӑӆт иса вух вўсы',
                reason: 'Щи ӑн тәса сайт карта эвӑӆт иса вух вўӆӆы.',
                flags: [
                  'Premium эмодзи-галочка.',
                  '490 ₽ приз пӑта вохӆ.'
                ]
              }
            }
          ]
        },
        ask_fee: {
          messages: [
            { text: 'Айфон курьера мӑсум, тәп <b>490 ₽</b> страховка щи ссылкайн мӑсэ:',
              linkCard: {
                siteName: 'СДЭК • Приз китты',
                title: 'Доставка пӑта — 490 ₽',
                desc: 'Карта номер хӑншэ.',
                failData: {
                  title: 'ВУХЭН ВЎСЫ!',
                  subtitle: 'Ӑн тәса сайт карта эвӑӆт вух вўс',
                  reason: 'Тәса приз пӑта вух ӑн мӑӆўв. Галочка — Premium-эмодзи.',
                  flags: [
                    'Premium эмодзи-галочка.',
                    '490 ₽ приз пӑта вохӆ.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Нӑӊ галочкан ӑн тәса па сайт фишинг! Блока пунӆум!', winReply: 'Ёмӑщ! Тәса вєр!' },
            {
              text: '490 ₽ мӑӆум iPhone пӑта!',
              fail: {
                title: 'ВУХЭН ВЎСЫ!',
                subtitle: 'Айфон ӑнтєм — карта эвӑӆт вух вўсы',
                reason: 'Приз пӑта вух вохты — иса ӑн тәса мошенник вєр!',
                flags: ['Premium-галочка.', '490 ₽ вохӆ.']
              }
            },
            { text: 'Видео-кружок китэ па ма нємэм ястӑэ!' }
          ]
        },
        ask_fee_money: {
          incomingSms: {
            sender: '900 (Банк)',
            tag: 'Банк операция',
            text: 'Код 7391 хәйата ӑн ястӑэ! 14 900 ₽ КАРТА ЭВӐӅТ ВЎТЫ код!'
          },
          messages: [
            { text: '50 000 ₽ китӆум! Ин банк SMS-код китӑс — щи 4 цифра тӑта чата хӑншэ!' }
          ],
          choices: [
            { text: '900 SMS ӆўӊӑтсум — тӑта 14 900 ₽ ВЎТЫ код! Блока пунӆум!', winReply: 'Пәмащипа! SMS ӆўӊӑтты — тәса вєр!' },
            {
              text: 'Код 7391 юхӑтс, вўэ!',
              fail: {
                title: '14 900 ₽ ВЎСЫ!',
                subtitle: 'SMS ӑн ӆўӊӑтсэн — карта эвӑӆт вух вўсы',
                reason: '900 SMS нєпекӑн хӑншсы: 14 900 ₽ вўты код! Вух вўты пӑта SMS-код ӑн мӑсӆ.',
                flags: ['SMS нєпекӑн 14 900 ₽ вўты хӑншсы.', 'Premium-галочка.']
              }
            },
            { text: 'Видео-кружок китэ!' }
          ]
        },
        refuse_circle: {
          messages: [
            { text: 'Видео китты ӑн вєритӆум! Ӑн мӑсӆ ки — 2 минутайн йиӆуп хоята мӑӆум!' }
          ],
          choices: [
            { text: 'Видео ӑн китӆӑн, галочка ӑн тәса, 490 ₽ вохӆӑн. Блока пунӆум!', winReply: '10/10! Тәса вєр!' },
            {
              text: '490 ₽ мӑӆум!',
              fail: {
                title: 'ВУХЭН ВЎСЫ!',
                subtitle: 'Мошенник ӑн тәса вєр',
                reason: 'Тәса блогер видео китты вєритӆ па 490 ₽ ӑн вохӆ.',
                flags: ['Видео ӑн китӑс.', '490 ₽ вохӆ.']
              }
            }
          ]
        }
      }
    },

    friend: {
      title: 'Макс (одноклассник)',
      shortTitle: 'Взлом юр + дипфейк',
      preview: 'Бро, вўща! 1500 ₽ щимӑщ китэ...',
      callBehavior: {
        statusText: 'Телефон пӑнтсы',
        note: 'Взлом аккаунт телефон ӑн вўӆ — тәса Макс щи чат ӑн вәӆӆы!'
      },
      profile: {
        bio: 'Ханты-Мансийск • CS2',
        meta: '9Б класс чатӑн вәӆӆ'
      },
      achievement: {
        title: 'Фейк вәтты хоят',
        desc: 'Нейросеть голос па SMS вәньщсэн, взлом юр кӑншсэн!'
      },
      winLesson: 'Мошенникӑт нейросеть эвӑӆт юр голос вєрты вєритӆӑт! Юр вух аӆпа SMS-код вохӆ ки — телефонӑн вохэ па вәньщэ!',
      steps: {
        start: {
          messages: [
            { text: 'Бро, вўща! Щимӑщ нётты мӑсӆ!' },
            { text: '1500 ₽ китэ пж, ма карта ӑн рәпитӆ. Ма юр картайн китэ, итн 2000 ₽ вєртӆум!' }
          ],
          choices: [
            { text: 'Пәта, странной хӑншӆӑн... Голос китэ аӆпа телефонӑн потӑртӆўв?' },
            { text: 'Ёмӑщ, карта номер китэ!' },
            { text: '7 класс математика утӆты нє нєм муй?' }
          ]
        },
        ask_voice: {
          incomingSms: {
            sender: 'Telegram',
            tag: 'Telegram ӆәӊты код',
            text: 'Telegram ӆәӊты код: 64192. Хәйата ӑн ястӑэ — аккаунтэн вўӆӆӑт!'
          },
          messages: [
            {
              text: '',
              voiceMessage: {
                transcript: '«Вўща... бро... щимӑщ мӑсӆ, телефон ӑн рәпитӆ, SMS-код китэ...» (странной робот голос — дипфейк!)'
              }
            },
            { text: 'Телефонӑн потӑртты ӑн вєритӆум! Конкурс пӑта SMS-код юхӑтс — тӑта чата китэ!',
              linkCard: {
                siteName: 'Конкурс 2026',
                title: 'Голосование №14',
                desc: 'Мессенджер эвӑӆт ӆәӊэ.',
                failData: {
                  title: 'TELEGRAM ВЎСЫ!',
                  subtitle: 'Ӑн тәса конкурс ссылка',
                  reason: 'Голос — нейросеть дипфейк, а SMS — нӑӊ Telegram ӆәӊты код!',
                  flags: ['Дипфейк голос.', 'SMS: Telegram ӆәӊты код.', 'Ӑн тәса ссылка.']
                }
              }
            }
          ],
          choices: [
            { text: 'Голос странной, а SMS Telegram ӆәӊты код! Макс взломсы — блока пунӆум!', winReply: 'Ёмӑщ! Дипфейк па SMS тәса вәньщсэн!' },
            {
              text: 'Голос юхӑтс — код 64192 вўэ!',
              fail: {
                title: 'TELEGRAM ВЎСЫ!',
                subtitle: 'Нейросеть голос эвӑӆт код мӑсэн',
                reason: 'SMS нєпекӑн хӑншсы: Telegram ӆәӊты код, хәйата ӑн мӑэ!',
                flags: ['Дипфейк голос.', 'SMS Telegram ӆәӊты код.']
              }
            }
          ]
        },
        send_card: {
          messages: [
            { text: 'Пәмащипа! Карта: <b>2200 7004 8812 9410</b> (Руслан К., ма юр). Єӆӆы китэ!' }
          ],
          choices: [
            {
              text: '1500 ₽ Руслан К. картайн китты',
              fail: {
                title: '1500 ₽ ВЎСЫ!',
                subtitle: 'Щит ӑн Макс — аккаунт взломсы',
                reason: 'Йиӆуп хоят картайн вух китты ӑн рӑхӆ — оӆӑӊӑн телефонӑн вохэ!',
                flags: ['Йиӆуп хоят карта.', 'Телефонӑн ӑн вохсэн.']
              }
            },
            { text: 'Муй Руслан К.? Оӆӑӊӑн Макса телефонӑн вохӆум!', winReply: 'Тәса вєр! Йиӆуп хоят карта — красный флаг!' },
            { text: 'Голос китэ — тәса Макс аӆпа ӑн?' }
          ]
        },
        secret_question: {
          incomingSms: {
            sender: 'Telegram',
            tag: 'Telegram ӆәӊты код',
            text: 'Telegram ӆәӊты код: 64192. Хәйата ӑн ястӑэ!'
          },
          messages: [
            { text: 'Муй вохӆӑн?! Кассайн ӆоӆӆум! Вух китэ аӆпа SMS-код китэ!' }
          ],
          choices: [
            { text: 'Тәса Макс вәтӆы, а SMS — Telegram код! Блока пунӆум!', winReply: 'Пәмащипа! Тәса проверка!' },
            {
              text: 'Код 64192 вўэ!',
              fail: {
                title: 'TELEGRAM ВЎСЫ!',
                subtitle: 'Мошенник SMS-код вўс',
                reason: 'SMS нєпекӑн хӑншсы: Telegram ӆәӊты код!',
                flags: ['SMS Telegram код.', 'Вопрос ӑн вәтӑс.']
              }
            }
          ]
        }
      }
    },

    mom: {
      title: 'Аӊки (Мама)',
      shortTitle: 'Тәса потӑр (проверка)',
      preview: 'Вўща! Ӑшколайн муй? Хот юшӑн нянь вўэ...',
      callBehavior: {
        statusText: 'Аӊки телефон вўс (0:06)',
        note: '«Вўща! Щит ма, иса ёмӑщ, нянь вўэ!» — тәса аӊки!'
      },
      profile: {
        bio: 'Рәпатайн 18:00 вәнта',
        meta: 'Контактытӑн вәӆӆ • Хот чат'
      },
      achievement: {
        title: 'Тәса нумӑс',
        desc: 'Тәса аӊки потӑр мошенник эвӑӆт ёмӑщ вәтсэн!'
      },
      winLesson: 'Иса хоятӑт блока пунты ӑн мӑсӆ! Тӑта ссылка ӑнтєм, SMS-код ӑн вохӆ, а телефонӑн аӊки ястӑӆ.',
      falseAlarmReason: 'Щит тәса аӊки! Тӑта мошенник вєр ӑнтєм: SMS-код ӑн вохӆ, ссылка ӑнтєм, телефонӑн ястӑӆ.',
      steps: {
        start: {
          messages: [
            { text: 'Вўща! Ӑшколайн иса ёмӑщ?' },
            { text: 'Хот юшӑн лапкайн нянь вўэ? Вух пасан эӆты хӑщсум. Итн расписание китэ.' }
          ],
          choices: [
            { text: 'Вўща, аӊки! Иса ёмӑщ, нянь вўӆум па итн расписание китӆум.', winReply: 'Тәса! Щит ёмӑщ хот потӑр!' },
            { text: 'Аӊки, вәньщӆум — миӊ кошка нєм муй?' },
            { text: 'Нӑӊ мошенник! Блока пунӆум!' }
          ]
        },
        mom_check: {
          messages: [
            { text: 'Хаха, Барсик! Ёмӑщ, муй вәньщӆӑн! Ма SMS-код ӑн вохӆум, тәп нянь вўэ.' }
          ],
          choices: [
            { text: 'Ёмӑщ! Нянь вўӆум па хота юхӑтӆум.', winReply: 'Тәса баланс!' }
          ]
        },
        false_alarm_choice: {
          messages: [
            { text: 'Муй йис? Ма тәп нянь вўты ястӑсум — телефонӑн вохэ!' }
          ],
          choices: [
            { text: 'Аӊки, извини! Нянь вўӆум па хота юхӑтӆум.', winReply: 'Ёмӑщ, тәса вәтсэн!' }
          ]
        }
      }
    },

    dropper: {
      title: 'Артём | Рәпата 86',
      shortTitle: 'Вух рәпата (дропперство)',
      preview: 'Вўща! Ӑшкола юпийн рәпата мӑсты? 4000 ₽ хӑтӆӑн...',
      callBehavior: {
        statusText: 'Телефонӑн вохты пӑнтсы',
        note: 'Мошенникӑт телефон номер ӆавӑӆӆӑт па ӑн потӑртӆӑт.'
      },
      profile: {
        bio: 'Ай хоятӑта рәпата • Иса хӑтӆ вух',
        meta: 'Номер ӑн вәӆӆ • Общий группа ӑнтєм'
      },
      achievement: {
        title: 'Тӑк щит',
        desc: 'Дропперство вєр ӑн вўсэн па закон ӆавӑӆсэн!'
      },
      winLesson: 'Йиӆуп хоят вух нӑӊ картайн вўты па єӆӆы китты — щит дропперство (закон эвӑӆт ӑн рӑхӆ)! Карта пӑнтӆӑт па полиция юхӑтӆ.',
      steps: {
        start: {
          messages: [
            { text: 'Вўща! Ӑшкола юпийн рәпата мӑсты? <b>3000–5000 ₽ хӑтӆӑн</b>, телефон эвӑӆт!' },
            { text: 'Нӑӊ банк картайн вух вўты па єӆӆы китты мӑсӆ. <b>10% нӑӊэн хӑщӆ!</b>' }
          ],
          choices: [
            { text: 'Пәта, щит дропперство! Ма картайн мошенник вух китӆӑн?' },
            { text: 'Ёмӑщ! Муй вєрты мӑсӆ?' },
            {
              text: 'Ёмӑщ! Карта номер китӆум!',
              fail: {
                title: 'ДРОППЕРСТВО ВЄР!',
                subtitle: 'Нӑӊ картайн мошенник вух китсы',
                reason: 'Полиция оӆӑӊӑн карта хозяина юхӑтӆ — нӑӊэн па аӊки-ащийн!',
                flags: ['3000–5000 ₽ вух ӆыпи.', 'Йиӆуп вух картайн китты — дропперство.']
              }
            }
          ]
        },
        gaslight: {
          messages: [
            { text: 'Ӑн дропперство! 150 ай хоят щиты рәпитӆӑт, 18 оӆ ӑнтєм ки — муй па ӑн вәӆӆ!' }
          ],
          choices: [
            { text: 'Ӑн тәса! 15 оӆӑн па полиция па аӊки-ащийн проблема вәӆӆ! Блока пунӆум!', winReply: 'Тәса! «18 ӑнтєм — муй па ӑн вәӆӆ» — мошенник моньщ!' },
            {
              text: 'И пўш вєрӆум...',
              fail: {
                title: 'ДРОППЕРСТВО ВЄР!',
                subtitle: 'И пўш эвӑӆт па карта пӑнтӆӑт',
                reason: 'Банк карта пӑнтӆ па аӊки-ащийн вух вєртты мӑсӆ.',
                flags: ['«18 ӑнтєм» — ӑн тәса.', 'Карта йиӆуп вух пӑта ӑн мӑӆўв.']
              }
            }
          ]
        },
        ask_card: {
          messages: [
            { text: 'Карта фото па онлайн-банк пароль китэ — <b>7000 ₽</b> ин мӑӆум!' }
          ],
          choices: [
            { text: 'Карта фото па пароль?! Щит дропперство! Блока пунӆум!', winReply: 'Ёмӑщ! Карта хәйата ӑн мӑӆўв!' },
            {
              text: '7000 ₽ пӑта карта фото китӆум!',
              fail: {
                title: 'ЗАКОН ПЄӅӐК ВЄР!',
                subtitle: 'Карта мошенника мӑсэн',
                reason: 'Нӑӊ картайн мошенникӑт вух вўӆӆӑт — полиция нӑӊэн юхӑтӆ.',
                flags: ['Карта тыныты — дропперство.', 'Пароль вохӆ.']
              }
            },
            { text: 'Официальной договор вәӆӆ?' }
          ]
        }
      }
    },

    gosuslugi: {
      title: 'Госуслуги | Ӆавӑӆты',
      shortTitle: 'Фейк Госуслуги',
      preview: 'ЩИМӐЩ! Йиӆуп телефон эвӑӆт Госуслуга ӆәӊсы...',
      callBehavior: {
        statusText: 'Бота вохты ӑн рӑхӆ',
        note: 'Тәса Госуслуги мессенджер-ботӑн ӑн хӑншӆӑт.'
      },
      profile: {
        bio: 'Госуслуги ӆавӑӆты служба.',
        meta: 'Ӑн официальной бот'
      },
      achievement: {
        title: 'Кибер-ӆавӑӆты хоят',
        desc: 'SMS ӆўӊӑтсэн па Госуслуги код мошенника ӑн мӑсэн!'
      },
      winLesson: 'Госуслуги па полиция мессенджера ӑн хӑншӆӑт па SMS-код ӑн вохӆӑт! Официальной приложениейн вәньщэ.',
      steps: {
        start: {
          messages: [
            { text: '<b>ЩИМӐЩ НЄПЕК</b>\nЙиӆуп <i>iPhone 15 Pro</i> эвӑӆт Госуслуга ӆәӊсы!' },
            {
              text: '<b>3 минутайн</b> щи ссылкайн ӆәӊэ па SMS-код хӑншэ:',
              linkCard: {
                siteName: 'Госуслуги — Ӆавӑӆты',
                title: 'Взлом пӑнтты',
                desc: 'Щимӑщ ӆавӑӆты.',
                failData: {
                  title: 'АККАУНТЭН ВЎСЫ!',
                  subtitle: 'Ӑн тәса Госуслуги сайт',
                  reason: 'Тәса адрес — тәп <b>gosuslugi.ru</b>! Йиӆуп ясӑӊӑт пиӆа сайт — фишинг!',
                  flags: ['Тәса адрес — <b>gosuslugi.ru</b>.', 'Госуслуги мессенджера ӑн хӑншӆӑт.']
                }
              }
            }
          ],
          choices: [
            { text: 'Пәта! Муй пӑта Госуслуги бот эвӑӆт хӑншӆ?' },
            {
              text: 'Ссылкайн ӆәӊӆум па код хӑншӆум!',
              fail: {
                title: 'АККАУНТЭН ВЎСЫ!',
                subtitle: 'Пӑӆты эвӑӆт пароль мӑсэн',
                reason: 'Взлом ӑнтєм вәс — мошенник нӑӊ парольэн вўс.',
                flags: ['Ӑн тәса сайт <b>gosuslugi-vhod-proverka.ru</b>.', 'Бот мессенджерӑн.']
              }
            },
            { text: 'Ссылкайн ӑн мӑнӆум! Официальной Госуслуги приложениейн вәньщӆум!', winReply: 'Ёмӑщ! Тәса вєр!' }
          ]
        },
        intimidation: {
          incomingSms: {
            sender: 'Gosuslugi',
            tag: 'Пароль пєӆӑк пунты',
            text: 'Госуслуги ПАРОЛЬ ПЄӅӐК ПУНТЫ код: 482910. Хәйата ӑн ястӑэ!'
          },
          messages: [
            { text: 'Щит Департамент! Аӊки-ащийн кредит вўӆӆӑт! <b>45 секундайн SMS-код тӑта хӑншэ!</b>' }
          ],
          choices: [
            { text: 'SMS ӆўӊӑтсум — тӑта ПАРОЛЬ ПЄӅӐК ПУНТЫ код! Блока пунӆум!', winReply: 'Пәмащипа! SMS тәса ӆўӊӑтсэн!' },
            {
              text: 'Вўэ код: 482910!',
              fail: {
                title: 'АККАУНТЭН ВЎСЫ!',
                subtitle: 'Госуслуги пароль код мӑсэн',
                reason: 'SMS нєпекӑн хӑншсы: пароль пєӆӑк пунты код, хәйата ӑн ястӑэ!',
                flags: ['SMS нєпекӑн пароль пєӆӑк пунты.', 'Аӊки-ащийн пӑӆтӑпты вєр.']
              }
            },
            { text: 'Тәса поддержка ки — ма сємӑн питӑм хӑтӆэм ястӑэ!' }
          ]
        },
        angry_scammer: {
          messages: [
            { text: 'Юпи шанс — SMS-код китэ аӆпа ссылкайн ӆәӊэ!' }
          ],
          choices: [
            { text: 'SMS нєпекӑн код ӑн вохӆӑт — блока пунӆум!', winReply: '10/10! Ёмӑщ!' },
            {
              text: 'Код 482910 вўэ!',
              fail: {
                title: 'АККАУНТЭН ВЎСЫ!',
                subtitle: 'SMS-код мӑсэн',
                reason: 'Тәса служба SMS-код ӑн вохӆ.',
                flags: ['SMS пароль код.', 'Бот аккаунт.']
              }
            }
          ]
        }
      }
    },

    director: {
      title: 'Елена Викторовна (Завуч)',
      shortTitle: 'Фейк завуч / «проверка»',
      preview: 'Вўща! Ӑшколайн щимӑщ проверка...',
      callBehavior: {
        statusText: 'Телефон пӑнтсы',
        note: '«Завуч» телефон пӑнтӑс — щит ӑн тәса аккаунт!'
      },
      profile: {
        bio: 'Ӑшкола завуч',
        meta: 'Хӑӆєвӑт вєрсы • Контактытӑн ӑнтєм'
      },
      achievement: {
        title: 'Пӑӆты ӆыпи',
        desc: 'Фейк завуч кӑншсэн па «тайной проверкайн» ӑн мӑнсӑн!'
      },
      winLesson: 'Тәса утӆты хоят аӊки-ащийн ястӑты ӑн пӑнтӆ па йиӆуп сайтӑн пароль ӑн вохӆ! Иса вєр аӊки-ащийн ястӑэ!',
      steps: {
        start: {
          messages: [
            { text: 'Вўща! Ӑшколайн щимӑщ дневник проверка вәӆӆ.' },
            { text: '<b>Хәйата ӑн ястӑэ, аӊки-ащийн па ӑн ястӑэ</b> — проверка юпи вәнта!' }
          ],
          choices: [
            { text: 'Муй пӑта йиӆуп аккаунт эвӑӆт хӑншӆӑн па аӊки-ащийн ястӑты ӑн мӑӆӑн?' },
            { text: 'Муй вєрты мӑсӆ?' },
            { text: 'Аӊки-ащи ӆыпи «тайной проверка» ӑнтєм! Аӊки-ащийн ястӑӆум, блока пунӆум!', winReply: 'Ёмӑщ! Аӊки-ащийн ястӑты ӑн мӑты — 100% мошенник!' }
          ]
        },
        pressure_secret: {
          messages: [
            { text: '5 минутайн дневник аккаунт щи ссылкайн вәньщэ:',
              linkCard: {
                siteName: 'Дневник проверка',
                title: 'Аккаунт вәньщты',
                desc: 'Госуслуги эвӑӆт ӆәӊэ.',
                failData: {
                  title: 'ПАРОЛЬЭН ВЎСЫ!',
                  subtitle: 'Щит ӑн тәса завуч!',
                  reason: 'Тәса утӆты хоят щи чат ӑн вәӆӆы. Аккаунт хӑӆєвӑт вєрсы, а сайт пароль вўӆӆы.',
                  flags: [
                    'Аӊки-ащийн ястӑты ӑн мӑты — 100% мошенник.',
                    'Аккаунт хӑӆєвӑт вєрсы.',
                    'Ӑн тәса ссылка <b>dnevnik-srochno-vhod.ru</b>.'
                  ]
                }
              }
            }
          ],
          choices: [
            { text: 'Аккаунт хӑӆєвӑт вєрсы, ссылка ӑн тәса, аӊки-ащийн ӑн мӑӆӑн! Фейк — блока пунӆум!', winReply: 'Пәмащипа! Тәса вєр!' },
            {
              text: 'Ссылкайн ӆәӊӆум па пароль хӑншӆум!',
              fail: {
                title: 'ПАРОЛЬЭН ВЎСЫ!',
                subtitle: 'Фейк завуча пароль мӑсэн',
                reason: 'Аккаунт ӑн тәса, а сайт пароль вўӆӆы.',
                flags: ['Аӊки-ащийн ястӑты ӑн мӑс.', 'Аккаунт хӑӆєвӑт вєрсы.']
              }
            }
          ]
        },
        fake_doc: {
          incomingSms: {
            sender: 'Gosuslugi',
            tag: 'Госуслуги ӆәӊты код',
            text: 'Госуслуги ӆәӊты код: 904512. Хәйата ӑн ястӑэ!'
          },
          messages: [
            { text: 'Ин нӑӊ телефона 6 цифра SMS-код юхӑтс — єӆӆы тӑта китэ, аӊки-ащи ӆыпи пӑнтӆўв!' }
          ],
          choices: [
            { text: 'SMS ӆўӊӑтсум — щит Госуслуги ӆәӊты код! Блока пунӆум!', winReply: 'Ёмӑщ! SMS тәса вәньщсэн!' },
            {
              text: 'Код 904512 вўэ!',
              fail: {
                title: 'АККАУНТЭН ВЎСЫ!',
                subtitle: 'Госуслуги код мӑсэн',
                reason: 'Тәса ӑшкола Госуслуги код ӑн вохӆ.',
                flags: ['SMS Госуслуги код.', 'Хӑӆєвӑт вєрӑм аккаунт.']
              }
            }
          ]
        }
      }
    }
  }
};
