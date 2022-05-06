document.querySelector("#load-comments").addEventListener("click", load);
document.querySelector("#comments-form form").addEventListener("submit", save);

async function load() {
    const {id} = this.dataset;
    const response = await fetch(`/posts/${id}/comments`);
    const {comments} = await response.json();
    render(comments);
}

function render(comments) {
    const section = document.querySelector("#comments");
    clear(section);
    const ul = create.element("ul");
    ul.append(...comments.map(create.comment));
    section.append(ul);
}

function clear(element) { while(element.firstChild) { element.removeChild(element.firstChild); } }

const create = {
    comment: ({ title, content }) => {
        const [li, article, h2, paragraph] = create.elements("li", "article", "h2", "p");
        article.classList.add("comment-item");
        [h2.innerHTML, paragraph.innerHTML] = [title, content];
        li.append(article);
        article.append(h2, paragraph);
        return li;
    },
    element: type => document.createElement(type),
    elements: (...types) =>  types.map(type => document.createElement(type))
}

async function save($event) {
    $event.preventDefault();
    const body = {};
    for (const [key, value] of new FormData(this).entries()) { body[key] = value; }
    const options = { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } };
    await fetch(`/posts/${body.post}/comments`, options);
    this.reset();
}