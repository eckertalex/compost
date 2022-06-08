import {useParams} from 'react-router-dom'
import {Tasks} from '../features/tasks/tasks'
import {useListsTasks} from '../features/tasks/use-tasks'

export function ListsUuidScreen() {
  const {uuid} = useParams<'uuid'>()
  const {data} = useListsTasks(uuid)

  if (!data?.tasks) {
    return <>No Tasks</>
  }

  return <Tasks tasks={data?.tasks} />
}
