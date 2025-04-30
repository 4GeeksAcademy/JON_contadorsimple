import React, { useState, useRef, useEffect } from 'react';  // 1. Hooks de React
import Home from './Home.jsx';                               // 2. Componente de bienvenida
import SecondsCounter from './SecondsCounter.jsx';           // 3. Componente visual del contador

export default function CounterApp() {
  // 4. Estado para los segundos actuales (positivo o regresivo)
  const [seconds, setSeconds] = useState(0);

  // 5. Estado para guardar valor inicial (útil al reiniciar)
  const [initial, setInitial] = useState(0);

  // 6. Estado controlado para input de cuenta regresiva
  const [inputValue, setInputValue] = useState('');

  // 7. Estado controlado para input de tiempo de alerta
  const [alertTime, setAlertTime] = useState('');

  // 8. Referencia al intervalo (para poder pararlo)
  const intervalRef = useRef(null);

  // 9. useEffect se ejecuta al montar el componente
  useEffect(() => {
    // 9.1. Inicializamos el contador normal desde la carga de la página
    setSeconds(Math.floor((Date.now() - window.pageLoadTime) / 1000));
    // 9.2. Al desmontar, limpiamos el intervalo
    return () => clearInterval(intervalRef.current);
  }, []);

  /**
   * 10. Función que inicia o reinicia el contador:
   *     - Si hay un valor en inputValue, hace cuenta regresiva desde ese valor.
   *     - Si no, cuenta hacia adelante desde pageLoadTime.
   *     - Cada segundo:
   *         • Actualiza el estado `seconds`
   *         • Lanza alerta si `seconds === alertTime`
   *         • Detiene el intervalo si la cuenta regresiva llega a 0
   */
  const startCount = () => {
    clearInterval(intervalRef.current);
    let isCountdown = false;
    let startVal;

    if (inputValue.trim() !== '') {
      // 10.1. Configurar cuenta regresiva
      startVal = parseInt(inputValue, 10);
      if (isNaN(startVal) || startVal < 0) {
        alert('Introduce un número válido ≥ 0.');
        return;
      }
      isCountdown = true;
      setInitial(startVal);
      setSeconds(startVal);
    } else {
      // 10.2. Contador normal
      startVal = Math.floor((Date.now() - window.pageLoadTime) / 1000);
      setSeconds(startVal);
    }

    // 10.3. Creamos un intervalo que actualiza cada segundo
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        const next = isCountdown ? prev - 1 : prev + 1;

        // 10.4. Alerta si coincide con alertTime
        if (alertTime && next === parseInt(alertTime, 10)) {
          alert(`¡Tiempo alcanzado: ${alertTime} segundos!`);
        }
        // 10.5. Si es regresiva y llega a 0, detenemos
        if (isCountdown && next <= 0) {
          clearInterval(intervalRef.current);
        }
        return next;
      });
    }, 1000);
  };

  // 11. Funciones para controlar el intervalo
  const pauseCount  = () => clearInterval(intervalRef.current);
  const resetCount  = () => { clearInterval(intervalRef.current); setSeconds(initial); };
  const resumeCount = () => startCount();

  return (
    <div className="container text-center text-white">
      {/* 12. Componente de bienvenida */}
      <Home />

      {/* 13. Barra del contador */}
      <SecondsCounter seconds={seconds} />

      {/* 14. Controles (inputs) */}
      <div className="row justify-content-center mt-4">
        <div className="col-auto">
          <label className="form-label">
            Cuenta regresiva:
            <input
              type="number"
              min="0"
              className="form-control d-inline-block w-auto ms-2"
              placeholder="segundos"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </label>
        </div>
        <div className="col-auto">
          <label className="form-label">
            Alerta en:
            <input
              type="number"
              min="0"
              className="form-control d-inline-block w-auto ms-2"
              placeholder="segundos"
              value={alertTime}
              onChange={e => setAlertTime(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* 15. Botones de control */}
      <div className="btn-group mt-3" role="group">
        <button className="btn btn-primary"   onClick={startCount}> Iniciar   </button>
        <button className="btn btn-secondary" onClick={pauseCount}> Parar     </button>
        <button className="btn btn-success"   onClick={resumeCount}>Reanudar  </button>
        <button className="btn btn-danger"    onClick={resetCount}> Reiniciar</button>
      </div>
    </div>
  );
}
