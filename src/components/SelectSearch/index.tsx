import React, {
    useEffect, useState, useRef,
} from 'react'
import {Select} from 'antd'

export interface IProps {
    optionArr: Array<{
        customerName: string,
        animalName: string,
        customerPhone: string,
        id: number | string
    }>;
    currentValue?: string
}

const SelectSearch = (props: IProps) => {
    const {optionArr, currentValue = ''} = props
    const {Option} = Select
    const [initialData, updateData] = useState(optionArr)
    const [searchValue, setSearchValue] = useState(currentValue)

    const onChange = (value) => {

    }

    const onSearch = (value) => {
        setSearchValue(value)
    }

    return (
        <Select
            showSearch
            style={{width: 250}}
            onChange={onChange}
            onSearch={onSearch}
            defaultValue={0}
            filterOption={(input, option) => {
                const label = `${option?.children.props?.children[0]}${option.children.props?.children[1].props.children}${option.children.props?.children[2]}`
                if (label.indexOf(input) > -1) {
                    return true
                }
                return false
            }}
        >
            {
                initialData.map((option, index) => {
                    const {animalName, customerName, customerPhone} = option
                    // const c = `${animalName}-${customerName}-${customerPhone}`.split('').map((txt, index) => (
                    //     <span
                    //         key={`${txt}-${index}`}
                    //         style={{ color: searchValue.indexOf(txt) > -1 ? 'red' : 'initial'}}
                    //     >{txt}</span>
                    // ))
                    const heightLightTxt = (txt, heightTxt) => {
                        if (heightTxt === '') {
                            return txt
                        }
                        const i = txt.indexOf(searchValue)
                        const beforeStr = txt.substr(0, i)
                        const afterStr = txt.substr(i + searchValue?.length)
                        return i > -1 ? (
                            <span>
                                {beforeStr}
                                <span style={{color: 'red'}}>{searchValue}</span>
                                {afterStr}
                            </span>
                            ) : txt
                    }

                    return (
                        <Option
                            key={`${option.customerName}-${index}`}
                            value={option.id}
                        >
                            {heightLightTxt(`${animalName}-${customerName}-${customerPhone}`, searchValue)}
                        </Option>
                    )
                })
            }
        </Select>
    )
}
export default SelectSearch
