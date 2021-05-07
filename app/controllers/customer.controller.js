const Customer = require("../models/customer.model.js");
var amqp = require('amqp');

var Client = require('node-rest-client').Client;
var client = new Client();

var microTime = require('microtime');
var nodemailer = require('nodemailer');

var ValorPasajeNormal=0;

var jwt = require('jsonwebtoken');
var crypto = require('crypto');
const KEY = "m P4yBusLl4v3R3st4P1$<'SECRET>)Key'!";


var FCM = require('fcm-node');
 var serverKey = 'AAAAij-d7oY:APA91bEypBK92zWRhFkJZ1ye_fBhW1wQs8w9pR0e581wdbPHQsAcJCow68Ql8R6VuOnDBb5k1XietzMEb8Qj0IMnIKWn7OVaPLYLC-PBuGSW0qo6gwwZTjNjln-fQsqW0J4XD5GkKL2E'; 
 var fcm = new FCM(serverKey);
 
var conteLogo=0;

var connectionAMQ = amqp.createConnection({ host: '54.91.53.76' ,login:'mqsolodomis',password:'mqsolodomis'});
connectionAMQ.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connectionAMQ.on('ready', function () {
	
  // Use the default 'amq.topic' exchange
  connectionAMQ.queue('solo.payb', function (q) {
      // Catch all messages
      q.bind('#');
    
      // Receive messages
      q.subscribe(function (message) {
        // Print messages to stdout
        console.log("Desencolando..");
	

      });
  });
  
  
  
   
 
});


   Customer.getLogin("SELECT valor from tarifas where tipo='Normal';",  (error2, results2)=> {
	  if (error2) {
	   console.log(error2);
	   ValorPasajeNormal=2400;
	   console.log("ERROR al cargar valor***",error2);
	    }else{
			
			try{
		  ValorPasajeNormal=results2[0].valor;
		  console.log("Carga normal del valor..**");
			}catch(ef){console.log("ERROR al cargar valor***",ef); ValorPasajeNormal=2400;}
			
	}
	});



//POST
exports.logon = (req,res)=>{
	
console.log(req.body.user + " attempted login");
//var password = crypto.createHash('sha256').update(req.body.pass).digest('hex');	

		var useName,Password,imei,telefono;   
			try{
				 useName=req.body.user;
				 Password=req.body.pass;	
				
				 imei=req.body.imei;
		
			}catch (ero){console.dir(ero);}
				
			//if(Devices[idDevi]){
				var respu={};
				console.log("Request Android Logon",conteLogo);
				
				
			  //Customer.getLogin ("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
			  Customer.getLogin ("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'",(err, data) => {
			  if (err) 
				  {
			       res.write(JSON.stringify({"success":false,"msg":""}));
				   res.end();
				   console.log(error);
			
			   }else{
				
			  if(results.length>0){
			  
			   var config=results[0];
			
				
					
					 var payload = {
						username: req.body.username,
					};

					var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "1d"});
					
					var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario,"token":token};
					var retoTo={"response":resule};
						
						res.write(JSON.stringify(resule));
						 res.end();  
			


			  }else{
				  res.write(JSON.stringify({"success":false,"msg":""}));
				  res.end();
				  console.log("Error en Login..  user o pass");
			  }
			}
			});
	
	
	
  
	
	
};



//POST
exports.logonP = (req,res)=>{
	
console.log(req.body.user + " attempted login");
//var password = crypto.createHash('sha256').update(req.body.pass).digest('hex');	

		var useName,Password,imei,telefono;   
			try{
				 useName=req.body.user;
				 Password=req.body.pass;
				 telefono=req.body.phone;
				 imei=req.body.imei;
		
			}catch (ero){console.dir(ero);}
				
			//if(Devices[idDevi]){
				var respu={};
				console.log("Request Android Logon",conteLogo);
				
				
			  //Customer.getLogin ("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
			  Customer.getLogin ("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'",(err, data) => {
			  if (err) 
				  {
			       res.write(JSON.stringify({"success":false,"msg":""}));
				   res.end();
				   console.log(error);
			
			   }else{
				
			  if(results.length>0){
			  
			   var config=results[0];
			
				if(config.Phone==telefono){
					
					 var payload = {
						username: req.body.username,
					};

					var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "1d"});
					
					var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario,"token":token};
					var retoTo={"response":resule};
						
						res.write(JSON.stringify(resule));
						 res.end();  
				}else{

				      res.write(JSON.stringify({"success":false,"msg":"telefono"}));
					  res.end();
					  console.log("Error en Login..  telefono");

				}


			  }else{
				  res.write(JSON.stringify({"success":false,"msg":""}));
				  res.end();
				  console.log("Error en Login..  user o pass");
			  }
			}
			});
	
	
	
  
	
	
};



//POST
exports.logonPV = (req,res)=>{
	
console.log(req.body.user + " attempted login");

		var useName,Password,imei,telefono;   
			try{
				 useName=req.body.user;
				 Password=req.body.pass;
				
		
			}catch (ero){console.dir(ero);}
				
		
				var respu={};
				console.log("Request Android Logon",conteLogo);
				
				
			  Customer.getLogin ("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'",(error, results) => {
			  if (error) 
				  {
			       res.write(JSON.stringify({"success":false,"msg":""}));
				   res.end();
				   console.log(error);
			
			   }else{
				
			  if(results.length>0){
			  
			   var config=results[0];	
					
					 var payload = {
						username: req.body.username,
					};

					var token = jwt.sign(payload, KEY, {algorithm: 'HS256', expiresIn: "1d"});
					
					var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario,"token":token};
					var retoTo={"response":resule};
						
						res.write(JSON.stringify(resule));
						res.end();  
				


			  }else{
				  res.write(JSON.stringify({"success":false,"msg":""}));
				  res.end();
				  console.log("Error en Login..  user o pass");
			  }
			}
			});
	
	
	
  
	
	
};


