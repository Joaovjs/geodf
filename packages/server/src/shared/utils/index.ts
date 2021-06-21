export function removeObjectFromArray<T>(array: T[], object: T): boolean {
  const index = array.indexOf(object)
  if (index >= 0) {
    array.splice(index, 1)
    return true
  }
  return false
}
