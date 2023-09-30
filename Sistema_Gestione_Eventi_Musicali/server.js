//#region Informazioni essenziali
var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express(),
	idD = 0;
	idT = 0;

app.use(express.static(__dirname + "/gestore"));

app.use(express.urlencoded());

mongoose.connect('mongodb://127.0.0.1/Libreria_Online');
//#endregion

//#region Inizializzazione del DB
//Schema per gli Testi
var TestiSchema = mongoose.Schema({    
    id: Number,
	tipo: {
		type: [String],
		enum : ["DIGITALE", "CARTACEO"],
		default: 'CARTACEO'
	},
    titolo: String,
    autori: String,
    editore: String,
    genere: String,
    prezzo: Number,
	isbn: Number,
	disponibilita: Number
});

//Schema per gli Dipendenti
var DipendentiSchema = mongoose.Schema({    
    id: Number,

	nome: String,
	cognome: String,

	username: String,
	password: String,
});

//Inizializzo i modelli
var Dipendenti = mongoose.model("Dipendenti", DipendentiSchema);
var Testi = mongoose.model("Testi", TestiSchema);

//Trovo gli id minori, saranno il punto di partenza per gli id futuri
Dipendenti.find({}, function (err, result){

	var max = -1;
	result.forEach(element => {
		if (element.id > max)
			max = element.id;
	});

	idD = max;
	console.log("MAX Dipendenti = " + max);

});

//Trovo gli id minori, saranno il punto di partenza per gli id futuri
Testi.find({}, function (err, result){

	var max = -1;
	result.forEach(element => {
		if (element.id > max)
			max = element.id;
	});

	idT = max;
	console.log("MAX Testi= " + max);

});
//#endregion

//Avvio il server
http.createServer(app).listen(3000);

//ROTTE

//get a /home
app.get("/home", function(req, res){
	console.log("get a /home");
	
	Dipendenti.find(function(err, ris){//query generica per tutti i Dipendenti
		res.json(ris);
	});
});

//get a /testi
app.get("/testi", function(req, res){
	console.log("get a /testi");

	Testi.find(function(err, ris){//query generica per tutti i Testi
		res.json(ris);
	});
});

//get a /dipendenti
app.get("/dipendenti", function(req, res){
	console.log("get a /dipendenti");

	Dipendenti.find(function(err, ris){//query generica per tutti i Dipendenti
		res.json(ris);
	});
});

//post a /testi
app.post("/testi", function(req, res){
	console.log("post a /testi");

	//Creo un nuovo artista e lo salvo nel DB
	var nuovo_testo = new Testi({"id":++idT, "tipo":req.body.tipo, "titolo":req.body.titolo, "autori":req.body.autori, "editore":req.body.editore, "genere":req.body.genere, "prezzo":req.body.prezzo, "isbn":req.body.isbn, "disponibilita":req.body.disponibilita});

		nuovo_testo.save(function (err, result) {
			if (err !== null) {
				
				console.log(err);
				res.send("ERROR1");

			} else {
				
				Testi.find({}, function (err, result) {
					
					if (err !== null) {
							
						console.log(err);
						res.send("ERROR2");
					}
				
					res.json(result);
				});
			}
		});
});
/*
//post a /addEvents
app.post("/addEvents", function(req, res){
	console.log("post a /addEvents");
	
	//Creo un nuovo evento e lo salvo nel DB
	var newEvent = new Testi({"id":++idT,  "tipo":req.body.tipo, "giorno":req.body.giorno, "location":req.body.location, "costo":req.body.costoTotale, "partecipanti":req.body.partecipanti});

	newEvent.save(function (err, result) {
		if (err !== null) {
			
			console.log(err);
			res.send("ERROR1");

		} else {
			
			Testi.find({}, function (err, result) {
				
				if (err !== null) {
			    		
					console.log(err);
			    	res.send("ERROR2");
				}
			
				res.json(result);
			});
		}
	});
});

//post a /home
app.post("/home", function(req, res){
	console.log("post a /home");

	var datiUser = req.body.user;
	var datiPass = req.body.pass;
	
	//Cerco negli Dipendenti in base all'user e controllo la password (dovrebbe essere criptata come abbiamo fatto per ingegneria del soft.)
	Dipendenti.find({"username": datiUser},function(err, ris){
		
		var trovato = false;

		if(err != null)
		{
			console.log(err);
		}
		ris.forEach(element => {
			
			//Trovato
			if(element.password == datiPass && trovato == false)
			{
				res.send("OK");
				trovato = true;
				console.log("Trovata una corrispondenza");
			}
		});
		
		//Non trovato
		if(trovato == false)
		{
			res.send("ERRORE");
			console.log("User o pass sbagliati");
		}
	});
});

//put a /artists
app.put("/artists", function (req, res) {
	console.log("put a /artists");

	var giorniNuovi = req.body.giorni;
	var iddi = req.body.iddi;
	

	Dipendenti.find({"id": iddi}, function (err, risultato) {
		risultato.forEach(element => {
			
			//Aggiorno i giorni con i giorni nuovi e salvo
			element.disponibilita = giorniNuovi;

			//Per qualche motivo questa funzione è incredibilmente lenta, quindi per più salvataggi consecutivi
			//potrebbe sembrare che non stia funzionando, ma in realtà ci mette un poco a salvare i cambiamenti consecutivi
			element.save(function (err) {
				if (err){
					console.log(err)
					res.send("ERROR");
				}
				else{
					console.log("GIORNI AGGIORNATI");
				}
				
			});
		});
		
		
    });

});

//delete a /editArtists
app.delete("/editArtists", function(req, res){
	console.log("delete a /editArtists");

	//Rimuovo un artista filtrato con l'username
	Dipendenti.find({"username": req.body.username}, function (err, risultato) {
		risultato.forEach(element => {
			
			element.deleteOne(function (err) {
				if (err){
					console.log(err)
					res.send("ERROR3");
				}
				else{
					console.log("ARTISTA ELIMINATO");
					res.send(risultato);
				}
				
			});
		});	
	});
});*/