import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { Server } from 'socket.io';

import {
  addItemonTable,
  creatCart,
  fetchingItemList,
  quantityChanging,
} from "./controllers/Cart.js";
import { Tables, deleting, successfulOrder } from "./controllers/Admin.js";

dotenv.config();
const Port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

const io = new Server(server,{cors:true})

app.get("/", (req, resp) => {
  resp.send("This is a home page from hotel management");
});

app.use(cors());
app.use(express.json());
app.post("/insert", creatCart);
app.post("/item", addItemonTable);
app.post("/itemlist", fetchingItemList);
app.post("/quantity", quantityChanging);
app.get("/admin", Tables);
app.post("/delete", deleting);
app.post("/success", successfulOrder);


io.on('connection',(socket)=>{
  socket.on('new:table',(data)=>{
    io.emit('user:joined',data)
  })

  socket.on('message',(data)=>{
   
    io.emit('user:joine',"success")
  })
})

server.listen(Port, () => {
  console.log(`server started on ${Port}`);
});
