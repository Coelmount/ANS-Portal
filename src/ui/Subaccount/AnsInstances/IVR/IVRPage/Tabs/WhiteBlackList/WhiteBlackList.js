import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { toJS } from 'mobx'
import has from 'lodash/has'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import SchedulerIcon from 'source/images/svg/schedules.svg'
import EditIcon from 'source/images/svg/edit-blue.svg'

import MenuTemplate from 'components/MenuTemplate'
import Loading from 'components/Loading'

import IVRStore from 'stores/IVR'
import useStyles from './styles'

const WhiteBlackList = props => {
  const { t } = props
  const {
    ivr,
    isLoadingIVR,
    getWhiteBlackList,
    isLoadingWhiteBlackList,
    whiteBlackList
  } = IVRStore
  const classes = useStyles()
  const match = useParams()
  const [mode, setMode] = useState('')

  useEffect(() => {
    getWhiteBlackList(match.customerId, match.groupId, match.ivrId)
  }, [])

  useEffect(() => {
    if (whiteBlackList.mode) {
      setMode(whiteBlackList.mode)
    }
  }, [whiteBlackList.mode])

  if (isLoadingIVR || isLoadingWhiteBlackList) {
    return <Loading />
  }

  const changeMode = e => {
    if (whiteBlackList.mode === 'inactive') {
      setMode(e.target.value)
    }
  }

  console.log('storeMode', toJS(whiteBlackList.mode))

  return (
    <React.Fragment>
      <Box>
        <FormControl component='fieldset'>
          <RadioGroup value={mode} onChange={changeMode}>
            <FormControlLabel
              value='blacklist'
              control={<Radio />}
              label={<Box>blacklist</Box>}
              disabled={whiteBlackList.mode === 'whitelist'}
            />
            <FormControlLabel
              value='whitelist'
              control={<Radio />}
              label='whitelist'
              disabled={whiteBlackList.mode === 'blacklist'}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(WhiteBlackList))
