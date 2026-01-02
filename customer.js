let customerQueue = [];

document.getElementById("queueForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formValues = getFormValues();
    customerQueue.push(formValues);
    const queuePosition = customerQueue.length;

    document.getElementById("positionText").innerText = "You are " + queuePosition + " in line."
    console.log(customerQueue);
    console.log(queuePosition);

});

function getFormValues() {
    const nameInput = document.getElementById('name').value;
    const plateNumberInput = document.getElementById('plate').value;
    const carVariantInput = document.getElementById('car').value;

    const customers = {
        name: nameInput,
        plate: plateNumberInput,
        car: carVariantInput
    };
    return customers;
}


