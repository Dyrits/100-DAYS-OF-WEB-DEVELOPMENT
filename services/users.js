module.exports = {
    session: {
        data: function({ session }, key) {
            let data = session[key];
            session[key] = null;
            return data || { email: null, confirmation: null, password: null, message: null, error: false };
        }
    }
}