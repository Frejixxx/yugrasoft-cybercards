// Офлайн-определение пола по ФИО для «Кибер-карточек Югры»
// Алгоритм основан на морфологических правилах Petrovich / Lvovich (MIT)
// с дополненной базой школьных имён, имён народов РФ/СНГ (ХМАО-Югра) и латиницы,
// а также разбором произвольного порядка слов (ФИО / Имя Фамилия / только Имя).

(function (global) {
  'use strict';

  const GENDER_RULES = {
    middlename: {
      suffixes: {
        female: ['овна', 'евна', 'ична', 'инична', 'на', 'кызы', 'кизи', 'гызы', 'кзы'],
        male: ['ович', 'евич', 'ич', 'оглы', 'угли', 'улы', 'уулу', 'огли'],
      },
    },
    lastname: {
      exceptions: {
        androgynous: [
          'бова', 'регин', 'дарвин', 'пэйлин', 'грин', 'цин', 'шенгелая',
          'глушко', 'бойко', 'шевченко', 'кличко', 'гришко', 'дзюба', 'черных',
          'белых', 'долгих', 'седых', 'сухих', 'крутых', 'дорогих',
        ],
      },
      suffixes: {
        androgynous: [
          'енко', 'ко', 'дзе', 'швили', 'ян', 'ук', 'юк', 'ич', 'ых', 'их',
          'ер', 'ман', 'берг', 'штейн', 'ц', 'йн', 'дт', 'о',
        ],
        female: ['ова', 'ева', 'ёва', 'ина', 'ына', 'ская', 'цкая', 'ая', 'яя', 'ска'],
        male: ['ов', 'ев', 'ёв', 'ин', 'ын', 'ский', 'цкий', 'кий', 'хий', 'ний', 'ый', 'ой'],
      },
    },
    firstname: {
      exceptions: {
        androgynous: [
          // Русские и международные унисекс-имена
          'саша', 'женя', 'валя', 'валери', 'сева', 'шура', 'патрис', 'ким', 'анри',
          'кири', 'иона', 'муса', 'захария', 'закия', 'алвард', 'райхон', 'амиль',
          // Тюркские/казахские/татарские унисекс-имена
          'ардак', 'арман', 'асыл', 'баглан', 'бакыт', 'бахыт', 'еркежан', 'жанат',
          'жаркын', 'куаныш', 'манат', 'мереке', 'рауан', 'сымбат', 'тлеухан',
          'умит', 'улжалгас', 'ырыс', 'айбала', 'акбала', 'ирза', 'арши',
          // Латиница
          'alex', 'sasha', 'zhenya', 'sam', 'taylor', 'jordan', 'casey', 'morgan', 'robin',
        ],
        male: [
          // Русские мужские имена и популярные школьные сокращения на -а/-я/-ь
          'никита', 'илья', 'данила', 'даниил', 'даня', 'дима', 'ваня', 'петя', 'коля',
          'миша', 'лёша', 'леша', 'серёжа', 'сережа', 'серёга', 'серега', 'стёпа', 'степа',
          'вова', 'вовка', 'толя', 'боря', 'гена', 'генка', 'гоша', 'гриша', 'жора',
          'рома', 'тёма', 'тема', 'сёма', 'сема', 'семён', 'семен', 'тима', 'федя',
          'сеня', 'слава', 'паша', 'саня', 'вася', 'витя', 'митя', 'костя', 'юра',
          'лёва', 'лева', 'лев', 'кузя', 'кузьма', 'фома', 'лука', 'савва', 'фима',
          'филя', 'изя', 'ося', 'валера', 'жека', 'илюша', 'андрюша', 'антоша', 'алёша', 'алеша',
          'игорь', 'лазарь', 'яков', 'константин', 'артём', 'артем', 'андрей', 'алексей',
          'дмитрий', 'александр', 'максим', 'макс', 'влад', 'денис', 'кирилл', 'егор',
          'тимофей', 'матвей', 'марк', 'глеб', 'иван', 'михаил', 'роман', 'сергей',
          'павел', 'антон', 'владимир', 'владислав', 'ярослав', 'вячеслав', 'станислав',
          'святослав', 'богдан', 'назар', 'макар', 'платон', 'мирон', 'демьян', 'захар',
          'фёдор', 'федор', 'пётр', 'петр', 'георгий', 'григорий', 'евгений', 'валерий',
          'василий', 'виктор', 'виталий', 'анатолий', 'аркадий', 'арсений', 'валентин',
          'степан', 'олег', 'руслан', 'тимур', 'давид', 'дамир', 'амир', 'карим', 'рафаэль',
          'рамиль', 'эмиль', 'марсель', 'даниэль', 'адиль', 'наиль', 'шамиль', 'камиль',
          'ильдар', 'ильяс', 'айдар', 'артур', 'альберт', 'роберт', 'эдуард', 'герман',
          'родион', 'савелий', 'елисей', 'прохор', 'тихон', 'трофим', 'филипп', 'юрий',
          'борис', 'геннадий', 'леонид', 'николай', 'стас', 'эрик', 'адам',
          // Из базы Petrovich/Lvovich (мужские имена на -а/-я/-е)
          'вавила', 'гавриила', 'гаврила', 'ермила', 'зосима', 'малюта', 'васюта',
          'мустафа', 'абдалла', 'абдилла', 'абдала', 'абдель', 'аталла', 'атилла',
          'кайролла', 'гиа', 'гия', 'шота', 'паата', 'иса', 'мусса', 'закария', 'зекерия',
          'джанлука', 'фидель', 'коста', 'кришна', '-ага',
          // Латиница
          'ivan', 'andrey', 'andrei', 'dmitry', 'dmitrii', 'artem', 'artyom', 'nikita',
          'ilya', 'ilia', 'maxim', 'max', 'sergey', 'sergei', 'alexey', 'aleksey',
          'mikhail', 'michael', 'roman', 'egor', 'kirill', 'daniil', 'daniel', 'danila',
          'denis', 'vlad', 'vladislav', 'vladimir', 'timur', 'ruslan', 'pavel', 'anton',
          'viktor', 'victor', 'oleg', 'igor', 'gleb', 'mark', 'matvey', 'timofey',
          'john', 'jack', 'james', 'lucas', 'noah', 'liam', 'oliver', 'ethan', 'steve',
        ],
        female: [
          // Русские женские имена и популярные школьные сокращения
          'любовь', 'любов', 'люба', 'любава', 'маша', 'даша', 'настя', 'катя', 'вика',
          'аня', 'оля', 'таня', 'юля', 'лиза', 'соня', 'поля', 'лера', 'ксюша', 'варя',
          'света', 'надя', 'вера', 'галя', 'ира', 'лена', 'кира', 'рита', 'ася', 'тоня',
          'клава', 'тася', 'уля', 'ника', 'настюша', 'катюша', 'анюта', 'оленька',
          'наташа', 'варвара', 'мария', 'дарья', 'анастасия', 'екатерина', 'виктория',
          'елизавета', 'ксения', 'валерия', 'александра', 'евгения', 'юлия', 'ольга',
          'наталья', 'наталия', 'татьяна', 'елена', 'ирина', 'светлана', 'свитлана',
          'оксана', 'олеся', 'алиса', 'алина', 'полина', 'софия', 'софья', 'милана',
          'ева', 'ульяна', 'арина', 'диана', 'вероника', 'таисия', 'ангелина', 'агелина',
          'жанна', 'джанна', 'кристина', 'марина', 'надежда', 'галина', 'людмила',
          'лариса', 'тамара', 'инна', 'алла', 'зоя', 'майя', 'злата', 'есения',
          'василиса', 'аглая', 'ярослава', 'мирослава', 'владислава', 'эмма', 'элина',
          'эмилия', 'эвелина', 'стефания', 'карина', 'регина', 'сабина', 'амина',
          'камила', 'камилла', 'лейла', 'лия', 'милена', 'маргарита', 'снежана', 'яна',
          'рада', 'лада', 'нинель', 'адель', 'николь', 'ассоль', 'мишель', 'эстель',
          'изабель', 'абигейль', 'габриэль', 'рашель', 'кристин', 'катрин', 'мадлен',
          'кармен', 'амели', 'натали', 'лили', 'нелли', 'элли', 'эмили', 'мэри', 'мери',
          'синди', 'ингрид', 'эстер', 'элис', 'грейс', 'дженнифер', 'рэйчел', 'наоми',
          // Тюркские/кавказские/восточные женские имена на согласную/гласную (актуально для ХМАО-Югры)
          'алсу', 'айсу', 'айсулу', 'айгуль', 'гузель', 'гузаль', 'гюзель', 'гульнур',
          'айнур', 'гульшат', 'алтынай', 'айгерим', 'айжан', 'айдан', 'чулпан', 'зайнаб',
          'марьям', 'мирьям', 'мириам', 'майрам', 'асем', 'гаухар', 'дильбар', 'гульзар',
          'нилуфар', 'патимат', 'саодат', 'ануш', 'зебо', 'ширин', 'зауре', 'сапият',
          'юлдуз', 'гюнай', 'гюльчитай', '-бану', '-гуль', '-гюль', '-куль',
          // Латиница
          'anna', 'maria', 'mary', 'kate', 'katerina', 'ekaterina', 'daria', 'dasha',
          'masha', 'nastya', 'anastasia', 'vika', 'victoria', 'polina', 'alina', 'alice',
          'alisa', 'sofia', 'sophia', 'sonya', 'elena', 'olga', 'irina', 'tatiana',
          'julia', 'yulia', 'liza', 'elizabeth', 'ksenia', 'valeria', 'varvara', 'eva',
          'milana', 'arina', 'diana', 'veronika', 'kristina', 'marina', 'svetlana',
          'emma', 'olivia', 'chloe', 'emily', 'sarah', 'nicole', 'claire', 'amy',
        ],
      },
      suffixes: {
        male: [
          'б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ',
          'иль', 'аль', 'эль', 'ель', 'арь', 'орь', 'уль', 'улу', 'оглы', 'угли', 'улы', 'ага', 'паша',
        ],
        female: [
          'а', 'я', 'гуль', 'гюль', 'куль', 'бану', 'нэ', 'не', 'дель', 'бель', 'тель',
        ],
      },
    },
  };

  function normalizeWord(str) {
    return (str || '')
      .toLowerCase()
      .replace(/[^а-яёa-z-]/gi, '')
      .trim();
  }

  function matchList(word, list, suffixOnly) {
    if (!Array.isArray(list)) return false;
    for (let i = 0; i < list.length; i++) {
      const rule = list[i];
      if (!rule) continue;
      if (suffixOnly) {
        if (word.length > rule.length && word.endsWith(rule)) return true;
        if (word === rule && rule.length >= 2) return true;
      } else if (rule.startsWith('-')) {
        const suf = rule.slice(1);
        if (word.length > suf.length && word.endsWith(suf)) return true;
      } else {
        if (word === rule) return true;
      }
    }
    return false;
  }

  function evalRuleSet(word, ruleSet) {
    const w = normalizeWord(word);
    if (!w || w.length < 2 || !ruleSet) return null;

    // 1. Точные исключения (и суффикс-исключения вида '-бану')
    if (ruleSet.exceptions) {
      const hits = [];
      if (matchList(w, ruleSet.exceptions.androgynous, false)) hits.push('androgynous');
      if (matchList(w, ruleSet.exceptions.male, false)) hits.push('male');
      if (matchList(w, ruleSet.exceptions.female, false)) hits.push('female');
      if (hits.length === 1) return hits[0];
      if (hits.includes('androgynous')) return 'androgynous';
    }

    // 2. Суффиксы
    if (ruleSet.suffixes) {
      const hits = [];
      if (matchList(w, ruleSet.suffixes.androgynous, true)) hits.push('androgynous');
      if (matchList(w, ruleSet.suffixes.female, true)) hits.push('female');
      if (matchList(w, ruleSet.suffixes.male, true)) hits.push('male');
      // Для фамилий и имён приоритет более специфичному суффиксу (например, -гуль женский перебивает -л/-ь)
      if (hits.length === 1) return hits[0];
      if (hits.includes('androgynous')) return 'androgynous';
      if (hits.length > 1) {
        const bestLen = (arr) => (arr || []).reduce((m, s) => (w.endsWith(s) ? Math.max(m, s.length) : m), 0);
        const fLen = bestLen(ruleSet.suffixes.female);
        const mLen = bestLen(ruleSet.suffixes.male);
        if (fLen > mLen) return 'female';
        if (mLen > fLen) return 'male';
      }
    }

    return null;
  }

  function isLikelyPatronymic(word) {
    const w = normalizeWord(word);
    if (w.length < 5) return false;
    return /(ович|евич|ична|инична|овна|евна|оглы|угли|улы|уулу|кызы|кизи|гызы|кзы)$/.test(w);
  }

  function isLikelySurname(word) {
    const w = normalizeWord(word);
    if (w.length < 4) return false;
    // Не путаем имя в словаре имён с фамилией (например, 'Константин' оканчивается на -ин!)
    if (
      matchList(w, GENDER_RULES.firstname.exceptions.male, false) ||
      matchList(w, GENDER_RULES.firstname.exceptions.female, false) ||
      matchList(w, GENDER_RULES.firstname.exceptions.androgynous, false)
    ) {
      return false;
    }
    return /(ова|ева|ёва|ина|ына|ская|цкая|ов|ев|ёв|ин|ын|ский|цкий|енко|ко|дзе|швили|ян|ук|юк|ых|их|берг|штейн)$/.test(w);
  }

  function isKnownFirstName(word) {
    const w = normalizeWord(word);
    if (!w) return false;
    const ex = GENDER_RULES.firstname.exceptions;
    return matchList(w, ex.male, false) || matchList(w, ex.female, false) || matchList(w, ex.androgynous, false);
  }

  function mergeGenders(g1, g2) {
    if (!g1 || g1 === 'androgynous') return g2 || g1;
    if (!g2 || g2 === 'androgynous') return g1;
    if (g1 === g2) return g1;
    return null; // конфликт
  }

  /**
   * Определяет пол по произвольной строке ФИО:
   * - "Иванова Мария Петровна" -> 'female'
   * - "Глушко Андрей Андреевич" -> 'male'
   * - "Мария Иванова" / "Иванова Мария" -> 'female'
   * - "Никита" / "Илья" / "Дима" -> 'male'
   * - "Саша" / "Женя" -> 'androgynous'
   * - "Саша Петрова" -> 'female' (уточнено по фамилии!)
   * - "Саша Петров" -> 'male' (уточнено по фамилии!)
   * - "" -> null
   *
   * @param {string} fioString
   * @returns {'male' | 'female' | 'androgynous' | null}
   */
  function detectGenderByFio(fioString) {
    if (!fioString || typeof fioString !== 'string') return null;

    const rawWords = fioString
      .trim()
      .split(/[\s,]+/)
      .map(normalizeWord)
      .filter(w => w.length >= 2);

    if (rawWords.length === 0) return null;

    // Если 1 слово: сначала смотрим как имя (школьники обычно вводят просто имя),
    // если не определилось — как фамилию или отчество
    if (rawWords.length === 1) {
      const w = rawWords[0];
      if (isLikelyPatronymic(w)) return evalRuleSet(w, GENDER_RULES.middlename);
      // Если это явная фамилия (например, "Иванова" или "Петров"), а не известное имя
      if (isLikelySurname(w) && !isKnownFirstName(w)) {
        const lg = evalRuleSet(w, GENDER_RULES.lastname);
        if (lg && lg !== 'androgynous') return lg;
      }
      const fg = evalRuleSet(w, GENDER_RULES.firstname);
      if (fg) return fg;
      return evalRuleSet(w, GENDER_RULES.lastname);
    }

    // Разбираем роли слов: отчество, фамилия, имя (порядок может быть любой!)
    let middle = null;
    let last = null;
    let first = null;
    const remaining = [...rawWords];

    // 1) Ищем отчество (обычно 3-е или 2-е слово с чётким суффиксом)
    for (let i = remaining.length - 1; i >= 0; i--) {
      if (isLikelyPatronymic(remaining[i])) {
        middle = remaining.splice(i, 1)[0];
        break;
      }
    }

    // 2) Из оставшихся определяем имя и фамилию
    if (remaining.length === 1) {
      const only = remaining[0];
      if (isLikelySurname(only) && !isKnownFirstName(only)) last = only;
      else first = only;
    } else if (remaining.length >= 2) {
      const w0 = remaining[0];
      const w1 = remaining[1];
      const w0Known = isKnownFirstName(w0);
      const w1Known = isKnownFirstName(w1);
      const w0Sur = isLikelySurname(w0);
      const w1Sur = isLikelySurname(w1);

      if (w0Known && !w1Known) {
        first = w0;
        last = w1;
      } else if (w1Known && !w0Known) {
        last = w0;
        first = w1;
      } else if (w0Sur && !w1Sur) {
        last = w0;
        first = w1;
      } else if (w1Sur && !w0Sur) {
        first = w0;
        last = w1;
      } else {
        // По стандарту РФ (ФИО): [Фамилия, Имя]
        last = w0;
        first = w1;
      }
    }

    // Приоритет Lvovich: Отчество -> Имя -> Фамилия (уточняет унисекс-имена вроде «Саша Петрова»)
    const gMiddle = middle ? evalRuleSet(middle, GENDER_RULES.middlename) : null;
    const gFirst = first ? evalRuleSet(first, GENDER_RULES.firstname) : null;
    const gLast = last ? evalRuleSet(last, GENDER_RULES.lastname) : null;

    // Отчество почти безошибочно (99.5%+)
    if (gMiddle === 'male' || gMiddle === 'female') return gMiddle;

    // Слияние имени и фамилии
    if (gFirst === 'male' || gFirst === 'female') {
      // Если фамилия подтверждает или не противоречит (androgynous / null) — возвращаем пол имени
      if (!gLast || gLast === 'androgynous' || gLast === gFirst) return gFirst;
      // При конфликте проверяем, не перепутаны ли фамилия и имя местами (например редкая фамилия + обычное имя)
      if (isKnownFirstName(first)) return gFirst;
      if (isKnownFirstName(last)) return evalRuleSet(last, GENDER_RULES.firstname);
      return gFirst;
    }

    // Если имя унисекс (Саша, Женя, Арман) — смотрим на фамилию!
    const merged = mergeGenders(gFirst, gLast);
    if (merged) return merged;

    return gLast || gFirst || null;
  }

  /**
   * Возвращает рекомендованный скин героя ('alex' для девочки, 'steve' для мальчика, null если не определено/унисекс)
   */
  function detectHeroSkinByFio(fioString) {
    const g = detectGenderByFio(fioString);
    if (g === 'female') return 'alex';
    if (g === 'male') return 'steve';
    return null;
  }

  global.FioGender = {
    detect: detectGenderByFio,
    detectHeroSkin: detectHeroSkinByFio,
  };
})(typeof window !== 'undefined' ? window : globalThis);
