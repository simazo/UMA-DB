import React from "react";
import { Section } from "../../components/layouts";

import {
  ProfileContainer,
  ProfileColumn,
  LeftColumn,
  RightColumn,
} from "../../components/layouts/ProfileContainer";

import { Header, Profile, ImageGallery, Detail } from "./";

const Page = ({cryptid}) => {
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
    </>
  );
};

export default Page;

