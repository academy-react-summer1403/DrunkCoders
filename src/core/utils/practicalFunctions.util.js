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
  return store.getState()
}
