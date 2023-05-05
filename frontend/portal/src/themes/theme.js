import { extendTheme } from "@chakra-ui/react";
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const lightColors = {
    brand: {
      50: "#ffe3e3",
      100: "#ffb3b3",
      200: "#ff8080",
      300: "#ff4d4d",
      400: "#ff1a1a",
      500: "#e60000",
      600: "#b30000",
      700: "#800000",
      800: "#4d0000",
      900: "#1a0000",
    },
};

const darkColors = {
    brand: {
      50: "#fff0f0",
      100: "#ffcccc",
      200: "#ff9999",
      300: "#ff6666",
      400: "#ff3333",
      500: "#e60000",
      600: "#b30000",
      700: "#800000",
      800: "#4d0000",
      900: "#1a0000",
    },
  };
  

export default  {
    theme : extendTheme({
        config,
        colors: {
          light: lightColors,
          dark: darkColors,
        },
      })
}
  
  
  