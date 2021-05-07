const Customer = require("../models/customer.model.js");
var amqp = require('amqp');

var FCM = require('fcm-node');
 var serverKey = 'AAAAij-d7oY:APA91bEypBK92zWRhFkJZ1ye_fBhW1wQs8w9pR0e581wdbPHQsAcJCow68Ql8R6VuOnDBb5k1XietzMEb8Qj0IMnIKWn7OVaPLYLC-PBuGSW0qo6gwwZTjNjln-fQsqW0J4XD5GkKL2E'; 
 var fcm = new FCM(serverKey);


var connectionAMQ = amqp.createConnection({ host: '54.91.53.76' ,login:'mqsolodomis',password:'mqsolodomis'});
connectionAMQ.on('error', function(e) {
  console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connectionAMQ.on('ready', function () {
	
  // Use the default 'amq.topic' exchange
  connectionAMQ.queue('solo.servicios', function (q) {
      // Catch all messages
      q.bind('#');
    
      // Receive messages
      q.subscribe(function (message) {
        // Print messages to stdout
        console.log("Desencolando..");
	

//setTimeout(function(){ 
SendServicioConductorRabit(message);

 //}, 100);


			
//contado=contado+1;	


  


      });
  });
  
  
  
   
 
});


function EnviarServicio(mensaje){
	
	
	
}


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


// Retrieve Login from users_ee.
exports.login = (req, res) => {
var user=req.query.userName;
var clave=req.query.clave;
var imei=req.query.Imei;
var IdToken=req.query.IdToken;

  Customer.getLogin ("SELECT *from ee_usuarios where Usuario='"+user+"' and Clave='"+clave+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
data[0].succes=1;
if(data[0].TipoUsuario=='Tecnico'){data[0].tipoU=2;}else{data[0].tipoU=1;}
res.send(data);
var idU=data[0].id;
var tipoU=data[0].TipoUsuario;
 Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+idU+"'",(err22, data22) => {});
 Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+idU+"',TipoEvento='Inicio de sesion',estado='1',tipoUsuario='"+tipoU+"'",(err23, data23) => {});

var queryInserUpd="";

  Customer.getLogin ("select *from ee_tokens where idUsuario='"+idU+"'",(err2, data2) => {
    if (err2){
	console.log("Error select TokenUser query");	    
    }else{ 
if(data2.length>0){
if(data2[0].idToken){
queryInserUpd="update ee_tokens set idToken='"+IdToken+"' where idUsuario='"+idU+"'";
}else{
queryInserUpd="INSERT INTO ee_tokens set idToken='"+IdToken+"',idUsuario='"+idU+"'";
}
}else{
queryInserUpd="INSERT INTO ee_tokens set idToken='"+IdToken+"',idUsuario='"+idU+"'";

}
 Customer.getLogin (queryInserUpd,(err3, data3) => {
    if (err3){
      console.log("Error insertando token.. ",err3);
    }else{
//res.send("{'succes':1}");
console.log("OK insert/update token.. ",data3);
}
});



}
  });


}
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



// MyServices Conductor..
exports.MyServices = (req, res) => {

var id=req.query.id;
var queryInserUpd="";
  Customer.getLogin ("select s.*,t.idToken from ee_servicios s LEFT JOIN ee_tokens t on s.Id_UsuarioConductor=t.idUsuario where s.Id_UsuarioConductor='"+id+"' and DATE(now())=DATE(FechaHora) order by s.id desc limit 1",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Error en conexion a BD.."
      });
    }else{ 
try{
if(data[0].id){
if(data[0].isVisto==0 && data[0].Estado<5){
var dataPayLoad =
{
"title":"",
"body":data[0].Direccion,
"tipoM":"N",
"lat":data[0].lat,
"lng":data[0].lng,
"direccion":data[0].Direccion,
"nomTec":data[0].Nombre_tecnico,
"observacion":data[0].Descripcion,
"h_solicitud":data[0].FechaHora,
"nivel_serv":data[0].nivelAten,
"tipoServi":data[0].TipoServicio,
"idSoli":data[0].id
}

setTimeout(function() {
envioFCM2(data[0].idToken,data[0].Direccion,"Servicio Nuevo",dataPayLoad ,data[0].id);
}, 1000);


}else{
	
	
	
}
}
}catch(Erd){
	
	console.log("Error Sin Id",Erd);
	}
res.send(data); 


}
  });
};



// MyServices Conductor2..
exports.MyServicesConfi = (req, res) => {

var id=req.query.id;
var idSoli=req.query.idSoli;
var queryInserUpd="";
  Customer.getLogin ("select *from ee_servicios where id='"+idSoli+"' and Id_UsuarioConductor='"+id+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Error en conexion a BD.."
      });
    }else{ 
/*try{
if(data[0].id){
	
//if(data[0].isVisto==0 && data[0].Estado<5){
var dataPayLoad =
{
"title":"",
"body":data[0].Direccion,
"tipoM":"N",
"lat":data[0].lat,
"lng":data[0].lng,
"direccion":data[0].Direccion,
"nomTec":data[0].Nombre_tecnico,
"observacion":data[0].Descripcion,
"h_solicitud":data[0].FechaHora,
"nivel_serv":data[0].nivelAten,
"tipoServi":data[0].TipoServicio,
"idSoli":data[0].id
}





}
}catch(Erd){
	
	console.log("Error Sin Id",Erd);
	}*/
	try{
	if(data[0].id){
	var allRespons=[{"succes":1,"data":data[0]}];
res.send(allRespons); 
	}else{
		var allRespons=[{"succes":0,"data":[]}];
res.send(allRespons); 
	}
	}catch(et){
			var allRespons=[{"succes":0,"data":[]}];
		res.send(allRespons);
	}

}
  });
};





