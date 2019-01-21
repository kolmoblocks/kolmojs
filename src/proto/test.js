const KBstorage = require('.//BrowserScript//KBstorage.js')

const MyStorage = new KBstorage();

{
    // code for demo project
    let exp = "{ \"cid\" : \"7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C\" }";

    // get information for requested expression 
    let inCache = MyStorage.ExpressionInCache(JSON.parse(exp));
    console.log(exp + ", InCache " + inCache);

    // expecting array of expressions or empty array if error or exp has no inner expressions
    let exp_array = MyStorage.ParseExpression(exp);

    for ( var i in exp_array )
    {
        let inCache = MyStorage.ExpressionInCache(exp_array[i]);
    
        console.log(JSON.stringify(exp_array[i]) + ", InCache " + inCache);
    }

    while( 0 != exp_array.length )
    {
        let new_exp_array = new Array();

        for ( var i in exp_array )
        {
            let str_exp = JSON.stringify(exp_array[i]);
            
            let exp = MyStorage.ParseExpression(str_exp);

            for ( var j in exp )
            {
                new_exp_array.push(exp[j]);

                let inCache = MyStorage.ExpressionInCache(exp[j]);
            
                console.log(JSON.stringify(exp[j]) + ", InCache " + inCache);
            }
        }

        exp_array = new_exp_array;
    }
}


{
    // hello banana
    MyStorage.GetData("{ \"cid\" : \"7E1D8D6609499A1A5FB67C6B9E7DD34CF7C6C4355259115FC7161F47266F5F3C\" }").then(function(data)  {
        if ( null == data )
        {
            console.log("Empty data");
            return;
        }

        console.log("first");
        console.log("MIME " + data["MIME"]);
        console.log("size " + data["size"]);
        console.log(data);
    })
}

{
    // hello banana
    MyStorage.GetData("{ \"exec\" : { \"wasm\" : { \"cid\" : \"_wasm_concat_\" }, \"arg1\" : { \"cid\" : \"2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824\" }, \"arg2\" : { \"cid\" : \"B493D48364AFE44D11C0165CF470A4164D1E2609911EF998BE868D46ADE3DE4E\" } } }")
        .then(function(data) {
            if ( null == data )
            {
                console.log("Empty data");
                return;
            }

            console.log("second");
            console.log("MIME " + data["MIME"]);
            console.log("size " + data["size"]);
            console.log(data);
        })
}
