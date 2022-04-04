const { log, dir } = console;

// Window
log(window);
log(window.alert === alert);

// DOM
log(document);
dir(document);

// { document: body : [main, ...] > [..., p, ...] > [a, ...] }
document.body.children[0].children[1].children[0].href = "https://www.google.com";
document.querySelector(".link").href = "https://www.google.com";

// ADD AN ELEMENT
// 1. Create the new anchor element:
const a = document.createElement("a");
a.href = "https://www.google.com";
a.textContent = "This is another link to Google.";
a.classList.add("link");
// 2. Get access to the parent element that should hold the new element, which is the span in the third paragraph:
let span = document.querySelector("p:nth-of-type(3)>span");
// 3.Insert the new element into the parent element content:
span.appendChild(a);


