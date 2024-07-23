
let loadSelectedTemplate = (moduleName) => {

    let urlPort = 'http://localhost:8085/';

    if (window.location.href.includes('index.html')) {
        window.location.href = urlPort;  
    }
    let templateUrl = '';
    switch(moduleName) {
        case 'Login':
            templateUrl = 'templates/login.htm';
            window.location.href = urlPort + `#${moduleName}`;
            break;
        case 'forgotPassword':
            templateUrl = 'templates/forgotPassword.htm';
            window.location.href = urlPort + `#${moduleName}`;
            break;
        case 'Signup':
            templateUrl = 'templates/signup.htm';
            window.location.href = urlPort + `#${moduleName}`;
            break;  
        case 'productDetails':
            templateUrl = 'templates/productDetails.htm';
            window.location.href = urlPort + `#${moduleName}`;
            break;
        case 'insertProducts':
            templateUrl = 'templates/insertProducts.htm';
            window.location.href = urlPort + `#${moduleName}`;

            break;    
        case 'singleProductInfo':
            // + '?product_Id=' + product_Id;
            templateUrl = 'templates/singleProductInfo.htm';
            window.location.href = urlPort + `#${moduleName}`;

            break;             
    }
    axios.get(templateUrl).then((response) => {
        document.querySelector('.Parent').innerHTML = response.data;
        if(moduleName === 'productDetails') {
            loadProductData();
        }
        else if(moduleName === 'singleProductInfo') {
            renderProductImageDetails();
        }
    });
};


// loadSelectedTemplate('productDetails');

// if(window.location.href.includes('http://localhost:8085/#Signup')) {
//     loadSelectedTemplate('Signup');
// }
// if(window.location.href.includes('http://localhost:8085/#productDetails')) {
//      loadSelectedTemplate('productDetails');
// }



