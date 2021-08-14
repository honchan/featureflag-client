import { useMutation, useQueryClient } from 'react-query'
import { apiService } from '../api/api-service'
import { FEATURERULES_KEY } from '../querys/useFeatureRules'
import { FeatureRuleWhitelistPayload } from '../api/api-types'

type Props = {
  flagId: string
}

const useMutateWhitelist = ({ flagId } : Props) => {
  const queryClient = useQueryClient()

  const updateWhitelistRule = async (flagId: string, payload: FeatureRuleWhitelistPayload) : Promise<void> => {
    await apiService.updateWhitelistFeatureRule(flagId, payload)
  }

  return useMutation((payload: FeatureRuleWhitelistPayload) => updateWhitelistRule(flagId, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries([FEATURERULES_KEY, flagId])
    },  
    onError: (error) => {
      alert(error.response.data.message)
    }
  })
}

export { useMutateWhitelist }