//get
exports.ApiTime = (req, res) => {
	
	var timeStamp = (Math.floor(Date.now() / 1000));
	timeStamp =timeStamp +10;
	res.write(JSON.stringify({'time':timeStamp}));
    res.end();  
	
};


//get
exports.ApkVersion = (req, res) => { 
	
	  Customer.getLogin ("SELECT * from blueval_version order by id limit 1",(error, data) => {
			  if (error) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify({'success':true,'data':data[0]}));
					res.end();    
				  }
	  });
	

	
};



//get
exports.usuarios_config = (req, res) => { 
	
	var id=req.query.id;
	Customer.getLogin ("SELECT * from usuarios_config where id='"+id+"'",(error, data) => {
			if (error) 
				{
				   res.write(JSON.stringify({'success':false}));
				   res.end();   
				}else{
				  res.write(JSON.stringify({'success':true,'data':data[0]}));
				  res.end();    
				}
	});
  

  
};


//POST
exports.getUsers = (req, res) => {
	
	  Customer.getLogin ("SELECT Fullnames,MemberId,Points,fiados,list_status,uuidcard,Fax,cont_itag FROM arm_members where Fax<>'' and MemberId>3",(error, data) => {
			  if (error) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();    
				  }
	  });
	

	
};


//POST
exports.setUsers = (req, res) => {
	
	  Customer.getLogin ("SELECT Fullnames,Fax,Points,fiados FROM arm_members where Fax<>''",(error, data) => {
			  if (error) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();    
				  }
	  });
	

	
};



