var Camera = require("./camera.js");
var Notify = require("./notify.js");
var Controls = require("./chat.js");
var EmptyStateTemplate = require("../assets/templates/empty_state.hbs");

var VideoChat = {};
VideoChat.Callers = {};
VideoChat.Callers.list = [];
VideoChat.Callers.count = 0;
VideoChat.Callers.me = null;

VideoChat.init = function() {
  var _this = VideoChat;
  _this.render();
  Controls.init();
  Camera.init();
  VideoChat.listen();
  Bebo.User.getUser('me', function(err, data){
    if(err){ return console.log('lol') }
    VideoChat.Callers.me = data.user_id;
  });
};

VideoChat.listen = function() {
  Bebo.onCallUpdate(function(data){
    VideoChat.Callers.list = data;
    VideoChat.Callers.count = data.length;
    if(data.length === 0){ return VideoChat.render() };
    VideoChat.notifyServer();
    $('#empty-state').remove();
  });
};

VideoChat.notifyServer = function(bypass) {
  // This is here twice until we fix the double message issue
  $('#empty-state').remove();
  if(VideoChat.Callers.count >= 2 && !bypass){
    return;
  } else if(VideoChat.isCaller()){
    Notify.render();
  }
};

VideoChat.isCaller = function() {
  for (var i = 0; i < VideoChat.Callers.list.length; i++) {
    if(VideoChat.Callers.list[i].user_id === VideoChat.Callers.me){ return true };
  }
  return false;
}

VideoChat.render = function() {
  $('#main').append(EmptyStateTemplate());
  Camera.init();
};

module.exports = VideoChat;
