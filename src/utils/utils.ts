/* eslint-disable */
import moment from 'moment'
import { Modal } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import PreviewImageModal from 'src/components/PreviewImageModal'
import PreviewPDFModal from 'src/components/PreviewPDFModal'

const jwtDecode = require('jwt-decode')

const baseUrl = process.env.BASE_URL || ''
const isProduction = process.env.mode && process.env.mode.trim() === 'production'

const common = {
    showPreviewModal(params: { href: string; }) {
        const { href = '' } = params
        const reg = href.toLowerCase().match(/\.((jpg)|(png)|(jpeg)|(gif)|(bmp)|(pdf))$/)
        if (!reg || !reg[1]) {
            return false
        }
        if (reg[1] === 'pdf') {
            this.showPreviewPDFModal(params)
        } else {
            this.showPreviewImageModal(params)
        }
        return true
    },
    showPreviewImageModal(params) {
        const div = document.createElement('div')
        ReactDOM.render(React.createElement(PreviewImageModal, {
            ...params,
            onDestroy: () => {
                ReactDOM.unmountComponentAtNode(div)
            },
        }), div)
    },
    showPreviewPDFModal(params) {
        const div = document.createElement('div')
        ReactDOM.render(React.createElement(PreviewPDFModal, {
            ...params,
            onDestroy: () => {
                ReactDOM.unmountComponentAtNode(div)
            },
        }), div)
    },
    getBaseURL() {
        if (isProduction) {
            return baseUrl
        }
        const proxy = window.localStorage.getItem('proxy') || ''
        return proxy + baseUrl
    },
    getUrlParam(url, name) {
        const reg = new RegExp(`(^|&)${encodeURIComponent(name)}=([^&]*)(&|$)`)
        const r = (url || window.location.search).substr(1).match(reg)
        let value
        if (r !== null) {
            value = decodeURIComponent(r[2])
        }
        return value
    },
    getUrlParams(url) {
        url = url || location.search
        const str = url.split('?')[1] || ''
        const arr = str.split('&')
        const result = {}
        arr.forEach((item, index) => {
            const tmp = item.split('=')
            let key = decodeURIComponent(tmp[0])
            if (/(\[\])$/.test(key)) {
                key = key.slice(0, -2)
                result[key] = result[key] || []
                result[key].push(decodeURIComponent(tmp[1]))
            } else {
                const value = decodeURIComponent(tmp[1])
                result[key] = value
            }
        })
        return result
    },
    setUrlParams(url, params) {
        url += url.indexOf('?') > -1 ? '&' : '?'
        if (params !== undefined) {
            for (var k in params) {
                if (Array.isArray(params[k])) {
                    params[k].forEach((item, index) => {
                        url += `${encodeURIComponent(k)}=${encodeURIComponent(item)}&`
                    })
                } else if (params[k] !== undefined && params[k] !== '') {
                    url += `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}&`
                }
            }
        }
        url = url.slice(0, url.length - 1)
        return url
    },
    formatMoney(number, places, symbol, thousand, decimal) {
        number = number || 0
        places = !isNaN(places = Math.abs(places)) ? places : 2
        symbol = symbol !== undefined ? symbol : '' // 前缀符号如 ￥ $
        thousand = thousand || ','
        decimal = decimal || '.'
        var negative = number < 0 ? '-' : ''
        number = NP.round(Math.abs(+number || 0), places)
        var i = `${parseInt(number, 10)}`
        var j = (j = i.length) > 3 ? j % 3 : 0
        return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i
            .substr(j)
            .replace(/(\d{3})(?=\d)/g, `$1${thousand}`) + (places ? decimal + Math.abs(number - Number(i)).toFixed(places).slice(2) : '')
    },
    /* 节流函数 */
    throttle(action, delay: number) {
        let last = 0
        return function () {
            const curr = +new Date()
            if (curr - last > delay) {
                last = curr
                action.apply(this, arguments)
            }
        }
    },
    /* 防抖动函数 */
    debounce(func, wait, immediate?: boolean) {
        let timeout
        return function () {
            const context = this; const
                args = arguments
            const later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    },
}

export default common
