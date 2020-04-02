var app=angular.module("myApp",[]);

function sendEmail() {
    var email = $("#input-email").val();
    if(email.length == 0){
        alert("Please enter your email firstly!")
    }
    else{
        // $.post("../php/front_psw_logic.php",
        //     {
        //         email:email,
        //         type:"reset-password"
        //     },
        //     function(data,status){
        //         alert("数据: \n" + data + "\n状态: " + status);
        // });
        $.ajax({
            url:"../php/front_psw_logic.php",
            type: "post",
            dataType: "text",
            data: {email:email,type:"reset-password"},
            success:function(result){
                if(result=="OK"){
                    alert("Your reset password email has been sent successfully!")
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
