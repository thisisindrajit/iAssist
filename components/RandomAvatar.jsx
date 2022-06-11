import { memo } from "react";
import getRandomAvatarLink from "../utilities/randomAvatarLink";

// NOTE: memo is similar to Pure component in such a way that the component will be rendered only once
const RandomAvatar = memo(({ className }) => {
  return (
    <img
      src={getRandomAvatarLink(["smile", "laughing"])}
      className={className}
      alt="Random avatar"
    />
  );
});

export default RandomAvatar;
