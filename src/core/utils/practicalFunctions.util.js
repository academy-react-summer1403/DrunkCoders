import { store } from '@store'

export function roleMapper(roles) {
  return roles.map((role) => {
    if (role === 'Student') return 'دانشجو'
    else if (role === 'Admin' || role === 'Employee.Admin') return 'ادمین'
    else if (role === 'Teacher') return 'استاد'
  })
}
export function getLatestState() {
  return store.getState()
}
