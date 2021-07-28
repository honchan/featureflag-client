import axios, { ResponseType } from 'axios'

import { FeatureFlag, FeatureRuleDefault, FeatureRuleOnetime, FeatureRuleWhitelist } from './api-types'

const SERVER_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({ baseURL: SERVER_URL })

const apiService = {
  getFeatureFlags: async () => {
    const endpoint = 'featureflags'
    const result = await axiosInstance.get<FeatureFlag[]>(endpoint)
    return result.data
  },
  getFeatureFlagRules: async (id : string) => {
    const endpoint = `featureflags/${id}/featurerules`
    const result = await axiosInstance.get<Array<FeatureRuleDefault | FeatureRuleOnetime | FeatureRuleWhitelist>>(endpoint)
    return result.data
  }
}

export { apiService }
