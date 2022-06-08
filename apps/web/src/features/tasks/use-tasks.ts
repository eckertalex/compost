import {useQuery} from 'react-query'
import {generatePath} from 'react-router-dom'
import {client} from '../../utils/api-client'

type Status =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'WAITING_ON_OTHERS'
  | 'DEFERRED'

type Importance = 'LOW' | 'NORMAL' | 'HIGH'

export type Task = {
  uuid: string
  title: string
  status: Status
  completedDateTime?: Date | string
  importance: Importance
  lastModifiedDateTime: Date | string
  dueDateTime?: Date | string
  createdDateTime: Date | string
  content?: string
  listUuid?: string
}

type GetTasks = {
  tasks: Task[]
}

export function useTasks() {
  return useQuery({
    queryKey: 'tasks',
    queryFn: () => client<GetTasks>('tasks'),
  })
}

export function useListsTasks(uuid?: string) {
  return useQuery({
    queryKey: ['listsTasks', uuid],
    queryFn: () =>
      client<GetTasks>(
        generatePath('lists/:uuid/tasks', {
          uuid,
        })
      ),
  })
}
