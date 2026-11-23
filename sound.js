// Студийный процедурный звуковой движок на Web Audio API (без внешних SFX-файлов)
// Мягкие акустические звуки: тактильные клики, деревянный «тук», маримба, калимба, реалистичные уведомления

const SoundFX = (() => {
  let ctx = null;
  let masterBus = null;
  let reverbBus = null;
  let noiseBuffer = null;
  let enabled = true;

  function buildNoiseBuffer(c) {
    const len = Math.floor(c.sampleRate * 0.25);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buf;
  }

  function buildImpulseBuffer(c) {
    // Короткий мягкий комнатный хвост (0.28 сек), чтобы ноты звучали живо, а не «сухой пищалкой»
    const len = Math.floor(c.sampleRate * 0.28);
    const buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const decay = Math.pow(1 - i / len, 2.8);
        data[i] = (Math.random() * 2 - 1) * decay * 0.45;
      }
    }
    return buf;
  }

  function getContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();

      // Мастер-компрессор + мягкий гейн, чтобы никогда не было перегруза и резких щелчков
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.knee.value = 18;
      comp.ratio.value = 4;
      comp.attack.value = 0.004;
      comp.release.value = 0.14;

      const outGain = ctx.createGain();
      outGain.gain.value = 0.88;

      comp.connect(outGain);
      outGain.connect(ctx.destination);
      masterBus = comp;

      // Лёгкий комнатный реверб для музыкальных нот (победа, ачивка, SMS)
      const convolver = ctx.createConvolver();
      convolver.buffer = buildImpulseBuffer(ctx);
      const revGain = ctx.createGain();
      revGain.gain.value = 0.22;
      convolver.connect(revGain);
      revGain.connect(masterBus);
      reverbBus = convolver;

      noiseBuffer = buildNoiseBuffer(ctx);
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

  // Короткий фильтрованный шумовой импульс (тактильный клик / удар палочки / воздушный свайп)
  function playNoiseBurst({ start = 0, duration = 0.018, bandFreq = 1800, q = 1.4, volume = 0.06, highpass = false }) {
    if (!enabled) return;
    const c = getContext();
    if (!c || !noiseBuffer) return;
    const t = c.currentTime + start;

    const src = c.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = c.createBiquadFilter();
    filter.type = highpass ? 'highpass' : 'bandpass';
    filter.frequency.setValueAtTime(bandFreq, t);
    filter.Q.setValueAtTime(q, t);

    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(masterBus);

    src.start(t);
    src.stop(t + duration + 0.01);
  }

  // Акустическая нота маримбы / калимбы / колокольчика (основной тон + быстрый обертон + лёгкий реверб)
  function playMarimbaNote({
    freq,
    endFreq = null,
    start = 0,
    duration = 0.26,
    volume = 0.11,
    overtoneRatio = 2.0,
    overtoneGain = 0.18,
    filterFreq = 3200,
    reverb = true
  }) {
    if (!enabled) return;
    const c = getContext();
    if (!c) return;
    const t = c.currentTime + start;

    const osc1 = c.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);
    if (endFreq !== null) {
      osc1.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), t + duration * 0.65);
    }

    const osc2 = c.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * overtoneRatio, t);

    const g1 = c.createGain();
    g1.gain.setValueAtTime(0.0001, t);
    g1.gain.linearRampToValueAtTime(volume, t + 0.006);
    g1.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const g2 = c.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.linearRampToValueAtTime(volume * overtoneGain, t + 0.004);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + duration * 0.42);

    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(filterFreq, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(400, filterFreq * 0.45), t + duration);

    osc1.connect(g1);
    osc2.connect(g2);
    g1.connect(lp);
    g2.connect(lp);
    lp.connect(masterBus);
    if (reverb && reverbBus) lp.connect(reverbBus);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration + 0.03);
    osc2.stop(t + duration + 0.03);
  }

  // 1. Ультра-чистый тактильный клик (как мягкий переключатель UI — не пищит)
  function playPick() {
    playNoiseBurst({ duration: 0.012, bandFreq: 2400, q: 2.0, volume: 0.045 });
    playMarimbaNote({
      freq: 640,
      endFreq: 760,
      duration: 0.045,
      volume: 0.055,
      overtoneRatio: 2.5,
      overtoneGain: 0.1,
      filterFreq: 2000,
      reverb: false
    });
  }

  // 2. Тёплый деревянный «тук» при перетаскивании карточки / установке блока
  function playDrop() {
    playNoiseBurst({ duration: 0.015, bandFreq: 950, q: 1.6, volume: 0.065 });
    playMarimbaNote({
      freq: 330,
      endFreq: 210,
      duration: 0.08,
      volume: 0.095,
      overtoneRatio: 2.7,
      overtoneGain: 0.14,
      filterFreq: 1400,
      reverb: false
    });
  }

  // 3. Нежная калимба при соединении пары или выборе героя
  function playConnect() {
    playNoiseBurst({ duration: 0.01, bandFreq: 2600, q: 1.8, volume: 0.03 });
    playMarimbaNote({ freq: 587.33, start: 0, duration: 0.17, volume: 0.085, overtoneRatio: 3.0, overtoneGain: 0.14, filterFreq: 2800 });
    playMarimbaNote({ freq: 880.0, start: 0.055, duration: 0.24, volume: 0.08, overtoneRatio: 2.0, overtoneGain: 0.16, filterFreq: 3200 });
  }

  // 4. Яркий и тёплый аккорд маримбы при правильном ответе (короткий, не мешает голосу героя!)
  function playWin(streak = 1) {
    const semis = Math.min(Math.max(0, streak - 1), 4);
    const mult = Math.pow(2, semis / 12); // музыкальный сдвиг по полутонам на комбо!
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 - E5 - G5 - C6
    notes.forEach((f, i) => {
      playNoiseBurst({ start: i * 0.05, duration: 0.008, bandFreq: 3200, q: 1.5, volume: 0.022 });
      playMarimbaNote({
        freq: f * mult,
        start: i * 0.05,
        duration: i === notes.length - 1 ? 0.34 : 0.22,
        volume: i === notes.length - 1 ? 0.095 : 0.08,
        overtoneRatio: 2.0,
        overtoneGain: 0.22,
        filterFreq: 3800,
        reverb: true
      });
    });
  }

  // 5. Праздничный перебор челесты/арфы при ачивке или рекорде
  function playAchievement() {
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
    notes.forEach((f, i) => {
      playMarimbaNote({
        freq: f,
        start: i * 0.062,
        duration: i === notes.length - 1 ? 0.52 : 0.32,
        volume: 0.082,
        overtoneRatio: 3.0,
        overtoneGain: 0.18,
        filterFreq: 4200,
        reverb: true
      });
    });
  }

  // 6. Мягкий приглушённый деревянный двойной стук при ошибке (дружелюбный, не режет слух)
  function playFail() {
    playNoiseBurst({ start: 0, duration: 0.016, bandFreq: 650, q: 1.2, volume: 0.055 });
    playMarimbaNote({
      freq: 261.63,
      endFreq: 233.08,
      start: 0,
      duration: 0.13,
      volume: 0.095,
      overtoneRatio: 1.5,
      overtoneGain: 0.1,
      filterFreq: 850,
      reverb: false
    });
    playNoiseBurst({ start: 0.11, duration: 0.018, bandFreq: 520, q: 1.2, volume: 0.05 });
    playMarimbaNote({
      freq: 207.65,
      endFreq: 174.61,
      start: 0.11,
      duration: 0.2,
      volume: 0.09,
      overtoneRatio: 1.5,
      overtoneGain: 0.08,
      filterFreq: 700,
      reverb: false
    });
  }

  // 7. Мессенджер: современное кристальное уведомление входящего сообщения
  function playIncoming() {
    playNoiseBurst({ duration: 0.008, bandFreq: 3000, q: 2.0, volume: 0.025 });
    playMarimbaNote({ freq: 698.46, start: 0, duration: 0.11, volume: 0.07, overtoneRatio: 2.0, overtoneGain: 0.15, filterFreq: 3000 });
    playMarimbaNote({ freq: 1046.5, start: 0.045, duration: 0.16, volume: 0.065, overtoneRatio: 2.0, overtoneGain: 0.12, filterFreq: 3400 });
  }

  // 8. Мессенджер: мягкий воздушный «вжух-поп» отправки сообщения
  function playOutgoing() {
    playNoiseBurst({ duration: 0.032, bandFreq: 1500, q: 0.9, volume: 0.038 });
    playMarimbaNote({ freq: 440, endFreq: 620, duration: 0.055, volume: 0.045, overtoneRatio: 2.0, overtoneGain: 0.08, filterFreq: 1800, reverb: false });
  }

  // 9. Реалистичный стеклянный тройной перезвон входящего SMS
  function playSms() {
    playMarimbaNote({ freq: 880.0, start: 0, duration: 0.18, volume: 0.08, overtoneRatio: 2.756, overtoneGain: 0.16, filterFreq: 3800 });
    playMarimbaNote({ freq: 1108.73, start: 0.085, duration: 0.2, volume: 0.08, overtoneRatio: 2.756, overtoneGain: 0.16, filterFreq: 4000 });
    playMarimbaNote({ freq: 1318.51, start: 0.17, duration: 0.34, volume: 0.085, overtoneRatio: 2.756, overtoneGain: 0.18, filterFreq: 4200 });
  }

  // 10. Реалистичный телефонный гудок (425 Гц через телефонный полосовой фильтр 300–3400 Гц)
  function playPhonePulse(offset, dur, vol) {
    const c = getContext();
    if (!c) return;
    const t = c.currentTime + offset;
    const osc = c.createOscillator();
    const bp = c.createBiquadFilter();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(425, t);
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(900, t);
    bp.Q.setValueAtTime(0.8, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.02);
    gain.gain.setValueAtTime(vol, t + Math.max(0.03, dur - 0.04));
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(bp);
    bp.connect(gain);
    gain.connect(masterBus);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  function playDialTone() {
    if (!enabled) return;
    playPhonePulse(0, 0.62, 0.055);
  }

  function playBusyTone() {
    if (!enabled) return;
    [0, 0.28, 0.56].forEach(offset => playPhonePulse(offset, 0.16, 0.055));
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
