const ToDoApp = {
    data() {
        return {
            todos: [],
            todo: "Update me!",
            input: String(),
        }
    },
    methods: {
        add($event) {
            $event.preventDefault();
            this.todo = this.input;
            // this.todos.push(this.todo);
        }
    }
};

Vue.createApp(ToDoApp).mount("#app");