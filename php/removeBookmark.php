<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';

$data = [];
try {
    $user_id = $_SESSION["user_id"];
	$project_id = mysqli_real_escape_string($db, $_POST['projectId']);
    $query = "DELETE FROM `projectplatfromv1`.`bookmark` WHERE user_id = '$user_id' AND project_id = '$project_id' ";
    $results = mysqli_query($db, $query);
    if($results){    	
        //echo "OK";
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