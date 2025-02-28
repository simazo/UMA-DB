import BaseButton from "./BaseButton";
import { useTheme } from "styled-components";

const ButtonPrimary = ({children, onClick, disabled}) => {
  const theme = useTheme();
  return (
    <BaseButton
      $textColor={theme.colors.primary}
      $bgColor={theme.colors.quaternary}
      $borderColor={theme.colors.primary}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </BaseButton>
  );
};

export default ButtonPrimary;