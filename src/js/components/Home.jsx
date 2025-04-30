import React from 'react';                         // 1. React necesario para JSX

// 3. Componente funcional que muestra un saludo con imagen y botón
export default function Home() {
  return (
    <div className="text-center text-white mt-4">
            <p>
        Made by{' '}
        <a href="http://www.4geeksacademy.com" className="text-info">
          4Geeks Academy
        </a>, with love!
      </p>
    </div>
  );
}
