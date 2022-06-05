const ToDoApp = {
    data() {
        return {
            todos: [],
            input: String(),
        }
    },
    methods: {
        add($event) {
            $event.preventDefault();
            const todo = {
                text: this.input,
                id: new Date().toISOString()
            };
            this.todos.push(todo);
            this.input = String();
        }
    }
};

Vue.createApp(ToDoApp).mount("#app");