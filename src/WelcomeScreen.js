import { useState, useEffect } from 'react';

const WelcomeScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Hide welcome screen after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete && onComplete();
      }, 800);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-orange-400 via-green-500 to-white flex flex-col justify-center items-center z-50 opacity-0 transition-opacity duration-800 scale-110">
        {/* Fade out animation */}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-orange-400 via-green-500 to-white flex flex-col justify-center items-center z-50 transition-all duration-800 px-4 py-8">
      {/* Logo/Brand Image - Mobile Optimized */}
      <div className="relative mb-6 sm:mb-8 animate-bounce">
        <img src="/logo.png" alt="Shree Laxmi Hot Chips" 
             className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full shadow-xl object-cover border-4 border-white" />
      </div>

      {/* Welcome Text - Mobile First */}
      <div className="text-center mb-4 sm:mb-6 px-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg animate-pulse leading-tight">
           Welcome to<br className="sm:hidden" />
          <span className="block sm:inline"> Shree Laxmi Hot Chips </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold mb-1 sm:mb-2 drop-shadow-md">
          Proudly Indian • Authentically Delicious
        </p>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-orange-100 font-medium drop-shadow-md animate-bounce">
          🔥 Made with Love in Bharat 🔥
        </p>
      </div>

      {/* Progress Bar - Mobile Responsive */}
      <div className="w-72 sm:w-80 md:w-96 h-1.5 sm:h-2 bg-white bg-opacity-30 rounded-full overflow-hidden shadow-inner mx-4">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-green-600 rounded-full transition-all duration-100 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Text - Mobile Optimized */}
      <p className="mt-3 sm:mt-4 text-white text-xs sm:text-sm md:text-base font-medium animate-pulse">
        Loading delicious chips... {Math.round(progress)}%
      </p>

      {/* Floating Elements - Mobile Safe Positioning */}
      <div className="absolute top-16 left-4 sm:top-20 sm:left-8 text-2xl sm:text-3xl md:text-4xl animate-bounce">🌶️</div>
      <div className="absolute top-24 right-4 sm:top-32 sm:right-8 text-xl sm:text-2xl md:text-3xl animate-pulse">🥔</div>
      <div className="absolute bottom-24 left-4 sm:bottom-32 sm:left-8 text-xl sm:text-2xl md:text-3xl animate-bounce delay-500">🍌</div>
      <div className="absolute bottom-16 right-4 sm:bottom-20 sm:right-8 text-2xl sm:text-3xl md:text-4xl animate-pulse delay-700">🥥</div>
    </div>
  );
};

export default WelcomeScreen;