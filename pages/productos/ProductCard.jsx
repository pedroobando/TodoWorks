import Image from 'next/image';

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const maxDescription = (_descripcion, max) => {
  let retDescription = _descripcion || '';
  if (retDescription.toString().length >= max) {
    retDescription = _descripcion.toString().slice(0, max) + '...';
  }
  return retDescription;
};

const ProductCard = ({
  product,
  userActive = { email: '' },
  handleEdit,
  handleRemove,
}) => {
  const {
    id,
    name,
    description,
    user: { name: nameUser, email: emailUser },
    hashtags,
    active,
  } = product;
  const activeOwner = emailUser === userActive.email ? true : false;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        // loader={myLoader}
        className="w-full"
        src="/mountain.jpg"
        layout="responsive"
        height="70"
        width="90"
        quality="70"
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

        <p className="text-gray-700 text-justify">{maxDescription(description, 120)}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {hashtags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {`#${tag}`}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
