const express = require("express");

const PORT = process.env.PORT || 8080;

function asseServer(port)
{
    const app = express();
    let saved_datas = [];
    let lastTime = null;

    async function get_datas()
    {
        const tenm = 10 * 60 * 1000;
        let current = new Date();

        if (saved_datas.length === 0 || current - lastTime > tenm)
        {
            let response = await fetch("https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json");

            if (!response.ok)
                return null;

            saved_datas = await response.json();
            lastTime = current;
        }

        return saved_datas;
    }

    function get_all_search(search, datas)
    {
        search = search.toLowerCase();
        return datas.filter(data => data["name"].toLowerCase().includes(search)
            || data["continent"].toLowerCase().includes(search)
            || data["horns"].toLowerCase().includes(search));
    }

    app.use(express.json());

    app.get("/", async(req, res)=> {
        let response= { message: "Hello World !"}
        res.json(response);
    });

    app.get("/api/:search", async(req, res)=>
    {
        let search = req.params.search;
        let datas = await get_datas();

        if (datas === null)
        {
            res.statusCode = 500;
            res.json({message: "A problem with the Amazon API"})
        }
        else
        {
            res.json(get_all_search(search, datas));
        }
    });

    app.get("/api", async(req, res)=>
    {
        let datas = await get_datas();

        if (datas === null)
        {
            res.statusCode = 500;
            res.json({message: "A problem with the Amazon API"})
        }
        else
        {
            res.json(datas);
        }
    });

    return app.listen(PORT, () => {
        console.log(`[ASSE] Server listening on ${PORT}`);
    });
}

asseServer(PORT);