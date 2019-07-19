/*
* Author: LJH
* Date: 2019/7/19
* Description:
*/
import {isEmptyObj} from "./tools";

const MemoryStorage =  class {
    constructor(){

    }
    setItem(k, v){
        MemoryStorage.dataSendHandler( this.data );
    }
    getItem(k){
        return sessionStorage.getItem(k);
    }
    removeItem(k){
        MemoryStorage.dataSendHandler( this.data );
    }
    clear(){
        this.data = {};
        MemoryStorage.dataSendHandler( this.data );
    }
    static broadcastSend(k, v) {
        let handlerName = '_memoryStorageBroadcast';
        localStorage.setItem(handlerName, JSON.stringify({k, v}));
        localStorage.removeItem(handlerName);
    }
    static broadcastReceive(k ,v) {
        let memoryKey = (sessionStorage.getItem('_memoryKey')||'').split(',');
        if(v===undefined) {
            sessionStorage.removeItem(k);
            memoryKey.indexOf()
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
const initMemoryStorage = function(){
    var memoryStorage = new MemoryStorage();
    window.addEventListener('storage',function(e){
        if( e.newValue===null ) return false;
        if(e.key == 'getMemoryStorage'){
            console.log('有其他页面取memory')
            MemoryStorage.dataSendHandler( memoryStorage.data );
        }
        else if(e.key == 'setMemoryStorage'){
            let data = JSON.parse(e.newValue);
            if( isEmptyObj(data) ){
                console.log('memory被清空了')
                memoryStorage.data = {};
            }else{
                console.log('memory被修改了')
                for(let k in data){
                    memoryStorage.data[k] = data[k];
                }
            }
        }
    })
    if( isEmptyObj(memoryStorage.data) ){
        MemoryStorage.dataGetHandler();
    }
}

export default initMemoryStorage;
