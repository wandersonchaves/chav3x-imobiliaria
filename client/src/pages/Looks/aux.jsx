export function Aux() {
  return (
    <>
      {look.map((unitLook) => (
        <div key={unitLook.id} className="grid grid-cols-2 gap-4">
          <div className="w-full h-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75  lg:aspect-none">
            <img
              src={unitLook.data.image_look.url}
              alt={unitLook.data.image_look.alt}
              className="w-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>

          <div className="bg-gray-300 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 rounded-md overflow-hidden h-full">
            <div className="group relative">
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
          </div>
        </div>
      ))}
    </>
  );
}
