const maxSlot = 3;
document.getElementById('done').addEventListener('click', ()=> {
    handleDoneClick();
    refreshUI();
});

document.getElementById('nextCustomer').addEventListener('click', ()=> {
    handleNextClick();
    refreshUI();  
});

document.getElementById('skipCustomer').addEventListener('click', ()=> {
    handleSkipClick();
    refreshUI();
})


function handleNextClick() {
    let nowServing = getNowServing();
    const waitQueue = getQueue(); 
    if(nowServing.length >= maxSlot) {
        alert('Carwash slots are currrently full!');
        return;
    } 
    if(waitQueue.length === 0) {
            return;
    }
         
        const nextCustomer = waitQueue.shift();
        nowServing.push(nextCustomer);
        nowServingCustomer(nowServing);
        saveQueue(waitQueue);
    
}


function handleDoneClick() {
    let nowServing = getNowServing();
    if(nowServing.length === 0) {
        return;
    }
    nowServing.shift();
    nowServingCustomer(nowServing);
}


function handleSkipClick() {
    let waitQueue = getQueue();

    if (waitQueue.length === 0) {
        return;
    } else {
        waitQueue.shift();
        saveQueue(waitQueue);
    }

}

function renderWaitingQueue() {
    const customerQueue = getQueue();
    const waitQueue = document.getElementById('waitingQueue');
    waitQueue.textContent = '';

   if (customerQueue.length === 0) {
        waitQueue.textContent = 'No customers waiting';
        return;
    }

    customerQueue.forEach((customer, index) => {
        const newCustomer = document.createElement('div');
        newCustomer.textContent =
            `${index + 1}. ${customer.name} — ${customer.plate} (${customer.car})`;
        waitQueue.appendChild(newCustomer);
    });
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
            `Slot ${index + 1}: ${customer.name} | ${customer.plate} (${customer.car})`;

        nowServingCustomers.appendChild(nowServingElement);
        });
 
}

function refreshUI() {
    renderWaitingQueue();
    renderNowServing();
}

window.addEventListener('storage', (event)=>{
    if (event.key === 'currentCustomer' || event.key === 'nowServing' || 
        event.key === 'queue' || event.key === 'customerQueue') {
        refreshUI();
    }
})

document.addEventListener('DOMContentLoaded', ()=> {
    refreshUI();
})