exports.MyServicesT = (req, respo) => {

var id=req.query.id;
var queryInserUpd="";



  //Customer.getLogin ("select s.*,t.idToken from ee_servicios s LEFT JOIN ee_tokens t on s.id_usuarioTecnico=t.idUsuario where id_usuarioTecnico='"+id+"' and Estado<3 and DATE(now())=DATE(FechaHora) order by id desc limit 1",(err, data) => {
 
//setTimeout(function() {
var sqqry="select *from ee_servicios where id_usuarioTecnico='"+id+"' order by id desc limit 1;";
console.log("Query****CancelaBucle",sqqry);

 Customer.getLogin (sqqry,(err2, data2) => {
if (err2){
	var reso= [ {"succes":0}];
	respo.send(reso); 
}else{

console.log("data MytT",data2);
try{
if(data2[0].id){

if(data2[0].Estado==6){
	var reso= [ {"succes":0}];
	respo.send(reso); 

}else{
if(data2[0].Estado==3){
		var myDate=Math.floor(new Date().getTime()/1000)-18000;
		var horaReg=new Date(data2[0].fechaHora_aceptado).getTime()/1000;
		var resta=myDate-horaReg;
		console.log('resultaResta',resta+"  fin- "+myDate+"   ini- "+horaReg);
		if(resta<=30){
	
var qyu="select  t.idToken,e.nombre,d.displayName,d.lastValidLatitude,d.lastValidLongitude,e.id  from ee_usuarios e,ee_tokens t,device d  where e.id='"+data2[0].Id_UsuarioConductor+"' and t.idUsuario=e.id and d.deviceID=e.Id_Dispositivo order by e.id desc limit 1";
console.log(qyu);
	  Customer.getLogin (qyu,(errt, datat) => {
if(errt){
	var reso= [ {"succes":1}];
	respo.send(reso); 
}
else{

var reso= {"idToken":"",
       "nombre": datat[0].nombre,
       "displayName": datat[0].displayName,
       "lastValidLatitude": ""+datat[0].lastValidLatitude,
       "lastValidLongitude": ""+datat[0].lastValidLongitude,
	   "isSoli":data2[0].id};

console.log("reso***",reso);
var allRespons=[{"succes":3,"data":reso}];
console.log("allRespons",allRespons);
	respo.send(allRespons); 


}
  
}); 
		}else{
			var reso= {"idToken":"",
       "nombre": datat[0].nombre,
       "displayName": datat[0].displayName,
       "lastValidLatitude": ""+datat[0].lastValidLatitude,
       "lastValidLongitude": ""+datat[0].lastValidLongitude,
	   "isSoli":data2[0].id};

console.log("reso***",reso);
var allRespons=[{"succes":3,"data":reso}];
console.log("allRespons",allRespons);
	respo.send(allRespons); 
			
		}


}else if(data2[0].Estado==2){
	if(data2[0].isVisto==0){
		//temporizador de 2 minutos max. para cancelar servicio..
		var myDate=Math.floor(new Date().getTime()/1000)-18000;
		var horaReg=new Date(data2[0].FechaHora).getTime()/1000;
		var resta=myDate-horaReg;
		console.log('resultaResta',resta+"  fin- "+myDate+"   ini- "+horaReg);
		if(resta>=240){
			  Customer.getLogin ("update ee_servicios set estado='6' where id='"+data2[0].id+"'",(errt, datat) => {
				  var reso= [ {"succes":0}];
				respo.send(reso); 
			  });
			Customer.getLogin ("update ee_usuarios set estado='1' where id='"+data2[0].Id_UsuarioConductor+"'",(errt, datat) => {
				  var reso= [ {"succes":0}];
				//respo.send(reso); 
			  });

		}
	}else{
		var reso= [ {"succes":1}];
	respo.send(reso); 
		
	}
	
}
else{
	var reso= [ {"succes":1}];
	respo.send(reso); 
	}
}
}else{
	var reso= [ {"succes":0}];
	respo.send(reso); 
	
}

}catch(Erd){
	respo.send(data2);
	console.log("Error Sin Id",Erd);
	
	}
 


}
  });

//}, 100);


};



exports.MyServicesTT = (req, respo) => {

var id=req.query.id;
var queryInserUpd="";



  //Customer.getLogin ("select s.*,t.idToken from ee_servicios s LEFT JOIN ee_tokens t on s.id_usuarioTecnico=t.idUsuario where id_usuarioTecnico='"+id+"' and Estado<3 and DATE(now())=DATE(FechaHora) order by id desc limit 1",(err, data) => {
 
//setTimeout(function() {
var sqqry="select *from ee_servicios where id_usuarioTecnico='"+id+"' order by id desc limit 1;";
console.log("Query****CancelaBucle",sqqry);

 Customer.getLogin (sqqry,(err2, data2) => {
if (err2){
	var reso= [ {"succes":0}];
	respo.send(reso); 
}else{

console.log("data MytTT",data2);
try{
if(data2[0].id){

if(data2[0].Estado==6){
	var reso= [ {"succes":0}];
	respo.send(reso); 

}else{
if(data2[0].Estado==3){

   var reso= [ {"succes":1}];
	respo.send(reso); 

}else if(data2[0].Estado==2){
	if(data2[0].isVisto==0){
		//temporizador de 2 minutos max. para cancelar servicio..
		var myDate=Math.floor(new Date().getTime()/1000)-18000;
		var horaReg=new Date(data2[0].FechaHora).getTime()/1000;
		var resta=myDate-horaReg;
		console.log('resultaResta',resta+"  fin- "+myDate+"   ini- "+horaReg);
		if(resta>=240){
			  Customer.getLogin ("update ee_servicios set estado='6' where id='"+data2[0].id+"'",(errt, datat) => {
				  var reso= [ {"succes":0}];
				respo.send(reso); 
			  });
			Customer.getLogin ("update ee_usuarios set estado='1' where id='"+data2[0].Id_UsuarioConductor+"'",(errt, datat) => {
				  var reso= [ {"succes":0}];
				//respo.send(reso); 
			  });

		}
	}else{
		var reso= [ {"succes":1}];
	respo.send(reso); 
		
	}
	
}else if(data2[0].Estado<5){
	
	
	var reso= [ {"succes":data2[0].Estado,"data":data2[0]}];
	respo.send(reso); 
	}
else{
	var reso= [ {"succes":1}];
	respo.send(reso); 
	}
}
}else{
	var reso= [ {"succes":0}];
	respo.send(reso); 
	
}

}catch(Erd){
	respo.send(data2);
	console.log("Error Sin Id",Erd);
	
	}
 


}
  });

//}, 100);


};




exports.MyServicesOtr = (req, respo) => {

var id=req.query.id;
var queryInserUpd="";



  //Customer.getLogin ("select s.*,t.idToken from ee_servicios s LEFT JOIN ee_tokens t on s.Id_UsuarioConductor=t.idUsuario where Id_UsuarioConductor='"+id+"' and Estado<5 and DATE(now())=DATE(FechaHora) order by id desc limit 1",(err, data) => {
 
//setTimeout(function() {


 Customer.getLogin ("select *from ee_servicios where Id_UsuarioConductor='"+id+"' order by id desc limit 1;",(err2, data2) => {
if (err2){
	var reso= [ {"succes":0}];
	respo.send(reso); 

}else{

console.log("data MytOtr",data2);
try{
if(data2[0].id){

if(data2[0].Estado==6){
	var reso= [ {"succes":0}];
	var allRespons=[{"succes":0,"data":data2[0]}];
console.log("allRespons",allRespons);
	respo.send(allRespons); 

}else{
if(data2[0].Estado==3){
var qyu="select  t.idToken,e.nombre,d.lastValidLatitude,d.lastValidLongitude  from ee_usuarios e,ee_tokens t,device d  where e.id='"+data2[0].id_usuarioTecnico+"' and t.idUsuario=e.id and d.deviceID=e.Id_Dispositivo order by e.id desc limit 1";
console.log(qyu);




var allRespons=[{"succes":3,"data":data2[0]}];
console.log("allRespons",allRespons);
	respo.send(allRespons); 



	


}else if(data2[0].Estado<5){
	
	
	var reso= [ {"succes":data2[0].Estado,"data":data2[0]}];
	respo.send(reso); 
	}else{
		
		var allRespons=[{"succes":0,"data":data2[0]}];
console.log("allRespons",allRespons);
	respo.send(allRespons); 
		
	}
}
}else{
	var reso= [ {"succes":0}];
	respo.send(reso); 
	
}
}catch(Erd){
	respo.send(data2);
	console.log("Error Sin Id",Erd);
	
	}
 


}
  });

//}, 100);


};



