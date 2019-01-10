var demo; // define netVis object here so that it is global
// and console accessable

$(function() {

  Settings = {};
  demo = new NetVis(Settings);
  
  $('#history').rangeslider();
  

  $("#reset-positions").click(demo.resetPositions);
  
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

});
