import "normalize.css"; // リセットCSS
import { ThemeProvider } from "styled-components";
import theme from "./components/styles/theme";
import GlobalStyle from "./components/GlobalStyle"
import ButtonContainer from "./components/buttons/ButtonContainer"
import ButtonWithIcon from "./components/buttons/ButtonWithIcon";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageContainer from "./components/layout/PageContainer";
import Section from "./components/layout/Section";
import { HeadPrimary, HeadSecondary } from "./components/heads/Heading";
import TextWithIcon from "./components/TextWithIcon";
import InputText from "./components/inputs/InputText";
import PaddingBox from "./components/layout/PaddingBox";
import CardContainer from "./components/layout/CardContainer";
import Card from "./components/cards/Card";

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <>
        <GlobalStyle />
        <Header />
        <PageContainer>
          <Section>
            <HeadPrimary>UMA-DB</HeadPrimary>
          </Section>
          <Section>
            <h4>世界中のUMA情報を集めたデータベース</h4>
          </Section>
          <Section>
            <HeadSecondary>
              <TextWithIcon iconSrc="image/i-green-issie.svg" alt="イッシーアイコン">最近追加されたUMA</TextWithIcon>
            </HeadSecondary>
            <CardContainer>
              <Card 
                imageSrc="image/flogman.jpeg"
                title="カードのタイトル"
                description="これはカードの説明文です。詳細な情報をここに記載します"
                isNew={true}
              />
              <Card 
                imageSrc="image/flogman.jpeg"
                title="カードのタイトル"
                description="これはカードの説明文です。詳細な情報をここに記載します"
                isNew={true}
              />
              <Card 
                imageSrc="image/flogman.jpeg"
                title="カードのタイトル"
                description="これはカードの説明文です。詳細な情報をここに記載します"
                isNew={true}
              />
              <Card 
                imageSrc="image/flogman.jpeg"
                title="カードのタイトル"
                description="これはカードの説明文です。詳細な情報をここに記載します"
                isNew={true}
              />
              <Card 
                imageSrc="image/flogman.jpeg"
                title="カードのタイトル"
                description="これはカードの説明文です。詳細な情報をここに記載します"
                isNew={true}
              />
              <Card 
                imageSrc="image/flogman.jpeg"
                title="カードのタイトル"
                description="これはカードの説明文です。詳細な情報をここに記載します"
                isNew={true}
              />

            </CardContainer>
          </Section>
          <Section>
            <HeadSecondary>
              <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">目撃エリアから探す</TextWithIcon>
            </HeadSecondary>
            <ButtonContainer>
              <ButtonWithIcon iconSrc="image/i-orange-mountain.svg" alt="山や森">山や森</ButtonWithIcon>
              <ButtonWithIcon iconSrc="image/i-orange-sky.svg" alt="空">空</ButtonWithIcon>
              <ButtonWithIcon iconSrc="image/i-orange-sea.svg" alt="海や川">海や川</ButtonWithIcon>
              <ButtonWithIcon iconSrc="image/i-orange-city.svg" alt="市街地">市街地</ButtonWithIcon>
            </ButtonContainer>
          </Section>
          <Section>
            <HeadSecondary>
              <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">サイズから探す</TextWithIcon>
            </HeadSecondary>
            <ButtonContainer>
              <ButtonWithIcon iconSrc="image/i-orange-tsutinoko.svg" alt="小型">小型</ButtonWithIcon>
              <ButtonWithIcon iconSrc="image/i-orange-leo.svg" alt="中型">中型</ButtonWithIcon>
              <ButtonWithIcon iconSrc="image/i-orange-big-foot.svg" alt="大型">大型</ButtonWithIcon>
              <ButtonWithIcon iconSrc="image/i-orange-nessie.svg" alt="超大型">超大型</ButtonWithIcon>
            </ButtonContainer>
          </Section>
          <Section>
            <HeadSecondary>
              <TextWithIcon iconSrc="image/i-green-glass.svg" alt="虫めがねアイコン">名前から探す</TextWithIcon>
            </HeadSecondary>
            <PaddingBox>
              <InputText placeholder="例：ネッシー" />
            </PaddingBox>
          </Section>
        </PageContainer>
        <Footer/>
      </>
    </ThemeProvider>
  );
}

export default App;