// Retrieve listas.
exports.listasFull = (req, res) => {
var user=req.query.id;

  Customer.getLogin ("SELECT *from ee_listas",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
data[0].succes=1;
res.send(data);
}
  });
};


// Cambio estado .
exports.cambioEstado= (req, res) => {
var user=req.query.id;
var estadi=req.query.idEstado;
var Observacion=req.query.Observacion;
var statu="";
if(estadi=='1'||estadi==1){statu="1";}else{statu="0";}
  Customer.getLogin ("UPDATE ee_usuarios set Estado='"+statu+"' where id='"+user+"'",(err, data) => {
    if (err){
      res.status(500).send({ 
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

//data[0].succes=1;
res.send([{'succes':1}]);

 Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Cambio de estado',estado='"+statu+"',tipoUsuario=(select TipoUsuario from ee_usuarios where id='"+user+"'),observacion='"+Observacion+"'",(err23, data23) => {});


}
  });
};



// Fin de session.
exports.Finsession= (req, res) => {
var user=req.query.id;

  Customer.getLogin ("UPDATE ee_usuarios set Estado='-1' where id='"+user+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

res.send([{'succes':1}]);
 Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Fin de sesion',estado='-1',tipoUsuario=(select tipoUsuario from ee_usuarios where id='"+user+"')",(err23, data23) => {});
}
  });
};




// cancelacion Tecnico.
exports.cancelacionT = (req, res) => {
var user=req.query.id;
var idLista=req.query.idLista;
var idSoli=req.query.idSoli;

console.log("idSoli Tec**",idSoli);

var wher="id='"+idSoli+"'";
var wher2="s.id='"+idSoli+"'";

if(idSoli>0){}else{
	wher="id_usuarioTecnico='"+user+"' order by id desc limit 1";
	wher2="s.id_usuarioTecnico='"+user+"' ";
}

  Customer.getLogin ("UPDATE ee_servicios set Estado='6',fechaHora_cancelado=(now()) where "+wher,(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

res.send([{'succes':1}]);
Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+user+"'",(err22, data22) => {});
 Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Cancelacion de Servicio',estado='1',tipoUsuario='Tecnico'",(err23, data23) => {});
Customer.getLogin ("INSERT INTO  ee_auditoria_cancela set IdUsuario='"+user+"',TipoEvento='3',idServicio='"+idSoli+"',idTecnico='"+user+"',idDispositivo='',Observacion=(select descripcion from ee_listas where id='"+idLista+"'),idLista='"+idLista+"',isConduc='0'",(err23, data23) => {});

Customer.getLogin("Select t.idToken,s.Id_UsuarioConductor  from ee_servicios s,ee_tokens t where s.Id_UsuarioConductor=t.idUsuario and "+wher2+"  order by s.id desc limit 1;",(errt,datat)=>{
	if(errt){}
	else{
		var dataPayLoad =
		{

		"tipoM":"TC1",
		"RSP":1,
		"idLista":idLista,
		"lat":"",
		"lng":"",
		"nomConduc":""
		}

		envioFCM2(datat[0].idToken,"","",dataPayLoad,idSoli );

Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+datat[0].Id_UsuarioConductor+"'",(err22, data22) => {});

		}
  
});
}
  });
};



// EnvioPush Pruebas.
exports.EnvioPush = (req, res) => {
var user=req.query.id;

 
res.send([{'succes':1}]);

Customer.getLogin("Select t.idToken from ee_tokens t where t.idUsuario ='"+user+"';",(errt,datat)=>{
	if(errt){}
	else{
		var dataPayLoad =
		{
"title":"Servicio Prueba",
"body":"Calle 555 1",
"tipoM":"N",
"lat":"6.2389",
"lng":"-75.5142",
"direccion":"Calle 55 gg",
"nomTec":"Pepino",
"observacion":"OKkk",
"h_solicitud":"2020-12-19 06:28:20",
"nivel_serv":"1",
"tipoServi":"1"
}

		envioFCM(datat[0].idToken,"","",dataPayLoad );



		}
  
});

};



// cancelacion Conductor.
exports.cancelacionC = (req, res) => {
var user=req.query.id;
var idLista=req.query.idLista;
var idSoli=req.query.idSoli;

  //Customer.getLogin ("UPDATE ee_servicios set Estado='6',fechaHora_cancelado=(now()) where id='"+idSoli+"'",(err, data) => {
	    Customer.getLogin ("UPDATE ee_servicios set Estado='1',Id_UsuarioConductor='0',nombreConductor='',placa_conductor='',isVisto='0',Id_dispositivo='' where id='"+idSoli+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

res.send([{'succes':1}]);
Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+user+"'",(err22, data22) => {});
Customer.getLogin ("INSERT INTO ee_services_asignas set idconductor='"+user+"',idservicio='"+idSoli+"'",(err, data) => {});

 Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Cancelacion de Servicio',estado='1',tipoUsuario='Conductor'",(err23, data23) => {});
//Customer.getLogin ("INSERT INTO  ee_auditoria_cancela set IdUsuario='"+user+"',TipoEvento='3',idServicio='',idTecnico='',idDispositivo='',Observacion=(select descripcion from ee_listas where id='"+idLista+"'),idLista='"+idLista+"',isConduc='0'",(err23, data23) => {});


Customer.getLogin("Select t.idToken,s.* from ee_servicios s left join ee_tokens t on s.id_usuarioTecnico=t.idUsuario where s.id_usuarioTecnico=t.idUsuario and s.id='"+idSoli+"';",(errt,datat)=>{
	if(errt){}
	else{
		var dataPayLoad =
		{

		"tipoM":"CC",
		"RSP":1,
		"idLista":idLista,
		"lat":"",
		"lng":"",
		"nomConduc":""
		}

		envioFCM2(datat[0].idToken,"","",dataPayLoad,idSoli );

	
	
//res.send([{'succes':1,'RSP':10}]);
console.log("Response Reasigna ",datat);
setTimeout(function() {
    console.log('Buscando Nuevo conductor Cancelacion de conductor: ** 0)'+user);
		SendServicioConductor2(datat[0].lat,datat[0].lng,datat[0].Direccion,datat[0].Descripcion,datat[0].FechaHora,"",datat[0].TipoServicio,datat[0].id_usuarioTecnico,idSoli,user);
}, 20000);

		}
  
});



}
  });
};


