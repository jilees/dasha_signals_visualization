import { useEffect } from 'react'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './components/dashboard/Dashboard'
import { useDashboardStore } from './stores/dashboardStore'

export default function App() {
  const { loadDefault } = useDashboardStore()

  useEffect(() => {
    loadDefault()
  }, [loadDefault])

  return (
    <AppShell>
      <Dashboard />
    </AppShell>
  )
}
