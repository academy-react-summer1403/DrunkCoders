export function roleMapper(roles) {
  return roles.map((role) => {
    if (role === 'Student') return 'دانشجو'
    else if (role === 'Admin') return 'ادمین'
    else if (role === 'Teacher') return 'استاد'
  })
}
