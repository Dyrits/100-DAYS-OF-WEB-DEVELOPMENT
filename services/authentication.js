module.exports = {
    session: {
        create(session, user, action) {
            session.user = { id: user._id.toString() };
            session.authenticated = true;
            session.save(action);
        },
        destroy(session, action) {
            session.user = null;
            session.authenticated = false;
            session.save(action);
        }
    }
}