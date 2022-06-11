import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateRandomString = (length) => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const getRandomAvatarLink = (mouth) => {
  let link = createAvatar(style, {
    seed: generateRandomString(5),
    dataUri: true,
    mouth: mouth,
  });

  return link;
};

export default getRandomAvatarLink;