/*
exports.rechazo = (req, res) => {
var user=req.query.id;
var idLista=req.query.idEstado;
var idSoli=req.query.idSoli;

Customer.getLogin ("select id,Estado from ee_servicios where Id_UsuarioConductor='"+user+"'  order by id desc limit 1",(errx, datax) => {
    if (errx){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
console.log("Datax Rechazo..");
console.dir(datax);
//var idSolic=0;
try{
//idSolic=datax[0].id;
}catch(Efv){console.log("Error sin Datos cancelar..",datax);}


  Customer.getLogin ("UPDATE ee_servicios set Estado='1',Id_UsuarioConductor='0',nombreConductor='',placa_conductor='' where id='"+idSoli+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
	
Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+user+"'",(err, data) => {});
Customer.getLogin ("INSERT INTO ee_services_asignas set idconductor='"+user+"',idservicio='"+idSoli+"'",(err, data) => {});


 // Customer.getLogin ("select *from ee_servicios where id='"+idSolic+"'",(erry, datay) => {
	  Customer.getLogin("Select t.idToken,s.* from ee_servicios s left join ee_tokens t on s.id_usuarioTecnico=t.idUsuario where s.id_usuarioTecnico=t.idUsuario and s.id='"+idSoli+"';",(erry,datay)=>{
	  
	  
    if (erry){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
	
			var dataPayLoad =
{

"tipoM":"RCC",
"placa":"",
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datay[0].idToken,"","",dataPayLoad,idSoli );

	
	
res.send([{'succes':1,'RSP':10}]);
console.log("Response Reasigna ",datay);
setTimeout(function() {
    console.log('Buscando Nuevo conductor Rechazo de conductor: ** 0)'+user);
		SendServicioConductor2(datay[0].lat,datay[0].lng,datay[0].Direccion,datay[0].Descripcion,datay[0].FechaHora,"",datay[0].TipoServicio,datay[0].id_usuarioTecnico,idSoli,user);
}, 20000);
		

		
	}
  
	});
 

}
  
}); //cierra 3Q


	}
//cierra 2Q




});//cierra 1Q


};

*/


// Aceptacion Conductor .
exports.aceptar = (req, res) => {
var user=req.query.id;
//var idLista=req.query.idLista;
var idSoli=req.query.idSoli;

  Customer.getLogin ("UPDATE ee_servicios set Estado='3',fechaHora_aceptado=(now()),isVisto=1 where id='"+idSoli+"' and Estado<4 and Id_UsuarioConductor='"+user+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

if(data.affectedRows>0){
	


res.send([{'succes':1}]);
Customer.getLogin ("UPDATE ee_usuarios set Estado='0' where id='"+user+"'",(err22, data22) => {});
 Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Acepta Servicio',estado='0',tipoUsuario='Conductor'",(err23, data23) => {});

  Customer.getLogin ("select  t.idToken,e.Nombre,d.displayName,d.lastValidLatitude,d.lastValidLongitude  from ee_usuarios e,ee_tokens t,device d  where e.id='"+user+"' and t.idUsuario=e.id   and d.deviceID=e.Id_Dispositivo order by e.id desc limit 1;",(err2, data2) => {
if (err2){
	
	console.log("Error 852 aceptar manda notifi",err2);
}else{


Customer.getLogin("Select t.idToken,s.id_usuarioTecnico from ee_servicios s left join ee_tokens t on s.id_usuarioTecnico=t.idUsuario where s.id_usuarioTecnico=t.idUsuario and s.id='"+idSoli+"';",(errt,datat)=>{
if(errt){}
else{
var dataPayLoad =
{

"tipoM":"CT",
"placa":data2[0].displayName,
"lat":data2[0].lastValidLatitude,
"lng":data2[0].lastValidLongitude,
"nomConduc":data2[0].Nombre,
"idSoli":idSoli
}

envioFCM2(datat[0].idToken,"","",dataPayLoad ,idSoli);



}
  
}

);


}

});


	}else{
res.send([{'succes':0}]);		
		
	}
}
  });
};


// Terminacion Conductor .
exports.terminacion= (req, res) => {
var user=req.query.id;
//var rsp=req.query.RSP;
//var idLista=req.query.idLista;
var idSoli=req.query.idSoli;

  Customer.getLogin ("UPDATE ee_servicios set Estado='5',fechaHora_terminado=(now()) where id='"+idSoli+"' and Estado='4'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

res.send([{'succes':1}]);
//Customer.getLogin ("UPDATE ee_usuarios set Estado='0' where id='"+user+"'",(err22, data22) => {});
 //Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Acepta Servicio',estado='0',tipoUsuario='Conductor'",(err23, data23) => {});

Customer.getLogin("Select t.idToken,s.id_usuarioTecnico from ee_servicios s,ee_tokens t where s.id_usuarioTecnico=t.idUsuario and s.id='"+idSoli+"';",(errt,datat)=>{
if(errt){}
else{
var dataPayLoad =
{

"tipoM":"LIT",
"RSP":1,
"placa":"",
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datat[0].idToken,"","",dataPayLoad ,idSoli);



}
  
}

);


}
  });
};




// Terminacion Tec .
exports.terminacionT= (req, res) => {
var user=req.query.id;
var rsp=req.query.RSP;
//var idLista=req.query.idLista;
var idSoli=req.query.idSoli;

  Customer.getLogin ("UPDATE ee_servicios set Estado='5',fechaHora_confirmacionLiberacion=(now()) where id ='"+idSoli+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

res.send([{'succes':1}]);
Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+user+"'",(err22, data22) => {});
 //Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Acepta Servicio',estado='0',tipoUsuario='Conductor'",(err23, data23) => {});

Customer.getLogin("Select t.idToken,s.Id_UsuarioConductor from ee_servicios s left join ee_tokens t on s.Id_UsuarioConductor=t.idUsuario where s.id ='"+idSoli+"' and s.Id_UsuarioConductor =t.idUsuario;",(errt,datat)=>{
if(errt){}
else{
var dataPayLoad =
{

"tipoM":"LIC",
"RSP":rsp,
"placa":"",
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datat[0].idToken,"","",dataPayLoad ,idSoli);
Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+datat[0].Id_UsuarioConductor+"'",(err22, data22) => {});


}
  
}

);


}
  });
};




