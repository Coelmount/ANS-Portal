// Returns provided helper text or generated one: Remove ":" symbol from title
// then replace spaces with underscore symbol

const getHelperText = (title, providedHelperText) => {
  const generatedHelperText = title
    .replace(':', '')
    .split(' ')
    .join('_')
    .toLowerCase()

  return `helper_text_${
    providedHelperText ? providedHelperText : generatedHelperText
  }`
}

export default getHelperText
