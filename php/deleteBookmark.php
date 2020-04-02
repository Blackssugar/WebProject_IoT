<?php
require 'loginDB.php';
$data = [];
session_start();
try {
    $user_id = $_SESSION["user_id"];
	$project_id = mysqli_real_escape_string($db, $_POST['projectId']);
	//$user_id = 5;
	//$project_id = 3;
    $query = "DELETE FROM `projectplatfromv1`.`bookmark` WHERE (`user_id` = '$user_id') and (`project_id` = '$project_id')";
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