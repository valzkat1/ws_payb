var net = require('net');
var cantiDispos=0;
var express = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var variable = require('./variables');
var app = express();
var microTime = require('microtime');
var nodemailer = require('nodemailer');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

 

var Client = require('node-rest-client').Client;
var client = new Client();

app.listen(3539);


var ValorPasajeNormal=0;


const getConection22=()=>{
//	console.log('get cone desde filedir.');

var connection = mysql.createConnection({
  host     : variable.mysqlHost,  
  user     : variable.mysqlUser,
  password : variable.mysqlPass,
  database : variable.mysqlDB
});

return connection;
};

const getConection=()=>{
//	console.log('get cone desde filedir.');

var connection = mysql.createConnection({
	host     : variable.mysqlHost,  
	user     : variable.mysqlUser,
	password : variable.mysqlPass,
	database : variable.mysqlDB
});
return connection;
};


var cones=getConection22();
	cones.connect();



   cones.query("SELECT valor from tarifas where tipo='Normal';", function (error2, results2, fields2) {
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


app.post('/', function(req, res) {

  //  console.log('Request de CMD..',req);
    var idDevi,CMD,secretVar;
    //secretVar=req.query.secret;
   
    console.dir(req.query);
    console.dir("Device buscado: "+idDevi);

   res.write('ok');
 res.end();  
    


});


app.get('/ApiTime', function(req, res) {

  var timeStamp = (Math.floor(Date.now() / 1000));
timeStamp =timeStamp +10;
 res.write(JSON.stringify({'time':timeStamp}));
   res.end();  
    


});

app.get('/ApkVersion', function(req, res) {

   cones.query("SELECT * from blueval_version order by id limit 1", function (error2, results2, fields2) {
	  if (error2) {
	   console.log(error2);
	  //throw error;
  }else{
		//var retoTo={"config":config,"productos":results2};
	  var retoTo={'success':true,'data':results2[0]};
		res.write(JSON.stringify(retoTo));
 //res.write(JSON.stringify({'success':true,'data':{'code':7,'version':'1.4','content':'Se controla el touch Screen en la camara y se crea la funcion de Update APK por medio de QR','downloadUrl':'https://paytrans.red/apks/blueVal_1.4.apk','time':'2021-02-25 02:04','appType':'blueVal'}}));

		 res.end();  
}
	});


  
   //res.end();  
    


});


var conte=0;
app.post('/CMD', function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conte++;
    
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Strings",conte);
	//var cones=getConection();
	//cones.connect();
	var timeSer=Math.floor(microTime.now()/1000000);
	
cones.query("SELECT *from usuarios_config where id='32'", function (error, results, fields) {
  if (error) 
  {
	   console.log(error);
	  //throw error;
  }else
	  
   var config=results[0];

	cones.query("SELECT ProductId,ProductName,Price from arm_product", function (error2, results2, fields2) {
	  if (error2) {
	   console.log(error2);
	  //throw error;
  }else
		//var retoTo={"config":config,"productos":results2};
	  var retoTo={"config":config,"productos":results2,"tiempo":{"time":timeSer}};
		res.write(JSON.stringify(retoTo));
		 res.end();  
	});
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 


app.get('/CMD', function(req, res) {
		res.setHeader("Content-Type", "application/json; charset=utf-8");

//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conte++;
    
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Strings",conte);
	//var cones=getConection();
	//cones.connect();
	
		var timeSer=Math.floor(microTime.now()/1000000);

	
cones.query("SELECT *from usuarios_config where id='32'", function (error, results, fields) {
  if (error)
{
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  
   var config=results[0];

	cones.query("SELECT ProductId,ProductName,Price from arm_product", function (error2, results2, fields2) {
	  if (error2) 
		  {
	   console.log(error2);
	  //throw error;
  }else
	  //throw error2;
		var retoTo={"config":config,"productos":results2,"tiempo":{"time":timeSer}};
		res.write(JSON.stringify(retoTo));
		 res.end();  
	});
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 

 

app.get('/noticias', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conte++;
    
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Strings",req.params.id);
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT NewsHeader as webTitle,(DateAdded) as webPublicationDate,Type as sectionName,Image as webUrl, NewsDescription as author from arm_news where Status='1'", function (error, results, fields) {
  if (error) 
	{
	   console.log(error);
	  //throw error;
  }else  
  //throw error;
  
   var config=results[0];

	var resule={"status":"ok","results":[]};
		var retoTo={"response":resule};
		
		res.write(JSON.stringify(retoTo));
		 res.end();  
	
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 


app.post('/ticketes', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
conte++;
    
	var respu={};
   
//	var cones=getConection();
//	cones.connect();
	
cones.query("SELECT ProductId as ProductID,ProductName,Description,Price,IMG_URL,CatId as cartid FROM arm_product where lu_categoria='Ticket'", function (error, results, fields) {
  if (error) 
  {
	   console.log(error);
  }else
	  
   var config=results[0];

	var resule={"status":"ok","results":results};
		var retoTo={"response":resule};
		
		res.write(JSON.stringify(results));
		 res.end();  
	
   
});
	
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	    
    

}); 

app.post('/sdrink', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
conte++;
    
	var respu={};
    console.log("Request Android Strings",req.param('id'));
//	var cones=getConection();
//	cones.connect();
	
cones.query("SELECT ProductId as ProductID,ProductName,Description,Price,IMG_URL,CatId as cartid FROM arm_product where lu_categoria='Producto'", function (error, results, fields) {
  if (error) 
  {
	   console.log(error);
  }else
	  
   var config=results[0];

	var resule={"status":"ok","results":results};
		var retoTo={"response":resule};
		
		res.write(JSON.stringify(results));
		 res.end();  
	
   
});
	
    
	    
    

}); 


app.post('/getUsers', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
//	var cones=getConection();
//	cones.connect();
	
cones.query("SELECT UserName,Fax,Points,fiados FROM arm_members where Fax<>''", function (error, results, fields) {
  if (error) 
  {
	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 


app.post('/setUsers', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var datos=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
//	var cones=getConection();
//	cones.connect();
	var updates;
	var isOK=[];
	var isBad=[];
	try{
	updates=datos.updates;	
	if(updates.length>0){
		for(var h=0;h<updates.length;h++){
			var points,fiados,fax;
			
			cones.query("UPDATE arm_members set Points=Points-'"+updates[h].fiados+"',fiados='0' where Fax='"+updates[h].imei+"'", function (error, results, fields) {
		  if (error) 
		  {
			  isBad[isBad.length]={"imei":updates[h].imei};
			   console.log(error);
		  }else
			  
			{	
				isOK[isOK.length]={"imei":updates[h].imei};
			}
		   
		});
		if(h<(updates.length-1)){
			
		}else{
			
			res.write(JSON.stringify({"ok":isOK,"bad":isBad}));
				 res.end();  
		}
		}
		
	}else{
		console.log("No hay dataUpdates sinc... ");
	}
		
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	

	
    
	    
    

}); 



/*{"tag":"guardar_payb","vendedor":"356399081318483","cliente":"Solobus","observa":"Viaje","lat":"","lng":"","tiempo":"","tipoServ":"","campoAdicio":"","bateria":"","mediop":"QR","fecha":"2020-07-04 06:30:00"}*/
app.post('/guardar_payb', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var data=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	var vendedor,cliente,observa,lat,lng,tiempo,tipoServ,campoAdicio,bateria,mediop,fecha,contador,placa;
	var isOK=[];
	var isBad=[];
	try{
	
	 contador=data.contador;
	 placa=data.placa;
	
var querh="UPDATE arm_members set  Points=Points-"+ValorPasajeNormal+" where Fax='"+data.cliente+"'";
		console.log("querh**",querh);	
			cones.query(querh, function (error, results, fields) {
		  if (error) 
		  {
cones.query("UPDATE arm_members set  cont_itag='"+contador+"' where uuidblue='"+data.uuidBlu+"' and cont_itag<'"+contador+"'", function (error2, results2, fields2) {});

			  res.write(JSON.stringify({"response":false}));
				 res.end(); 
		  }else
			  
			{	
				cones.query("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente=68,placa='"+placa+"'", function (errorg, resultsg, fieldsg) {
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
	

	
    
	    
    

}); 


app.post('/guardar_payb_nfc', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var data=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	var vendedor,cliente,observa,lat,lng,tiempo,tipoServ,campoAdicio,bateria,mediop,fecha,contador,nfcID,placa;
	var isOK=[];
	var isBad=[];
	try{
	
	 contador=data.contador;
	 placa=data.placa;
var querh="UPDATE arm_members set  Points=Points-"+ValorPasajeNormal+" where uuidcard='"+data.nfcID+"'";
		console.log("querh**",querh);	
			cones.query(querh, function (error, results, fields) {
		  if (error) 
		  {
//cones.query("UPDATE arm_members set  cont_itag='"+contador+"' where uuidblue='"+data.uuidBlu+"' and cont_itag<'"+contador+"'", function (error2, results2, fields2) {});

			  res.write(JSON.stringify({"response":false}));
				 res.end(); 
		  }else
			  
			{	
				cones.query("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',baterialevel='"+data.bateria+"',idCliente=68,placa='"+placa+"'", function (errorg, resultsg, fieldsg) {
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
	

	
    
	    
    

}); 



app.post('/guardar_payb_tag', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var data=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	var vendedor,cliente,observa,lat,lng,tiempo,tipoServ,campoAdicio,bateria,mediop,fecha,contador,placa;
	var isOK=[];
	var isBad=[];
	try{
	
	 contador=data.contador;
	placa=data.placa;
		//console.log("querh**",querh);	
		
			  
				
				cones.query("INSERT INTO registro set cliente='"+data.cliente+"',vendedor='"+data.uuidBlu+"',observa='"+data.observa+"',lat='"+data.lat+"',lng='"+data.lng+"',fecha='"+data.fecha+"',tipo='"+data.mediop+"',valor='"+ValorPasajeNormal+"',idCliente=68,placa='"+placa+"'", function (errorg, resultsg, fieldsg) {
		  if (errorg) 
		  {
			  console.log("Error ",errorg);
		  }else{
			  console.log("Full insert valida a la primera the best....*****");
		  }
				});
			
			
			
				cones.query("update arm_members set cont_itag='"+data.contador+"' where uuidblue='"+data.uuidBlu+"'", function (errorg, resultsg, fieldsg) {
		  if (errorg) 
		  {
			  console.log("Error ",errorg);
		  }else{
			  console.log("Full insert valida a la primera the best....*****");
		  }
				});
			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
			
		   
		
	
			
			 
		
		
		
	
		
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	

	
    
	    
    

}); 




app.post('/guardar_validador', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var data=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
	var isOK=[];
	var isBad=[];
	try{
	
	
		//console.log("querh**",querh);	
		
			  
				
				cones.query("INSERT INTO arm_validadores set imei='"+data.imei+"',mac='"+data.sim+"',fecha_registro=CURRENT_TIMESTAMP,placa='"+data.placa+"',num_vehiculo='"+data.num_vehiculo+"',encargado='',empresa='"+data.empresa+"',estado='0',MemberId='0',imei2='"+data.imei2+"',serialN='"+data.serialN+"'", function (errorg, resultsg, fieldsg) {
		  if (errorg) 
		  {
			  console.log("Error ",errorg);
		  }else{
			  console.log("Full insert valida a la primera the best....*****");
		  }
				});
			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
			
		   
		
	
			
			 
		
		
		
	
		
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	

	
    
	    
    

}); 







app.post('/guardar_itag', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var data=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
	var isOK=[];
	var isBad=[];
	try{
	
	
		//console.log("querh**",querh);	
		
			  
				
				cones.query("INSERT INTO arm_validadores set imei='"+data.imei+"',mac='"+data.sim+"',fecha_registro=CURRENT_TIMESTAMP,placa='"+data.placa+"',num_vehiculo='"+data.num_vehiculo+"',encargado='',empresa='"+data.empresa+"',estado='1',MemberId='0'", function (errorg, resultsg, fieldsg) {
		  if (errorg) 
		  {
			  console.log("Error ",errorg);
		  }else{
			  console.log("Full insert valida a la primera the best....*****");
		  }
				});
			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
			
		   
		
	
			
			 
		
		
		
	
		
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	

	
    
	    
    

}); 





app.post('/vincularNfc', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var data=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
	
	var userId,cardId;
	var isOK=[];
	var isBad=[];
	try{
	
	userId=data.user;
	cardId=data.cardID;
		
			  
				
				cones.query("UPDATE arm_members set uuidcard='"+cardId+"' where Fax='"+userId+"'", function (errorg, resultsg, fieldsg) {
		  if (errorg) 
		  {
			  console.log("Error update nfc",errorg);
		  }else{
			  console.log("Full update nfc.*****");
		  }
				});
			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
			
		   
		
	
			
			 
		
		
		
	
		
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	

	
    
	    
    

}); 




app.post('/vincularItag', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");
var data=req.body;
conte++;
    console.log(req.body);
	console.log(req.params);
	var respu={};
	
	var userId,cardId;
	var isOK=[];
	var isBad=[];
	try{
	
	userId=data.user;
	cardId=data.cardID;
		
			  
				
				cones.query("UPDATE arm_members set uuidblue='"+cardId+"' where Fax='"+userId+"'", function (errorg, resultsg, fieldsg) {
		  if (errorg) 
		  {
			  console.log("Error update nfc",errorg);
		  }else{
			  console.log("Full update nfc.*****");
		  }
				});
			
				res.write(JSON.stringify({"response":true}));
				 res.end(); 
			
		   
		
	
			
			 
		
		
		
	
		
		
	}catch(egf){
		console.log("Error 393...",egf);
	}
	

	
    
	    
    

}); 




app.get('/getUsers', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
//	cones.connect();
	
cones.query("SELECT UserName,Fax,Points,fiados FROM arm_members where Fax<>''", function (error, results, fields) {
  if (error) 
  {
	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 





app.get('/getUserByUid', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
var uid=req.param('id');
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT * FROM arm_members where uuidblue like '%"+uid+"%'", function (error, results, fields) {
  if (error) 
  {
res.write("Error");
		 res.end();  

	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 



app.get('/getHistorialUserByMail', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
var uid=req.param('id');
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT * FROM registro where cliente = '"+uid+"' order by unique_id desc;", function (error, results, fields) {
  if (error) 
  {
res.write("Error");
		 res.end();  

	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 





app.get('/getHistorialUserByItag', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
var uid=req.param('id');
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT * FROM registro where vendedor = '"+uid+"' order by unique_id desc;", function (error, results, fields) {
  if (error) 
  {
res.write("Error");
		 res.end();  

	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 




app.get('/getHistorialLiquidaciones', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
var uid=req.param('id');
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT * FROM arm_liquidacion where Correo = '"+uid+"' order by id desc;", function (error, results, fields) {
  if (error) 
  {
res.write("Error");
		 res.end();  

	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 



app.get('/getUserByNfc', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
var uid=req.param('id');
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT * FROM arm_members where uuidcard like '%"+uid+"%'", function (error, results, fields) {
  if (error) 
  {
res.write("Error");
		 res.end();  

	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 



app.get('/getUserID', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
var uid=req.param('id');
    //console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT * FROM arm_members where Fax ='"+uid+"'", function (error, results, fields) {
  if (error) 
  {
res.write("Error");
		 res.end();  

	   console.log(error);
  }else
	  
  	{	
		res.write('{"products":'+JSON.stringify(results)+',"success":1}');
		 res.end();  
	}
   
});
	
    
	    
    

}); 



app.get('/getHistory', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader("Content-Type", "application/json; charset=utf-8");

conte++;
    
	var respu={};
var iduser=    req.param('id');
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT unique_id,cliente as mediador,vendedor as usuario,observa as tipoTransaccion,lat as latitud,lng as longitud,fecha as fecha_mediador,fechaserver,medio_pago,valor,tipo FROM registro where (vendedor='"+iduser+"' or cliente='"+iduser+"')", function (error, results, fields) {
  if (error) 
  {
	   console.log(error);
  }else
	  
  	{	
		res.write(JSON.stringify(results));
		 res.end();  
	}
   
});
	
    
	    
    

}); 






app.post('/cart_retrieve', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
conte++;
    
	var respu={};
    console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	var id=req.body.txtUsername;
	
cones.query("SELECT * FROM cart WHERE customer = '"+id+"' ORDER BY name ASC", function (error, results, fields) {
  if (error) 
  {
	   console.log(error);
  }else
	  
   var config=results[0];

	var resule={"status":"ok","results":results};
		var retoTo={"response":resule};
		
		res.write(JSON.stringify(results));
		 res.end();  
	
   
});
	
    
	    
    

}); 




app.post('/cart_retrive_orden', function(req, res) {
 
res.setHeader('Access-Control-Allow-Origin', '*');
conte++;
    
	var respu={};
   // console.log("Request Android Strings",req.param('id'));
	//var cones=getConection();
	//cones.connect();
	var id=req.body.IMEI;
	var user=req.body.user;
cones.query("SELECT sum(quantity*price) as totale,sum(quantity) as cantidade FROM cart WHERE customer = '"+user+"'", function (error, results, fields) {
  if (error) 
  {
	   	console.log(error);
		res.write("Error");
		 res.end();
  }else
	{  
  
if(results.length>0){
var valorLCH= results[0].totale;
var qty= results[0].cantidade;
var query22="Insert into `order`(OrderDate,OrderName,Description,Quantity,TotalPrice,PickupTime,CustomerID,IMG_URL,total_lch) values "+
					" (CURDATE(),'"+user+"','Pedido con Billetera PayBus','"+qty+"','"+valorLCH+"','00:00:00','"+id+"','','0')";

cones.query("SELECT sum(quantity*price) as totale,sum(quantity) as cantidade FROM cart WHERE customer = '"+user+"'", function (error, results, fields) {
  if (error) 
  {
	   	console.log(error);
		res.write("Error");
		 res.end();
  }else
	{
}
});

}
	
   }
});
	
    
	    
    

}); 




app.post('/saldos', function(req, res) {
     res.setHeader('Access-Control-Allow-Origin', '*');



	var respu={};
    console.log("Request Android Saldos",req.body);
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT Points from arm_members where Fax='"+req.body.id+"'", function (error, results, fields) {
  if (error)
//	  throw error;
  {
	   console.log(error);
	  //throw error;
  }else
	  
   var config=results[0];
	console.dir(results);
	var resule={"success":true,"data":results[0]};
		var retoTo={"response":resule};
		console.dir(retoTo);
		res.write(JSON.stringify(resule));
		 res.end(); 
		//cones.destroy();		 
	
   
});
	
    
	

});


app.post('/cart_insert', function(req, res) {
     res.setHeader('Access-Control-Allow-Origin', '*');



	var respu={};
    console.log("Request Android cart insert",req.body);
	//var cones=getConection();
	//cones.connect();
	var paramPost=req.body;
if(paramPost.txtName==''||paramPost.IMEI==''||paramPost.productID==''){
res.write("failed2");
		 res.end(); 

}else{
	
cones.query("INSERT INTO cart(name, description, quantity, price, img_url, customer,idProducto)"+
   " VALUES ('"+paramPost.txtName+"','"+paramPost.txtDesc+"','"+paramPost.txtQty+"','"+paramPost.txtPrice+"','"+paramPost.txtImageUrl+"','"+paramPost.IMEI+"','"+paramPost.productID+"')", function (error, results, fields) {
  if (error)
//	  throw error;
  {
	   console.log(error);
	  //throw error;
  }else
	{ 
console.log("resultados",results);
var config=results;
 if(config.affectedRows>0){
		res.write("success");
		 res.end(); 
}else{
res.write("failed");
		 res.end(); 

}
  		//cones.destroy();		 
	
   }
});
	
    }
	

});


app.post('/cart_remove', function(req, res) {
     res.setHeader('Access-Control-Allow-Origin', '*');



	var respu={};
    console.log("Request Android cart insert",req.body);
//	var cones=getConection();
//	cones.connect();
	var paramPost=req.body;
	
cones.query("DELETE FROM cart WHERE id ="+paramPost.pid, function (error, results, fields) {
  if (error)
//	  throw error;
  {
	   console.log(error);
	  //throw error;
  }else
	{ 
var config=results;
 if(config.affectedRows>0){
		res.write("success");
		 res.end(); 
}else{
res.write("failed");
		 res.end(); 

}
  		//cones.destroy();		 
	
   }
});
	
    
	

});



app.post('/cart_qty_inc', function(req, res) {
     res.setHeader('Access-Control-Allow-Origin', '*');



	var respu={};
    console.log("Request Android cart insert",req.body);
//	var cones=getConection();
//	cones.connect();
	var paramPost=req.body;
	
cones.query("UPDATE cart SET quantity=quantity+1 WHERE id ="+paramPost.txtPid, function (error, results, fields) {
  if (error)
//	  throw error;
  {
	   console.log(error);
	  //throw error;
  }else
	{ 
var config=results;
 if(config.affectedRows>0){
		res.write("success");
		 res.end(); 
}else{
res.write("failed");
		 res.end(); 

}
  		//cones.destroy();		 
	
   }
});
	
    
	

});

app.post('/cart_qty_dec', function(req, res) {
     res.setHeader('Access-Control-Allow-Origin', '*');



	var respu={};
    console.log("Request Android cart insert",req.body);
	//var cones=getConection();
	//cones.connect();
	var paramPost=req.body;
	
cones.query("UPDATE cart SET quantity=quantity-1 WHERE id ="+paramPost.txtPid, function (error, results, fields) {
  if (error)
//	  throw error;
  {
	   console.log(error);
	  //throw error;
  }else
	{ 
var config=results;
 if(config.affectedRows>0){
		res.write("success");
		 res.end(); 
}else{
res.write("failed");
		 res.end(); 

}
  	//	cones.destroy();		 
	
   }
});
	
    
	

});

var conteLogo=0;
app.post('/logon', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request Logon",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei;   
	try{
     useName=req.body.user;
     Password=req.body.pass;
	 imei=req.body.imei;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  if(results.length>0){
  
   var config=results[0];
//console.log("result member",results);
	var resule={"success":true,"data":config,"age":1,"name":useName};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		res.write(JSON.stringify(resule));
		 res.end();  
  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..");
  }
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 


app.post('/logonP', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request Logon",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei,telefono;   
	try{
     useName=req.body.user;
     Password=req.body.pass;
     telefono=req.body.phone;
	 imei=req.body.imei;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	
	
cones.query("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	 // cones.end();
	// cones.destroy();

	  //throw error;
  }else{
	//  cones.end();
	// cones.destroy();
	  //throw error;
  if(results.length>0){
  
   var config=results[0];
//console.log("result member",config);
if(config.Phone==telefono){
	var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario};
		var retoTo={"response":resule};
		//console.log("resule",resule);
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
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 




app.post('/logonPV', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request Logon",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei,telefono;   
	try{
     useName=req.body.user;
     Password=req.body.pass;
     //telefono=req.body.phone;
	// imei=req.body.imei;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection22();
	//cones.connect();
	
cones.query("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
  if (error) 
	  {
		//  cones.end();
	 //cones.destroy();
	   console.log(error);
	  //throw error;
  }else{
	 // cones.end();
	// cones.destroy();
	  //throw error;
  if(results.length>0){
  
   var config=results[0];
//console.log("result member",config);

	var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		res.write(JSON.stringify(resule));
		 res.end();  


  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..  user o pass");
  }
}
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 


app.post('/setBlueUUid', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request Logon",conteLogo);
console.log("parametros:",req.body);
var useName,Password,itag,conta;   
	try{
     useName=req.body.user;
     Password=req.body.pass;
     itag=req.body.Itag;
     conta=req.body.cont;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection22();
	//cones.connect();
	
cones.query("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
  if (error) 
	  {
		  try{
		  //cones.end();
	// cones.destroy();
		  }catch(er){}
	   console.log(error);
	  //throw error;
  }else{
	  
	  //throw error;
  if(results.length>0){
  
   var config=results[0];
//console.log("result member",config);
var reconteo="";

cones.query("UPDATE arm_members set uuidblue='"+itag+"' where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
cones.query("UPDATE arm_members set cont_itag='"+conta+"' where uuidblue='"+itag+"' and cont_itag<'"+conta+"'", function (error2, results2, fields2) {
try{
//cones.end();
	// cones.destroy();
}catch(er){}
});



});
	var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		res.write(JSON.stringify(resule));
		 res.end();  


  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..  user o pass");
  }
}
});
	
	    
    

}); 






app.post('/VincularConductor', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//conteLogo++;
//console.log("Request Logon",conteLogo);
console.log("parametros:",req.body);
var placa,itag;   
	try{
     placa=req.body.placa;
     itag=req.body.Itag;

}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection22();
	//cones.connect();
	
cones.query("SELECT *from arm_members where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
  if (error) 
	  {
		  try{
		  //cones.end();
	// cones.destroy();
		  }catch(er){}
	   console.log(error);
	  //throw error;
  }else{
	  
	  //throw error;
  if(results.length>0){
  
   var config=results[0];
//console.log("result member",config);
var reconteo="";

cones.query("UPDATE arm_members set uuidblue='"+itag+"' where UserName='"+useName+"' and Password='"+Password+"'", function (error, results, fields) {
cones.query("UPDATE arm_members set cont_itag='"+conta+"' where uuidblue='"+itag+"' and cont_itag<'"+conta+"'", function (error2, results2, fields2) {
try{
//cones.end();
	// cones.destroy();
}catch(er){}
});



});
	var resule={"success":true,"data":config,"age":1,"name":useName,"isConductor":config.is_funcionario};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		res.write(JSON.stringify(resule));
		 res.end();  


  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..  user o pass");
  }
}
});
	
	    
    

}); 






app.post('/validarRecarga', function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request validarRecarga",conteLogo);
console.log("parametros:",req.body);
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
	 //timeserver=req.body.timeserver;
	 //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android ValidQr_recarga",conteLogo);
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT c.CouponId,c.CouponName,c.CouponCode,c.StartDate,c.EndDate,cp.ProductId,p.ProductName,p.Price from arm_coupon c , arm_coupon_product cp,arm_product p  where c.CouponId=cp.CouponId and p.ProductId=cp.ProductId and c.CouponCode='"+codigo.trim()+"' and c.Status='1' and DATE(c.StartDate)<= DATE(now()) and DATE(c.EndDate)>=DATE(now())", function (error, results, fields) {
  if (error) 
	  {
		  try{
		//  cones.end();
	 //cones.destroy();
	 }catch(er){}
	   console.log(error);
	  //throw error;
  }else{
	  try{
	//  cones.end();
	// cones.destroy();
	 }catch(er){}
	  //throw error;
  if(results.length>0){
	  
	  var resulta=results[0];
//cones.query("SELECT *from arm_members where Email='"+email+"'", function (error2, results2, fields2) {
  //if (error2) throw error2;	  
	  
	  res.write(JSON.stringify({"success":true,"msg":"Codigo correcto","data":resulta}));
	  res.end();
	  console.log("Codigo validado.");
	  var query="INSERT into arm_coupon_ticket set CouponId='"+resulta.CouponId+"',OrderId='"+resulta.CouponCode+"',CustomerId='"+imei+"',Amount='1',"+
				"timeserver="+timeserver+",timedispo="+timedispo+",timedif="+timedif+"";
	 /* cones.query(query, function(err, rows, fields) {
 if (!err){
 console.log("Insercion correcta...");
 
 }
	  })
	*/  
	  
//});
	  
/*	   cones.query("SELECT *from arm_members where Email='"+email+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Correo Electronico ya fue asignado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	 var querys="INSERT into arm_members set Fullnames='"+nombre+"',Email='"+email+"',UserName='"+useName+"',Password='"+Password+"',Phone='"+telefono+"',Fax='"+imei+"',MemberStatus='Active'"; 
	   console.log(querys);
cones.query(querys, function(err, rows, fields) {
 if (!err){
	
	try{
     cones.end();
	  // var config=results[0];
//console.log("result member",results);
	var resule={"success":true,"data":[],"age":1,"name":useName};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		res.write(JSON.stringify(resule));
		 res.end();  
}catch (err){console.log(err);}
}else{
	res.write(JSON.stringify({"success":false,"msg":"Error al crear el registro de usuario."+err}));
		 res.end();  
    console.log('Error en Query.'+err);
try{
     cones.end();
}catch (err){console.log(err);}
}
});
	  
	
		 
  }

  });
  */
	  
	  
   
  }else{
	 res.write(JSON.stringify({"success":false,"msg":"El Nombre de Usuario ya fue usado."}));
	  res.end();
	  console.log("Error en valida QR.",req.body.codigo);
	  console.log(req.body.imei);
   
	 
  }
}
});
	
	
	
	
	
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 



app.post('/validarRecargaOK', function(req, res) {
	res.setHeader("Content-Type", "application/json; charset=utf-8");

conteLogo++;
console.log("Request validarRecarga",conteLogo);
console.log("parametros:",req.body);
var codigo,idProducto,imei,timeserver,timedispo,timedif;   
//var d = new Date();
//var n = d.getMilliseconds();
	try{
	 codigo   =req.body.codigo;
    // idProducto  =req.body.idProducto;
	//var cones=getConection();
	//cones.connect();
     imei =req.body.imei;
	 cones.query("SELECT *from arm_compras_history where Imei='"+imei+"' and status=1 and fecha "+
	 " between DATE_SUB(now(),INTERVAL 10 SECOND) and now() order by id desc;",function(erro,result,fields){
		 if(erro){
			   res.write(JSON.stringify({"success":false,"msg":"Codigo Incorrecto","cupon":codigo,"data":""}));
				res.end();
				try{
				//  cones.end();
	// cones.destroy();
	 }catch(er){}
		 }else{
			 var ObjCompras=result[0];
			 if(ObjCompras){
			 if(ObjCompras.timeDispo>0){
			   res.write(JSON.stringify({"success":true,"msg":"ok","cupon":codigo,"data":""}));
				res.end();
				
				cones.query("UPDATE arm_compras_history set status=0 where Imei='"+imei+"' and status=1",function(erj,resj,fieldj){
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
	 
}catch (ero){
	//console.dir(ero);
	}
	 


}); 

app.get('/getTime',function(req,res){
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader('Access-Control-Allow-Origin', '*');
	var timeSer=Math.floor(microTime.now()/1000000);
	res.write(JSON.stringify({"time":timeSer}));
	res.end();
	
});

//var cones=getConection();

function hex_to_ascii(str1)
 {
  var hex  = str1.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
 }


app.get('/setLocals', function(req, res) {

res.setHeader("Content-Type", "application/json; charset=utf-8");
console.log("Request validar QR",conteLogo);
console.log("parametros:",req.query);
var imei,fiados;
	try{
		var bodyy=req.query;
		imei=bodyy.imei;
		fiados=bodyy.fiados;	
cones.query("UPDATE arm_members set Points=Points-"+fiados+" WHERE Fax='"+imei+"'",function(er,resu,field){
	console.log(resu);
if(er){
//Error de query

res.write(JSON.stringify({"success":false,"msg":"bad","data":er}));
			res.end();

}else
if(resu.affectedRows>0){
//todo Ok update sinc

cones.query("select Points,fiados from arm_members WHERE Fax='"+imei+"'",function(er2,resu2,field2){
if(er2){
	try{
 // cones.end();
	// cones.destroy();
	}catch(er){}
}else{
	if(resu2.length>0){
res.write(JSON.stringify({"success":true,"msg":"OK","imei":imei,"saldo":resu2[0].Points,"fiados":resu2[0].fiados}));
res.end();
	}else{
//no se pudo actualizar
res.write(JSON.stringify({"success":false,"msg":"bad","data":"Problemas con update"}));
			res.end();

}try{
 // cones.end();
//	 cones.destroy();
	 }catch(er){}
}




});

}
});
}catch(ers){console.log(ers);}

});




app.post('/setLocalBD', function(req, res) {

res.setHeader("Content-Type", "application/json; charset=utf-8");
console.log("Request setLocalBD",conteLogo);
console.log("parametros:",req.body);
var dataAll=req.body.datos;
var dataObj=JSON.parse(dataAll.datos);
console.log("Toda la data setLocaBD**");
console.dir(dataObj);
res.send(dataObj);
/*
var imei,fiados;
	try{
		var bodyy=req.query;
		imei=bodyy.imei;
		fiados=bodyy.fiados;	
cones.query("UPDATE arm_members set Points=Points-"+fiados+" WHERE Fax='"+imei+"'",function(er,resu,field){
	console.log(resu);
if(er){
//Error de query

res.write(JSON.stringify({"success":false,"msg":"bad","data":er}));
			res.end();

}else
if(resu.affectedRows>0){
//todo Ok update sinc

cones.query("select Points,fiados from arm_members WHERE Fax='"+imei+"'",function(er2,resu2,field2){
if(er2){
	try{
 // cones.end();
	// cones.destroy();
	}catch(er){}
}else{
	if(resu2.length>0){
res.write(JSON.stringify({"success":true,"msg":"OK","imei":imei,"saldo":resu2[0].Points,"fiados":resu2[0].fiados}));
res.end();
	}else{
//no se pudo actualizar
res.write(JSON.stringify({"success":false,"msg":"bad","data":"Problemas con update"}));
			res.end();

}try{
 // cones.end();
//	 cones.destroy();
	 }catch(er){}
}




});

}
});
}catch(ers){console.log(ers);}

*/

});



app.get('/validarQR', function(req, res) {

res.setHeader("Content-Type", "application/json; charset=utf-8");
console.log("Request validar QR",conteLogo);
console.log("parametros:",req.query);
//res.write('ok');
var codigo,idProducto,imei,timeserver,timedifeRea,timedif,fechadi,idValidador;   

 var ObjJSON;
	try{
		var bodyy=req.query;
		codigo=bodyy.id;
		
		
	 try{
ObjJSON=codigo.split(',');		 
 //ObjJSON=JSON.parse(hex_to_ascii(codigo));
}catch(Ero){
  console.log(Ero);
}
console.dir(ObjJSON);
}catch (ero){
	console.dir(ero);
	}

if(ObjJSON){
if(ObjJSON.length>4){
idValidador=ObjJSON[4];
}else{
idValidador="NA";
}
	
	// codigo   =req.param('codigo');
     idProducto  =ObjJSON[3];
     imei =ObjJSON[1];
	 timeserver=Math.floor(microTime.now()/1000000);
	 console.log("timeserver",timeserver);
	 fechadi=ObjJSON[0];
	 timedif=ObjJSON[2];
	 timedifeRea=timeserver-fechadi;
	 var restar=timedifeRea-timedif;
	 
	 console.log("Resta: ",restar);
	 if(restar<7&&restar>-7){
	 
	 console.log("Paso Timer. Ok  "+restar);
	 console.log("timeserver: "+timeserver+" timedispo: "+fechadi+" timedif: "+timedif);
	 //timeserver=req.body.timeserver;
	 //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
cones.query("SELECT *FROM arm_members WHERE Fax='"+imei+"'",function(er,resu,field){
	if(er){
		    res.write(JSON.stringify({"success":false,"msg":"bad","data":er}));
			res.end();
	}else{
		var Member=resu[0];
		if(Member.Points>0){
			res.write(JSON.stringify({"success":true,"msg":"ok","data":"OK"}));
			res.end();
			
			transferire(imei,idProducto+"","1",res,"Pago");	
				cones.query("INSERT INTO arm_compras_history set CouponId='"+idProducto+"',Imei='"+imei+"',producto='"+idProducto+"',valor='1',timeDispo='"+fechadi+"',id_validador='"+idValidador+"'",function(eri,resui,fieldi){
					if(eri){
						
					}else{
						
					}
					
					cones.query("UPDATE arm_members set Points=Points-1 WHERE Fax='"+imei+"' ",function(eris,resuis,fieldis){
					if(eris){
						try{ 
						
						}catch(efd){}
						
					}else{
						
					}
					
				});
					
				});
			
		}else{

		
		
			if(Member.fiados<1){

			res.write(JSON.stringify({"success":true,"msg":"ok2","data":"OK2"}));
			res.end();
			
			transferire(imei,idProducto+"","1",res,"Fiado");	
				cones.query("INSERT INTO arm_compras_history set CouponId='"+idProducto+"',Imei='"+imei+"',producto='"+idProducto+"',concepto='fiado',valor='1',timeDispo='"+fechadi+"',id_validador='"+idValidador+"'",function(eris,resuis,fieldis){
					if(eris){
						
					}else{
						
					}
					
					cones.query("UPDATE arm_members set fiados=fiados+1 WHERE Fax='"+imei+"' ",function(eris2,resuis2,fieldis2){
					if(eris2){
						try{
						
						}catch(efd){}
						
					}else{
						
					}
					
				});
					
				});


			}else{
				res.write(JSON.stringify({"success":false,"msg":"bad","data":"sin saldo"}));
				res.end();
			}
			
		}
		
	}
});


	

}else{
	 console.log("NO PASO Timer. BAD  "+restar);
	res.write(JSON.stringify({"success":false,"msg":"Fuera de Tiempo."}));
	  res.end();
	  console.log("Error en validar codigo.. Timer");
	
}
}else{
	
	  res.write(JSON.stringify({"success":false,"msg":"Formato Invalido."}));
	  res.end();
	  console.log("Error en validar codigo.. Format");
	
}
	
}); 





app.post('/registro', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request Register",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei,nombre,telefono,email;   
	try{
	 nombre   =req.body.name;
     useName  =req.body.username;
     Password =req.body.password;
	 email     =req.body.email;
	 imei     =req.body.imei;
	 telefono =req.body.telefono;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
//	var cones=getConection();
//	cones.connect();
	
cones.query("SELECT *from arm_members where UserName='"+useName+"'", function (error, results, fields) {
  if (error) 
	{
		try{
		 // cones.end();
	// cones.destroy();
	 }catch(er){}
	   console.log(error);
	  //throw error;
  }else  
  //throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Nombre de Usuario ya fue usado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  cones.query("SELECT *from arm_members where Email='"+email+"'", function (error, results, fields) {
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
cones.query(querys, function(err, rows, fields) {
 if (!err){
	 try{
	//  cones.end();
	// cones.destroy();
	 }catch(er){}
	try{
     //cones.end();
	  // var config=results[0];
//console.log("result member",results);
	var resule={"success":true,"data":[],"age":1,"name":useName};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		res.write(JSON.stringify(resule));
		 res.end();  
}catch (err){console.log(err);}
}else{
	 // cones.end();
	// cones.destroy();
	res.write(JSON.stringify({"success":false,"msg":"Error al crear el registro de usuario."+err}));
		 res.end();  
    console.log('Error en Query.'+err);
try{
   //  cones.end();
}catch (err){console.log(err);}
}
});
	  
	
		 
  }
	  }
  });
  }
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 



app.post('/getQRContactoP', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request getQRContacto",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei;   
	try{
     imei=req.body.imei;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection22();
	//cones.connect();
	
cones.query("SELECT *from arm_members where Fax='"+imei+"'", function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  if(results.length>0){
  
   var config=results[0];
//console.log("result member",results);
	var resule={"success":true,"data":config,"age":1,"imei":imei};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		var resuler=JSON.stringify(resule);
		res.write(resuler);
		console.log("resuler",resuler);
		 res.end();  
  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..");
  }
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 




app.post('/getQRContacto', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request getQRContacto",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei;   
	try{
     imei=req.body.imei;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT *from arm_members where Fax='"+imei+"'", function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  if(results.length>0){
  
   var config=results[0];
//console.log("result member",results);
	var resule={"success":true,"data":config,"age":1,"imei":imei};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		var resuler=JSON.stringify(resule);
		res.write(resuler);
		console.log("resuler",resuler);
		 res.end();  
  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..");
  }
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 



app.post('/blockchainPay', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request getQRContacto",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei;   
	try{
     //imei=req.body.imei;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
//	var cones=getConection();
//	cones.connect();
	
cones.query("SELECT *from arm_compras_history", function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  if(results.length>0){
  
   var config=results;
//console.log("result member",results);
	var resule={"success":true,"data":config,"Block":1,"imei":imei};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		var resuler=JSON.stringify(resule);
		res.write(resuler);
		console.log("resuler",resuler);
		 res.end();  
  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..");
  }
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 

app.get('/blockchainPay', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request getQRContacto",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei;   
	try{
     //imei=req.body.imei;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection();
	//cones.connect();
	
cones.query("SELECT *from arm_compras_history", function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  if(results.length>0){
  
   var config=results;
//console.log("result member",results);
	var resule={"success":true,"data":config,"age":1,"imei":imei};
		var retoTo={"response":resule};
		//console.log("resule",resule);
		var resuler=JSON.stringify(resule);
		res.write(resuler);
		console.log("resuler",resuler);
		 res.end();  
  }else{
	  res.write(JSON.stringify({"success":false,"msg":""}));
	  res.end();
	  console.log("Error en Login..");
  }
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 

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
    // parsed response body as js object 
    //console.log("SetOdometro");
   //  res.set('Content-Type', 'application/json');
    //res.send(JSON.stringify(data));
   // res.end();
    // raw response 
//    console.log("Respons",response);
});
    }catch (ero){console.log("Error Cath74 main.js",ero);}

}












app.post('/registroP', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request Register",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei,nombre,telefono,email,miTokenF;   
	try{
	 nombre   =req.body.name;
     useName  =req.body.username;
     Password =req.body.password;
	 email     =req.body.email;
	 imei     =req.body.imei;
	 telefono =req.body.telefono;
	miTokenF  = req.body.miTokenF;
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	//var cones=getConection22();
	//cones.connect();
	
cones.query("SELECT *from arm_members where UserName='"+useName+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Nombre de Usuario ya fue usado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  cones.query("SELECT *from arm_members where Email='"+email+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Correo Electronico ya fue asignado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  
	  	  cones.query("SELECT *from arm_members where Phone='"+telefono+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Telefono  ya fue asignado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  
	  
	 var querys="INSERT into arm_members set Fullnames='"+nombre+"',Email='"+email+"',UserName='"+useName+"',Password='"+Password+"',Phone='"+telefono+"',Fax='"+imei+"',MemberStatus='Active',Salt='"+miTokenF+"'"; 
	   console.log(querys);
cones.query(querys, function(err, rows, fields) {
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
		var valorRegist= ValorPasajeNormal*2;
			var querh = "INSERT INTO registro (unique_id, cliente, vendedor, observa, lat, lng,fecha,tiempo,otrocampo,valor,medio_pago,idCliente) "+
		"VALUES(null, 'Solobus', '"+imei+"', 'Recarga', '0','0', '2020-07-14 06:30:00','Registro Inicial','Registro Inicial','"+valorRegist+"','QR',68)";
		cones.query(querh, function(errh, rowsh, fieldsh) {
			
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
	//  cones.end();
	// cones.destroy();
	 }catch(er){}
try{
  //   cones.end();
}catch (err){console.log(err);}
}
});
	  
  }
		  });
		 
  }

  });
  }
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 





app.post('/registroP_mail', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request Register",conteLogo);
console.log("parametros:",req.body);
var useName,Password,imei,nombre,telefono,email,miTokenF,codigoV,genero,numerodoc; 

//var cones=getConection22();
//	cones.connect();

 
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
     //secretVar=req.query.secret;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	  
	
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android Logon",conteLogo);
	
cones.query("SELECT *from mail_codes where email='"+email+"' and codigo='"+codigoV+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){	
	
	
cones.query("SELECT *from arm_members where UserName='"+useName+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Nombre de Usuario ya fue usado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  cones.query("SELECT *from arm_members where Email='"+email+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Correo Electronico ya fue asignado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  
	  	  cones.query("SELECT *from arm_members where Phone='"+telefono+"'", function (error, results, fields) {
  if (error) throw error;
  if(results.length>0){
	  res.write(JSON.stringify({"success":false,"msg":"El Telefono  ya fue asignado."}));
	  res.end();
	  console.log("Error en Login..");
  
   
  }else{
	  
	  
	  
	 var querys="INSERT into arm_members set Fullnames='"+nombre+"',Email='"+email+"',UserName='"+useName+"',Password='"+Password+"',Phone='"+telefono+"',Fax='"+imei+"',MemberStatus='Active',Salt='"+miTokenF+"',Gender='"+genero+"',DocumentNumber='"+numerodoc+"'"; 
	   console.log(querys);
cones.query(querys, function(err, rows, fields) {
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
		
			var querh = "INSERT INTO registro (unique_id, cliente, vendedor, observa, lat, lng,fecha,tiempo,otrocampo,valor,medio_pago,idCliente) "+
		"VALUES(null, 'Solobus', '"+imei+"', 'Recarga', '0','0', '2020-07-14 06:30:00','','Registro Inicial','4600','QR',68)";
		cones.query(querh, function(errh, rowsh, fieldsh) {
			
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
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 




app.post('/transferir', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request transferir",conteLogo);
console.log("parametros:",req.body);
var miImei,cantid,imei;   
	try{
     imei=req.body.imei;
	 cantid=req.body.cantidad;
     miImei=req.body.miImei;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android transferir",conteLogo);
	//var cones=getConection();
	//cones.connect();
	var que="SELECT *from arm_members where Fax='"+miImei+"' and Points>="+cantid+"";
	console.log(que);
cones.query(que, function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  if(results.length>0){
  
  
  
   var config=results[0];
   
   cones.query("update arm_members set Points=Points+"+cantid+" where Fax='"+imei+"'", function (error2, results2, fields2) {
  if (error2) 
	  {
	   console.log(error2);
	   //  cones.end();
	// cones.destroy();
	  //throw error;
  }else{
	  try{
	  transferire(miImei,imei,cantid,res,"Transferencia");
	  }catch(Er){}
//console.log("result member",results);
cones.query("update arm_members set Points=Points-"+cantid+" where Fax='"+miImei+"'", function (error2, results2, fields2) {
  if (error2) 
	  {
	   console.log(error2);
	  //throw error;
  }else{
 var timeserver=Math.floor(microTime.now()/1000000);
  //cones.query("INSERT INTO arm_members set Points=Points-'"+cantid+"' where Fax='"+miImei+"'", function (error3, results3, fields3) {
  cones.query("INSERT INTO arm_compras_history set CouponId='',Imei='"+miImei+"',producto='',valor='"+cantid+"',timeDispo='"+timeserver+"',concepto='transferir',receptor='"+imei+"'",function(error3, results3, fields3){
	  
  if (error3) 
	  {
		  // cones.end();
	// cones.destroy();
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
		 //  cones.end();
	// cones.destroy();
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
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 


app.post('/transferirP', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
conteLogo++;
console.log("Request transferir",conteLogo);
console.log("parametros:",req.body);
var miImei,cantid,imei;   
	try{
     imei=req.body.imei;
	 cantid=req.body.cantidad;
     miImei=req.body.miImei;
     //console.log("parametros:",req.body);
//     console.log("Data req",req);
}catch (ero){console.dir(ero);}
	
//if(Devices[idDevi]){
	var respu={};
    console.log("Request Android transferir",conteLogo);
	//var cones=getConection22();
	//cones.connect();
	var que="SELECT *from arm_members where Fax='"+miImei+"' and Points>="+cantid+"";
	console.log(que);
cones.query(que, function (error, results, fields) {
  if (error) 
	  {
	   console.log(error);
	  //throw error;
  }else
	  //throw error;
  if(results.length>0){
  
  cones.query("select Fullnames from arm_members where UserName='"+imei+"'", function (errorFL, resultsFL, fieldsFL) {
  
  var nombreFull=resultsFL[0].Fullnames;
   var config=results[0];
   
   cones.query("update arm_members set Points=Points+"+cantid+" where UserName='"+imei+"'", function (error2, results2, fields2) {
  if (error2) 
	  {
	   console.log(error2);
	  //throw error;
  }else{
	  try{
	  transferire(miImei,imei,cantid,res,"Transferencia");
	  }catch(Er){}
//console.log("result member",results);
cones.query("update arm_members set Points=Points-"+cantid+" where Fax='"+miImei+"'", function (error2, results2, fields2) {
  if (error2) 
	  {
	   console.log(error2);
	  //throw error;
  }else{
// var timeserver=Math.floor(microTime.now()/1000000);
    	var querh = "INSERT INTO registro (unique_id, cliente, vendedor, observa, lat, lng,fecha,tiempo,tipo,otrocampo,valor,medio_pago,idCliente) "+
		"VALUES(null, '"+imei+"', '"+miImei+"', 'Transferencia', '0','0', now(),'Transferencia','','"+nombreFull+"','"+cantid+"','QR',68)";

  //cones.query("INSERT INTO arm_members set Points=Points-'"+cantid+"' where Fax='"+miImei+"'", function (error3, results3, fields3) {
  cones.query(querh,function(error3, results3, fields3){
	  
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
   
});
	
//       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"1"};
       var reto={"title":"Este es el titulo remoto cargado desde servidor.","subtitle":"Servicio no disponible.","btngenerar":"Generar Codigo Desde Nodejs","color":"2"};
    
	/* res.write('{"title":"Este es el titulo remoto cargado desde servidor.",'
					+'"subtitle":"Servicio no disponible.",'
					+'"btngenerar":"Generar Codigo Desde Nodejs",'
					+'"color":"3"}');
					var sha1 = require('sha1');
      */ 
	/*   res.write(reto.toString());*/
	    
    
/*}else{
   res.write('{"status":0,"msg":"Dispositivo No encontrado(No conectado al servidor)"}');
 res.end();  
    
}*/

}); 


// email sender function
app.post('/sendMailConfirma', function(req, res) {
// Definimos el transporter
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
		  cones.query("INSERT INTO mail_codes set email='"+req.body.mail+"',codigo='"+codigoALe+"'",function(error3, results3, fields3){
	  
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
});


app.get('/sendMailConfirma', function(req, res) {
// Definimos el transporter
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
    to: 'valzkat12@gmail.com',
    subject: 'Codigo de verificación PayBus',
    text: 'Su codigo de verificación es: '+codigoALe
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
		  cones.query("INSERT INTO mail_codes set email='valzkat12@gmail.com',codigo='"+codigoALe+"'",function(error3, results3, fields3){
	  
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
});


function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

/*
var server = net.createServer(function(sock) {
	//socket.write('Echo server\r\n');
	console.log('Servidor listen en puerto 3536');
	this.deviceID=0;
	 sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('ok');
		// var buff = new Buffer(data, 'utf8');
		//console.dir(buff);
	//	var fullRmu = buff.toString('hex');
		//console.log(data);

        //console.dir(fullRmu);
		//console.log('IdDispo: car  '+cantiDispos,this.deviceID);
        
    });
	sock.pipe(sock);
});
*/
//server.listen(3534, '67.205.76.93');
//server.listen(3536, '67.205.76.93');}