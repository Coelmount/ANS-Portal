const transformTime = (initStart, initStop) => {
  const initStartHours = new Date(initStart).getHours()
  const initStartMinutes = new Date(initStop).getMinutes()
  const startHours =
    String(initStartHours).length === 2
      ? String(initStartHours)
      : `0${initStartHours}`
  const startMinutes =
    String(initStartMinutes).length === 2
      ? String(initStartMinutes)
      : `${initStartMinutes}0`

  const initStopHours = new Date(initStop).getHours()
  const initStopMinutes = new Date(initStop).getMinutes()
  const endHours =
    String(initStopHours).length === 2
      ? String(initStopHours)
      : `0${initStopHours}`
  const endMinutes =
    String(initStopMinutes).length === 2
      ? String(initStopMinutes)
      : `${initStopMinutes}0`
  return {
    start: `${startHours}:${startMinutes}`,
    stop: `${endHours}:${endMinutes}`
  }
}

export default transformTime
