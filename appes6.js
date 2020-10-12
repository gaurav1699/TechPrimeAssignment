class Product {
    constructor(title, category, price,quantity) {
        this.title = title;
        this.category = category;
        this.price = price;
        this.quantity=quantity;
    }
  }
  
  class UI {
    addproducttoList(product) {
      const list = document.getElementById('product-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${product.title}</td>
        <td>${product.category}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td><a href="#" class="delete">X<a></td>
      `;
    
      list.appendChild(row);
    }
  
    showAlert(message, className) {
      // Create div
      const div = document.createElement('div');
      // Add classes
      div.className = `alert ${className}`;
      // Add text
      div.appendChild(document.createTextNode(message));
      // Get parent
      const container = document.querySelector('.container');
      // Get form
      const form = document.querySelector('#product-form');
      // Insert alert
      container.insertBefore(div, form);
  
      // Timeout after 3 sec
      setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteproduct(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('category').value = '';
      document.getElementById('price').value = '';
      document.getElementById('quantity').value = '';
    }
  }
  
  // Local Storage Class
  class Store {
    static getproducts() {
      let products;
      if(localStorage.getItem('products') === null) {
        products = [];
      } else {
        products = JSON.parse(localStorage.getItem('products'));
      }
  
      return products;
    }
  
    static displayproducts() {
      const products = Store.getproducts();
  
      products.forEach(function(product){
        const ui  = new UI;
  
        // Add product to UI
        ui.addproducttoList(product);
      });
    }
  
    static addproduct(product) {
      const products = Store.getproducts();
  
      products.push(product);
  
      localStorage.setItem('products', JSON.stringify(products));
    }
  
    static removeproduct(isbn) {
      const products = Store.getproducts();
  
      products.forEach(function(product, index){
       if(product.isbn === isbn) {
        products.splice(index, 1);
       }
      });
  
      localStorage.setItem('products', JSON.stringify(products));
    }
  }
  
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayproducts);
  
  // Event Listener for add product
  document.getElementById('product-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
    category = document.getElementById('category').value,
    price = document.getElementById('price').value,
    quantity = document.getElementById('quantity').value
  
    // Instantiate product
    const product = new Product(title, category, price,quantity);
  
    // Instantiate UI
    const ui = new UI();
  
    console.log(ui);
  
    // Validate
    if(title === '' || category === '' || price === '' ||quantity== '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add product to list
      ui.addproducttoList(product);
  
      // Add to LS
      Store.addproduct(product);
  
      // Show success
      ui.showAlert('Product Added!', 'success');
    
      // Clear fields
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  // Event Listener for delete
  document.getElementById('product-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete product
    ui.deleteproduct(e.target);
  
    // Remove from LS
    Store.removeproduct(e.target.parentElement.previousElementSibling.textContent);
  
    // Show message
    ui.showAlert('Product Removed!', 'success');
  
    e.preventDefault();
  });