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
        console.log(value)
        setSearchValue(value)
    }

    const loop = (data) => data.map((item) => {
        const index = item.animalName.indexOf(searchValue)
        const beforeStr = item.animalName.substr(0, index)
        const afterStr = item.animalName.substr(index + searchValue?.length)
        const animalName = index > -1 ? (
            <span>
                {beforeStr}
                <span style={{color: 'red'}}>{searchValue}</span>
                {afterStr}
            </span>
        ) : (
            <span>{item.animalName}</span>
        )

        return {
            animalName,
            key: item.id,
        }
    })

    return (
        <Select
            showSearch
            style={{width: 200}}
            onChange={onChange}
            onSearch={onSearch}
            defaultValue={0}
            filterOption={(input, option) => {
                const label = option?.children.map((span) => span.props.children).join('')
                console.log(label)
                if (label.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                    return true
                }
                return false
            }}
        >
            {
                initialData.map((option, index) => {
                    const {animalName, customerName, customerPhone} = option
                    const regexp = new RegExp(searchValue, 'gi')
                    // let c = <span>{animalName}-{customerName}-{customerPhone}</span>
                    // const i = c.props.children.join('').indexOf(searchValue)
                    // const beforeStr = c.props.children.join('').substr(0, i)
                    // const afterStr = c.props.children.join('').substr(i + searchValue?.length)
                    // if (regexp) {
                    //     c = (
                    //     <span>
                    //         {beforeStr}
                    //         <span style={{ color: 'red' }}>{searchValue}</span>
                    //         {afterStr}
                    //     </span>
                    //     )
                    // }
                    const c = `${animalName}-${customerName}-${customerPhone}`.split('').map((txt, index) => (
                        <span
                            key={`${txt}-${index}`}
                            style={{ color: searchValue.indexOf(txt) > -1 ? 'red' : 'initial'}}
                        >{txt}</span>
                    ))

                    return (
                        <Option key={`${option.customerName}-${index}`} value={option.id} children={c}/>
                    )
                })
            }
        </Select>
    )
}
export default SelectSearch
