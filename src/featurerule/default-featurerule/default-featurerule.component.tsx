import * as React from 'react'
import {  Switch  } from 'antd'

import classes from './default-featurerule.component.module.css'
import { FeatureRuleDefault } from '../../api/api-types'
import { apiService } from '../../api/api-service'

type Props = {
  featureRule: FeatureRuleDefault | null
  featureFlagId: string
}

const DefaultFeatureRule = ({ featureRule, featureFlagId } : Props) : JSX.Element => {
  const handleChange = async (value: boolean) : Promise<void> => {
    await apiService.updateDefaultFeatureRule(featureFlagId, value)
  }

  return (
    <>
      <div className={classes.status_container}>
        <span className={classes.status_text}>Enabled</span>
        <Switch checked={featureRule?.enabled} onChange={handleChange} />
      </div>
    </>
  )
}

export { DefaultFeatureRule }
