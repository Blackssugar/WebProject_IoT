
	window.onload = function () {
		document.getElementById("password").onchange = validatePassword;
		document.getElementById("cpassword").onchange = validatePassword;
		document.getElementById("username").onchange = checkname;
		document.getElementById("email").onchange = checkemail;
	};
	function validatePassword(){
	var pass2=document.getElementById("cpassword").value;
	var pass1=document.getElementById("password").value;
	if(pass1!==pass2)
	{
		document.getElementById("cpassword").setCustomValidity("Passwords Don't Match");
	}	
	else
	{
		document.getElementById("cpassword").setCustomValidity('');	
	}
		 
	//empty string means no validation error
	}
	function checkname()
		{
			var name=document.getElementById( "username" ).value;

			if(name)
			{
				$.ajax({
					type: 'post',
					url: './php/checkdata.php',
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
					url: './php/checkdata.php',
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
	
		
// JavaScript Document