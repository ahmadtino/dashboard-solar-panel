const params = new window.URLSearchParams(window.location.search);
const cred = params.get("cred");
const nama = params.get("name");

const tableOne = document.querySelector('.daya-beban');
const tableTwo = document.querySelector('.daya-solarpanel');
const del = document.querySelector('.del-btn');

document.querySelector('.cred').innerHTML = cred;
document.querySelector('.name').innerHTML = nama;

function createTableRow(data, key) {
    // Buat row
    let row = document.createElement('tr');

    // Buat kolom nomor
    let no = document.createElement('th');
    no.innerHTML = key+1;

    // Buat kolom time
    let time = document.createElement('td');
    let date = new Date(data.timestamp);
    // time.innerHTML = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    time.innerHTML = date.toLocaleString("id-ID", { dateStyle: 'short', timeStyle:'short' });

    // Buat kolom data tegangan solar panel
    let v_solar = document.createElement('td');
    v_solar.innerHTML = data.v_solar;

    // Buat kolom data arus solar panel
    let i_solar = document.createElement('td');
    i_solar.innerHTML = data.i_solar;

    // Buat kolom data daya solar panel
    let p_solar = document.createElement('td');
    p_solar.innerHTML = data.p_solar;

    // Buat kolom data power factor solar panel
    let pf_solar = document.createElement('td');
    pf_solar.innerHTML = data.pf_solar;

    // Buat kolom data power factor solar panel
    let e_solar = document.createElement('td');
    e_solar.innerHTML = data.e_solar;

    // Atur struktur data tabel pertama
    row.appendChild(no);
    row.appendChild(time);
    row.appendChild(v_solar);
    row.appendChild(i_solar);
    row.appendChild(p_solar);
    row.appendChild(pf_solar);
    row.appendChild(e_solar);
    tableOne.appendChild(row);

    // Buat row
    row = document.createElement('tr');

    // Buat kolom nomor
    no = document.createElement('th');
    no.innerHTML = key+1;

    // Buat kolom time
    time = document.createElement('td');
    date = new Date(data.timestamp);
    // time.innerHTML = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    time.innerHTML = date.toLocaleString("id-ID", { dateStyle: 'short', timeStyle:'short' });

    // Buat kolom data tegangan beban
    let v_load = document.createElement('td');
    v_load.innerHTML = data.v_load;

    // Buat kolom data arus solar panel
    let i_load = document.createElement('td');
    i_load.innerHTML = data.i_load;

    // Buat kolom data daya solar panel
    let p_load = document.createElement('td');
    p_load.innerHTML = data.p_load;

    // Buat kolom data power factor solar panel
    let pf_load = document.createElement('td');
    pf_load.innerHTML = data.pf_load;

    // Buat kolom data power factor solar panel
    let e_load = document.createElement('td');
    e_load.innerHTML = data.e_load;

    // Atur struktur data tabel pertama
    row.appendChild(no);
    row.appendChild(time);
    row.appendChild(v_load);
    row.appendChild(i_load);
    row.appendChild(p_load);
    row.appendChild(pf_load);
    row.appendChild(e_load);
    tableTwo.appendChild(row);
}

function createChart(canvas, color, x, y, label) {
    chart = new Chart(canvas, {
        type: "line",
        data: {
            labels: x,
            datasets: [{
            label: label,
            backgroundColor: color,
            borderColor: color,
            data: y,
            fill: false
            }]
        },
        options: {
            animation: false,
            scales: {
                yAxes: [{
                    scaleLabel: {
                    display: true,
                    labelString: 'Power (W)'
                    }
                }]
            }
        }
    });
}

function fetchingData() {
    fetch(hostServer+"/read-spec-data/"+cred, {
        method: "get"
    })
    .then(response => response.json())
    .then((data) => {
        tableOne.innerHTML = "";
        tableTwo.innerHTML = "";
        data.map(createTableRow);
        let t = data.slice(-20).map(x => {
            waktu = new Date(x.timestamp);
            return waktu.toLocaleString("id-ID", { dateStyle: 'short', timeStyle:'short' });
        });
        let powerBeban = data.slice(-20).map(x => x.p_load);
        let powerSolar = data.slice(-20).map(x => x.p_solar);
        createChart("chartBeban", "blue", t, powerBeban, "Daya Beban");
        createChart("chartSolar", "red", t, powerSolar, "Daya Solar Panel");
    })
}

function deleteData() {
    fetch(hostServer+"/delete-data/"+cred, {
        method: "delete"
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data.message);
    })
}

fetchingData();
setInterval(fetchingData, 15000);

del.addEventListener("click", deleteData);

