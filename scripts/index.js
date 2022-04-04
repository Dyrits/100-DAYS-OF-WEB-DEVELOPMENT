document.querySelector("p").addEventListener("click", function() {
  this.innerText = `The paragraph has been clicked ${++ this.dataset.clicks} time(s)!`;
});

document.querySelector("input").addEventListener("input", function($event) {
  this.value = this.value.toUpperCase();
});