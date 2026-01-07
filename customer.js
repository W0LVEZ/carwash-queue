document.getElementById("queueForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const customerQueue = getQueue();
    const formValues = getFormValues();
    const duplicate = checkDuplicate(customerQueue, formValues);
    let queuePosition; 
    //-1 not Found, 0 Found
    if (duplicate === -1) {
        customerQueue.push(formValues);
        saveQueue(customerQueue);
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

function checkDuplicate(customerQueue, formValues) {
    //find index returns: -1 not in queue, 0,1,2,... waiting
    return customerQueue.findIndex(customer => 
        customer.plate === formValues.plate && 
        customer.car === formValues.car);
}

function renderNowServing() {
    const nowServing = getNowServing();
    const nowServingCustomers = document.getElementById('nowServing');
    nowServingCustomers.textContent = '';

    if (nowServing.length === 0) {
        nowServingCustomers.textContent = 'No car to wash!'
    }

    nowServing.forEach((customer, index) => {
    const nowServingElement = document.createElement('div');

    nowServingElement.textContent =
        `Slot ${index + 1}: ${customer.plate} (${customer.car})`;

    nowServingCustomers.appendChild(nowServingElement)
    });
}