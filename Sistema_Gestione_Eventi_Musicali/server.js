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
	password: String
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
	console.log("hai fatto get a /home, bravo");
	
	Eventi.find(function(err, ris){//query generica per tutti gli eventi
		console.log(ris);
		res.json(ris);
	});
});

//get a /events
app.get("/events", function(req, res){
	console.log("hai fatto get a /events, brav scem");

	Eventi.find(function(err, ris){//query generica per tutti gli eventi
		console.log(ris);
		res.json(ris);
	});
});

//get a /artists
app.get("/artists", function(req, res){
	console.log("hai fatto get a /artists, brav strunz");

	Artisti.find(function(err, ris){//query generica per tutti gli artisti
		console.log(ris);
		res.json(ris);
	});
});

//get a /addEvents
app.get("/addEvents", function(req, res){
	console.log("hai fatto get a /addEvents, brav lot");

	Eventi.find(function(err, ris){//query generica per tutti gli eventi
		console.log(ris);
		res.json(ris);
	});
});

//get a /editArtists
app.get("/editArtists", function(req, res){
	console.log("hai fatto get a /editArtists, brav cul");

	Artisti.find(function(err, ris){//query generica per tutti gli artisti
		console.log(ris);
		res.json(ris);
	});
});

//post a /editArtists
app.post("/editArtists", function(req, res){
	console.log("hai fatto post a /editArtist, brav cul");

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
	console.log("hai fatto post a /addEvents, brav lot");
	
	var newEvent = new Event({"id":++idE,  "tipo":req.body.tipo, "giorno":req.body.giorno, "location":req.body.location, "costo":req.body.costoTotale, "partecipanti":req.body.partecipanti});

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