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

                $.getJSON("/home", function(artisti){
                                      
                });
                
            }else if ($element.parent().is(":nth-child(2)")) { // "Visualizza testi" tab:
                $content = $("<p>");
            
                $.getJSON("/testi", function(testi) {
            
                    var testoCliccato = "";

                    testi.forEach(function(ris) {
            
                        var giaStampati = [];
            
                        if (!giaStampati.includes(ris.isbn)) {

                            if(ris.tipo=="DIGITALE")
                            {
                                var $newElement = $("<h4>").text(ris.titolo + "  Autore: " + ris.autori + "  Disponibili: DIGITALE" + "  Prezzo: " + ris.prezzo + "€");
                            }
                            else
                            {
                                var $newElement = $("<h4>").text(ris.titolo + "  Autore: " + ris.autori + "  Disponibili: " + ris.disponibilita + "  Prezzo: " + ris.prezzo + "€");
                            }

            
                            // Add a click event listener to the newly created element
                            $newElement.click(function() {

                                if(testoCliccato == $newElement)
                                {
                                    //Gia è aperto questo
                                }
                                else
                                {
                                    if(testoCliccato != "") //Se avevi gia cliccato qualcosa lo rimuovo
                                    {
                                        $content.find('.riconoscimento').remove(); //La classe riconoscimento sta per questo infatti
                                    }

                                    // Handle click event
                                    // Faccio apparire questi

                                    if(ris.tipo=="DIGITALE")
                                    {
                                        alert("Impossibile modificare la disponibilità per un testo digitale");
                                        return;
                                    }

                                    var $testo = $("<h5>").text("Stai modificando la disponibilità di: " + ris.titolo).addClass("riconoscimento");
                                    var $input = $("<input>").attr("type", "number").addClass("riconoscimento");
                                    var $button_agg = $("<button>").text("Modifica").addClass("riconoscimento");
                
                                    // Append al content
                                    $content.append($testo, $input, $button_agg);
                                    testoCliccato = $newElement;

                                    $button_agg.on("click", function(){

                                        if($input.val() >= 0)
                                        {
                                            modificaDisponibilita($input.val(), ris.isbn);
                                            var $testoOperazione = $("<h5>").text("Operazione avvenuta con successo").addClass("riconoscimento");
                                            $content.append($testoOperazione);
                                        }
                                        else
                                        {
                                            alert("Inserisci un valore positivo")
                                        }
                                        
                                        $input.val("");
                                       
                                    });

                                }

                            });
            
                            $content.append($newElement);
                            giaStampati.push(ris.isbn);
                        }
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
                    
                    $content.append($("<h3>ISBN del testo da aggiungere</h3>"));
                    $content.append(isbn_agg);
                    $content.append($("<h3>Titolo</h3>"));
                    $content.append(titolo);
                    $content.append($("<h3>Autore/i</h3>"));
                    $content.append(autori);
                    $content.append($("<h3>Editore</h3>"));
                    $content.append(editore);
                    $content.append($("<h3>Genere</h3>"));
                    $content.append(genere);
                    $content.append($("<h3>Prezzo</h3>"));
                    $content.append(prezzo);
                   
                    $content.append($("<h3>Il testo è di tipo</h3>"));
                    $content.append(tipo1.addClass("pocoSotto"));
                    $content.append(labeltipo1);
                    $content.append(tipo2.addClass("pocoSotto"));
                    $content.append(labeltipo2);

                    $content.append($("<h3>Disponibilità</h3>"));
                    $content.append(disponibilita);

                    $content.append(pulsante_aggiungi.addClass("destraInput"));
                    //#endregion

                    //Rimuove il testo in base all'isbn
                    pulsante_rimuovi.on("click", function(){
                        rimuovi_testo(isbn_rim.val());
                        isbn_rim.val("");
                    });

                    //Aggiunge un testo
                    pulsante_aggiungi.on("click", function(){

                        try {
                            giaEsiste = false;
                            var getTipo = document.querySelector("input[name='tipo']:checked").value;
                            var titoloStampa = titolo.val()
                            //#region vincoli
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

                            if(getTipo=="DIGITALE" && disponibilita.val()!="")
                            {
                                alert("Il valore di disponibilità verrà sovrascritto dato che il testo è digitale");
                                disponibilita.val(Infinity);
                            }
                            //#endregion

                            if(giaEsiste == false)
                            {

                                aggiungi_testo(isbn_agg.val(), titolo.val(), autori.val(), editore.val(), genere.val(), prezzo.val(), disponibilita.val(), getTipo);
                                $content.append($("<h5>").text("Testo aggiunto: " + titoloStampa))
                            }
                            else
                            {
                                alert("Il testo è gia presente nel database");
                                return;
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

                            
                            

                        } catch (error) {
                            alert("Seleziona qualcosa in ogni campo necessario");
                        }
                        
                        
                    });
                    
                });

            }
            $("main .content").append($content);

            return false;
            
        });
    });


    var aggiungi_testo = function(isbn_agg, titolo, autori, editore, genere, prezzo, disponibilita, getTipo){

        var nuovo_testo;
            
        if (titolo!="" && autori!=="" && editore!=="" && genere!=="" && prezzo!=="" && isbn_agg!=="" && disponibilita!==""){

            $.getJSON("/testi", function (element){

                element.forEach(e => {
                    //Controllo aggiuntivo che non si inserisca un testo gia presente
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

    var rimuovi_testo = function(isbn_rim){
        
        var testo;
            
        if (isbn_rim != ""){

            $.getJSON("/testi", function (element){

                var k = false;
                element.forEach(e => {
                    if(e.isbn == isbn_rim)
                    {
                        console.log("trovato" + e.titolo);
                        testo = {"isbn":isbn_rim};

                        $.ajax({
        
                            url: '/testi',
                            type:'DELETE',
                            data: testo,
                            success: function(result){
                                console.log(result);
                            }
                        });
                        k = true;
                        alert("testo eliminato");
                        return;
                    }
                });
                
                if(k)
                {
                    return;
                }
                else
                {
                    alert("Il testo non è presente nel DB");
                }
            });

        } else {

            alert("Seleziona qualcosa in ogni campo necessario");

        }

    };

    var modificaDisponibilita = function(valore, isbn_attuale) {
        $.getJSON("/testi", function(testi) {
            var risultato;
            var isbn_testo;
            var trovato = false;
    
            //Prendo tutti i testi, seleziono quello giusto e sovrascrivo il numero
            testi.forEach(function(testo) {
                if (testo.isbn === isbn_attuale) {
                    risultato = testo.disponibilita;
                    isbn_testo = testo.isbn;
                    trovato = true;
                }
            });

            if(trovato)
            {
                
                var risposta = {isbn: isbn_testo, val: Number(valore)};
                console.log(risposta)
            }
            else
            {
                return;
            }
           
            //put per sovrascrivere la disponibilità
            $.ajax({
        
                url: '/testi',
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