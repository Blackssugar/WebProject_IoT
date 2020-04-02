<?php
require 'loginDB.php';
session_start();
try {
    $user_id = $_SESSION["user_id"];
    //$user_id = 6;	
	$viewed_id = mysqli_real_escape_string($db, $_POST['viewed_id']);
	//$viewed_id = 5;
	$query = "INSERT INTO `projectplatfromv1`.`followers` (`user_id`, `follower_id`) VALUES ('$viewed_id', '$user_id') ";
 
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