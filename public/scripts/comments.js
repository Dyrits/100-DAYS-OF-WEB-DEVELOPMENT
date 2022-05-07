document.querySelector("#load-comments").addEventListener("click", load);
document.querySelector("#comments-form form").addEventListener("submit", save);

async function load() {
    const id = document.querySelector("#id").value;
    const response = await fetch(`/posts/${id}/comments`);
    if (response.ok) {
        const {comments} = await response.json();
        render(comments);
    } else { alert(response.statusText); }

}

function render(comments) {
    const section = document.querySelector("#comments");
    clear(section);
    if (comments.length) {
        const ul = create.element("ul");
        ul.append(...comments.map(create.comment));
        section.append(ul);
    } else {
        const paragraph = create.element("p");
        paragraph.textContent = "There is no comment available yet.";
        section.append(paragraph);
    }
}

function clear(element) { while(element.firstChild) { element.removeChild(element.firstChild); } }

const create = {
    comment: ({ title, content }) => {
        const [li, article, h2, paragraph] = create.elements("li", "article", "h2", "p");
        article.classList.add("comment-item");
        [h2.textContent, paragraph.textContent] = [title, content];
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
    try {
        await fetch(`/posts/${body.post}/comments`, options);
        await load();
        this.reset();
    } catch (error) {
        alert(`An error occurred. Check the console for more details.`);
        console.error(error);
    }
}