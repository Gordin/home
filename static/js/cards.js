function bind_card(id, url, data) {
    $('#' + id).data('').click(function(){
        $.getJSON($SCRIPT_ROOT + url, data,
            function(data) {
                console.log(data.result);
            });
        return false;
    });
}

function bind_toggle(id, url1, data1, url2, data2){
    $elem = $('#' + id);
    $elem.click(function(){
        var state = $elem.data('state');
        if (state == "on") {
            $.getJSON($SCRIPT_ROOT + url1, data1,
                function(data) {
                    $elem.data('state', data.state);
                });
        } else {
            $.getJSON($SCRIPT_ROOT + url2, data2,
                function(data) {
                    $elem.data('state', data.state);
                });
        }
        return false;
    });
}

bind_toggle('js-c-power', "/turn/c/off", {'json': true}, "/turn/c/on",  {'json': true});
