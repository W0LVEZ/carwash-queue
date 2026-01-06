
document.getElementById('done').addEventListener('click', ()=> {
    handleDoneClick();
    refreshUI();
    renderWaitingQueue();
    renderNowServing();
});

document.getElementById('nextCustomer').addEventListener('click', ()=> {
    handleNextClick();
    refreshUI();
    renderWaitingQueue();
    renderNowServing();
    
});


function handleNextClick() {
    let nowServing = getNowServing();
    if(nowServing !== null) {
        alert('Carwash slots are currrently full!');
        return;
    } else {
        const waitQueue = getQueue();  
        if(waitQueue.length === 0) {
            return;
        } else {
            const firstCustomer = waitQueue.shift();
            nowServingCustomer(firstCustomer);
            saveQueue(waitQueue);
    }
    }
}


function handleDoneClick() {
    let nowServing = getNowServing();
    if(nowServing !== null) {
        nowServingCustomer(null);
    }

    const waitQueue = getQueue();   
    if(waitQueue.length === 0) {
        return;
    } else {
        const firstCustomer = waitQueue.shift();
        nowServingCustomer(firstCustomer);
        saveQueue(waitQueue);
    }
}


function renderWaitingQueue() {
    const customerQueue = getQueue();
    const waitQueue = document.getElementById('waitingQueue');
    waitQueue.textContent = '';

    for (const customer of customerQueue) {
        const newCustomer = document.createElement('div');

        newCustomer.textContent = `Name: ${customer.name} | ${customer.plate} (${customer.car})`;
        waitQueue.appendChild(newCustomer);
    }
}

function renderNowServing() {
    const nowServing = getNowServing();
    const nowServingCustomers = document.getElementById('nowServing');
    nowServingCustomers.textContent = '';

    if (nowServing === null) {
        let newNowServing = document.createElement('div');
        newNowServing.textContent = 'No car being washed';
        nowServingCustomers.appendChild(newNowServing);
    } else {
        let newNowServing = document.createElement('div');
        newNowServing.textContent = `Name: ${nowServing.name} | 
        Plate: ${nowServing.plate} | Car: ${nowServing.car}`;
        nowServingCustomers.appendChild(newNowServing);
    }
}

function refreshUI() {
    renderWaitingQueue();
    renderNowServing();
}