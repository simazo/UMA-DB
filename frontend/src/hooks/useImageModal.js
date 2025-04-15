import { useState } from 'react';

const useImageModal = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleSmallImageClick = (imageSrc) => {
    openModal(imageSrc);
  };

  return {
    selectedImage,
    isModalOpen,
    openModal,
    closeModal,
    handleSmallImageClick,
    setSelectedImage, // 初期画像設定用に外からアクセスできるように
  };
};

export default useImageModal;
