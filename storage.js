 function getQueue(){
    return JSON.parse(localStorage.getItem('customerQueue')) || [];
}

 function saveQueue(queue) {
    localStorage.setItem('customerQueue', JSON.stringify(queue));
}