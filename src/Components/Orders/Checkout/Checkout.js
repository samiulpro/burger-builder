import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody } from 'reactstrap'
import { resetIngredients } from '../../Redux/ActionCreator'
import Spinner from '../../Spinner/Spinner'


const mapStateToProps = state => {
 return {
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
  purchaseable: state.purchaseable,
 }
}

const mapDispatchToProps = dispatch => {
 return {
  resetIngredients: () => dispatch(resetIngredients())
 }
}

export class Checkout extends Component {
 state = {
  values: {
   deliveryAddress: "",
   phone: "",
   paymentType: "Cash On Delivery"
  },
  isLoading: false,
  modalMsg: "",
 }

 goBack = () => {
  this.props.history.goBack("/");
 }

 inputChangeHandler = event => {
  this.setState({
   values: {
    ...this.state.values,
    [event.target.name]: event.target.value
   }
  })
 }

 submitHandler = () => {
  this.setState({ isLoading: true })
  const order = {
   ingredients: this.props.ingredients,
   customer: this.state.values,
   price: this.props.totalPrice,
   orderTime: new Date()
   }
   console.log(order)
  axios.post("https://burger-builder-b1bb9-default-rtdb.firebaseio.com/order.json", order)
   .then(response => {
    if (response.status === 200) {
     this.setState({
      isLoading: false,
      isModalOpen: true,
      modalMsg: "Order Placed Successfully",
     })
     this.props.resetIngredients();
    } else {
     this.setState({
      isLoading: false,
      isModalOpen: true,
      modalMsg: "Something Went Wrong",
     })
    }
   })
   .catch(err => this.setState({
    isLoading: false,
    isModalOpen: true,
    modalMsg: "Something Went Wrong. Order Again!!!",
   }))
 }

 render() {
  let form = (<div>
   <h4 className="border border-success px-5 py-5">Payment: {this.props.totalPrice}BDT</h4>
   <form className="border border-success px-5 py-5">
    <textarea
     name="deliveryAddress"
     value={this.state.values.deliveryAddress}
     className="form-control"
     placeholder="Input Your Address"
     onChange={(e) => this.inputChangeHandler(e)}>
    </textarea><br />

    <input type="number" name="phone"
     className="form-control"
     values={this.state.values.phone}
     placeholder="Input Your Contact Number"
     onChange={(e) => this.inputChangeHandler(e)} /><br />

    <select name="paymentType"
     className="form-control"
     value={this.state.values.paymentType}
     onChange={(e) => this.inputChangeHandler(e)}>
     <option value="Cash On Delivery">Cash On Delivery</option>
     <option value="Bkash">Bkash</option>
    </select><br />
    <Button className="btn btn-danger mr-auto"
     onClick={this.goBack}>Cancel Order</Button>
    <Button className="btn btn-warning ml-1"
     onChange={(e) => this.inputChangeHandler(e)}
     onClick={this.submitHandler}
     disabled={!this.props.purchaseable}>Place Order</Button>
   </form>
  </div>)
  return (
   <div>
    {this.state.isLoading ? <Spinner /> : form}
    <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
     <ModalBody>
      <p>{this.state.modalMsg}</p>
     </ModalBody>
    </Modal>
   </div>
  )
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
