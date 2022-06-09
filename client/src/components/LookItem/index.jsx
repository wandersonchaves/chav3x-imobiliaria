import {
  SliceZone,
  usePrismicDocumentByUID,
  useSinglePrismicDocument,
} from '@prismicio/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../pages/NotFount';
import { components } from '../../pages/slices';
import { Layout } from '../Layout';

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

  // console.log('look', look);
  // console.log('menu', menu);

  // Return the look if a document was retrieved from Prismic
  if (look && menu) {
    return (
      <Layout wrapperClass="look" menuDoc={menu}>
        <SliceZone slices={look.data.look_content} components={components} />
        {/* {console.log(look)} */}
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div key={look.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={look.imageSrc}
                    alt={look.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={look.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {look.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{look.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {look.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
}