// Llegada Conductor .
exports.llegada = (req, res) => {
var user=req.query.id;
//var idLista=req.query.idLista;
var idSoli=req.query.idSoli;

  Customer.getLogin ("UPDATE ee_servicios set Estado='3',fechaHora_llegada=(now()) where Id_UsuarioConductor='"+user+"' and id='"+idSoli+"';",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

res.send([{'succes':1}]);
//Customer.getLogin ("UPDATE ee_usuarios set Estado='0' where id='"+user+"'",(err22, data22) => {});
 //Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Acepta Servicio',estado='0',tipoUsuario='Conductor'",(err23, data23) => {});
var quLLeg="Select t.idToken,s.id_usuarioTecnico from ee_servicios s left join ee_tokens t on s.id_usuarioTecnico=t.idUsuario where s.id_usuarioTecnico=t.idUsuario and  s.id='"+idSoli+"';";
console.log("QueryLLegada***",quLLeg);
Customer.getLogin(quLLeg,(errt,datat)=>{
if(errt){}
else{
var dataPayLoad =
{

"tipoM":"LL",
"placa":"",
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datat[0].idToken,"","",dataPayLoad ,idSoli);



}
  
}

);


}
  });
};


// Rechazo Conductor .
exports.rechazo = (req, res) => {
var user=req.query.id;
var idLista=req.query.idEstado;
var idSoli=req.query.idSoli;

Customer.getLogin ("select id,Estado from ee_servicios where Id_UsuarioConductor='"+user+"'  order by id desc limit 1",(errx, datax) => {
    if (errx){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
console.log("Datax Rechazo..");
console.dir(datax);
//var idSolic=0;
try{
//idSolic=datax[0].id;
}catch(Efv){console.log("Error sin Datos cancelar..",datax);}


  Customer.getLogin ("UPDATE ee_servicios set Estado='1',Id_UsuarioConductor='0',nombreConductor='',placa_conductor='',isVisto='0',Id_dispositivo='' where id='"+idSoli+"'",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
	
Customer.getLogin ("UPDATE ee_usuarios set Estado='1' where id='"+user+"'",(err, data) => {});
Customer.getLogin ("INSERT INTO ee_services_asignas set idconductor='"+user+"',idservicio='"+idSoli+"'",(err, data) => {});


 // Customer.getLogin ("select *from ee_servicios where id='"+idSolic+"'",(erry, datay) => {
	  Customer.getLogin("Select t.idToken,s.* from ee_servicios s left join ee_tokens t on s.id_usuarioTecnico=t.idUsuario where s.id_usuarioTecnico=t.idUsuario and s.id='"+idSoli+"';",(erry,datay)=>{
	  
	  
    if (erry){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
	
			var dataPayLoad =
{

"tipoM":"RCC",
"placa":"",
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datay[0].idToken,"","",dataPayLoad,idSoli );

	
	
res.send([{'succes':1,'RSP':10}]);
console.log("Response Reasigna ",datay);
setTimeout(function() {
    console.log('Buscando Nuevo conductor Rechazo de conductor: ** 0)'+user);
		SendServicioConductor2(datay[0].lat,datay[0].lng,datay[0].Direccion,datay[0].Descripcion,datay[0].FechaHora,"",datay[0].TipoServicio,datay[0].id_usuarioTecnico,idSoli,user);
}, 20000);
		

		
	}
  
	});
 

}
  
}); //cierra 3Q


	}
//cierra 2Q




});//cierra 1Q


};


// Tecnico Confirma Llegada de Conductor .
exports.llegadaT = (req, res) => {
var user=req.query.id;
var rsp=req.query.RSP;
//var idLista=req.query.idLista;
var idSoli=req.query.idSoli;
var statusRSP="Estado='4',fechaHora_confirmacionLlegada=(now())";
var statusCons2Q="4";
if(rsp==1||rsp=='1'){}else{Estado='3';statusCons2Q="3";}
if(rsp==1){
  Customer.getLogin ("UPDATE ee_servicios set Estado='4',fechaHora_confirmacionLlegada=(now()) where id='"+idSoli+"' and id_usuarioTecnico='"+user+"';",(err, data) => {
    if (err){
      res.status(500).send({
        message: 
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 

res.send([{'succes':1,'RSP':10}]);
//Customer.getLogin ("UPDATE ee_usuarios set Estado='0' where id='"+user+"'",(err22, data22) => {});
 //Customer.getLogin ("INSERT INTO  ee_auditoria_estados set IdUsuario='"+user+"',TipoEvento='Acepta Servicio',estado='0',tipoUsuario='Conductor'",(err23, data23) => {});

Customer.getLogin("Select t.idToken,s.Id_UsuarioConductor  from ee_servicios s,ee_tokens t where s.Id_UsuarioConductor  =t.idUsuario and s.id='"+idSoli+"';",(errt,datat)=>{
if(errt){}
else{
var dataPayLoad =
{

"tipoM":"LLT",
"placa":"",
"RSP":rsp,
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datat[0].idToken,"","",dataPayLoad ,idSoli);



}
  
});


}
  });
  //res.send([{'succes':1,'RSP':rsp}]);
}else{
	Customer.getLogin("Select t.idToken,s.Id_UsuarioConductor  from ee_servicios s,ee_tokens t where s.id_UsuarioConductor  =t.idUsuario and s.id='"+idSoli+"';",(errt,datat)=>{
if(errt){
	res.send([{'succes':0,'RSP':rsp}]);
}
else{
var dataPayLoad =
{

"tipoM":"LLT",
"placa":"",
"RSP":rsp,
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datat[0].idToken,"","",dataPayLoad,idSoli );

res.send([{'succes':1,'RSP':rsp}]);

}
  
});
	
}

};






// Almacenar solicitudes tecnico.
exports.solicitudTec = (req, res) => {
var user=req.query.id;
var posi=req.query.posi;
var latiLng=posi.split(",");
var direccion=req.query.direccion;
var h_solicitud=req.query.h_solicitud;
var TipoServ=req.query.TipoServ;
var observacion=req.query.observacion;
 Customer.getLogin ("select  *from ee_servicios u  where u.id_usuarioTecnico='"+user+"' and u.Estado<5 order by u.id desc limit 1;",(err22, data22) => {
if (err22){
}else{
	var isOK="";
	if(data22.length>0){
		try{
			isOK=data22[0].id+"";
		}catch(e){}
	}
	if(isOK==''||idOK=='null'){
  Customer.getLogin ("INSERT INTO ee_servicios set fecha_dispo='"+h_solicitud+"',id_usuarioTecnico='"+user+"',accountID='sysadmin',"+
			"lat='"+latiLng[0]+"',lng='"+latiLng[1]+"',Descripcion='"+observacion+"',TipoServicio='"+TipoServ+"',Direccion='"+direccion+"',"+
                     "Nombre_tecnico=(select CONCAT(Nombre,' ',Apellidos) from ee_usuarios where id='"+user+"'), zona=(select zona from ee_usuarios where id='"+user+"')",(err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }else{ 
//data[0].succes=1;
//if(data[0].TipoUsuario=='Tecnico'){data[0].tipoU=2;}else{data[0].tipoU=1;}
res.send([{"succes":1,"data":data}]);

  Customer.getLogin ("UPDATE ee_usuarios set Estado='0' where id='"+user+"'",(err2, data2) => {});
console.log("data servi Insert",data);

var data2=({"lat":latiLng[0],"lng":latiLng[1],"direcci":direccion,"observa":observacion,"hora":h_solicitud,"nivels":"1","tipoSer":TipoServ,"idTec":user,"idSoli":data.insertId});
 connectionAMQ.publish("solo.servicios", {"data":data2}, {}, function(resp){
		console.log("response publish..");
	  //console.log(resp);
  });


//SendServicioConductor(latiLng[0],latiLng[1],direccion,observacion,h_solicitud,"1",TipoServ,user,data.insertId);

}
  });
  
	}else{
		res.send([{"succes":1}]);
		
	}
}
 });
  
};


function SendServicioConductor(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli){
var zonaTec="";
var nomTec="";
//Primer Q
  Customer.getLogin ("select  u.nombre,u.apellidos,u.zona  from ee_usuarios u  where u.id='"+idTec+"';",(err2, data2) => {
if (err2){
}else{
zonaTec=data2[0].zona;
nomTec=data2[0].Nombre;

//segundo Q
  Customer.getLogin ("SELECT "+
    "id, ("+
      "6371 * acos ("+
      "cos ( radians("+lat+") ) "+
      "* cos( radians( LastLat ) ) "+
      "* cos( radians( LastLng ) - radians("+lng+") ) "+
      "+ sin ( radians("+lat+") ) "+
      "* sin( radians( LastLat ) )"+
   " )"+
") AS distance,Nombre from ee_usuarios where zona='"+zonaTec+"' and TipoUsuario='Conductor' and Estado='1' order by distance limit 1;",(err3, data3) => {
if(err3){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 713(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor2(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,0);
}, 20000);



}else{

//Tercer Q
  Customer.getLogin ("SELECT "+
    "u.id, ("+
      "6371 * acos ("+
      "cos ( radians("+lat+") ) "+
      "* cos( radians( u.LastLat ) ) "+
      "* cos( radians( u.LastLng ) - radians("+lng+") ) "+
      "+ sin ( radians("+lat+") ) "+
      "* sin( radians( u.LastLat ) )"+
   " )"+
") AS distance,u.Nombre,t.idToken,u.Id_Dispositivo from ee_usuarios u  inner join ee_tokens t  on u.id=t.idUsuario  where t.idUsuario=u.id and u.zona='"+zonaTec+"' and u.TipoUsuario='Conductor' and u.Estado='1' order by distance  limit 1;",(err4, data4) => {
if(err4){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 735(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor2(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,0);
}, 20000);


}else{
	
var id=0;
try{
id=data4[0].id;
}catch(erv){console.log("Error data4 745",erv);}
if(id>0){

var idCondu=data4[0].id;
var nomCondu=data4[0].Nombre;
var TokeFi=data4[0].idToken;
var Dispositivo=data4[0].Id_Dispositivo;
var dataPayLoad =
{
"title":"",
"body":direcci,
"tipoM":"N",
"lat":lat,
"lng":lng,
"direccion":direcci,
"nomTec":nomTec,
"observacion":observa,
"h_solicitud":hora,
"nivel_serv":nivels,
"tipoServi":tipoSer,
"idSoli":idSoli
}

  Customer.getLogin ("UPDATE ee_servicios set Estado='2',Id_UsuarioConductor='"+idCondu+"',nombreConductor='"+nomCondu+"',Id_dispositivo='"+Dispositivo+"' where id='"+idSoli+"'",(err22, data22) => {
if(err22){}else{
envioFCM2(TokeFi,direcci,"Servicio Nuevo",dataPayLoad,idSoli );
}

});




}else{

setTimeout(function() {
    console.log('Buscando Nuevo conductor 776(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor2(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,0);
}, 20000);


}

}

}); // Cierra Tercer Q



}

}); // Cierra Segundo Q

}
});// Cierra Primer Q


}



