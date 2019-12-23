import React from 'react';
import Login from "./Login.js";
import Image from "./Image.js";
import logo from '../image/logo.png';

const Header =(props) => {
	const {login,drawerClick, showRequestToggle, loginAssupplier,logout,productList,showLoginDrawer,productPortalListing} = props;

		return (
				<React.Fragment>
					<header className="header">
						<div className="hedaer-content" onClick={() => productList()}>
							<Image dataSrc={logo} cssClass="logo"></Image>							
						</div>
						{ loginAssupplier &&
								<h2>Portal items</h2>
						}
						<div className="userDrawer">
							<Login
							 loginClick={drawerClick} 
							 showLoginDrawer={showLoginDrawer}
							  login = {login}
							  logout = {logout}
							  showRequestToggle = {showRequestToggle}
							  productList = {productList}
							  productPortalListing = {productPortalListing}
							/>
						</div>
					</header>
						
				</React.Fragment>
			)
}


export default Header;