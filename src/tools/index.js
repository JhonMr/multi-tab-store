/*
* Author: LJH
* Date: 2019/7/19
* Description:
*/
export function isEmptyObj(obj){
    for(let key in obj){
        return false;
    }
    return true;
}

export function removeArrayItem(array, item){
    let index = array.indexOf(item);
    if(index>-1)
        return array.split()
}
