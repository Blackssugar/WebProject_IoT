// window.onload=function(){
//     document.getElementById("email").onchange = checkEmail;
// }
var em=$("#email").value;
$(document).ready(function(){
    $("#div2").hide();
    $("#email").onchange = checkEmail;
    $("#sb").onclick(function(){
        if($("#forget_status").innerHTML === "Email exist"){
            // var em=$("#email").value;
            $.ajax({
                type:"post",
                url:"./php/returnForgetPassword.php",
                data:{inputEmail:em},
                success:(function(result){
                    $("#div1").hide();
                    $("#div2").append("<p>Your password:"+ result +"</p>");
                }),
                error:function(){
                    console.log("Server error!");
                }
            });
        }
    });
});

function checkEmail(){
   // var em=$("#email").value;
	if(em){
		$.ajax({
			type:'post',
			url:'./php/checkEmail.php',
			data:{inputEmail:em},
			success:function(result){
				$("#forget_status").html(result);
				if(result === "We cannot find this email"){//三个等号
					return false;
				}
				else{
					return true;
				}
			
			}
		});
	}
	else
	{
		$('#email_status').html("");
		return false;
	}
	
}