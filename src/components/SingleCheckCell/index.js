// For table with single possible checked item
import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import Checkbox from 'components/Checkbox'

const SingleCheckCell = ({
  row: { hover, setHover, phoneNumber },
  i,
  classes,
  checked,
  setCurrentCheckedNumber
}) => {
  return (
    <Fragment>
      {checked ? (
        <Checkbox
          checked={checked}
          className={classes.checkbox}
          onChange={() =>
            setCurrentCheckedNumber({
              id: i,
              destination: phoneNumber
            })
          }
        />
      ) : (
        <div
          className={classes.indexHoverCheckbox}
          onClick={() =>
            setCurrentCheckedNumber({
              id: i,
              destination: `${phoneNumber}`
            })
          }
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
        >
          {hover ? (
            <Checkbox
              checked={checked}
              className={classes.checkbox}
              onChange={() =>
                setCurrentCheckedNumber({
                  id: i,
                  destination: `${phoneNumber}`
                })
              }
            />
          ) : (
            i + 1
          )}
        </div>
      )}
    </Fragment>
  )
}

export default observer(SingleCheckCell)
