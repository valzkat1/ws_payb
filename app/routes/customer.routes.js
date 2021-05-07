module.exports = app => {
  const customers = require("../controllers/customer.controller.js");


  // Login basico wallet
  app.post("/logon", customers.logon);

  // Login basico2 wallet
  app.post("/logonP", customers.logonP);

  // Login basico2 wallet
  app.post("/logonPV", customers.logonPV);

  // GetUsers wallet lista verde..
  app.post("/getUsers", customers.getUsers);


  // Almacena viaje qr.
  app.post("/guardar_payb", customers.guardar_payb);



  // Almacena ubicaciones validador.
  app.post("/guardar_locations", customers.guardar_locations);


  // Almacena viaje local.
  app.post("/guardar_payb_all", customers.guardar_payb_all);

 


  // Almacena viaje nfc..
  app.post("/guardar_payb_nfc", customers.guardar_payb_nfc);

  //Almacena viaje itag.
  app.post("/guardar_payb_tag", customers.guardar_payb_tag);



  // Guarda datos del validadro..
  app.post("/guardar_validador", customers.guardar_validador);
  
  
  // Guarda datos del validadro..
  app.post("/guardar_validador_conta", customers.guardar_validador_conta);


    // Guarda viaje ..
  app.post("/guardar_itag", customers.guardar_itag);
  
  
      // Vincula NFC a wallet..
  app.post("/vincularNfc", customers.vincularNfc);


    // Vincula itag a conductor..
  app.post("/vincularItag", customers.vincularItag);


   // getUserByUid..	
  app.get("/getUserByUid", customers.getUserByUid);



  // usuarios_config..	
  app.get("/usuarios_config", customers.usuarios_config);


  // getHistorialUserByMail..	
  app.get("/getHistorialUserByMail", customers.getHistorialUserByMail);
  
  
    // getHistorialUserByItag..	
  app.get("/getHistorialUserByItag", customers.getHistorialUserByItag);
  
  
   // getHistorialLiquidaciones..	
  app.get("/getHistorialLiquidaciones", customers.getHistorialLiquidaciones);
  
  
     // getUserByNfc..	
  app.get("/getUserByNfc", customers.getUserByNfc);
  
  
     // getUserID..	
  app.get("/getUserID", customers.getUserID);
  
  
     // getHistory..	
  app.get("/getHistory", customers.getHistory);
  
  


    // saldos conductor..
  app.post("/saldos", customers.saldos);


    // setBlueUUid conductor..
  app.post("/setBlueUUid", customers.setBlueUUid);
  
  
      // Vincular conductor..
  app.post("/VincularConductor", customers.VincularConductor);
  
  
      //Valida ..
  app.post("/validarRecarga", customers.validarRecarga);


      // validarRecargaOK ..
  app.post("/validarRecargaOK", customers.validarRecargaOK);
  
  
        // saldos conductor..
  app.get("/getTime", customers.getTime);
  
  
  
        // saldos conductor..
  app.post("/validarRecarga", customers.validarRecarga);
  


       // Registro wallet..
  app.post("/registro", customers.registro);



       // Registro wallet P..
  app.post("/registroP", customers.registroP);



     // Registro wallet P mail..
  app.post("/registroP_mail", customers.registroP_mail);



    // transferir wallet..
  app.post("/transferir", customers.transferir);
  
  
  
      // transferirP wallet ..
  app.post("/transferirP", customers.transferirP);
  
  
  
      // sendMailConfirma..
  app.post("/sendMailConfirma", customers.sendMailConfirma);
  
  
  
      // Registro wallet P mail..
  app.post("/registroP_mail", customers.registroP_mail);



       // Qr Add contacto.
  app.post("/getQRContactoP", customers.getQRContactoP);



       // Qr Add contacto.
  app.post("/getQRContacto", customers.getQRContacto);


  // ApkVersion..	
  app.get("/ApkVersion", customers.ApkVersion);



  // Almacena Token FCM..	
  app.get("/registroGCM", customers.registroGCM);
  
  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);


};
