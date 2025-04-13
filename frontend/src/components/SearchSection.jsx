import { Section } from "./layouts";
import { HeadSecondary } from "./heads/Heading";
import TextWithIcon from "./TextWithIcon";
import { ButtonContainer, ButtonWithIcon } from "./buttons";

const SearchSection = ({ title, iconSrc, alt, dataList, searchKey, onSearch }) => {
  return (
    <Section>
      <HeadSecondary>
        <TextWithIcon iconSrc={iconSrc} alt={alt}>{title}</TextWithIcon>
      </HeadSecondary>
      <ButtonContainer>
        {dataList.map(({ id, icon, alt }) => (
          <ButtonWithIcon 
            key={id} 
            onClick={() => onSearch(searchKey, id)} 
            iconSrc={icon} 
            alt={alt}>
            {alt}
          </ButtonWithIcon>
        ))}
      </ButtonContainer>
    </Section>
  );
};

export default SearchSection;