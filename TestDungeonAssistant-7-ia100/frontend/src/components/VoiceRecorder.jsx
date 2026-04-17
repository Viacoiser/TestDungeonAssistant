import React, { useState, useRef, useEffect } from 'react';

export default function VoiceRecorder({ onTranscribed, onError }) {
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [text, setText] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Inicializar Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Web Speech API no soportada en este navegador');
      onError?.('Tu navegador no soporta grabación de voz');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES'; // Español

    recognition.onstart = () => {
      setRecording(true);
      setText('');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      finalTranscript = finalTranscript.trim();

      if (finalTranscript) {
        setText(finalTranscript);
        setRecording(false);
        setTranscribing(false);

        // Callback con texto transcrito
        if (onTranscribed) {
          onTranscribed(finalTranscript);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Error en reconocimiento de voz:', event.error);
      setRecording(false);
      setTranscribing(false);

      const errorMessages = {
        'no-speech': 'No se detectó voz. Intenta de nuevo.',
        'audio-capture': 'No se encontró micrófono.',
        'network': 'Error de conexión.',
        'denied': 'Permiso de micrófono denegado.'
      };

      const message = errorMessages[event.error] || `Error: ${event.error}`;
      onError?.(message);
    };

    recognition.onend = () => {
      setRecording(false);
      setTranscribing(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscribed, onError]);

  const startRecording = () => {
    if (recognitionRef.current) {
      setText('');
      setTranscribing(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="voice-recorder flex gap-2 items-center">
      <button
        onClick={recording ? stopRecording : startRecording}
        disabled={transcribing && !recording}
        className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all ${
          recording
            ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
            : 'bg-[var(--fantasy-accent)] hover:bg-[#e86424] text-white'
        } ${transcribing && !recording ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {recording ? (
          <>
            🔴 Grabando...
          </>
        ) : (
          <>
            🎤 Grabar Voz
          </>
        )}
      </button>

      {transcribing && !recording && (
        <span className="text-sm text-[var(--fantasy-gold-muted)]">Procesando audio...</span>
      )}

      {text && (
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-[var(--fantasy-gold)]">
          "{text}"
        </div>
      )}
    </div>
  );
}

