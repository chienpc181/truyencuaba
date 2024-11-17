import { useState, useEffect } from 'react';

interface UseTextToSpeechHook {
  speaking: boolean;
  speak: (text: string, rate?: number, pitch?: number) => void;
  stopSpeaking: () => void;
}

function useTextToSpeech(): UseTextToSpeechHook {
  // State to track if the speech synthesis is currently speaking
  const [speaking, setSpeaking] = useState<boolean>(false);
  // State to hold the reference to the speech synthesis instance
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  // State to store the chosen voice for speech synthesis
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Find an English voice
        const englishVoice = voices.find(v => v.lang.startsWith('en'));
        if (englishVoice) {
          setVoice(englishVoice);
        }
      };

      // Initial load of voices
      loadVoices();

      // Event listener for when voices change (some browsers need this)
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } else {
      console.error('Text-to-speech not supported on this device/browser.');
    }
  }, []);

  // Function to start speaking the given text
  const speak = (text: string, rate: number = 1, pitch: number = 1): void => {
    if (!synth || !text || !voice) {
      console.warn('Speech synthesis is not available, text is empty, or voice is not set.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Set speaking state when speech starts
    utterance.onstart = () => setSpeaking(true);
    // Reset speaking state when speech ends
    utterance.onend = () => setSpeaking(false);

    // Start speaking
    synth.speak(utterance);
  };

  // Function to stop speaking
  const stopSpeaking = (): void => {
    if (synth && synth.speaking) {
      synth.cancel();
      setSpeaking(false);
    }
  };

  return {
    speaking,
    speak,
    stopSpeaking,
  };
}

export default useTextToSpeech;
