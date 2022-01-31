/**
 * Created by User on 8/15/2017.
 */
var timerClock;
var listHari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]
var listBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
var idwd = "";
var iddepo = "";
var timerdepowd;
var timerserver;
var csrftoken = getCookie('csrf_cookie_name');


//
// setInterval(function () {
//     getNotif();
// },15000);
//
// setInterval(function () {
//     getonline();
// },5000);

function getXMLHTTP() { //fuction to return the xml http object
    var xmlhttp = false;
    try {
        xmlhttp = new XMLHttpRequest();
    }
    catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e1) {
                xmlhttp = false;
            }
        }
    }

    return xmlhttp;
}



//*********************************************
//           Get Base URL
//*********************************************

function getBaseURL() {
    return link = $('body').attr('base-url');

};


//*******************************************************
//*********************Get CSRF TOKEN********************
//*******************************************************

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}





//==========================================================
//  Select All Checkbox
//==========================================================

$(function() {

    $('#parent_present').on('change', function() {
        $('.child_present').prop('checked', $(this).prop('checked'));
    });
    $('.child_present').on('change', function() {
        $('#parent_present').prop($('.child_present:checked').length ? true : false);
    });
    $('#parent_absent').on('change', function() {
        $('.child_absent').prop('checked', $(this).prop('checked'));
    });
    $('.child_absent').on('change', function() {
        $('#parent_absent').prop($('.child_absent:checked').length ? true : false);
    });
});


//==========================================================
//  Alert hide time set
//==========================================================

setTimeout(function() {
    $(".alert").fadeOut("slow", function() {
        $(".alert").remove();
    });

}, 9000);


$(document).ready(function(e) {

    var postUrl     = getBaseURL() + 'admin/employee/change_status';
    var csrftoken = getCookie('csrf_cookie_name');

    // getCredit();
    // getStatus();
    // getWinBet();

    // setInterval(function () {
    //     getCredit();

    // },5000);

    // setInterval(function () {
    //     getStatus();
    //     getStatusMaintenance();
    // },15000);

});


function getCredit(){

        $.ajax({
        url: base_url+'Dynamic/user_credit',
        type: "POST",
        data: {'csrf_test_name': csrftoken },
        cache: false,
        success: function(response) {
            $('#userCredit').html(response);
        }
    });

}

function refreshCredit(){

    $.ajax({
    url: base_url+'Dynamic/refresh_credit',
    type: "POST",
    data: {'csrf_test_name': csrftoken },
    cache: false,
    success: function(response) {
        $('#userCredit').html(response);
    }
});

}

function getStatus(){
    $.ajax({
        url: base_url+'Dynamic/getstatus',
        type: "POST",
        data: {'csrf_test_name': csrftoken },
        cache: false,
        dataType: "json",
        success: function(response) {

            for (i = 0; i < response.length; i++)
            {
                var nama = response[i].name.toLowerCase().replace(/\s+/g, '');


                if (response[i].status == 1)
                {
                    $('#p_'+nama).removeClass('badge bgred').addClass('badge bggreen');
                    $('#p_'+nama).html('ONLINE');
                    $('#s_'+nama).removeClass('badge bgred').addClass('badge bggreen');
                    $('#s_'+nama).html('ON');

                }
                else
                if (response[i].status == 0)
                {
                    $('#p_'+nama).removeClass('badge bggreen').addClass('badge bgred');
                    $('#p_'+nama).html('OFFLINE');
                    $('#s_'+nama).removeClass('badge bggreen').addClass('badge bgred');
                    $('#s_'+nama).html('OFF');

                }
                else
                if (response[i].status == 2)
                {
                    $('#p_'+nama).removeClass('badge bggreen').addClass('badge bgorange');
                    $('#p_'+nama).html('FORBIDDEN');
                    $('#s_'+nama).removeClass('badge bggreen').addClass('badge bgorange');
                    $('#s_'+nama).html('FORBID');

                }


            }

        }
    });

}

function getWinBet(){
    $.ajax({
        url: base_url+'Dynamic/gethistory',
        type: "POST",
        data: {'csrf_test_name': csrftoken },
        cache: false,
        dataType: "json",
        success: function(response)
        {

            if (response.length > 0)
            {
                $('#winBet').html('');

                 for (i = 0; i < response.length; i++)
                 {
                         $('#winBet').append("<div>"+response[i].time+" <strong>["+response[i].pasaranid+"-"+response[i].periode+"] "+response[i].deskripsi+"</strong></div>");
                 }

                 $('#winBet').fadeIn(500);
            }

        }
    });

}


function getStatusMaintenance()
{
    $.ajax({
        url: base_url+'/Dynamic/maintenance',
        type: "POST",
        data: {'csrf_test_name': csrftoken },
        cache: false,
        success: function(response) {
            if (response == '1')
            {
                swal(
                    'Info',
                    'Website is under Maintenance',
                    'info'
                );

                window.location.replace( base_url+'maintenance');
            }
        }
    });

}

