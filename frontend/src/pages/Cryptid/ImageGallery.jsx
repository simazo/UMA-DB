import React from "react";
import {
  LargeImage,
  SmallImagesRow,
  SmallImage,
} from "../../components/layouts/ProfileContainer";
import imageConfig from "../../config/imageConfig";
import ImageModal from "../../components/ImageModal";
import useImageModal from '../../hooks/useImageModal';
import useInitialSelectedImage from '../../hooks/useInitialSelectedImage';

const ImageGallery = ({cryptid}) => {
  const imageUrl = imageConfig.imageUrl;
  const {
    selectedImage,
    isModalOpen,
    openModal,
    closeModal,
    handleSmallImageClick,
    setSelectedImage,
  } = useImageModal();

  useInitialSelectedImage({ cryptid, selectedImage, setSelectedImage, imageUrl });

  return (
    <>
      <LargeImage
        src={selectedImage}
        alt="Image 1"
        onClick={ () => openModal(selectedImage) }
      />
      <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={closeModal} />
      <SmallImagesRow>
      {[1, 2, 3].map((index) => (
        <SmallImage
          key={index}
          src={`${imageUrl}/${cryptid.id}/${index}.jpeg`}
          alt={`Image ${index}`}
          onClick={() => handleSmallImageClick(`${imageUrl}/${cryptid.id}/${index}.jpeg`)}
        />
      ))}
      </SmallImagesRow>
    </>
  );
};

export default ImageGallery;