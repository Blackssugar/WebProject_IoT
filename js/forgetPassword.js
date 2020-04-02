

/*window.onload = function () {
		document.getElementById("sb").onclick = returnForm;
	};*/

function checkemail()
{
	var email=document.getElementById( "email" ).value;
	

	if(email)
	{
		$.ajax({
			type: 'post',
			url: './php/checkemail.php',
			data: {
				user_email:email,
			},
			success: function (response) {
				$( '#email_status' ).html(response);
				if(response==="OK")	
				{	
					lol = true;
					return false;	
				}
				else
				{
					return false;	
				}
			}
		});
		
	}
	
}

function returnForm(){
	
	var email=document.getElementById( "email" ).value;
	

	if(email)
	{
		$.ajax({
			type: 'post',
			url: './php/checkemail.php',
			data: {
				user_email:email,
			},
			success: function (response) {
				$( '#email_status' ).html(response);
				if(response==="OK")	
				{	
					lol = true;
					return true;	
				}
				else
				{
					return false;	
				}
			}
		});
		
	}
	//var emailhtml=document.getElementById("email_status").innerHTML;
	if(lol)
	{
	document.forms["forget_password_form"].submit();
	}
	else
	{
	return false;
	}
	
}// JavaScript Document