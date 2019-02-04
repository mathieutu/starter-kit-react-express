import React, { FC, useEffect, useState } from 'react'
import { http } from '../utils/httpClient'

export const App = () => {
  const [data, setData] = useState<object>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setError(null)
    setIsLoading(true)
    try {
      setData(await http.$get('/data'))
    } catch (e) {
      setError(e)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const DataComponent: FC = () => {
    if (isLoading) {
      return <p style={{ color: 'yellow' }}>Loading...</p>
    }

    if (error) {
      return <p style={{ color: 'red' }}>{error.name}: {error.message}</p>
    }

    return <p style={{ color: 'green' }}>{JSON.stringify(data)}</p>
  }

  return (
    <div onClick={fetchData}>
      <h2>Click here to refresh the data from `/data` route api</h2>
      <h3>Your routes are in `srv/` folder.</h3>
      <DataComponent/>
    </div>
  )
}
