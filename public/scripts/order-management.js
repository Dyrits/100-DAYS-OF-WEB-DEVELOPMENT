document.querySelectorAll(".order-item-actions form").forEach(function (form) {
  form.addEventListener("submit", async function($event) {
      $event.preventDefault();
      const data = new FormData(this);
      const id = data.get("id");
      const status = data.get("status");
      const _csrf = data.get("_csrf");
      try {
          const response = await fetch(`/administration/orders/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status, _csrf })
          });
          if (!response.ok) { alert("Something went wrong!"); }
          else { this.closest("article").querySelector(".badge").textContent = status.toUpperCase(); }
      } catch (error) {
          console.error(error);
          alert("Something went wrong!");
      }
  });
});