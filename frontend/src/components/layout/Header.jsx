import styled from "styled-components";
import { baseHeaderFooter } from "../styles/commonStyles";
import TextWithIcon from "../TextWithIcon";

const StyledHeader = styled.header`
  ${baseHeaderFooter}
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Header = () => {
  return (
    <StyledHeader>
      <a href="/">
      <TextWithIcon iconSrc="image/i-white-tsutinoko.svg" alt="ツチノコアイコン">
        UMA-DB
      </TextWithIcon>
      </a>
    </StyledHeader>
  );
};

export default Header;
