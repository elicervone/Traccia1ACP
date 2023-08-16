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
                        
                    });
                });
                
            } else if ($element.parent().is(":nth-child(3)")) { // "Modifica Artisti" tab: Permette di aggiungere e rimuovere gli artisti

                $content = $("<p>");

                $.getJSON("/editArtists", function(ris){
                    
                  
                });

            }else if($element.parent().is(":nth-child(4)")) { // "Visualizza Eventi" tab: Mostra tutti gli eventi

                $content = $("<p>");

                $.getJSON("/events", function(ris){
                    
                  
                });

            }else if($element.parent().is(":nth-child(5)")) { // "Aggiungi Eventi" tab: Permette di aggiungere degli eventi

                $content = $("<p>");

                $.getJSON("/addEvents", function(ris){
                    
                  
                });

            }

            $("main .content").append($content);

            return false;
        });
    });

    /*var update_order_status = function (order_id, order_status){
        // built order to update with status REJECTED
        var order_to_update = {"id":order_id, "status": order_status};

        // send PUT /order/status ?status=REJECTED or PUT /order/status ?status=COMPLETED
        $.ajax({

            url: '/orders',
            type:'PUT',
            data: order_to_update,
            success: function(result){
                console.log(result);
            }
        });
    };*/

    /*var ordina = function(nome, num){
        var order,
            nuovoProdotto = {"name":nome, "quantity":num};
            
        if (nome!=="" && num!=""){


            // Retrieve from the server all the products in the cart, i.e., all the orders with status == "CART"
            $.getJSON("/cart", {"status":"CART"}, function (cart){

                // If the cart exists, add the new product to the cart
                if (cart.length != 0){

                    // Get the list of product from the cart, and add the new product
                    cart[0].products.push(nuovoProdotto);
                    order = cart[0];

                    // Perform an HTTP PUT to update the cart on the server
                    $.ajax({

                            url: '/cart',
                            type:'PUT',
                            data: order,
                            success: function(result){

                                console.log(result);

                            }
                    });

                } else {    // If the cart does not exist, create the cart, i.e., an order with STATUS == "CART"
                
                    order = {"id":-1, "status":"CART", "products":nuovoProdotto};

                    // Make an HTTP POST to create the new order
                    $.post("/cart", order, function (result) {

                        console.log(result);

                    });
                }
            });

        } else {

            alert("Please, add product name and desired quantity to be ordered!");

        }

    };*/

    var login = function(){
        console.log("bel tentativo, pesc");
    };

    $(".tabs li:nth-child(1) a").trigger("click");
};

// CARICA IL MAIN :)
$(document).ready(function () {
    main();
});
