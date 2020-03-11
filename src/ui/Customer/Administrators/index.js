import React, { useState, useContext, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import Loading from 'components/Loading'
import CustomerAdministrators from 'stores/CustomerAdministrators'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import AddCustomerAdministratorModal from './components/AddCustomerAdministratorModal'
import AdminCard from './components/AdminCard'

import useStyles from './styles'

const Administrators = props => {
  const [isOpened, setIsOpened] = useState(false)
  const { rows, getCustomerAdmins, isLoading } = useContext(
    CustomerAdministrators
  )
  console.log('isLoading', isLoading)
  const { t } = props
  const match = useParams()
  const classes = useStyles()

  useEffect(() => {
    getCustomerAdmins(match.customerId)
  }, [getCustomerAdmins, match.customerId])

  useEffect(() => {
    getCustomerAdmins(match.customerId)
  }, [getCustomerAdmins, match.customerId])
  const breadcrumbs = [
    {
      url: '/customers',
      text: t('customers')
    },
    {
      text: match.customerId
    },
    {
      text: t('administrators')
    }
  ]
  const titleData = {
    mainText: 'MTN ANS',
    iconCapture: t('add'),
    Icon: <PersonAddOutlinedIcon />
  }

  const showModal = () => {
    setIsOpened(true)
  }
  const hideModal = () => {
    setIsOpened(false)
  }

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <Paper className={classes.paper}>
          <Container>
            <CustomBreadcrumbs classes={classes} breadcrumbs={breadcrumbs} />
            <TitleBlock
              titleData={titleData}
              classes={classes}
              handleOpen={showModal}
            />
          </Container>
          <Box className={classes.adminsWrapper}>
            {rows.map(admin => (
              <AdminCard
                classes={classes}
                admin={admin}
                key={admin.userId}
                handleOpen={showModal}
                handleClose={hideModal}
                getCustomerAdmins={getCustomerAdmins}
              />
            ))}
          </Box>

          <AddCustomerAdministratorModal
            show={isOpened}
            handleClose={hideModal}
          />
        </Paper>
      )}
    </div>
  )
}

export default withNamespaces()(observer(Administrators))
