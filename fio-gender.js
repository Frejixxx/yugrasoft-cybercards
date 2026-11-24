// определение пола по ФИО (чтобы выбрать Стива или Алекс)
// правила окончаний взял по принципу petrovich/lvovich
// плюс добавил частые школьные имена, имена по Югре и латиницу
// работает даже если ввели только имя или поменяли местами слова

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
          // унисекс имена (саша, женя и тд)
          'саша', 'женя', 'валя', 'валери', 'сева', 'шура', 'патрис', 'ким', 'анри',
          'кири', 'иона', 'муса', 'захария', 'закия', 'алвард', 'райхон', 'амиль',
          // тюркские и татарские унисекс имена
          'ардак', 'арман', 'асыл', 'баглан', 'бакыт', 'бахыт', 'еркежан', 'жанат',
          'жаркын', 'куаныш', 'манат', 'мереке', 'рауан', 'сымбат', 'тлеухан',
          'умит', 'улжалгас', 'ырыс', 'айбала', 'акбала', 'ирза', 'арши',
          // латиница
          'alex', 'sasha', 'zhenya', 'sam', 'taylor', 'jordan', 'casey', 'morgan', 'robin',
        ],
        male: [
          // мужские имена и сокращения на -а/-я/-ь
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
          // еще мужские имена-исключения
          'вавила', 'гавриила', 'гаврила', 'ермила', 'зосима', 'малюта', 'васюта',
          'мустафа', 'абдалла', 'абдилла', 'абдала', 'абдель', 'аталла', 'атилла',
          'кайролла', 'гиа', 'гия', 'шота', 'паата', 'иса', 'мусса', 'закария', 'зекерия',
          'джанлука', 'фидель', 'коста', 'кришна', '-ага',
          // латиница (мужские)
          'ivan', 'andrey', 'andrei', 'dmitry', 'dmitrii', 'artem', 'artyom', 'nikita',
          'ilya', 'ilia', 'maxim', 'max', 'sergey', 'sergei', 'alexey', 'aleksey',
          'mikhail', 'michael', 'roman', 'egor', 'kirill', 'daniil', 'daniel', 'danila',
          'denis', 'vlad', 'vladislav', 'vladimir', 'timur', 'ruslan', 'pavel', 'anton',
          'viktor', 'victor', 'oleg', 'igor', 'gleb', 'mark', 'matvey', 'timofey',
          'john', 'jack', 'james', 'lucas', 'noah', 'liam', 'oliver', 'ethan', 'steve',
        ],
        female: [
          // женские имена и сокращения
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
          // тюркские и восточные женские имена
          'алсу', 'айсу', 'айсулу', 'айгуль', 'гузель', 'гузаль', 'гюзель', 'гульнур',
          'айнур', 'гульшат', 'алтынай', 'айгерим', 'айжан', 'айдан', 'чулпан', 'зайнаб',
          'марьям', 'мирьям', 'мириам', 'майрам', 'асем', 'гаухар', 'дильбар', 'гульзар',
          'нилуфар', 'патимат', 'саодат', 'ануш', 'зебо', 'ширин', 'зауре', 'сапият',
          'юлдуз', 'гюнай', 'гюльчитай', '-бану', '-гуль', '-гюль', '-куль',
          // латиница (женские)
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

    // сначала проверяем точные исключения
    if (ruleSet.exceptions) {
      const hits = [];
      if (matchList(w, ruleSet.exceptions.androgynous, false)) hits.push('androgynous');
      if (matchList(w, ruleSet.exceptions.male, false)) hits.push('male');
      if (matchList(w, ruleSet.exceptions.female, false)) hits.push('female');
      if (hits.length === 1) return hits[0];
      if (hits.includes('androgynous')) return 'androgynous';
    }

    // потом смотрим по окончаниям
    if (ruleSet.suffixes) {
      const hits = [];
      if (matchList(w, ruleSet.suffixes.androgynous, true)) hits.push('androgynous');
      if (matchList(w, ruleSet.suffixes.female, true)) hits.push('female');
      if (matchList(w, ruleSet.suffixes.male, true)) hits.push('male');
      // более длинный суффикс важнее короткого
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
    // чтобы имя типа Константин не приняло за фамилию на -ин
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
    return null; // если мнения разошлись
  }

  // основная функция: на вход строка ФИО, на выход male / female / androgynous / null
  function detectGenderByFio(fioString) {
    if (!fioString || typeof fioString !== 'string') return null;

    const rawWords = fioString
      .trim()
      .split(/[\s,]+/)
      .map(normalizeWord)
      .filter(w => w.length >= 2);

    if (rawWords.length === 0) return null;

    // если ввели одно слово — сначала ищем как имя
    // если не нашли, пробуем как фамилию или отчество
    if (rawWords.length === 1) {
      const w = rawWords[0];
      if (isLikelyPatronymic(w)) return evalRuleSet(w, GENDER_RULES.middlename);
      // если это точно фамилия (типа Иванова или Петров)
      if (isLikelySurname(w) && !isKnownFirstName(w)) {
        const lg = evalRuleSet(w, GENDER_RULES.lastname);
        if (lg && lg !== 'androgynous') return lg;
      }
      const fg = evalRuleSet(w, GENDER_RULES.firstname);
      if (fg) return fg;
      return evalRuleSet(w, GENDER_RULES.lastname);
    }

    // определяем где отчество, где фамилия и где имя
    let middle = null;
    let last = null;
    let first = null;
    const remaining = [...rawWords];

    // ищем отчество по суффиксу
    for (let i = remaining.length - 1; i >= 0; i--) {
      if (isLikelyPatronymic(remaining[i])) {
        middle = remaining.splice(i, 1)[0];
        break;
      }
    }

    // из оставшихся слов находим имя и фамилию
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
        // по умолчанию считаем порядок: фамилия, имя
        last = w0;
        first = w1;
      }
    }

    // приоритет: сначала отчество, потом имя, потом фамилия
    const gMiddle = middle ? evalRuleSet(middle, GENDER_RULES.middlename) : null;
    const gFirst = first ? evalRuleSet(first, GENDER_RULES.firstname) : null;
    const gLast = last ? evalRuleSet(last, GENDER_RULES.lastname) : null;

    // отчество почти всегда дает точный пол
    if (gMiddle === 'male' || gMiddle === 'female') return gMiddle;

    // сверяем имя и фамилию
    if (gFirst === 'male' || gFirst === 'female') {
      // если фамилия не спорит с именем — берем пол имени
      if (!gLast || gLast === 'androgynous' || gLast === gFirst) return gFirst;
      // если спорят — проверяем, может фамилия и имя поменяны местами
      if (isKnownFirstName(first)) return gFirst;
      if (isKnownFirstName(last)) return evalRuleSet(last, GENDER_RULES.firstname);
      return gFirst;
    }

    // если имя унисекс (например Саша Петрова) — смотрим по фамилии
    const merged = mergeGenders(gFirst, gLast);
    if (merged) return merged;

    return gLast || gFirst || null;
  }

  // возвращает alex для девочки, steve для мальчика или null
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
