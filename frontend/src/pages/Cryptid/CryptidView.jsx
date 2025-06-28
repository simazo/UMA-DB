import { Section } from "../../components/layouts";
import TweetButton from "../../components/sns/TweetButton";
import SnsButtonContainer from "../../components/layouts/SnsButtonContainer";
import { Header, Profile, ImageGallery, Detail } from ".";
import {
  ProfileContainer,
  ProfileColumn,
  LeftColumn,
  RightColumn,
} from "../../components/layouts/ProfileContainer";


const CryptidView = ({cryptid}) => {
  

  const tweetText = `${cryptid.name}に関する情報はこちら`;
  const ogpUrl = `https://uma-db.com/ogp/${cryptid._id}`;
  const hashtags = ["UMA", "未確認生物", cryptid.name, ...(cryptid.alias ? [cryptid.alias] : [])];

  return (
    <>
      <Section>
        <Header cryptid={cryptid} />
      </Section>
      <Section>
        <ProfileContainer>
          <ProfileColumn>
            <LeftColumn>
              <ImageGallery cryptid={cryptid} />
            </LeftColumn>
            <RightColumn>
              <Profile cryptid={cryptid}/>
            </RightColumn>
          </ProfileColumn>
        </ProfileContainer>
      </Section>
      <Section>
        <Detail cryptid={cryptid} />
      </Section>
      <Section>
        <SnsButtonContainer>
          <TweetButton
            text={tweetText}
            url={ogpUrl}
            hashtags={hashtags}
          />
        </SnsButtonContainer>
      </Section>
    </>
  );
};

export default CryptidView;

