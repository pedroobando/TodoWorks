import { useContext } from 'react';
import { useRouter } from 'next/router';
import TodoContext from '../../../context/TodoContext';

const EditProduct = () => {
  const router = useRouter();
  const { backPageState } = useContext(TodoContext);

  const {
    query: { name },
  } = router;

  const {
    params: { pid },
  } = backPageState;
  console.log(backPageState);

  return (
    <div>
      id:{pid} - name:{name}
      <button
        className="mb-2 border border-red-400 font-bold text-base rounded px-4 py-1 m-4 uppercase"
        onClick={() => {
          fetch('/api/login', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: 'ABCDEFG' }),
          });
        }}
      >
        Login
      </button>
      <button
        className="mb-2 border-2 border-blue-400 font-bold text-base rounded px-4 py-1 m-4 uppercase hover:bg-blue-100"
        onClick={() => {
          fetch('/api/logout', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default EditProduct;
