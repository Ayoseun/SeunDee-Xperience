import { useState, useRef, useEffect } from 'react';
import { Camera, Heart } from 'lucide-react';
import Header from '../components/Header';
import TokenReward from '../components/TokenReward';
import BottomNavigation from '../components/NavBar';

const CameraPage = ({darkMode, setDarkMode,name}: any) => {
  const [tokens, setTokens] = useState(250);

  const [isCapturing, setIsCapturing] = useState(false);
  const [recentPhoto, setRecentPhoto] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Cleanup function to properly stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setCameraError(null);

      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported in this browser');
      }

      // Try different camera configurations
      const constraints = [
        { video: { facingMode: 'environment', width: 1280, height: 720 }, audio: false },
        { video: { facingMode: 'environment' }, audio: false },
        { video: { width: 1280, height: 720 }, audio: false },
        { video: true, audio: false }
      ];

      let stream: MediaStream | null = null;
      let lastError: Error | null = null;

      for (const constraint of constraints) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(constraint);
          break;
        } catch (err) {
          lastError = err as Error;
          continue;
        }
      }

      if (!stream) {
        throw lastError || new Error('Could not access camera');
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to be ready
        await new Promise((resolve, reject) => {
          const video = videoRef.current!;
          const timeoutId = setTimeout(() => reject(new Error('Video load timeout')), 10000);
          
          video.onloadedmetadata = () => {
            clearTimeout(timeoutId);
            resolve(void 0);
          };
          
          video.onerror = () => {
            clearTimeout(timeoutId);
            reject(new Error('Video load error'));
          };
        });

        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown camera error';
      
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        setCameraError('Camera permission denied. Please allow camera access and try again.');
      } else if (errorMessage.includes('NotFoundError') || errorMessage.includes('DevicesNotFoundError')) {
        setCameraError('No camera found on this device.');
      } else if (errorMessage.includes('NotReadableError')) {
        setCameraError('Camera is already in use by another application.');
      } else {
        setCameraError(`Camera error: ${errorMessage}`);
      }
      
      stopCamera();
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCamera = async () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  const handlePhotoCapture = () => {
    if (!isCameraActive || !videoRef.current || !canvasRef.current) {
      setCameraError("Please turn on the camera first!");
      return;
    }

    const video = videoRef.current;
    
    // Check if video is actually playing
    if (video.readyState < 2) {
      setCameraError("Camera is not ready. Please wait a moment and try again.");
      return;
    }

    setIsCapturing(true);
    setCameraError(null);

    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || video.clientWidth;
      canvas.height = video.videoHeight || video.clientHeight;

      // Draw the current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL with good quality
      const imageData = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageData);
      
      // Award tokens and show feedback
      setTokens(prev => prev + 25);
      setRecentPhoto(true);
      setTimeout(() => setRecentPhoto(false), 2000);
      
    } catch (err) {
      console.error("Photo capture error:", err);
      setCameraError("Failed to capture photo. Please try again.");
    } finally {
      setTimeout(() => setIsCapturing(false), 500);
    }
  };

  const toggleRecording = () => {
    if (!isCameraActive || !streamRef.current) {
      setCameraError("Please turn on the camera first!");
      return;
    }

    if (!isRecording) {
      try {
        recordedChunksRef.current = [];
        
        // Check MediaRecorder support
        if (!MediaRecorder.isTypeSupported('video/webm')) {
          throw new Error('Video recording not supported in this browser');
        }

        const options = { mimeType: 'video/webm;codecs=vp9' };
        
        // Fallback if vp9 not supported
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options.mimeType = 'video/webm';
        }
        
        mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          try {
            const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);
            setRecordedVideo(videoUrl);
            setTokens(prev => prev + 50);
          } catch (err) {
            console.error("Video processing error:", err);
            setCameraError("Failed to process recorded video.");
          }
        };

        mediaRecorderRef.current.onerror = (e) => {
          console.error("MediaRecorder error:", e);
          setCameraError("Recording failed. Please try again.");
          setIsRecording(false);
        };

        mediaRecorderRef.current.start(1000); // Record in 1-second chunks
        setIsRecording(true);
        setCameraError(null);
        
      } catch (err) {
        console.error("Recording start error:", err);
        setCameraError("Could not start recording. Feature may not be supported.");
      }
    } else {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      // Clean up any object URLs
      if (recordedVideo) {
        URL.revokeObjectURL(recordedVideo);
      }
    };
  }, []);

  const bgClass = darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-purple-50 to-pink-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';

  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen`}>
      <TokenReward show={recentPhoto} amount={25} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} tokens={tokens} userName={name} />

      <div className={`flex-1 ${bgClass} relative overflow-y-auto`}>
        <div className="relative z-10 p-6 pb-32">
          <div className="flex justify-between items-center mb-6">
            <div className={`${cardBgClass} backdrop-blur-sm rounded-full px-4 py-2 shadow-sm`}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Live Wedding 💒</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-4 mb-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">💐 Couple Spotting Challenge</h3>
                <p className="text-sm opacity-90">Find Sarah & Michael = 3x tokens!</p>
              </div>
              <div className="text-2xl">👰‍♀️🤵‍♂️</div>
            </div>
          </div>

          {/* Error Display */}
          {cameraError && (
            <div className="bg-red-500/90 text-white p-3 rounded-lg mb-4 text-sm">
              {cameraError}
            </div>
          )}

          <div className="relative mb-6 aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : ''}`}
            />
            <canvas ref={canvasRef} className="hidden" />

            {!isCameraActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  {isLoading ? (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <p className="text-lg font-medium">Starting Camera...</p>
                    </>
                  ) : (
                    <>
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">Capture Love Moments</p>
                      <p className="text-sm opacity-75">Earn LOVE tokens instantly</p>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <div className="bg-black/50 rounded-full p-2">
                <Heart className={`w-4 h-4 ${isCameraActive ? 'text-rose-400 animate-pulse' : 'text-gray-400'}`} />
              </div>
              <div className="bg-black/50 rounded-full px-3 py-1">
                <span className="text-white text-xs font-medium">
                  {isRecording ? 'RECORDING' : 'LOVE MODE'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-8">
            <button
              onClick={toggleCamera}
              disabled={isLoading}
              className={`w-12 h-12 ${cardBgClass} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all ${isCameraActive ? 'ring-2 ring-rose-500' : ''} ${isLoading ? 'opacity-50' : ''}`}
            >
              <Heart className={`w-6 h-6 ${isCameraActive ? 'text-rose-500 animate-pulse' : 'text-gray-400'}`} />
            </button>

            <button
              onClick={handlePhotoCapture}
              disabled={isCapturing || !isCameraActive || isLoading}
              className={`w-20 h-20 rounded-full shadow-xl transition-all duration-200 ${
                isCapturing
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 scale-95'
                  : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:scale-105'
              } ${(!isCameraActive || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center">
                <Camera className={`w-8 h-8 text-gray-700 ${isCapturing ? 'animate-pulse' : ''}`} />
              </div>
            </button>

            <button
              onClick={toggleRecording}
              disabled={!isCameraActive || isLoading}
              className={`w-12 h-12 ${cardBgClass} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all ${
                isRecording ? 'ring-2 ring-red-500' : ''
              } ${(!isCameraActive || isLoading) ? 'opacity-50' : ''}`}
            >
              <div className={`w-6 h-6 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
            </button>
          </div>

          {capturedImage && (
            <div className="mt-6">
              <h3 className={`text-lg font-bold ${textClass} mb-2`}>Captured Memory</h3>
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full rounded-lg shadow-lg mb-4"
              />
            </div>
          )}

          {recordedVideo && (
            <div className="mt-6">
              <h3 className={`text-lg font-bold ${textClass} mb-2`}>Recorded Memory</h3>
              <video
                src={recordedVideo}
                controls
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
      <BottomNavigation activeTab="camera" darkMode={darkMode} />
    </div>
  );
};

export default CameraPage;