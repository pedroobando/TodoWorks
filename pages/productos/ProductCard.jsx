import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ProductCard = ({ product, handleEdit, handleRemove }) => {
  const {
    id,
    name,
    owner,
    user: { name: nameUser },
  } = product;
  const activeOwner = owner === 'true' ? true : false;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        // loader={myLoader}
        className="w-full"
        src="/mountain.jpg"
        layout="responsive"
        height="80"
        width="100"
        alt={name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{name}</div>
        <div className="flex justify-between items-baseline mb-4">
          <span className="bg-yellow-100 rounded-xl px-6 py-1 font-bold text-md text-gray-600 ">
            {nameUser}
          </span>
          {activeOwner && (
            <div>
              <svg
                onClick={handleEdit}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400 inline-block mr-2 hover:text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>

              <svg
                onClick={handleRemove}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-400 inline-block hover:text-red-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>

        <p className="text-gray-700 text-base">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat at eos nobis
          quisquam itaque incidunt repudiandae sed veniam. Officiis, laborum soluta quidem
          neque voluptatibus molestiae provident dicta vitae nihil perferendis.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
