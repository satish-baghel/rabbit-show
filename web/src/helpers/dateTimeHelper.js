export function getDateWithFormat(date) {
    let date1 = date.replace('T', ' ')
    date1 = date1.replace('Z', '')
    return date1
}
