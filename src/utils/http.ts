import 'whatwg-fetch'
import utils from './utils'

class Http {
    defaultOptions = {
        credentials: 'include',
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }

    get(_url: string, urlParams?: {[key: string]: any}) {
        const url = utils.setUrlParams(_url, urlParams)
        return this.request(url)
    }

    post(_url: string, data?: {[key: string]: any}, urlParams?: {[key: string]: any}) {
        const url = utils.setUrlParams(_url, urlParams)
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        }
        return this.request(url, options)
    }

    delete(_url: string, urlParams?: {[key: string]: any}) {
        const url = utils.setUrlParams(_url, urlParams)
        const options = {
            method: 'DELETE',
        }
        return this.request(url, options)
    }

    put(_url, data?: {[key: string]: any}, params?: {[key: string]: any}) {
        const url = utils.setUrlParams(_url, params)
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
        }
        return this.request(url, options)
    }

    async request(_url: string, options = {}) {
        let url = _url
        if (_url.slice(0, 1) === '/') {
            url = utils.getBaseURL() + _url
        }
        let fetchOptions = {}
        // const regResult = document.cookie.match(/TOKEN_MANAGE=(.+?)(;|$)/)
        fetchOptions = Object.assign(fetchOptions, this.defaultOptions, options)
        // fetchOptions.headers.TOKEN = regResult && regResult[1]
        try {
            const res = await fetch(url, fetchOptions)
            if (res.status >= 200 && res.status < 300) {
                const contentType = res.headers.get('content-type') || ''
                if (contentType.indexOf('text/html') > -1) {
                    return res.text().then((text) => {
                        if (text.indexOf('请重新登录') > -1) {
                            utils.showSingleModal('error', {
                                title: '登录已失效，请重新登录',
                            })
                        }
                    })
                }
                return res.json().then((data) => data)
            }
            utils.showSingleModal('error', {
                title: `${res.status}`,
                content: res.statusText || '网络错误，请检查网络或接口',
                okText: '确定',
            })
            return Promise.reject(res)
        } catch (err) {
            utils.showSingleModal('error', {
                title: '网络错误，请检查网络或接口',
            })
            return Promise.reject(err)
        }
    }
}

const http = new Http()

export { http }

export default http
