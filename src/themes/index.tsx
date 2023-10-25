import {
  Backdrop,
  BackdropProps,
  Components,
  createTheme,
  Theme,
  Zoom,
} from '@mui/material';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';

//#region Breakpoints & Palette & Typography
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      baseContainer: 1306,
      xl: 1280,
      '2xl': 1366,
      '3xl': 1440,
      '4xl': 1600,
    },
  },
  palette: {
    primary: {
      main: '#1db180',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9ba6ae',
      contrastText: '#ffffff',
    },
    success: {
      main: '#24c45f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffab00',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff5630',
      contrastText: '#ffffff',
    },
    info: {
      main: '#2cc4df',
      contrastText: '#ffffff',
    },
    skyblue: {
      main: '#1890FF',
      contrastText: '#ffffff',
    },
    textTable: {
      main: '#191919',
      contrastText: '#ffffff',
    },
    inputBg: {
      main: '#f5f5f5',
      contrastText: '#ffffff',
    },
    subBlue: {
      main: '#177DB8',
      contrastText: '#ffffff',
    },
    textLabel: {
      main: '#212b36',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightRegular: 400,
    allVariants: {
      color: '#212b36',
    },
  },
});
//#endregion

//#region Components
theme = createTheme(theme, {
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: 'red',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: 16,
            fontWeight: 400,
            color: '#191919',
            padding: '6px 16px',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            padding: '11px 20px',
            textTransform: 'uppercase',
            fontSize: 16,
            lineHeight: '19.5px',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: theme.palette.primary.main,
            '&:first-of-type': {
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
            },
            '&:last-of-type': {
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
            },
          },
        },
      },
    },
    MuiTableRow: {
      defaultProps: {
        hover: true,
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'page-title' },
          style: {
            fontWeight: 700,
            fontSize: '2.85rem',
            lineHeight: '3.45rem',
            color: theme.palette.secondary.main,
          },
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: 'off',
        autoCorrect: 'off',
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '.MuiFormLabel-root.MuiInputLabel-root': {
            color: 'rgb(145, 158, 171)',
            fontSize: '0.875rem',
            lineHeight: 1.57143,
            '&.MuiInputLabel-shrink': {
              fontWeight: 600,
              lineHeight: 1.5,
              fontSize: '1rem',
              color: 'rgb(99, 115, 129)',
              '&.Mui-focused': {
                color: 'rgb(33, 43, 54)',
              },
            },
          },
          '&.search-input': {
            filter: 'drop-shadow(5px 3px 30px rgba(19, 70, 131, 0.1))',
          },
          '&.c-datepicker,&.c-timepicker': {
            '.MuiOutlinedInput-root': {
              backgroundColor: theme.palette.inputBg.main,
              '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                color: theme.palette.subBlue.main,
              },
              '&.Mui-disabled': {
                '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                  color: 'inherit',
                },
              },
            },
          },
          '&.c-timepicker': {
            '.MuiOutlinedInput-input': {
              cursor: 'pointer',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        autoComplete: 'off',
        autoCorrect: 'off',
      },
      styleOverrides: {
        root: {
          borderRadius: 'inherit',
          color: 'rgb(33, 43, 54)',
          // '&.MuiInputBase-adornedStart': {
          //   input: {
          //     paddingLeft: '0!important',
          //   },
          // },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(33 43 54)',
            },
          },
          // '&.Mui-error': {
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     border: '1px solid #d32f2f!important',
          //   },
          //   '& .MuiSvgIcon-root': {
          //     color: '#d32f2f!important',
          //   },
          // },
          // '&:hover': {
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     border: '1px solid #12487445!important',
          //   },
          // },
          // '&.Mui-disabled': {
          //   '& .MuiOutlinedInput-notchedOutline': {
          //     border: 'none!important',
          //   },
          // },
        },
        input: {
          lineHeight: 1.57143,
          fontSize: '0.875rem',
          fontWeight: 500,
          // padding: '10px 15px',
          // fontWeight: 500,
          // '&::placeholder': {
          //   color: '#5B5B5B',
          //   opacity: 0.8,
          //   fontWeight: 400,
          // },
        },
        notchedOutline: {
          // border: 'none',
          borderColor: 'rgba(145, 158, 171, 0.2)',
        },
        multiline: {
          // padding: 0,
          // backgroundColor: theme.palette.inputBg.main,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          '& .MuiSvgIcon-root': {
            color: 'inherit',
          },
          '&.c-button': {
            fontSize: '1rem',
            lineHeight: '19px',
            textTransform: 'uppercase',
            borderRadius: '5px',
            boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)',
            padding: '10px 16px',
          },
          '&.add-button': {
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            fontSize: 16,
            lineHeight: '19px',
            fontWeight: 500,
            padding: '12.5px 20px',
            borderRadius: '10px',
            '& .MuiSvgIcon-root': {
              color: 'inherit',
            },
          },
        },
        contained: {
          backgroundColor: theme.palette.textLabel.main,
          '&:hover': {
            backgroundColor: 'rgb(69, 79, 91)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          backgroundColor: theme.palette.inputBg.main,
          paddingTop: '2.5px',
          paddingBottom: '2.5px',
        },
        paper: {
          boxShadow: '0px 0px 10px rgba(19, 70, 131, 0.5)',
          borderRadius: '20px',
        },
        listbox: {
          padding: '8px',
          color: '#191919',
          fontWeight: 500,
        },
        option: {
          borderRadius: '15px',
          height: '42px',
          '&.Mui-focused': {
            backgroundColor: 'rgba(7, 113, 211, 0.15)!important',
          },
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'wrapper' },
          style: {
            padding: '18px 30px',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '20px 20px 60px rgba(19, 70, 131, 0.1)',
          },
        },
      ],
      styleOverrides: {},
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '.MuiDataGrid-columnHeaders': {
            borderBottom: 'none',
            '.MuiDataGrid-columnHeader': {
              padding: '11px 20px',
              textTransform: 'uppercase',
              fontSize: 16,
              lineHeight: '19.5px',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: theme.palette.primary.main,
              '&:first-of-type': {
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
              },
              '&:last-of-type': {
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                '.MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
              },
            },
          },
          '&.MuiDataGrid-root .MuiDataGrid-cell': {
            borderBottom: 'none',
            '&:focus,&:focus-within': {
              outline: 'none !important',
            },
          },
          '&.MuiDataGrid-root .MuiDataGrid-columnHeader': {
            '&:focus,&:focus-within': {
              outline: 'none !important',
            },
          },
          '.MuiDataGrid-cellContent': {
            color: theme.palette.textTable.main,
          },
        },
        columnHeader: {
          paddingLeft: '10px!important',
          paddingRight: '10px!important',
          cursor: 'default',
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiTabs: {
      defaultProps: {
        textColor: 'primary',
        indicatorColor: 'primary',
      },
      styleOverrides: {},
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        transitionDuration: 400,
        TransitionComponent: Zoom,
        slots: {
          backdrop: (props: BackdropProps) => (
            <Backdrop
              sx={{
                backdropFilter: 'blur(2px)',
                backgroundColor: 'transparent',
              }}
              {...props}
            />
          ),
        },
      },
      styleOverrides: {
        paper: {
          borderRadius: '20px',
        },
      },
    },
    MuiPickersToolbarText: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: theme.palette.subBlue.main,
            fontWeight: 700,
          },
        },
      },
    },
    MuiClockPointer: {
      styleOverrides: {
        thumb: {
          backgroundColor: theme.palette.subBlue.main,
          borderColor: theme.palette.subBlue.main,
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .MuiPickersLayout-actionBar': {
            '& .MuiButton-root': {
              backgroundColor: theme.palette.subBlue.main,
            },
          },
        },
      },
    },
  } as Components<Omit<Theme, 'components'>>,
});
//#endregion

export default theme;

//#region Declare
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    baseContainer: true;
    '2xl': true;
    '3xl': true;
    '4xl': true;
  }
  interface Palette {
    skyblue: Palette['primary'];
    textTable: Palette['primary'];
    inputBg: Palette['primary'];
    subBlue: Palette['primary'];
    textLabel: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    skyblue?: PaletteOptions['primary'];
    textTable?: PaletteOptions['primary'];
    inputBg?: PaletteOptions['primary'];
    subBlue?: PaletteOptions['primary'];
    textLabel?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    skyblue: true;
    textTable: true;
    inputBg: true;
    subBlue: true;
    textLabel: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'page-title': true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    wrapper: true;
  }
}
//#endregion
