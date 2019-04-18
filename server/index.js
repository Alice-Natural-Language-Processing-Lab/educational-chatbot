const express = require('express')
const userRouter = require('./routes/userRouter');
const testsRouter = require('./routes/testsRouter');
const dialogFlowRouter = require('./routes/dialogFlowRouter');
const resourceRouter = require('./routes/resourceRouter');
const intentRouter = require('./routes/intentRouter');
var cors = require('cors');


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 8100;
app.listen(port, () => {
    console.log('Server running at port '+port);
})

app.get('/',function(req,res){
    res.json('Connected to heroku');
})

app.use('/user', userRouter);
app.use('/tests', testsRouter);
app.use('/dialogflow', dialogFlowRouter);
app.use('/resource', resourceRouter);
app.use('/intent',intentRouter);