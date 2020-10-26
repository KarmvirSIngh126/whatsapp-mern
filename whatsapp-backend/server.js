import mongoose from "mongoose";
import Messages from "./dbMessage.js"
import express from "express";
import Pusher from "pusher";
import cors from "cors";


var pusher = new Pusher({
  appId: '1069313',
  key: '49690bc514948fc9c99c',
  secret: '50c7b90b75f3c8555aa2',
  cluster: 'ap2',
  encrypted: true
});


const app = express()
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(cors());

const cnnection_url='mongodb+srv://admin:TBNyUSpHsIbr4GhW@cluster0.murd8.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(cnnection_url,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.once("open",()=>{
    console.log("DB connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on("change",(change)=>{
        console.log(change);
        if (change.operationType=="insert"){
            const messageDetails =change.fullDocument;
            pusher.trigger("messages",'inserted',{
                name: messageDetails.name,
                message : messageDetails.message, 
            });

        }else{
            console.log("error triggering pusher");
        }
    })
})

app.get("/",(req,res)=>res.status(200).send('hello world'));
app.get("/messages/sync",(req,res)=>{Messages.find((err,data)=>{
    if(err){
        res.status(500).send(err);
    } else {
        res.status(200).send(data);
    }
});
});
app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body;
    Messages.create(dbMessage,(err,data)=>{
        if (err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})
app.listen(port,()=>console.log(`listening on location:${port}`));