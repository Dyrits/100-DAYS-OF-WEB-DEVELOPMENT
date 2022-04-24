// OBJECTS

// Function to create a new object:
function Job(title, location, salary) {
    this._title = title;
    this._location = location;
    this._salary = salary;
    this.getDetails = () => { return { title: this._title, location: this._location, salary: this._salary } };
}

const developer = new Job('Developer', 'London', '£50,000');
const designer = new Job('Designer', 'New York', '£60,000');

// Class to create a new object:
class Person {
    constructor(name, age, job) {
        this._name = name;
        this._age = age;
        this._job = job;
    }
    // Getters and setters:
    get name() { return this._name; }
    get age() { return this._age; }
    set age(age) { this._age = age; }
    get job() { return this._job._title; }
    get salary() { return this._job._salary; }
    // Methods:
    resign() { this._job = new Job('Unemployed', 'nowhere', '£0'); }
    describe() { console.log(`${this.name} is ${this.age} years old. Job: ${this.job} for ${this.salary} a year.`); }
}

const john = new Person('John', 30, developer);
const jane = new Person('Jane', 25, designer);
jane.age = 35;
jane.describe();
john.describe();
john.resign();
john.describe();

// Destructuring:
const { name, age, job } = jane;
console.log(`${name} is ${age} years old. Job: ${job}.`);
const { title, location, salary } = developer.getDetails();
console.log(`${title} is a job in ${location} for ${salary} a year.`);