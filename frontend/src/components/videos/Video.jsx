import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const Video = styled.div`
  flex: 1 1 calc(50% - 16px);
  max-width: calc(50% - 16px);
  aspect-ratio: 16 / 9;
  position: relative;

  @media (min-width: ${breakpoints.sp}) {
    flex: 1 1 100%;
    max-width: 100%;
  }

  @media (min-width: ${breakpoints.tablet}) {
    flex: 1 1 calc(50% - 16px);
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