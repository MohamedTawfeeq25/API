/*
	 Signup  api
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
	/*payload data {username:'user',gmail:'gmail',pass:'pass'}*/
	/*inserting data to userlog table*/
	sql.query("insert into user_log(username,gmail,password) values(?,?,?)",[req.body.username,req.body.gmail,req.body.pass],(err,msg1)=>{
		if(err!=null)
		{
			/*if the username is already taken*/
			if(err.sqlMessage=="Duplicate entry '"+req.body.username+"' for key 'user_log.username'"){
				console.log("username already exits ");
				res.send({message:"username already exits"})
			}
			/*if the account exists */
			else if(err.sqlMessage=="Duplicate entry '"+req.body.gmail+"' for key 'user_log.gmail'")
			{
				console.log("account already exists");
				res.send({message:"account already exists"});
			}
		}
		//the data is inserted into the table
		else if(msg1.affectedRows==1)

		{
			console.log("account created");
			res.send({message:"account created"});
		}
		
	});
});
server.listen(2000,()=>{
	console.log('server started');	
})