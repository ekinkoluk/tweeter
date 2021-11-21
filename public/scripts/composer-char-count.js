
$(document).ready(function() {
  const charLimit = 140;
  $('#tweet-text').on('input', function() {
    const charLeft = charLimit - $(this).val().length;
    if (charLeft < 0) {
      $(this).parentsUntil(".new-tweet")
        .find(".counter")
        .addClass('counterMinus');
    } else {
      $(this).parentsUntil(".new-tweet")
        .find(".counter")
        .removeClass('counterMinus');
    }
    $(this).parentsUntil(".new-tweet")
      .find(".counter")
      .text(charLeft);
  });
});