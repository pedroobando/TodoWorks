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
    </div>
  );
};

export default EditProduct;
