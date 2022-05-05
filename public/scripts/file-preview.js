document.querySelector("#image").addEventListener("change", preview);


document.querySelector("#image-preview");

function preview() {
    const file = this.files[0];
    const preview = document.querySelector("#image-preview");
    return file || file.length ? setImage(preview, file) : hide(preview);
}

function setImage(preview, file) {
    const reader = new FileReader();
    preview.src = URL.createObjectURL(file);
    display(preview);
}

function hide(element) { element.style.display = "none"; }
function display(element) { element.style.display = "block"; }