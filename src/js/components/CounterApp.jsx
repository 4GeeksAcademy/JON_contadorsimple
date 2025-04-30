import React, { useState, useRef, useEffect } from 'react'; // 1. Hooks de React
import SecondsCounter from './SecondsCounter.jsx';           // 2. Componente de UI que solo muestra icono + dígitos

export default function CounterApp() {                       // 3. Componente principal
  // 4. Segundos actuales que muestra el contador
  const [seconds, setSeconds] = useState(0);
  // 5. Valor inicial para poder "Reiniciar" al mismo punto
  const [initial, setInitial] = useState(0);
  // 6. Input controlado para cuenta regresiva (si el usuario quiere)
  const [inputValue, setInputValue] = useState('');
  // 7. Input controlado para lanzar alerta a cierto segundo
  const [alertTime, setAlertTime] = useState('');
  // 8. Referencia al ID de setInterval, para detenerlo después
  const intervalRef = useRef(null);

  /**
   * 9. startCount: arranca o reinicia la lógica del contador
   *    - Si inputValue tiene un número → cuenta regresiva
   *    - Si está vacío → contador hacia adelante desde 0
   */
  const startCount = () => {
    // 9.1 Detenemos cualquier intervalo previo
    clearInterval(intervalRef.current);

    let isCountdown = false;
    let startVal;

    if (inputValue.trim() !== '') {
      // 9.2 Configuramos cuenta regresiva
      startVal = parseInt(inputValue, 10);
      if (isNaN(startVal) || startVal < 0) {
        alert('Introduce un número válido ≥ 0.');
        return;
      }
      isCountdown = true;         // modo regresivo
      setInitial(startVal);       // guardamos para reiniciar
      setSeconds(startVal);       // arrancamos desde ese valor
    } else {
      // 9.3 Modo contador normal: siempre desde cero
      startVal = 0;
      setInitial(0);
      setSeconds(0);
    }

    // 9.4 Creamos un intervalo que actualiza cada segundo
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        // calculamos siguiente valor (+1 o –1)
        const next = isCountdown ? prev - 1 : prev + 1;

        // 9.5 Alerta si llega al segundo deseado
        if (alertTime && next === parseInt(alertTime, 10)) {
          alert(`¡Tiempo alcanzado: ${alertTime} segundos!`);
        }
        // 9.6 Si es regresiva y llega a 0, detenemos
        if (isCountdown && next <= 0) {
          clearInterval(intervalRef.current);
        }
        return next;
      });
    }, 1000);
  };

  // 10. Auto-arranca el contador al montar el componente
  useEffect(() => {
    startCount();
    return () => clearInterval(intervalRef.current);
  }, []);

  // 11. Controles de pausa, reinicio y reanudar
  const pauseCount  = () => clearInterval(intervalRef.current);
  const resetCount  = () => { clearInterval(intervalRef.current); setSeconds(initial); };
  const resumeCount = () => startCount();

  // 12. Renderizado de la UI
  return (
    <div className="container text-center text-white py-5">
      {/* 12.1 Muestra el cronómetro visual */}
      <SecondsCounter seconds={seconds} />

      {/* 12.2 Inputs para configurar regresiva y alerta */}
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

      {/* 12.3 Botones de control */}
      <div className="btn-group mt-3" role="group">
        <button className="btn btn-primary"   onClick={startCount}>   Iniciar   </button>
        <button className="btn btn-secondary" onClick={pauseCount}>   Parar     </button>
        <button className="btn btn-success"   onClick={resumeCount}>  Reanudar  </button>
        <button className="btn btn-danger"    onClick={resetCount}>   Reiniciar </button>
      </div>
    </div>
  );
}
