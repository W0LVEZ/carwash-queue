document.getElementById("queueForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const customerQueue = getQueue();
    const formValues = getFormValues();
    const duplicate = checkDuplicate(customerQueue, formValues);

    //-1 not Found, 0 Found
    if (duplicate === -1) {
        customerQueue.push(formValues);
        saveQueue(customerQueue);
    } 
    
    localStorage.setItem('currentCustomer',JSON.stringify({
        plate: formValues.plate,
        car: formValues.car
        })
    );
    refreshUI();
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

function renderWaitingQueue() {
    const customerQueue = getQueue();
    const waitQueue = document.getElementById('waitQueue');
    waitQueue.textContent = '';

    if (customerQueue.length === 0) {
        waitQueue.textContent = 'No customer in line.';
        return;
    }

    customerQueue.forEach((customer, index) => {
        const newCustomer = document.createElement('div');
        newCustomer.textContent = 
            `${index + 1}. ${customer.plate} (${customer.car})`
        waitQueue.appendChild(newCustomer);
    })
}

function renderQueuePosition() {
    const stored = localStorage.getItem('currentCustomer');
    if (!stored) return;

    const currentCustomer = JSON.parse(stored);
    const positionText = document.getElementById('positionText');

    const nowServing = getNowServing();
    const servingIndex = nowServing.findIndex(customer =>
        customer.plate === currentCustomer.plate &&
        customer.car === currentCustomer.car
    );

    if (servingIndex !== -1) {
        positionText.innerText = 'Your car is now being washed 🚗💦';
        return;
    }

    const queue = getQueue();
    const queueIndex = queue.findIndex(customer =>
        customer.plate === currentCustomer.plate &&
        customer.car === currentCustomer.car
    );

    if (queueIndex !== -1) {
        positionText.innerText = `You are ${queueIndex + 1} in line.`;
    } else {
        positionText.innerText = 'You are not in the queue.';
    }

}

function refreshUI() {
    renderNowServing();
    renderWaitingQueue();
    renderQueuePosition();
}

window.addEventListener('storage', (event)=>{
    if (event.key === 'customerStorage' || event.key === 'nowServing') {
        refreshUI();
        renderQueuePosition();
    }  
})

document.addEventListener('DOMContentLoaded', ()=>{
    refreshUI();

})