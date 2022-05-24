document.querySelector("#image-upload input").addEventListener("change", preview);

function preview () {
    const image = document.querySelector("#image-upload img");
    const file = this.files[0];
    image.src = file ? URL.createObjectURL(file) : String();
    image.style.display = file ? "block" : "none";
}