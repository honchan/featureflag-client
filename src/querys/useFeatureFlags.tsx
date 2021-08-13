import { useQuery } from 'react-query'

import { apiService } from '../api/api-service'
import { FeatureFlag } from '../api/api-types'

const FEATUREFLAGS_KEY = 'featureflags'

const useFeatureFlags = () => {
  const fetchFeatureFlags = async () : Promise<FeatureFlag[]> => {
    const result = await apiService.getFeatureFlags()
    return result
  }

  return useQuery(FEATUREFLAGS_KEY, () => fetchFeatureFlags())
}

export { useFeatureFlags, FEATUREFLAGS_KEY }
