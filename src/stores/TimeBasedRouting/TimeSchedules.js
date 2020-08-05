import { decorate, observable, action } from 'mobx'

export class TimeSchedules {
  step = 1
  schedules = []
  isSchedulesLoading = false

  setStep = value => (this.step = value)

  getSchedules = () => {
    console.log('get schedules')
  }
}

decorate(TimeSchedules, {
  step: observable,
  schedules: observable,
  isSchedulesLoading: observable,
  setStep: action,
  getSchedules: action
})

export default new TimeSchedules()
