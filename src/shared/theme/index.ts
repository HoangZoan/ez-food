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
  spacing: [
    0, 4, 8, 16, 24, 32, 48, 56, 64, 72, 86, 96, 120, 150, 180, 240, 270, 320,
  ],
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
      fontSize: "3.6rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "3.2rem",
    },
    h4: {
      fontSize: "2.8rem",
      lineHeight: 2,
    },
    h5: {
      fontSize: "2.2rem",
    },
    h6: {
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

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    ["contained-disabled"]: true;
  }
}

theme.components = {
  // BUTTON
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    variants: [
      {
        props: { variant: "contained-disabled" },
        style: {
          backgroundColor: theme.colors.common.grey,
          "&:hover": {
            backgroundColor: theme.palette.grey[500],
          },
        },
      },
    ],
    styleOverrides: {
      contained: {
        boxShadow: "none",
        ":hover": {
          boxShadow: "none",
        },
        "&.MuiButton-containedError:hover": {
          backgroundColor: theme.palette.error.light,
        },
        "&.MuiButton-containedSuccess:hover": {
          backgroundColor: theme.palette.success.light,
        },
      },
      outlined: {
        backgroundColor: "white",
        "&.MuiButton-outlinedError:hover": {
          backgroundColor: theme.palette.error.main,
          color: "white",
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

  // FORM LABEL
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: "black",
      },
    },
  },

  // OUTLINED INPUT
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.light,
        },
      },
    },
  },

  // TABLE
  MuiTableCell: {
    styleOverrides: {
      root: {
        fontSize: "1.6rem",
      },
    },
  },
} as Components;

export default theme;

export const styled = createStyled({ defaultTheme: theme });
