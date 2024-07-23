
let selectedProductId = '';
let showProductDetails = (product_Id) => {
   selectedProductId = product_Id;
   console.log(product_Id);
   loadSelectedTemplate('singleProductInfo',product_Id);
};

let renderProductImageDetails = () => {
   let serverUrl = '/getProductDetails';
   let filterKeyObject = {
      product_Id : selectedProductId
   }
   console.log('filterKeyObject:',filterKeyObject);
   axios.get(serverUrl,{params:filterKeyObject}).then((response) => {
      console.log('response from singleProductInfo:',response.data.info[0].small_Product_Images.length);
      for(let i = 0; i < response.data.info[0].small_Product_Images.length; i++) {
         let divTag = document.createElement('div');
         divTag.setAttribute('imageIndex', i);
         divTag.style.backgroundImage = `url('${response.data.info[0].small_Product_Images[i]}')`;
         document.querySelector('.productImageThumbnails').append(divTag);

         divTag.addEventListener('mouseover',() => {
            renderProductImageDetails_subPart(response.data.info[0].small_Product_Images[i]);
         });

      }
      let singleProductInformation = {
         single_product_title : response.data.info[0].Title,
         single_product_actualPrice : response.data.info[0].actual_Price,
         single_product_rating : response.data.info[0].rating,
         single_product_discount_Percentage : response.data.info[0].discount_Percentage,
         single_product_inStocks : response.data.info[0].product_inStocks,
         single_product_itemsInStock : response.data.info[0].product_itemsInStock,
         single_product_maxDeliveryDays : response.data.info[0].product_maxDeliveryDays,
         single_product_product_Description : response.data.info[0].product_Description
      };
      console.log(singleProductInformation);
      renderSingleProductData(singleProductInformation);
      renderProductImageDetails_subPart(response.data.info[0].small_Product_Images[0]);
   }).catch((error) => {
      console.log('Error occured',error);
   })


   let renderSingleProductData = (singleProductInformation) => {
      singleProductInformation.discounted_Price = singleProductInformation.single_product_actualPrice - (singleProductInformation.single_product_actualPrice * (singleProductInformation.single_product_discount_Percentage)/100);
      console.log(singleProductInformation);

      document.querySelector('.singleProductTitle').innerHTML = singleProductInformation.single_product_title;
      document.querySelector('.singleProductPrice').innerHTML = 'Price : ' + singleProductInformation.single_product_actualPrice + ' /-';
      document.querySelector('.singleProductDiscountedPrice').innerHTML = 'Discounted price : ' + singleProductInformation.discounted_Price + ' /-';
      document.querySelector('.singleProductRating').innerHTML = 'Rating : '+ singleProductInformation.single_product_rating;
      // Ruppes to Dollar conversion
      let rupeesToDollar = singleProductInformation.single_product_actualPrice * 1/75;

      document.querySelector('.priceInDollar').innerHTML = rupeesToDollar.toFixed(2); 
      document.querySelector('.singleProductDescription').innerHTML = singleProductInformation.single_product_product_Description;
      document.querySelector('.itemsInStockString'). innerHTML = singleProductInformation.single_product_itemsInStock;
      document.querySelector('.maxDeliveryDaysString').innerHTML = singleProductInformation.single_product_maxDeliveryDays;
      document.querySelector('.inStockString').innerHTML = singleProductInformation.single_product_inStocks;
   }
}
let renderProductImageDetails_subPart = (imageUrl) => {
   console.log('imageUrl',imageUrl);
   document.querySelector('.biggerProductImageThumbnails').style.backgroundImage = `url('${imageUrl}')`;
};

if(window.location.href.includes('#singleProductInfo')) {
   loadSelectedTemplate('singleProductInfo');
}




