$(document).ready(function() {
  //Topics String Array
  var topics = ["Meerkat","Hamster","Hedgehog","Mouse"];

  //Create a button for every animal in the array
  function renderButtons(topics) {
    $("#buttonDiv").empty();

    for(var i=0;i<topics.length;i++) {
      var button = $("<button value='"+topics[i]+"'>"+topics[i]+"</button>");
      $("#buttonDiv").append(button);
      button.addClass("giphyButton");
    }
  }

  renderButtons(topics);

  // Obtain user button click value
  $(".giphyButton").on("click", function(event) {
    event.preventDefault();
    var topic = $(this).val();
    $("#imageDiv").empty();
        
    // Obtain the images
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=QnzDlWk2f0g5uDP7pBQBvvPWePLlTqpi&q=" + topic + "&limit=10";

    $.ajax({
      url:queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      // console.log(results);

      for(var i=0;i<results.length;i++) {
        var rating = results[i].rating;
        var imageURL = results[i].embed_url;

        var newDiv = $("<div>");
        var p = $("<p>");
        p.text("Rating: " + rating);
        var image = $("<img>");
        image.attr("src", imageURL);

        newDiv.append(p,image);
        $("#imageDiv").prepend(newDiv);
      }
    })
  })
});


