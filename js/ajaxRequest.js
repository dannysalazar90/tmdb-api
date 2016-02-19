/**
 * Year: 2016
 * Author: Danny Salazar
 *
 * This file is used to perform POST calls to the backend, can add other verboses.
 */

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