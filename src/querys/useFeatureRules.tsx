import { useQuery } from 'react-query'

import { apiService } from '../api/api-service'
import { FeatureRuleDefault, FeatureRuleOnetime, FeatureRuleWhitelist} from '../api/api-types'

type Props = {
  flagId: string | null
}

type QueryResult = {
  default: FeatureRuleDefault
  onetime: FeatureRuleOnetime
  whitelist: FeatureRuleWhitelist
}

const FEATURERULES_KEY = 'featurerules'

const useFeatureRules = ({ flagId } : Props) => {
  const fetchFeatureRules = async (flagId: string | null) : Promise<QueryResult | null> => {
    if (!flagId) return null

    const result = await apiService.getFeatureFlagRules(flagId)
    const featureRuleDefault = result.find(featureRule => featureRule.type === 'DEFAULT') as FeatureRuleDefault
    const featureRuleOnetime = result.find(featureRule => featureRule.type === 'ONETIME') as FeatureRuleOnetime
    const featureRuleWhitelist = result.find(featureRule => featureRule.type === 'WHITELIST') as FeatureRuleWhitelist
  
    return {
      default: featureRuleDefault,
      onetime: featureRuleOnetime,
      whitelist: featureRuleWhitelist
    }
  }

  return useQuery([FEATURERULES_KEY, flagId], () => fetchFeatureRules(flagId))
}

export { useFeatureRules, FEATURERULES_KEY }