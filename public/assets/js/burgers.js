$(function() {
    $(".newBurger").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            name: $("#newBurg").val().trim(),
            devoured: 0
        }

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("New Burger Added");
            location.reload();
        });
    });

    $(".devour-burger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devouredBurger = {
            devoured: 1
        };

        $.ajax("/api/burgers/", + id, {
            type: "PUT",
            data: devouredBurger
        }).then(function() {
            console.log("Burger Devoured");
            location.reload();
        });
    });

    $(".eatburger").on("click", function(event) {
        event.preventDefault();
    
        var id = $(this).data("id");
        var devouredState = {
          devoured: 1
        };
    
        $.ajax("/api/burgers/" + id, {
          type: "PUT",
          data: devouredState
        }).then(function() {
          console.log("Burger Devoured");
          location.reload();
        });
    });
});