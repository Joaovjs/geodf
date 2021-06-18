type IResponseObject<T> = {
  data: T
  status?: string
  count?: number
  http_status?: number
}

export default function responseObjectDefault<T>({
  data,
  status = 'success',
  count = 1,
  http_status = 200
}: IResponseObject<T>): IResponseObject<T> {
  return {
    data,
    status,
    count,
    http_status
  }
}
