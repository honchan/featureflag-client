import { useMutation, useQueryClient } from 'react-query'
import { apiService } from '../api/api-service'
import { FEATURERULES_KEY } from '../querys/useFeatureRules'

type Props = {
  flagId: string
}

const useMutateOnetime = ({ flagId } : Props) => {
  const queryClient = useQueryClient()

  const updateOnetimeFeatureRule = async (flagId: string, enabled: boolean) : Promise<void> => {
    await apiService.updateOnetimeFeatureRule(flagId, enabled)
  }

  return useMutation((newStatus: boolean) => updateOnetimeFeatureRule(flagId, newStatus), {
    onSuccess: () => {
      queryClient.invalidateQueries([FEATURERULES_KEY, flagId])
    },
  })

}

export { useMutateOnetime }
