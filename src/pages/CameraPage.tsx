import { useState, useRef, useEffect } from 'react';
import { Camera, Heart } from 'lucide-react';
import Header from '../components/Header';
import TokenReward from '../components/TokenReward';
import BottomNavigation from '../components/NavBar';

const CameraPage = ({darkMode,setDarkMode}:any) => {

  const [tokens, setTokens] = useState(250);
  const [userName] = useState('Guest');
  const [isCapturing, setIsCapturing] = useState(false);
  const [recentPhoto, setRecentPhoto] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

 
  const toggleCamera = async () => {
    if (!isCameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraActive(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access the camera. Please check permissions.");
      }
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        setIsCameraActive(false);
      }
    }
  };

  const handlePhotoCapture = () => {
    if (!isCameraActive || !videoRef.current || !canvasRef.current) {
      alert("Please turn on the camera first!");
      return;
    }

    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setRecentPhoto(true);
      setTokens(prev => prev + 25);
      setTimeout(() => setRecentPhoto(false), 2000);

      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas!.width = video!.videoWidth;
      canvas!.height = video!.videoHeight;

      const context = canvas!.getContext('2d');
      if (context) {
        context.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
        const imageData = canvas!.toDataURL('image/png');
        setCapturedImage(imageData);
      }
    }, 1000);
  };

  const toggleRecording = () => {
    if (!isCameraActive || !videoRef.current?.srcObject) {
      alert("Please turn on the camera first!");
      return;
    }

    if (!isRecording) {
      const stream = videoRef.current.srcObject as MediaStream;
      recordedChunksRef.current = [];

      const options = { mimeType: 'video/webm' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
        setTokens(prev => prev + 50);
      };

      mediaRecorderRef.current.start(100);
      setIsRecording(true);
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const bgClass = darkMode ? 'bg-gradient-to-br from-gray-900 to-purple-900' : 'bg-gradient-to-br from-purple-50 to-pink-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardBgClass = darkMode ? 'bg-gray-800/80' : 'bg-white/80';

  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen`}>
      <TokenReward show={recentPhoto} amount={25} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} tokens={tokens} userName={userName} />

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

          <div className="relative mb-6 aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : ''}`}
            ></video>
            <canvas ref={canvasRef} className="hidden"></canvas>

            {!isCameraActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Capture Love Moments</p>
                  <p className="text-sm opacity-75">Earn LOVE tokens instantly</p>
                </div>
              </div>
            )}

            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <div className="bg-black/50 rounded-full p-2">
                <Heart className={`w-4 h-4 ${isCameraActive ? 'text-rose-400 animate-pulse' : 'text-gray-400'}`} />
              </div>
              <div className="bg-black/50 rounded-full px-3 py-1">
                <span className="text-white text-xs font-medium">LOVE MODE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-8">
            <button
              onClick={toggleCamera}
              className={`w-12 h-12 ${cardBgClass} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all ${isCameraActive ? 'ring-2 ring-rose-500' : ''}`}
            >
              <Heart className={`w-6 h-6 ${isCameraActive ? 'text-rose-500 animate-pulse' : 'text-gray-400'}`} />
            </button>

            <button
              onClick={handlePhotoCapture}
              disabled={isCapturing || !isCameraActive}
              className={`w-20 h-20 rounded-full shadow-xl transition-all duration-200 ${isCapturing
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 scale-95'
                  : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:scale-105'
                }`}
            >
              <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center">
                <Camera className={`w-8 h-8 text-gray-700 ${isCapturing ? 'animate-pulse' : ''}`} />
              </div>
            </button>

            <button
              onClick={toggleRecording}
              disabled={!isCameraActive}
              className={`w-12 h-12 ${cardBgClass} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all ${isRecording ? 'ring-2 ring-purple-500' : ''}`}
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
