let submitProducts = () => {
    let productDataInfo = {
        // .inStock,.maxDeliveryDays,.itemsInStock
        product_Id: document.querySelector('.productId').value,
        product_Name: document.querySelector('.productName').value,
        actual_Price: parseInt(document.querySelector('.productPrice').value),
        discount_Percentage: document.querySelector('.productDiscountPercentage').value,
        manufacture: document.querySelector('.productManufacture').value,
        product_Image: document.querySelector('.productImageUrl').value,
        Title : document.querySelector('.productTitleInfo').value,
        small_Product_Images: [],
        rating: document.querySelector('.productRating').value,
        product_inStocks : document.querySelector('.inStock').value,
        product_itemsInStock : document.querySelector('.itemsInStock').value,
        product_maxDeliveryDays : document.querySelector('.maxDeliveryDays').value,
        product_Description : document.querySelector('.productDescripition').value
    }
    for (let index = 0; index < 3; index++) {
        console.log('`.productImageUrl_0+${index + 1}`:',`.productImageUrl_0${index + 1}`);
        let imageUrl = document.querySelector(`.productImageUrl_0${index + 1}`).value;
        productDataInfo.small_Product_Images.push(imageUrl); 
    }
    console.log(productDataInfo);
    let clearInfo = () => {
        document.querySelector('.Product_Form').reset();
        console.log('clearInfo function called.');
    }
    let AlertError = (errorInfo) => {
        console.log('AlertError:errorInfo',errorInfo);
        document.querySelector('.productErrorMessage').style.display = 'block';
        document.querySelector('.productErrorMessage').innerHTML = errorInfo;
        document.querySelector('.productSuccessMessage').style.display = 'none';
        setTimeout(() => {
            document.querySelector('.productErrorMessage').style.display = 'none';
        }, 3000);
    }
    let AlertSuccess = (successInfo) => {
        console.log('AlertSuccess:successInfo',successInfo);
        document.querySelector('.productSuccessMessage').style.display = 'block';
        document.querySelector('.productSuccessMessage').innerHTML = successInfo;
        setTimeout(() => {
            document.querySelector('.productSuccessMessage').style.display = 'none';
        }, 3000);
    }
    if (!productDataInfo.product_Id || !productDataInfo.product_Name || !productDataInfo.actual_Price || !productDataInfo.discount_Percentage || !productDataInfo.manufacture || !productDataInfo.product_Image || !productDataInfo.rating || !productDataInfo.small_Product_Images) {
        console.log('<======= error =======>');
        AlertError('Must fill all the fields.');
        clearInfo();
    } else {
        console.log('<======= success =======>');
        if(document.querySelector('.inStock').value == 'yes' || document.querySelector('.inStock').value == 'no') {
            let serverUrl = '/createProducts';
            axios.get(serverUrl, { params: productDataInfo }).then((response) => {
                console.log('Client response:', response,response.data.msg);
                if(response.data.msg === 'Success') {
                    AlertSuccess('Inserted successfully.');
                    clearInfo();
                }  
            })
        }
    }
}


function handleInsertButtonClick() {
    submitProducts();
}


if (window.location.href.includes('#insertProducts')) {
    loadSelectedTemplate('insertProducts');
}
