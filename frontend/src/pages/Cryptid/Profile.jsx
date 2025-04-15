import React from "react";
import { AREA, SPECIES_TYPE, REGION, UMA_TYPE } from "../../constants";
import { ProfileItem, ProfileLabel, ProfileText } from "../../components/layouts/ProfileContainer";

const Profile = ({cryptid}) => {
  if (!cryptid) return null;

  return (
    <>
      <ProfileItem>
        <ProfileLabel>名前</ProfileLabel>
        <ProfileText>{cryptid.name}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>別名</ProfileLabel>
        <ProfileText>{cryptid.alias}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>生物学的分類</ProfileLabel>
        <ProfileText>{SPECIES_TYPE.find((a) => a.id === cryptid.species_type)?.alt || "不明"}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>UMA的分類</ProfileLabel>
        <ProfileText>{UMA_TYPE.find((a) => a.id === cryptid.uma_type)?.alt || "不明"}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>生息場所</ProfileLabel>
        <ProfileText>{AREA.find((a) => a.id === cryptid.area)?.alt || "不明"}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>生息地域</ProfileLabel>
        <ProfileText>{REGION.find((a) => a.id === cryptid.region)?.alt || "不明"}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>サイズ</ProfileLabel>
        <ProfileText>{cryptid.size} （{cryptid.size_details}）</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>主な目撃場所</ProfileLabel>
        <ProfileText>{cryptid.main_sighting_location}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>最初の目撃報告</ProfileLabel>
        <ProfileText>{cryptid.first_sighting}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>信憑性</ProfileLabel>
        <ProfileText>{"★".repeat(cryptid.credibility || 0) + "☆".repeat(5 - (cryptid.credibility || 0))}</ProfileText>
      </ProfileItem>
    </>
  );
};

export default Profile;
