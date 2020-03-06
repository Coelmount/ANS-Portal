import React, { useState } from 'react'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'

const DetailsTemplate = ({ data }) => {
  console.log(data.addressInformation, 'data')
  console.log(data.addressInformation.addressLine1, 'line')
  // const adressInfo = data.addressInformation
  // const { addressLine1, city, postalCode, country } = adressInfo
  const [expanded, setExpanded] = useState(false)

  const expansionBlocks = [
    {
      title: 'Contact information',
      name: 'contact',
      fields: [
        {
          icon: <PermIdentityOutlinedIcon />,
          name: 'Name:'
        },
        {
          icon: <PhoneOutlinedIcon />,
          name: 'Phone Number:'
        },
        {
          icon: <MailOutlineOutlinedIcon />,
          name: 'Email:'
        }
      ]
    },
    {
      title: 'Adress information',
      name: 'adress',
      fields: [
        {
          name: 'Street:'
          // value: addressLine1
        },
        {
          name: 'City:'
          // value: adressInfo.city
        },
        {
          name: 'Country:'
          // value: adressInfo.country
        },
        {
          name: 'Postal Code:'
          // value: adressInfo.postalCode
        }
      ]
    }
  ]

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div>
      <div>first block</div>
      {expansionBlocks.map(expansionBlock => (
        <ExpansionPanel
          expanded={expanded === expansionBlock.name}
          onChange={handleChange(expansionBlock.name)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography>{expansionBlock.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {expansionBlock.fields.map(field => (
              <Box style={{ paddingLeft: 50 }}>
                <Box>
                  {field.icon ? field.icon : null}
                  {field.name ? field.name : null}
                </Box>
              </Box>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

      {/* <ExpansionPanel
        expanded={expanded === 'contact'}
        onChange={handleChange('contact')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography>Contact Information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'flex' }}>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Name:</Typography>
            <Typography>Phone Number:</Typography>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>Alex Microsoft</Typography>
            <Typography>0007</Typography>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
    </div>
  )
}

export default DetailsTemplate
