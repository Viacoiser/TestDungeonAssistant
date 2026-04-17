export const initSpeechRecognition = (options = {}) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.error('Web Speech API no soportado en este navegador')
    return null
  }

  const recognition = new SpeechRecognition()
  recognition.continuous = options.continuous ?? true
  recognition.interimResults = options.interimResults ?? true
  recognition.language = options.language || 'es-CL'

  return recognition
}

export const startRecording = async (onInterim, onFinal, onError) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks = []

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(track => track.stop())
    }

    const recognition = initSpeechRecognition()
    if (!recognition) {
      onError('Speech API no soportado')
      return { mediaRecorder, recognition: null }
    }

    recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      if (interimTranscript) onInterim(interimTranscript)
      if (finalTranscript) onFinal(finalTranscript.trim())
    }

    recognition.onerror = (event) => {
      onError(event.error)
    }

    recognition.onend = () => {
      mediaRecorder.stop()
    }

    mediaRecorder.start()
    recognition.start()

    return { mediaRecorder, recognition }
  } catch (error) {
    onError(error.message)
    return null
  }
}

export const stopRecording = ({ mediaRecorder, recognition }) => {
  if (recognition) recognition.stop()
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }
}
