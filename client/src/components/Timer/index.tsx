import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Timer({ element, route }) {
  const navigate = useNavigate();
  const [timeLoopToHome, setTimeLoopToHome] = useState(0);

   function handleTimeLoopToHome() {
    if (timeLoopToHome) {
      clearInterval(timeLoopToHome);
      setTimeLoopToHome(0);
    }

    setInterval(() => {
      setTimeLoopToHome((prevCount) => prevCount + 1);
    }, 1000);
  }

  // Executa o timer pela primeira vez automaticamente
  useEffect(() => {
    setInterval(() => {
      handleTimeLoopToHome();
    }, 10000);
  }, []);

  if (element && timeLoopToHome >= 100) {
    return navigate(route);
  }
}
