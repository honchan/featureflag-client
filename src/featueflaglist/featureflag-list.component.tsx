import * as React from 'react'

import { FeatureFlag } from './api/api-types'
import { apiService } from './api/api-service'
import { Menu } from 'antd';

const FeatureFlagList = () : JSX.Element => {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlag[]>([])
  const [selectedFlag, setSelectedFlag] = React.useState<string>('')

  React.useEffect(() => {
    const fetchFeatureFlags = async () : Promise<void> => {
      try {
        const result = await apiService.getFeatureFlags()
        setFeatureFlags(result)
        setSelectedFlag(`${result[0].id}`)
      } catch (error) {
        console.log(error)
      }
    }

    fetchFeatureFlags()
  }, [])

  return (
    <Menu
      onClick={() => {}}
      style={{ width: 256, height: '100vh' }}
      selectedKeys={[selectedFlag]}
      onSelect={({ key }) => setSelectedFlag(key)}
    >
      {featureFlags.map(flag => (
        <Menu.Item key={flag.id}>{flag.name}</Menu.Item>
      ))}
    </Menu> 
  )

}

export { FeatureFlagList }