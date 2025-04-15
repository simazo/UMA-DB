import React from "react";
import {
  ProfileItem,
  ProfileLabel,
  ProfileText,
} from "../../components/layouts/ProfileContainer";
import { Video, VideoContainer } from "../../components/videos";
import { Link } from "react-router-dom";

const Detail = ({cryptid}) => {
  return (
    <>
      <ProfileItem>
        <ProfileLabel>目撃情報</ProfileLabel>
        <ProfileText>{cryptid.description}</ProfileText>
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>動画</ProfileLabel>
        {cryptid.video.length === 0 && <p>なし</p>}

        {cryptid.video.length > 0 && (
          <VideoContainer>
            {cryptid.video.map((videoUrl, index) => (
              <Video key={index}>
                <iframe
                  src={videoUrl}
                  title={`${cryptid.name} Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </Video>
            ))}
          </VideoContainer>
        )}
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>参考</ProfileLabel>
        {cryptid.reference.length === 0 && <p>なし</p>}

        {cryptid.reference.length > 0 && (
          cryptid.reference.map((item, index) => (
            <p key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </p>
          ))
        )}
      </ProfileItem>
      <ProfileItem>
        <ProfileLabel>関連するUMA</ProfileLabel>
        {cryptid.related_uma.length === 0 && <p>なし</p>}

        {cryptid.related_uma.length > 0 && (
          cryptid.related_uma.map((uma, index) => (
            <p key={index}>
              <Link to={`/cryptids/${uma._id}`}>{uma.name}</Link>
            </p>
          ))
        )}
      </ProfileItem>
    </>
  );
};

export default Detail;
