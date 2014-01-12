/**
 * Created by Mads Røskar on 12.01.14.
 */

var socket = io.connect('http://localhost:8080');

socket.on('connect', function(){
    socket.emit('adduser', prompt("What's your name?"));
});

socket.on('updateChat', function (username, data) {
    $('#chat').append('<b>'+username + ':</b> ' + data + '<br>');
});


socket.on('updateDocument', function (username, data) {
    $('#markdown').val(data);
    rmde.parseAndUpdate();
});

function switchRoom(room){
    socket.emit('switchRoom', room);
}

$(function(){

    $('#markdown').bind('input propertychange', function() {
        var message = $('#markdown').val();
        $('#markdown').val('');
        socket.emit('sendUpdate', message);

    });

    $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });
});