//POST
exports.guardar_payb = (req, res) => {
	
	var data=req.body;

		try{
	
	    contador=data.contador;
	    placa=data.placa;
	
        var querh="UPDATE arm_members set  Points=Points-"+ValorPasajeNormal+" where Fax='"+data.cliente+"'";
		console.log("querh**",querh);	
		
		
	  Customer.getLogin (querh,(error, results) => {	
		  if (error) 
		  {
              Customer.getLogin ("UPDATE arm_members set  cont_itag='"+contador+"' where uuidblue='"+data.uuidBlu+"' and cont_itag<'"+contador+"'",(error, results) => {});
			  res.write(JSON.stringify({"response":false}));
				 res.end(); 
		  }else
			  
			{

				
					
				Customer.getLogin ("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente='"+data.grupo+"',placa='"+placa+"'", function (errorg, resultsg) {
		  if (errorg) 
		  {
			  console.log("Error ",errorg);
		  }else{
			  console.log("Full insert valida a la primera the best....*****");
		  }
				});
				
			
			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
				 
				
				 
				 
			}
		   
		});
	
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	
	
};





//POST
exports.guardar_payb_all = (req, res) => {
	
	var datar=req.body;
	var data=JSON.parse(datar.data);
res.write(JSON.stringify({"success":1}));
				 res.end(); 
	
console.log("guardar_payb_all",data);
console.log("guardar_payb_all2",datar);

var contadorIt=datar.con_tag;

for(var i=0;i<data.length;i++){ 
	
	var thisDat=data[i];
	var namess=thisDat.name.split(",");
	var horaOk=thisDat.date.substring(0,thisDat.date.indexOf(".")-1);
	
	var dataThisTransa={		 
         "cliente": namess[0],
         "observa": "valido",
         "lat": thisDat.nombre,
         "lng": thisDat.telefono,
         "tiempo": "",
         "tipoServ": thisDat.tipoTrans,
         "campoAdicio": "",
         "bateria": "69%",
         "mediop": thisDat.tipoTrans,
         "fecha": horaOk,
         "uuidBlu": datar.itag,
		 "mailCondu":datar.email,
         "placa": datar.placa,
         "grupo": datar.grupo,
		 "contador": contadorIt
	};
	console.log("Bloque Local",dataThisTransa);
	if(thisDat.tipoTrans=='ITAG'){
		
		GuardarItag(dataThisTransa);
	}else if(thisDat.tipoTrans=='NFC'){
		
		GuardarNfc(dataThisTransa);
	}else{
		//aca QR
		GuardarNfc(dataThisTransa);
	}
	
}

	/*	
		try{
	
	    contador=data.contador;
	    placa=data.placa;
	
        var querh="UPDATE arm_members set  Points=Points-"+ValorPasajeNormal+" where Fax='"+data.cliente+"'";
		console.log("querh**",querh);	
		
		
	  Customer.getLogin (querh,(error, results) => {	
		  if (error) 
		  {
              Customer.getLogin ("UPDATE arm_members set  cont_itag='"+contador+"' where uuidblue='"+data.uuidBlu+"' and cont_itag<'"+contador+"'",(error, results) => {});
			  res.write(JSON.stringify({"response":false}));
				 res.end(); 
		  }else
			  
			{

				
					
				Customer.getLogin ("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente='"+data.grupo+"',placa='"+placa+"'", function (errorg, resultsg) {
		  if (errorg) 
		  {
			  console.log("Error ",errorg);
		  }else{
			  console.log("Full insert valida a la primera the best....*****");
		  }
				});
				
			
			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
				 
				
				 
				 
			}
		   
		});
	
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	*/
	
};


function GuardarNfc(data){
	 
		try{
	
	    contador=data.contador;
	    placa=data.placa;
	
        var querh="UPDATE arm_members set  Points=Points-"+ValorPasajeNormal+" where Fax='"+data.cliente+"'";
		console.log("querh**",querh);	
		
		
	  Customer.getLogin (querh,(error, results) => {	
		  if (error) 
		  {
           
			 
		  }else
			  
			{	
				Customer.getLogin ("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente='"+data.grupo+"',placa='"+placa+"'", function (errorg, resultsg) {
				  if (errorg) 
				  {
					  console.log("Error ",errorg);
				  }else{
					  console.log("Full insert valida a la primera the best....*****");
				  }
				});
			
				
			}
		   
		});
	
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
}




function GuardarItag(data){
	
	
		try{
	
	   
	    placa=data.placa;
	    	

		Customer.getLogin ("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente='"+data.grupo+"',placa='"+placa+"'", function (errorg, resultsg) {
		  if (errorg) 
		  {
			  console.log("Error ",errorg);
		  }else{
			  console.log("Full the best....*****");
		  }
		});
	
			    
				Customer.getLogin ("update arm_members set cont_itag='"+data.contador+"' where Fax='"+data.cliente+"' ",(error, results) => {});

	   
	
	
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	
	
}


//POST
exports.guardar_payb_nfc = (req, res) => {
	
	var data=req.body;

		try{
	
	    contador=data.contador;
	    placa=data.placa;
	
        var querh="UPDATE arm_members set  Points=Points-"+ValorPasajeNormal+" where uuidcard='"+data.nfcID+"'";
		console.log("querh**",querh);	
		
		
	  Customer.getLogin (querh,(error, results) => {	
		  if (error) 
		  {
            //  Customer.getLogin ("UPDATE arm_members set  cont_itag='"+contador+"' where uuidblue='"+data.uuidBlu+"' and cont_itag<'"+contador+"'",(error, results) => {});
			  res.write(JSON.stringify({"response":false}));
				 res.end(); 
		  }else
			  
			{	
				Customer.getLogin ("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente='"+data.grupo+"',placa='"+placa+"'", function (errorg, resultsg) {
				  if (errorg) 
				  {
					  console.log("Error ",errorg);
				  }else{
					  console.log("Full insert valida a la primera the best....*****");
				  }
				});
				Customer.getLogin ("update arm_members set cont_itag='"+data.contador+"' where uuidblue='"+data.uuidBlu+"' ",(error, results) => {});

				res.write(JSON.stringify({"response":true}));
				 res.end(); 
			}
		   
		});
	
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	
	
};

 

//POST
exports.guardar_payb_tag = (req, res) => {
	
	var data=req.body;

		try{
	
	    contador=data.contador;
	    placa=data.placa;
	
        var querh="UPDATE arm_members set  Points=Points-"+ValorPasajeNormal+" where uuidcard='"+data.nfcID+"'";
		console.log("querh**",querh);	
		
		
	 	
				Customer.getLogin ("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente='"+data.grupo+"',placa='"+placa+"'", function (errorg, resultsg) {
				  if (errorg) 
				  {
					  console.log("Error ",errorg);
				  }else{
					  console.log("Full insert valida a la primera the best....*****");
				  }
				});
			
			    
				Customer.getLogin ("update arm_members set cont_itag='"+data.contador+"' where uuidblue='"+data.uuidBlu+"'",(error, results) => {});

			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
			
		   
	
	
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	
	
};





//POST
exports.guardar_validador = (req, res) => {
	var data=req.body;
		try{
	  Customer.getLogin("INSERT INTO arm_validadores set imei='"+data.imei+"',mac='"+data.sim+"',fecha_registro=CURRENT_TIMESTAMP,placa='"+data.placa+"',num_vehiculo='"+data.num_vehiculo+"',encargado='',empresa='"+data.empresa+"',estado='0',MemberId='0',imei2='"+data.imei2+"',serialN='"+data.serialN+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					
					res.write(JSON.stringify({"response":true}));
				     res.end(); 
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};


  
//POST
exports.guardar_locations = (req, res) => {
	var datar=req.body;
	console.log("Data Locations******",datar);
	var data=JSON.parse(datar.data);
		try{
			for(var i=0;i<data.length;i++){
				console.log("datai: ",data[i]);
				GuardarLatLng(data[i]);
			}
	/*  Customer.getLogin("INSERT INTO arm_validadores set imei='"+data.imei+"',mac='"+data.sim+"',fecha_registro=CURRENT_TIMESTAMP,placa='"+data.placa+"',num_vehiculo='"+data.num_vehiculo+"',encargado='',empresa='"+data.empresa+"',estado='0',MemberId='0',imei2='"+data.imei2+"',serialN='"+data.serialN+"'",(err, data) => {
			  if (err) 
				  { 
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					
					res.write(JSON.stringify({"response":true}));
				     res.end(); 
				  }
	  });*/
	res.write(JSON.stringify({"success":true}));
				     res.end(); 
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};

function GuardarLatLng(data){
	
	 
	try{

	var fecha=	data.fecha;
    var feca=new Date(fecha.substring(0,fecha.indexOf(".")-1));
	var timesNow=Math.floor(feca.getTime()/1000);
	console.log("fecha: "+fecha+"  --. feca: "+feca+" --. timesNow: "+timesNow+"  milliseconds ----. "+feca.getTime());
		

	Customer.getLogin ("INSERT INTO eventdata set accountID='Transporte',deviceID= '"+data.placa+"',statusCode='61572',latitude='"+data.latitud+"',longitude='"+data.longitud+"',speedKPH='0',timestamp="+timesNow+"", function (errorg, resultsg) {
	  if (errorg) 
	  {
		  console.log("Error ",errorg);
	  }else{
		  console.log("Full the location....*****");
	  }
	});

			

   


	
}catch(egf){
	console.log("Error 393...",egf);
}


}
//POST
exports.guardar_validador_conta = (req, res) => {
	var data=req.body;
	console.log("data_valida_conta",data);
		try{
	  Customer.getLogin("UPDATE arm_validadores set contador='"+data.contador+"' where placa='"+data.placa+"'",(err, dataf) => {
			  if (err)  
				  {  
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					Customer.getLogin ("INSERT INTO historial_contadores set placa='"+data.placa+"',contador='"+data.contador+"',kilometraje='"+data.kilometraje+"',inicial='"+data.inicial+"',viajesC='"+data.viajesC+"'",(error, results) => {});
					res.write(JSON.stringify({"response":true}));
				     res.end(); 
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};






//POST
exports.guardar_itag = (req, res) => {
	var data=req.body;
		try{
	  Customer.getLogin("INSERT INTO arm_validadores set imei='"+data.imei+"',mac='"+data.sim+"',fecha_registro=CURRENT_TIMESTAMP,placa='"+data.placa+"',num_vehiculo='"+data.num_vehiculo+"',encargado='',empresa='"+data.empresa+"',estado='1',MemberId='0'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify({"response":true}));
				     res.end(); 
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};




//POST	
exports.vincularNfc = (req, res) => {
var data=req.body;

	var userId,cardId;
		try{
			userId=data.user;
	        cardId=data.cardID;
			
	  Customer.getLogin("UPDATE arm_members set uuidcard='"+cardId+"' where Fax='"+userId+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify({"response":true}));
				     res.end(); 
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};





//POST
exports.vincularItag = (req, res) => {
var data=req.body;

	var userId,cardId;

console.log("VincularItag",req);
		try{
			userId=data.user;
	        cardId=data.cardID;
			
	  Customer.getLogin("UPDATE arm_members set uuidblue='"+cardId+"' where Fax='"+userId+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify({"response":true}));
				     res.end(); 
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};





//get
exports.getUserByUid = (req, res) => {
	
	var uid=req.param('id');
	
	  Customer.getLogin ("SELECT * FROM arm_members where uuidblue like '%"+uid+"%'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();    
				  }
	  });
	

	
};







//get
exports.getHistorialUserByMail = (req, res) => {
	
	var uid=req.param('id');
	
	  Customer.getLogin ("SELECT * FROM registro where cliente = '"+uid+"' order by unique_id desc;",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();    
				  }
	  });
	

	
};






//get
exports.getHistorialUserByItag = (req, res) => {
	
	var uid=req.param('id');
	
	  Customer.getLogin ("SELECT * FROM registro where vendedor = '"+uid+"' and tipo='Itag' order by unique_id desc;",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();    
				  }
	  });
	

	
};






//get
exports.getHistorialLiquidaciones = (req, res) => {
	
	var uid=req.param('id');
	
	  Customer.getLogin ("SELECT * FROM arm_liquidacion where Correo = '"+uid+"' order by id desc;",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();    
				  }
	  });
	

	
};



//get
exports.getUserByNfc = (req, res) => {
	
	var uid=req.param('id');
	
	  Customer.getLogin ("SELECT * FROM arm_members where uuidcard like '%"+uid+"%';",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();    
				  }
	  });
	
	
};




var contagg=0;
//get
exports.getUserID = (req, res) => {
	
	var uid=req.param('id');
	if(uid==''){
		contagg++;
		console.log("sin Fax..** "+contagg);
		res.write(JSON.stringify({'success':false}));
		res.end();   
	}else{
	  Customer.getLogin ("SELECT * FROM arm_members where Fax ='"+uid+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write('{"products":'+JSON.stringify(data)+',"success":1}');
					res.end();  
				  }
	  });
	}
	
};





//get
exports.getHistory = (req, res) => {
	
	var iduser=req.param('id');
	var qury="SELECT unique_id,cliente as mediador,vendedor as usuario,observa as tipoTransaccion,lat as latitud,lng as longitud,fecha as fecha_mediador,fechaserver,medio_pago,valor,tipo FROM registro where (vendedor='"+iduser+"' or cliente='"+iduser+"') order by unique_id desc;";
console.log("Query: getHistory: ",qury);	  
Customer.getLogin (qury,(err, data) => {
			
	  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					res.write(JSON.stringify(data));
					res.end();  
				  }
	  });
	
	
};





//get
exports.saldos = (req, res) => {
	
	var uid=req.param('id');
	
	  Customer.getLogin ("SELECT Points from arm_members where Fax='"+req.body.id+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					 var config=data[0];
					console.dir(data);
					var resule={"success":true,"data":data[0]};
				    var retoTo={"response":resule};
					console.dir(retoTo);
					res.write(JSON.stringify(resule));
					res.end(); 
				  }
	  });
	
	
};





//POST
exports.setBlueUUid = (req, res) => {
	
	var useName,Password,itag,conta; 
		try{
     useName=req.body.user;
     Password=req.body.pass;
     itag=req.body.Itag;
     conta=req.body.cont;
			
	  Customer.getLogin("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					   if(data.length>0){ 
					   
					   var config=data[0];
					  Customer.getLogin("UPDATE arm_members set uuidblue='"+itag+"' where UserName='"+useName+"' and Password='"+Password+"'", function (error, results) {
						Customer.getLogin("UPDATE arm_members set cont_itag='"+conta+"' where uuidblue='"+itag+"' and cont_itag<'"+conta+"'", function (error2, results) {
						try{
						//cones.end();
							// cones.destroy();
						}catch(er){}
						});



						});
							  var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario};
							res.write(JSON.stringify(resule));
							res.end(); 
					
					   }else{
						  res.write(JSON.stringify({"success":false,"msg":""}));
						  res.end();
						  console.log("Error en Login..  user o pass");
					  }
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};




//POST
exports.VincularConductor = (req, res) => {
	
var placa,itag;   
		try{
      placa=req.body.placa;
     itag=req.body.Itag;
			
	  Customer.getLogin("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					  
					    if(data.length>0){
					  

					   var config=data[0];
					  Customer.getLogin("UPDATE arm_members set uuidblue='"+itag+"' where UserName='"+useName+"' and Password='"+Password+"'", function (error, results) {
						Customer.getLogin("UPDATE arm_members set cont_itag='"+conta+"' where uuidblue='"+itag+"' and cont_itag<'"+conta+"'", function (error2, results) {
						try{
						//cones.end();
							// cones.destroy();
						}catch(er){}
						});



						});
					  var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario};
					res.write(JSON.stringify(resule));
					res.end(); 
						
						}else{
						  res.write(JSON.stringify({"success":false,"msg":""}));
						  res.end();
						  console.log("Error en Login..  user o pass");
					  }
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};


//POST
exports.validarRecarga = (req, res) => {
	
var codigo,idProducto,imei,timeserver,timedispo,timedif;  
var d = new Date();
var n = d.getMilliseconds();
		try{
    codigo   =req.body.codigo;
     idProducto  =req.body.idProducto;
     imei =req.body.imei;
	 timeserver=microTime.now()/1000;
	 timedispo=req.body.timedispo;
	 timedif=eval(timeserver-timedispo);
	 console.log("timeserver: "+timeserver+" timedispo: "+timedispo+" timedif: "+timedif);
			
	  Customer.getLogin("SELECT c.CouponId,c.CouponName,c.CouponCode,c.StartDate,c.EndDate,cp.ProductId,p.ProductName,p.Price from arm_coupon c , arm_coupon_product cp,arm_product p  where c.CouponId=cp.CouponId and p.ProductId=cp.ProductId and c.CouponCode='"+codigo.trim()+"' and c.Status='1' and DATE(c.StartDate)<= DATE(now()) and DATE(c.EndDate)>=DATE(now())",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'response':false}));
				     res.end();   
				  }else{
					  
					    if(data.length>0){
					  

					   var config=data[0];
					  Customer.getLogin("UPDATE arm_members set uuidblue='"+itag+"' where UserName='"+useName+"' and Password='"+Password+"'", function (error, results) {
						Customer.getLogin("UPDATE arm_members set cont_itag='"+conta+"' where uuidblue='"+itag+"' and cont_itag<'"+conta+"'", function (error2, results) {
						try{
						//cones.end();
							// cones.destroy();
						}catch(er){}
						});



						});
					  var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario};
					res.write(JSON.stringify(resule));
					res.end(); 
						
						}else{
						  res.write(JSON.stringify({"success":false,"msg":""}));
						  res.end();
						  console.log("Error en Login..  user o pass");
					  }
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};




