import React from 'react';
import { render } from 'react-dom'
import CustomerService from './CustomerService'


export default class CustomerDetailsComponent extends React.Component {
  state={status: "", customer: {}}

 constructor(props) {
   super(props);

   CustomerService.get().getCustomer(props.params.customerId).then((result)=>{
     this.setState({status: "successfully loaded customer details", customer: result});
   }).catch((reason)=>{
     this.setState({status: "error: "+reason});
   });
 }
  onEditCustomer = (event) => {
      event.preventDefault();
      console.log("onEditCustomer");
      CustomerService.get().editCustomer(this.state.customer.id,this.state.newName,this.state.newCity).then((result) =>{
          this.state.customer.name = this.state.newName;
          this.state.customer.city = this.state.newCity;
          this.setState({status:"Customer changed."});
          console.log(this.state.customer);
      }).catch((reason)=>{
          this.setState({satus:"error: " + reason});
      });
  }
  onEditCustomerFormChanged = (event) =>{
      this.setState({[event.target.name]: event.target.value});
  };

  render() {
    return <div>status: {this.state.status}<br/>
      <ul>
        <li>name: {this.state.customer.name}</li>
        <li>city: {this.state.customer.city}</li>
      </ul>
      <form onSubmit={this.onEditCustomer} onChange={this.onEditCustomerFormChanged}>
          <label>Name:<input type="text" name="newName" value={this.state.newName}/></label>
          <label>City:<input type="text" name="newCity" value={this.state.newCity}/></label>
          <input type = "submit" value="Edit customer" />
      </form>
    </div>
  }
}
