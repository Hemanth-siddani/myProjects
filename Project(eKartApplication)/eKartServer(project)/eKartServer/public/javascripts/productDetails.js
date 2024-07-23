let pTemplate;
document.addEventListener('DOMContentLoaded',() => {
  pTemplate = Handlebars.compile(document.querySelector('.productTemplate').innerHTML);
});
let renderProductDetails = (productData) => {
  productData.discount_Price = productData.actual_Price - (productData.actual_Price * productData.discount_Percentage) / 100;
  //productData.element_Id = 'ratingStars_' + index;
  $('.productDetails').append(pTemplate(productData));
  //renderRatingStars(productData.element_Id, productData.rating);
};
let loadProductData = (filterKeyObject) => {
  console.log('filterKeyObject==>definition',filterKeyObject);
  $('.productDetails').html('');
  // API Link
    let server_url = '/getProductDetails';
    axios.get(server_url,{params:filterKeyObject}).then((response) => {
      console.log('response.data.info:',response.data.info);
      console.log('response.data.info[0].product_inStocks:',response.data.info[0].product_inStocks);
      if(response.data.info.error || response.data.info.length == 0) {
        document.querySelector('.ErrorBlock').style.visibility = 'visible';
        document.querySelector('.ErrorBlock').innerHTML = 'No data found.';
        setTimeout(() => {
           document.querySelector('.ErrorBlock').style.visibility = 'hidden';
        },5000);
      }
      else {
        for (let index = 0; index < response.data.info.length; index++) {
          console.log('productData from data base: ',response.data.info[index]); 
          renderProductDetails(response.data.info[index]);
        }
      }
    });
};



let filterData = () => {
  let filterValue = parseInt(document.querySelector('.priceValue').value);
  document.querySelector('.priceDisplay').innerHTML = filterValue + '/-';
  console.log(typeof filterValue);
  let filterKeyObject ={};
  filterKeyObject.filterDetails = filterValue;
  console.log('filterData==>call',filterKeyObject);
  loadProductData(filterKeyObject);

  document.querySelector('.priceValue').value = '';
}

let productSearch = (event) => {
  event.preventDefault();
  let filterKeyObject ={};
  // document.querySelector('.search_items').value.charAt(0).toUpperCase() + document.querySelector('.search_items').value.slice(1)
  filterKeyObject.filterDetails = document.querySelector('.search_items').value;
  console.log('filterData==>call',filterKeyObject);
  loadProductData(filterKeyObject);
  document.querySelector('.search_items').value = '';
}

if(window.location.href.includes('#productDetails')) {
     loadSelectedTemplate('productDetails');
}

