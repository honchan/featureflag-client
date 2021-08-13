import * as React from 'react'
import { Menu } from 'antd';
import { SelectInfo } from 'rc-menu/lib/interface';

import { useFeatureFlags } from '../querys/useFeatureFlags'
import { CreateFeatureflagForm } from './create-featureflag-form/create-featureflag-form.component'

type Props = {
  setActiveFlag:  React.Dispatch<React.SetStateAction<string>>
}

const FeatureFlagMenu = ({ setActiveFlag } : Props) : JSX.Element => {
  const [selectedFlag, setSelectedFlag] = React.useState<string>('')
  const { data = []} = useFeatureFlags()

  React.useEffect(() => {
    if (!selectedFlag && data.length > 0) {
      setActiveFlag(`${data[0].id}`)
      setSelectedFlag(`${data[0].id}`)
    }
  }, [data])

  const handleOnSelect = (info : SelectInfo) => {
    setSelectedFlag(info.key)
    setActiveFlag(info.key)
  }

  return (
    <Menu
      onClick={() => {}}
      style={{ width: 400, height: '100vh' }}
      selectedKeys={[selectedFlag]}
      onSelect={handleOnSelect}
    >
      <CreateFeatureflagForm setActiveFlag={setActiveFlag}/>
      {data.map(flag => (
        <Menu.Item key={flag.id}>{flag.name}</Menu.Item>
      ))}
    </Menu> 
  )

}

export { FeatureFlagMenu }