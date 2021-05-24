import React, { useState } from 'react'
import { Input, Button } from 'antd'

const InputFocus: React.FC = () => {
    const inputRef = React.useRef<any>(null)
    const [value, setValue] = useState('尊敬的客户您好！哈哈哈哈哈哈，害，太难了')
    const sharedProps = {
        style: { width: '100%' },
        ref: inputRef,
        value,
    }

    return (
        <div>
            <Input.TextArea {...sharedProps} onChange={(e) => setValue(e.target.value)} />
            <Button
                type="primary"
                onClick={() => {
                    const newValue = `${value}hhhhh`
                    setValue(newValue)
                inputRef.current!.focus({
                    preventScroll: true,
                })
                }}
            >插入客户名
            </Button>
        </div>
    )
}
export default InputFocus
