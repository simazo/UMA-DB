import Card from "./Card";
import imageConfig from "../../config/imageConfig";

const CryptidCard = ({ cryptids }) => {
  const imageUrl = imageConfig.imageUrl;

  if (!cryptids || cryptids.length === 0) {
    return <p>No cryptids found.</p>;
  }

  return (
    <>
      {cryptids.map((cryptid) => (
        <Card
          key={cryptid._id}
          imageSrc={`${imageUrl}/${cryptid.id}/thumbnail.jpeg`}
          title={cryptid.name}
          description={`${cryptid.description.slice(0, 40)}...`}
          isNew={true}
          to={`/cryptids/${cryptid._id}`}
          />
      ))}
    </>
  );
};

export default CryptidCard;