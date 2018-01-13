// Inicijalizacija Firebase-a
var config = {
    apiKey: "AIzaSyDa6--O1ALh14fO6oHEbCW0ySd7cYOc7Gw",
    authDomain: "kolodvor-dfb97.firebaseapp.com",
    databaseURL: "https://kolodvor-dfb97.firebaseio.com",
    projectId: "kolodvor-dfb97",
    storageBucket: "kolodvor-dfb97.appspot.com",
    messagingSenderId: "430718609713"
  };
  firebase.initializeApp(config);

// Kreiranje objekta Firebase baze
var oDb = firebase.database();
var oDbGradovi = oDb.ref('gradovi');
var oDbKarte = oDb.ref('karte');
