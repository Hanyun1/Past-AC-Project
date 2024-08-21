/* 
    ref: https://stackoverflow.com/questions/25148479/how-can-i-limit-words-not-characters-in-textarea-html
    function: check the length of word in comment box
    */
var wordLen = 100; // Maximum word length
function checkCommentBox(obj) {
    var len = obj.value.split(/[\s]+/);
    if (len.length > wordLen) {
        obj.oldValue = obj.value != obj.oldValue ? obj.value : obj.oldValue;
        obj.value = obj.oldValue ? obj.oldValue : "";
        obj.style = "border:solid 3px red";
        return false;
    }
    obj.style = null;
    return true;
}

function confirm(obj, isCountType) {
    var numBox = document.getElementById("number-box");
    var commentBox = document.getElementById("comment-box");
    var form = document.getElementById("form");

    //return false
    if (checkCommentBox(commentBox) && validNumBox(numBox, isCountType)) {
        form.submit();
        //alert("Data confirmed.");
        obj.style = "display:none";
        //window.location.href("../entry_today");
    }
    if (!validNumBox(numBox, isCountType)) {
        alert("Data (value) input is not valid.");
    }
    if (!checkCommentBox(commentBox)) {
        alert(
            "You cannot put more than " + wordLen + " words in this text area."
        );
    }
    return false;
}

function validNumBox(numBox, isCountType) {
    if (numBox.value.trim() != "") {
        if (numBox.value >= 0 && numBox.value <= 99999) {
            if (
                (isCountType && numBox.value.trim().indexOf(".") == -1) ||
                !isCountType
            ) {
                numBox.style = null;
                return true;
            }
        }
    }
    numBox.style = "border:solid 3px red";
    return false;
}
