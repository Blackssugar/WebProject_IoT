var app = angular.module('myApp',[]);

window.onload = function () {
    document.getElementById("username").onchange = checkName;
    document.getElementById("email").onchange = checkEmail;
    document.getElementById("cpassword").onchange = confirmPsw;
    document.getElementById("password").onchange = checkPsw;
}

function checkPsw(){
    var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    var psw = $('#password').val();
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
    var psw = $('#password').val();
    var cpsw = $('#cpassword').val();
    if(psw != cpsw){
        $('#cpass_status').html("Inconsistent Password!");
    }
    else{
        $('#cpass_status').html("");
    }
}
function checkName()
{
    var name=document.getElementById( "username" ).value;

    if(name!="")
    {
        $.ajax({
            type: 'post',
            url: '../php/checkdata.php',
            data: {
                user_name:name,
            },
            success: function (response) {
                if(response==="OK")
                {
                    $( '#name_status' ).html("");
                }
                else
                {
                    $( '#name_status' ).html(response);
                }
            }
        });
        $( '#name_status' ).html("");
    }
    else
    {
        $( '#name_status' ).html("Username can not be empty!");
    }
}

function checkEmail()
{
    var email=document.getElementById( "email" ).value;
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(email==""){
        $( '#email_status' ).html("Email can not be empty!");
    }
    else if(!pattern.test(email)){
        $( '#email_status' ).html("Wrong Email Format! Please check!");
    }
    else {
        $.ajax({
            type: 'post',
            url: '../php/checkdata.php',
            data: {
                user_email:email,
            },
            success: function (response) {
                if(response==="OK")
                {
                    $( '#email_status' ).html("");
                }
                else
                {
                    $( '#email_status' ).html(response);
                }
            }
        });
        $( '#email_status' ).html("");
    }
}

function checkAll()
{
    var nameSpan=document.getElementById("name_status").innerHTML;
    var emailSpan=document.getElementById("email_status").innerHTML;
    var pswSpan=document.getElementById("pass_status").innerHTML;
    var cpswSpan=document.getElementById("cpass_status").innerHTML;

    if(nameSpan==""&&emailSpan==""&&pswSpan==""&&cpswSpan=="")
    {
        $.ajax({
            url:'../php/registerAccount.php',
            type:'post',
            data:{username:$('#username').val(),email:$("#email").val(),dob:$("#birth").val(),password:$("#password").val()},
            success:function(result){
                if(result=="OK"){
                    $.ajax({
                        url:'../php/loginCheck.php',
                        type: 'post',
                        data: {userType:'user',username:$('#username').val(), password:$("#password").val()},
                        success: function(result){
                            console.log(result);
                            if(result == "Match"){
                                alert("SignUp suceessfully! You will be signed in right now!");

                                var current = document.URL;

                                if(current.indexOf("register.html")>=0) {
                                    if (document.referrer) {
                                        if(document.referrer.indexOf("login.html")<0){
                                            window.location.href = document.referrer;
                                        }
                                        else{
                                            // window.location.href = "home.html";
                                            history.go(-2);
                                        }
                                    } else {
                                        window.location.href = "home.html";
                                    }
                                }
                                else{
                                    location.reload();
                                }
                            }
                        },
                        error: function(jqXHR, textStatus, err){
                            alert('text status '+textStatus+', err '+err);
                        }
                    })
                }
            },
            error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err);
            }
        })
    }
    else
    {
        alert("Please check your information!")
    }
}

