// Returns provided helper text or generated one

import i18n from 'i18next'

const getHelperText = ({
  title = '',
  pathname = '',
  providedHelperText,
  providedUserLevel
}) => {
  const generatedHelperText = title
    .replace(':', '')
    .split(' ')
    .join('_')
    .toLowerCase()

  const getUserLevel = () => {
    const urlNodesArr = pathname.split('/')

    if (urlNodesArr.length === 2) return 'system'
    else if (urlNodesArr.length >= 6 && urlNodesArr[3] === 'subaccounts')
      return 'subaccount'
    return 'customer'
  }

  const userLevel = providedUserLevel ? providedUserLevel : getUserLevel()
  const helperText = providedHelperText
    ? providedHelperText
    : generatedHelperText

  return i18n.t(`helper_text_${userLevel}_${helperText}`)
}

export default getHelperText
