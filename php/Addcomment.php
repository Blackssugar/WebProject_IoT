<?php
require 'loginDB.php';
session_start();
try {
    $comment = mysqli_real_escape_string($db, $_POST['addcomment']);
	$project_id = mysqli_real_escape_string($db, $_POST['projectId']);
	$user_id = $_SESSION["user_id"];
    //$comment = 'good';
	//$project_id = 5706;
	//$user_id = 6;
	$uploadTime = date("Y-m-d H:i:s");
    $query = "INSERT INTO `projectplatfromv1`.`comments` (`project_id`, `user_id`, `comment`, `comment_date`) VALUES ('$project_id','$user_id','$comment', '$uploadTime')";
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