import * as React from 'react'
import { Switch, Tag } from 'antd'

import { FeatureRuleWhitelist } from '../../api/api-types'

type Props = {
  featureRule: FeatureRuleWhitelist | null
}

const WhitelistFeatureRule = ({ featureRule } : Props) : JSX.Element => {
  const [onList, setOnList] = React.useState<string[]>(featureRule?.onList || [])
  const [offList, setOffList] = React.useState<string[]>(featureRule?.offList || [])

  React.useEffect(() : void => {
    if (featureRule) {
      setOnList(featureRule.onList)
      setOffList(featureRule.offList)
    }
  }, [featureRule])

  const handleRemoveFromOnList = (removedUser : string) : void => {
    setOnList(prevState => prevState.filter(user => user != removedUser))
  }

  const handleRemoveFromOffList = (removedUser : string) : void => {
    setOffList(prevState => prevState.filter(user => user != removedUser))
  }

  console.log('onList', onList)
  console.log('offList', offList)

  return (
    <>
      <h3>Whitelist feature rule</h3>
      <p>
        <b>Enabled</b>
        <Switch checked={featureRule?.enabled} />
      </p>
      <p>On List</p>
      {onList.map(user => <Tag closable key={user} onClose={() => handleRemoveFromOnList(user)}>{user}</Tag>)}
      <p>Off List</p>
      {offList.map(user => <Tag closable key={user} onClose={() => handleRemoveFromOffList(user)}>{user}</Tag>)}
    </>
  )
}

export { WhitelistFeatureRule }
