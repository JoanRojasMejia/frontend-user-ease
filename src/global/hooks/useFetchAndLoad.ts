import { useEffect, useRef, useState } from 'react'
import { RequestCallEntity } from '../../app/domain/repositories/RequestCallEntity'

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false)
  const controller = useRef<AbortController>()

  const callEndpoint = async <T>(endpointCall: RequestCallEntity<T>): Promise<T> => {
    if (endpointCall.controller) controller.current = endpointCall.controller
    setLoading(true)
    let result = {} as T
    try {
      result = await endpointCall.call
    } catch (err: any) {
      setLoading(false)
      throw err
    }
    setLoading(false)
    return result
  }

  const cancelEndpoint = () => {
    setLoading(false)
    controller.current && controller.current.abort()
  }

  useEffect(() => {
    return () => {
      cancelEndpoint()
    }
  }, [])

  return { loading, callEndpoint }
}

export default useFetchAndLoad
