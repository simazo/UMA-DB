import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const Video = styled.div`
  flex: 1 1 100%; // sp〜tableでは1列
  max-width: 100%;

  aspect-ratio: 16 / 9;
  position: relative;

  @media (min-width: ${breakpoints.pc}) {
    flex: 1 1 calc(50% - 16px); // pc〜からは2列
    max-width: calc(50% - 16px);
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: unset;
    max-width: 100%;
    transform: scale(1);
  }
`;

export default Video;