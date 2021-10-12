
const getHistoryFromLocalStorage = () => {
    var history = localStorage.getItem('history')
    return JSON.parse(history)
}
onLoadHistory = () => {
    const history = getHistoryFromLocalStorage()
    var orderedList = document.getElementById('orderedList');

    for (el of history) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(el));
        orderedList.appendChild(entry);
    }
}

redirectToHome = () => {
    location.href = 'index.html'
}

myFunction = () => {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}