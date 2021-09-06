export const isDev = process.env.NODE_ENV === 'development'
// export const isDev = true
// export const isDev = false

const devApi = 'https://app-crm-platform-dev.weddingee.com'
const prodApi = 'https://feixiong.halobear.com'

export const apiUrl = isDev ? devApi : prodApi

export const apiKey = ''
export const haloApp = 'app-murong'
