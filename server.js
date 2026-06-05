require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 5000;


app.listen(PORT, () =>{
  try{
    console.log(`Server is running on port ${PORT}`);
  }catch(err){
    console.error('Error starting the server:', err);
  }
})