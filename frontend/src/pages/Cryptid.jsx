import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Section, PaddingBox, CardContainer } from "../components/layouts";
import { HeadPrimary } from "../components/heads/Heading";
import {
  ProfileContainer,
  ProfileColumn,
  LeftColumn,
  LargeImage,
  SmallImagesRow,
  SmallImage,
  RightColumn,
  ProfileItem,
  ProfileLabel,
  ProfileText,
} from "../components/layouts/ProfileContainer";
import imageConfig from "../config/imageConfig";
import ImageModal from "../components/ImageModal";
import { Video, VideoContainer } from "../components/videos";
import { Link } from "react-router-dom";
import { AREA, SPECIES_TYPE, REGION, UMA_TYPE } from "../constants";

const Cryptid = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams();
  const [ cryptid, setCryptid ] = useState(null);
  const imageUrl = imageConfig.imageUrl;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSmallImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };
  
  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/cryptids/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setCryptid(data)
      // cryptidが設定されたら初期画像を選択
      setSelectedImage(`${imageUrl}/${data.id}/1.jpeg`);
    });
  }, [id]);

  if (!cryptid) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Section>
      <HeadPrimary>{cryptid ? `${cryptid.name}の情報` : "Loading..."}</HeadPrimary>
      <p style={{ textAlign: 'right', fontSize: '80%' }}>
        登録日：{new Date(cryptid.createdAt).toLocaleDateString()}
      </p>
      </Section>
      <Section>
        <ProfileContainer>
          <ProfileColumn>
            <LeftColumn>
              <LargeImage
                src={selectedImage}
                alt="Image 1"
                onClick={ () => openModal(selectedImage) }
              />
              <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={closeModal} />
              <SmallImagesRow>
              {[1, 2, 3].map((index) => (
                <SmallImage
                  key={index}
                  src={`${imageUrl}/${cryptid.id}/${index}.jpeg`}
                  alt={`Image ${index}`}
                  onClick={() => handleSmallImageClick(`${imageUrl}/${cryptid.id}/${index}.jpeg`)}
                />
              ))}
              </SmallImagesRow>
            </LeftColumn>
            <RightColumn>
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
            </RightColumn>
          </ProfileColumn>
        </ProfileContainer>
      </Section>
      <Section>
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
      </Section>
    </>
  );
};

export default Cryptid;

