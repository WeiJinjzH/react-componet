let generationIndex = 0

export default class EDTRecord {
    constructor(record) {
        if (typeof record === 'object') {
            const entries = Object.entries(record)
            entries.forEach(([key, value]) => {
                this[key] = value
            })
        }
        generationIndex += 1
    }

    #form

    #key = `${new Date().getTime()}-${generationIndex}`

    setForm(form) {
        this.#form = form
    }

    getForm() {
        return this.#form
    }

    getKey() {
        return this.#key
    }

    setValues(values) {
        if (this.#form) {
            this.#form.setFieldsValue(values)
            const entries = Object.entries(values)
            entries.forEach(([key, value]) => {
                this[key] = value
            })
            return true
        }
        return false
    }
}
