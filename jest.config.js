module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: [
        './src/mocks/client.ts',
    ],
};
