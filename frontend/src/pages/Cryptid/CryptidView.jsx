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
import imageConfig from "../../config/imageConfig";
import OGPMeta from "../../components/sns/OGPMeta";

const CryptidView = ({cryptid}) => {
  const imageUrl = imageConfig.imageUrl;
  const ogpImage = `${imageUrl}/${cryptid.id}/thumbnail.jpeg`;
  const pageUrl = window.location.href;
  const title = "【UMA-DB】世界中のUMAをまとめました";
  const tweetText = `${cryptid.name}に関する情報はこちら`;
  const hashtags = ["UMA", "未確認生物", cryptid.name, ...(cryptid.alias ? [cryptid.alias] : [])];

  return (
    <>
      <OGPMeta
        title={title}
        description={tweetText}
        image={ogpImage}
        url={pageUrl}
      />
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
            url={pageUrl}
            hashtags={hashtags}
          />
        </SnsButtonContainer>
      </Section>
    </>
  );
};

export default CryptidView;

