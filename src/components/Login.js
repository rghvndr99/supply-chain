import React from 'react';
import LoginDrawer from "./LoginDrawer.js";
import UserDetail from "./UserDetail.js";
import Image from "./Image.js";
import userlogo from '../image/user-small.png';


class Login extends React.Component {
	constructor (props) {
		super(props)
	}

	render() {
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
			userInfo = userInfo.userid || '';

        const {showLoginDrawer, loginClick, login,logout, showRequestToggle, productList,productPortalListing} = this.props;
		return (
				<React.Fragment>
					<div className="login-wrapper" onClick={()=>loginClick()}>
						{ userInfo &&
							<Image dataSrc={userlogo} cssClass="header-user-logo"></Image>

						}
						{ !userInfo && 
							<button className="btn login-link" >Login</button>
						}
					</div>					
                    {showLoginDrawer &&  (!userInfo ) &&
                        <LoginDrawer login={login} />
                    }
                    {showLoginDrawer && userInfo &&
						<UserDetail 
						   logout={logout}
						   productList={productList}
						   productPortalListing={productPortalListing}
						   showRequestToggle = {showRequestToggle}
						 />
                    }                    
				</React.Fragment>
			)
	}
}

export default Login;