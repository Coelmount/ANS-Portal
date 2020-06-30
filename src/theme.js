import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFCC00'
    },
    secondary: {
      main: '#00678F'
    },
    active: {
      main: '#F9F9F9',
      secondary: '#F4F4F4',
      blue: '#00678F'
    },
    error: {
      main: red.A400
    },
    text: {
      primary: '#212529'
    },
    black: '#212529',
    silver: '#CCCCCC',
    veryLightGrey: '#e4e4e4',
    lightGrey: '#C4C4C4',
    grey40: '#666666',
    greyE8: '#E8E8E8',
    grey99: '#999999',
    darkRed: '#C03A2B',
    lightGreen: '#1CAF22',
    mattePink: '#CEA8BC'
  },
  typography: {
    fontFamily: ['"Open Sans"', 'sans-serif'].join(',')
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        color: '#666666',
        height: '20px',
        width: '20px'
      }
    },
    MuiFormControl: {
      root: {
        width: '240px',
        background: '#FFFFFF',
        borderRadius: '3px',
        fontSize: '16px',
        lineHeight: '22px'
      }
    },
    MuiInputLabel: {
      outlined: {
        '&$shrink': {
          transform: 'translate(14px, -11px) scale(0.75)',
          color: '#666666'
        }
      }
    },
    MuiLink: {
      root: {
        fontSize: '16px',
        color: '#00678F'
      }
    },
    MuiButton: {
      root: {
        borderRadius: '30px',
        height: '50px',
        textTransform: 'none'
      },
      contained: {
        boxShadow: 'none'
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#FEDF63',
          boxShadow: '0px 6px 5px rgba(204,204,204,0.25)'
        }
      },
      label: {
        fontFamily: 'MTN',
        fontSize: '16px',
        fontWeight: '500'
      }
    },
    MuiPaper: {
      elevation8: {
        boxShadow: '0px 4px 8px rgba(196, 196, 196, 0.25)'
      },
      elevation1: {
        boxShadow: 'none'
      },
      elevation4: {
        boxShadow: 'none'
      }
    },
    MuiPopover: {
      paper: {
        border: '0.5px solid #CCCCCC'
      }
    },
    MuiListItem: {
      root: {
        '&.Mui-selected': {
          color: '#00678F',
          fontWeight: 500,
          backgroundColor: '#F9F9F9'
        }
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiDialogTitle: {
      root: {
        boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
        zIndex: '1'
      }
    },
    MuiDialogContent: {
      root: {
        backgroundColor: '#F9F9F9'
      }
    },
    MuiDialogActions: {
      root: {
        boxShadow: 'inset 0px 2px 16px rgba(196, 196, 196, 0.25)'
      }
    },
    MuiDialog: {
      paperWidthSm: {
        width: 650,
        maxWidth: 650
      }
    },
    MuiCheckbox: {
      root: {
        padding: 0
      }
    },
    MuiBox: {
      root: {
        padding: '24px 0px'
      }
    },
    MuiTableCell: {
      root: {
        padding: '9px 16px',
        borderBottom: 'none'
      }
    },
    MuiOutlinedInput: {
      input: {
        paddingLeft: 20
      }
    }
  }
})

export default theme
