import { decorate } from 'mobx'

export class Settings {
  updateSettings = () => {
    console.log('update')
  }
}

decorate(Settings, {
  updateSettings: action
})

export default new Settings()
