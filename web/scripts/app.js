const ToDoApp = {
    data() {
        return {
            todos: [],
            input: String(),
            current: null,
            url: "http://localhost:3000/todos/",
            loading: false
        }
    },
    async created() {
        this.loading = true;
        try {
            const response = await fetch(this.url);
            if (response.ok) {
                const { todos } = await response.json();
                this.todos = todos;
            } else { alert("The data couldn't be retrieved."); }
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        } finally { this.loading = false; }
    },
    methods: {
        async add($event) {
            $event.preventDefault();
            if (this.current) {
                try {
                    const response = await fetch(this.url + this.current._id, {
                        method: "PATCH",
                        body: JSON.stringify({ text: this.input }),
                        headers: { "Content-Type": "application/json" },
                    });
                    if (response.ok) {
                        this.current.text = this.input;
                        this.current = null;
                    } else { alert("The todo couldn't be updated."); }
                } catch (error) {
                    console.error(error);
                    alert("Something went wrong!");
                }
            } else {
                try {
                    const response = await fetch(this.url, {
                        method: "POST",
                        body: JSON.stringify({ text: this.input }),
                        headers: {"Content-Type": "application/json"},
                    });
                    if (response.ok) {
                        const { todo } = await response.json();
                        this.todos.push(todo);
                    } else { alert("The dodo couldn't be created."); }
                } catch (error) {
                    console.error(error);
                    alert('Something went wrong!');
                }
            }
            this.input = String();
        },
        edit(id) {
            this.current = this.todos.find(todo => todo._id === id);
            this.input = this.current.text;
        },
        async remove(id) {
            try {
                const response = await fetch(this.url + id, { method: "DELETE" });
                response.ok ? this.todos = this.todos.filter(todo => todo._id !== id) : alert("The todo couldn't be deleted.");
            } catch (error) {
                console.error(error);
                alert("Something went wrong!");
            }
        }
    }
};

Vue.createApp(ToDoApp).mount("#app");