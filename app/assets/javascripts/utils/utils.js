RipeCom.Utils.insertErrorMessages = function(messages){
  var $errorMessage = JST['error']({
    messages: messages
  });

  $("#error-field").append($errorMessage);
}
