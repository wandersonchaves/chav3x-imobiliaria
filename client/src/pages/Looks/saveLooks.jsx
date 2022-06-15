import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAllPrismicDocumentsByType } from '@prismicio/react';

import { NotFound } from '../NotFount';
import { ImArrowLeft2, ImHome } from 'react-icons/im';
import { LookContext } from '../../components/LookContext';
import { HomePage } from '../Home';

import './styles.css';

export function SaveLooks() {
  const navigate = useNavigate();
  const [look, lookState] = useAllPrismicDocumentsByType('look');
  const [lookSelected, setLookSelected] = useState({});

  const notFound = lookState.state === 'failed';
  const loading = lookState.state === 'loading';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository.',
      );
    } else if (lookState.state === 'loading') {
      console.warn('Loading...');
    }
  }, [lookState.state]);

  const atualLook = useContext(LookContext);
  const itemSelected = (clickedLook) => () => {
    atualLook.chosenLook(clickedLook);
  };

  useEffect(() => {
    setLookSelected(
      Object.keys(atualLook.atualLook).map((key) => {
        return atualLook.atualLook[key];
      }),
    );
  }, [atualLook]);

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

  if (look) {
    return (
      <div
        className="bg-cover bg-center h-screen"
        onClick={handleTimeLoopToHome}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${look[0].data.background.url})`,
        }}
      >
        <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden rounded-2xl">
          <div className="h-screen w-screen mt-10 grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-4">
            {/* <Link className="justify-self-start self-end" to="/">
              <div className="flex items-center justify-center h-14 w-14 mt-4 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                <ImArrowLeft2 size={25} color="#fff" />
              </div>
            </Link>
            <Link className="justify-self-end self-end" to="/">
              <div className="flex items-center justify-center h-14 w-14 mt-4 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                <ImHome size={25} color="#fff" />
              </div>
            </Link> */}

            <Link
              className="absolute p-8 mbuttomBackLooks rounded-full text-slate-200 bg-indigo-500 hover:bg-indigo-700"
              to="/"
            >
              <ImArrowLeft2 size={50} color="#fff" />
            </Link>

            <br />
            <div className="flex items-center justify-center p-8 font-bold text-white h-14 mt-4 bg-slate-600 mChooseLook">
              ESCOLHA SEU LOOK
            </div>

            <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
              <img
                src={
                  lookSelected[0].look
                    ? lookSelected[0].look.data.image_look.url
                    : lookSelected[0].data.image_look.url
                }
                alt={
                  lookSelected[0].look
                    ? lookSelected[0].look.data.image_look.alt
                    : lookSelected[0].data.image_look.alt
                }
                className="lg:w-full lg:h-full"
              />
            </div>

            <div className="bg-gray-300 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 rounded-md overflow-y-auto h-full">
              {look.map((unitLook) => (
                <div key={unitLook.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                    <img
                      src={unitLook.data.image_look.url}
                      alt={unitLook.data.image_look.alt}
                      className="w-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span
                          onClick={itemSelected(unitLook)}
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
              to={`/looks/${
                lookSelected[0].look
                  ? lookSelected[0].look.uid
                  : lookSelected[0].uid
              }`}
              className="flex items-center justify-center h-16 mb-8 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
            >
              ESCOLHER ESTE LOOK
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (loading) {
    return <p>Loading...</p>;
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
