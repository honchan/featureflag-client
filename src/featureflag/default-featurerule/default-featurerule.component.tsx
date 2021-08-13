import * as React from 'react'
import {  Switch  } from 'antd'

import classes from './default-featurerule.component.module.css'
import { FeatureRuleDefault } from '../../api/api-types'
import { useMutateDefault } from '../../querys/useMutateDefault'

type Props = {
  featureRule: FeatureRuleDefault | null
  featureFlagId: string
}

const DefaultFeatureRule = ({ featureRule, featureFlagId } : Props) : JSX.Element => {
  const { mutate } = useMutateDefault({ flagId: featureFlagId })

  return (
    <>
      <div className={classes.status_container}>
        <span className={classes.status_text}>Enabled</span>
        <Switch checked={featureRule?.enabled} onChange={value => mutate(value)} />
      </div>
    </>
  )
}

export { DefaultFeatureRule }
