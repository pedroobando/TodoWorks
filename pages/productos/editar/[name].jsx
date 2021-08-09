import { useEffect } from 'react';
import { useRouter } from 'next/router';

const EditProduct = () => {
  const router = useRouter();
  const {
    query: { name, id },
  } = router;

  return (
    <div>
      id:{id} - name:{name}
    </div>
  );
};

export default EditProduct;
