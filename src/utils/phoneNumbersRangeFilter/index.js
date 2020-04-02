const phoneNumbersRangeFilter = phoneNumbers => {
  phoneNumbers.sort((a, b) => a.phoneNumber - b.phoneNumber)

  let count = 1
  const phoneNumbersWithRange = phoneNumbers.reduce((arrPN, phone, index) => {
    if (
      arrPN.length &&
      arrPN[arrPN.length - 1].prevNum - phone.phoneNumber === -1 &&
      arrPN[arrPN.length - 1].type === phone.type &&
      arrPN[arrPN.length - 1].country === phone.country
    ) {
      if (count === 1) {
        arrPN[arrPN.length - 1] = {
          ...phone,
          rangeStart: phoneNumbers[index - 1].phoneNumber,
          rangeEnd: phone.phoneNumber,
          prevNum: phone.phoneNumber,
          phoneNumbers: []
        }

        arrPN[arrPN.length - 1].phoneNumbers.unshift({
          ...phoneNumbers[index - 1],
          inRange: true
        })

        arrPN[arrPN.length - 1].phoneNumbers.push({
          ...phone,
          inRange: true
        })
      } else {
        arrPN[arrPN.length - 1] = {
          ...arrPN[arrPN.length - 1],
          prevNum: phone.phoneNumber,
          rangeEnd: phone.phoneNumber
        }
        arrPN[arrPN.length - 1].phoneNumbers.push({
          ...phone,
          inRange: true
        })
      }
      count++
      arrPN = [...arrPN]
    } else {
      count = 1
      arrPN = [...arrPN, { ...phone, prevNum: phone.phoneNumber }]
    }
    return arrPN
  }, [])
  return phoneNumbersWithRange
}

export default phoneNumbersRangeFilter
