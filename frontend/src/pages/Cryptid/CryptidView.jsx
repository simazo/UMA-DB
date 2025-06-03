import { Section } from "../../components/layouts";
import TweetButton from "../../components/sns/TweetButton";
import SnsButtonContainer from "../../components/layouts/SnsButtonContainer";

import {
  ProfileContainer,
  ProfileColumn,
  LeftColumn,
  RightColumn,
} from "../../components/layouts/ProfileContainer";

import { Header, Profile, ImageGallery, Detail } from ".";
const currentUrl = window.location.href;
const CryptidView = ({cryptid}) => {
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
            text={`${cryptid.name}に関する情報はこちら！世界中のUMA情報をまとめました`}
            hashtags={[
              "UMA",
              "未確認生物",
              cryptid.name,
              ...(cryptid.alias ? [cryptid.alias] : []),
            ]}
          />
        </SnsButtonContainer>
      </Section>
    </>
  );
};

export default CryptidView;

