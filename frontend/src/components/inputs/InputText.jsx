import BaseInput from "./BaseInput";
import { useTheme } from "styled-components";

const InputText = ({...props}) => {
  const theme = useTheme();
  return(
    <BaseInput
      type="text"
      inputMode="kana"
      {...props}
      $textColor={theme.colors.primary}
      $bgColor={theme.colors.quaternary}
      $borderColor={theme.colors.primary}
      $focusBorderColor={theme.colors.secondary}
    />
  );
};

export default InputText;