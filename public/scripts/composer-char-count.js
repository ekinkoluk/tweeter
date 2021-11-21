
$(document).ready(function() {
  const charLimit = 140;
  $('#tweet-text').on('input', function() {
    const charLeft = charLimit - $(this).val().length;
    if (charLeft < 0) {
      $(this).parentsUntil(".tweet-new")
        .find(".counter")
        .addClass('counterMinus');
    } else {
      $(this).parentsUntil(".tweet-new")
        .find(".counter")
        .removeClass('counterMinus');
    }
    $(this).parentsUntil(".tweet-new")
      .find(".counter")
      .text(charLeft);
  });
});