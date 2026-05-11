import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, X, AlertCircle, Loader } from 'lucide-react';

export default function CameraCapture({ onCharacterDataExtracted, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  
  const [showVideo, setShowVideo] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Iniciar cámara
  const startCamera = async () => {
    try {
      setError(null);
      console.log('1️⃣ Solicitando cámara con resolución ALTA...');
      
      // Solicitar alta resolución
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 },
          facingMode: 'environment'
        },
        audio: false
      });
      
      console.log('2️⃣ Stream obtenido:', stream);
      console.log('3️⃣ Tracks:', stream.getTracks());
      console.log('4️⃣ videoRef.current:', videoRef.current);
      
      // Asegúrate que el ref existe ANTES de continuar
      if (!videoRef.current) {
        console.error('❌ El elemento video aún no está en el DOM');
        // Reintentar después de mostrar el video
        console.log('5️⃣ Esperando a que el elemento se renderice...');
        setShowVideo(true);
        
        // Esperar a que React renderice el elemento
        setTimeout(() => {
          if (videoRef.current) {
            console.log('✅ Elemento video encontrado, asignando stream...');
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(e => console.error('Error play:', e));
          }
        }, 100);
        return;
      }
      
      // Si el ref existe, asignar directamente
      console.log('5️⃣ Elemento video encontrado, asignando stream...');
      videoRef.current.srcObject = stream;
      setShowVideo(true);
      
      // Reproducir después de un pequeño delay
      setTimeout(() => {
        videoRef.current?.play().catch(e => console.error('❌ Error al reproducir:', e));
      }, 500);
      
    } catch (err) {
      console.error('❌ Error de cámara:', err);
      let msg = 'Error al acceder a la cámara';
      if (err.name === 'NotAllowedError') msg = '🔐 Permiso denegado. Permite acceso a Iriun Webcam en el navegador.';
      else if (err.name === 'NotFoundError') msg = '📷 No hay cámara disponible. ¿Iriun Webcam está abierto y activado?';
      else if (err.name === 'NotReadableError') msg = '⚠️ Iriun Webcam o la cámara no responden. Intenta reiniciar la app.';
      else msg = '❌ ' + err.message;
      setError(msg);
    }
  };

  // Detener cámara
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setShowVideo(false);
  };

  // Capturar foto
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL('image/png');
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  // Enviar a Gemini
  const processImage = async (imageData) => {
    setLoading(true);
    setError(null);

    try {
      const blob = await (await fetch(imageData)).blob();
      const formData = new FormData();
      formData.append('file', blob, 'character.png');

      const token = localStorage.getItem('token');
      const response = await fetch('/api/vision/digitize', {
        method: 'POST',
        body: formData,
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      const result = await response.json();

      if (result.success && result.data) {
        onCharacterDataExtracted(result.data);
      } else {
        setError(result.message || 'Error al procesar imagen');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar al cerrar
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📸 Escanear Hoja</h2>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 rounded flex gap-2">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <Loader size={32} className="text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">Procesando con Gemini...</p>
          </div>
        )}

        {/* Video - Siempre renderizado para que el ref esté disponible */}
        <video
          ref={videoRef}
          autoPlay={true}
          muted={true}
          playsInline={true}
          controls={false}
          style={{ 
            width: '100%',
            height: showVideo ? '300px' : '0px',
            objectFit: 'cover',
            backgroundColor: '#000',
            display: showVideo ? 'block' : 'none',
            minHeight: showVideo ? '300px' : '0px',
            transition: 'all 0.3s ease'
          }}
          onPlay={() => console.log('🎬 Video play event disparado')}
          onLoadedMetadata={() => console.log('📹 Metadata cargado')}
          onCanPlay={() => console.log('▶️ Listo para reproducir')}
        />

        {/* Video Container con indicador */}
        {showVideo && !capturedImage && (
          <>
            <div className="mb-4 bg-black rounded-lg overflow-hidden relative border-4 border-blue-500">
              <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                EN VIVO
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center mb-4">📋 Apunta a la hoja completa de D&D</p>
            <button
              onClick={capturePhoto}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
            >
              <Camera size={20} /> Capturar
            </button>
          </>
        )}

        {/* Imagen Capturada */}
        {capturedImage && !loading && (
          <>
            <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <img src={capturedImage} alt="Captura" className="w-full aspect-video object-cover" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCapturedImage(null)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold"
              >
                Retomar
              </button>
              <button
                onClick={() => processImage(capturedImage)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
              >
                Procesar
              </button>
            </div>
          </>
        )}

        {/* Inicio */}
        {!showVideo && !capturedImage && !loading && (
          <>
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-900 mb-2">📱 <strong>Usando Iriun Webcam:</strong></p>
              <ul className="text-sm text-purple-800 list-disc list-inside space-y-1">
                <li>Asegúrate que Iriun Webcam está <strong>abierto</strong> en tu teléfono</li>
                <li>La cámara debe estar <strong>activada</strong> (botón rojo encendido)</li>
                <li>El navegador pedirá permiso → <strong>Permite</strong></li>
                <li>Apunta a tu hoja de personaje D&D</li>
              </ul>
            </div>

            <button
              onClick={startCamera}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg flex items-center justify-center gap-2 font-semibold mb-3 text-lg transition-all hover:shadow-lg"
            >
              <Camera size={24} /> Abrir Cámara
            </button>
            
            <div className="text-center text-gray-600 text-sm my-3">— o —</div>
            
            <button
              onClick={() => inputRef.current?.click()}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all hover:shadow-md"
            >
              <Upload size={20} /> Subir Archivo
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setCapturedImage(ev.target?.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
