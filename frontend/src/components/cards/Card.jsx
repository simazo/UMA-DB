import styled from "styled-components";
import { Link } from "react-router-dom";
import BaseCard from "./BaseCard";

const StyledCard = styled(BaseCard)`
  position: relative;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const CardImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  line-height: 1.5;
  margin-bottom: 0.5rem;
  white-space: pre-line; /* 改行を表示し、レイアウト崩れを防ぐ */
`;

const CardBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #3998db;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.4rem;
  text-transform: uppercase;
  border-radius: 0.5rem;
  transform: rotate(-45deg) translateY(0.5em) translateX(-1.5em);
  transform-origin: top left;
`;

const Card = ({ imageSrc, title, description, isNew, to }) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <StyledCard>
        {isNew && <CardBadge>NEW</CardBadge>}
        <CardImage src={imageSrc} alt="カード画像" />
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default Card;
