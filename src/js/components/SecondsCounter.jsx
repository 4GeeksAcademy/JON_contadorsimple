import React from 'react';               // 1. React necesario para JSX
import '../../styles/index.css';         // 2. Importa los estilos del contador

/**
 * 3. SecondsCounter recibe por prop un número de segundos y muestra:
 *    - El icono de reloj en la primera tarjeta
 *    - Seis dígitos (con ceros a la izquierda) en las siguientes tarjetas
 */
export default function SecondsCounter({ seconds }) {
  // 4. Convertimos el número a string con al menos 6 caracteres (relleno con '0')
  const text = String(Math.max(0, seconds)).padStart(6, '0');

  return (
    <div className="counter-bar">
      {/* 5. Primera “digit-card” con icono de reloj */}
      <div className="digit-card">
        <i className="fas fa-clock"></i>
      </div>

      {/* 6. Mapeamos cada caracter del string para generar una tarjeta por dígito */}
      {text.split('').map((digit, idx) => (
        <div key={idx} className="digit-card">
          <span>{digit}</span>
        </div>
      ))}
    </div>
  );
}
