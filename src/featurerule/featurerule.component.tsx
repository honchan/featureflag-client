import * as React from 'react'

import { apiService } from '../api/api-service'

type Props = {
  activeFlag: string | null
}

const FeatureRule = ({ activeFlag } : Props) : JSX.Element => {
  React.useEffect(() => {
    if (activeFlag == null) return

    const fetchFeatureRules = async () => {
      const result = await apiService.getFeatureFlagRules(activeFlag)
      console.log(result)
    }

    fetchFeatureRules()
  }, [activeFlag])

  return <p>Hello</p>
}

export { FeatureRule }
