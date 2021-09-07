const express = require("express");
let axios = require("axios");
var app = express();

app.use(express.json());

app.post("/", function (req, res, next) {
  try {
    let results = req.body.developers.map(async (d) => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = [];
    for (const result in results) {
      console.log(result);
      out.push({
        name: result.data.name,
        bio: result.data.name,
      });
    }
    return res.send(out);
  } catch (err) {
    next(err);
  }
});

app.listen(3000, function () {
  try {
    console.log("Server starting on port 3000");
  } catch (err) {
    return err;
  }
});
