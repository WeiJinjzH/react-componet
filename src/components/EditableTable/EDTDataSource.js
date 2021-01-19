import EditableRecord from './EDTRecord'

export default class EDTDataSource extends Array {
    constructor(dataSource = [], reservedFields = []) {
        super()
        this.#reservedFields = reservedFields
        if (Array.isArray(dataSource)) {
            dataSource.forEach((record, index) => {
                this[index] = new EditableRecord(record)
            })
        }
    }

    #reservedFields

    #key = Symbol('editable-data-source-key')

    getKey() {
        return this.#key
    }

    #updater

    #tableElement

    bind(updater, tableElement) {
        this.#updater = updater
        this.#tableElement = tableElement
    }

    validateFields() {
        let hasFirstError = false
        const promises = this.map((record) => {
            const promise = new Promise((resolve, reject) => {
                const form = record.getForm()
                form.validateFields().then((values) => {
                    const reservedValues = {}
                    this.#reservedFields.forEach((fieldName) => {
                        reservedValues[fieldName] = record[fieldName]
                    })
                    resolve({ ...reservedValues, ...values })
                }).catch((err) => {
                    if (!hasFirstError) {
                        hasFirstError = true
                        const errorKeys = Object.keys(err)
                        const firstErrorKey = errorKeys[0]
                        const firstErrorElement = this.#tableElement.querySelector(`[id$=_${firstErrorKey}]`)
                        if (firstErrorElement) {
                            setTimeout(() => {
                                if (firstErrorElement.scrollIntoViewIfNeeded) {
                                    firstErrorElement.closest('td').scrollIntoViewIfNeeded(false)
                                } else {
                                    firstErrorElement.closest('td').scrollIntoView({ inline: 'start', behavior: 'smooth' })
                                }
                            }, 0)
                        }
                    }
                    reject(err)
                })
            })
            return promise
        })
        return Promise.all(promises)
    }

    resetFields() {
        this.forEach((record) => {
            const form = record.getForm()
            form.resetFields()
        })
    }

    delete(record) {
        const key = record.getKey()
        const index = this.findIndex((item) => item.getKey() === key)
        super.splice(index, 1)
        this.#updater && this.#updater()
    }

    push(...args) {
        super.push(...args)
        this.#updater && this.#updater()
    }

    splice(...args) {
        super.splice(...args)
        this.#updater && this.#updater()
    }
}
