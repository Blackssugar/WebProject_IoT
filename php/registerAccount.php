<?php
require 'loginDB.php';

try {
 
	$email = $_POST["email"];
	$dob=$_POST['dob'];
	$gender = $_POST["gender"];
	$username = $_POST["username"];
	//$password = $_POST["password"];
	$password = md5($_POST["password"]);

    // prepare sql and bind parameters
    $query = "INSERT INTO members ( email, dob, gender, username, password)
    VALUES ('$email','$dob','$gender','$username','$password')";
    $results = mysqli_query($db, $query);

    if($results){    	
			echo "OK";
		}else{
			echo "query failed";
		}
    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;
?>