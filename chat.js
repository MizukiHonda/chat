const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/chat_index.html");
});

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("post", (msg)=>{
    const result=msg.text;
    const replaced =result.replace(/しょぼん/g,'(´・ω・`)')
    .replace(/くさ/g,'ｗｗｗ')
    .replace(/なき/g,'(´;ω;｀)')
    .replace(/わろ/g,"ワロスｗｗｗ")
    .replace(/ぴえん/g,"🥺");

    console.log(replaced);
    io.emit("member-post", replaced);
  });
});

/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});