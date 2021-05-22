const logsEl = document.querySelector('#logs');
const loadingEl = document.querySelector('#loading');

let loading = false;

const getLogsFromBackend = async () => {
    loading = true;
    const res = await fetch('http://localhost:3000/database');
    const data = await res.json();
    loading = false;
    return data;
};

const addLogsToDom = async () => {
    const logs = await getLogsFromBackend();
    console.log(logs);

    if (!loading) {
        loadingEl.innerHTML = '';
    }

    logs.forEach((log) => {
        const div = document.createElement('div');
        div.className = 'logs';
        div.innerHTML = `
            <h3>${log.title}</h3>
            <ul>
                <li><strong>Log Date: </strong> ${log.date} </li>
                <li><strong>Description: </strong> ${log.description} </li>
            </ul>
            <div class="tags">${log.techs}</div>
            <small>${log.sources}</small>
        `;
        logsEl.appendChild(div);
    });
};
addLogsToDom();
