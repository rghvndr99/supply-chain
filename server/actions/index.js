import config from '../../config.js';
import { async } from 'q';

const deleteProduct = async(query)=>{
    return await global.databaseInstance.collection(config.collections.product).removeOne(query,true);
}

const filterProducts = async(query ={})=>{
    return await global.databaseInstance.collection(config.collections.product).find(query);
}

const updateProduct = async(query1,query2)=>{ 
    return await global.databaseInstance.collection(config.collections.product).updateOne(query1,query2);
}
const findAssociatedProduct = async(result)=>{
    return await global.databaseInstance.collection(config.collections.product).find({ProductId: {$in: result }})
}

const updateUser = async(userid,result)=>{
    return await global.databaseInstance.collection(config.collections.user).updateOne({userid:userid},{$set:{cart:result}})
}
const findUserById = async(query)=>{
    return await global.databaseInstance.collection(config.collections.user).find(query);
}
const loginService = async(userid,password)=>{
    return await global.databaseInstance.collection(config.collections.user).find({
		$and: [{userid:userid},{password:password}]});
}
const updateRequest = async(reqId, status) => {
    console.log('michael', reqId, status);
    return await global.databaseInstance.collection(config.collections.requests).updateOne({reqId:reqId},{$set:{status:status}});
}
const getRequest = async(query) => {
    return await global.databaseInstance.collection(config.collections.requests).find(query);
}
const deleteRequest = async(query) => {
    return await global.databaseInstance.collection(config.collections.requests).deleteOne(query,true);
}
const aggregateRequestAndProductsForUser= async(userid,password) =>{
    return await global.databaseInstance.collection(config.collections.user).aggregate([
                {$match:{'userid':userid,'password': password}},
                {
                    $lookup:
                    {
                        from: config.collections.requests,
                        localField: "userid",
                        foreignField: "raisedBy",
                        as: "requests"
                    }
                },
                {
                    $lookup:
                    {
                        from: config.collections.requests,
                        localField: "userid",
                        foreignField: "raisedFor",
                        as: "requests"
                    }
                },
                {
                $lookup: 
                    {
                    from: config.collections.product,
                    localField:"userid",
                    foreignField: "userid",
                    as: "product"
                    }
                }
            ]);
}

export {
    loginService,
    deleteProduct,
    filterProducts,
    updateProduct,
    findUserById,
    updateUser,
    findAssociatedProduct,
    updateRequest,
    getRequest,
    deleteRequest,
    aggregateRequestAndProductsForUser,
}