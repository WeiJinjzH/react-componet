
module.exports = {
    rootDir: '../../.',
    // 指定需要进行单元测试的文件匹配规则
    testMatch: [
        '<rootDir>/__tests__/**/?(*.)(spec|test).ts?(x)',
        '<rootDir>/src/**/?(*.)(spec|test).ts?(x)',
    ],
    testURL: 'http://localhost/',
    // 是否收集测试覆盖率，以及覆盖率文件路径
    collectCoverage: true,
    coverageDirectory: './coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/src/utils',
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
    setupFiles: ['<rootDir>/config/test/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '^src/(.*)$': '<rootDir>/src/$1',
    },
}
