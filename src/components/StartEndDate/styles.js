import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  mainWrap: {
    display: 'flex',
    padding: '0px 38px 22px 22px',
    alignItems: 'center'
  },
  timeIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    marginBottom: 20,
    width: 36,
    height: 36,
    borderRadius: 50,
    background: 'white'
  },
  dateIcon: {
    width: 22,
    height: 24
  },
  timeFieldsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 20
  },
  bottomBorder: {
    borderBottom: `1px solid ${theme.palette.silver}`
  },
  timeFieldWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  timeBlockLabel: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  timeField: {
    width: 140,
    marginLeft: 12,
    '& input': {
      height: 30
    }
  }
}))

export default useStyles
