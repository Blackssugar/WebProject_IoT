// if(document.URL.indexOf("login")>=0||document.URL.indexOf("register"))
 var app = angular.module('myApp',[]);

function Login(type){
    //signin infomartion can be email or username
    if($('#signin').val()!="" && $('#psw').val()!=""){
        $.ajax({
            url:'../php/loginCheck.php',
            type: 'post',
            data: {userType:type,username:$('#signin').val(), password:$('#psw').val()},
            success: function(result){
                console.log(result);
                if(result == "Match"){
                    alert("Login suceessfully!");
                    if(type=="user"){
                        let current = document.URL;
                        console.log(current);
                        if(current.indexOf("login.html")>=0 ) {
                            if (document.referrer) {
                                if(document.referrer.indexOf("register.html")<0 && document.referrer.indexOf("forgetPassword.html")<0&& document.referrer.indexOf("setNewPsw.html")<0){
                                    window.location.href = document.referrer;
                                }
                            } else {
                                window.location.href = "home.html";
                            }
                        }
                        else{
                            location.reload();
                        }
                    }
                    else{
                        window.location.href="admin_user.html";
                    }
                }
                else{
                    alert("Your account & password not match! Please check!")
                }
            },
            error: function(jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+err);
            }
        })
    }
    else{
        alert("Please give the necessary input!");
    }
}