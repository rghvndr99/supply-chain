import React from 'react';

class UserDetail extends React.Component {
	constructor (props) {
		super(props)
	}

	render() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
        const { logout,productList, showRequestToggle } = this.props;
        const {name, email, userid, requests=[]} = userInfo;
		return (
				<div className="logged-in-user-drawer">
                    <div className="user-info">
                        <span className="info">
                            Name: <span className="legend">{name}</span> 
                        </span>
                        <span className="info">
                            Email: <span className="legend">{email}</span> 
                        </span>
                        <span className="info">
                            userid: <span className="legend">{userid}</span>
                        </span>
                        <button className="btn go-to-request" onClick={showRequestToggle}> Request {requests.length} </button>
                        <button className="btn logout" onClick={logout}> Logout</button>
                    </div>
                </div>
			)
	}
}

export default UserDetail;