$(document).ready(function () {

  $("#text-input").keyup(function(event) {
    let counter = $("#character-counter")
    let typedChar = $("#text-input").val().length
    let finalCount = 140 - typedChar;
    // replacing the count of the page.
    console.log(counter)
    counter.html(finalCount);
      /// turning counter red below 0
    $( counter ).toggleClass( "red", finalCount < 0 );
  }) 
});