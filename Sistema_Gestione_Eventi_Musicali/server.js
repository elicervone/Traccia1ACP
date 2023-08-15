var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express(),
	id = 0;

app.use(express.static(__dirname));

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
    partecipanti: [{ type: Schema.Types.ObjectId, ref: "ArtistSchema" }], // Riferimenti agli artisti coinvolti nell'evento
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
	caratteristiche: [ {nome: String, cognome: String, Email: String, telefono: String, cachet: Number} ], //TUTTI
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
    strumenti: [String] //SOLO STRUMENTISTI
});

var Artisti = mongoose.model("Artisti", ArtistSchema);
var Eventi = mongoose.model("Eventi", EventSchema);

//Questi servono per trovare l'id piu piccolo per poi partire da quello per il futuro 
Artisti.find({}, function (err, result){

	var max = -1;
	result.forEach(element => {
		if (element.id > max)
			max = element.id;
	});

	id = max;
	console.log("MAX ARTISTI = " + max);

});

Eventi.find({}, function (err, result){

	var max = -1;
	result.forEach(element => {
		if (element.id > max)
			max = element.id;
	});

	id = max;
	console.log("MAX EVENTI= " + max);

});

http.createServer(app).listen(3000);

//ROTTE