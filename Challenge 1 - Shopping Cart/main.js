var availableColors = [ "Orange", "Yellow", "Slate Blue", "Steel Blue", "Dark Salmon", "Deep Sky Blue", "Lawn Green", "White", "Deep Pink", "Light Salmon", "Medium Sea Green", "Gray", "Brown", "Turquoise", "Light Gray", "Crimson", "Blue Violet", "Black" ];

var colorWheel = document.getElementById("colorselector");

var currentIndex = -1;

var resetSelection = function(a){
    document.getElementById("color " + a).style.borderColor = "White";
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


var create = function(str){
    let fragment = document.createDocumentFragment();
    let temp = document.createElement("div");
    temp.innerHTML= str;
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


setcolor(currentIndex);


if(availableColors.length < 1){
    let frag = create('<span>None available</span>');
    document.getElementById("colorselector").appendChild(frag);
}
else{
    for(let i = 0; i < availableColors.length; i++){
        let colorid = '\"color ' + i + '\"';
        let frag = create('<div id=' + '"color ' + i + '" class="colorblock d-inline" data-toggle="tooltip" data-placement="top" title="' + availableColors[i] + '"></div>');
        colorWheel.appendChild(frag);
        document.getElementById("color " + i).style.color = convertToColor(i);
        document.getElementById("color " + i).style.backgroundColor = convertToColor(i);
        document.getElementById("color " + i).addEventListener("click", function(){ setcolor(i)});
    }
}
