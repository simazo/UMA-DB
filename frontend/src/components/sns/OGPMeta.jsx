import { Helmet } from "react-helmet";

const OGPMeta = ({
  title = "デフォルトタイトル",
  description = "デフォルトの説明文",
  image = "https://my-domain.com/default-og-image.jpg",
  url = window.location.href,
  type = "website",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitterカード用 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default OGPMeta;
