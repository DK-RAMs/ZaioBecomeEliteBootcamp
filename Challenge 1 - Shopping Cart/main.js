// Shopping Cart Javascript file
// Dikabelo Ramashala
// 20th November 2019

/**** Available colors array. Will be replaced with a server query which collects the available colors on the system.

For now, being hard coded.***/

var availableColors = ["Orange", "Yellow", "Slate Blue", "Steel Blue", "Dark Salmon", "Deep Sky Blue", "Lawn Green", "White", "Deep Pink", "Light Salmon", "Medium Sea Green", "Gray", "Brown", "Turquoise", "Light Gray", "Crimson", "Blue Violet", "Black"];

/*********** HTML code that is added to document on the fly ******************/

/* HTML that displays the number of items that the customer wants to buy */
var correctEntryAddToCartModalBodyHTML = 
    '<p id="num-items-spec">How many are you buying?</p>' + 
    '<div id="num-items-controller-div" class="text-center">' +
        '<p id="selected-color-modlar" class="d-inline">N/A</p>' +
        '<div id="editStuffystuffstyff" class="d-inline">' +
            '<button id="decrementItemInCart" type="button" class="btn">' +
                '-' +
            '</button>' +
            '<span><strong id="number-of-items-to-buy">1</strong></span>' +
            '<button id="incrementItemInCart" type="button" class="btn">' +
                '+' +
            '</button>' +
        '</div>' + 
    '</div>';

var correctEntryAddToCartModalFooterHTML = '<button type="button" id="cancelAdd2CartModalButton" data-dismiss="modal" class="btn hick-modal-btn-cancel d-inline">'+
                                'Cancel' +
                            '</button>' +
                            '<button type="button" id="acceptAdd2CartModalButton" class="btn hick-modal-btn-accept d-inline" data-dismiss="modal">' +
                                'Accept' +
                            '</button>';

var incorrectEntryAddToCartModalBodyHTML = 
    '<p>You didn\'t select anything to add to the cart! Try choosing something and then coming back here ^^</p>';
var incorrectEntryAddToCartModalBodyFooterHTML = '<button type="button" id="incorrectAdd2CartModalButton" data-dismiss="modal" class="btn hick-modal-btn-cancel d-inline">'+
                                'OK' +
                            '</button>'

/************** All HTML code that is injected via Javascript using inserts etc **************/

var colorWheel = document.getElementById("colorselector");

var colorCart = document.getElementById("selected-items");

var currentIndex = -1;

var numItemsToBuy = 1;

var maxCounter = 50;

var created = false;

var cartArr = [];

/************* Add to cart button functions ***********/

var checkSpecToCart = function(){
    document.getElementById("add2CartModalBody").innerHTML = "";
    document.getElementById("add2CartModalFooter").innerHTML = "";
    document.getElementById("add2CartModalBody").style.visibility = "visible";
    document.getElementById("add2CartModalFooter").style.visibility = "visible";
    if(currentIndex < 0){
        /***** Do all functions and code here*/
        document.getElementById("add2cartModalLongTitle").innerHTML= "Oops";
        
        let frag = createDiv(incorrectEntryAddToCartModalBodyHTML);
        document.getElementById("add2CartModalBody").appendChild(frag);
        
        frag = createDiv(incorrectEntryAddToCartModalBodyFooterHTML);
        document.getElementById("add2CartModalFooter").appendChild(frag);
    }
    else{
        document.getElementById("add2cartModalLongTitle").innerHTML= "Add to cart";
        
        let frag = createDiv(correctEntryAddToCartModalBodyHTML); /** will do this later **/
        document.getElementById("add2CartModalBody").appendChild(frag); /** will do later **/
        document.getElementById("selected-color-modlar").innerHTML = availableColors[currentIndex];
        
        frag = createDiv(correctEntryAddToCartModalFooterHTML);
        document.getElementById("add2CartModalFooter").appendChild(frag);
        
        createAddToCartOnClickEvents();
    }
}

/********* Modal Functions ************/ 

var addItemsToCart = function(){
    for(let i = 0; i < numItemsToBuy; i++){
        let col = availableColors[currentIndex];
        cartArr.push(col);
    }
    colorCart.innerHTML = "";
    for(let i = 0; i < cartArr.length; i++){
        let coldiv = '<div id="cartcolor ' + i + '" class="cartcolorblock d-inline"></div>';
        let frag = createDiv(coldiv);
        colorCart.appendChild(frag);
        document.getElementById("cartcolor " + i).style.backgroundColor = convertToColor(currentIndex);
    }
    document.getElementById("quantity-div").innerHTML = cartArr.length;
    document.getElementById("add2cartbutton").innerHTML = "Check out";
    document.getElementById("add2cartbutton").style.pointerEvents = "none";
}

