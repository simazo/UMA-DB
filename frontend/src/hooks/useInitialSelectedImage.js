import { useEffect } from 'react';

const useInitialSelectedImage = ({ cryptid, selectedImage, setSelectedImage, imageUrl }) => {
  useEffect(() => {
    if (cryptid && selectedImage === null) {
      setSelectedImage(`${imageUrl}/${cryptid.id}/1.jpeg`);
    }
  }, [cryptid, selectedImage, imageUrl]);
};

export default useInitialSelectedImage;