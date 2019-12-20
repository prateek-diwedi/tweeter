/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(function (event) {
  /// load tweet ------>>>>>
  const loadTweets = function () {
    $.ajax({
      url: '/tweets'
    }).then(renderTweets);
  }

  loadTweets();

  //// animation to get tweet text place disappear --->>>
  $('#hiding-button').on('click', function() {
    if ($('#form').css('opacity') == 1) $('#form').css('opacity', 0);
    else $('#form').css('opacity', 1);
});

  /// ajax  ----->>>
  $(function () {
    const $form = $('.newTweet');
    console.log("form data here---->>>", $("#text-input"))

    $form.on('submit', function (event) {
      console.log('Button clicked, sending Tweet to server...');
      event.preventDefault();
      let data = $form.serialize();
      let newData = $(this).find('textarea').val();
      console.log('new data length', newData.length)
      console.log('data', data);
      if (newData === "" || newData === null || newData === " "){
        $('.alert-box').text(" ⚠️    Please enter a data ⚠️    ").slideDown().fadeOut(2000);
      } else if ( newData.length > 140){
        $('.alert-box').text(" ⚠️    Your text is exceeding the limit of 140!    ⚠️").slideDown().fadeOut(2000);
      } else  {
      $.ajax('/tweets', { method: 'POST', data: data })
        .then(function () {
          loadTweets();
          $('textarea').focus().val('');
        });
      }

    });
  });



  const createTweetElement = function ({ user, content, created_at }) {
    let article = $('<article>').addClass('tweet-box');
    let divTweetOne = $('<div>').addClass('tweet-one');
    let divUserDetails = $('<div>').addClass("user-details");
    let image = $("<img>").addClass("DP").prop('src', user.avatars);
    let name = $("<h3>").addClass('user').text(user.name);

    let userHandle = $("<h3>").addClass('handle').text(user.handle);
    let tweetTwo = $("<div>").addClass("tweet-two");
    let tweetContent = $("<p>").addClass('tweet-content').text(content.text);
    let footer = $("<footer>").addClass("tweet-footer");

    let createdAt = $('<span class="created-at">').text(moment(created_at).fromNow())

    let footerIcon = $("<div>").addClass("footer-icon");
    let flag = $("<i>").addClass("fa fa-flag");
    let retweet = $("<i>").addClass("fa fa-retweet");
    let heart = $("<i>").addClass("fa fa-heart");

    article.append(
      divTweetOne.append(
        divUserDetails.append(
          image,
          name
        ),
        userHandle
      ),
      tweetTwo.append(
        tweetContent
      ),
      footer.append(
        createdAt,
        footerIcon.append(
          flag,
          retweet,
          heart
        )
      )
    );

    return article;

  }

  function renderTweets(tweets) {
    tweets.forEach((tweet, idx) => {
      //console.log('tweet ---->>>', tweet);
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    })
  }

});

