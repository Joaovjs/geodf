export default interface ICreateBuildingDTO {
  slug: string
  name: string
  description: string
  location?: string
  thumbnail?: string
  images?: string[]
  references?: string[]
  created_by: string
}
