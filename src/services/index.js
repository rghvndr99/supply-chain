import config from "../../config";

let userInfo = JSON.parse(sessionStorage.getItem("userInfo")) || {};
let userid = userInfo.userid || "";

const headers = { "Content-Type": "application/json; charset=UTF-8" };

const productlistingService = async () => {
  const reqType = userid && userid != "" ? "post" : "get";

  return await fetch(config.serverConnectURL + config.api.product, {
    method: reqType,
    headers,
    body: userid != "" ? JSON.stringify({ userid: userid }) : undefined
  }).then(res => res.json());
};

const updateProductservice = async updatedProduct => {
  return await fetch(config.serverConnectURL + config.api.editProductClt, {
    method: "post",
    headers,
    body: JSON.stringify({ Product: updatedProduct, userid: userid })
  }).then(res => res.json());
};

const productPortalListingService = async () => {
  return await fetch(config.serverConnectURL + config.api.product, {
    method: "put",
    headers,
    body: userid != "" ? JSON.stringify({ userid: userid }) : undefined
  }).then(res => res.json());
};

const removeFromListService = async productId => {
  const opt = {
    productId: productId,
    userid: userid
  };

  return await fetch(config.serverConnectURL + config.api.editProductClt, {
    method: "put",
    headers,
    body: JSON.stringify(opt)
  }).then(res => res.json());
};

const loginService = async (username, password) => {
  let opts = {
    userid: username,
    password: password
  };
  return await fetch(config.serverConnectURL + config.api.login, {
    method: "post",
    headers,
    body: JSON.stringify(opts)
  }).then(res => res.json());
};
const loginServiceFB = async (access_token, userid) => {
  let opts = {
    access_token: access_token,
    userid: userid
  };

  return await fetch(config.serverConnectURL + config.api.loginFB, {
    method: "post",
    headers,
    body: JSON.stringify(opts)
  }).then(res => res.json());
};
const loginServiceGH = async access_token => {
  let opts = {
    access_code: access_token
  };

  return await fetch(config.serverConnectURL + config.api.loginGH, {
    method: "post",
    headers,
    body: JSON.stringify(opts)
  }).then(res => res.json());
};
const deleteReq = async reqId => {
  return await fetch(config.serverConnectURL + config.api.requestClt, {
    method: "delete",
    headers,
    body: JSON.stringify({ reqId: reqId })
  });
};

const changeReqStatus = async reqId => {
  return await fetch(config.serverConnectURL + config.api.requestClt, {
    method: "post",
    headers,
    body: JSON.stringify({ reqId: reqId, status: "approved" })
  });
};

export {
  productlistingService,
  updateProductservice,
  productPortalListingService,
  removeFromListService,
  loginService,
  deleteReq,
  changeReqStatus,
  loginServiceFB,
  loginServiceGH
};
