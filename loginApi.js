/*
	Login  api
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
/*login api*/
server.post('/Login',(req,res)=>{
	/*payload data email and password {email:'email',password:'password'}*/
	sql.query("select count(rest_id) as data,convert(aes_decrypt(password,'quickreadscan'),char) as pass  from userlog where email=?",[req.body.email],(err1,ret1)=>{
		/*the password in the db is encrypted with aes_encrypt()*/
		if(err1==null)
		{
				/*checking if the account exists*/
				if(ret1[0].data==1)
				{
					/*validating the password*/
					if(req.body.password==ret1[0].pass){
						console.log('access granted');
					}
					else
					{
					console.log('invalid password');
					}
				}
				else
				{
				console.log('account not found');
			}
		}
		else{
			console.log(err1);
		}
	});
});
server.listen(2000,()=>{
	console.log('server started');	
})