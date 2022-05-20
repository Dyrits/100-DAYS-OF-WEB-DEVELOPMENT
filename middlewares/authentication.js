module.exports = async function({ session }, response, next) {
    const { authenticated, administrator } = session;
    response.locals.authenticated = authenticated;
    response.locals.administrator = administrator;
    next();
}