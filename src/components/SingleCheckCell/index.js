// For table with single possible checked item
import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import Checkbox from 'components/Checkbox'

const SingleCheckCell = ({
  row: { hover, setHover, country_code, nsn },
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
              destination: `${country_code}${nsn}`
            })
          }
        />
      ) : (
        <div
          className={classes.indexHoverCheckbox}
          onClick={() =>
            setCurrentCheckedNumber({
              id: i,
              destination: `${country_code}${nsn}`
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
                  destination: `${country_code}${nsn}`
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
