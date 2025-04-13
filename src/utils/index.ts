export const transformDataArray = (dataArray: any[]) => {
  return dataArray.map((data) => ({
    self: data.is_user,
    content: data.message,
  }))
}