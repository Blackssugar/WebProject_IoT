<?php include('password_logic.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Password Reset PHP</title>
	<link rel="stylesheet" href="main.css">
	<script> 	
	function initInput()
	{
		var token = location.search.split('token=')[1];
		document.forms[0].token.value = token;
		document.forms[0].action = "reset_password.php?token=" + token;
	}
	</script>
</head>
<body onLoad="initInput()">
	<form class="login-form" method="post">
		<h2 class="form-title">New password</h2>
		<!-- form validation messages -->
		<?php include('messages.php'); ?>
		<div class="form-group">
			<label>New password</label>
			<input type="password" name="new_pass">
		</div>
		<div class="form-group">
			<label>Confirm new password</label>
			<input type="password" name="new_pass_c">
		</div>
		<div class="form-group">
			<button type="submit" name="new_password" class="login-btn">Submit</button>
		</div>
		<input type="hidden" name="token" value="" />
	</form>
</body>
</html>
