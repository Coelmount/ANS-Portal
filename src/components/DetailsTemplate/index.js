import React, { useState, useContext, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'

import Loading from 'components/Loading'
import DetailsBlock from './components/DetailsBlock'

import useStyles from './styles'

const DetailsTemplate = ({ data, isLoading, t }) => {
  const classes = useStyles()
  const [isContactExpanded, setIsContactExpanded] = useState(true)
  const [isAddressExpanded, setIsAddressExpanded] = useState(true)

  const { addressLine1, city, country, postalCode } = data.addressInformation
  const { name, phoneNumber, emailAddress } = data.contactInformation

  const expansionBlocks = [
    {
      title: t('contact_information'),
      name: 'contact',
      fields: [
        {
          icon: <PermIdentityOutlinedIcon />,
          name: t('name'),
          value: name
        },
        {
          icon: <PhoneOutlinedIcon />,
          name: t('phone_number'),
          value: phoneNumber
        },
        {
          icon: <MailOutlineOutlinedIcon />,
          name: t('email'),
          value: emailAddress
        }
      ]
    },
    {
      title: t('address_information'),
      name: 'address',
      fields: [
        {
          name: t('street'),
          value: addressLine1
        },
        {
          name: t('city'),
          value: city
        },
        {
          name: t('country'),
          value: country
        },
        {
          name: t('postal_code'),
          value: postalCode
        }
      ]
    }
  ]

  const handleChange = panel => () => {
    if (panel === 'contact') {
      setIsContactExpanded(!isContactExpanded)
    } else {
      setIsAddressExpanded(!isAddressExpanded)
    }
  }
  const styledExpandMoreIcon = (
    <Box className={classes.expandMoreIconWrap}>
      <ExpandMoreIcon className={classes.expandMoreIcon} />
    </Box>
  )

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <DetailsBlock classes={classes} data={data} />
          {expansionBlocks.map(expansionBlock => (
            <ExpansionPanel
              expanded={
                (expansionBlock.name === 'contact' && isContactExpanded) ||
                (expansionBlock.name === 'address' && isAddressExpanded)
              }
              onChange={handleChange(expansionBlock.name)}
              className={classes.expansionPannel}
              key={expansionBlock.name}
            >
              <ExpansionPanelSummary
                expandIcon={styledExpandMoreIcon}
                className={classes.panelSummary}
              >
                <Typography className={classes.blockTitle}>
                  {expansionBlock.title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {expansionBlock.fields.map(field => (
                  <Box className={classes.detailsFieldsWrap} key={field.name}>
                    <Box className={classes.fieldTitleBlock}>
                      {field.icon ? field.icon : null}
                      <Typography>{`${field.name}:`}</Typography>
                    </Box>
                    <Typography> {field.value}</Typography>
                  </Box>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Fragment>
      )}
    </div>
  )
}

export default withNamespaces()(DetailsTemplate)
