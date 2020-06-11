$(function() {
    $(".devour-burger").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("burgerID");
        var devour = $(this).data("devour")
        var devoured = {
            devoured: devour
        };

        $.ajax("/api/burgers/", + id, {
            type: "PUT",
            data: devoured
        }).then(function() {
            console.log("Burger Devoured");
            location.reload();
        });
    });

    $(".newBurger").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            name: $("#newBurg").val().trim()
        }

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("New Burger Added");
            location.reload();
        });
    });
});