// Buscar otro Conductor por Rechazo...
function SendServicioConductor2(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,idCon){
var zonaTec="";
var nomTec="";
//Primer Q
var queryRech="select  u.Nombre,u.Apellidos,u.zona  from ee_usuarios u  where u.id='"+idTec+"';";
console.log("queryRech:",queryRech);

var notIn="";
var notIn2="";

  Customer.getLogin ("SELECT GROUP_CONCAT(DISTINCT  idconductor SEPARATOR ', ') as idss from ee_services_asignas where idservicio='"+idSoli+"'",(err22, data22) => {
if(err22){}else{
var id2='';
try{
	if(data22[0].idss!=null && data22[0].idss!='null'){
id2=data22[0].idss;
	}
}catch(erv){console.log("Error data4 745",erv);}	
if(id2==''){
	
	
}else{
	notIn="and id NOT IN("+id2+")";
	notIn2="and u.id NOT IN("+id2+")";
}	

  Customer.getLogin ("SELECT GROUP_CONCAT(DISTINCT  Id_UsuarioConductor SEPARATOR ', ') as idss from ee_servicios where Estado<5",(err2_, data2_) => {
if (err2_){
}else{
	
var id2_='';
try{
	if(data2_[0].idss!=null && data2_[0].idss!='null'){
id2_=data2_[0].idss;
	}
}catch(erv){console.log("Error data4 745",erv);}		
	if(id2==''){
	if(id2_==''){
	
	
}else{
	notIn="and id NOT IN("+id2_+")";
	notIn2="and u.id NOT IN("+id2_+")";
}
	
}else{
	if(id2_==''){
	notIn="and id NOT IN("+id2+")";
	notIn2="and u.id NOT IN("+id2+")";
	
}else{
	notIn="and id NOT IN("+id2+","+id2_+")";
	notIn2="and u.id NOT IN("+id2+","+id2_+")";
}
	
}
	
	

  Customer.getLogin (queryRech,(err2, data2) => {
if (err2){
}else{
zonaTec=data2[0].zona;
nomTec=data2[0].Nombre;

//segundo Q
  Customer.getLogin ("SELECT "+
    "id, ("+
      "6371 * acos ("+
      "cos ( radians("+lat+") ) "+
      "* cos( radians( LastLat ) ) "+
      "* cos( radians( LastLng ) - radians("+lng+") ) "+
      "+ sin ( radians("+lat+") ) "+
      "* sin( radians( LastLat ) )"+
   " )"+
") AS distance,Nombre from ee_usuarios where zona='"+zonaTec+"' and TipoUsuario='Conductor' "+notIn+" and Estado='1' order by distance limit 1;",(err3, data3) => {
if(err3){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 826(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor_Nadie(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,0);
}, 20000);


}else{

//Tercer Q
  Customer.getLogin ("SELECT "+
    "u.id, ("+
      "6371 * acos ("+
      "cos ( radians("+lat+") ) "+
      "* cos( radians( u.LastLat ) ) "+
      "* cos( radians( u.LastLng ) - radians("+lng+") ) "+
      "+ sin ( radians("+lat+") ) "+
      "* sin( radians( u.LastLat ) )"+
   " )"+
") AS distance,u.Nombre,t.idToken,u.Id_Dispositivo from ee_usuarios u  inner join ee_tokens t  on u.id=t.idUsuario  where t.idUsuario=u.id and u.zona='"+zonaTec+"' and u.TipoUsuario='Conductor'  "+notIn2+" and u.Estado='1' order by distance limit 1;",(err4, data4) => {
if(err4){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 847(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor_Nadie(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,0);
}, 20000);


}else{

var id=0;
try{
id=data4[0].id;
}catch(erv){console.log("Error data4 861",erv);}
if(id>0){

//if(data4.length>0){

var idCondu=data4[0].id;
var nomCondu=data4[0].Nombre;
var TokeFi=data4[0].idToken;
var Dispositivo=data4[0].Id_Dispositivo;
var dataPayLoad =
{
"title":"",
"body":direcci,
"tipoM":"N",
"lat":lat,
"lng":lng,
"direccion":direcci,
"nomTec":nomTec,
"observacion":observa,
"h_solicitud":hora,
"nivel_serv":nivels,
"tipoServi":tipoSer,
"idSoli":idSoli
}

  Customer.getLogin ("UPDATE ee_servicios set Estado='2',Id_UsuarioConductor='"+idCondu+"',nombreConductor='"+nomCondu+"',Id_dispositivo='"+Dispositivo+"' where id='"+idSoli+"'",(err22, data22) => {
if(err22){}else{
envioFCM2(TokeFi,direcci,"Servicio Nuevo",dataPayLoad,idSoli );
}

});




}else{

setTimeout(function() {
    console.log('Buscando Nuevo conductor 888(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor_Nadie(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,0);
}, 20000);



}

}

}); // Cierra Tercer Q



}

}); // Cierra Segundo Q

}
});// Cierra Primer Q



  }
});


  }
});


}







