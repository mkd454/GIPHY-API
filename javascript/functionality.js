$(document).ready(function() {
  //Topics String Array
  var topics = ["Meerkat","Hamster","Hedgehog","Mouse","Job","Funny"];

  //New input
  $(document).on("click", "#newTopicButton", function(e){
    e.preventDefault();

    var newTopic = $("#newTopic").val().trim();
    if (newTopic !== "") {
      topics.push(newTopic);
      renderButtons(topics);
    }
    $("#newTopic").val("");
  })
  
  //Create a button for every animal in the array
  function renderButtons(topics) {
    $("#buttonDiv").empty();

    for(var i=0;i<topics.length;i++) {
      var button = $("<button type='button' class='btn btn-info m-1' value='"+topics[i]+"'>"+topics[i]+"</button>");
      $("#buttonDiv").append(button);
      button.addClass("giphyButton");
    }
  }

  renderButtons(topics);
  var numShow = 10;

  // Obtain user button click value
  $(document).on("click", ".giphyButton", function(event) {
    event.preventDefault();
    var topic = $(this).val();
    $("#imageDiv").empty();
    numShow = 10;
    obtainImages(topic);

    numShow = 10;
    console.log(numShow);
    // Show ten more images
    $(document).on("click", "#showMore", function(event) {
      event.preventDefault();
      numShow +=10;
      $("#imageDiv").empty();
      console.log(numShow);
      obtainImages(topic);
    })
  })
  
  function obtainImages(topic) {
    // Obtain the images
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=QnzDlWk2f0g5uDP7pBQBvvPWePLlTqpi&q=" + topic;

    $.ajax({
      url:queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results)
      for(var i=0;i<numShow;i++) {
        var rating = results[i].rating;
        var stillImage = results[i].images.original_still.url;
        var animateImage = results[i].images.original.url;
        var state = "still";

        var newDiv = $("<div class='m-1'>");
        var p = $("<p>");
        p.text("Rating: " + rating);
        var image = $("<img>");
        image.attr("data-still",stillImage);
        image.attr("data-animate",animateImage);
        image.attr("data-state",state);
        image.attr("src", stillImage);
        image.addClass("gif img-fluid");

        newDiv.append(p,image);
        $("#imageDiv").prepend(newDiv);
      }

      // Still vs animate image
      $(document).on("click",".gif",function() {
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          state = "animate";
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
          state = "still";
        }
      })
    })
  }
});


