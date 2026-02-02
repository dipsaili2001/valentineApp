import { useState } from 'react';
import HomePage from './pages/HomePage';
import SuccessPage from './pages/SuccessPage';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen">
      {!showSuccess ? (
        <HomePage onYesClick={() => setShowSuccess(true)} />
      ) : (
        <SuccessPage />
      )}
    </div>
  );
}

export default App;
