import * as React from 'react'
import { Collapse } from 'antd';

import classes from './featurerule.component.module.css'
import { apiService } from '../api/api-service'
import { FeatureRuleDefault, FeatureRuleOnetime, FeatureRuleWhitelist} from '../api/api-types'
import { DefaultFeatureRule } from './default-featurerule/default-featurerule.component'
import { WhitelistFeatureRule } from './whitelist-featurerule/whitelist-featurerule.component'
import { OnetimeFeatureRule } from './onetime-featurerule/onetime-featurerule.component'
import { useFeatureRules } from '../querys/useFeatureRules'

type Props = {
  activeFlag: string | null
}

const { Panel } = Collapse

const FeatureRule = ({ activeFlag } : Props) : JSX.Element => {
  const { data  } = useFeatureRules({ flagId: activeFlag });

  return (
    <div className={classes.container}>
      <Collapse className={classes.collapse_group} defaultActiveKey="1">
        <Panel key="1" header="Default Feature Rule" className={data?.default?.enabled ? classes.panelEnabled : classes.panelDisabled }>
          <DefaultFeatureRule featureRule={data?.default || null} featureFlagId={activeFlag || ''} />
        </Panel>
        <Panel key="2" header="Whitelist Feature Rule" className={data?.whitelist?.enabled ? classes.panelEnabled : classes.panelDisabled }>
          <WhitelistFeatureRule featureRule={data?.whitelist || null} featureFlagId={activeFlag || ''} />
        </Panel>
        <Panel key="3" header="Onetime Feature Rule" className={data?.onetime?.enabled ? classes.panelEnabled : classes.panelDisabled }>
          <OnetimeFeatureRule featureRule={data?.onetime || null} featureFlagId={activeFlag || ''} />
        </Panel>
      </Collapse>
    </div>
  )
}

export { FeatureRule }
