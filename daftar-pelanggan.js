const tbody = document.querySelector('tbody');

function createTableRow(data, key) {
    // Buat row
    let row = document.createElement('tr');

    // Buat data nomor
    let no = document.createElement('th');
    no.innerHTML = key+1;

    // Buat kolom data credential
    let cred = document.createElement('td');
    cred.innerHTML = data.device_cred;

    // Buat kolom nama
    let nama = document.createElement('td');
    nama.innerHTML = data.nama;

    // Buat button
    let action = document.createElement('td');
    let a = document.createElement('a');
    href = "data.html?cred="+data.device_cred+"&name="+data.nama;
    a.setAttribute("href", href);
    let button = document.createElement('button');
    button.innerHTML = "View";
    button.setAttribute("class", "btn btn-success");

    // Atur struktur
    a.appendChild(button);
    action.appendChild(a);
    row.appendChild(no);
    row.appendChild(cred);
    row.appendChild(nama);
    row.appendChild(action);
    tbody.appendChild(row);
}

fetch (hostServer+"/read-all-data", {
    method: "get"
})
.then(response => response.json())
.then((data) => {
    data.map(createTableRow);
})