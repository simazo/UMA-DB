import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Preview"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        content: {
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "auto",
        },
      }}
    >
      {image && <img src={image} alt="Large Preview" style={{ width: "100%" }} />}
      <button onClick={onClose} style={{ marginTop: "20px" }}>閉じる</button>
    </Modal>
  );
};

export default ImageModal;
