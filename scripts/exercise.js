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
