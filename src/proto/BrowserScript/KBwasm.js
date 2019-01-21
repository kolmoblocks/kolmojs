module.exports = class KBWasm
{
    constructor(raw_wasm, args)
    {
        this.raw_wasm = raw_wasm;
        this.args = args;
    }
    

    Exec()
    {
        // hard coded implementstion of concat buffers
        let count = 0;
        let result = new Array();

        for ( var i in this.args )
        {
            let arg = this.args[i];
            for ( var j in arg )
            {
                if (( j == "MIME" ) || ( j == "size" ))
                    continue;

                result.push(arg[j]);
                count++;
            }
        }
        
        result["MIME"] = "utf8/text";
        result["size"] = count;

        return result;
    }
}