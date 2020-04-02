<?php
require 'loginDB.php';

try {

	if(isset($_POST['user_email']))
	{
	$emailId=$_POST['user_email'];

	$checkdata=" SELECT * FROM members WHERE email='$emailId' ";

	$results = mysqli_query($db, $checkdata);
	$num_rows = mysqli_num_rows($results);	


	if($num_rows>0)
	{
	echo "OK";
	}
	else
	{
	echo "NOT OK";
	}
	exit();
	}
}catch(Exception $e){
	echo "Error: " . $e->getMessage();
}
$conn = null;
?>