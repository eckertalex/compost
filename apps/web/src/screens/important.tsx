import {Tasks} from '../features/tasks/tasks'
import {useTasks} from '../features/tasks/use-tasks'

export function ImportantTasksScreen() {
  const {data} = useTasks()

  if (!data?.tasks) {
    return <>No Tasks</>
  }

  return <Tasks tasks={data?.tasks} />
}
