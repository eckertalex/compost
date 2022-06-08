import {Tasks} from '../features/tasks/tasks'
import {useTasks} from '../features/tasks/use-tasks'

export function CompletedTasksScreen() {
  const {data} = useTasks()

  if (!data?.tasks) {
    return <>No Tasks</>
  }

  return <Tasks tasks={data?.tasks} />
}
