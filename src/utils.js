// add notification to given promise-like function
export function withNtf(func, addNotification, nftArgs) {
  return (...args) => {
    return func(...args)
      .then(() => addNotification(...nftArgs))
  }
}
