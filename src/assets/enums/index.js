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

enums.getRender = name => (v) => {
    const obj = enums[name] || {}
    return obj[v] || v
}

enums.getOptions = (name, withAll) => {
    const out = []
    if (withAll) {
        out.push({
            label: '全部',
            value: '',
        })
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
