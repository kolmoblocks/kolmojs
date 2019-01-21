const KBcache = require('.//KBcache.js')

const KBwasm = require('.//KBwasm.js')

module.exports = class KBstorage
{
    constructor(path)
    {
        this.path = path;
        this.cache = new KBcache();
    }

    GetData(data_expression)
    {
        try {
            return Promise.resolve(this.ExecExpression(JSON.parse(data_expression)));
        }catch(error){
            console.log('Error parsing expression to JSON: ', error.stack);
        }

        return Promise.resolve(null);
    }

    ExecExpression(expression)
    {
        if ( expression.hasOwnProperty("cid") )
            return this._cid(expression);

        if ( expression.hasOwnProperty("exec") )
            return this._exec(expression);

        if ( expression.hasOwnProperty("ref") )
            return this._ref(expression);

        if ( expression.hasOwnProperty("raw") )
            return this._raw(expression);

        if ( expression.hasOwnProperty("seq") )
            return this._seq(expression);
        
        console.log("Not implemented for this type of expression");

        return null;
    }

    _cid(expression)
    {
        let data_by_cid = this.cache.GetDataExpressionByCID(expression["cid"]);

        let data_expressions = this.ExtractDataExpressions(data_by_cid);

        if ( 0 == data_expressions.length )
        {
            console.log("Empty expressions list for " + expression["cid"]);
            return null;
        }

        let exp_to_exec = this.ChooseExpression(data_expressions);
        
        return this.ExecExpression(exp_to_exec);
    }

    _exec(expression)
    {
        let exec = expression["exec"]

        if ( !exec.hasOwnProperty("wasm") )
        {
            console.log("Expression exec does't contain wasm property");
            return null;
        }
        
        let wasm = this.ExecExpression(exec["wasm"]);
        if ( null == wasm )
        {
            console.log("Expression exec has empty wasm");
            return null;
        }

        let args = new Array();

        for ( var index in exec )
        {
            if ( "wasm" == index )
                continue;
            
            let arg = this.ExecExpression(exec[index]);
            if ( null == arg )
            {
                console.log("Expression exec has empty arg");
                return null;
            }

            args.push(arg);
        }

        let result = new KBwasm(wasm, args).Exec();

        if ( null == result )
        {
            console.log("Wasm execution result is empty");
            return null;
        }

        return result;
    }

    _ref(expression)
    {
        let ref = expression["ref"];

        let result = this.cache.GetRawDataByRef(ref);

        if ( null == result )
        {
            console.log("Expression ref is empty");
            return null;
        }

        result["MIME"] = expression["MIME"];
        result["size"] = expression["size"];

        return result;
    }

    _raw(expression)
    {
        let raw = expression["raw"];

        let utf8str = String(raw); // <-- utf8 string
    
        var result = new Array();

        for ( var i=0; i < utf8str.length; i++ ) {

            var charcode = utf8str.charCodeAt(i);
            
            result.push( charcode ); // ????
        }

        return result;
    }

    _seq(expression)
    {
        let result = new Array();
        let seq = expression["seq"];

        let MIME = expression["MIME"];
        let size = expression["size"];

        for ( var index in seq )
        {
            let expression = seq[index];
            
            let data_block = this.ExecExpression(expression);

            if ( null == data_block )
            {
                console.log("Empty data in sequences");
                return null;
            }

            for ( var i in data_block )
                result.push(data_block[i]);
        }

        result["MIME"] = MIME;
        result["size"] = size;

        return result;
    }

    ExtractDataExpressions(data_by_cid)
    {
        let result = new Array();
        let MIME = data_by_cid["MIME"];
        let size = data_by_cid["size"];

        for ( var index in data_by_cid )
        {
            if (( "cids" == index ) || ( "MIME" == index ) ||( "size" == index ))
                continue;
            
            let expression = data_by_cid[index];

            expression["MIME"] = MIME;
            expression["size"] = size;

            if ( expression.hasOwnProperty("exec") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("ref") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("raw") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("cid") )
            {
                result.push(expression);
                continue;
            }

            if ( expression.hasOwnProperty("seq") )
            {
                result.push(expression);
                continue;
            }
        }
        
        return result;
    }

    ChooseExpression(data_expressions)
    {
        // now it's always first
        return data_expressions[0];
    }

    ParseExpression(exp)
    {
        try{
            let expression = JSON.parse(exp);

            let result = new Array();

            if ( expression.hasOwnProperty("cid") )
            {
                let data_by_cid = this.cache.GetDataExpressionByCID(expression["cid"]);
                let data_expressions = this.ExtractDataExpressions(data_by_cid);
                for ( var i in data_expressions )
                    result.push(data_expressions[i]);
            }

            if ( expression.hasOwnProperty("exec") )
            {
                let exec = expression["exec"];
                for ( var i in exec )
                    result.push(exec[i]);
            }

            if ( expression.hasOwnProperty("ref") )
            {
                //let ref = expression["ref"];
                //result.push(ref);
            }

            if ( expression.hasOwnProperty("raw") )
            {
                let raw = expression["raw"];
                result.push(raw);
            }

            if ( expression.hasOwnProperty("seq") )
            {
                let seq = expression["seq"];
                for ( var i in seq )
                    result.push(seq[i]);
            }

            return result;

        }catch(error){
            return null;
        }

    }

    ExpressionInCache(expression)
    {
        try{

            if ( expression.hasOwnProperty("ref") )
                return this.cache.RawDataInCacheByRef(expression["ref"]);

            if ( expression.hasOwnProperty("cid") )
                return this.cache.DataExpressionInCacheByCID(expression["cid"]);
                
        }catch(error){
            return false;
        }

        return false;
    }

}