import React from 'react'

import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'

const PopoverBlock = ({
  popoverId,
  isPeriodPopoverOpen,
  anchorEl,
  handlePopoverClose,
  classes,
  popoverButtons
}) => {
  return (
    <Box>
      <Popover
        id={popoverId}
        open={isPeriodPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box className={classes.popoverWrap}>
          {popoverButtons.map(({ Icon, label, handleClick }) => (
            <Box
              onClick={handleClick}
              className={classes.popoverButtonWrap}
              key={label}
            >
              <img
                src={Icon}
                className={classes.popoverIcon}
                alt={`${label}`}
              />
              <span className={classes.popoverLabel}>{label}</span>
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default PopoverBlock
