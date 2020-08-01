/*
* Author: LJH
* Date: 2019/7/19
* Description:
*/

const MemoryStorage =  class {
    constructor(){
        if(MemoryStorage.instance) return MemoryStorage.instance;
        MemoryStorage.instance = this;
        this._data = {};
    }
    setItem(k, v){
        this._data[k] = v;
        MemoryStorage.dataSendHandler( this._data );
    }
    getItem(k){
        return this._data[k];
    }
    removeItem(k){
        if(this._data[k] === undefined) return false;
        delete this._data[k];
        MemoryStorage.dataSendHandler( this._data );
    }
    clear(){
        this._data = {};
        MemoryStorage.dataSendHandler( this._data );
    }
    getData() {
        return this._data;
    }
    setData(data) {
        this._data = data
    }
    mergeToData(data) {
        for(let k in data) {
            this._data[k] = data[k]
        }
    }
    static dataSendHandler( data ){
        localStorage.setItem('setMemoryStorage', JSON.stringify(data));
        localStorage.removeItem('setMemoryStorage');
    }
    static dataGetHandler(){
        localStorage.setItem('getMemoryStorage', new Date().getTime());
        localStorage.removeItem('getMemoryStorage');
    }
}
function initMemoryStorage(){
    var memoryStorage = new MemoryStorage();
    window.addEventListener('storage',function(e){
        if( e.newValue===null ) return false;
        if(e.key == 'getMemoryStorage'){
            console.log('有其他页面取memory')
            MemoryStorage.dataSendHandler( memoryStorage.getData() );
        }
        else if(e.key == 'setMemoryStorage'){
            let data = JSON.parse(e.newValue);
            if( isEmptyObj(data) ){
                console.log('memory被清空了')
                memoryStorage.setData({});
            }else{
                console.log('memory被修改了')
                memoryStorage.mergeToData(data)
            }
        }
    })
    if( isEmptyObj(memoryStorage.data) ){
        MemoryStorage.dataGetHandler();
    }
    initMemoryStorage = function() {
        return memoryStorage;
    }
    return memoryStorage;
}
function isEmptyObj(obj){
    for(let i in obj){
        return false;
    }
    return true;
}
export default initMemoryStorage;

