import React, { Component } from "react";
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

class Main extends Component {
    constructor(props){ 
        super(props);
        this.state = {
          productList : [],
          loginDetail : userInfo,
          showLoginDrawer: false,
          loginAssupplier: false,
          showRequests: false
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.productListing = this.productListing.bind(this);
        this.drawerClick = this.drawerClick.bind(this);
        this.productPortalListing = this.productPortalListing.bind(this);
        this.removeFromlcist = this.removeFromlist.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.showRequestToggle = this.showRequestToggle.bind(this);
        this.deleteReq = this.deleteReq.bind(this);
        this.editReq = this.editReq.bind(this);
        this.changeStatusReq = this.changeStatusReq.bind(this);
 }

 removeFromlist = async(productId) => {
    const res = await removeFromListService(productId);
      this.setState({
        productList:res.result,
        showLoginDrawer: false,
      }); 
 } 
 updateProduct = async(updatedProduct={}) => {
    PopupboxManager.close()
    const res=await updateProductservice(updatedProduct);
          this.setState({
            productList:res.result,
            showLoginDrawer: false,
          });          
 }

 editProduct = (product) => {
    PopupboxManager.open({ content: <EditProductTile updateProduct={this.updateProduct} product={product} />});
 }
 componentDidMount = async() => {
    if(userInfo) {
          const res = await productlistingService();
          this.setState({
            productList:res.result,
            showLoginDrawer: false,
            loginAssupplier: false,
          });
    }
 }
 productListing = async( from ) => {
        const res = await productlistingService(from);
          this.setState({
            productList:res.result,
            showLoginDrawer: false,
            loginAssupplier: false,
          });
 }
 
 productPortalListing = async() => {

const res= await productPortalListingService();
          this.setState({
            productList:res.result,
            showLoginDrawer: false,
            loginAssupplier: true,
          });

 }

 login = async( username ='', password ='' ) => {    
    const res = await loginService(username,password);
    if(res && res.result.length>0) {
      let product = res.result[0].product.length ? res.result[0].product[0].product : [];

      delete res.result[0].product;
      sessionStorage.setItem('userInfo',JSON.stringify(res.result[0]));

      this.setState({
        loginDetail: res.result[0].userid,
        productList: product,
        requestList: res.result[0].requests
      });      
    }
}

logout = () => {
  this.setState({
    loginDetail: null,
    showRequests: false,
    productList: []
  });
  userInfo= null;
  sessionStorage.removeItem('userInfo');
}

drawerClick = () => {
  this.setState({
      showLoginDrawer: !this.state.showLoginDrawer
  })
}
showRequestToggle = () => {
  this.setState({
    showRequests : !this.state.showRequests
  });
}
deleteReq = async(reqId) => {
 const response = await deleteReq(reqId);
 const sessionItem = JSON.parse(sessionStorage.getItem('userInfo')) || {};
 if(response.ok) {
   let req = sessionItem.requests || [];
   let filteredReq = req.filter(item => item.reqId !== reqId);
   this.setState({
    requestList: filteredReq
  });
 }
 
}
editReq = (reqId) => {
  console.log('delete is called');
}

changeStatusReq = async(reqId,status = 'approved') => {
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
   this.setState({
    requestList: filteredReq
  });
 }
}


  render() {
    let { productList = [],
      requestList = [], 
      loginDetail, 
      showLoginDrawer,
       loginAssupplier, 
       showRequests} = this.state;

    let productTile = productList.map((item, index) => {
        return <Tile 
            product={item}
            key={index} 
            loginAssupplier={loginAssupplier}
            loginDetail={loginDetail}
            removeFromlist={this.removeFromlist}
            editProduct={this.editProduct}            
          />
    });

    let tileMarkup= productTile.length > 0 ? productTile  : (loginDetail ? <h1>There is not products fount </h1>: <h1>Please login to continue</h1> ) ;

       return (
        <div>
          <PopupboxContainer />
          <Header 
            login={this.login} 
            logout={this.logout}
            showRequestToggle = {this.showRequestToggle}
            productList={this.productListing}
            drawerClick={this.drawerClick}
            showLoginDrawer={showLoginDrawer}
            productPortalListing={this.productPortalListing}
            loginAssupplier={loginAssupplier}
           />
          { showRequests &&  

            <Request 
            editReq= {this.editReq}
            changeStatusReq= {this.changeStatusReq}
            deleteReq= {this.deleteReq}
            requests = {requestList}
            userid = {loginDetail} />
            
          }
          <div className="tile-container">
            { tileMarkup }            
          </div>
        </div>
    );
}
}


export default Main;