import * as React from 'react'
import { Input, Collapse, Button } from 'antd'

import { useMutateCreateFeatureflag } from '../../querys/useMutateCreateFeatureflag'
import classes from './create-featureflag-form.component.module.css'

const { Panel } = Collapse

type Props = {
  setActiveFlag:  React.Dispatch<React.SetStateAction<string>>
}

const CreateFeatureflagForm = ({ setActiveFlag }: Props) : JSX.Element => {
  const [flagname, setFlagname] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')

  const onComplete = () => {
    setFlagname('')
    setDescription('')
  }

  const { mutate, isLoading } = useMutateCreateFeatureflag({ onComplete, setActiveFlag })

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    if (name === 'flagname') {
      setFlagname(e.target.value)
    } else if (name === 'description') {
      setDescription(e.target.value)
    }
  }

  const handleSubmit = async () : Promise<void> => {
    mutate({ newFlag: flagname, description })
  }

  const disabled = flagname === ''

  return (
    <Collapse>
      <Panel key="create-featureflag-panel" header="Create a new featureflag" className={classes.background_color}>
        <div className={classes.create_flag_form}>
          <Input size="large" placeholder="Featureflag name" value={flagname} onChange={handleInputChange} name="flagname"/>
          <Input placeholder="Description" value={description} onChange={handleInputChange} name="description"/>
          <Button type="primary" loading={isLoading} disabled={disabled} onClick={handleSubmit}>Submit</Button>
        </div>
      </Panel>
    </Collapse>
  )
}

export { CreateFeatureflagForm }