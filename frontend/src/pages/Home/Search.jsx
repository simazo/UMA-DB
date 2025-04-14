import { HeadSecondary } from "../../components/heads/Heading";
import TextWithIcon from "../../components/TextWithIcon";
import { ButtonContainer, ButtonWithIcon } from "../../components/buttons";

const Search = ({ title, iconSrc, alt, dataList, searchKey, onSearch }) => {
  return (
    <>
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
    </>
  );
};

export default Search;