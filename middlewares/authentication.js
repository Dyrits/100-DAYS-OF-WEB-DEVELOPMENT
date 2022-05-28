module.exports = async ({ session }, response, next) => {
    const { authenticated, administrator, user } = session;
    response.locals.user = user;
    response.locals.authenticated = authenticated;
    response.locals.administrator = administrator;
    next();
}