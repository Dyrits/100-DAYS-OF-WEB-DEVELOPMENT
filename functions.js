// GREETINGS
const greetUser = (user = "Dylan J. Gerrits") => () => { console.log(`Hello ${user}!`); };

const greetUsers = (...users) => {
  users.forEach(user => {
    const greeting = greetUser(user);
    greeting();
  });
}

const greetDefaultUser = greetUser();
const greetJohn = greetUser("John");
greetDefaultUser();
greetJohn();
greetUsers("Matthew", "Jack", "Jill");

// SUM OF NUMBERS
const sum = (...numbers) => numbers.reduce((accumulator, current) => accumulator + current, 0) || 0;

console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
const numbers = [1, 2, 3, 4, 5];
console.log(sum(...numbers));
console.log(sum())
;
const sumUp = sum;
sumUp.add500 = (...numbers) => sumUp(500, ...numbers);
console.log(sumUp);
console.log(sumUp.add500(100, 200, 300));