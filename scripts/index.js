// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
const button1 = document.querySelector('button:first-of-type');
//    - Select the second button by using an "id"
const button2 = document.querySelector("#add-background-color");

// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
button1.addEventListener('click', () => { console.dir(button1); }, { once: true });
//    - Output the second button WITHOUT using the variable in which it's stored
button2.addEventListener('click', function() { console.dir(this); }, { once: true });

// 3) Now select and store the paragraphs mentioned in the text you see on the page (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the mentioned elements
const section = document.body.children[2]
const [p1, p3] = [section.children[1], section.children[3]];
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!

// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
button1.addEventListener('click', function() { this.previousElementSibling.remove(); }, { once: true });
//    - The second button changes the background color of the first paragraph to blue
// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the index.css file first
button2.addEventListener('click', function() {
    p1.style.backgroundColor = "#0509DD";
    p1.style.color = "#DDD905";
    p1.classList.add("blue-background");
    },{ once: true });