// COVID 19

window.addEventListener('load', setup);

async function setup() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const globalSpread = await getData();
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: globalSpread.dates,
            datasets: [{
                label: 'Spread of COVID 19',
                data: globalSpread.increaseRate,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
            }]
        },
        options: {}
    });
}

async function getData() {
    const response = await fetch('worldwide-aggregated_updated.csv');
    const data = await response.text();
    const dates = [];
    const increaseRate = [];
    const rows = data.split('\n').slice(2);
    rows.forEach(row => {
        const cols = row.split(',');
        dates.push(cols[0]);
        increaseRate.push(parseFloat(cols[4]));
    });
    return {dates, increaseRate};
}
