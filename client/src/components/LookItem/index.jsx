import {
  SliceZone,
  usePrismicDocumentByUID,
  useSinglePrismicDocument,
} from '@prismicio/react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NotFound } from '../../pages/NotFount';
import { components } from '../../pages/slices';
import { Layout } from '../Layout';

import { ImWhatsapp, ImArrowLeft2, ImHome } from 'react-icons/im';
import { QRCode } from '../QRCode';

import { Fragment, useState } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ArrowSmLeftIcon,
  XIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
];

export function LookItem() {
  const { uid } = useParams();

  const [look, lookState] = usePrismicDocumentByUID('look', uid);
  const [menu, menuState] = useSinglePrismicDocument('menu');

  const notFound = lookState.state === 'failed' || menuState.state === 'failed';

  useEffect(() => {
    if (lookState.state === 'failed') {
      console.warn(
        'Look document was not found. Make sure it exists in your Prismic repository',
      );
    }
  }, []);

  console.log('look', look);
  console.log('menu', menu);

  // Return the look if a document was retrieved from Prismic
  if (look && menu) {
    return (
      <>
        <Layout wrapperClassName="look" menuDoc={menu}>
          {/* <SliceZone slices={look.data.look_content} components={components} /> */}
          <div className="bg-white max-h-full">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <header className="flex justify-between">
                <Link to="/looks">
                  <ImArrowLeft2 color="#000" />
                </Link>
                <Link to="/">
                  <ImHome color="#000" />
                </Link>
              </header>

              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
                <div key={look.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
                    <img
                      src={look.data.image_look.url}
                      alt={look.data.image_look.alt}
                      className="w-full object-center object-cover lg:w-full lg:h-full"
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
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
