import { createTheme, Components } from "@mui/material";
import { createStyled } from "@mui/system";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      background: {
        primary: string;
      };
      common: {
        grey: string;
      };
    };
  }

  interface ThemeOptions {
    colors?: {
      background?: {
        primary?: string;
      };
      common?: {
        grey?: string;
      };
    };
  }
}

const theme = createTheme({
  spacing: [0, 4, 8, 16, 24, 32, 48, 56, 64, 72, 86, 96, 120, 150, 180, 240, 270, 320],
  palette: {
    primary: {
      main: "#F0932B",
    },
    secondary: {
      main: "#2A1803",
      dark: "#1A0F02",
    },
    error: {
      main: red[400],
    },
  },
  colors: {
    background: {
      primary: "#FDF4E9",
    },
    common: {
      grey: "#C7C7C7",
    },
  },
  shape: {
    borderRadius: 9,
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 12,
    allVariants: {
      letterSpacing: "1px",
      lineHeight: 1.7,
    },
    h1: {
      fontSize: "4.8rem",
      fontWeight: 700,
      letterSpacing: "2px",
    },
    h2: {
      fontSize: "3.2rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "3.6rem",
    },
    h4: {
      fontSize: "2.8rem",
      lineHeight: 2,
    },
    h5: {
      fontSize: "2.2rem",
    },
    subtitle1: {
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1.6rem",
    },
    body2: {
      fontSize: "1.3rem",
    },
  },
});

theme.components = {
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      contained: {
        boxShadow: "none",
        ":hover": {
          boxShadow: "none",
        },
      },
      outlinedPrimary: {
        border: `1px solid ${theme.palette.primary.main}`,
        ":hover": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
        },
      },
      containedPrimary: {
        color: "white",
        ":hover": {
          backgroundColor: theme.palette.primary.light,
        },
      },
    },
  },
} as Components;

export default theme;

export const styled = createStyled({ defaultTheme: theme });
