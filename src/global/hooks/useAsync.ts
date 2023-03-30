import { useEffect } from 'react'

export const useAsync = <T>(
  asyncFn: () => Promise<any>,
  succesFunction: (data: T) => unknown,
  returnFunction: any = () => {},
  dependencies: any[] = [],
  errorFunction: any = (err: any) => {
    console.error('err fetching data', err)
  }
) => {
  useEffect(() => {
    let isActive = true
    asyncFn()
      .then((result) => {
        if (isActive && Object.prototype.hasOwnProperty.call(result, 'data')) {
          succesFunction(result.data as T)
        } else {
          errorFunction(result)
        }
      })
      .catch((err) => {
        errorFunction(err)
      })
    return () => {
      returnFunction && returnFunction()
      isActive = false
    }
  }, dependencies)
}
