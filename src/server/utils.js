export const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
export const host = process.env.NODE_ENV === 'production' ? process.env.host :
    `${process.env.host}:${process.env.port}`
