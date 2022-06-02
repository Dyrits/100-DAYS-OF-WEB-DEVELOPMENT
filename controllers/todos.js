const ToDo = require("../models/ToDo");

module.exports = {
    get: {
        all: async function (request, response, next) {
            try {
                const todos = await ToDo.get.all();
                response.json({ todos });
            } catch (error) { next(error); }
        }
    },
    add: async function (request, response, next) {
        try {
            const todo = new ToDo(request.body.text);
            await todo.save();
            response.json({ todo });
        } catch (error) { next(error); }

    },
    update: async function (request, response, next) {
        try {
            const todo = new ToDo(request.body.text);
            await todo.save(request.params.id);
            response.json({ todo });
        } catch (error) { next(error); }

    },
    delete: async function (request, response, next) {
        try {
            await ToDo.delete(request.params.id);
            response.json({ success: true });
        } catch (error) { next(error); }
    }
}