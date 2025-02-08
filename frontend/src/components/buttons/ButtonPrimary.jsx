import BaseButton from "./BaseButton";
import { useTheme } from "styled-components";

const ButtonPrimary = ({children}) => {
  const theme = useTheme();
  return (
    <BaseButton
      textColor={theme.colors.primary}
      bgColor={theme.colors.quaternary}
      borderColor={theme.colors.primary} 
    >
      {children}
    </BaseButton>
  );
};

export default ButtonPrimary;