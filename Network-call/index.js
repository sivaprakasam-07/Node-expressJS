const express = require('express');

const app = express();
app.get("/page", (request, response) => {
    // console.log(request);
    // console.log(response);
    // let date = new Date();
    // response.send(`Today's date is ${date}`);
    // response.send("Hello Siva,this is new server 3000");
    response.sendFile("./siva.html", { root: __dirname });
});

app.listen(3000);


