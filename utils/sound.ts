// Audio context singleton to reuse
let _audioCtx: AudioContext | null = null;

const getAudioCtx = () => {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return _audioCtx;
};

// Sound utility for exam countdown - Race/Competition style
export const playCountdownSound = async (type: 'tick' | 'go') => {
  const isMuted = localStorage.getItem('soundMuted') === 'true';
  if (isMuted) return;

  try {
    const audioCtx = getAudioCtx();

    // Resume context if it's suspended
    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    if (type === 'tick') {
      // Race countdown beep - sharp, intense, focused
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      // High-pitched percussive beep (like F1 countdown)
      osc1.type = 'square';
      osc2.type = 'sine';

      const baseFreq = 1400; // High, sharp frequency
      osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(baseFreq * 2, audioCtx.currentTime);

      // Very quick attack for percussive feel
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 0.08);
      osc2.stop(audioCtx.currentTime + 0.08);

    } else if (type === 'go') {
      // Race start signal - powerful, aggressive sweep
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const osc3 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(audioCtx.destination);

      // Triple oscillator for rich, powerful sound
      osc1.type = 'sawtooth'; // Aggressive
      osc2.type = 'square';
      osc3.type = 'sine';

      // Dramatic upward sweep (like race start)
      const startFreq = 300;
      const endFreq = 1200;

      osc1.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + 0.4);

      osc2.frequency.setValueAtTime(startFreq * 1.5, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(endFreq * 1.5, audioCtx.currentTime + 0.4);

      osc3.frequency.setValueAtTime(startFreq / 2, audioCtx.currentTime);
      osc3.frequency.exponentialRampToValueAtTime(endFreq / 2, audioCtx.currentTime + 0.4);

      // Powerful envelope
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.02);
      gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

      osc1.start();
      osc2.start();
      osc3.start();
      osc1.stop(audioCtx.currentTime + 0.6);
      osc2.stop(audioCtx.currentTime + 0.6);
      osc3.stop(audioCtx.currentTime + 0.6);
    }
  } catch (error) {
    console.warn('Audio playback failed:', error);
  }
};

// Alternative: Load actual audio files (commented out for now)
/*
export const playCountdownSound = (type: 'tick' | 'go') => {
  const isMuted = localStorage.getItem('soundMuted') === 'true';
  if (isMuted) return;

  try {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = type === 'tick' ? 0.3 : 0.4;
    audio.play().catch(err => {
      console.warn('Audio playback failed:', err);
    });
  } catch (error) {
    console.warn('Audio playback failed:', error);
  }
};
*/
