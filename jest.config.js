
module.exports = {
    // 单元测试环境根目录
    // rootDir: path.resolve(__dirname),
    // 指定需要进行单元测试的文件匹配规则
    testMatch: [
        '<rootDir>/__tests__/**/?(*.)(spec|test).ts?(x)',
        '<rootDir>/src/**/?(*.)(spec|test).ts?(x)',
    ],
    // 需要忽略的文件匹配规则
    testPathIgnorePatterns: [
        '/node/modules',
    ],
    testURL: 'http://localhost/',
    // 是否收集测试覆盖率，以及覆盖率文件路径
    collectCoverage: true,
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        '<rootDir>/src/components/**',
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
}
