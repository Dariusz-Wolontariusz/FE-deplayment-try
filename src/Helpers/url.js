export const getQueryParameter = parameterName => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(parameterName)
}