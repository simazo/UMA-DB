import styled from "styled-components";
import breakpoints from "../styles/breakpoints";

const Section = styled.section`
  max-width: 100%;
  padding: 0 8px;
  margin: 0 auto;
  margin-bottom: 20px;

  @media (min-width: ${breakpoints.sp}) {
    padding: 0 16px;
  }

  @media (min-width: ${breakpoints.tablet}) {
    max-width: ${breakpoints.tablet};
    padding: 0 24px;
    margin-bottom: 30px;
  }

  @media (min-width: ${breakpoints.pc}) {
    max-width: ${breakpoints.pc};
    padding: 0 32px;
    margin-bottom: 48px;
  }

  @media (min-width: ${breakpoints.wide}) {
    max-width: ${breakpoints.wide};
    padding: 0 40px;
    margin-bottom: 52px;
  }
`;

export default Section;
