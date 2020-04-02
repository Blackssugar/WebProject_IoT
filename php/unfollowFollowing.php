<?php
session_start();
require 'loginDB.php';
$data = [];

try {
    $user_id = $_SESSION["user_id"];
	$following_id = mysqli_real_escape_string($db, $_POST['following_id']);
    //$user_id = 5;
	//$following_id = 6;
    $query = "DELETE FROM `projectplatfromv1`.`followers` WHERE (`user_id` = '$user_id ')";
	$query2 = "DELETE FROM `projectplatfromv1`.`followers` WHERE (`user_id` = '$following_id')";

    $results = mysqli_query($db, $query);
	$results2 = mysqli_query($db, $query2);

    if($results&&$results2){
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