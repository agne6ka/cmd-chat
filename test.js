var data,
    url = 'https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json';
var xhr = typeof XMLHttpRequest != 'undefined'
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('GET', url, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            if (data.hasOwnProperty('error')) {
                // TODO: Add nice error
                console.log('Error.');
            } else {
                console.log(data.questions);
                for (var i=0; i < data.questions.length; i++){
                    console.log(data.questions[i]);
                }
            }
        } else {
            throw 'Products AJAX request error: ' + xhr.status;
        }
    }
};
xhr.send();