//POST
exports.validarRecargaOK = (req, res) => {
	
var codigo,idProducto,imei,timeserver,timedispo,timedif;  

		try{
    codigo   =req.body.codigo;
    // idProducto  =req.body.idProducto;
	//var cones=getConection();
	//cones.connect();
     imei =req.body.imei;
	 
	
			
	  Customer.getLogin("SELECT *from arm_compras_history where Imei='"+imei+"' and status=1 and fecha "+
	 " between DATE_SUB(now(),INTERVAL 10 SECOND) and now() order by id desc;",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({"success":false,"msg":"Codigo Incorrecto","cupon":codigo,"data":""}));
				res.end();
				  }else{
					  
					  var ObjCompras=result[0];
						 if(ObjCompras){
						 if(ObjCompras.timeDispo>0){
						   res.write(JSON.stringify({"success":true,"msg":"ok","cupon":codigo,"data":""}));
							res.end();
							
							 Customer.getLogin("UPDATE arm_compras_history set status=0 where Imei='"+imei+"' and status=1",function(erj,resj){
								if(erj){}
								else{
									console.log("Acutlizacion OK.. para lectura de nuevo QR..");
								}
							});
							
						 }else{
							 res.write(JSON.stringify({"success":false,"msg":"Codigo Incorrecto","cupon":codigo,"data":""}));
							res.end();
						 }
						 }else{
							  res.write(JSON.stringify({"success":false,"msg":"Codigo Incorrecto","cupon":codigo,"data":""}));
							res.end();
						 }
						 try{
						  // cones.end();
				// cones.destroy();
				 }catch(er){}
				  }
	  });
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};




