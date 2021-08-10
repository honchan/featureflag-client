import * as React from 'react'
import { Tag, Input } from 'antd'

import classes from './editable-tag.component.module.css'

type Props = {
  displayText: string
  onConfirm: (value: string) => void
}

const EditableTag = ({ displayText, onConfirm } : Props) : JSX.Element => {
  const [value, setValue] = React.useState<string>('')
  const [isEditing, setIsEditing] = React.useState<boolean>(false)


  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    setValue(e.target.value)
  }

  const confirmChange = () => {
    if (value !== '') {
      onConfirm(value)
    }

    setIsEditing(false)
  }

  const handleEscapeKeyPressed = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Escape') {
      setValue('')
      setIsEditing(false)
    }
  }

  return (
    isEditing
      ? <Input
          type="text"
          className={classes.small_input}
          onChange={handleInputChange}
          onPressEnter={confirmChange}
          onKeyDown={handleEscapeKeyPressed}
        /> 
      : <Tag color="geekblue" onClick={() => setIsEditing(true)}>{displayText}</Tag>
  )
}

export { EditableTag }

