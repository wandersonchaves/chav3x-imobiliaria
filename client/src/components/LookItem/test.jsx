const [timeLoopToHome, setTimeLoopToHome] = useState(0);

const handleTimeLoopToHome = () => {
  if (timeLoopToHome) {
    clearInterval(timeLoopToHome);
    setTimeLoopToHome(0);
    return;
  }

  return setInterval(() => {
    setTimeLoopToHome((prevCount) => prevCount + 1);
  }, 1000);
};

useEffect(() => {
  setInterval(() => {
    return handleTimeLoopToHome();
  }, 10000);
}, []);

if (timeLoopToHome >= 60) {
  return navigate('/');
}
