var body = document.body;
var fontSelect = document.getElementById("font-size");

fontSelect.addEventListener('change', function() { changeFontSize(this.value)});

function changeFontSize(size) {
    console.log(size);
    if(size == "small") {
        body.style.fontSize = "0.8rem";
    } else if (size == "medium") {
        body.style.fontSize = "1.29rem";
    } else {
        body.style.fontSize = "2.1rem";
    }
}