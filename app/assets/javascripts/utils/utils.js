RipeCom.Utils.insertErrorMessages = function(messages){
  var $errorMessage = JST['error']({
    messages: messages
  });

  $("#error-field").append($errorMessage);
}

RipeCom.Utils.setCookie = function(name, value, expires){
  var cookieString = name + "=" + escape(value) + "; ";
  if(expires){
    cookieString += "expires=" + expires + ";";
  }
  document.cookie = cookieString;
}
