import React, { useContext, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import Input from 'components/Input'

import CreateCustomerStore from 'stores/CreateCustomer'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import setWith from 'lodash/setWith'

import useStyles from './styles'

const ENTITLEMENTS = [
  {
    country: 'Angola (+24)',
    total: 120,
    showEntitlements: false,
    entitlements: [
      {
        name: 'GEO - ANS Basic',
        total: 80
      },
      {
        name: 'GEO - ANS Advanced',
        total: 20
      },
      {
        name: 'Mobile - ANS Advanced',
        total: 5
      }
    ]
  },
  {
    country: 'South Africa (+27)',
    total: 13,
    showEntitlements: false,
    entitlements: [
      {
        name: 'GEO - ANS Basic',
        total: 5
      },
      {
        name: 'GEO - ANS Advanced',
        total: 5
      },
      {
        name: 'Mobile - ANS Advanced',
        total: 3
      }
    ]
  }
]

const SetEntitlements = props => {
  const { handleClose, t, store } = props
  const { changeStep, customer, changeCustomer } = useContext(store)
  const [entitlements, setEntitlements] = useState(ENTITLEMENTS)
  const classes = useStyles()

  const showHideEntitlements = i => {
    const newEntitlemtents = [...entitlements]
    setEntitlements(
      setWith(
        newEntitlemtents,
        `[${i}][showEntitlements]`,
        !entitlements[i].showEntitlements
      )
    )
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('set_entitlements')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Grid container className={classes.girdTitle}>
          <Grid item xs={2}></Grid>
          <Grid item xs={6}>
            {t('entitlement')}
          </Grid>
          <Grid item xs={4}>
            {t('total')}
          </Grid>
        </Grid>
        {entitlements.map((el, i) => (
          <React.Fragment key={i}>
            <Grid container className={classes.entitlementsHeader}>
              <Grid item xs={2} className={classes.entitlementsHeaderNumber}>
                {i + 1}
              </Grid>
              <Grid
                item
                xs={6}
                className={classes.entitlementsHeaderName}
                onClick={() => showHideEntitlements(i)}
              >
                {el.country}
                <ExpandMoreIcon />
              </Grid>
              <Grid item xs={4} className={classes.entitlementsHeaderTotal}>
                {el.total}
              </Grid>
            </Grid>
            {el.showEntitlements &&
              el.entitlements.map((ent, j) => (
                <Grid container key={j} className={classes.entitlementsGrid}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={6} className={classes.entitlementsItemTitle}>
                    {ent.name}
                  </Grid>
                  <Grid item className={classes.entitlementsItemTotal}>
                    <Input
                      variant='outlined'
                      defaultValue={ent.total}
                      className={classes.entitlementsItemInput}
                    />
                  </Grid>
                </Grid>
              ))}
          </React.Fragment>
        ))}
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => changeStep(5)}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SetEntitlements))