var resetBuyCounter = function(){
    numItemsToBuy = 0;
    document.getElementById("number-of-items-to-buy").innerHTML = 0;
}

var incrementBuyCounter = function(){
    if(numItemsToBuy < maxCounter){
        numItemsToBuy++;
        document.getElementById("number-of-items-to-buy").innerHTML = numItemsToBuy;
    }
}

var decrementBuyCounter = function(){
    if(numItemsToBuy > 1){
        numItemsToBuy--;
        document.getElementById("number-of-items-to-buy").innerHTML = numItemsToBuy;
    }
}

var createAddToCartOnClickEvents = function(){
    // Add to cart Modal onClick events
    acceptAdd2CartModalButton.addEventListener("click", function(){
        addItemsToCart();
        resetBuyCounter();
    });
    cancelAdd2CartModalButton.addEventListener("click", function(){
        resetBuyCounter();
        document.getElementById("add2CartModalBody").style.visibility = "hidden";
    });
    incrementItemInCart.addEventListener("click", function(){
        incrementBuyCounter();
    });
    decrementItemInCart.addEventListener("click", function(){
        decrementBuyCounter();
    });
}


/*** fixes issue with ***/
var checkSelection = function(a){
    if(document.getElementById("color " + a).style.borderColor == "black"){
         return null;
    }
    else{
        return document.getElementById("color " + a).style.borderColor = "white";
    }
}

var resetonHover = function(a){
    if(document.getElementById("color " + a).style.borderColor == "black"){
        return null;
    }
    else{
        return document.getElementById("color " + a).style.borderColor = "lightgrey";
    }
}

var resetSelection = function(a){
    document.getElementById("color " + a).style.borderColor = "white";
    document.getElementById("color " + a).onmouseover = function(){
        resetonHover(a);
    }
    document.getElementById("color " + a).onmouseout = function(){
        checkSelection(a);
    }
}

var setcolor = function(a){
    if(a < 0){
        document.getElementById("selected-color").innerHTML = "-";
    }
    else{
        if(currentIndex >= 0){
            resetSelection(currentIndex);
        }
        document.getElementById("selected-color").innerHTML = availableColors[a];
        document.getElementById("color " + a).style.borderColor = "black";
        document.getElementById("color " + a).style.borderStyle = "solid";
        currentIndex = a;
    }
    
}

/*** Creates a div with nested a string in it (Used to make HTML code on the fly)****/
var createDiv = function(a){
    let fragment = document.createDocumentFragment();
    let temp = document.createElement("div");
    temp.innerHTML= "<div>" + a + "</div>";
    while(temp.firstChild){
        fragment.appendChild(temp.firstChild);
    }
    return fragment;
}

var convertToColor = function(a){
    let v = availableColors[a];
    let w = v.split(" ");
    let finalstring = "";
    for(let x = 0; x < w.length; x++){
        finalstring = finalstring + w[x];
    }
    return finalstring;
}


var createButtonOnClickEvents = function(){
    add2cartbutton.addEventListener("click", function(){
        checkSpecToCart();
    });
}

var initializeColorSelector = function(){
    if(availableColors.length == 0){
        let frag = createDiv('<p id="no-colors-available">None available</p>');
        document.getElementById("colorselector").appendChild(frag);
        document.getElementById("checkout-stuff").style.visibility = "hidden";
    }
    else{
        for(let i = 0; i < availableColors.length; i++){
            let colorid = '\"color ' + i + '\"';
            let frag = createDiv('<div id=' + '"color ' + i + '" class="colorblock d-inline" data-toggle="tooltip" data-placement="top" title="' + availableColors[i] + '"></div>');
            colorWheel.appendChild(frag);
            document.getElementById("color " + i).style.color = convertToColor(i);
            document.getElementById("color " + i).style.backgroundColor = convertToColor(i);
            document.getElementById("color " + i).addEventListener("click", function(){ setcolor(i)});
        }
    }
}

var readyHover = function(){
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
}

var readyDocument = function(){
    readyHover();
}

// Main function that is called once to initialize all the 
var main = function() {
    createButtonOnClickEvents();
    setcolor(currentIndex);
    initializeColorSelector();
    readyDocument();
}


main();