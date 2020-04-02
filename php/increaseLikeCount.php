<?php
require 'loginDB.php';
session_start();
$data = [];
try {
	$project_id = mysqli_real_escape_string($db, $_POST['projectId']);
	$user_id = $_SESSION["user_id"];
	//$project_id = 5706;
	//$user_id = 5;
	
	$ok = true;
	
	$query = "UPDATE `projectplatfromv1`.`projects` SET likes = likes + 1 WHERE id = '$project_id'";
	$query2 = "INSERT INTO projectplatfromv1.project_likes (project_id, user_id) VALUES ($project_id,$user_id) ";
    $results = mysqli_query($db, $query);
	$results2 = mysqli_query($db, $query2);
    if($results){    	
        
    }else{
		$ok = false;
    	echo "Error message: %s\n", mysqli_error($db) ;
    }
	if($results2){    	
        
    }else{
		$ok = false;
    	echo "Error message: %s\n", mysqli_error($db) ;
    }
	if($ok){
		echo "OK";
	}
	
    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }
mysqli_close($db);
?>