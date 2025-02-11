import styled from "styled-components";

const StyledTextWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .icon {
    width: 28px;
    height: auto;
    display: block;
  }
`;

const TextWithIcon = ({ iconSrc, alt, children }) => {
  return (
    <StyledTextWithIcon>
      <img className="icon" src={iconSrc} alt={alt} />
      {children}
    </StyledTextWithIcon>
  );
};

export default TextWithIcon;