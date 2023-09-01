var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express(),
	idA = 0;
	idE = 0;

app.use(express.static(__dirname + "/agente"));

app.use(express.urlencoded());

mongoose.connect('mongodb://127.0.0.1/Sistema_Gestione_Eventi_Musicali');

//La forma della "tabella" degli eventi
var EventSchema = mongoose.Schema({    
    id: Number,
	tipo: {
		type: [String],
		enum : ["ESIBIZIONE", "CONCERTO", "STRUMENTALE"],
		default: 'ESIBIZIONE'
	},
    partecipanti: [{ type: mongoose.Schema.Types.ObjectId, ref: "ArtistSchema" }], // Riferimenti agli artisti coinvolti nell'evento
    giorno: Date,
    location: String,
    costoTotale: Number
});

//La forma della "tabella" degli artisti
var ArtistSchema = mongoose.Schema({    
    id: Number, //TUTTI PER FORZA
	tipo: { //TUTTI
		type: [String],
		enum : ["CANTANTE", "STRUMENTISTA"],
		default: 'CANTANTE'
	},
	nome: String,
	cognome: String,
	Email: String,
	telefono: String,
	cachet: Number,
    genere: { //SOLO CANTANTI
		type: [String],
		enum : ["CLASSICA", "LEGGERA", "POP", "JAZZ", "null"],
		default: 'null'
	},
    registro: { //SOLO CANTANTI CLASSICI
		type: [String],
		enum : ["SOPRANO", "MEZZOSOPRANO", "CONTRALTO", "TENORE", "BARITONO", "BASSO", "null"],
		default: 'null'
	},
    strumenti: [String], //SOLO STRUMENTISTI, MAX 4
	username: String,
	password: String,
	disponibilita: [Date]
});

//forse va messo uno schema anche per l'admin (agente)

var Artisti = mongoose.model("Artisti", ArtistSchema);
var Eventi = mongoose.model("Eventi", EventSchema);

//Questi servono per trovare l'id piu piccolo per poi partire da quello per il futuro 
Artisti.find({}, function (err, result){

	var max = -1;
	result.forEach(element => {
		if (element.id > max)
			max = element.id;
	});

	idA = max;
	console.log("MAX ARTISTI = " + max);

});

Eventi.find({}, function (err, result){

	var max = -1;
	result.forEach(element => {
		if (element.id > max)
			max = element.id;
	});

	idE = max;
	console.log("MAX EVENTI= " + max);

});

http.createServer(app).listen(3000);

//ROTTE

//get a /home
app.get("/home", function(req, res){
	console.log("get a /home");
	
	Artisti.find(function(err, ris){//query generica per tutti gli eventi
		res.json(ris);
	});
});

//get a /events
app.get("/events", function(req, res){
	console.log("get a /events");

	Eventi.find(function(err, ris){//query generica per tutti gli eventi
		res.json(ris);
	});
});

//get a /artists
app.get("/artists", function(req, res){
	console.log("get a /artists");

	Artisti.find(function(err, ris){//query generica per tutti gli artisti
		res.json(ris);
	});
});

//get a /addEvents
app.get("/addEvents", function(req, res){
	console.log("get a /addEvents");

	Eventi.find(function(err, ris){//query generica per tutti gli eventi
		res.json(ris);
	});
});

//get a /editArtists
app.get("/editArtists", function(req, res){
	console.log(" get a /editArtists, brav cul");

	Artisti.find(function(err, ris){//query generica per tutti gli artisti
		res.json(ris);
	});
});

//post a /editArtists
app.post("/editArtists", function(req, res){
	console.log("post a /editArtist");

	var newArtist = new Artisti({"id":++idA, "tipo":req.body.tipo, "nome":req.body.nome, "cognome":req.body.cognome, "Emal":req.body.Emal, "telefono":req.body.telefono, "cachet":req.body.cachet, "genere":req.body.genere, "registro":req.body.registro, "strumenti":req.body.strumenti, "username":req.body.username, "password":req.body.password});

		newArtist.save(function (err, result) {
			if (err !== null) {
				
				console.log(err);
				res.send("ERROR1");

			} else {
				
				Artisti.find({}, function (err, result) {
					
					if (err !== null) {
							
						console.log(err);
						res.send("ERROR2");
					}
				
					res.json(result);
				});
			}
		});
});

//post a /addEvents
app.post("/addEvents", function(req, res){
	console.log("post a /addEvents");
	
	var newEvent = new Eventi({"id":++idE,  "tipo":req.body.tipo, "giorno":req.body.giorno, "location":req.body.location, "costo":req.body.costoTotale, "partecipanti":req.body.partecipanti});

	newEvent.save(function (err, result) {
		if (err !== null) {
			
			console.log(err);
			res.send("ERROR1");

		} else {
			
			Eventi.find({}, function (err, result) {
				
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
	
	Artisti.find({"username": datiUser},function(err, ris){//query generica per tutti gli eventi
		
		var trovato = false;

		if(err != null)
		{
			console.log(err);
		}
		ris.forEach(element => {
			
			if(element.password == datiPass && trovato == false)
			{
				res.send("OK");
				trovato = true;
				console.log("Trovata una corrispondenza");
			}
		});
		
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
	
	Artisti.find({"id": iddi}, function (err, risultato) {
		risultato.forEach(element => {
			
			// update status
			element.disponibilita = giorniNuovi;

			// update order with .save to trigger schema validation
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

app.delete("/editArtists", function(req, res){
	console.log("delete a /editArtis");

	Artisti.find({"username": req.body.username}, function (err, risultato) {
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
});