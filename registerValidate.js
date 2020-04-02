
window.onload = function () {
	document.getElementById("username").onchange = checkname;
	document.getElementById("email").onchange = checkemail;
}

function checkname()
{
	var name=document.getElementById( "username" ).value;

	if(name)
	{
		$.ajax({
			type: 'post',
			url: 'checkdata.php',
			data: {
				user_name:name,
			},
			success: function (response) {
				$( '#name_status' ).html(response);
				if(response==="OK")
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		});
	}
	else
	{
		$( '#name_status' ).html("");
		return false;
	}
}

function checkemail()
{
	var email=document.getElementById( "email" ).value;

	if(email)
	{
		$.ajax({
			type: 'post',
			url: 'checkdata.php',
			data: {
				user_email:email,
			},
			success: function (response) {
				$( '#email_status' ).html(response);
				if(response==="OK")
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		});
	}
	else
	{
		$( '#email_status' ).html("");
		return false;
	}
}

function checkall()
{
	var namehtml=document.getElementById("name_status").innerHTML;
	var emailhtml=document.getElementById("email_status").innerHTML;

	if((namehtml && emailhtml)==="OK")
	{
	return true;
	}
	else
	{
	return false;
	}
}

function Login(){

	//signin infomartion can be email or username
	if($('#signin').val()!="" && $('#signin-password').val()!=""){
		$.ajax({
			url:'???',
			type: 'post',
			aysn: true,
			data: {email:$('#signin').val(), password:$('#signin-password').val()},
			success: function(result){
				if(result == "sucess"){
					alert("Login suceessfully!");
					// window.location.href();
				}
				if(result == "account"){
					alert("Your account does not exist!")
				}
				if(result == "password"){
					alert("Your password is incorrect!");
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

		
// JavaScript Document