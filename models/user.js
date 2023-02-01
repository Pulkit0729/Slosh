const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     name:{
         type: String,
         required: true,
         unique:true,
         min:3,
         max:20
     },
     email:{
        type: String,
         required: true,
         unique:true

     },
     password:{
        type: String,
        required: true,
        min:3,
        max:10
     },
     token: {
        type: String,
     }

},

{timestamps: true}

);

module.exports = mongoose.model("User", UserSchema);