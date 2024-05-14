import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";

function App() {
    const elemByPage = 5;

    const [currentPage, setCurrentPage] = React.useState(1);
    const [data, setData] = React.useState(null);
    const [renderPageNumbers, setPageRender] = React.useState(<br />);
    const [chartData, setChartData] = React.useState(null);

    function refreshPagination(totalPages, curr) {
        const handleClick = (event) => {
            let val = Number(event.target.id);
            setCurrentPage(val);
            refreshPagination(totalPages, val);
        };

        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

        setPageRender(
            pageNumbers.map((number) => {
                return (
                    <li
                        className={curr === number ? "activated" : ""}
                        key={number}
                        id={number}
                        onClick={handleClick}
                    >
                        {number}
                    </li>
                );
            })
        );
    }

    function displayDatas(datas) {
        const totalPages = Math.ceil(datas.length / elemByPage);

        setData(datas);

        refreshPagination(totalPages, 1);
    }

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => {
                displayDatas(data);
            });
    }, []);

    const handleInputChange = (event) => {
        fetch("/api/" + event.target.value)
            .then((res) => res.json())
            .then((data) => {
                displayDatas(data);
            });
    };

    return (
        <div className="App">
            <div className="container-list">
                <div className="container-header">
                    <p>Antelope Species Search Engine</p>
                    <input
                        type="text"
                        placeholder="Search ..."
                        onChange={handleInputChange}
                    />
                </div>

                <div className="list">
                    {!data ? (
                        "Loading..."
                    ) : data.length === 0 ? (
                        "No species found"
                    ) : (
                        <div>
                            <ul className="animals">
                                {data
                                    .slice(
                                        (currentPage - 1) * elemByPage,
                                        currentPage * elemByPage
                                    )
                                    .map((item, index) => (
                                        <li className="animal-container" key={index}>
                                            <div className="img-container">
                                                <img
                                                    className="round"
                                                    id="image"
                                                    src={item["picture"]}
                                                    alt={item["name"]}
                                                />
                                            </div>

                                            <h3 id="name">{item["name"]}</h3>
                                            <h5 id="continent">{item["continent"]}</h5>
                                            <p id="horns">{item["horns"]}</p>
                                        </li>
                                    ))}
                            </ul>

                            <ul id="page-numbers">{renderPageNumbers}</ul>

                            <div className="charts">
                                <PieChart chartData={data} />
                                <BarChart chartData={data} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
