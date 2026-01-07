 function getQueue(){
    return JSON.parse(localStorage.getItem('customerQueue')) || [];
}

 function saveQueue(queue) {
    localStorage.setItem('customerQueue', JSON.stringify(queue));
}

function getNowServing() {
    return JSON.parse(localStorage.getItem('nowServing')) || [];
}

function nowServingCustomer(queue) {
    localStorage.setItem('nowServing', JSON.stringify(queue));
}