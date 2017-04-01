
export default class CustomerService {
  static instance=null;

  // Return singleton
  static get() {
    if(!CustomerService.instance)
      CustomerService.instance=new CustomerService();
    return CustomerService.instance;
  }

  getCustomers() {
    return fetch("/customers").then((response)=>{
      if(!response.ok) {
        throw response.statusText;
      }
      return response.json();
    });
  }
  getCustomer(customerId) {
    return fetch("/customers/"+customerId).then((response)=>{
      if(!response.ok) {
        throw response.statusText;
      }
      return response.json();
    });
  }

  addCustomer(name, city) {
    var body=JSON.stringify({name: name, city: city});
    return fetch("/customers", {method: "POST", headers: new Headers({'Content-Type': 'application/json'}), body: body}).then((response)=>{
      if(!response.ok) {
        throw response.statusText;
      }
      return response.json();
    });
  }

  deleteCustomer(id){
    //implement delete method
    console.log(id);
    var body = JSON.stringify({id:id});
    return fetch("/customers", {method: "DELETE", headers: new Headers({'Content-Type':'application/json'}), body:body}).then((response)=>{
      if(!response.ok){
        throw response.statusText;
      }
      return response.json();
    });
  }
  editCustomer(id,nn,nc){
    //implement edit customer method
    var body = JSON.stringify({id:id, name:nn, city:nc});
    return fetch("/customer", {method:"PUT",headers:new Headers({'Content-Type': 'application/json'}), body:body}).then(response =>{
      if(!response.ok){
        throw response.statusText;
      }
      return response.json();
    });
  }
}
