
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const RootApp = () => {
  useEffect(() => {
    // Tenta bloquear a orientação no nível do sistema (suportado por alguns navegadores móveis Android)
    const lockOrientation = async () => {
      try {
        if (window.screen.orientation && (window.screen.orientation as any).lock) {
          await (window.screen.orientation as any).lock('portrait-primary');
        }
      } catch (e) {
        // Ignora erro caso o navegador exija modo tela cheia ou não suporte o lock
        console.debug("Orientation lock not supported or requires interaction");
      }
    };

    lockOrientation();
    
    // Listener para redimensionamento/rotação para garantir o estado
    window.addEventListener('orientationchange', lockOrientation);
    return () => window.removeEventListener('orientationchange', lockOrientation);
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<RootApp />);
