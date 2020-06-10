// click function to add new burgers
$("#newBurger").on("click", function(event) {
    event.preventDefault();

    const addBurger = {
        plan: $("#newBurger [name=burger]").val().trim()
    };

    $.ajax("/api/burgers", {
        type: "POST",
        data: addBurger
    }).then(
        function() {
            console.log("New Burger Added!");
            location.reload();
        }
    );
})

// click function to devour burger and update sql boolean
$(".devour-burger").on("click", function(event) {
    event.preventDefault();
    const updateBurger = $();

    $.ajax('/api/burgers/' + id, {
        type: "PUT",
        data: updateBurger
    })
})
