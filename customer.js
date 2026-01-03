let customerQueue = [];

document.getElementById("queueForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formValues = getFormValues();
    const duplicate = checkDuplicate(formValues);
    let queuePosition; 
    if (duplicate === -1) {
        customerQueue.push(formValues);
        queuePosition = customerQueue.length;
    } else {
        queuePosition = duplicate + 1;
    }
    
    document.getElementById("positionText").innerText = "You are " + queuePosition + " in line.";

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

function checkDuplicate(formValues) {
    const findPlateCar = customerQueue.findIndex(customer => 
        customer.plate === formValues.plate && customer.car === formValues.car);
    return findPlateCar;
}