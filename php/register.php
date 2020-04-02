<?php
require 'login.php';

try {
 
	$firstname = $_POST["firstname"];
	$lastname = $_POST["lastname"];
	$email = $_POST["email"];
	$birth=$_POST['birth'];
	$gender = $_POST["gender"];
	$username = $_POST["username"];
	$password = $_POST["password"];

    // prepare sql and bind parameters
    $query = "INSERT INTO members (first_name, last_name, email, dob, gender, username, password)
    VALUES ('$firstname','$lastname','$email','$birth','$gender','$username','$password')";
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