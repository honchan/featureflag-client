import axios, { ResponseType } from 'axios'

import { FeatureFlag, FeatureRuleDefault, FeatureRuleOnetime, FeatureRuleWhitelist, FeatureRuleWhitelistPayload } from './api-types'

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
  },
  updateDefaultFeatureRule: async(id: string, enabled: boolean) => {
    const endpoint = `featureflags/${id}/default`
    const result = await axiosInstance.put(endpoint, { enabled })
    return result.data
  }, 
  updateWhitelistFeatureRule: async(id: string, payload: FeatureRuleWhitelistPayload) => {
    const endpoint = `featureflags/${id}/whitelist`
    const result = await axiosInstance.put(endpoint, payload)
    return result.data
  },
  updateOnetimeFeatureRule: async(id: string, enabled: boolean) => {
    const endpoint = `featureflags/${id}/onetime`
    const result = await axiosInstance.put(endpoint, { enabled })
    return result.data
  }, 
}

export { apiService }
