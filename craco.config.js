const devProxy = {
    devServer: {
        proxy: {
            "*": "http://localhost:8080"
        }
    }
}

module.exports = {
    ...devProxy
}