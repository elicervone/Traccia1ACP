var main = function () {

    "use strict";

    $(".tabs li a").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content;

            $(".tabs li a").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) { // "Home" tab: Una pagina a caso, magari il login per gli artisti
                $content = $("<p>");

                var input_user = $("<input>");
                var input_pass = $("<input>");
                var pulsante = $("<button>").text("Login");


                $.getJSON("/home", function(artisti){
                    
                    $content.append($("<h3>").text("Username:"));
                    $content.append(input_user);
    
                    $content.append($("<h3>").text("Password:"));
                    $content.append(input_pass);
    
                    $content.append(pulsante);
    
                    pulsante.on("click", function(){
    
                        if(input_user.val()!=="" && input_pass.val()!=="")
                        {
                            login(input_user.val(), input_pass.val()); //QUESTA FUNZIONE NON ESISTE (ANCORA)
                            input_user.val("");
                            input_pass.val("");
                        }
                        else
                        {
                            alert("pisello");//TODO
                        }
                            
                    });
                    
                   
                });

            } else if ($element.parent().is(":nth-child(2)")) { // "Visualizza Artisti" tab: Mostra tutti gli artisti
                
                $content = $("<p>");

                $.getJSON("/artists", function(artisti){
                    
                    artisti.forEach(function(ris){

                        $content.append($("<h3>").text("NOME: " + ris.nome + " " + ris.cognome));
                        //TODO aggiungere altre info
                    });
                });
                
            } else if ($element.parent().is(":nth-child(3)")) { // "Modifica Artisti" tab: Permette di aggiungere e rimuovere gli artisti

                $content = $("<p>");

                var pulsante_aggiungi = $("<button>").text("Aggiungi");
                var pulsante_rimuovi = $("<button>").text("Rimuovi").addClass("destra").addClass("colonna");

                var username_rim = $("<input>").addClass("destra").addClass("colonna");
                var username_agg = $("<input>");
//#region TIPO
                var tipo1 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"CANTANTE", "id":"sceltaTipo1"});
                var labeltipo1 = $("<label>Cantante</label>").attr({"for": "sceltaTipo1"});
                var tipo2 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"STRUMENTISTA", "id":"sceltaTipo2"});
                var labeltipo2 = $("<label>Strumentista</label>").attr({"for": "sceltaTipo2"});
//#endregion

//#region GENERE
                var genere1 = $("<input>").attr({"type":"radio", "name":"genere", "value":"CLASSICA", "id":"sceltaGenere1"});
                var labelGenere1 = $("<label>Classica</label>").attr({"for": "sceltaGenere1"});
                var genere2 = $("<input>").attr({"type":"radio", "name":"genere", "value":"LEGGERA", "id":"sceltaGenere2"});
                var labelGenere2 = $("<label>Leggera</label>").attr({"for": "sceltaGenere2"});
                var genere3 = $("<input>").attr({"type":"radio", "name":"genere", "value":"POP", "id":"sceltaGenere3"});
                var labelGenere3 = $("<label>Pop</label>").attr({"for": "sceltaGenere3"});
                var genere4 = $("<input>").attr({"type":"radio", "name":"genere", "value":"JAZZ", "id":"sceltaGenere4"});
                var labelGenere4 = $("<label>Jazz</label>").attr({"for": "sceltaGenere4"});
                var genere5 = $("<input>").attr({"type":"radio", "name":"genere", "value":"null", "id":"sceltaGenere5"});
                var labelGenere5 = $("<label>Nessuno (strumentista)</label>").attr({"for": "sceltaGenere5"});
//#endregion
                var nome = $("<input>");
                var cognome = $("<input>");
                var email = $("<input>");
                var telefono = $("<input>");
                var cachet = $("<input>");
                var password = $("<input>");

//#region REGISTRO
                var registro1 = $("<input>").attr({"type":"radio", "name":"registro", "value":"SOPRANO", "id":"sceltaRegistro1"});
                var labelregistro1 = $("<label>Soprano</label>").attr({"for": "sceltaRegistro1"});
                var registro2 = $("<input>").attr({"type":"radio", "name":"registro", "value":"MEZZOSOPRANO", "id":"sceltaRegistro2"});
                var labelregistro2 = $("<label>Mezzosoprano</label>").attr({"for": "sceltaRegistro2"});
                var registro3 = $("<input>").attr({"type":"radio", "name":"registro", "value":"CONTRALTO", "id":"sceltaRegistro3"});
                var labelregistro3 = $("<label>Contralto</label>").attr({"for": "sceltaRegistro3"});
                var registro4 = $("<input>").attr({"type":"radio", "name":"registro", "value":"TENORE", "id":"sceltaRegistro4"});
                var labelregistro4 = $("<label>Tenore</label>").attr({"for": "sceltaRegistro4"});
                var registro5 = $("<input>").attr({"type":"radio", "name":"registro", "value":"BARITONO", "id":"sceltaRegistro5"});
                var labelregistro5 = $("<label>Baritono</label>").attr({"for": "sceltaRegistro5"});
                var registro6 = $("<input>").attr({"type":"radio", "name":"registro", "value":"BASSO", "id":"sceltaRegistro6"});
                var labelregistro6 = $("<label>Basso</label>").attr({"for": "sceltaRegistro6"});
                var registro7 = $("<input>").attr({"type":"radio", "name":"registro", "value":"null", "id":"sceltaRegistro7"});
                var labelregistro7 = $("<label>Nessuno</label>").attr({"for": "sceltaRegistro7"});
