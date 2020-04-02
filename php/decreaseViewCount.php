<?php
require 'loginDB.php';
$data = [];
try {
	$project_id = mysqli_real_escape_string($db, $_POST['projectId']);
	$user_id = $_SESSION["user_id"];
	//$project_id = 5706;
	//$user_id = 5;

	$ok = true;

	$query = "UPDATE `projectplatfromv1`.`projects` SET views = views - 1 WHERE id = '$project_id'";
	$query2 = "DELETE FROM `projectplatfromv1`.`project_views` WHERE `project_id` = $project_id and `user_id` = $user_id; ";
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