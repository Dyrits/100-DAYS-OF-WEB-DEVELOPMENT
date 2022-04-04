const { log, dir } = console;

// Window
log(window);
log(window.alert === alert);

// DOM
log(document);
dir(document);

// { document: body : [main, ...] > [..., p, ...] > [a, ...] }
document.body.children[0].children[1].children[0].href = "https://www.google.com";
document.querySelector("#link").href = "https://www.google.com";
