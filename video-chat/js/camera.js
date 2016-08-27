var Camera = {};

Camera.init = function(){
  var _this = Camera;
  $('#camera').unbind('click');
  $('#js-action').unbind('click');
  $('#camera').click(Camera.on);
  $('#js-action').click(Camera.on);
};

Camera.render = function(){

};

Camera.on = function(){
  Bebo.callin(true, true);
  $('#camera').unbind('click');
  $('#js-action').unbind('click');
  $('#js-action').click(Camera.off);
};

Camera.off = function(){
  Bebo.hangup();
  $('#notify-er').remove();
  $('#camera').unbind('click');
  $('#camera').click(Camera.on);
  $('#js-action').unbind('click');
  $('#js-action').click(Camera.on);
};

Camera.flip = function(){

};

Camera.mute = function(){

};

Camera.cancel = function(){

};

module.exports = Camera;