//get
exports.getTime = (req, res) => {
	
	var timeSer=Math.floor(microTime.now()/1000000);
	res.write(JSON.stringify({"time":timeSer}));
    res.end();  
	
};






//POST
exports.registro = (req, res) => {
	
var useName,Password,imei,nombre,telefono,email;

		try{
    nombre   =req.body.name;
     useName  =req.body.username;
     Password =req.body.password;
	 email     =req.body.email;
	 imei     =req.body.imei;
	 telefono =req.body.telefono;
	 
	
			
	  Customer.getLogin("SELECT *from arm_members where UserName='"+useName+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({"success":false,"msg":"Codigo Incorrecto","cupon":codigo,"data":""}));
				res.end();
				  }else{
						if(results.length>0){
						  res.write(JSON.stringify({"success":false,"msg":"El Nombre de Usuario ya fue usado."}));
						  res.end();
						  console.log("Error en Login..");
  
   
					  }else{
						  
						    Customer.getLogin("SELECT *from arm_members where Email='"+email+"'", function (error, results) {
							  if (error) 
								  {
								   console.log(error);
								  //throw error;
							  }else{
								  
								  //throw error;
							  if(results.length>0){
								  res.write(JSON.stringify({"success":false,"msg":"El Correo Electronico ya fue asignado."}));
								  res.end();
								  console.log("Error en Login..");
							  
							   
							  }else{
								  
								 var querys="INSERT into arm_members set Fullnames='"+nombre+"',Email='"+email+"',UserName='"+useName+"',Password='"+Password+"',Phone='"+telefono+"',Fax='"+imei+"',MemberStatus='Active'"; 
								   console.log(querys);
							 Customer.getLogin(querys, function(errS, rows) {
							    if (!errS){
								
								try{
								
								    var resule={"success":true,"data":[],"age":1,"name":useName};
									var retoTo={"response":resule};
									res.write(JSON.stringify(resule));
									 res.end();  
							    }catch (err){console.log(err);}
							}else{
								 // cones.end();
								// cones.destroy();
								     res.write(JSON.stringify({"success":false,"msg":"Error al crear el registro de usuario."+errS}));
									 res.end();  
								     console.log('Error en Query.'+err);
						
							}
							});
								  
								
									 
							  }
								  }
							  });
						  
					  }
				  }
	  });
				  
	 
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};




