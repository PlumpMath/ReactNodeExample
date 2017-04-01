import React from 'react';
import { render } from 'react-dom'
import CustomerService from './CustomerService'

export default class CustomerListComponent extends React.Component {
  state={status: "", customers: [], newCustomerName: "", newCustomerCity: "", newDelete:""}

  constructor() {
    super();

    CustomerService.get().getCustomers().then((result)=>{
      this.setState({status: "successfully loaded customer list", customers: result});
    }).catch((reason)=>{
      this.setState({status: "error: "+reason});
    });
  }

  // Event methods, which are called in render(), are declared as properties:
  onNewCustomerFormChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  // Event methods, which are called in render(), are declared as properties:
  onNewCustomer = (event) => {
    event.preventDefault();
    var name=this.state.newCustomerName;
    var city=this.state.newCustomerCity;
    CustomerService.get().addCustomer(name, city).then((result)=>{
      this.state.customers.push({id: result, name: name, city});
      this.setState({status: "successfully added new customer", customers: this.state.customers, newCustomerName: "", newCustomerCity: ""});
    }).catch((reason)=>{
      this.setState({status: "error: "+reason});
    });
  }

  onDeleteCustomer = (event) => {
    event.preventDefault();
    CustomerService.get().deleteCustomer(this.state.newDelete).then((result) => {
      console.log(this.state);
      for(var c=0;c<this.state.customers.length;c++){
        if(this.state.customers[c].id == this.state.newDelete){
          this.state.customers.splice(c,1);
          console.log(this.state);
          this.setState({status: "successfully deleted customer", customers : this.state.customers});
          break;
        }
      }
      this.setState({status:"Customer deleted.", customers:this.state.customers});
    }).catch((reason)=>{
      this.setState({status:"Error: "+reason});
    });
  }
  onDeleteCustomerFormChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    var listItems = this.state.customers.map((customer) =>
      <li key={customer.id}><a href={"/#/customer/"+customer.id}>{customer.name}</a></li>
    );
    return <div>status: {this.state.status}<br/><ul>{listItems}</ul>
        <form onSubmit={this.onNewCustomer} onChange={this.onNewCustomerFormChanged}>
          <label>Name:<input type="text" name="newCustomerName" value={this.state.newCustomerName} /></label>
          <label>City:<input type="text" name="newCustomerCity" value={this.state.newCustomerCity} /></label>
          <input type="submit" value="New Customer"/>
        </form>
        <form onSubmit={this.onDeleteCustomer} onChange={this.onDeleteCustomerFormChanged}>
          <label>Id:<input type="text" name="newDelete" value={this.state.newDelete}/></label>
          <input type="submit" value="Delete Customer"/>
        </form>
      </div>
  }
}
