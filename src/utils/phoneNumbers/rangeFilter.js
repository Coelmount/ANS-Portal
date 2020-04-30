const phoneNumbersRangeFilter = phoneNumbers => {
  phoneNumbers.sort((a, b) => a.nsn - b.nsn)

  let count = 1
  const phoneNumbersWithRange = phoneNumbers.reduce((arrPN, phone, index) => {
    if (
      arrPN.length &&
      arrPN[arrPN.length - 1].prevNum - phone.nsn === -1 &&
      arrPN[arrPN.length - 1].type === phone.type &&
      arrPN[arrPN.length - 1].country_code === phone.country_code &&
      arrPN[arrPN.length - 1].state === phone.state
    ) {
      if (count === 1) {
        arrPN[arrPN.length - 1] = {
          ...phone,
          rangeStart: phoneNumbers[index - 1].nsn,
          rangeEnd: phone.nsn,
          prevNum: phone.nsn,
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
          prevNum: phone.nsn,
          rangeEnd: phone.nsn
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
      arrPN = [...arrPN, { ...phone, prevNum: phone.nsn }]
    }
    return arrPN
  }, [])
  return phoneNumbersWithRange
}

export default phoneNumbersRangeFilter
