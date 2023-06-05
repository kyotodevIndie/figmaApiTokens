import { excludeValues } from "./excludeValues";

export const getTypographyTokens = (typography) => {
  const typographyTokens = [];

  typography.children.map((typographyItem) => {
    if (!excludeValues.includes(typographyItem.name)) {
      typographyItem.children.map((typographyVariants) => {
        if (!excludeValues.includes(typographyVariants.name)) {
          typographyTokens.push({
            type: typographyItem.name,
            token: typographyVariants.name,
            style: typographyVariants.style,
          });
        }
      });
    }
  });

  return typographyTokens;
};
