import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#ffffff",
          600: "#FFFFFFE0",
          500: "#FFFFFFA3",
          400: "#FFFFFF66",
          300: "#FFFFFF2E",
          200: "#FFFFFF1F",
          100: "#FFFFFF0F",
        },
        black: {
          main: "#16171A",
          600: "#16171AE0",
          500: "#16171A99",
          400: "#16171A66",
          300: "#16171A29",
          200: "#16171A1A",
          100: "#16171A0A",
        },
        red: {
          main: "#E20935",
          600: "#E20935E0",
          500: "#E2093599",
          400: "#E2093566",
          300: "#E2093524",
          200: "#E209351A",
          100: "#E209350F",
          hover: "#BE082D",
          pressed: "#AC0728",
        },
      },
      lineHeight: {
        normal: "normal",
        140: "1.4",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1280px",
      },
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
      },
    },
  },
};
