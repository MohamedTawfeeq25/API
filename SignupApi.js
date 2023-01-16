/*
	Restaurant Signup  api
	express js
	mysql database
*/
const express=require('express');
const server=express();
const body=require('body-parser');
const mysql=require('mysql');
server.use(body.json());
/*connecting to mysql server*/
var sql=mysql.createConnection({host:/*Host Name*/,user:/*username*/,password:/*password*/,database:/*database name*/});
console.log('db connected');
sql.connect();
/*Signup api*/
server.post('/Signup',(req,res)=>{
	/*inserting data to userlog table*/
	sql.query("insert into userlog (email,restaurant_name,password,address,phone,home_delivery) values(?,?,?,?,?,?)",[req.body.email,req.body.res_name,req.body.password,req.body.address,req.body.phone,req.body.status],(err,msg1)=>{
		if(err!=null)
		{
			/*if the account already exists*/
			if(err.sqlMessage=="Duplicate entry '"+req.body.email+"' for key 'userlog.email'"){
				res.send({message:"account already exists"});
			}
			else
			{
			console.log(err);
			}
		}
		else if(msg1.affectedRows==1)
		{
			/*the data is inserted successfully into the table*/
			sql.query("select rest_id as id from userlog where email=?",[req.body.email],(err2,msq2)=>
			{
				if(err2==null){
					console.log("account created");
					/*returning the confirmation with id*/
					res.send({message:"account created",auth:msq2[0].id});
				}
				else{
					console.log(err2);
				}
			});	
		}	
	});
});
server.listen(2000,()=>{
	console.log('server started');	
})