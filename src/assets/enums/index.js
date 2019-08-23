const enums = {
    /** 角色状态 */
    roleStatus: {
        0: '停用',
        1: '启用',
    },
    /** 用户状态 */
    userStatus: {
        0: '停用',
        1: '启用',
    },
    /** 还款方式 */
    repayType: {
        1: '等额等息',
        2: '先息后本',
        3: '等额本息',
        4: '等额本金',
    },
    /** 客户类型 */
    customerType: {
        2: '分公司',
        3: '个体户',
    },
}

/**
 * @param {string} name
 * @param {string | number} value
 */
enums.getOptionValue = (name, value) => {
    const obj = enums[name] || {}
    return obj[value] || value
}

/**
 * @param {string} name
 * @param {{ label: string, value: string|number, [arg: string]: string | number }} extraOption
 * @param {'before'|'after'|number} position
 */
enums.getOptions = (name, extraOption, position = 'before') => {
    const out = []
    if (extraOption) {
        if (position === 'before') {
            out.unshift(extraOption)
        } else if (position === 'after') {
            out.push(extraOption)
        } else {
            out.splice(position, 0, extraOption)
        }
    }
    const obj = enums[name]
    Object.keys(obj).forEach((k) => {
        out.push({
            label: obj[k],
            value: parseInt(k, 10),
        })
    })
    return out
}

export default enums
