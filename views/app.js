// Gets the entire Hacker News articles in form of json values
$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {
        //searchs throught the article array index of Hacker News' articles
        //then displays them on the client application through p tags
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});


// Whenever someone clicks a p tag...
$(document).on("click", "p", function () {
    // Empty the notes from the note section of webpage
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    //ajax call for the user chosen Hacker News article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        //function will then run to output log to the client the note info created by the user
        .then(function (data) {
            console.log(data);
            //appends in the notes div class portion the hacker news article title
            $("#notes").append("<h2>" + data.title + "</h2>");
            //appends in the notes div class portion a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            //appends in the notes div class portion the message box for the user to input their note
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            //appends in the notes div class portion a submit button...
            // with the id of the Hacker News article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Now</button>");

            // if there's a note with the Hacker News article
            if (data.note) {
                // places the title of the note in the input tag id 'titleinput'
                $("#titleinput").val(data.note.title);
                // places the text of the note in the textarea tag id 'bodyinput'
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the submit button for notes...
$(document).on("click", "#savenote", function () {
    // Grab the Hacker News article id read from the submit button
    var thisId = $(this).attr("data-id");

    // ajax call to run a POST request to change the note, using what's entered in the inputs:...
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            //from the 'titleinput' input tag values
            title: $("#titleinput").val(),
            //from the textarea tag 'bodyinput' (aka the user notes message portion)
            body: $("#bodyinput").val()
        }
    })

        .then(function (data) {
            //log the response of the newly made user notes capturing
            console.log(data);
            //then empty all values within div class 'notes' on webpage
            $("#notes").empty();
        });

    //clears values from the notes input and textarea tags portions
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
