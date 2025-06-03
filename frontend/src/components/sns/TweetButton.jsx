import { ButtonWithIcon } from "../buttons";

const TweetButton = ({ text = "世界中のUMA情報をまとめました", url, hashtags = [] }) => {
  const currentUrl = window.location.href;
  const tweetText = encodeURIComponent(text);
  const tweetUrl = encodeURIComponent(url || currentUrl);
  const hashtagParam =
    hashtags.length > 0
      ? `&hashtags=${encodeURIComponent(hashtags.join(","))}`
      : "";
  const tweetLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}${hashtagParam}`;

  return (
    <a href={tweetLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-block" }}>
      <ButtonWithIcon iconSrc="image/i-orange-twitter.svg" alt="twitterアイコン">
        Xに投稿
      </ButtonWithIcon>
    </a>
  );
};

export default TweetButton;
