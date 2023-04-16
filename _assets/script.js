var documentRoot = document.getElementById("root");
var documentTitle = document.getElementsByTagName("title")[0];
var scroller = document.getElementById("x-scroller");
var yscroller = document.getElementById("y-scroller");
var scrollToolbar = document.getElementById("scroll-toolbar");
var mainTitle = documentTitle.innerHTML;
var mainFrame = document.getElementById("mainframe");
var mainFrameStyle = document.getElementById("mainframe").style;
var rotation = false;
var scalingMode = 1;
var scalingModes = ["centered", "fit", "fill", "stretch"];
var mainFrameScaling = 3;
var movementX = 0;
var movementY = 0;
var rotateX = 0;
var rotateY = 0;
var transformSyntax = "perspective(2500px) rotateX(0deg) rotateY(0deg)";
var inlineStyleSyntax = "";
var curentPane = "";

// Trackpad code

// Trackpad code

function resetScrollers () {
    scroller.value = 0;
    yscroller.value = 0;
}; 

function toggleRotationLabel () {
    var els = document.getElementsByClassName("rotation-state");
    for (i = 0; i < els.length; i = i + 1) {
        els[i].innerHTML = rotation? "Turn Off Rotation" : "Turn On Rotation"
    }
};
toggleRotationLabel();

function toggleRotation () {
    if (rotation) {
        rotation = false;
        mainFrame.setAttribute("style", "perspective(2500px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)");
    } else {
        rotation = true
    };
    toggleRotationLabel();
};

function toggleScalingMode () {
    scalingMode = scalingMode + 1;
    if (scalingMode > (scalingModes.length - 1)) scalingMode = 0;
    if (scalingMode == 0) {
    	documentTitle.innerHTML = "Scale Mode: Centered";
    } else if (scalingMode == 1) {
    	documentTitle.innerHTML = "Scale Mode: Fit";
    } else if (scalingMode == 2) {
    	documentTitle.innerHTML = "Scale Mode: Fill";
    } else if (scalingMode == 3) {
    	documentTitle.innerHTML = "Scale Mode: Stretch";
    };
    setTimeout(function () {
    	documentTitle.innerHTML = mainTitle;
    }, 2000);
}

var force = parseInt(documentRoot.getAttribute("force"));
documentRoot.onmousemove = function (x) {
    if (rotation) {
        var documentX = documentRoot.clientWidth;
        var documentY = documentRoot.clientHeight;

        movementX = (x.pageX - documentX / 2) / (documentX / 2) * -force;
        movementY = (x.pageY - documentY / 2) / (documentY / 2) * -force;

        rotateY = (x.pageX / documentX * force*2) - force;
        rotateX = (x.pageY / documentY * force*2) - force;
    } else {
        movementX = 0;
        movementY = 0;
        rotateX = 0;
        rotateY = 0;
    }
};

/*(function () {
    elements = document.getElementsByClassName("list-item");
    for (i = 0; i < elements.length; i = i + 1) {
        elements[i].onmousedown = function (x) {
            var documentX = documentRoot.clientWidth;
            var documentY = documentRoot.clientHeight;
    
            movementX = (x.pageX - documentX / 2) / (documentX / 2) * -30;
            movementY = (x.pageY - documentY / 2) / (documentY / 2) * -30;
    
            rotateY = (x.pageX / documentX * 30*2) - 30;
            rotateX = (x.pageY / documentY * 30*2) - 30;

            this.setAttribute("style", "transform: perspective(2500px) translate(" + -movementX + "px, " + movementY + "px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)");
        };
        elements[i].onmouseup = function (x) {
            this.setAttribute("style", "");
        }
    }
})();*/

documentRoot.onkeydown = function (x) {
    if (x.altKey && x.keyCode == 67) {
        console.log("Ctrl + Shift + C");
        closeCurrentPane();
    } else if (x.altKey && x.keyCode == 88) {
        console.log("Ctrl + Shift + X");
        toggleRotation();
    } /*else if ((x.ctrlKey && x.shiftKey) && (x.keyCode == 78)) {
        console.log("Ctrl + Shift + N");
        toggleScalingMode();
    }*/;
};

setInterval(function () {
    var scaleX = 1; var scaleY = 1;
    if (scalingMode == 0) { 
        scaleX = 1; scaleY = 1;
        scroller.disabled = false; yscroller.disabled = false;
        scrollToolbar.classList.remove("hidden")
    } else if (scalingMode == 1) {
        scaleMultiplier = documentRoot.clientWidth > (documentRoot.clientHeight * (mainFrame.clientWidth / mainFrame.clientHeight))? 
                          documentRoot.clientHeight / mainFrame.clientHeight : 
                          documentRoot.clientWidth / mainFrame.clientWidth;
        scaleX = scaleMultiplier;
        scaleY = scaleMultiplier;
        scroller.value = 0; yscroller.value = 0;
        scroller.disabled = true; yscroller.disabled = true;
        scrollToolbar.classList.add("hidden");
    } else if (scalingMode == 2) {
        scaleMultiplier = documentRoot.clientHeight < (documentRoot.clientWidth * (mainFrame.clientHeight / mainFrame.clientWidth))? 
                          documentRoot.clientWidth / mainFrame.clientWidth : 
                          documentRoot.clientHeight / mainFrame.clientHeight;
        scaleX = scaleMultiplier; scaleY = scaleMultiplier;
        scroller.disabled = false; yscroller.disabled = false;
        scrollToolbar.classList.remove("hidden")
    } else if (scalingMode == 3) {
        scaleX = documentRoot.clientWidth / mainFrame.clientWidth;
        scaleY = documentRoot.clientHeight / mainFrame.clientHeight;
        scroller.value = 0; yscroller.value = 0;
        scroller.disabled = true; yscroller.disabled = true;
        scrollToolbar.classList.add("hidden");
    }
    /*if (documentRoot.clientWidth < mainFrame.clientWidth * scaleX) {
            inlineStyle = "transform: perspective(2500px) rotateX(0deg) rotateY(0deg) translate(" + -(scroller.value) + "%, 0px) scale(" + scaleX + ", " + scaleY + ")";
    } else {
            inlineStyle = "transform: perspective(2500px) rotateX(0deg) rotateY(0deg) translate(0px, " + -(scroller.value) + "%) scale(" + scaleX + ", " + scaleY + ")";
    };*/
    inlineStyle = "transform: perspective(2500px) rotateX(0deg) rotateY(0deg) translate(" + -(scroller.value) + "%, " + -(yscroller.value) + "%) scale(" + scaleX + ", " + scaleY + ")";
    // console.log(inlineStyle)
    mainFrame.setAttribute("style", inlineStyle);
}, 50);

(function () {
    x = document.querySelectorAll(".dropdown .dropdown-title");
    for (i = 0; i < x.length; i = i + 1) {
        x[i].onclick = function () {
            this.parentNode.classList.toggle("collapse")
        }
    }
})();

function changePaneState (id, state) {
    if (state == true) {
        document.getElementById(id).classList.remove("collapse");
        document.getElementById(id).classList.add("expanded");
        currentPane = id;
    } else {
        document.getElementById(id).classList.remove("expanded");
        document.getElementById(id).classList.add("collapse");
        currentPane = "";
    }
};

function closeCurrentPane () {
    if (typeof currentPane == "string") {
        document.getElementById(currentPane).classList.remove("expanded");
        document.getElementById(currentPane).classList.add("collapse");
    }
}
