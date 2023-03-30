export const asyncFunction = <T, U = unknown>(
  asyncFn: () => Promise<any>,
  succesFunction: (data: T, { ...args }: U) => unknown,
  errorFunction: (...args: any[]) => void = (err) => {
    console.error('err fetching data', err)
  },
  props?: U
) => {
  asyncFn()
    .then((result: any) => {
      Object.prototype.hasOwnProperty.call(result, 'data') &&
        succesFunction(result.data as T, { ...props } as U)
    })
    .catch((err) => {
      errorFunction && errorFunction(err)
    })
}
