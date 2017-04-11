export const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
export const host = process.env.NODE_ENV === 'production' ? process.env.HOST :
    `${process.env.HOST}:${process.env.PORT}`
