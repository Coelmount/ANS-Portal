// Returns provided helper text or generated one: Remove ":" symbol from title
// then replace spaces with underscore symbol

import i18n from 'i18next'

const getHelperText = (title = '', providedHelperText) => {
  const generatedHelperText = title
    .replace(':', '')
    .split(' ')
    .join('_')
    .toLowerCase()

  return i18n.t(
    `helper_text_${
      providedHelperText ? providedHelperText : generatedHelperText
    }`
  )
}

export default getHelperText
