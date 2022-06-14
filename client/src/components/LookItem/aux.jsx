import { usePrismicDocumentByUID } from '@prismicio/react';
import { useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NotFound } from '../../pages/NotFount';

import { ImArrowLeft2, ImHome } from 'react-icons/im';
import { LookContext } from '../LookContext';
import { useVideoPlayer } from '../VideoPlayer';

export function Aux() {
  const lookContext = useContext(LookContext);
  const finishLook = (chosenLook) => () => {
    lookContext.finishLook(chosenLook);
  };

  const { uid } = useParams();

  const [look, lookState] = usePrismicDocumentByUID('look', uid);

  const notFound = lookState.state === 'failed';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository',
      );
    }
  }, []);

  const videoElement = useRef(null);
  const { togglePlay } = useVideoPlayer(videoElement);

  console.log('look', look);

  if (look) {
    return (
      <>
        <div className="bg-white max-h-full">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <header className="flex justify-between">
              <Link className="justify-self-start self-end" to="/looks">
                <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                  <ImArrowLeft2 size={25} color="#fff" />
                </div>
              </Link>
              <Link className="justify-self-end self-end" to="/">
                <div className="flex items-center justify-center h-16 w-16 bg-indigo-500 hover:bg-indigo-700 rounded-full">
                  <ImHome size={25} color="#fff" />
                </div>
              </Link>
            </header>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
              <div key={look.id} className="group relative">
                <div className="w-screen min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                  <video
                    className="w-screen"
                    onClick={togglePlay}
                    autoPlay
                    loop
                    ref={videoElement}
                    src={look.data.video_look.url}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-rows-3 xl:gap-x-8">
                <div className="group relative">
                  <div className="w-full h-full flex justify-center items-center min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                    <h1>
                      Olha só, este look que você escolheu tem disponível na
                      loja do Deck
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
              <div key={look.id} className="group relative">
                <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                  {look.data.qr_code && (
                    <img
                      src={look.data.qr_code.url}
                      alt={look.data.qr_code.alt}
                      className="w-full object-center object-cover lg:w-full lg:h-full"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-rows-3 xl:gap-x-8">
                <div className="text-center w-full h-full flex justify-center items-center min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                  <h1>
                    Você pode entrar em contato diretamente com eles via
                    Whatsapp no QRCode ao lado
                  </h1>
                </div>

                <div className="">
                  <div className="w-full h-full flex justify-center items-end min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                    <Link
                      to="/thanks"
                      className="flex items-center justify-center h-16 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                      onClick={finishLook(look)}
                    >
                      Finalize sua escolha
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
