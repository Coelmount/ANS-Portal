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
    width: 36,
    height: 36,
    borderRadius: 50,
    background: 'white'
  },
  timeIcon: {
    width: 22,
    height: 24
  },
  timeFieldsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  timeFieldWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  timeBlockLabel: {
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
