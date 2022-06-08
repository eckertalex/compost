import {List, ListIcon, ListItem} from '@chakra-ui/react'
import {
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-react'
import {Task} from './use-tasks'

type TasksProps = {
  tasks: Task[]
}

export function Tasks(props: TasksProps) {
  const {tasks} = props

  return (
    <List spacing={3}>
      {tasks.map((task) => (
        <ListItem key={task.uuid}>
          <ListIcon
            as={task.status === 'COMPLETED' ? CheckCircleIcon : CircleIcon}
            color={task.status === 'COMPLETED' ? 'green.500' : 'gray.500'}
          />
          <>
            {task.lastModifiedDateTime}: {task.title}
          </>
        </ListItem>
      ))}
    </List>
  )
}
