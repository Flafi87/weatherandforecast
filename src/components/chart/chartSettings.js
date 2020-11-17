const chartSettings = {
    colors: ['#73c9f4', '#ff0f2f', '#3333FF'],
    chart: {
        id: "line-chart",
        width: "100%"
    },
    xaxis: {
        type: "datetime",
        tooltip: {
            enabled: false
        }
    },
    yaxis: [
        {
            seriesName: 'Rain',
            opposite: true,
            title: {
                text: "Rain"
            },
            labels: {
                formatter(value) {
                    return `${value.toFixed(1)} mm`;
                }
            }
        },
        {
            seriesName: 'Temperature max',
            title: {
                text: "Temperature "
            },
            labels: {
                formatter(value) {
                    return `${value.toFixed(1)} C°`;
                }
            }
        },
        {
            seriesName: 'Temperature max',
            labels: {
                formatter(value) {
                    return `${value.toFixed(1)} C°`;
                }
            },
            show: false
        }
    ],
    responsive: [
        {
            breakpoint: 1000,
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                legend: {
                    position: "bottom"
                }
            }
        }
    ],
    tooltip: {
        enabled: true,
        shared: true,
        theme: "light",
        onDatasetHover: {
            highlightDataSeries: false
        },
        x: {
            show: true,
            format: "dd MMM HH:mm",
            formatter: undefined
        },
        marker: {
            show: true
        }
    },
    stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0
    }
};
export default chartSettings