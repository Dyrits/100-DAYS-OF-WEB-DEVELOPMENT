module.exports = {
    set(session, key, data, action) {
        session.key = data;
        session.save(action);
    },
    get(session, key) {
        const data = session.key;
        session.key = null;
        return data;
    }
}