//POST
exports.getQRContactoP = (req, res) => {
	
	var useName,Password,imei;
	
	 imei=req.body.imei;
	
	  Customer.getLogin ("SELECT *from arm_members where Fax='"+imei+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					  if(data.length>0){
  
					   var config=data[0];
					
						    var resule={"success":true,"data":config,"age":1,"imei":imei};
							var retoTo={"response":resule};							
							var resuler=JSON.stringify(resule);
							res.write(resuler);
							console.log("resuler",resuler);
							 res.end();  
					  }else{
						  res.write(JSON.stringify({"success":false,"msg":""}));
						  res.end();
						  console.log("Error en Login..");
					  }
				  }
	  });
	
	
};



//POST
exports.getQRContacto = (req, res) => {
	
	var useName,Password,imei;
	
	 imei=req.body.imei;
	
	  Customer.getLogin ("SELECT *from arm_members where Fax='"+imei+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					  if(data.length>0){
  
					   var config=data[0];
					
						    var resule={"success":true,"data":config,"age":1,"imei":imei};
							var retoTo={"response":resule};							
							var resuler=JSON.stringify(resule);
							res.write(resuler);
							console.log("resuler",resuler);
							 res.end();  
					  }else{
						  res.write(JSON.stringify({"success":false,"msg":""}));
						  res.end();
						  console.log("Error en Login..");
					  }
				  }
	  });
	
	
};







//POST
exports.registroP = (req, res) => {
	
var useName,Password,imei,nombre,telefono,email,miTokenF;   

		try{
    nombre   =req.body.name;
     useName  =req.body.username;
     Password =req.body.password;
	 email     =req.body.email;
	 imei     =req.body.imei;
	 telefono =req.body.telefono;
	miTokenF  = req.body.miTokenF;
	 
	
			
	  Customer.getLogin("SELECT *from arm_members where UserName='"+useName+"'",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({"success":false,"msg":"Codigo Incorrecto","cupon":codigo,"data":""}));
				res.end();
				  }else{
						if(results.length>0){
						  res.write(JSON.stringify({"success":false,"msg":"El Nombre de Usuario ya fue usado."}));
						  res.end();
						  console.log("Error en Login..");
  
   
					  }else{
						  
						    Customer.getLogin("SELECT *from arm_members where Email='"+email+"'", function (error, results) {
							  if (error) 
								  {
								   console.log(error);
								  //throw error;
							  }else{
								  
								  //throw error;
							  if(results.length>0){
								  res.write(JSON.stringify({"success":false,"msg":"El Correo Electronico ya fue asignado."}));
								  res.end();
								  console.log("Error en Login..");
							  
							   
							  }else{
								  
								    Customer.getLogin("SELECT *from arm_members where Email='"+email+"'", function (error, resultsX) {
							  if (error) 
								  {
								    res.write(JSON.stringify({"success":false,"msg":"El Telefono  ya fue asignado."}));
								res.end();
									console.log("Error en Login..");
								  //throw error;
							  }else{
								  
								  if(resultsX.length>0){
									  
								  }  else{
								  
									 var querys="INSERT into arm_members set Fullnames='"+nombre+"',Email='"+email+"',UserName='"+useName+"',Password='"+Password+"',Phone='"+telefono+"',Fax='"+imei+"',MemberStatus='Active',Salt='"+miTokenF+"'"; 
									   console.log(querys);
								 Customer.getLogin(querys, function(errS, rows) {
									if (!errS){
									
										var resule={"success":true,"data":[],"age":1,"name":useName};
										var retoTo={"response":resule};
										var valorRegist= ValorPasajeNormal*2;
											var querh = "INSERT INTO registro (unique_id, cliente, vendedor, observa, lat, lng,fecha,tiempo,otrocampo,valor,medio_pago,idCliente,tipo) "+
										"VALUES(null, 'Solobus', '"+imei+"', 'Recarga', '0','0', now(),'Registro Inicial','Registro Inicial','"+valorRegist+"','QR',68,'Recarga')";
										 Customer.getLogin(querh, function(errh, rowsh) {
											
										})
										
										//console.log("resule",resule);
										res.write(JSON.stringify(resule));
										 res.end(); 
								}else{
									 // cones.end();
									// cones.destroy();
										 res.write(JSON.stringify({"success":false,"msg":"Error al crear el registro de usuario."+errS}));
										 res.end();  
										 console.log('Error en Query.'+err);
							
								}
								});
							  
							  
								  }
							  
							  }
							  
									});
								  
								
									 
							  }
								  }
							  });
						  
					  }
				  }
	  });
				  
	 
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};






