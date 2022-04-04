/*
1) Create three new variables:
    - A variable that stores the name of an online course of your choice.
    - A variable that stores the price of that course.
    - A variable that stores the three main goals that you have, when taking this course.
2) Output ("alert") the three variable values.
3) Try "grouping" the three variables together and still output their values thereafter.
4) Also output the second element in your "main goals" variable.
5) Add a custom command that does the following:
    - Use your "main goals" variable and access an element by its identifier.
    - The concrete identifier value should be dynamic / flexible (i.e. the command can be executed for different identifier).;
    - The "main goals" variable should also be dynamic: The command should work with ANY list of values.
    - The custom command should provide the accessed value (i.e. the list element).
6) Execute your custom command from (5) and output ("alert") the result.
*/

const course = {
    name: "100 Days Of Code - 2022 Web Development Bootcamp",
    price: "269,99 TRY",
}

const goals = ["Study everyday.", "Refresh my knowledge.", "Acquire new knowledge."]

// alert(`I've bought the course "${course.name}" for ${course.price} in order to: ${goals.map(goal => `\n - ${goal}`)}`);

document.write(`
<main>
    <h1>Time To Practice</h1>
    <p>I've bought the course "${course.name}" for ${course.price} in order to:</p> 
    <ul>
        ${goals.map(goal => `<li>${goal}</li>`)}
    </ul>
</main>
`);