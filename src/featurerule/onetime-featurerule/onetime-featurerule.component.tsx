import * as React from 'react'
import { Switch, Tag } from 'antd'

import { FeatureRuleOnetime } from '../../api/api-types'
import { useMutateOnetime } from '../../querys/useMutateOnetime'
import classes from './onetime-featurerule.component.module.css'

type Props = {
  featureRule: FeatureRuleOnetime | null,
  featureFlagId: string
}

const OnetimeFeatureRule = ({ featureRule, featureFlagId } : Props) : JSX.Element => {
  const { mutate } = useMutateOnetime({ flagId: featureFlagId })
  const blockedList = featureRule?.blocked || []

  return (
    <>  
      <div className={classes.status_container}>
        <span className={classes.status_text}>Enabled</span>
        <Switch checked={featureRule?.enabled} onChange={value => mutate(value)} />
      </div>
      <div className={classes.tag_container}>
        <p className={classes.tag_label}>Blocked List</p>
        <div>
          {blockedList.map(user => <Tag key={user}>{user}</Tag>)}
        </div>
      </div>
    </>
  )
}

export { OnetimeFeatureRule }