//POST
exports.registroP_mail = (req, res) => {
	
var useName,Password,imei,nombre,telefono,email,miTokenF,codigoV,genero,numerodoc;   

		try{
     nombre   =req.body.name;
     useName  =req.body.username;
     Password =req.body.password;
	 codigoV=req.body.codigo;
   email     =req.body.email;
	 imei     =req.body.imei;
	 telefono =req.body.telefono;
	miTokenF  = req.body.miTokenF;
	genero= req.body.Gender;
	numerodoc= req.body.DocumentNumber;
	
		
 Customer.getLogin("SELECT *from mail_codes where email='"+email+"' and codigo='"+codigoV+"'", function (error, results) {
  if (error) throw error;
  if(results.length>0){	
	
	
 Customer.getLogin("SELECT *from arm_members where UserName='"+useName+"'", function (error, resultss) {
  if (error) throw error;
  if(resultss.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Nombre de Usuario ya fue usado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  Customer.getLogin("SELECT *from arm_members where Email='"+email+"'", function (error, results) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Correo Electronico ya fue asignado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  
	  	  Customer.getLogin("SELECT *from arm_members where Phone='"+telefono+"'", function (error, results) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Telefono  ya fue asignado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	   
	  
	 var querys="INSERT into arm_members set Fullnames='"+nombre+"',Email='"+email+"',UserName='"+useName+"',Password='"+Password+"',Phone='"+telefono+"',Fax='"+imei+"',MemberStatus='Active',Salt='"+miTokenF+"',Gender='"+genero+"',DocumentNumber='"+numerodoc+"',DateAdded=(NOW()- INTERVAL 5 HOUR),BirthDate=(NOW()- INTERVAL 5 HOUR)"; 
	   console.log(querys);
Customer.getLogin(querys, function(err, rows) {
 if (!err){
	 try{
	 // cones.end();
	// cones.destroy();
	 }catch(er){}
	try{
   //  cones.end();
	  // var config=results[0];
//console.log("result member",results);
	var resule={"success":true,"data":[],"age":1,"name":useName};
		var retoTo={"response":resule};
		
			var querh = "INSERT INTO registro (unique_id, cliente, vendedor, observa, lat, lng,fecha,tiempo,otrocampo,valor,medio_pago,idCliente,tipo) "+
		"VALUES(null, 'Solobus', '"+imei+"', 'Recarga', '0','0', now(),'','Registro Inicial','4800','QR',68,'Registro Inicial')";
		Customer.getLogin(querh, function(errh, rowsh) {
			
		})
		
		//console.log("resule",resule);
		res.write(JSON.stringify(resule));
		 res.end();  
}catch (err){console.log(err);}
}else{
	
	res.write(JSON.stringify({"success":false,"msg":"Error al crear el registro de usuario."+err}));
		 res.end();  
    console.log('Error en Query.'+err);
	try{
	  //cones.end();
	 //cones.destroy();
	 }catch(er){}
try{
    // cones.end();
}catch (err){console.log(err);}
}
});
	  
  }
		  });
		 
  }

  });
  }
   
});

  }else{
	  
	 res.write(JSON.stringify({"success":false,"msg":"EL codigo de confirmacion no es correcto."}));
		 res.end();   
	  
  }
});
	



			  
	 
	
	}catch(egf){
		console.log("Error 407...",egf);
	}
	
};





//POST
exports.transferir = (req, res) => {
	
var miImei,cantid,imei; 
		try{
     imei=req.body.imei;
	 cantid=req.body.cantidad;
     miImei=req.body.miImei;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}

	  Customer.getLogin ("SELECT *from arm_members where Fax='"+miImei+"' and Points>="+cantid+"",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					  
					  
					  if(results.length>0){
						  
					   var config=results[0];
					   
					   Customer.getLogin("update arm_members set Points=Points+"+cantid+" where Fax='"+imei+"'", function (error2, results2) {
					  if (error2) 
						  {
						   console.log(error2);
						  
					  }else{
						  try{
						  transferire(miImei,imei,cantid,res,"Transferencia");
						  }catch(Er){}
					
					Customer.getLogin("update arm_members set Points=Points-"+cantid+" where Fax='"+miImei+"'", function (error2, results2) {
					  if (error2) 
						  {
						   console.log(error2);
						  //throw error;
					  }else{
					 var timeserver=Math.floor(microTime.now()/1000000);
					  
					  Customer.getLogin("INSERT INTO arm_compras_history set CouponId='',Imei='"+miImei+"',producto='',valor='"+cantid+"',timeDispo='"+timeserver+"',concepto='transferir',receptor='"+imei+"'",function(error3, results3){
						  
					  if (error3) 
						  {
							
						   console.log(error2);
						  
						  }else{
					  
						    var resule={"success":true,"data":"","imei":imei};
							
							var resuler=JSON.stringify(resule);
							res.write(resuler);
							console.log("resuler",resuler);
							 res.end(); 
							
					  }
					  });

					  
					  }
					});
					  
					  }
					   });  
							 
					  }else{
						  res.write(JSON.stringify({"success":false,"msg":""}));
						  res.end();
						  console.log("Error en transferir..");
					  }
					  
					  
					  
					res.write('{"products":'+JSON.stringify(data)+',"success":1}');
					res.end();  
				  }
	  });
	
	
};



