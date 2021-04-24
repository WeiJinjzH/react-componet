import React, {
    useEffect, useState, useRef,
} from 'react'
import {Select} from 'antd'
import LightHeightOption from './HeightLightOption.jsx'

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
            // filterOption={(input, option) => {
                // const label = `${option?.children.props?.children[0]}${option.children.props?.children[1].props.children}${option.children.props?.children[2]}`
                // const label = option?.children?.props?.text
                // if (label.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                //     return true
                // }
                // return false
            // }}
            filterOption={(input, option) => (option.children && option.children.props && option.children.props.text && option.children.props.text.toLowerCase().indexOf(input.toLowerCase())) >= 0 }
        >
            {
                // initialData.map((option, index) => {
                    // const {animalName, customerName, customerPhone} = option

                    // const c = `${animalName}-${customerName}-${customerPhone}`.split('').map((txt, index) => (
                    //     <span
                    //         key={`${txt}-${index}`}
                    //         style={{ color: searchValue.indexOf(txt) > -1 ? 'red' : 'initial'}}
                    //     >{txt}</span>
                    // ))

                    // const heightLightTxt = (txt, heightTxt) => {
                    //     if (heightTxt === '') {
                    //         return txt
                    //     }
                    //     const i = txt.indexOf(searchValue)
                    //     const beforeStr = txt.substr(0, i)
                    //     const afterStr = txt.substr(i + searchValue?.length)
                    //     return i > -1 ? (
                    //         <span>
                    //             {beforeStr}
                    //             <span style={{color: 'red'}}>{searchValue}</span>
                    //             {afterStr}
                    //         </span>
                    //         ) : txt
                    // }

                    // let div = document.createElement('div');
                    // div.innerHTML = heightLightTxt(`${option.animalName}-${option.customerName}-${option.customerPhone}`, searchValue)

                    // return (
                    //     <Option
                    //         key={`${option.customerName}-${index}`}
                    //         value={option.id}
                    //     >
                    //         {heightLightTxt(`${animalName}-${customerName}-${customerPhone}`, searchValue)}
                    //     </Option>
                    // )
                // })

                initialData.map((option, index) => (
                    <Option key={`${option.customerName}-${index}`} value={option.id}>
                        <LightHeightOption text={`${option.animalName}-${option.customerName}-${option.customerPhone}`} filterTxt={searchValue}></LightHeightOption>
                    </Option>
                ))
            }
        </Select>
    )
}
export default SelectSearch
