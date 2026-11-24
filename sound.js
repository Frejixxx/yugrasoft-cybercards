// звуки для сайта на Web Audio API, без внешних файлов
// делаем звуки как в майнкрафте: клики, блоки, подбор, опыт, уровень и ачивка
// плюс звуки смс и гудки телефона для симулятора чатов

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
    const len = Math.floor(c.sampleRate * 0.24);
    const buf = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        const decay = Math.pow(1 - i / len, 3.0);
        data[i] = (Math.random() * 2 - 1) * decay * 0.4;
      }
    }
    return buf;
  }

  function getContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();

      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.knee.value = 18;
      comp.ratio.value = 4;
      comp.attack.value = 0.003;
      comp.release.value = 0.12;

      const outGain = ctx.createGain();
      outGain.gain.value = 0.9;

      comp.connect(outGain);
      outGain.connect(ctx.destination);
      masterBus = comp;

      const convolver = ctx.createConvolver();
      convolver.buffer = buildImpulseBuffer(ctx);
      const revGain = ctx.createGain();
      revGain.gain.value = 0.2;
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

  function playNoise({ start = 0, duration = 0.02, freq = 1400, q = 1.4, volume = 0.08, type = 'bandpass' }) {
    if (!enabled) return;
    const c = getContext();
    if (!c || !noiseBuffer) return;
    const t = c.currentTime + start;

    const src = c.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = c.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t);
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

  function playOsc({
    freq,
    endFreq = null,
    wave = 'sine',
    start = 0,
    duration = 0.18,
    volume = 0.1,
    attack = 0.004,
    filterFreq = 3200,
    reverb = false
  }) {
    if (!enabled) return;
    const c = getContext();
    if (!c) return;
    const t = c.currentTime + start;

    const osc = c.createOscillator();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(25, endFreq), t + duration * 0.78);
    }

    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(filterFreq, t);

    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(volume, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(lp);
    lp.connect(gain);
    gain.connect(masterBus);
    if (reverb && reverbBus) gain.connect(reverbBus);

    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  // клик по кнопке (похоже на каменную кнопку в меню)
  function playPick() {
    playNoise({ duration: 0.016, freq: 1850, q: 1.9, volume: 0.085 });
    playOsc({ freq: 720, endFreq: 310, wave: 'triangle', duration: 0.032, volume: 0.08, attack: 0.002, filterFreq: 1900 });
  }

  // звук установки блока
  function playDrop() {
    playNoise({ duration: 0.028, freq: 720, q: 1.2, volume: 0.11 });
    playNoise({ start: 0.006, duration: 0.02, freq: 2100, q: 1.5, volume: 0.035 });
    playOsc({ freq: 195, endFreq: 88, wave: 'triangle', duration: 0.078, volume: 0.14, attack: 0.002, filterFreq: 850 });
  }

  // звук подбора предмета
  function playConnect() {
    playNoise({ duration: 0.01, freq: 2600, q: 1.8, volume: 0.035 });
    playOsc({ freq: 410, endFreq: 1080, wave: 'sine', duration: 0.062, volume: 0.11, attack: 0.003, filterFreq: 3200 });
    playOsc({ freq: 820, endFreq: 1560, wave: 'triangle', start: 0.015, duration: 0.055, volume: 0.045, attack: 0.003, filterFreq: 3600 });
  }

  // звон сферы опыта (для найденных улик)
  function playXpOrb() {
    const pitches = [1396.91, 1567.98, 1760.0, 1975.53]; // ноты F6, G6, A6, B6
    const base = pitches[Math.floor(Math.random() * pitches.length)] * (0.97 + Math.random() * 0.06);
    playOsc({ freq: base, endFreq: base * 1.03, wave: 'sine', start: 0, duration: 0.24, volume: 0.095, attack: 0.003, filterFreq: 5200, reverb: true });
    playOsc({ freq: base * 1.5, wave: 'sine', start: 0.025, duration: 0.19, volume: 0.04, attack: 0.004, filterFreq: 5800, reverb: true });
  }

  // звук верного ответа / повышения уровня
  function playWin(streak = 1) {
    const semis = Math.min(Math.max(0, streak - 1), 4);
    const mult = Math.pow(2, semis / 12);
    // аккорд вверх как при новом уровне
    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5 - F#5 - A5 - D6
    notes.forEach((f, i) => {
      const st = i * 0.055;
      playOsc({ freq: f * mult, wave: 'sine', start: st, duration: i === 3 ? 0.36 : 0.2, volume: 0.095, attack: 0.004, filterFreq: 4800, reverb: true });
      playOsc({ freq: f * mult * 2, wave: 'sine', start: st + 0.006, duration: 0.16, volume: 0.032, attack: 0.004, filterFreq: 5600, reverb: true });
      playOsc({ freq: f * mult * 0.5, wave: 'triangle', start: st, duration: 0.18, volume: 0.045, attack: 0.005, filterFreq: 1400 });
    });
  }

  // звук получения достижения
  function playAchievement() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5 E5 G5 C6 E6
    notes.forEach((f, i) => {
      const st = i * 0.075;
      const dur = i === notes.length - 1 ? 0.55 : 0.28;
      playOsc({ freq: f, wave: 'triangle', start: st, duration: dur, volume: 0.09, attack: 0.006, filterFreq: 3800, reverb: true });
      playOsc({ freq: f * 2, wave: 'sine', start: st + 0.008, duration: dur * 0.75, volume: 0.038, attack: 0.006, filterFreq: 5200, reverb: true });
    });
  }

  // глухой стук при ошибке
  function playFail() {
    playNoise({ start: 0, duration: 0.025, freq: 520, q: 1.1, volume: 0.09 });
    playOsc({ freq: 210, endFreq: 145, wave: 'triangle', start: 0, duration: 0.12, volume: 0.11, attack: 0.003, filterFreq: 680 });
    playNoise({ start: 0.11, duration: 0.026, freq: 420, q: 1.1, volume: 0.08 });
    playOsc({ freq: 165, endFreq: 112, wave: 'triangle', start: 0.11, duration: 0.18, volume: 0.105, attack: 0.003, filterFreq: 560 });
  }

  // входящее сообщение в чате
  function playIncoming() {
    playNoise({ duration: 0.008, freq: 3000, q: 2.0, volume: 0.022 });
    playOsc({ freq: 698.46, wave: 'sine', start: 0, duration: 0.1, volume: 0.07, filterFreq: 3000, reverb: true });
    playOsc({ freq: 1046.5, wave: 'sine', start: 0.045, duration: 0.15, volume: 0.065, filterFreq: 3400, reverb: true });
  }

  // отправка сообщения
  function playOutgoing() {
    playNoise({ duration: 0.022, freq: 1600, q: 1.0, volume: 0.035 });
    playOsc({ freq: 440, endFreq: 660, wave: 'sine', duration: 0.05, volume: 0.05, filterFreq: 1900 });
  }

  // звук нового смс
  function playSms() {
    playOsc({ freq: 880.0, wave: 'sine', start: 0, duration: 0.18, volume: 0.08, filterFreq: 3800, reverb: true });
    playOsc({ freq: 1108.73, wave: 'sine', start: 0.085, duration: 0.2, volume: 0.08, filterFreq: 4000, reverb: true });
    playOsc({ freq: 1318.51, wave: 'sine', start: 0.17, duration: 0.34, volume: 0.085, filterFreq: 4200, reverb: true });
  }

  // гудок телефона 425 Гц
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
    playPick, playDrop, playConnect, playXpOrb,
    playIncoming, playSms, playOutgoing,
    playDialTone, playBusyTone, playFail, playWin, playAchievement,
    hasNeuralVoice, onVoicesReady, speakVoice, playAudioFile, stopAudioFile, stopSpeech
  };
})();
