var renderRatingStars = (selector, rating) => { // 4.2
    if (rating > 5) {
        return;
    }
    var halfStars = 0;
    if (rating % 1 != 0) {
        halfStars = 1;
    }
    var fullStars = parseInt(rating);
    var disabledStars = 5 - (halfStars + fullStars);

    var divTagMain = document.createElement("div");
    divTagMain.setAttribute("class", "ratingBlock");

    for (var i = 1; i <= fullStars; i++) {
        var divTag = document.createElement("div");
        // divTag.setAttribute("class", 'fullStar');
        divTagMain.append(divTag)
    }
    if (halfStars) { // if halfStar != 0 || if halfstar == 1
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'halfStar');
        divTagMain.append(divTag)
    }
    for (var i = 1; i <= disabledStars; i++) {
        var divTag = document.createElement("div");
        divTag.setAttribute("class", 'disabledStar');
        divTagMain.append(divTag)
    }
    document.querySelector(selector).append(divTagMain);
}
