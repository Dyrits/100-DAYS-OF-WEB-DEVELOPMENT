module.exports = {
    exists: (...strings) => strings.every(string => string && string.trim().length),
}