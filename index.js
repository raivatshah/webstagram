const express = require("express");
const path = require("path");
const app = express();
var fs = require("fs");
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
// support json encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, "/client/public")));

app.post("/userinfo", (req, res) => {
  fs.writeFile(
    __dirname + "/client/public/data.json",
    JSON.stringify(req.body),
    function(err) {
      if (err) {
        console.log("写入文件出现错误!");
        return res.send(false);
      }
      console.log("已输出至data/*.json中");
      return res.send(true);
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
