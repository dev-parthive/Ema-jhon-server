const express =  require("express")
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000 ;


//middleware 
app.use(cors())
app.use(express.json())
//database connenction 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.afdwhlk.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const productCollection = client.db('ema-jhon').collection('products');
     

        app.get('/products', async(req,res )=>{
            const page = req.query.page
            const size = req.query.size;
            console.log(page , size)
            const query = {}
            const cursor = productCollection.find(query)
            // const products = await cursor.limit(10).toArray() 
            const products = await cursor.toArray() 
            const count = await productCollection.estimatedDocumentCount()

            res.send({count, products})
        })

    }
    catch{

    }
    finally{

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res)=>{
    res.send('Ema-Jhon-server is runnig ')
})

app.listen(port, ()=>{
    console.log('ema john running on :', port)
})
