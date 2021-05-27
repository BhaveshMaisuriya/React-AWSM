export const mergeFilterValues = (filterData, key) => {
  const filterObject = {}
  filterObject[key] = []
  for (const value of filterData) {
    if (value[key]) filterObject[key].push(value[key])
  }
  return filterObject
}
