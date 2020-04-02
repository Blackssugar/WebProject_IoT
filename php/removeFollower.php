<?php


require 'loginDB.php';
$data = [];

try {
    $user_id = mysqli_real_escape_string($db, $_POST['userName']);
	$follower_id = mysqli_real_escape_string($db, $_POST['followerUserName']);
    $query = "DELETE FROM `projectplatfromv1`.`followers` WHERE (`follower_id` = '$follower_id')";

    $results = mysqli_query($db, $query);

    if($results){
    	
        echo "OK";
    }else{
    	echo "query failed";
    }


    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }

mysqli_close($db);
?>