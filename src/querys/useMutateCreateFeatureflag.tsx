import { useMutation, useQueryClient } from 'react-query'
import { apiService } from '../api/api-service'
import { CreateFeatureflagPayload } from '../api/api-types'
import { FEATUREFLAGS_KEY } from './useFeatureFlags'

type Props = {
  onComplete: () => void
  setActiveFlag: (id: string) => void
}


const useMutateCreateFeatureflag = ({ onComplete, setActiveFlag } : Props ) => {
  const queryClient = useQueryClient()

  const createFeatureflag = async (flagname: string, description: string) : Promise<CreateFeatureflagPayload> => {
    return await apiService.createNewFlag(flagname, description)
  }

  return useMutation(( { newFlag, description } : { newFlag: string, description: string } ) => createFeatureflag(newFlag, description), {
    onSuccess: result => {
      queryClient.invalidateQueries([FEATUREFLAGS_KEY])
      setActiveFlag(`${result.id}`)
    },
    onSettled: () => {
      onComplete()
    }
  })
}

export { useMutateCreateFeatureflag }
