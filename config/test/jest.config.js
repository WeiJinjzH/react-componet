
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
    coverageDirectory: './__tests__/coverage',
    coverageReporters: ['html', 'text'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/src/utils',
    ],
    snapshotSerializers: ['enzyme-to-json/serializer'],
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
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
        '^src/(.*)$': '<rootDir>/src/$1',
    },
}
