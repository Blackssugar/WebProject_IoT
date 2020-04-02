<?php
require 'login.php';
try {

	$name=$_POST['user_name'];
	//$name = "comp570f3";
	$checkdata=" SELECT * FROM projectplatfromv1.members WHERE username='$name' ";

	$results = mysqli_query($db, $checkdata);
	$num_rows = mysqli_num_rows($results);	

	if($num_rows > 0)
	{
	echo "User Name Already Exist";
	}
	else
	{
	echo "OK";
	}
			
		
}catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }
?>