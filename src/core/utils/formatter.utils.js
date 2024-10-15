import moment from 'moment-jalaali'

export function pirceFormatter(price) {
  return Number(price).toLocaleString('en-US')
}
export function convertGrigorianDateToJalaali(grigorianDate) {
  moment.loadPersian()
  return moment(grigorianDate).format('jD jMMMM jYYYY')
}
