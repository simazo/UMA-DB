import React from "react";
import styled from "styled-components";
import TextWithIcon from "../TextWithIcon";
import ButtonPrimary from "./ButtonPrimary";

const StyledButtonWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonWithIcon = ({ iconSrc, children, ...props }) => {
  return (
    <StyledButtonWithIcon>
      <ButtonPrimary {...props}>
        <TextWithIcon iconSrc={iconSrc} {...props}>
          {children}
        </TextWithIcon>
      </ButtonPrimary>
    </StyledButtonWithIcon>
  );
};

export default ButtonWithIcon;
