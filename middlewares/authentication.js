module.exports = async function({ session }, response, next) {
    const { user } = session;
    const { authenticated } = session;
    response.locals.authenticated = authenticated;
    next();
}