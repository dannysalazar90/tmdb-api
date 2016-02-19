function ajaxRequest() { }

ajaxRequest.post = function (url, data, succesFunction) {
    if (url == undefined || data == undefined) {
        showMessage('Ajax request failed with url:' + url + ' and data:' + data, 'danger');
        return false;
    }

    NProgress.start();

    $.post( url, data)
        .done(function( data ) {
            succesFunction(data);
            NProgress.done();
        })
        .fail(function( message ) {
            showMessage('Ajax error: ' + message);
            NProgress.done();
        });
}