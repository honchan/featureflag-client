import * as React from 'react'
import { Button, Input } from 'antd'

import { useMutateDeleteFeatureflag } from '../../querys/useMutateDeleteFeatureflag'
import classes from './delete-featureflag-form.component.module.css'

type Props = {
  selectedFlag: string,
  flagId: number,
}

const DeleteFeatureflagForm = ({ selectedFlag, flagId } : Props) : JSX.Element => {
  const [showConfirmation, setShowConfirmation] = React.useState<boolean>(false)
  const [flagname, setFlagname] = React.useState<string>('')
  const { mutate } = useMutateDeleteFeatureflag()

  const disabled = flagname !== selectedFlag

  const handleCancelDelete = () : void => {
    setFlagname('')
    setShowConfirmation(false)
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFlagname(e.target.value)
  }

  return (
  <div className={classes.container}>
    <Button onClick={() => setShowConfirmation(true)}>Delete</Button>
    {showConfirmation && 
      <div>
        <p className={classes.confirm_delete_message}>Enter flag name and press enter to confirm deletion</p>
        <Input className={classes.confirm_delete_input} value={flagname} onChange={handleChange}/>
        <Button
          danger
          disabled={disabled} 
          className={classes.confirm_delete_button}
          onClick={() => mutate(flagId)}
        >
          Confirm
        </Button>
        <Button onClick={handleCancelDelete}>Cancel</Button>
      </div>
    }
  </div>
  )
}

export { DeleteFeatureflagForm }
