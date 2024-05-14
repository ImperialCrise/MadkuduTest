import React from "react";
import { Bar } from "react-chartjs-2";
import {chart as chartjs} from 'chart.js/auto'

function BarChart( datas )
{
    const counts = datas.chartData.reduce((acc, item) => {
        acc[item["horns"]] = (acc[item["horns"]] || 0) + 1;
        return acc;
    }, {});

    let sortedCounts = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    const chartData = {
        labels: Object.keys(sortedCounts),
        datasets: [
            {
                data:  Object.values(sortedCounts),
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }
        ]
    };

    return (
        <div className="bar-container">
            <h2 style={{ textAlign: "center" }}>Numbers of Horns</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {

                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
}

export default BarChart;