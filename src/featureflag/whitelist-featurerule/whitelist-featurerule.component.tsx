import * as React from 'react'
import { Switch, Tag } from 'antd'

import classes from './whitelist-featurerule.component.module.css'
import { FeatureRuleWhitelist } from '../../api/api-types'
import { useMutateWhitelist } from '../../querys/useMutateWhitelist'
import { EditableTag } from '../../global/editable-tag/editable-tag.component'

type Props = {
  featureRule: FeatureRuleWhitelist | null
  featureFlagId: string
}

const WhitelistFeatureRule = ({ featureRule, featureFlagId } : Props) : JSX.Element => {
  const { mutate } = useMutateWhitelist({ flagId: featureFlagId })
  const onList = featureRule?.onList || []
  const offList = featureRule?.offList || []

  const handleRemoveFromList = (removedUser: string, list: "ON" | "OFF") => {
    let onListCopy = onList
    let offListCopy = offList

    if (list === 'ON') {
      onListCopy = onList.filter(user => user != removedUser)
    } else {
      offListCopy = offList.filter(user => user != removedUser)
    }
    mutate({ offList: offListCopy, onList: onListCopy, enabled: featureRule?.enabled || false})  
  }

  const handleAddToList = (newTag: string, list: "ON" | "OFF") => {
    let onListCopy = onList
    let offListCopy = offList

    if (list === 'ON') {
      onListCopy = [...onListCopy, newTag]
    } else {
      offListCopy = [...offListCopy, newTag]
    }
    mutate({ offList: offListCopy, onList: onListCopy, enabled: featureRule?.enabled || false})  
  }

  return (
    <>
      <div className={classes.status_container}>
        <span className={classes.status_text}>Enabled</span>
        <Switch checked={featureRule?.enabled} onChange={value => mutate({ onList, offList, enabled: value })} />
      </div>
      <div className={classes.tag_container}>
        <p className={classes.tag_label}>On List</p>  
        <div>
          {onList.map(user => <Tag closable key={user} onClose={() => handleRemoveFromList(user, "ON")}>{user}</Tag>)}
          <EditableTag displayText="Add New" onConfirm={(value) => handleAddToList(value, "ON")}/>
        </div>
      </div>
      <div className={classes.tag_container}>
        <p className={classes.tag_label}>Off List</p>  
        <div>
          {offList.map(user => <Tag closable key={user} onClose={() => handleRemoveFromList(user, "OFF")}>{user}</Tag>)}
          <EditableTag displayText="Add New" onConfirm={(value) => handleAddToList(value, "OFF")}/>
        </div>
      </div>
    </>
  )
}

export { WhitelistFeatureRule }
