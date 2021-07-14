export default interface ICreateBuildingRockDTO {
  building_id: string
  rock_id?: string
  name: string
  description: string
  images?: string[]
  references?: string[]
  created_by: string
}
