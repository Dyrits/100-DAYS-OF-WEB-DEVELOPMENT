module.exports = async function({ session }, response, next) {
    const { authenticated } = session;
    response.locals.authenticated = authenticated;
    next();
}