//#endregion
                
                var strumento1 = $("<input>");
                var strumento2 = $("<input>");
                var strumento3 = $("<input>");
                var strumento4 = $("<input>");


                $.getJSON("/editArtists", function(ris){
//#region append
                    $content.append(pulsante_rimuovi);
                    $content.append(username_rim);
                    $content.append($("<h3>Username dell'artista da rimuovere</h3>").addClass("destra").addClass("colonna"));
                    
                    $content.append($("<h3>Username dell'artista da aggiungere</h3>"));
                    $content.append(username_agg);
                    $content.append($("<h3>Nome</h3>"));
                    $content.append(nome);
                    $content.append($("<h3>Cognome</h3>"));
                    $content.append(cognome);
                    $content.append($("<h3>Email</h3>"));
                    $content.append(email);
                    $content.append($("<h3>Telefono</h3>"));
                    $content.append(telefono);
                    $content.append($("<h3>Cachet</h3>"));
                    $content.append(cachet);
                    $content.append($("<h3>Password</h3>"));
                    $content.append(password);

                    $content.append($("<h3>L'artista è un</h3>"));
                    $content.append(tipo1);
                    $content.append(labeltipo1);
                    $content.append(tipo2);
                    $content.append(labeltipo2);

                    $content.append($("<h3>Indicare il genere del cantante</h3>"));
                    $content.append(genere1);
                    $content.append(labelGenere1);
                    $content.append(genere2);
                    $content.append(labelGenere2);
                    $content.append(genere3);
                    $content.append(labelGenere3);
                    $content.append(genere4);
                    $content.append(labelGenere4);
                    $content.append(genere5);
                    $content.append(labelGenere5);

                    $content.append($("<h3>Indicare il registro del cantante classico</h3>"));
                    $content.append(registro1);
                    $content.append(labelregistro1);
                    $content.append(registro2);
                    $content.append(labelregistro2);
                    $content.append(registro3);
                    $content.append(labelregistro3);
                    $content.append(registro4);
                    $content.append(labelregistro4);
                    $content.append(registro5);
                    $content.append(labelregistro5);
                    $content.append(registro6);
                    $content.append(labelregistro6);
                    $content.append(registro7);
                    $content.append(labelregistro7);

                    $content.append($("<h3>Indicare gli strumenti conosciuti dallo strumentista</h3>"));
                    $content.append(strumento1);
                    $content.append(strumento2);
                    $content.append(strumento3);
                    $content.append(strumento4);

                    $content.append(pulsante_aggiungi);

//#endregion

                    /*pulsante_rimuovi.on("click", function(){
                        ordina(input_nome.val(), input_num.val());
                        input_nome.val("");
                        input_num.val("");
                    });*/


                    pulsante_aggiungi.on("click", function(){

                        try {
                            var getTipo = document.querySelector("input[name='tipo']:checked").value;
                            var getGenere = document.querySelector('input[name="genere"]:checked').value;
                            var getRegistro = document.querySelector('input[name="registro"]:checked').value;

                            aggiungi_artista(username_agg.val(), nome.val(), cognome.val(), email.val(), telefono.val(), cachet.val(), password.val(), getTipo, getGenere, getRegistro, strumento1.val(), strumento2.val(), strumento3.val(), strumento4.val());

                            // Trova tutti gli <input> 
                            const inputElements = document.getElementsByTagName("input");

                            // Utilizza forEach per iterare su ciascun elemento e pulirne il valore
                            Array.from(inputElements).forEach(input => {
                                input.value = "";

                                if(input.type == "radio")
                                {
                                    input.checked = false;
                                }
                            });

                        } catch (error) {
                            alert("seleziona qualcosa dai stefano!");
                        }
                        
                        
                    });
                    
                });

            }else if($element.parent().is(":nth-child(4)")) { // "Visualizza Eventi" tab: Mostra tutti gli eventi

                $content = $("<p>");

                $.getJSON("/events", function(ris){
                    
                  
                });

            }else if($element.parent().is(":nth-child(5)")) { // "Aggiungi Eventi" tab: Permette di aggiungere degli eventi

                var somma = 0;

                $content = $("<p>");

                var pulsante_aggiungi = $("<button>").text("Aggiungi");

//#region TIPO
                var tipo1 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"ESIBIZIONE", "id":"sceltaTipo1"});
                var labeltipo1 = $("<label>Esibizione</label>").attr({"for": "sceltaTipo1"});
                var tipo2 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"CONCERTO", "id":"sceltaTipo2"});
                var labeltipo2 = $("<label>Concerto</label>").attr({"for": "sceltaTipo2"});
                var tipo3 = $("<input>").attr({"type":"radio", "name":"tipo", "value":"STRUMENTALE", "id":"sceltaTipo3"});
                var labeltipo3 = $("<label>Strumentale</label>").attr({"for": "sceltaTipo3"});
