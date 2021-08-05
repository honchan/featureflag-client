import * as React from 'react'
import { Collapse } from 'antd';

import classes from './featurerule.component.module.css'
import { apiService } from '../api/api-service'
import { FeatureRuleDefault, FeatureRuleOnetime, FeatureRuleWhitelist} from '../api/api-types'
import { DefaultFeatureRule } from './default-featurerule/default-featurerule.component'
import { WhitelistFeatureRule } from './whitelist-featurerule/whitelist-featurerule.component'
import { OnetimeFeatureRule } from './onetime-featurerule/featurerule.onetime.component'

type Props = {
  activeFlag: string | null
}

const { Panel } = Collapse

const FeatureRule = ({ activeFlag } : Props) : JSX.Element => {
  const [featureRuleDefault, setFeatureRuleDefault] = React.useState<FeatureRuleDefault | null>(null)
  const [featureRuleOnetime, setFeatureRuleOnetime] = React.useState<FeatureRuleOnetime | null>(null)
  const [featureRuleWhitelist, setFeatureRuleWhitelist] = React.useState<FeatureRuleWhitelist | null>(null)

  React.useEffect(() => {
    if (activeFlag == null) return
  
    const fetchFeatureRules = async () => {
      const result = await apiService.getFeatureFlagRules(activeFlag)
      setFeatureRuleDefault(result.find(featureRule => featureRule.type === 'DEFAULT') as FeatureRuleDefault)
      setFeatureRuleOnetime(result.find(featureRule => featureRule.type === 'ONETIME') as FeatureRuleOnetime)
      setFeatureRuleWhitelist(result.find(featureRule => featureRule.type === 'WHITELIST') as FeatureRuleWhitelist)      
    }

    fetchFeatureRules()
  }, [activeFlag])

  return (
    <div className={classes.container}>
      <Collapse className={classes.collapse_group} defaultActiveKey="1">
        <Panel key="1" header="Default Feature Rule" className={featureRuleDefault?.enabled ? classes.panelEnabled : classes.panelDisabled }>
          <DefaultFeatureRule featureRule={featureRuleDefault} featureFlagId={activeFlag || ''} />
        </Panel>
        <Panel key="2" header="Whitelist Feature Rule" className={featureRuleWhitelist?.enabled ? classes.panelEnabled : classes.panelDisabled }>
          <WhitelistFeatureRule featureRule={featureRuleWhitelist} />
        </Panel>
        <Panel key="3" header="Onetime Feature Rule" className={featureRuleOnetime?.enabled ? classes.panelEnabled : classes.panelDisabled }>
          <OnetimeFeatureRule featureRule={featureRuleOnetime} />
        </Panel>
      </Collapse>
    </div>
  )
}

export { FeatureRule }
