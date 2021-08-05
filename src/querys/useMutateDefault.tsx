import { useMutation, useQueryClient } from 'react-query'
import { apiService } from '../api/api-service'
import { FEATURERULES_KEY } from '../querys/useFeatureRules'

type Props = {
  flagId: string
}

const useMutateDefault = ({ flagId } : Props) => {
  const queryClient = useQueryClient()

  const updateDefaultRule = async (flagId: string, enabled: boolean) : Promise<void> => {
    await apiService.updateDefaultFeatureRule(flagId, enabled)
  }

  return useMutation((newStatus : boolean) => updateDefaultRule(flagId, newStatus), {
    onSuccess: () => {
      queryClient.invalidateQueries([FEATURERULES_KEY, flagId])
    },
  })
}

export { useMutateDefault }