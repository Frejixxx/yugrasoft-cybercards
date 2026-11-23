// Студийный процедурный звуковой движок на Web Audio API (без внешних MP3)
// Мягкие тактильные звуки в стиле Duolingo / современных образовательных приложений

const SoundFX = (() => {
  let ctx = null;
  let enabled = true;

  function getContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function isEnabled() { return enabled; }
  function setEnabled(val) {
    enabled = Boolean(val);
    if (!enabled) stopSpeech();
  }

  // Вспомогательная мягкая нота с фильтром и плавной ADSR-огибающей (без щелчков)
  function playTone({ freq, endFreq = null, type = 'sine', start = 0, duration = 0.2, volume = 0.1, filterFreq = 2600 }) {
    if (!enabled) return;
    const c = getContext();
    if (!c) return;
    const t = c.currentTime + start;

    const osc = c.createOscillator();
    const filter = c.createBiquadFilter();
    const gain = c.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration * 0.75);
    }

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);

    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  // Мягкий тактильный «чпок» при захвате карточки / выборе элемента
  function playPick() {
    playTone({ freq: 420, endFreq: 580, type: 'sine', duration: 0.075, volume: 0.075, filterFreq: 1800 });
  }

  // Приятный деревянный «тук-плюх» при перетаскивании в корзину или смене порядка
  function playDrop() {
    playTone({ freq: 310, endFreq: 490, type: 'triangle', duration: 0.09, volume: 0.085, filterFreq: 1400 });
    playTone({ freq: 620, endFreq: 740, type: 'sine', start: 0.025, duration: 0.08, volume: 0.045, filterFreq: 2200 });
  }

  // Нежный двойной перезвон при соединении пары в Сопоставлении
  function playConnect() {
    playTone({ freq: 523.25, type: 'sine', start: 0, duration: 0.14, volume: 0.075, filterFreq: 2400 });
    playTone({ freq: 783.99, type: 'triangle', start: 0.055, duration: 0.18, volume: 0.065, filterFreq: 2200 });
  }

  // Светлый мажорный аккорд при правильном ответе (в стиле Duolingo)
  function playWin(streak = 1) {
    const shift = Math.min(streak - 1, 5) * 0.04; // лёгкий рост тональности на серии!
    const mult = 1 + shift;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((f, i) => {
      playTone({ freq: f * mult, type: 'sine', start: i * 0.065, duration: 0.28, volume: 0.09, filterFreq: 3200 });
      playTone({ freq: f * mult * 0.5, type: 'triangle', start: i * 0.065, duration: 0.24, volume: 0.035, filterFreq: 1200 });
    });
  }

  // Праздничная арфа при разблокировке ачивки или завершении всех карточек
  function playAchievement() {
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
    notes.forEach((f, i) => {
      playTone({ freq: f, type: 'sine', start: i * 0.07, duration: 0.38, volume: 0.085, filterFreq: 3600 });
      playTone({ freq: f * 2, type: 'sine', start: i * 0.07 + 0.01, duration: 0.22, volume: 0.025, filterFreq: 4200 });
    });
  }

  // Мягкий приглушённый двойной «тук-тук» при ошибке (не режет уши!)
  function playFail() {
    playTone({ freq: 277.18, endFreq: 246.94, type: 'triangle', start: 0, duration: 0.16, volume: 0.095, filterFreq: 900 });
    playTone({ freq: 220.0, endFreq: 185.0, type: 'triangle', start: 0.13, duration: 0.24, volume: 0.09, filterFreq: 750 });
  }

  // Мессенджер: входящее сообщение (мягкий кристальный «бульк»)
  function playIncoming() {
    playTone({ freq: 587.33, endFreq: 880, type: 'sine', start: 0, duration: 0.11, volume: 0.075, filterFreq: 2600 });
    playTone({ freq: 1174.66, type: 'sine', start: 0.04, duration: 0.12, volume: 0.03, filterFreq: 3200 });
  }

  // Мессенджер: исходящее сообщение (деликатный «свайп»)
  function playOutgoing() {
    playTone({ freq: 390, endFreq: 540, type: 'sine', start: 0, duration: 0.065, volume: 0.055, filterFreq: 1900 });
  }

  // Реалистичный двойной «динь-динь» входящего SMS
  function playSms() {
    playTone({ freq: 880, type: 'sine', start: 0, duration: 0.22, volume: 0.095, filterFreq: 3400 });
    playTone({ freq: 1318.51, type: 'sine', start: 0.1, duration: 0.3, volume: 0.09, filterFreq: 3600 });
  }

  // Гудок исходящего звонка (425 Гц — российский стандарт КПВ)
  function playDialTone() {
    if (!enabled) return;
    const c = getContext();
    if (!c) return;
    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(425, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.055, now + 0.03);
    gain.gain.setValueAtTime(0.055, now + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.65);
  }

  // Короткие гудки «занято / сброс»
  function playBusyTone() {
    if (!enabled) return;
    const c = getContext();
    if (!c) return;
    const now = c.currentTime;
    [0, 0.26, 0.52].forEach(offset => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(425, now + offset);
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.linearRampToValueAtTime(0.06, now + offset + 0.015);
      gain.gain.setValueAtTime(0.06, now + offset + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.17);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.19);
    });
  }

  function getBestNeuralVoice(langPrefix = 'ru') {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    const pref = langPrefix.toLowerCase().slice(0, 2);
    const matching = voices.filter(v => (v.lang || '').toLowerCase().startsWith(pref));
    if (!matching.length) return null;

    // Выбираем ТОЛЬКО естественные нейросетевые голоса (Edge Natural/Online, Google, Apple Siri)
    // Исключаем роботизированные стандартные голоса Windows (Irina, Pavel, David, Zira)
    const neural = matching.find(v => /natural|online|google|siri|milena|yuri/i.test(v.name) && !/irina|pavel|david|zira/i.test(v.name));
    return neural || null;
  }

  function hasNeuralVoice(langPrefix = 'ru') {
    return Boolean(getBestNeuralVoice(langPrefix));
  }

  function onVoicesReady(cb) {
    if (!('speechSynthesis' in window) || typeof cb !== 'function') return;
    cb();
    window.speechSynthesis.addEventListener('voiceschanged', cb);
  }

  function speakVoice(text, opts = {}, onEnd = null) {
    if (!enabled || !('speechSynthesis' in window)) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const lang = opts.lang || 'ru-RU';
      u.lang = lang;
      const neural = getBestNeuralVoice(lang);
      if (opts.neuralOnly && !neural) return false;
      if (neural) u.voice = neural;
      u.rate = opts.rate || 1.02;
      u.pitch = opts.pitch || 1.0;
      if (onEnd) {
        u.onend = onEnd;
        u.onerror = onEnd;
      }
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  let activeAudioEl = null;

  function playAudioFile(url, onEnd = null, onError = null) {
    if (!enabled) return false;
    stopAudioFile();
    try {
      const audio = new Audio(url);
      activeAudioEl = audio;
      audio.onended = () => {
        if (activeAudioEl === audio) activeAudioEl = null;
        if (onEnd) onEnd();
      };
      audio.onerror = () => {
        if (activeAudioEl === audio) activeAudioEl = null;
        if (onError) onError();
      };
      const p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          if (activeAudioEl === audio) activeAudioEl = null;
          if (onError) onError();
        });
      }
      return true;
    } catch (e) {
      if (onError) onError();
      return false;
    }
  }

  function stopAudioFile() {
    if (activeAudioEl) {
      try {
        activeAudioEl.pause();
        activeAudioEl.currentTime = 0;
      } catch (e) {}
      activeAudioEl = null;
    }
  }

  function stopSpeech() {
    stopAudioFile();
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  return {
    isEnabled, setEnabled,
    playPick, playDrop, playConnect,
    playIncoming, playSms, playOutgoing,
    playDialTone, playBusyTone, playFail, playWin, playAchievement,
    hasNeuralVoice, onVoicesReady, speakVoice, playAudioFile, stopAudioFile, stopSpeech
  };
})();
