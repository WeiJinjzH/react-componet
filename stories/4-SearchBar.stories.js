import { Button } from 'antd'
import Mock from 'mockjs'
import React from 'react'
import SearchBar from '../src/components/SearchBar'

export default {
    title: 'SearchBar',
    component: SearchBar,
    parameters: {
        componentSubtitle: '搜索栏',
    },
}

export const Basic = () => (
    <SearchBar
        onSearch={(values) => { window.console.log(values) }}
        fields={[
            {
                label: '查询条件',
                name: 'condition1',
                type: 'Input',
            },
            {
                label: '查询条件',
                name: 'condition2',
                type: 'Select',
                props: {
                    style: { minWidth: 100 },
                    allowClear: true,
                    options: [
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 },
                    ],
                },
            },
        ]}
    />
)

export const AdvancedSearch = () => (
    <SearchBar
        onSearch={(values) => { window.console.log(values) }}
        mainFields={[{
            name: 'condition0',
            type: 'InputSearch',
        }]}
        fields={[
            {
                label: '查询条件1',
                name: 'condition1',
                type: 'Input',
            },
            {
                label: '查询条件2',
                name: 'condition2',
                type: 'Select',
                props: {
                    style: { minWidth: 100 },
                    allowClear: true,
                    options: [
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 },
                    ],
                },
            },
        ]}
    />
)

export const ExtraPropAndChildrenProp = () => (
    <SearchBar
        onSearch={(values) => { window.console.log(values) }}
        mainFields={[{
            name: 'condition0',
            type: 'InputSearch',
        }]}
        extra={(
            <>
                <Button type="link">Extra</Button>
                <Button type="dashed">Extra</Button>
                <Button type="primary">Extra</Button>
            </>
        )}
        fields={[
            {
                label: '查询条件1',
                name: 'condition1',
                type: 'Input',
            },
        ]}
    >
        {Mock.Random.cparagraph(10, 20)}
    </SearchBar>
)
