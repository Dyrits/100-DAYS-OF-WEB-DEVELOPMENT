document.querySelectorAll(".cart-item-management").forEach(function (form) {
    form.addEventListener("submit", async function ($event) {
        $event.preventDefault();
        const { id, csrf } = this.dataset;
        const quantity = Number(this.firstElementChild.value);
        const response = await fetch("/cart/items", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, _csrf: csrf, quantity  })
        });
        if (!response.ok) { alert("Something went wrong!"); }
        else {
            const { cart, total } = await response.json();
            document.querySelector(".navigation-items .badge").innerText = cart.quantity;
            document.querySelector("#cart-total-value").innerText = cart.total.toFixed(2);
            if (quantity) { this.previousElementSibling.querySelector(".cart-item-information-total").innerText = total; }
            else { this.closest("li").remove(); }
        }
    });
});