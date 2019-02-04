import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

interface AxiosExtra extends AxiosInstance {
  setHeader: (name: string, value: any, scopes: string | string[] | undefined) => void
  setToken: (token: any, type: string, scopes: string | string[] | undefined) => void
  onRequest: (fn: (config: AxiosRequestConfig) => AxiosRequestConfig) => void
  onResponse: (fn: (response: AxiosResponse) => AxiosResponse) => void
  onRequestError: (fn: (error: any) => any) => void
  onResponseError: (fn: (error: any) => any) => void
  onError: (fn: (error: any) => any) => void
  $request<T = any>(config: AxiosRequestConfig): Promise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $delete(url: string, config?: AxiosRequestConfig): Promise<void>
  $head(url: string, config?: AxiosRequestConfig): Promise<void>
  $post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  $patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

// @ts-ignore
const axiosExtra: AxiosExtra = {
  setHeader(name, value, scopes = 'common') {
    for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
      if (!value) {
        delete this.defaults.headers[scope][name]
        return
      }
      this.defaults.headers[scope][name] = value
    }
  },
  setToken(token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  },
  onRequest(fn) {
    this.interceptors.request.use(fn)
  },
  onResponse(fn) {
    this.interceptors.response.use(fn)
  },
  onRequestError(fn) {
    this.interceptors.request.use(undefined, fn)
  },
  onResponseError(fn) {
    this.interceptors.response.use(undefined, fn)
  },
  onError(fn) {
    this.onRequestError(fn)
    this.onResponseError(fn)
  },
}

// Request helpers ($get, $post, ...)
for (const method of ['request', 'delete', 'get', 'head', 'post', 'put', 'patch']) {
  // @ts-ignore
  axiosExtra['$' + method] = function () {
    // @ts-ignore
    return this[method].apply(this, arguments).then((res: AxiosResponse) => res && res.data)
  }
}

const extendAxiosInstance = (axios: AxiosInstance) => {
  for (const key in axiosExtra) {
    // @ts-ignore
    axios[key] = axiosExtra[key].bind(axios)
  }
}

export const httpFactory = (options?: AxiosRequestConfig): AxiosExtra => {
  const axios = Axios.create(options)

  extendAxiosInstance(axios)

  return axios as AxiosExtra
}

export const http = httpFactory()
