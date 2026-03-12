import { useRef } from 'react'
import { useDashboardStore } from '../../stores/dashboardStore'

export function DataLoader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { loadFromFile, data, isLoading } = useDashboardStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) loadFromFile(file)
    e.target.value = ''
  }

  return (
    <div className="px-2">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isLoading}
        title="Загрузить CSV"
        className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </button>
      {data && (
        <p className="text-[10px] text-gray-400 text-center mt-1 leading-tight break-all">
          {data.fileName}
        </p>
      )}
    </div>
  )
}
