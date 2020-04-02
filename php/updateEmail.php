<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
//	$user_id = $_SESSION["user_id"];
	$email = mysqli_real_escape_string($db, $_POST['email']);
    $user_id = $_POST["user_id"];
	//$email = "tom@tomtomtom.com";
    $query = "UPDATE `projectplatfromv1`.`members` SET `email` = '$email' WHERE (`id` = '$user_id')";
    $results = mysqli_query($db, $query);
    if($results){
		echo "OK";       
    }else{
        echo "Error message: %s\n", mysqli_error($db) ;
    }
    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }
mysqli_close($db);
?>