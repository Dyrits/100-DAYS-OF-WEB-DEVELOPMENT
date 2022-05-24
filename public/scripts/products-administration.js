for (const button of document.querySelectorAll(".product-item-content-buttons button")) {
    button.addEventListener("click", async function () {
        const { id, csrf } = this.dataset;
        const response = await fetch(`/administration/products/${id}?_csrf=${csrf}`, { method: "DELETE" });
        response.ok ? this.closest("li").remove() : alert("Something went wrong!");
    });
}