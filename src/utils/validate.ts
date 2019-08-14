import Reg from './regular'

const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
const ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]

const isTrueValidateCodeBy18IdCard = (cardNumString) => {
    let cardNumbers = cardNumString.split('')
    let sum = 0 // 声明加权求和变量
    if (cardNumbers[17].toLowerCase() === 'x') {
        cardNumbers[17] = 10 // 将最后位为x的验证码替换为10方便后续操作
    }
    cardNumbers = cardNumbers.map(num => Number(num))
    for (let i = 0; i < 17; i += 1) {
        sum += Wi[i] * cardNumbers[i] // 加权求和
    }
    const valCodePosition = sum % 11 // 得到验证码所位置
    if (cardNumbers[17] === ValideCode[valCodePosition]) {
        return true
    }
    return false
}

const validate = {
    isMobile(rule, value, callback) {
        if (!value) {
            callback()
        } else if (!Reg.isMobile(value)) {
            callback([new Error('请输入正确的手机号码')])
        } else {
            callback()
        }
    },
    validPassword(rule, value, callback) {
        if (!value) {
            callback()
        } else if (!Reg.validPassword(value)) {
            callback([new Error('密码长度为8-16个字符，不能使用空格、中文，不能含有非法字符')])
        } else {
            callback()
        }
    },
    validStrictPassword(rule, value, callback) {
        if (!value) {
            callback()
        } else if (!Reg.validStrictPassword(value)) {
            callback([new Error('密码为8-16位字符,包含字母和数字,区分大小写')])
        } else {
            callback()
        }
    },
    validateIDCard(rule, value, callback) {
        if (!value) {
            callback()
        } else if (!Reg.validateIDCard(value)) {
            callback([new Error('请输入正确的身份证号码')])
        } else if (value.length === 18 && isTrueValidateCodeBy18IdCard(value)) {
            callback()
        } else {
            callback([new Error('请输入有效的身份证号码')])
        }
    },
    validateHongKongMacauPass(rule, value, callback) {
        if (!value) {
            callback()
        } else if (!Reg.validateHongKongMacauPass(value)) {
            callback([new Error('请输入正确的通行证号码')])
        } else {
            callback()
        }
    },
}
const {
    isMobile,
    validPassword,
    validStrictPassword,
    validateIDCard,
    validateHongKongMacauPass,
} = validate

export {
    isMobile,
    validPassword,
    validStrictPassword,
    validateIDCard,
    validateHongKongMacauPass,
}

export default validate
