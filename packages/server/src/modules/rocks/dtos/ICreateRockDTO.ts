export default interface ICreateRockTypeDTO {
  name: string
  description: string
  type: string
  locations?: string
  thumbnail?: string
  images?: string[]
  references?: string[]
  created_by: string
}
