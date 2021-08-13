import { useMutation, useQueryClient } from 'react-query'
import { apiService } from '../api/api-service'
import { FEATUREFLAGS_KEY } from './useFeatureFlags'

type Props = {
  onComplete: () => void
}


const useMutateCreateFeatureflag = ({ onComplete } : Props ) => {
  const queryClient = useQueryClient()

  const createFeatureflag = async (flagname: string, description: string) : Promise<void> => {
    await apiService.createNewFlag(flagname, description)
  }

  return useMutation(( { newFlag, description } : { newFlag: string, description: string } ) => createFeatureflag(newFlag, description), {
    onSuccess: () => {
      queryClient.invalidateQueries([FEATUREFLAGS_KEY])
    },
    onSettled: () => {
      onComplete()
    }
  })
}

export { useMutateCreateFeatureflag }
