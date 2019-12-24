import React, {useState,useEffect } from "react";
import Header from "./Header.js";
import Tile from "./Tile.js";
import Request from "./Request.js";
import {productlistingService,
  updateProductservice,
  productPortalListingService,
  removeFromListService,
  loginService,
  deleteReq,
  changeReqStatus
} from '../services';
import EditProductTile from "./EditProductTile.js";
import {
	PopupboxManager,
	PopupboxContainer
  } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css";
import { async } from "q";


let userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
userInfo = userInfo.userid || '';

const Main = ()=> {

  const initilaStateObj = {
    productList : [],
    loginDetail : userInfo,
    showLoginDrawer: false,
    loginAssupplier: false,
    showRequests: false
  };
  const [stateObj,changeState]=useState(initilaStateObj);

  useEffect(()=>{
      if(userInfo) {
        productListing();
      }
  },[]);

 const productListing = async( ) => {
    const res = await productlistingService();
      changeState({
        ...stateObj,
        productList:res.result,
        showLoginDrawer: false,
        loginAssupplier: false
      });
  }

  const login = async( username ='', password ='' ) => {    
    const res = await loginService(username,password);
      if(res && res.result.length>0) {
        let product = res.result[0].product.length ? res.result[0].product[0].product : [];

        delete res.result[0].product;
        sessionStorage.setItem('userInfo',JSON.stringify(res.result[0]));
        changeState({
          ...stateObj,
          loginDetail: res.result[0].userid,
          productList: product,
          requestList: res.result[0].requests
        });   
      }
 }

  const logout = () => {
    changeState({
      ...stateObj,
      loginDetail: null,
      showRequests: false,
      productList: []
    });
    userInfo= null;
    sessionStorage.removeItem('userInfo');
  }

  const showRequestToggle = () => {
    changeState({
      ...stateObj,
      showRequests: !stateObj.showRequests
    });
  }

  const drawerClick = () => {
    changeState({
      ...stateObj,
      showLoginDrawer: !stateObj.showLoginDrawer
    });
  }

  const  productPortalListing = async() => {

     const res= await productPortalListingService();
      changeState({
        ...stateObj,
        productList:res.result,
        showLoginDrawer: false,
        loginAssupplier: true
      });    
  }

  const deleteReq = async(reqId) => {
    const response = await deleteReq(reqId);
    const sessionItem = JSON.parse(sessionStorage.getItem('userInfo')) || {};
    if(response.ok) {
      let req = sessionItem.requests || [];
      let filteredReq = req.filter(item => item.reqId !== reqId);
      changeState({
        ...stateObj,
        requestList:filteredReq
      });
    }
    
   }
   const editReq = (reqId) => {
     console.log('edit req is called');
   }
   
   const changeStatusReq = async(reqId,status = 'approved') => {
    const response = await changeReqStatus(reqId, status);
    const sessionItem = JSON.parse(sessionStorage.getItem('userInfo')) || this.state.requestList;
    if(response.ok) {
      let req = sessionItem.requests || [];
      let filteredReq = req.map(item => {
        if (item.reqId == reqId) {
          item.status = status
        }
        return item;
       });
       changeState({
        ...stateObj,
        requestList:filteredReq
      });
    }
   }
   const tileMarkUp =()=>{
     const productList = stateObj.productList || [];
      return productList.map((item, index) => {
          return <Tile 
              product={item}
              key={index} 
              loginAssupplier={stateObj.loginAssupplier}
              loginDetail={stateObj.loginDetail}
              removeFromlist={removeFromlist}
              editProduct={editProduct}            
            />
      });
   }

 const removeFromlist = async(productId) => {
    const res = await removeFromListService(productId);
    changeState({
      ...stateObj,
      productList:res.result,
      showLoginDrawer: false,
    }); 
 } 

 const updateProduct = async(updatedProduct={}) => {
    PopupboxManager.close()
    const res=await updateProductservice(updatedProduct);
    changeState({
      ...stateObj,
      productList:res.result,
      showLoginDrawer: false,
    });          
 }

 const editProduct = (product) => {
    PopupboxManager.open({ content: <EditProductTile updateProduct={updateProduct} product={product} />});
 }

  return (
    <div>
      <PopupboxContainer />

      <Header
        login={login}
        logout={logout}
        showRequestToggle={showRequestToggle}
        productList={productListing}
        drawerClick={drawerClick}
        showLoginDrawer={stateObj.showLoginDrawer}
        productPortalListing={productPortalListing}
        loginAssupplier={stateObj.loginAssupplier}
      />

      {stateObj.showRequests && (
        <Request
          editReq={editReq}
          changeStatusReq={changeStatusReq}
          deleteReq={deleteReq}
          requests={stateObj.requestList}
          userid={stateObj.loginDetail}
        />
      )}

      <div className="tile-container">
            { tileMarkUp() }            
          </div>
    </div>
  );
}
export default Main;