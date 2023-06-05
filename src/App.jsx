import { useEffect, useState } from "react";
import "./App.css";
import { getColorsTokens } from "./Services/getColorsTokens";
import { getTypographyTokens } from "./Services/getTypographyTokens";

function App() {
  const [colors, setColors] = useState([]);
  const [typography, setTypography] = useState([]);

  useEffect(() => {
    const getFigmaData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_FIGMA_API_URL}/${
          import.meta.env.VITE_FIGMA_FILE_ID
        }`,
        {
          method: "GET",
          headers: {
            "X-FIGMA-TOKEN": import.meta.env.VITE_FIGMA_SECRET_ID
          }
        }
      );
      const resJson = await res.json();

      const responseColors = resJson.document.children[0].children[0];
      const colorsToken = getColorsTokens(responseColors);
      setColors(colorsToken);

      const responseTypography = resJson.document.children[1].children[0];
      const typographyToken = getTypographyTokens(responseTypography);
      setTypography(typographyToken);
    };
    getFigmaData();
  }, []);

  return (
    <>
      <h1>Colors</h1>
      {colors.map((item) => (
        <div
          className="colorsContainer"
          style={{ background: item.hex }}
          key={item.hex}
        >
          <p>{item.name}</p>
          <p>{item.hex}</p>
        </div>
      ))}
      <h1>Typography</h1>
      {typography.map(({ style }, index) => (
        <p
          className="typographyContainer"
          style={{
            fontFamily: style.fontFamily,
            fontSize: `${style.fontSize / 16}rem`,
            fontWeight: style.fontWeight,
            letterSpacing: style.letterSpacing,
          }}
          key={index}
        >
          In love with Figma
        </p>
      ))}
    </>
  );
}

export default App;
