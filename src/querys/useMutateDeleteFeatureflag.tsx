import { useMutation, useQueryClient } from 'react-query'

import { FEATUREFLAGS_KEY } from './useFeatureFlags'
import { apiService } from '../api/api-service' 

const useMutateDeleteFeatureflag = () => {
  const queryClient = useQueryClient()

  const deleteFeatureflag = async (id: number) : Promise<void> => {
    await apiService.deleteFeatureflag(id)
  }

  return useMutation((id : number) => deleteFeatureflag(id), { 
    onSuccess: () => {
      queryClient.invalidateQueries(FEATUREFLAGS_KEY)
    }
  })
}

export { useMutateDeleteFeatureflag }

