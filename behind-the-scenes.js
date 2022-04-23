// OBJECTS
const hobbies = ['Sports', 'Cooking'];
const hobbies$copy1 = hobbies;
const hobbies$copy2 = hobbies.slice();
const hobbies$copy3 = [...hobbies];

hobbies.push('Reading');

// The two first arrays have the same reference:
console.log(hobbies);
console.log(hobbies$copy1);
// The two last ones have a different reference:
console.log(hobbies$copy2);
console.log(hobbies$copy3);

const john = { name: 'John',  age: 30, };
const jack = { name: 'Jack',  age: 30, };

const getAdultYears = (person) =>  {
  person.age -= 18;
  return person.age;
}

console.log(getAdultYears(john));
console.log(john); // Age has been updated.

const getAdultYears$alternative1 = ({ ...person }) =>  person.age - 18;
const getAdultYears$alternative2 = ({ age }) =>  age - 18;

console.log(getAdultYears$alternative1(jack));
console.log(getAdultYears$alternative2(jack));
console.log(jack); // Age has not been updated.

// PRIMITIVES
let number = 10;
let number$copy1 = number;

number = 20;

// The two numbers are different:
console.log(number);
console.log(number$copy1);