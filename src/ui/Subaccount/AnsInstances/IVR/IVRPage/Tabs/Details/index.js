import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import has from 'lodash/has'

import IVRStore from 'stores/IVR'
import useStyles from './styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import Loading from 'components/Loading'
import Input from 'components/Input'

import EditIcon from 'source/images/svg/edit-blue.svg'
import ivrIcon from 'source/images/svg/nameIVRIcon.svg'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'

const Details = props => {
  const { t } = props
  const { ivr, isLoadingIVR, putUpdateIVR } = IVRStore
  const classes = useStyles()
  const match = useParams()
  const [ivrName, setIVRName] = useState(
    has(ivr, 'serviceInstanceProfile.name')
      ? ivr.serviceInstanceProfile.name
      : ''
  )
  const [isEdit, setIsEdit] = useState(false)

  if (isLoadingIVR) {
    return <Loading />
  }

  const updateIVR = () => {
    putUpdateIVR(
      match.customerId,
      match.groupId,
      ivr.serviceUserId,
      {
        serviceInstanceProfile: {
          name: ivrName
        }
      },
      setIsEdit(false)
    )
  }

  return (
    <React.Fragment>
      <Box className={classes.boxName}>
        <Input
          value={ivrName}
          label={t('name')}
          icon={<img src={ivrIcon} alt='ivrIcon' />}
          onChange={e => setIVRName(e.target.value)}
          disabled={!isEdit}
        />
        <Button
          variant={'contained'}
          className={classes.roundButtonEdit}
          onClick={() => setIsEdit(true)}
          disabled={isEdit}
        >
          <img src={EditIcon} alt='EditIcon' />
        </Button>
      </Box>
      {isEdit && (
        <Box className={classes.editBox}>
          <Box className={classes.editControlsButtons}>
            <Button
              variant={'contained'}
              className={classes.roundEditControlsButton}
              onClick={() => {
                setIsEdit(false)
                setIVRName(ivr.serviceInstanceProfile.name)
              }}
            >
              <ClearIcon />
            </Button>
            <Box>{t('cancel')}</Box>
          </Box>
          <Box className={classes.editControlsButtons}>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.roundEditControlsButton}
              onClick={updateIVR}
            >
              <CheckIcon />
            </Button>
            <Box>{t('save')}</Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  )
}

export default withNamespaces()(observer(Details))
