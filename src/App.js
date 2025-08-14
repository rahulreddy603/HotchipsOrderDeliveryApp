
import './App.css';
import { useState } from 'react';
import HotChipsApp from './HotChipsApp';
import WelcomeScreen from './WelcomeScreen'; // Add this import

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <div className="App">
      {showWelcome && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      {!showWelcome && <HotChipsApp />}
    </div>
    
  );
}

export default App;