function SendServicioConductorRabit(mensajje){
var mensajj=mensajje.data;
var idSoli=mensajj.idSoli;
	//lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli
var zonaTec="";
var nomTec="";
var notIn="";
var notIn2="";
//Primer Q
  Customer.getLogin ("select  u.nombre,u.apellidos,u.zona  from ee_usuarios u  where u.id='"+mensajj.idTec+"';",(err2, data2) => {
if (err2){
}else{
zonaTec=data2[0].zona;
nomTec=data2[0].Nombre;


  Customer.getLogin ("SELECT GROUP_CONCAT(DISTINCT  Id_UsuarioConductor SEPARATOR ', ') as idss from ee_servicios where Estado<5 and zona='"+zonaTec+"'",(err22, data22) => {
if(err22){}else{
var id2='';
try{

	if(data22[0].idss!=null && data22[0].idss!='null'){
	id2=data22[0].idss;}
}catch(erv){console.log("Error data4 745",erv);}	
if(id2==''){
	
	
}else{
	notIn="and id NOT IN("+id2+")";
	notIn2="and u.id NOT IN("+id2+")";
}



  Customer.getLogin ("SELECT GROUP_CONCAT(DISTINCT  Id_UsuarioConductor SEPARATOR ', ') as idss from ee_servicios where Estado<5",(err2_, data2_) => {
if (err2_){
}else{
	
var id2_='';
try{
	if(data2_[0].idss!=null && data2_[0].idss!='null'){
id2_=data2_[0].idss;
	}
}catch(erv){console.log("Error data4 745",erv);}		
	if(id2==''){
	if(id2_==''){
	
	
}else{
	notIn="and id NOT IN("+id2_+")";
	notIn2="and u.id NOT IN("+id2_+")";
}
	
}else{
	if(id2_==''){
	notIn="and id NOT IN("+id2+")";
	notIn2="and u.id NOT IN("+id2+")";
	
}else{
	notIn="and id NOT IN("+id2+","+id2_+")";
	notIn2="and u.id NOT IN("+id2+","+id2_+")";
}
	
}	

/*}

});	*/


//segundo Q

  Customer.getLogin ("SELECT "+
    "id, ("+
      "6371 * acos ("+
      "cos ( radians("+mensajj.lat+") ) "+
      "* cos( radians( LastLat ) ) "+
      "* cos( radians( LastLng ) - radians("+mensajj.lng+") ) "+
      "+ sin ( radians("+mensajj.lat+") ) "+
      "* sin( radians( LastLat ) )"+
   " )"+
") AS distance,Nombre from ee_usuarios where zona='"+zonaTec+"' and TipoUsuario='Conductor' "+notIn+"  and Estado='1' order by distance limit 1;",(err3, data3) => {
if(err3){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 713(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor2(mensajj.lat,mensajj.lng,mensajj.direcci,mensajj.observa,mensajj.hora,mensajj.nivels,mensajj.tipoSer,mensajj.idTec,mensajj.idSoli,0);
}, 20000);



}else{



//Tercer Q
  Customer.getLogin ("SELECT "+
    "u.id, ("+
      "6371 * acos ("+
      "cos ( radians("+mensajj.lat+") ) "+
      "* cos( radians( u.LastLat ) ) "+
      "* cos( radians( u.LastLng ) - radians("+mensajj.lng+") ) "+
      "+ sin ( radians("+mensajj.lat+") ) "+
      "* sin( radians( u.LastLat ) )"+
   " )"+
") AS distance,u.Nombre,t.idToken,u.Id_Dispositivo from ee_usuarios u  inner join ee_tokens t  on u.id=t.idUsuario  where t.idUsuario=u.id and u.zona='"+zonaTec+"' and u.TipoUsuario='Conductor' "+notIn2+"  and u.Estado='1' order by distance  limit 1;",(err4, data4) => {
if(err4){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 735(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor2(mensajj.lat,mensajj.lng,mensajj.direcci,mensajj.observa,mensajj.hora,mensajj.nivels,mensajj.tipoSer,mensajj.idTec,mensajj.idSoli,0);
}, 20000);


}else{
	
var id=0;
try{
id=data4[0].id;
}catch(erv){console.log("Error data4 745",erv);}
if(id>0){
	


var idCondu=data4[0].id;
var nomCondu=data4[0].Nombre;
var TokeFi=data4[0].idToken;
var Dispositivo=data4[0].Id_Dispositivo;
var dataPayLoad =
{
"title":"",
"body":mensajj.direcci,
"tipoM":"N",
"lat":mensajj.lat,
"lng":mensajj.lng,
"direccion":mensajj.direcci,
"nomTec":nomTec,
"observacion":mensajj.observa,
"h_solicitud":mensajj.hora,
"nivel_serv":mensajj.nivels,
"tipoServi":mensajj.tipoSer,
"idSoli":idSoli
}
//Customer.getLogin ("UPDATE ee_usuarios set Estado='0' where id='"+idCondu+"'",(err22, data22) => {});
  Customer.getLogin ("UPDATE ee_servicios set Estado='2',Id_UsuarioConductor='"+idCondu+"',nombreConductor='"+nomCondu+"',Id_dispositivo='"+Dispositivo+"' where id='"+mensajj.idSoli+"'",(err22, data22) => {
if(err22){}else{
envioFCM2(TokeFi,mensajj.direcci,"Servicio Nuevo",dataPayLoad ,idSoli);
}

});




}else{

setTimeout(function() {
    console.log('Buscando Nuevo conductor 776(no se encontro dispo.. Contador: ** 0)');
SendServicioConductor2(mensajj.lat,mensajj.lng,mensajj.direcci,mensajj.observa,mensajj.hora,mensajj.nivels,mensajj.tipoSer,mensajj.idTec,mensajj.idSoli,0);
}, 20000);


}

}

}); // Cierra Tercer Q



}

}); // Cierra Segundo Q


}
  });

}

});


}
});// Cierra Primer Q


}






