import { excludeValues } from "./excludeValues";

export const getColorsTokens = (colors) => {
  const colorsTokens = [];

  colors.children.map((colorItem) => {
    if (!excludeValues.includes(colorItem.name)) {
      colorItem.children.map((colorVariants) => {
        if (!excludeValues.includes(colorVariants.name)) {
          colorsTokens.push({
            name: colorVariants.children[1].characters,
            hex: colorVariants.children[2].characters,
          });
        }
      });
    }
  });

  return colorsTokens;
};
