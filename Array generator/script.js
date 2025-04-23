document.addEventListener('DOMContentLoaded', function() {
    inputArea = document.getElementById("InputText");
    outputArea = document.getElementById("OutputText");
    arrayName = document.getElementById("ArrayName");

    AGcheckbox = document.getElementById("AutoGenerate");

    langLUA = document.getElementById("LUA");
    langJS = document.getElementById("JS");

    //Add listener for autogeneration
    inputArea.addEventListener('input', autoGenerate);
    arrayName.addEventListener('input', autoGenerate);

    langRadioBtns = document.querySelectorAll('input[name="ArrayLanguage"]');
    langRadioBtns.forEach(radio => {
        radio.addEventListener('change', autoGenerate);
    });

 }, false);

function autoGenerate(){
    if (AGcheckbox.checked) {
        refreshOutput();
    }
}

function refreshOutput(){
    //Check if array name is set
    if(arrayName.value == "") {
        arrayName.value = "Missing array name";
    }
    //Check which language is selected//
    if (langLUA.checked) {
        langSelected = "LUA";
    }

    if (langJS.checked) {
        langSelected = "JS";
    }

    ////////////////////////////////////

    var inputText = inputArea.value.split('\n');

    var filteredText = inputText.filter(line => line.trim() !== '');

    var row = "";
    var modifiedText = [];

    groupCount = document.getElementById("columnCount").value;



    //Loop through array and convert it to lines
    for (i = 0; i < filteredText.length; i++) {
        if (i != filteredText.length - 1) {
            row += filteredText[i] + ", ";
        } else {
            row += filteredText[i] + langBracket(1);
        }

        if ((i + 1) % groupCount == 0) {
            modifiedText.push(row);
            row = "";
        }
    }
    if (i = filteredText.length) {
                    modifiedText.push(row);
            row = "";
    }
    //Move text area and add first line with array name and first bracket
    modifiedText.unshift(arrayName.value + ' = ' + langBracket(0));
    if (groupCount == 0) {
        outputArea.value = modifiedText.join('');
    } else {
        outputArea.value = modifiedText.join('\n');
    }
    
    
}

function langBracket(i) {

    switch (langSelected) {
        case "LUA":
            return i ? "}" : "{";

        case "JS":
            return i ? "]" : "[";

    }

}

