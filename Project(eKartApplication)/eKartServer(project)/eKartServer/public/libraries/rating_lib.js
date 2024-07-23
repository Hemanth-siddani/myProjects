let renderRatingStar = (selector,rating) => {
    let halfStars = 0;
    if(rating % 1 != 0) {
        halfStars = 1;
    }
    let fullStars = parseInt(rating);
    let disabledStars = 5 - (halfStars + fullStars);

    let ratingBlock = document.createElement('div');
    ratingBlock.setAttribute('class','ratingBlock');

    for(let i=1 ; i<=fullStars ; i++) {
        let divTag = document.createElement('div');
        divTag.setAttribute('class','fullStar');
        ratingBlock.appendChild(divTag);
    }
    if(halfStars) {
        let divTag = document.createElement('div');
        divTag.setAttribute('class','halfStar');
        ratingBlock.appendChild(divTag);
    }
    for(let i=1 ; i<=disabledStars ; i++) {
        let divTag = document.createElement('div');
        divTag.setAttribute('class','disableStar');
        ratingBlock.appendChild(divTag);
    }
    document.querySelector(selector).appendChild(ratingBlock);
}

