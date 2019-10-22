import React from 'react';

class EditProductTile extends React.Component {
	constructor (props) {
		super(props);	
		this.update = this.update.bind(this);	
	}
 update =() => {
 	 const {updateProduct,product} = this.props;
	 const opt= {
	 	...product,
 	 	Name: this.Pname.value,
 	 	Description: this.Description.value,
 	 	Quantity: this.Quantity.value || 1,
 	 	Price: this.Price.value || 1
 	 };

 	 updateProduct(opt);
 }

	render() {
		const { Name, Description,Category, Status,Quantity,ProductId,Price} = this.props.product;
	
		return (
			<div className="product-wrapper-modalbox">
  				<h4> Product Detail</h4>
				  <div className="product-field-modalbox">

                    <label htmlFor="uname"><b>Name</b></label>
                    <input type="text" className="text-input" ref= {(input) => this.Pname = input} defaultValue={Name} name="uname" required />

					<label htmlFor="Category"><b>Category</b></label>
                    <input type="text" className="text-input" ref= {(input) => this.Category = input} defaultValue={Category} name="Category" required />

					<label htmlFor="Quantity"><b>Quantity</b></label>
                    <input type="text" className="text-input" ref= {(input) => this.Quantity = input} defaultValue={Quantity} name="Quantity" />
								
					<label htmlFor="Price"><b>Price</b></label>
                    <input type="text" className="text-input" ref= {(input) => this.Price = input} defaultValue={Price} name="Price" required />

					<label htmlFor="description"><b>Description</b></label>
                    <textarea className="text-textarea" ref= {(input) => this.Description = input} defaultValue={Description} name="description"  />

                  </div>
                  <button className="btn btn-login" onClick={this.update}>Update</button>
			</div>
			)
	}
}

export default EditProductTile;