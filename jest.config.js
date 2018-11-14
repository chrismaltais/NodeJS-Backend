module.exports = {
    // Glueing environment, scripting files, and tests together!
    displayName: "server",
    globals: {
        dbName: "BackendTestingDB"
    },
    setupTestFrameworkScriptFile: "./server/__tests__/config/test-framework", // used to setup or configure framework before each test -> immediately after jest is installed in environment
    testEnvironment: "./server/__tests__/config/mongo-environment", // Used to setup testing environment (uses in-memory mongodb aka built in RAM upon running npm test)
    testRegex: "./server/__tests__\/.*\.test\.js$" // Used to find test files, otherwise tries to run everything in __tests__ folder
}