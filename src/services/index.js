import config from '../../config';

let userInfo= JSON.parse(sessionStorage.getItem('userInfo')) || {};
let userid = userInfo.userid || '';

const headers={ "Content-Type": "application/json; charset=UTF-8" };

const productlistingService = async()=>{
    const reqType= userid && userid != '' ? 'post': 'get';   

    return await fetch(config.serverConnectURL+config.api.product,{
      method: reqType,
      headers,
      body: userid !=''? JSON.stringify({'userid':userid}) : undefined         
    }).then((res) => res.json());
}

const updateProductservice = async(updatedProduct)=> {
    return await fetch(config.serverConnectURL+config.api.editProductClt,{
        method: 'post',
        headers,
        body: JSON.stringify({'Product':updatedProduct,'userid':userid})     
      }).then((res) => res.json())
}

const productPortalListingService= async()=> {
    return await fetch(config.serverConnectURL+config.api.product,{
        method: 'put',
        headers,
        body: userid !=''? JSON.stringify({'userid':userid}) : undefined         
      }).then((res) => res.json());
}

const removeFromListService= async(productId)=> {
    const opt= {
      'productId': productId,
      'userid': userid
    };

    return await fetch(config.serverConnectURL+config.api.editProductClt,{
      method: 'put',
      headers,
      body:  JSON.stringify(opt)        
    }).then((res) => res.json())
}

const loginService = async(username,password)=> {
    let opts={
        'userid': username,
        'password': password
      };
    return await fetch(config.serverConnectURL+config.api.login, {
        method: 'post',
        headers,
        body: JSON.stringify(opts)
        
      }).then((res) => res.json());
}

export {
    productlistingService,
    updateProductservice,
    productPortalListingService,
    removeFromListService,
    loginService
}