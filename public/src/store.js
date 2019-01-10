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
    // put outBuf INTO canvas, whatever that is in this case
    return mm;
}


lookupBlock = function(cid) {
    d3.json("/gateway/public/" + cid + ".json", function(error, json) {
        if (error) {
            self.logger.error("Failure loading "+cid+": "+ error.statusText);
            return;
        };
        
        self.blocks[json["target_id"]] = json;
        json['_root'] = self.blocks;
        json['_label'] =  json["target_id"].slice(0,10) + "...";
        if (json['kolmoblocks']) {
            json['kolmoblocks']['_label'] = "k";
            for (each in json['kolmoblocks']) {
                json['kolmoblocks'][each]['_root'] = json;
                json['kolmoblocks'][each]['_label'] = each; 
            }
        };
        self._selected = json;
        self.render();
    });
};

renderBlock = function(cid, kb, target) {
    var manifest = self.blocks[cid]['kolmoblocks'][kb];
    loadKolmoblock(manifest, $(target));	
};