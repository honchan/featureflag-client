import * as React from 'react'
import { Collapse } from 'antd';

import classes from './featureflag.component.module.css'
import { apiService } from '../api/api-service'
import { FeatureFlag, FeatureRuleDefault, FeatureRuleOnetime, FeatureRuleWhitelist} from '../api/api-types'
import { DefaultFeatureRule } from './default-featurerule/default-featurerule.component'
import { WhitelistFeatureRule } from './whitelist-featurerule/whitelist-featurerule.component'
import { OnetimeFeatureRule } from './onetime-featurerule/onetime-featurerule.component'
import { useFeatureRules } from '../querys/useFeatureRules'
import { useFeatureFlags } from '../querys/useFeatureFlags'
import { DeleteFeatureflagForm } from './delete-featureflag-form/delete-featureflag-form.component';

type Props = {
  activeFlag: string
}

const { Panel } = Collapse

const FeatureFlagComponent = ({ activeFlag } : Props) : JSX.Element => {
  const { data  } = useFeatureRules({ flagId: activeFlag });
  const { data: flags = [] } = useFeatureFlags()

  const filterForActiveFlag = (flagsList : FeatureFlag[], flagId: number) => {
    return flagsList.find(flag => flag.id === flagId)
  }

  const flag = filterForActiveFlag(flags, parseInt(activeFlag))

  return (
    <div className={classes.container}>
      {flag
        ? <>
            <h1>{flag?.name}</h1>
            <p>{flag?.description}</p>
            <DeleteFeatureflagForm selectedFlag={flag.name} flagId={flag.id}/>
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
          </>
        : <h2>No flag selected</h2>
      }
      
    </div>
  )
}

export { FeatureFlagComponent }
