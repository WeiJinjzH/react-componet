export default {
    // 手机号码
    isMobile(value) {
        return (value.length === 11 && /^((13|18|15)\d{9})|(145|147|170|171|173|175|176|177|178)\d{8}$/.test(value))
    },
    validPassword: (value) => value.length >= 8 && value.length <= 16 && /^[\w_-]{8,16}$/.test(value),
    validStrictPassword: (value) => value.length >= 8 && value.length <= 16 && /(?![^a-zA-Z]+$)(?!\\D+$)^(?!.*\\s).{8,16}/.test(value),
    validateIDCard: (value) => value.length <= 18 && /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/.test(value),
    validateHongKongMacauPass: (value) => value.length <= 11 && /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(value),
}
