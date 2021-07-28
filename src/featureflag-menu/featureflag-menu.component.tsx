import * as React from 'react'

import { FeatureFlag } from '../api/api-types'
import { apiService } from '../api/api-service'
import { Menu } from 'antd';
import { SelectEventHandler, SelectInfo } from 'rc-menu/lib/interface';


type Props = {
  setActiveFlag:  React.Dispatch<React.SetStateAction<string | null>>
}

const FeatureFlagMenu = ({ setActiveFlag } : Props) : JSX.Element => {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlag[]>([])
  const [selectedFlag, setSelectedFlag] = React.useState<string>('')

  React.useEffect(() => {
    const fetchFeatureFlags = async () : Promise<void> => {
      try {
        const result = await apiService.getFeatureFlags()
        setFeatureFlags(result)
        setSelectedFlag(`${result[0].id}`)
        setActiveFlag(`${result[0].id}`)
      } catch (error) {
        console.log(error)
      }
    }

    fetchFeatureFlags()
  }, [])

  const handleOnSelect = (info : SelectInfo) => {
    setSelectedFlag(info.key)
    setActiveFlag(info.key)
  }

  return (
    <Menu
      onClick={() => {}}
      style={{ width: 256, height: '100vh' }}
      selectedKeys={[selectedFlag]}
      onSelect={handleOnSelect}
    >
      {featureFlags.map(flag => (
        <Menu.Item key={flag.id}>{flag.name}</Menu.Item>
      ))}
    </Menu> 
  )

}

export { FeatureFlagMenu }