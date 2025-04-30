import React from 'react';                                // 1. React para JSX
import ReactDOM from 'react-dom/client';                  // 2. API de React 18 para montar
import CounterApp from './components/CounterApp.jsx';     // 3. Nuestro componente raíz

// 4. Creamos la “raíz” de React sobre <div id="root">
const root = ReactDOM.createRoot(document.getElementById('root'));

// 5. Montamos <CounterApp /> dentro de <StrictMode> para buenas prácticas
root.render(
  <React.StrictMode>
    <CounterApp />
  </React.StrictMode>
);
