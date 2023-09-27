var main = function () {

    "use strict";

    $(".tabs li a").toArray().forEach(function (element) {
        var $element = $(element);

        $element.on("click", function () {
            var $content;

            $(".tabs li a").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) { // "Home" tab: La pagina per il login con qualche foto ecc...
                $content = $("<p>");

                //#region variabili
                var userText = $("<h3>").text("Username:");
                var passText = $("<h3>").text("Password:");
                var input_user = $("<input>");
                var input_pass = $("<input>");
                var pulsante = $("<button>").text("Login");
                var pulsanteLogOut = $("<button>").text("Logout");

                var user;
                //#endregion

                $.getJSON("/home", function(artisti){
                    
                    //#region append
                    $content.append(userText);
                    $content.append(input_user);
    
                    $content.append(passText);
                    $content.append(input_pass);
    
                    $content.append(pulsante);
                    //#endregion

                    //Pulsante per il login
                    pulsante.on("click", function(){
    
                        if(input_user.val()!=="" && input_pass.val()!=="")  
                        {
                            login(input_user.val(), input_pass.val(), $content, giorno, pulsanteGiorno, function(ris){

                                if(ris == true)
                                {
                                    input_user.remove();
                                    input_pass.remove();
                                    pulsante.remove();
                                    userText.remove();
                                    passText.remove();
                                    $content.append(pulsanteLogOut);
                                }

                            });
                            user = input_user.val();
                            input_user.val("");
                            input_pass.val("");
                        }
                        else
                        {
                            alert("Inserisci username e password perfavore");
                        }
                            
                    });

                    //Pulsante per aggiungere il giorno
                    /*pulsanteGiorno.on("click", function(){

                        $("h5").remove();
                        aggiungiGiorno(giorno.val(), user);
                        giorno.val("");//pulisce
                        $content.append($("<h5>Giorno aggiunto</h5>"))
                    });*/
                    
                    //Pulsante per il logout
                    pulsanteLogOut.on("click", function(){
                        window.location.reload();//ricarica la pagina
                        return false;
                    });

                    //Attenzione, se si aggiunge un giorno e poi si cerca di visualizzare la disponibilità degli artisti cliccando sulla sezione "visualizza artisti"
                    //La pagina non caricherà per qualche motivo a me sconosciuto, quindi se possibile dopo aver finito con i giorni, fare il logout grazie :)
                 
                });
                
            }else if ($element.parent().is(":nth-child(2)")) { // "Visualizza Testi" tab: Mostra tutti gli artisti e permette una ricerca per data in base alla disponibilità           
                $content = $("<p>");

                $.getJSON("/testi", function(testi){

                    //Se non si filtra appaiono tutti gli artisti nel DB
                    testi.forEach(function(ris){

                        var giaStampati = [];

                        ris.disponibilita.forEach(function(ris1){

                            if(!giaStampati.includes(ris1.isbn)) //PROBLEMA forse va ris1?
                            {
                                $content.append($("<h4>").text( ris1.titolo+" |Autore: " + ris1.autore + " |Disponibili: " + ris1.disponibilita +" |Prezzo: " + ris1.prezzo + "€"));
                                giaStampati.push(ris1.isbn); 
                            }                      
                        });
                        
                    });
                    
                    
                });
                
            }else if ($element.parent().is(":nth-child(3)")) { // "Modifica Testi" tab: Permette di aggiungere e rimuovere gli artisti
                $content = $("<p>");

                //#region variabili
                var giaEsiste = false;
                var pulsante_aggiungi = $("<button>").text("Aggiungi").addClass("separazione");
                var pulsante_rimuovi = $("<button>").text("Rimuovi").addClass("destra").addClass("colonna");

                var isbn_rim = $("<input>").addClass("destra").addClass("colonna");
                var isbn_agg = $("<input>");
                //#endregion

                //#region TIPO CARTACEO O DIGITALE
                var tipo1 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"CARTACEO", "id":"sceltaTipo1"});
                var labeltipo1 = $("<label>Cartaceo</label>").attr({"for": "sceltaTipo1"});
                var tipo2 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"DIGITALE", "id":"sceltaTipo2"});
                var labeltipo2 = $("<label>Digitale</label>").attr({"for": "sceltaTipo2"});
                //#endregion
                
                //#region variabili 2
                var titolo = $("<input>");
                var autori = $("<input>");
                var editore = $("<input>");
                var genere = $("<input>");
                var prezzo = $("<input>");
                var disponibilita = $("<input>");
                //#endregion

                $.getJSON("/testi", function(ris){
                //#region append
                    $content.append($("<h3>ISBN del testo da rimuovere</h3>").addClass("destra").addClass("pocoDestra"));
                    $content.append(isbn_rim);
                    $content.append(pulsante_rimuovi.addClass("destraInput").addClass("sottoDestra"));
                    
                    $content.append($("<h3>SBN del testo da aggiungere</h3>"));
                    $content.append(isbn_agg);
                    $content.append($("<h3>Titolo</h3>"));
                    $content.append(titolo);
                    $content.append($("<h3>autore/i</h3>"));
                    $content.append(autori);
                    $content.append($("<h3>Editore</h3>"));
                    $content.append(editore);
                    $content.append($("<h3>Genere</h3>"));
                    $content.append(genere);
                    $content.append($("<h3>Prezzo</h3>"));
                    $content.append(prezzo);
                    $content.append($("<h3>disponibilità</h3>"));
                    $content.append(disponibilita);

                    $content.append($("<h3>Il testo è di tipo</h3>"));
                    $content.append(tipo1.addClass("pocoSotto"));
                    $content.append(labeltipo1);
                    $content.append(tipo2.addClass("pocoSotto"));
                    $content.append(labeltipo2);

                    $content.append(pulsante_aggiungi);
                    //#endregion

                    //Rimuove il testo in base all'isbn
                    pulsante_rimuovi.on("click", function(){
                        rimuovi_artista(isbn_rim.val());
                        isbn_rim.val("");
                    });

                    //Aggiunge un testo
                    pulsante_aggiungi.on("click", function(){
                        try {
                            var getTipo = document.querySelector("input[name='tipo']:checked").value;

                            //#region vincoli
                            /*if(getTipo == "SUMENTTRISTA")
                            {
                                if(getGenere != "null" || getRegistro != "null")
                                {
                                    alert("Lo strumentista non può avere un genere o un registro");
                                    return;
                                }

                                if(strumento1.val() == "" && strumento2.val() == "" && strumento3.val() == "" && strumento4.val() == "")
                                {
                                    alert("Lo strumentista deve avere almeno uno strumento");
                                    return;
                                }
                            }*/

                            ris.forEach(element => {
                                console.log(element.isbn)
                                console.log(isbn_agg.val())
                                if (element.isbn == isbn_agg.val())
                                {
                                    alert("Testo gia registrato");
                                    giaEsiste = true;
                                    return;
                                } 
                            });
                            //#endregion

                            if(giaEsiste == false)
                            {
                                aggiungi_testo(isbn_agg.val(), titolo.val(), autori.val(), editore.val(), genere.val(), prezzo.val(), disponibilita.val(), getTipo);
                            }

                            // Trova tutti gli <input> 
                            const inputElements = document.getElementsByTagName("input");

                            // Utilizza forEach per iterare su ciascun elemento e pulirne il valore
                            Array.from(inputElements).forEach(input => {
                                if(input.type == "radio")
                                {
                                    input.checked = false;
                                }
                                else
                                {
                                    input.value = "";
                                }
                            });
                            giaEsiste = true;

                        } catch (error) {
                            alert("Seleziona qualcosa in ogni campo necessario");
                        }
                        
                        
                    });
                    
                });

            }else if($element.parent().is(":nth-child(4)")) { // "Visualizza Dipendenti" tab: Mostra tutti gli eventi
                $content = $("<p>");

                $.getJSON("/dipendenti", function(eventi){
                    
                    eventi.forEach(function(ris){

                        $content.append($("<h4>").text(ris.tipo+" in " + ris.location + " il giorno " + ris.giorno));//Eh lo so esce la data completa (ma davvero completa)
                    });
                });

            }else if($element.parent().is(":nth-child(5)")) { // "Aggiungi Eventi" tab: Permette di aggiungere degli eventi
                $content = $("<p>");

                //#region variabili
                var somma = 0;
                var partecipano = [];
                var pulsante_aggiungi = $("<button>").text("Aggiungi");
                //#endregion

                //#region TIPO
                var tipo1 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"ESIBIZIONE", "id":"sceltaTipo1"});
                var labeltipo1 = $("<label>Esibizione</label>").attr({"for": "sceltaTipo1"});
                var tipo2 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"CONCERTO", "id":"sceltaTipo2"});
                var labeltipo2 = $("<label>Concerto</label>").attr({"for": "sceltaTipo2"});
                var tipo3 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"STRUMENTALE", "id":"sceltaTipo3"});
                var labeltipo3 = $("<label>Strumentale</label>").attr({"for": "sceltaTipo3"});
                //#endregion

                //#region variabili 2
                var giorno = $("<input>").attr({"type" : "date"});
                var location = $("<input>");
                var costo = $("<h4>");

                var partecipante = $("<input>");
                var pulsante_partecipante = $("<button>").text("Aggiungi partecipante");
                //#endregion

                //#region eventi ai radio button [Legacy]

                //tutti gli elementi radio con nome "options"
                const radioButtons = document.getElementsByName("tipo");

                //Non penso funzioni questo codice, lo lascio per evitare di rompere qualcosa
                radioButtons.forEach(function(radioButton) {
                    radioButton.addEventListener("change", function() {
                        // La selezione è cambiata
                        if (radioButton.checked) {
                            somma = 0;
                            costo.text("");
                            partecipano = [];//svuota l'array
                            console.log("Hai cambiato il tipo di evento");
                        }
                    });
                });

                //#endregion

                $.getJSON("/addEvents", function(ris){
                    //#region append                    
                    $content.append($("<h3>Giorno dell'evento</h3>"));
                    $content.append(giorno);
                    $content.append($("<h3>Location dell'evento</h3>"));
                    $content.append(location);

                    $content.append($("<h3>L'evento è del tipo</h3>"));
                    $content.append(tipo1.addClass("pocoSotto"));
                    $content.append(labeltipo1);
                    $content.append(tipo2.addClass("pocoSotto"));
                    $content.append(labeltipo2);
                    $content.append(tipo3.addClass("pocoSotto"));
                    $content.append(labeltipo3);

                    $content.append($("<h3>I partecipanti sono</h3>"));
                    $content.append(partecipante);
                    $content.append(pulsante_partecipante);

                    $content.append($("<h3>Costo totale dell'evento:</h3>"));
                    $content.append(costo);

                    $content.append(pulsante_aggiungi);

                    //#endregion

                    //Aggiunge un partecipante all'evento
                    pulsante_aggiungi.on("click", function(){

                        //#region vincoli                       
                        var numCantanti = 0;
                        var numStrument = 0;
                        var tipoEvento = document.querySelector("input[name='tipo']:checked").value;

                        if(tipoEvento == "ESIBIZIONE")//ESIBIZIONE
                        {
                            
                            partecipano.forEach(element => {
                                console.log(element.tipo);
                                if(element.tipo == "CANTANTE")
                                {
                                    numCantanti++;
                                }
                                else
                                {
                                    numStrument++;
                                }
                            });

                            console.log("Num cantanti: ", numCantanti, " Num strumenti: ", numStrument);

                            if(numCantanti != 1 || numStrument < 1)
                            {
                                alert("Un'esibizione deve avere un singolo cantante, ed uno o più strumentisti");
                                return;
                            }
                        }
                        else if(tipoEvento == "CONCERTO")//CONCERTO
                        {
                            partecipano.forEach(element => {
                                if(element.tipo == "CANTANTE")
                                {
                                    numCantanti++;
                                }
                                else
                                {
                                    numStrument++;
                                }
                            });

                            console.log("Num cantanti: ", numCantanti, " Num strumenti: ", numStrument);

                            if(numCantanti < 1 || numStrument < 1)
                            {
                                alert("Un concerto deve avere almeno un cantante, ed uno o più strumentisti");
                                return;
                            }
                        }
                        else if(tipoEvento == "STRUMENTALE")//STRUMENTALE
                        {
                            partecipano.forEach(element => {
                                if(element.tipo == "CANTANTE")
                                {
                                    numCantanti++;
                                }
                                else
                                {
                                    numStrument++;
                                }
                            });

                            console.log("Num cantanti: ", numCantanti, " Num strumenti: ", numStrument);

                            if(numCantanti > 0 || numStrument < 1)
                            {
                                alert("Uno strumentale deve avere solo strumentisti");
                                return;
                            }
                        }
                        else
                        {
                            console.log("ERRORE NEL CONTROLLO EVENTO");
                            return;
                        }
                        //#endregion

                        try {
                            var getTipo = document.querySelector("input[name='tipo']:checked").value;

                            aggiungiEvento(getTipo, giorno.val(), location.val(), somma, partecipano);

                            // Trova tutti gli <input> 
                            const inputElements = document.getElementsByTagName("input");

                            // Utilizza forEach per iterare su ciascun elemento e pulirne il valore
                            Array.from(inputElements).forEach(input => {
                                if(input.type == "radio")
                                {
                                    input.checked = false;
                                }
                                else
                                {
                                    input.value = "";
                                }
                            });

                            somma = 0;
                            costo.text("");
                            partecipano = [];

                        } catch (error) {
                            alert("Seleziona qualcosa in ogni campo necessario");
                        }
                        
                        
                    });

                    pulsante_partecipante.on("click", function(){

                        var ris;

                        try {
                            aggiungiPartecipante(partecipante.val(), function(artista) {

                                if (artista) {

                                    somma += artista.paga;
                                    costo.text(somma);
                                    partecipano.push(artista);//QUAQUAQUA
                                    console.log("Partecipante aggiunto:", artista);

                                } else {
                                    alert("Seleziona un artista presente nel DB");
                                }

                                partecipante.val("");
                            });
                        } catch (error) {
                            alert("Compila tutti i campi necessari");
                        }
                        finally
                        {
                            partecipante.val("");
                        }
                        
                    });

                });


            $("main .content").append($content);

            return false;
            }
        });
    });



    var login = function(username, password, contenuto, g, pg, callback){

        var dati = {user: username, pass: password};

        $.post("/home", dati, function (result) {

            if(result == "OK")
            {
                contenuto.append(pg);
                contenuto.append(g);
                callback(true);
            }
            else
            {
                alert("Username o password errati!");
                callback(false);
            }

        });
    };

    var aggiungi_testo = function(isbn_agg, titolo, autori, editore, genere, prezzo, disponibilita, getTipo){

        var nuovo_testo;
            
        if (titolo!="" && autori!=="" && editore!=="" && genere!=="" && prezzo!=="" && isbn_agg!=="" && disponibilita!==""){

            $.getJSON("/testi", function (element){

                element.forEach(e => {
                    //Controllo aggiuntivo che non si inserisca un username gia in uso
                    if(e.isbn == isbn_agg)
                    {
                        alert("Se vedi questo, qualcosa è andato storto nel primo controllo");
                        return;
                    }
                });

                nuovo_testo = {"id":-1, "tipo":getTipo, "titolo":titolo, "autori":autori, "editore":editore, "genere":genere, "prezzo":prezzo, "disponibilita":disponibilita, "isbn":isbn_agg};

                //post per creare l'artista
                $.post("/testi", nuovo_testo, function (result) {

                    console.log(result);

                });
                
            });

        } else {

            alert("Riempi tutti i campi necessari");

        }

    };

    var rimuovi_artista = function(isbn_rim){
        
        var artista;
            
        if (isbn_rim != ""){

            $.getJSON("/editArtists", function (element){

                var k = false;
                element.forEach(e => {
                    if(e.username == isbn_rim)
                    {
                        console.log("trovato" + e.username);
                        artista = {"id":-99, "username":isbn_rim};

                        //rip :skullemoji:
                        $.ajax({
        
                            url: '/editArtists',
                            type:'DELETE',
                            data: artista,
                            success: function(result){
                                console.log(result);
                            }
                        });
                        k = true;
                        alert("Artista eliminato");
                        return;
                    }
                });
                
                if(k)
                {
                    return;
                }
                else
                {
                    alert("L'artista non è presente nel DB");
                }
            });

        } else {

            alert("Seleziona qualcosa in ogni campo necessario");

        }

    };

    var aggiungiPartecipante = function(userPartecipante, callback) {
        $.getJSON("/artists", function(artisti) {
            var risultato = null;
    
            //Per aggiungere un partecipante prendo tutti gli artisti ne metto le cose importanti in "risultato"
            artisti.forEach(function(artista) {
                if (artista.username === userPartecipante) {
                    risultato = { id: artista._id, nome: artista.nome, cognome: artista.cognome, paga: artista.cachet, tipo: artista.tipo };
                }
            });
    
            //se risultato non è vuoto, allora lo ritorno con una callback
            if (risultato !== null) {
                console.log("Trovato il partecipante");
                console.log(risultato);
                callback(risultato);
            } else {
                console.log("NON trovato il partecipante");
                callback(false);
            }
        });
    };

    var aggiungiEvento = function(getTipo, giorno, location, costo ,partecipanti){
        
        var evento;
            
        if (giorno!="" && location!=="" && partecipanti.length > 0){

            var evento;
            var iddi = [];

            //vettore di id di partecipanti (tante I e tante D)
            partecipanti.forEach(element => {
                iddi.push(element.id);
            });

            $.getJSON("/addEvents", function (element){

                evento = {"id":-1, "tipo":getTipo, "giorno":giorno, "location":location, "costoTotale":costo, "partecipanti":iddi};

                //post per aggiungere l'eneto
                $.post("/addEvents", evento, function (result) {

                    console.log(result);

                });
                
            });

        } else {

            alert("Seleziona qualcosa in ogni campo necessario");
        }

    }; 

    var aggiungiGiorno = function(giorno, user) {
        $.getJSON("/artists", function(artisti) {
            var risultato = [];
            var id;
            var bool = false;
    
            //Prendo tutti gli artisti, seleziono quello loggato con l'username e sovrascrivo i giorni
            artisti.forEach(function(artista) {
                if (artista.username === user) {
                    risultato = artista.disponibilita;
                    risultato.push(giorno);
                    id = artista.id;

                    bool = true;
                }
            });

            if(bool)
            {
                var risposta = {iddi: id, giorni:risultato};
            }
            else
            {
                var risposta = {iddi: id, giorni:""};
            }
           
            //put per sovrascrivere i giorni
            $.ajax({
        
                url: '/artists',
                type:'PUT',
                data: risposta,
                success: function(result){
                    console.log(result);
                }
            });
        });
    };

    $(".tabs li:nth-child(1) a").trigger("click");
};

// CARICA IL MAIN :)
$(document).ready(function () {
    main();
});