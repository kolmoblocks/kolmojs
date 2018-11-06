// kolmoblock renderer first

async function loadKolmoblock(manifest, canvas) {
    const wasm_response = await fetch('/gateway/raw/' + manifest['wasm_id']);
    const buffer = await wasm_response.arrayBuffer();

    const huffmanTableResponse = await fetch('/gateway/raw/' + manifest["encoding_table_id"]);
    const huffmanTableRaw = await huffmanTableResponse.arrayBuffer();
    const huffmanTable = new Uint8Array(huffmanTableRaw, 0, huffmanTableRaw.byteLength);
    console.log("serialized huffman-table size:", huffmanTableRaw.byteLength);

    const datablockResponse = await fetch('/gateway/raw/' + manifest["encoded_data"]);
    const datablockRaw = await datablockResponse.arrayBuffer();
    const datablock = new Uint8Array(datablockRaw, 0, datablockRaw.byteLength);
    console.log("serialized encoded data size:", datablockRaw.byteLength);

    const module = await WebAssembly.compile(buffer);
    const instance = await WebAssembly.instantiate(module, {env:{
        consoleLog: num => console.log("value is: ", num),
        consoleLevelLog: num => console.log("level is:", num),
        consoleRightmostLog: num => console.log("rightmost is:", num),
    }});

    mm = instance.exports;
    const huffmanOffset = mm.getHuffmanOffset();
    const strBuf = new Uint8Array(mm.memory.buffer, huffmanOffset, huffmanTable.length);
    for (let i=0; i < huffmanTable.length; i++) {
      strBuf[i] = huffmanTable[i];
    }
    const encodedDataOffset = mm.get_encoded_data_offset();
    console.log("the size of the encoded data is:", datablock.byteLength);
    console.log("the offset for encoded data is:", encodedDataOffset);
    mm.set_encoded_data_size(datablock.byteLength);
    const encodedDataBuf = new Uint8Array(mm.memory.buffer, encodedDataOffset, datablock.byteLength);
    for (let i=0; i < datablock.byteLength; i++) {
      encodedDataBuf[i] = datablock[i];
	}
	mm.decodeHuffman();

	const memory = mm.memory;
	const offset = mm.get_decoded_data_offset();
	const size = mm.get_decoded_data_size();
  
  
	const outBuf = new Uint8Array(memory.buffer, offset, size);
	canvas.empty();
	canvas.append(new TextDecoder().decode(outBuf));
    return mm;
}



// NetVis defines global object NetVis that wraps up everything else

// constructor for NetVis class
function NetVis(Options) {
	var self = this;
	self._topologyPanel = Options.topologyPanel || "#chart";
	self._historyPanel = Options.historyPanel || "#history";
	self._timePanel = Options.timePanel || "#timestamp";
	self._playmode = false;

	self.config = {
		_root: self,
		_label: "configuration",
		nodeDefaultDistance: 30,
		nodeDefaultRadius: 10,
		loopPlay: false
	};
	
	self._constructNodes(); // constructor for self.nodes
	self._constructMessages(); // constructor for self.messages
	self._constructConnections(); // constructor for self.connections
	self._constructHistory(); // constructor for self.history
	self._constructLogger();
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
	
	self.play = function() {
		self._playmode = !self._playmode;
		if (self._playmode) {
			self._playTicker = window.setInterval(function() {
				self.history.next();
				self.render();
			}, 800);
		} else {
			window.clearInterval(self._playTicker); // clear play ticking timer
		}
		self.render();
	};
	
	self.next = function() {
		self.history.next();
		self.render();
	};
	
	self.prev = function() {
		self.history.prev();
		self.render();
	};
	
	self.loopPlay = function() {
		self.config.loopPlay = !self.config.loopPlay;
		self.render();
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

	self.lookupBlock = function(cid) {
		d3.json("/gateway/public/" + cid + ".json", function(error, json) {
			if (error) {
				self.logger.error("Failure loading "+cid+": "+ error.statusText);
				return;
			};
			self.blocks[json["target_id"]] = json;
			json['_root'] = self.blocks;
			json['_label'] =  json["target_id"].slice(0,10) + "...";
			json['kolmoblocks']['_label'] = "k";
			for (each in json['kolmoblocks']) {
				json['kolmoblocks'][each]['_root'] = json;
				json['kolmoblocks'][each]['_label'] = each; 
			}
			self._selected = json;
			self.render();
		});
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
