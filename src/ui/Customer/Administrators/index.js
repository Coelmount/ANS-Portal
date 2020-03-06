import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import CloseIcon from '@material-ui/icons/Close'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import LanguageIcon from '@material-ui/icons/Language'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import AddCustomerAdministrator from './components/AddCustomerAdministrator'

import adminIcon from 'source/images/svg/adminIcon.svg'
import edit from 'source/images/svg/edit.svg'
import useStyles from './styles'

const admins = [
  {
    accountName: 'admin1',
    fullName: 'John Black',
    language: 'English'
  },
  {
    accountName: 'admin2',
    fullName: 'Sam Black',
    language: 'English'
  },
  {
    accountName: 'admin3',
    fullName: 'Vic Black',
    language: 'English'
  }
]

const Administrators = props => {
  const [isOpened, setIsOpened] = useState(false)

  const { t } = props
  const match = useParams()
  const classes = useStyles()
  const breadcrumbs = [
    {
      url: '/customers',
      text: t('customers')
    },
    {
      text: match.customerId
    },
    {
      text: t('Administrators')
    }
  ]
  const titleData = {
    mainText: 'MTN ANS',
    iconCapture: t('Add'),
    Icon: <PersonAddOutlinedIcon />
  }

  const showModal = () => {
    setIsOpened(true)
  }
  const hideModal = () => {
    setIsOpened(false)
  }
  const adminsMapped = admins.map(admin => (
    <Card className={classes.cardWrapper}>
      <CardContent className={classes.cardContentWrapper}>
        <Box className={classes.accountInfoWrapper}>
          <Box className={classes.accountNameWrapper}>
            <img
              src={adminIcon}
              alt='admin-icon'
              className={classes.accountNameIcon}
            />
            <Typography className={classes.accountName}>
              {admin.accountName}
            </Typography>
          </Box>
          <Box className={classes.editDeleteButtonWrapper}>
            <img src={edit} alt='edit-svg' className={classes.icon} />
            <CloseIcon className={classes.icon} />
          </Box>
        </Box>

        <Box className={classes.adminFullNameWrapper}>
          <PersonOutlineIcon className={classes.adminFullNameIcon} />
          <Typography className={classes.adminFullName}>
            {admin.fullName}
          </Typography>
        </Box>
        <Box className={classes.languageWrapper}>
          <LanguageIcon className={classes.languageIcon} />
          <Typography className={classes.language}>{admin.language}</Typography>
        </Box>
      </CardContent>
    </Card>
  ))

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Container>
          <CustomBreadcrumbs classes={classes} breadcrumbs={breadcrumbs} />
          <TitleBlock
            titleData={titleData}
            classes={classes}
            handleOpen={showModal}
          />
        </Container>
        <Box className={classes.adminsWrapper}>{adminsMapped}</Box>
        <AddCustomerAdministrator show={isOpened} handleClose={hideModal} />
      </Paper>
    </div>
  )
}

export default withNamespaces()(Administrators)
