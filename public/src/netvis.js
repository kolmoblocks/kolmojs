// NetVis defines global object NetVis that wraps up everything else

// constructor for NetVis class
function NetVis(Options) {
	var self = this;
	self._timePanel = Options.timePanel || "#timestamp";
	self._playmode = false;

	self.config = {
		_root: self,
		_label: "configuration",
		nodeDefaultDistance: 30,
		nodeDefaultRadius: 10,
		loopPlay: false
	};

	self._selected = self; // _selected object's public attributes are shown at properties-table
	
	
	self.resetPositions = function() {
		self.nodes.resetPositions();
		self._selected = self;
		self.render();
	};
	
	
	self.updateAll = function() {
		this.nodes.updateAll();
		this.messages.updateAll();
		this.history.updateAll();
		
		if (this.history.intervals) {
			this._selectedTimeInterval = this.history.intervals[0];
		}
	};
	
	$(document).on("keydown", function(event) {
		console.log("keydown logged!", event);
		switch (event.keyCode) {
			case 32:
			self.play();
			break;
			case 37:
			self.prev();
			break;
			case 39:
			self.next();
			break;
		}
	});

	self.blocks = {
		_root: self,
		_label: "blocks",
	};



	self.renderBlock = function(cid, kb, target) {
		var manifest = self.blocks[cid]['kolmoblocks'][kb];
		loadKolmoblock(manifest, $(target));	
	};

}


// NetVis can be imported as node.js module
// (currently used for testing)
if (typeof module != 'undefined') {
	module.exports = {
		NetVis: NetVis
	};
}
