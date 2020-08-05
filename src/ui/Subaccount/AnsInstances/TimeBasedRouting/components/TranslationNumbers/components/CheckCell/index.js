import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import Checkbox from 'components/Checkbox'

const CheckCell = ({
  row: { checked, hover, setChecked, setHover },
  i,
  classes
}) => {
  return (
    <Fragment>
      {checked ? (
        <Checkbox
          checked={checked}
          className={classes.checkbox}
          onChange={() => setChecked(!checked)}
        />
      ) : (
        <div
          className={classes.indexHoverCheckbox}
          onClick={() => setChecked(!checked)}
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
        >
          {hover ? (
            <Checkbox
              checked={checked}
              className={classes.checkbox}
              onChange={() => setChecked(true)}
            />
          ) : (
            i + 1
          )}
        </div>
      )}
    </Fragment>
  )
}

export default observer(CheckCell)
