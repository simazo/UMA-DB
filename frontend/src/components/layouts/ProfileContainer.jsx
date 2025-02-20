import styled from 'styled-components';
import breakpoints from '../styles/breakpoints';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 20px;
  max-width: 100%;
  width: 100%;
`;

export const ProfileColumn = styled.div`
  display: flex;
  width: 100%;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 7;
  max-width: 200px;

  @media (min-width: ${breakpoints.sp}) {
    max-width: 200px;
  }
  @media (min-width: ${breakpoints.tablet}) {
    max-width: 300px;
  }
  @media (min-width: ${breakpoints.pc}) {
    max-width: 400px;
  }
  @media (min-width: ${breakpoints.wide}) {
    max-width: 500px;
  }
`;

export const LargeImage = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

export const SmallImagesRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

export const SmallImage = styled.img`
  width: 30%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

export const RightColumn = styled.div`
  flex: 3;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
  @media (min-width: ${breakpoints.pc}) {
    gap: 10px;
    margin-left: 40px;
  }
  @media (min-width: ${breakpoints.wide}) {
    gap: 20px;
    margin-left: 60px;
  }
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 16px;
  margin-bottom: 20px;
`;

export const ProfileLabel = styled.label`
  font-weight: bold;
  font-size: 110%;

  background: ${({ theme }) => theme.colors.neutral};
  border-left: solid 4px ${({ theme }) => theme.colors.tertiary};

  @media (min-width: ${breakpoints.pc}) {
    font-size: 120%;
  }
  @media (min-width: ${breakpoints.wid}) {
    font-size: 130%;
  }
`;

export const ProfileText = styled.div`
  white-space: pre-wrap;
  line-height: 1.8;
  padding: 4px;
  font-size: 98%;

  @media (min-width: ${breakpoints.pc}) {
    font-size: 100%;
  }
  @media (min-width: ${breakpoints.wide}) {
    font-size: 110%;
  }
`;

export const DescriptionContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  line-height: 1.8;
  text-align: justify;
  font-size: 90%;

  @media (min-width: ${breakpoints.pc}) {
    font-size: 100%;
  }
  @media (min-width: ${breakpoints.wide}) {
    font-size: 110%;
  }
`;
