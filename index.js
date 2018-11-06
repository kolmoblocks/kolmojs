var demo; // define netVis object here so that it is global
// and console accessable

$(function() {

  Settings = {};
  demo = new NetVis(Settings);
  
  $('#history').rangeslider();
  

  $("#reset-positions").click(demo.resetPositions);
  $("#play").click(demo.play);
  $("#next").click(demo.next);
  $("#prev").click(demo.prev);
  $("#repeat").click(demo.loopPlay);
  
  
  var SrcURL="bootstrap.json";
  d3.json(SrcURL, function(error, json) {
  	if (error) {
  		demo.logger.error("Failure loading "+SrcURL+": "+ error.statusText);
  		return;
  	}
  	demo.logger.info("Succesfully resolved " + SrcURL);
    demo.parse(json);
    demo.logger.info(demo);
    demo.initView();
  });

  $("#demo1-lookup").click(function() {
    demo.lookupBlock('cf6e363dde4009ce1df3ba92297564ac51bc28a50653bc6428c05d4314d3650f');
  });

});
