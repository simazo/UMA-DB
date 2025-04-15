import React from "react";
import { useParams } from "react-router-dom";
import { Section } from "../../components/layouts";

import {
  ProfileContainer,
  ProfileColumn,
  LeftColumn,
  RightColumn,
} from "../../components/layouts/ProfileContainer";

import useCryptid from "../../hooks/useCryptid";
import AsyncStateHandler from "../../components/AsyncStateHandler";
import Header from "./Header";
import Profile from "./Profile";
import ImageGallery from "./ImageGallery";
import Detail from "./Detail";

const Cryptid = () => {
  const { id } = useParams();
  const { data: cryptid, error, loading } = useCryptid(id);

  return (
    <AsyncStateHandler
      loading={loading}
      error={error}
      render={() => {
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
      }}
    />
  );
};

export default Cryptid;

