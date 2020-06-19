// Extend time format. E.g 1:00 => 01:00,
const extendTimeFormat = value => {
  if (value.length === 4) {
    return `0${value}`
  } else {
    return value
  }
}

export default extendTimeFormat