//POST
exports.transferirP = (req, res) => {
	
var miImei,cantid,imei;  
		try{
     imei=req.body.imei;
	 cantid=req.body.cantidad;
     miImei=req.body.miImei;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}

	  Customer.getLogin ("SELECT *from arm_members where Fax='"+miImei+"' and Points>="+cantid+"",(err, data) => {
			  if (err) 
				  {
					 res.write(JSON.stringify({'success':false}));
				     res.end();   
				  }else{
					  
					  
					  if(data.length>0){
						  
					   Customer.getLogin ("select Fullnames from arm_members where UserName='"+imei+"'", function (errorFL, resultsFL) {
  
						  var nombreFull=resultsFL[0].Fullnames;
						   var config=data[0];
						   
						    Customer.getLogin ("update arm_members set Points=Points+"+cantid+" where UserName='"+imei+"'", function (error2, results2) {
						  if (error2) 
							  {
							   console.log(error2);
							  //throw error;
						  }else{
							  try{
							  transferire(miImei,imei,cantid,res,"Transferencia");
							  }catch(Er){}
						//console.log("result member",results);
						 Customer.getLogin ("update arm_members set Points=Points-"+cantid+" where Fax='"+miImei+"'", function (error2, results2) {
						  if (error2) 
							  {
							   console.log(error2);
							  //throw error;
						  }else{
						// var timeserver=Math.floor(microTime.now()/1000000);
								var querh = "INSERT INTO registro (unique_id, cliente, vendedor, observa, lat, lng,fecha,tiempo,tipo,otrocampo,valor,medio_pago,idCliente) "+
								"VALUES(null, '"+imei+"', '"+miImei+"', 'Transferencia', '0','0', now(),'Transferencia','Transferencia','"+nombreFull+"','"+cantid+"','QR',68)";

						   Customer.getLogin (querh,function(error3, results3){
							  
						  if (error3) 
							  {
							   console.log(error2);
							  //throw error;
						  }else{
						  
							var resule={"success":true,"data":"","imei":imei};
								var retoTo={"response":resule};
								//console.log("resule",resule);
								var resuler=JSON.stringify(resule);
								res.write(resuler);
								console.log("resuler",resuler);
								 res.end(); 
						  }
						  });

						  
						  }
						});
						  
						  }
						   });  
								
						}); 
							 
					  }else{
						  res.write(JSON.stringify({"success":false,"msg":""}));
						  res.end();
						  console.log("Error en transferir..");
					  }
					  
					  
					  
					res.write('{"products":'+JSON.stringify(data)+',"success":1}');
					res.end();  
				  }
	  });
	
	
};





//POST
exports.sendMailConfirma = (req, res) => {
var codigoALe= between(100000, 899999);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'paytransvalidadores@gmail.com',
            pass: 'p3nt4gr4m4'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'paytransvalidadores@gmail.com',
    to: req.body.mail,
    subject: 'Codigo de verificacion PayBus',
    text: 'Su codigo de verificacion es: '+codigoALe
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
	//	var cones=getConection22();
	//cones.connect();
		  Customer.getLogin ("INSERT INTO mail_codes set email='"+req.body.mail+"',codigo='"+codigoALe+"'",function(error3, results3){
	  
  if (error3) 
	  {
	   console.log(error2);
	  //throw error;
  }else{
  
	console.log("Ok insert code");
  }
  });
  
    }
});
};



// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};




// Almacena Token FCM..
exports.registroGCM = (req, res) => {
var idToken=req.query.IdToken;
var id=req.query.id;
var queryInserUpd="";
  Customer.getLogin ("select *from ee_tokens where idUsuario='"+id+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Error en conexion a BD.."
      });
    }else{ 

if(data[0].idToken){
queryInserUpd="update ee_tokens set idToken='"+idToken+"' where idUsuario='"+id+"'";
}else{
queryInserUpd="INSERT INTO ee_tokens set idToken='"+idToken+"',idUsuario='"+id+"'";
}
 Customer.getLogin (queryInserUpd,(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "No fue posible actualizar el dato token."
      });
    }else{
res.send([{'succes':1}]);
}
});



}
  });
};


// Find a single Reg
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete un cliente con Especifico ID.
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") { 
        res.status(404).send({
          message: `No se encontro el registro con el ID ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar el cliente con id " + req.params.customerId
        });
      }
    } else res.send({ message: `Cliente fue eliminado exitosamente!` });
  });
};




function envioFCM(tokenFire,mensaje,titulo,datar){
	
	console.log("Enviando fcm");
	
	
	
	//var too="evs06cvIk0o:APA91bGP9ddRCDPxFowVinh-oHqSD5LuaNN7v_nh5t8vWORYOTIzUu6yZPAWhaUF-dmzmqk0_MtKY4zFEad9eSzPDBxg0WytYRk-M6qfaEG-rEZadSZhDEMBr5Fi6yv94KwecKsTXD38";
	var too= tokenFire;
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: too, 
        collapse_key: 'EmpresturEmtelco',
        
      /*  notification: {
            title: titulo, 
            body: mensaje 
        },*/
        time_to_live:10,
        data:datar,
		"android": {
			"priority": "alta",
			},
 	    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
	     console.dir(err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
	
		
	
}


function envioFCM2(tokenFire,mensaje,titulo,datar,idSol){
	
	console.log("Enviando fcm");
	
	
	
	//var too="evs06cvIk0o:APA91bGP9ddRCDPxFowVinh-oHqSD5LuaNN7v_nh5t8vWORYOTIzUu6yZPAWhaUF-dmzmqk0_MtKY4zFEad9eSzPDBxg0WytYRk-M6qfaEG-rEZadSZhDEMBr5Fi6yv94KwecKsTXD38";
	var too= tokenFire;
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: too, 
        collapse_key: 'EmpresturEmtelco_'+idSol,
        
      /*  notification: {
            title: titulo, 
            body: mensaje 
        },*/
        time_to_live:10,
        data:datar,
		"android": {
			"priority": "alta",
			},
 	    };
    
	console.log("MessageFire****",message);
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
	     console.dir(err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
	
		
	
}




function hex_to_ascii(str1)
 {
  var hex  = str1.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
 }



function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}


function transferire(miImei,imei,canti,res,tipo){
	
	 try{
        var args = {
    data: {"data":{
		"tipo":tipo,
        "from":miImei,
		"to":imei,
		"amount":canti
	}
    },
    headers: { "Content-Type": "application/json" }
};
 
client.post("http://67.205.76.93:3001/mine", args, function (data, response) {

});
    }catch (ero){console.log("Error Cath74 main.js",ero);}

}