// Buscar de nuevo un Conductor(No dispo)...
function SendServicioConductor_Nadie(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,numero){
if(numero<4){
numero=numero+1;
var zonaTec="";
var nomTec="";

var notIn="";
var notIn2="";

  Customer.getLogin ("SELECT GROUP_CONCAT(DISTINCT  idconductor SEPARATOR ', ') as idss from ee_services_asignas where idservicio='"+idSoli+"'",(err22, data22) => {
if(err22){}else{
var id2='';
try{
		if(data22[0].idss!=null && data22[0].idss!='null'){
id2=data22[0].idss;
		}
}catch(erv){console.log("Error data4 745",erv);}	
if(id2==''){
	
	
}else{
	notIn="and id NOT IN("+id2+")";
	notIn2="and u.id NOT IN("+id2+")";
}	

}

});	

//Primer Q
  Customer.getLogin ("select  u.Nombre,u.Apellidos,u.zona  from ee_usuarios u  where u.id='"+idTec+"';",(err2, data2) => {
if (err2){
}else{
zonaTec=data2[0].zona;
nomTec=data2[0].Nombre;

//segundo Q
  Customer.getLogin ("SELECT "+
    "id, ("+
      "6371 * acos ("+
      "cos ( radians("+lat+") ) "+
      "* cos( radians( LastLat ) ) "+
      "* cos( radians( LastLng ) - radians("+lng+") ) "+
      "+ sin ( radians("+lat+") ) "+
      "* sin( radians( LastLat ) )"+
   " )"+
") AS distance,Nombre from ee_usuarios where zona='"+zonaTec+"' and TipoUsuario='Conductor'  "+notIn+"  and Estado='1' order by distance limit 1;",(err3, data3) => {
if(err3){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 943(no se encontro dispo.. Contador: ** '+numero+')');
SendServicioConductor_NadieX(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,numero);
}, 20000);


}else{

//Tercer Q
  Customer.getLogin ("SELECT "+
    "u.id, ("+
      "6371 * acos ("+
      "cos ( radians("+lat+") ) "+
      "* cos( radians( u.LastLat ) ) "+
      "* cos( radians( u.LastLng ) - radians("+lng+") ) "+
      "+ sin ( radians("+lat+") ) "+
      "* sin( radians( u.LastLat ) )"+
   " )"+
") AS distance,u.Nombre,t.idToken,u.Id_Dispositivo from ee_usuarios u  inner join ee_tokens t  on u.id=t.idUsuario  where t.idUsuario=u.id and u.zona='"+zonaTec+"' and u.TipoUsuario='Conductor' "+notIn2+" and u.id not in(SELECT GROUP_CONCAT(DISTINCT  Id_UsuarioConductor SEPARATOR ', ') as idss from ee_servicios where Estado<5)  and u.Estado='1' order by distance limit 1;",(err4, data4) => {
if(err4){

setTimeout(function() {
    console.log('Buscando Nuevo conductor 964(no se encontro dispo.. Contador: ** '+numero+')');
SendServicioConductor_NadieX(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,numero);
}, 20000);


}else{
var id=0;
try{
id=data4[0].id;
}catch(erv){console.log("Error data4 983",erv);}
if(id>0){
//if(data4.length>0){

var idCondu=data4[0].id;
var nomCondu=data4[0].Nombre;
var TokeFi=data4[0].idToken;
var Dispositivo=data4[0].Id_Dispositivo;
var dataPayLoad =
{
"title":"",
"body":direcci,
"tipoM":"N",
"lat":lat,
"lng":lng,
"direccion":direcci,
"nomTec":nomTec,
"observacion":observa,
"h_solicitud":hora,
"nivel_serv":nivels,
"tipoServi":tipoSer,
"idSoli":idSoli
}

  Customer.getLogin ("UPDATE ee_servicios set Estado='2',Id_UsuarioConductor='"+idCondu+"',nombreConductor='"+nomCondu+"',Id_dispositivo='"+Dispositivo+"' where id='"+idSoli+"'",(err22, data22) => {
if(err22){}else{
envioFCM2(TokeFi,direcci,"Servicio Nuevo",dataPayLoad ,idSoli);
}

});

}else{

setTimeout(function() {
    console.log('Buscando Nuevo conductor 1002(no se encontro dispo.. Contador: ** '+numero+')');
SendServicioConductor_NadieX(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,numero);
}, 20000);


}




}

}); // Cierra Tercer Q



}

}); // Cierra Segundo Q

}
});// Cierra Primer Q

}else{
//Ya no encontro ninguno luego de 5 intentos...

Customer.getLogin("Select t.idToken from ee_tokens t where t.idUsuario='"+idTec+"'  order by t.id desc limit 1;",(errt,datat)=>{
if(errt){}
else{
var dataPayLoad =
{

"tipoM":"CC",
"RSP":1,
"idLista":20,
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datat[0].idToken,"","",dataPayLoad,idSoli );
  Customer.getLogin ("UPDATE ee_servicios set Estado='6' where id='"+idSoli+"'",(err22, data22) => {
if(err22){}else{
console.log("se cancela el servicio por no conductor.. "+idSoli);
}

});



}
  
}

);


}
}


function SendServicioConductor_NadieX(lat,lng,direcci,observa,hora,nivels,tipoSer,idTec,idSoli,numero){

	
	Customer.getLogin("Select t.idToken from ee_tokens t where t.idUsuario='"+idTec+"'  order by t.id desc limit 1;",(errt,datat)=>{
if(errt){}
else{
var dataPayLoad =
{

"tipoM":"CC",
"RSP":1,
"idLista":20,
"lat":"",
"lng":"",
"nomConduc":""
}

envioFCM2(datat[0].idToken,"","",dataPayLoad,idSoli );
  Customer.getLogin ("UPDATE ee_servicios set Estado='6' where id='"+idSoli+"'",(err22, data22) => {
if(err22){}else{
console.log("se cancela el servicio por no conductor.. "+idSoli);
}

});



}
  
}

);

	
}


// Find a single Customer with a customerId
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

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") { 
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
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

