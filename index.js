let $ = require('jquery');
let Chart = require('chart.js');
let SIRjs = require('sir.js');

let llamasir = function (beta, gamma, tiempo, initial) {
    let solution = [];
    solution = SIRjs.solve({
        S0: 100 - initial,
        I0: initial,
        R0: 0,
        t: 1,
        N: tiempo / 4,
        beta: beta,
        gamma: gamma
    });

    if (solution.length > tiempo) {
        console.log(solution.length);
        let cortar = solution.length - tiempo;
        solution.splice(0, cortar);
    }

    return solution;
}

let actualizagraph = function (sanos, infectados, recuperados) {
    removeData(chart);
    chart.data.datasets[0].data = sanos;
    chart.data.datasets[1].data = infectados;
    chart.data.datasets[2].data = recuperados;
    chart.update();
}

let removeData = function (chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
let initial = $('#initial').val();
let beta = $('#beta').val();
let gamma = $('#gamma').val();
let solution = [];
let tiempo = 60;
let resultado = llamasir(beta, gamma, tiempo, initial);

let infectados = resultado.map(item => item.I);
let sanos = resultado.map(item => item.S);
let recuperados = resultado.map(item => item.R);
let escala = Array.from(Array(tiempo).keys());

ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: escala,
        datasets: [{
                label: 'Healthy',
                borderColor: 'rgb(58, 193, 73)',
                backgroundColor: 'rgba(58, 193, 73, 0.05)',
                borderWidth: 5,
                cubicInterpolationMode: 'monotone',
                data: sanos
            },
            {
                label: 'Infected',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.05)',
                borderWidth: 5,
                cubicInterpolationMode: 'monotone',
                data: infectados
            }, {
                label: 'Recovered',
                borderColor: 'rgb(99, 123, 255)',
                backgroundColor: 'rgba(99, 123, 255, 0.05)',
                borderWidth: 5,
                cubicInterpolationMode: 'monotone',
                data: recuperados
            }]
    },

    // Configuration options go here
    options: {}
});

$('#beta').on('change', function () {
    beta = $(this).val();
    let resultado = llamasir(beta, gamma, tiempo, initial);

    let infectados = resultado.map(item => item.I);
    let sanos = resultado.map(item => item.S);
    let recuperados = resultado.map(item => item.R);
    actualizagraph(sanos, infectados, recuperados);
});

$('#gamma').on('change', function () {
    gamma = $(this).val();
    let resultado = llamasir(beta, gamma, tiempo, initial);

    let infectados = resultado.map(item => item.I);
    let sanos = resultado.map(item => item.S);
    let recuperados = resultado.map(item => item.R);
    actualizagraph(sanos, infectados, recuperados);
});

$('#initial').on('change', function () {
    initial = $(this).val();
    let resultado = llamasir(beta, gamma, tiempo, initial);

    let infectados = resultado.map(item => item.I);
    let sanos = resultado.map(item => item.S);
    let recuperados = resultado.map(item => item.R);
    actualizagraph(sanos, infectados, recuperados);
});
