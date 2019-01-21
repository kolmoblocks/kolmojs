const KBserver = require('..//Server//KBserver.js')

module.exports = class KBcache
{

    constructor(){
        this.KBserver = new KBserver();
        this.ref_cache = new Map();
        this.cid_cache = new Map();
    }

    GetDataExpressionByCID(cid)
    {
        let cached_data = this.cid_cache.get(cid);

        if ( null == cached_data )
        {
            let server_data = this.KBserver.GetDataExpressionByCID(cid);
            if ( null != server_data )
            {
                this.cid_cache.set(cid, server_data);
                return server_data;
            }
        }

        return cached_data;
    }

    GetRawDataByRef(ref)
    {
        let cached_data = this.ref_cache.get(ref);

        if ( null == cached_data )
        {
            let server_data = this.KBserver.GetRawDataByRef(ref);
            if ( null != server_data )
            {
                this.ref_cache.set(ref, server_data);
                return server_data;
            }
        }

        return cached_data;
    }

    DataExpressionInCacheByCID(cid)
    {
        let cached_data = this.cid_cache.get(cid);

        if ( null == cached_data )
            return false;
        else
            return true;
    }

    RawDataInCacheByRef(ref)
    {
        let cached_data = this.ref_cache.get(ref);

        if ( null == cached_data )
            return false;
        else
            return true;
    }

}