import styled from "styled-components";
import { baseHeaderFooter } from "../styles/commonStyles";
import TextWithIcon from "../TextWithIcon";

const StyledFooter = styled.header`
  ${baseHeaderFooter}
  padding: 100px 10px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <a href="/">
      <TextWithIcon iconSrc="image/i-white-tsutinoko.svg" alt="ツチノコアイコン">
        UMA-DB
      </TextWithIcon>
      </a>
    </StyledFooter>
  );
};

export default Footer;
