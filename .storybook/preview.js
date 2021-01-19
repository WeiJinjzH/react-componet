
import './index.less'

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { alphabetize: true },
    options: {
        storySort: (a, b) => {
            const indexA = a[2].fileName.match(/\.\/stories\/(\d+)-/)?.[1] || 9999
            const indexB = b[2].fileName.match(/\.\/stories\/(\d+)-/)?.[1] || 9999
            return Number(indexA) - Number(indexB)
        }
    },
};