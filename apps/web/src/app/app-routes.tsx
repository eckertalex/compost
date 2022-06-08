import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from '../screens/not-found'
import {SettingsScreen} from '../screens/settings'
import {TasksScreen} from '../screens/tasks'
import {ImportantTasksScreen} from '../screens/important'
import {CompletedTasksScreen} from '../screens/completed'
import {AllTasksScreen} from '../screens/all-tasks'
import {ListsUuidScreen} from '../screens/lists-uuid'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TasksScreen />} />
      {/* TODO: Use a redirects_ file rather */}
      <Route path="/tasks" element={<TasksScreen />} />
      <Route path="/tasks/important" element={<ImportantTasksScreen />} />
      <Route path="/tasks/completed" element={<CompletedTasksScreen />} />
      <Route path="/tasks/all" element={<AllTasksScreen />} />
      <Route path="/lists/:uuid" element={<ListsUuidScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}
