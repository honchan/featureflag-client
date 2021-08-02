import * as React from 'react'
import { Switch, Tag } from 'antd'

import { FeatureRuleOnetime } from '../../api/api-types'

type Props = {
  featureRule: FeatureRuleOnetime | null
}

const OnetimeFeatureRule = ({ featureRule } : Props) : JSX.Element => {
  const [blockedList, setBlockedList] = React.useState<string[]>(featureRule?.blocked || [])

  React.useEffect(() : void => {
    if (featureRule) {
      setBlockedList(featureRule.blocked)
    }
  }, [featureRule])

  const handleRemoveFromBlockedList = (removedUser : string) : void => {
    setBlockedList(prevState => prevState.filter(user => user != removedUser))
  }


  return (
    <>
      <h3>Onetime feature rule</h3>
      <p>
        <b>Enabled</b>
        <Switch checked={featureRule?.enabled} />
      </p>
      <p>Blocked List</p>
      {blockedList.map(user => <Tag key={user}>{user}</Tag>)}
    </>
  )
}

export { OnetimeFeatureRule }
