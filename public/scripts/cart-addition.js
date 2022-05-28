document.querySelector("#product-header-information button").addEventListener("click", async function () {
    const { id, csrf } = this.dataset;
    const response = await fetch("/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, _csrf: csrf })
    });
    if (!response.ok) { alert("Something went wrong!"); }
    else {
        const { quantity } = await response.json();
        document.querySelectorAll(".navigation-items .badge").forEach(function (badge) {
            badge.textContent = quantity;
        });
    }
});