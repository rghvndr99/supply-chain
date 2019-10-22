import React from 'react';
import image1 from '../image/ele1.jpeg';
import image2 from '../image/ele2.jpeg';
import image3 from '../image/ele3.jpeg';
import image4 from '../image/ele4.jpeg';
import image5 from '../image/ele5.jpeg';
import image6 from '../image/ele6.jpeg';
import image7 from '../image/ele7.jpeg';
import image8 from '../image/ele8.jpeg';

class Tile extends React.Component {
	constructor (props) {
		super(props);
		this.editProductDetails = this.editProductDetails.bind(this);		
	}
	editProductDetails = () =>{
		const {editProduct} = this.props;
		editProduct();
	}

	render() {
		const { loginAssupplier,removeFromlist,product,editProduct} = this.props;
		const { Name, Description, SupplierName, Quantity=1,ProductId} = product;
		const imgAry=[image1,image2,image3,image4,image5,image6,image7,image8];
		const imgName=imgAry[Math.floor(Math.random() * imgAry.length-1) + 1]; 
		
		return (
			<div className="card">
				<div className ="product-info">
  				<img src={imgName} className="product-image" />
  				<div className="container">
   					 <p className="name"><b>{Name}</b></p>
    				 <p className="product">{Description}</p>
    				 <div className="more-info">
    				 	<span className="supplied-by"> 
    				 		Supplier: 
    				 		<span className="legend">
    				 			{SupplierName}
    				 		</span>
    				 	</span> 
						 <span className="quantity"> quantity: 
    				 		<span className="legend">
								{Quantity}
    				 		</span>    				 		
						 </span>  
    				 </div>
  				</div>
				 </div>
					<div className = "user-action">
							<button className ="btn btn-remove" onClick={()=>removeFromlist(ProductId)} >Remove</button>
							<button className="btn btn-edit" onClick={()=>editProduct(product)}>Edit</button>
					</div>
			</div>
			)
	}
}

export default Tile;