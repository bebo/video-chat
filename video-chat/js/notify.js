
var NotifyTemplate = require("../assets/templates/notify.hbs");
var CallerControlsTemplate = require("../assets/templates/caller_controls.hbs");

var Notify = {};

Notify.init = function(){
  var _this = this;
};

Notify.render = function(){
  $('#main').append(NotifyTemplate());
  $('#done').click(Notify.click);
};

Notify.click = function(){
  var message = $('#notify-input').val();
  if(message === ""){
    $('#notify-er').remove();
    return;
  };
  $('#done').unbind('click');
  $('#notify-er').remove();
  Notify.send(message);
};

Notify.send = function(message){
  var obj = {};
  obj.title = '{{user.username}}';
  obj.body = 'says ' + message;
  obj.roster = true;
  Bebo.sendInvite(obj, function(err, resp){
    if(err){ return console.log('err') };
    console.log('Invite Sent to Server', resp);
  });
};

Notify.callerControls = function() {
  $('#main').append(CallerControlsTemplate());
};

module.exports = Notify;
