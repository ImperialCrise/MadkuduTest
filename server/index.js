const express = require("express");

const PORT = process.env.PORT || 8080;

function asseServer(port)
{
    const app = express();
    app.use(express.json());

    app.get("/", async(req, res)=> {
        let response= { message: "Hello World !"}
        res.json(response.data);
    });

    app.get("/api/get", async(req, res)=> {
        let response= { message: "Hello World !"}
        res.json(response.data);
    });

    return app.listen(PORT, () => {
        console.log(`[ASSE] Server listening on ${PORT}`);
    });
}

asseServer(PORT);