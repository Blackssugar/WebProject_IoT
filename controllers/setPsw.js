var app=angular.module("myApp",[]);

window.onload = function () {
    document.getElementById("new_pass").onchange = checkPsw;
    document.getElementById("new_pass_c").onchange = confirmPsw;
}

function checkPsw(){
    var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    var psw = $('#new_pass').val();
    if(psw == ""){
        $('#pass_status').html("Password cannot be empty!");
    }
    else if(psw.length<8){
        $('#pass_status').html("Password length cannot be less than 8!");
    }
    else if(!pattern.test(psw)){
        $('#pass_status').html("Password must contain at least one Letter, one Number and one Special character!");
    }
    else{
        $('#pass_status').html("");
    }
}

function confirmPsw(){
    var psw = $('#new_pass').val();
    var cpsw = $('#new_pass_c').val();
    if(psw != cpsw){
        $('#cpass_status').html("Inconsistent Password!");
    }
    else{
        $('#cpass_status').html("");
    }
}


function sendPSW() {

    var pswSpan=document.getElementById("pass_status").innerHTML;
    var cpswSpan=document.getElementById("cpass_status").innerHTML;
    var psw = $('#new_pass').val();
    var cpsw = $('#new_pass_c').val();
    var token = location.search.split('token=')[1];

    if(pswSpan!="" || cpswSpan!=""){
        alert("Please check your password!")
    }
    else{
        $.ajax({
            url:"../php/front_psw_logic.php",
            type: "post",
            data: {new_pass:psw,new_pass_c:cpsw,token:token,type:"new_password"},
            success:function(result){
                if(result=="OK"){
                    alert("Your password updated successfully!");
                    window.location.href = "login.html";
                }
                else{
                    alert(result);
                }
            },
            error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err);
            }
        })
    }
}