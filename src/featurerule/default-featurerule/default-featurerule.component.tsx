import * as React from 'react'
import {  Switch  } from 'antd'

import { FeatureRuleDefault } from '../../api/api-types'

type Props = {
  featureRule: FeatureRuleDefault | null
}

const DefaultFeatureRule = ({ featureRule } : Props) : JSX.Element => {
  console.log('defaultFeatureRule: ', featureRule)
  return (
    <>
      <h3>Default feature rule</h3>
      <p>
        <b>Enabled</b>
        <Switch checked={featureRule?.enabled} />
      </p>
    </>
  )
}

export { DefaultFeatureRule }
