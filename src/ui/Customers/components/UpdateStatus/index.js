import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import Loading from 'components/Loading'
import Select from 'components/Select'
import useStyles from './styles'

import capitalize from 'lodash/capitalize'
import accountStarOutline from 'source/images/svg/account-star-outline.svg'

const UpdateStatusModal = props => {
  const classes = useStyles()
  const { open, handleClose, tenant, t } = props
  const [status, setStatus] = useState(tenant.status)

  const options = [{ label: 'Active', value: 'Active' }]

  return (
    <Dialog className={classes.updateModal} open={open} onClose={handleClose}>
      <DialogTitle className={classes.title}>{`${capitalize(t('customer'))}: ${
        tenant.name
      }`}</DialogTitle>
      <DialogContent>
        <Box>
          <Box>{`${t('status')}: `}</Box>
          <Select
            icon={<img src={accountStarOutline} alt='accountStarOutline' />}
            value={status}
            options={options}
            onChange={e => setStatus(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => handleClose()}
          className={classes.button}
        >
          {t('cancel')}
        </Button>
        <Button variant='contained' color='primary' className={classes.button}>
          {t('update')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(UpdateStatusModal)
