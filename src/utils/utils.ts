/* eslint-disable */
import moment from 'moment'
import { Modal } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import PreviewImageModal from '../../src/common/PreviewImageModal'
import PreviewPDFModal from '../../src/common/PreviewPDFModal'

const jwtDecode = require('jwt-decode')

const baseUrl = process.env.BASE_URL || ''
const isProduction = process.env.mode && process.env.mode.trim() === 'production'

const common = {
    showPreviewModal(params: { href: string; }) {
        const { href = '' } = params
        const reg = href.match(/\.((jpg)|(png)|(jpeg)|(gif)|(bmp)|(pdf))$/)
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
            params,
            onDestroy: () => {
                ReactDOM.unmountComponentAtNode(div)
            },
        }), div)
    },
    showPreviewPDFModal(params) {
        const div = document.createElement('div')
        ReactDOM.render(React.createElement(PreviewPDFModal, {
            params,
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
    getUrlParam(name, url) {
        const reg = new RegExp(`(^|&)${encodeURIComponent(name)}=([^&]*)(&|$)`)
        const r = (url || window.location.search).substr(1).match(reg)
        let value
        if (r !== null) {
            value = decodeURIComponent(r[2])
        }
        return value
    },
    getAllUrlParam(url) {
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
    showSingleModal: (() => {
        let hasFlag = false
        return (modalType, { onOk = () => {}, onCancel = () => {}, ...props }) => {
            if (hasFlag) {
                return
            }
            const type = ['success', 'error', 'info', 'confirm', 'warning'].find(item => item === modalType) || 'error'
            hasFlag = true
            Modal[type]({
                ...props,
                onOk() {
                    hasFlag = false
                    onOk && onOk()
                },
                onCancel: () => {
                    hasFlag = false
                    onCancel && onCancel()
                },
            })
        }
    })(),
    // 添加序号
    addRowIndex(res) {
        const { data } = res
        if (data.pageNum && Array.isArray(data.list)) {
            data.list.forEach((item, i) => {
                item.rowIndex = data.pageSize * (data.pageNum - 1) + i + 1
            })
        } else if (Array.isArray(data)) {
            data.forEach((item, i) => {
                item.rowIndex = i + 1
            })
        }
        return res
    },
    convertCurrency(money) {
        // 汉字的数字
        const cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
        // 基本单位
        const cnIntRadice = new Array('', '拾', '佰', '仟')
        // 对应整数部分扩展单位
        const cnIntUnits = new Array('', '万', '亿', '兆')
        // 对应小数部分单位
        const cnDecUnits = new Array('角', '分', '毫', '厘')
        // 整数金额时后面跟的字符
        const cnInteger = '整'
        // 整型完以后的单位
        const cnIntLast = '元'
        // 最大处理的数字
        const maxNum = 999999999999999.9999
        // 金额整数部分
        let integerNum
        // 金额小数部分
        let decimalNum
        // 输出的中文金额字符串
        let chineseStr = ''
        // 分离金额后用的数组，预定义
        let parts
        if (money === '') { return '' }
        money = parseFloat(money)
        if (money >= maxNum) {
            // 超出最大处理数字
            return ''
        }
        if (money === 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger
            return chineseStr
        }
        // 转换为字符串
        money = money.toString()
        if (money.indexOf('.') == -1) {
            integerNum = money
            decimalNum = ''
        } else {
            parts = money.split('.')
            integerNum = parts[0]
            decimalNum = parts[1].substr(0, 4)
        }
        // 获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            let zeroCount = 0
            const IntLen = integerNum.length
            for (var i = 0; i < IntLen; i++) {
                var n = integerNum.substr(i, 1)
                const p = IntLen - i - 1
                const q = p / 4
                const m = p % 4
                if (n === '0') {
                    zeroCount++
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0]
                    }
                    // 归零
                    zeroCount = 0
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
                }
                if (m === 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q]
                }
            }
            chineseStr += cnIntLast
        }
        // 小数部分
        if (decimalNum !== '') {
            const decLen = decimalNum.length
            for (var i = 0; i < decLen; i++) {
                var n = decimalNum.substr(i, 1)
                if (n !== '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i]
                }
            }
        }
        if (chineseStr === '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger
        } else if (decimalNum === '') {
            chineseStr += cnInteger
        }
        return chineseStr
    },
    formatMoney(number: number|string, places: number, symbol?: string, thousand?: string, decimal?: string) {
        number = number || 0
        places = !isNaN(places = Math.abs(places))
            ? places
            : 2
        symbol = symbol !== undefined
            ? symbol
            : '' // 前缀符号如 ￥ $
        thousand = thousand || ','
        decimal = decimal || '.'
        const negative = number < 0
            ? '-'
            : ''
        const i = `${parseInt(number = Math.abs(+number || 0).toFixed(places), 10)}`
        var j = (j = i.length) > 3
            ? j % 3
            : 0
        return symbol + negative + (j
            ? i.substr(0, j) + thousand
            : '') + i
            .substr(j)
            .replace(/(\d{3})(?=\d)/g, `$1${thousand}`) + (places
            ? decimal + Math.abs(Number(number) - Number(i)).toFixed(places).slice(2)
            : '')
    },
    getWindowSize() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        return {
            width,
            height,
        }
    },
    // 移除对象里的null值，防止form.
    removeNull(obj = {}) {
        const out = { ...obj }
        Object.keys(obj).forEach((key) => {
            if (out[key] === null) {
                delete out[key]
            }
        })
        return out
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
