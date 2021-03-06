import axios, { ResponseType } from 'axios'

import { FeatureFlag, FeatureRuleDefault, FeatureRuleOnetime, FeatureRuleWhitelist, FeatureRuleWhitelistPayload, CreateFeatureflagPayload } from './api-types'

const SERVER_URL = 'http://localhost:3000/'

const axiosInstance = axios.create({ baseURL: SERVER_URL })

const apiService = {
  createNewFlag: async (name: string, description: string) => {
    const endpoint = 'featureflags'
    const result = await axiosInstance.post<CreateFeatureflagPayload>(endpoint, { name, description}) 
    return result.data
  },
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
    try {
      const result = await axiosInstance.put(endpoint, payload)
      return result.data
    } catch (error) {
      throw error
    }
  },
  updateOnetimeFeatureRule: async(id: string, enabled: boolean) => {
    const endpoint = `featureflags/${id}/onetime`
    const result = await axiosInstance.put(endpoint, { enabled })
    return result.data
  },
  deleteFeatureflag: async(id: number) => {
    const endpoint = `featureflags/${id}`
    const result = await axiosInstance.delete(endpoint)
    return result.data
  }
}

export { apiService }
