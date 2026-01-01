document.getElementById("queueForm").addEventListener("submit", function (event) {
    event.preventDefault();
    getFormValues();
    
});

function getFormValues(event) {
    const nameInput = document.getElementById('name').value;
    const plateNumberInput = document.getElementById('plate').value;
    const carVariantInput = document.getElementById('car').value;

    console.log(nameInput);
    console.log(plateNumberInput);
    console.log(carVariantInput);
}