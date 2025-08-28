import mongoose, { Schema } from "mongoose";

const clientSchema = Schema({
    clientId : {type : String , required : true},
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    mobile : {type : String , required : true},
    panNo : {type : String , required : true},
    distributorId : {type : String , required : true},
});

const Client = mongoose.model("client_test_batch" , clientSchema);
export default Client;