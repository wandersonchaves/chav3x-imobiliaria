import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ImArrowLeft2 } from 'react-icons/im';
import { Loading } from '../../components/Loading';
import { useHouse } from '../../components/HouseContext';

import './styles.css';

export function Houses() {
  const atualHouse = useHouse();
  const newHouseContext = (clickedHouse) => () => {
    atualHouse.chosenHouse(clickedHouse);
  };

  const [house, houseState] = useAllPrismicDocumentsByType('houses');

  const notFound = houseState.state === 'failed';
  const loading = houseState.state === 'loading';

  useEffect(() => {
    if (houseState.state === 'failed') {
      console.warn(
        'Houses document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (houseState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [houseState.state]);

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

  if (house && timeLoopToHome >= 100) {
    return navigate('/');
  }

  if (house) {
    const firstHouse = house.find((item) => {
      return item.uid === 'house01';
    });

    return (
      <div
        onClick={handleTimeLoopToHome}
        className=""
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${firstHouse.data.background.url})`,
        }}
      >
        <div className="">
          <div className="h-screen p-8 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 w-full">
            <Link
              className="absolute z-10 p-8 mButtonBackToHome rounded-full bg-lime-500 hover:bg-lime-600"
              to="/"
            >
              <ImArrowLeft2 size={25} color="#000" />
            </Link>
            <br />
            <div className="flex items-center justify-center h-10 -mb-8 py-2 px-4 bg-lime-500 text-black font-bold rounded-t-lg">
              ESCOLHA SUA CASA
            </div>

            <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
              <img
                src={
                  atualHouse.atualHouse.uid
                    ? atualHouse.atualHouse.data.image.url
                    : house[0].data.image.url
                }
                alt={
                  atualHouse.atualHouse.uid
                    ? atualHouse.atualHouse.data.image.alt
                    : house[0].data.image.alt
                }
                className="lg:w-full lg:h-full"
              />
            </div>

            <div className="bg-gray-300 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 overflow-y-auto h-full">
              {house.map((unitHouse) => (
                <div key={unitHouse.id} className="group relative">
                  <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                    <img
                      src={unitHouse.data.image.url}
                      alt={unitHouse.data.image.alt}
                      className="w-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span
                          onClick={newHouseContext(unitHouse)}
                          aria-hidden="true"
                          className="absolute inset-0"
                        />
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <Link
              to={`/houses/${
                atualHouse.atualHouse.uid
                  ? atualHouse.atualHouse.uid
                  : house[0].uid
              }`}
              className="flex items-center justify-center h-16 -mt-4 bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-4 rounded-b-lg"
            >
              ESCOLHER ESTA CASA
            </Link>
          </div>
          <footer className="flex justify-end"></footer>
        </div>
      </div>
    );
  } else if (loading) {
    return <Loading />;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
