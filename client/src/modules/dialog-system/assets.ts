import charactersData from "./assets/characters.json";
import grassImage from "./assets/images/grass.png";
import portraitImage from "./assets/images/portrait.jpg";
import characterImage from "./assets/images/char.webp";

const assets: Record<string, any> = {
  "characters.json": charactersData,
  "images/grass.png": grassImage,
  "images/portrait.jpg": portraitImage,
  "images/char.webp": characterImage,
};

export const getAsset = (id: string): any => {
  return assets[id];
};
