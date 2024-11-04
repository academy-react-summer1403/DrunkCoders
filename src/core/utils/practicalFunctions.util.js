import { store } from '@store'

export function roleMapper(roles) {
  return roles.map((role) => {
    if (role === 'Student') return 'دانشجو'
    else if (role === 'Administrator' || role === 'Employee.Admin')
      return 'ادمین'
    else if (role === 'Teacher') return 'استاد'
    else if (role === 'Referee') return 'داور'
  })
}
export function getLatestState() {
  let latestState = store.getState()

  store.subscribe(() => {
    latestState = store.getState()
  })
  return latestState
}

export function filterDataByDateRange(dateRange, data, dateName) {
  const startDate = new Date(dateRange.startDate)
  const endDate = new Date(dateRange.endDate)

  return data.filter((item) => {
    const itemDate = new Date(item[dateName])

    if (itemDate <= endDate && itemDate >= startDate) return true
    else return false
  })
}

export function isValidUrl(string) {
  try {
    const url = new URL(string) // This will throw an error if it's not a valid URL
    return url.protocol === 'http:' || url.protocol === 'https:' // Checks for HTTP/HTTPS
  } catch (_) {
    return false
  }
}
