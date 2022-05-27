import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from '../screens/not-found'
import {SettingsScreen} from '../screens/settings'
import {TodosScreen} from '../screens/todos'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TodosScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}
