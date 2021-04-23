import React from 'react'
import { Select } from 'antd'
import {
    useEffect, useState, useRef,
} from 'react'

const SelectSearch = (props) => {
    const { optionArr, currentValue='' } = props
    const { Option } = Select
    const [searchValue, setSearchValue] = useState(currentValue)

    const onChange = (value) => {

    }

    const onSearch = (value) => {

    }

    const loop = data =>
      data.map(item => {
        const index = item.animalName.indexOf(searchValue);
        const beforeStr = item.animalName.substr(0, index);
        const afterStr = item.animalName.substr(index + searchValue?.length);
        const animalName =
            index > -1 ? (
                <span>
                {beforeStr}
                <span style={{ color: 'red' }}>{searchValue}</span>
                {afterStr}
                </span>
            ) : (
                <span>{item.animalName}</span>
            );

        return {
            animalName,
            key: item.id,
        }
    })

    return (
        <Select
            showSearch
            style={{ width: 200 }}
            onChange={onChange}
            onSearch={onSearch}
            defaultValue={0}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                optionArr.map((option, index) => (
                    <Option key={`${option.customerName}-${index}`} value={option.id}>
                        {`${option.animalName}-${option.customerName}-${option.customerPhone}`}
                    </Option>
                ))
            }
        </Select>
    )
}
export default SelectSearch
