import KBstorage from './proto/BrowserScript/KBstorage';

const KBStore = new KBstorage();
console.log(KBStore);

export function ExpressionInCache(expr) {
    return KBStore.ExpressionInCache(expr);
}

export async function ParseExpression(expr) {
    return await KBStore.ParseExpression(expr);
}


export async function GetData(expr) {
    return await KBStore.GetData(expr);
};

export async function loadBlock(manifest) {
    const wasm_response = await fetch('/raw/' + manifest['wasm_id']);
    const buffer = await wasm_response.arrayBuffer();

    const huffmanTableResponse = await fetch('/raw/' + manifest["encoding_table_id"]);
    const huffmanTableRaw = await huffmanTableResponse.arrayBuffer();
    const huffmanTable = new Uint8Array(huffmanTableRaw, 0, huffmanTableRaw.byteLength);
    console.log("serialized huffman-table size:", huffmanTableRaw.byteLength);

    const datablockResponse = await fetch('/raw/' + manifest["encoded_data"]);
    const datablockRaw = await datablockResponse.arrayBuffer();
    const datablock = new Uint8Array(datablockRaw, 0, datablockRaw.byteLength);
    console.log("serialized encoded data size:", datablockRaw.byteLength);

    const module = await WebAssembly.compile(buffer);
    const instance = await WebAssembly.instantiate(module, {env:{
        consoleLog: num => console.log("value is: ", num),
        consoleLevelLog: num => console.log("level is:", num),
        consoleRightmostLog: num => console.log("rightmost is:", num),
    }});

    var mm = instance.exports;
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
    return outBuf;
}


export async function lookupBlock(cid='') {
    let theUrl = (cid===''? '/search' : '/search?cid=');

    return Promise.all([
        fetch('http://'+window.location.host+theUrl, {
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        }).then((response)=>response.json())// response format is fucked up - fix it!
    ]);
};

// export function renderBlock(cid, kb, target) {
//     var manifest = this.blocks[cid]['kolmoblocks'][kb];
//     loadKolmoblock(manifest, $(target));
// };