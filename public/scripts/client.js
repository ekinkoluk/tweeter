
$(document).ready(function() {
  //Helper functions

  //Render Tweets Function Starts here..
  const renderTweets = tweets => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };
  // Function to ensure tweet text is safe
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //Create Tweet Function to Create dynamically html elements
  const createTweetElement = function(tweetObj) {
    const createdTime = timeago.format(tweetObj.created_at);
    const tweetPage = $(`
      <article>
        <header>
          <span class="username"><img class="profileimg" src="${tweetObj.user.avatars}">${tweetObj.user.name}</span>
          <span class="userid">${tweetObj.user.handle}</span>
        </header>
        <p class="tweet-text">${escape(tweetObj.content.text)}</p>
        <footer>
          <span>${createdTime}</span>
          <span class="icons"><i class="fas fa-flag"></i>&nbsp;&nbsp;<i class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
    return tweetPage;
  };

  // Load tweets by getting array of tweets from /tweets
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then(tweetsHTML => {
        $('#tweets-container').empty();
        renderTweets(tweetsHTML);
      });
    $('#error').empty();
    $('#error').hide();
    $('.new-tweet').hide();
  };

  //Create new Tweet that is called within the Submit Button
  const addNewTweet = function(event) {
    const $tweetText = $(event.target.text).serialize();
    $.post('/tweets', $tweetText).then(() => {
      $('#tweet-text').val(''); //clears textarea
      loadTweets();
    });
  };

  // Returns an error message depending on character count of textarea
  const errorMsg = function(num) {
    let message = "";
    if (!num)  {
      message = "You forgot to enter text";
    } else if (num > 140) {
      message = "Your tweet should be 140 characters or less.";
    }
    if (message)  {
      return `<span><i class="fas fa-exclamation-triangle"></i></span><span>${message}</span><span><i class="fas fa-exclamation-triangle"></i></span>`;
    }
  };

 

  // Upon document loading, load all tweets
  loadTweets();

  $("#posttweet").submit(function(event) {
    const charCount = $(event.target.text).serialize().length - 5;
    $('#error').empty();
    if ($('#error').is(":hidden")) {
      $('#error').empty();
    } else {
      $('#error').hide();
    }
    event.preventDefault();
    if (errorMsg(charCount)) {
      return $('#error').append(errorMsg(charCount)).slideDown("fast");
    } else {
      $('#error').hide();
    }
    addNewTweet(event);
    $(this).find(".counter").text(140);
  });

  // Slides down the new tweet section and sets focus when clicking on Nav bar ("Write a new tweet")
  // Slides the new tweet secion up if it's visible
  $("#writenew").on("click", function() {
    $('.new-tweet').slideToggle("fast", function() {
      $('#tweet-text').focus();
    });
  });


 
  let windowsize = $(window).width();
  $(window).bind('resize', function() {
    windowsize = $(window).width();
   
  });
});