var Chat = {
  chatFocus: false,
  messages: [],
  image_url: null
};

Chat.init = function() {
  var _this = this

  _this.render('#main');
  _this.switchActionTo('video');
  _this.intitListeners();

  Bebo.User.getUser('me', function(err, data){
    if(err){ return };
    Chat.image_url = data.image_url;
    Chat.username = data.username;
  });

  Bebo.onEvent(function(data){
    console.log('data', data);
    var message = Chat.renderMessage(data.text, data.userImg, data.username);
    var mess = $(message).appendTo('#main');
    mess.animate({ opacity: 0, bottom: "35%" }, 5000, 'swing', function(){
      $(this).remove();
    });
  });

};

Chat.render = function(anchor) {
  var html = "<div id='js-controls' class='controls'>" +
    "<div id='js-controls-chat' class='controls-chat'>" +
    "<textarea id='chat-input' placeholder='Send a Message' class='message-chat'></textarea>" +
    "</div>" +
    "<div id='js-action' class='controls-action'>" + "</div>" +
    "</div>"
  $(anchor).append(html);
};



// JUST A MESSAGE FOR YOU TO USE JOSH
Chat.renderMessage = function(text, userImg, username) {
  var html = "<div class='message'>" +
    "<div class='message--inner'>" +
    "<div class='message--inner--left'>" +
    "<div class='message--avatar' style=background-image:url(" + userImg + "); '></div>" +
    "</div>" +
    "<div class='message--inner--right'>" +
    "<div class='message--content'>" +
    "<div class='message--content--username'>" + username + "</div>" +
    "<div class='message--content--text'>" + text + "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  return html;
};


Chat.switchActionTo = function(action) {

  console.log('action', action);

  if (action == Chat.actionState) {
    return;
  }

  var anchor = $('#js-action');
  if (action === 'chat') {
    anchor.html('<button id="send-chat" class="action-chat"> Send </button>');
    Chat.actionState = 'chat';
    $('#send-chat').on('touchstart', function(e){
      // e.preventDefault();
      Chat.send();
    })
  } else if (action === 'video') {
    anchor.html('<button class="action-video js-video-chat"><span></span></button>');
    Chat.actionState = 'video';
  }
};

Chat.intitListeners = function() {
  var _this = this;
  $('#chat-input').autogrow({ vertical: true, horizontal: false });

  $('#chat-input').bind('input propertychange', function() {
    _this.inputText = $(this).val();
    console.log('change', _this.inputText.length);
    if (_this.inputText.length > 0) {
      $('#send-chat').removeAttr('disabled');
    } else {
      $('#send-chat').attr('disabled', true);
    }
  });

  $('#chat-input').focus(function() {
    console.log('focused');
    _this.switchActionTo('chat');
  });

  $('#chat-input').blur(function() {
    console.log('unfocused');
    _this.switchActionTo('video');
  });

};

Chat.initControlsVideo = function() {

};


Chat.send = function() {

  if (this.inputText.length > 0) {
    Bebo.emitEvent({text: $('#chat-input').val(), userImg: Chat.image_url, username: Chat.username});
    $('#chat-input').val('');
  }

};

Chat.receive = function() {

};

module.exports = Chat;
