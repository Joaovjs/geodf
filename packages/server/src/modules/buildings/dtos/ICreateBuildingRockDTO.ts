export default interface ICreateBuildingRockDTO {
  building: string
  rock?: string
  name: string
  description: string
  images?: string[]
  references?: string[]
  created_by: string
}
