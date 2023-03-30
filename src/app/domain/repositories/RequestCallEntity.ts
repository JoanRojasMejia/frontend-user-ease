export type RequestCallEntity<T> = {
  call: Promise<T>
  controller?: AbortController
}
