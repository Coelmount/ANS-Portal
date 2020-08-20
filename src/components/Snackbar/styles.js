import { createStyles } from '@material-ui/core/styles'

const styles = createStyles({
  notificationMainWrapper: {
    maxWidth: '50vw',
    width: 650,
    padding: 2,
    borderRadius: 3,
    '&.error': {
      background: '#C03A2B'
    },
    '&.success': {
      background: '#1CAF22'
    },
    '&.warning': {
      background: '#FFCC00'
    },
    '&.info': {
      background: '#00678F'
    }
  },
  notificationsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px 20px 20px '
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  messageTitle: {
    marginLeft: 12,
    color: '#fff'
  },
  closeIcon: {
    color: '#FFF',
    fontSize: 20,
    cursor: 'pointer'
  },
  variantIcon: {
    color: '#fff'
  },
  roundButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    padding: 0
  }
})

export default styles
