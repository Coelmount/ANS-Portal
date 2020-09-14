// Returns provided helper text or generated one: Remove ":" symbol from title
// then replace spaces with underscore symbol

const getHelperText = (title, providedHelperText) => {
  const generatedHelperText = title
    .replace(':', '')
    .split(' ')
    .join('_')
    .toLowerCase()

  return providedHelperText
    ? providedHelperText
    : `helper_text_${generatedHelperText}`
}

export default getHelperText
