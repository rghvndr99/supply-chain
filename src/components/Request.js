import React from "react";

let userInfo;

class Request extends React.Component {
  constructor(props) {
    super(props);
    userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
  }
  requestmarkUp = (requests, type) => {
    const { editReq, changeStatusReq, deleteReq } = this.props;

    return requests.map((item, index) => {
      return (
        <div className="request-wrapper">
          <div className="label">
            <span className="legends">Product ID</span>
            <span className="legends value">{item.productId}</span>
          </div>

          <div className="label">
            <span className="legends">Quanity</span>
            <span className="legends value">{item.quantity}</span>
          </div>

          <div className="label">
            <span className="legends">Raised For</span>
            <span className="legends value">{item.raisedFor}</span>
          </div>

          <div className="label">
            <span className="legends">Raised By</span>
            <span className="legends value">{item.raisedBy}</span>
          </div>

          <div className="label">
            <span className="legends">Raised On</span>
            <span className="legends value">{item.raisedOn}</span>
          </div>

          <div className="label">
            <span className="legends">Delivery Date</span>
            <span className="legends value">{item.deliveryDate}</span>
          </div>

          <div className="label">
            <span className="legends">Status</span>
            <span className={`legends value ${item.status}`}>
              {item.status}
            </span>
          </div>
          <div className="action">
            {type && type == "raisedFor" && (
              <button
                className="btn btn-approve"
                onClick={() => changeStatusReq(item.reqId)}
              >
                Approve{" "}
              </button>
            )}
            {type && type == "raisedBy" && (
              <button
                className="btn btn-edit"
                onClick={() => editReq(item.reqId)}
              >
                Edit{" "}
              </button>
            )}

            <button
              className="btn btn-action"
              onClick={() => deleteReq(item.reqId)}
            >
              Delete{" "}
            </button>
          </div>
        </div>
      );
    });
  };

  render() {
    const requests = this.props.requests || [];
    const userId = this.props.userid || "";
    const raisedBy = requests.filter(item => item.raisedBy == userId);
    const raisedFor = requests.filter(item => item.raisedBy !== userId);

    return (
      <div>
        <div className="request-container">
          {!!raisedBy.length && this.requestmarkUp(raisedBy, "raisedBy")}
        </div>
        <div className="request-container">
          {!!raisedFor.length && this.requestmarkUp(raisedFor, "raisedFor")}
        </div>
      </div>
    );
  }
}

export default Request;
