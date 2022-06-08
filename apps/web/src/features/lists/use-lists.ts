import {useQuery} from 'react-query'
import {client} from '../../utils/api-client'

type List = {
  uuid: string
  displayName: string
  lastModifiedDateTime: Date | string
  createdDateTime: Date | string
}

type GetLists = {
  lists: List[]
}

export function useLists() {
  return useQuery({
    queryKey: 'lists',
    queryFn: () => client<GetLists>('lists'),
  })
}
