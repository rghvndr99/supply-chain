import config from '../config.js';
import {loginService,
	deleteProduct,
	filterProducts,
	findUserById,
	updateProduct,
	updateUser,
	findAssociatedProduct,
	updateRequest,
    getRequest,
	deleteRequest,
	aggregateRequestAndProductsForUser
} from './actions';

import express from 'express';
import mongoDB from 'mongodb';
import bodyParser from 'body-parser';
import { async } from 'q';

const mongoClient = mongoDB.MongoClient;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', '*');
  res.append('Access-Control-Allow-Credentials', 'true');
  next();
});

mongoClient.connect(config.mongodbUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	} , (err,db)=> { 

	if (err ) {
		return err;
	}	
	global.databaseInstance = db.db(config.dbName)
});

app.post('/'+config.api.login,async (req,res,next)=> {

	const {userid = '', password = ''} = req.body;
	const response = await aggregateRequestAndProductsForUser(userid,password);

	response.toArray((err,result) => {
		if(err) {
			res.send({
				err
			});
			return;
		}
		res.send({
			result,			
		});
		next();

	});	
});

app.get('/'+config.api.product,async(req,res,next)=> {

	const response = await filterProducts();

	response.toArray( (err,result) => {
		if(err) {
			res.send({
				err
			});
			return;
		}
		res.send({
			result
		});
		next();	
	});
	
});

app.post('/'+config.api.product,async(req,res,next)=> {

	const {userid = ''} = req.body;
				
		const relatedproduct = await filterProducts({'userid': userid});
			relatedproduct.toArray( (err,result) => {	
				if(err) {
					res.send({
						err
					});
					return;
				}		
				res.send({
					result : result.length>0 && result[0].product || []
				});
				next();	
		});	
	
});

app.put('/'+config.api.product,async(req,res,next)=> {
	
	const {userid = ''} = req.body;

	const productList = await filterProducts({SuppliedBy: userid});
		productList.toArray( (err,result) => {
			if(err) {
				res.send({
					err
				});
				return;
			}
				res.send({
					result : result.length>0 && result[0].product || []
				});
				next();	
			});		
});

app.put('/'+config.api.editUserClt,async(req,res,next)=> {
	
	const {userid = '',productId = ''} = req.body;
	const findQuery = {
		'userid': userid,
		'product.ProductId': productId
	};
	const updateQuery = {
		$set: {'product.$': '' }
	}
	await updateProduct(findQuery, updateQuery);

	const filterBySupplierRes= await filterProducts({'userid':userid});				
	filterBySupplierRes.toArray( (err,result) => {	
		if(err) {
			res.send({
				err
			});
			return;
		}			
			res.send({
				result : result.length>0 && result[0].product || []
			});
			next();	
	});
});

app.post('/'+config.api.editProductClt,async(req,res,next)=> {
	
	const {Product = {},userid = ''} = req.body;
	delete Product._id;

	const findQuery = {
		'userid': userid,
		'product.ProductId': Product.ProductId
	};
	const updateQuery = {
		$set: {'product.$': Product }
	}
	await updateProduct(findQuery, updateQuery);

		const filterBySupplierRes= await filterProducts({'userid':userid});				
				filterBySupplierRes.toArray( (err,result) => {	
					if(err) {
						res.send({
							err
						});
						return;
					}			
						res.send({
							result : result.length>0 && result[0].product || []
						});
						next();	
			});		
});

app.put('/'+config.api.editProductClt,async(req,res,next)=> {
	
	const {userid = '',productId = ''} = req.body;
	//const element = {'userid':userid,'product.ProductId':productId};

	await updateProduct({'userid':userid}, { $pull: {'product': {  'ProductId': productId }} });

		const filterBySupplierRes= await filterProducts({'userid':userid});				
				filterBySupplierRes.toArray( (err,result) => {	
					if(err) {
						res.send({
							err
						});
						return;
					}			
						res.send({
							result : result.length>0 && result[0].product || []
						});
						next();	
		});	
});

app.get('/',(req,res,next) => {
	res.send('server is running');
	next();	
})

app.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

