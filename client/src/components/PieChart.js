import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart( datas ) {
    const counts = { Asia: 0, Africa: 0 };

    datas.chartData.forEach(item => {
        counts[item["continent"]]++;
    });

    const chartData = {
        labels: ['Asia', 'Africa'],
        datasets: [
            {
                data: [counts['Asia'], counts['Africa']],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }
        ]
    };

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Species</h2>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Number of species by continent"
                        }
                    }
                }}
            />
        </div>
    );
}
export default PieChart;