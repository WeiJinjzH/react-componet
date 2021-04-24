const LightHeightOption = (props) => {
    const {
        filterTxt, text,
    } = props
    const heightLightTxt = (txt, heightTxt) => {
        if (heightTxt === '') {
            return txt
        }
        // 前面filterOption 不区分大小写，这里用i
        const regexp = new RegExp(heightTxt, 'gi')
        return txt.replace(regexp, `<span style="color:red">${heightTxt}</span>`)
    }
    return (
        <div ref={(nodeElement) => {
            if (nodeElement) {
                nodeElement.innerHTML = heightLightTxt(text, filterTxt)
            }
        }}
        />
    )
}
export default LightHeightOption