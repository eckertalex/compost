import {
  QueryClientProvider as ReactQueryClientProvider,
  QueryClient,
} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {useCreation} from 'ahooks'

export function QueryClientProvider({children}: {children: React.ReactNode}) {
  const queryClient = useCreation<QueryClient>(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry(failureCount: number, error: any) {
            if (error.status === 404) return false
            else if (failureCount < 2) return true
            else return false
          },
        },
        mutations: {
          onError: (_err, _variables, recover) =>
            typeof recover === 'function' ? recover() : null,
        },
      },
    })
    ;(window as any).__devtools?.setQueryClient?.(queryClient)

    return queryClient
  }, [])

  return (
    <ReactQueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </ReactQueryClientProvider>
  )
}
