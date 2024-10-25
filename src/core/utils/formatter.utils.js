import moment from 'moment-jalaali'

export function pirceFormatter(price) {
  return Number(price).toLocaleString('en-US')
}
export function convertGrigorianDateToJalaali(grigorianDate) {
  moment.loadPersian()
  return moment(grigorianDate).format('jD jMMMM jYYYY')
}
export function convertGrigorianDateToJalaali2(grigorianDate) {
  moment.loadPersian()
  return moment(grigorianDate).format('jYYYY/jMM/jDD')
}
export function convertPersianDateToGerigorian(persianDate) {
  moment.loadPersian()
  return moment(persianDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
}