//#endregion

                var giorno = $("<input>");
                var location = $("<input>");
                var costo = $("<h4>");//.val(somma)  [SOMMA DEI CACHET]

                var partecipante = $("<input>");
                var pulsante_partecipante = $("<button>").text("Aggiungi partecipante");

                $.getJSON("/addEvents", function(ris){
//#region append                    
                    $content.append($("<h3>Giorno dell'evento</h3>"));
                    $content.append(giorno);
                    $content.append($("<h3>Location dell'evento</h3>"));
                    $content.append(location);

                    $content.append($("<h3>L'evento è del tipo</h3>"));
                    $content.append(tipo1);
                    $content.append(labeltipo1);
                    $content.append(tipo2);
                    $content.append(labeltipo2);
                    $content.append(tipo3);
                    $content.append(labeltipo3);

                    $content.append($("<h3>I partecipanti sono</h3>"));
                    $content.append(partecipante);
                    $content.append(pulsante_partecipante);

                    $content.append($("<h3>costo totale dell'evento</h3>"));
                    $content.append(costo);

                    $content.append(pulsante_aggiungi);

//#endregion

                    pulsante_aggiungi.on("click", function(){

                        try {
                            var getTipo = document.querySelector("input[name='tipo']:checked").value;

                            aggiungiEvento();

                            // Trova tutti gli <input> 
                            const inputElements = document.getElementsByTagName("input");

                            // Utilizza forEach per iterare su ciascun elemento e pulirne il valore
                            Array.from(inputElements).forEach(input => {
                                input.value = "";

                                if(input.type == "radio")
                                {
                                    input.checked = false;
                                }
                            });

                        } catch (error) {
                            alert("seleziona qualcosa dai stefano!");
                        }
                        
                        
                    });

                    pulsante_partecipante.on("click", function(){

                        var ris = false;

                        try {
                            ris = calcolaCosto(partecipante.val());
                        } catch (error) {
                            alert("seleziona qualcosa dai stefano!");
                        }
                        finally
                        {
                            partecipante.val("");
                        }
                        
                        if(ris != false)
                        {
                            console.log("tutto ok col partecipante");
                            somma+=ris;
                            costo.text(somma);
                        }
                        else
                        {
                            alert("seleziona una persona reale (gli amici immaginari non valgono)");
                        }
                        
                    });
                    
                });

            }

            $("main .content").append($content);

            return false;
        });
    });



    var login = function(){
        console.log("bel tentativo, pesc");
    };

    var aggiungi_artista = function(username_agg, nome, cognome, email, telefono, cachet, password, getTipo, getGenere, getRegistro, strumento1, strumento2, strumento3, strumento4){
        var strumenti = [strumento1,strumento2,strumento3,strumento4];
        
        var artista;
        //nuovoArtista = {"tipo":getTipo, "nome":nome, "cognome":cognome, "Emal":email, "telefono":telefono, "cachet":cachet, "genere":getGenere, "registro":getRegistro, "strumenti":strumenti, "username":username_agg, "password":password};
            
        if (nome!="" && cognome!=="" && email!=="" && telefono!=="" && cachet!=="" && username_agg!=="" && password!==""){

            $.getJSON("/editArtists", function (element){

                artista = {"id":-1, "tipo":getTipo, "nome":nome, "cognome":cognome, "Emal":email, "telefono":telefono, "cachet":cachet, "genere":getGenere, "registro":getRegistro, "strumenti":strumenti, "username":username_agg, "password":password};

                // Make an HTTP POST to create the new artist
                $.post("/editArtists", artista, function (result) {

                    console.log(result);

                });
                
            });

        } else {

            alert("Per cortesia, scrivi le cose");

        }

    };

    var calcolaCosto = function(userPartecipante){

        $.getJSON("/artists", function(artisti){
                    
            artisti.forEach(function(ris){

                if(artisti.username === userPartecipante)
                {
                    return artisti.cachet;
                }
            });

            return false;
        });

    }

    var aggiungiEvento = function(getTipo, giorno, location, costo ,partecipanti){
        
        var evento;
            
        if (giorno!="" && location!=="" && partecipanti!==""){

            $.getJSON("/addEvents", function (element){

                artista = {"id":-1, "tipo":getTipo, "giorno":giorno, "location":location, "costoTotale":costo, "partecipanti":partecipanti};

                // Make an HTTP POST to create the new artist
                $.post("/addEvents", evento, function (result) {

                    console.log(result);

                });
                
            });

        } else {

            alert("Per cortesia, scrivi le cose");

        }

    }; 

    $(".tabs li:nth-child(1) a").trigger("click");
};

// CARICA IL MAIN :)
$(document).ready(function () {
    main();
});