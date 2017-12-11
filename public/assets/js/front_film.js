$(function() {
  $(".change-watched").on("click", function(event) {
    var id = $(this).data("id");
    var newWatch = $(this).data("newwatch");

    var newWatchState = {
      watch: newWatch
    };

    // Send the PUT request.
    $.ajax("/api/films/" + id, {
      type: "PUT",
      data: newWatchState
    }).then(
      function() {
        console.log("changed watch to", newWatch);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newFilm = {
      name: $("#fil").val().trim(),
      watched: $("[name=watched]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/films", {
      type: "POST",
      data: newFilm
    }).then(
      function() {
        console.log("created new Film");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-film").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/films/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("deleted film", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
