<?php
require 'loginDB.php';
session_start();
$user_id = $_SESSION["user_id"];
//$user_id = 32;

try {

	$nickname = mysqli_real_escape_string($db, $_POST['nickname']);
	$introduction = mysqli_real_escape_string($db, $_POST['introduction']);
	$birthday = mysqli_real_escape_string($db, $_POST['birthday']);
	$location = mysqli_real_escape_string($db, $_POST['location']);
	$job = mysqli_real_escape_string($db, $_POST['job']);
	$publicEmail = mysqli_real_escape_string($db, $_POST['publicEmail']);

    //$nickname = "test22";
    //$introduction = "test22";
    //$birthday = "2017-11-11";
    //$location = "AU";
    //$job = "student";
    //$publicEmail = mysqli_real_escape_string($db,"test2233@gmail.com");

    $query = "UPDATE `projectplatfromv1`.`members` SET  `dob` = '$birthday',  `nickname` = '$nickname',
    	`introduction` = '$introduction',  `location` = '$location', `job` = '$job', `publicEmail` = '$publicEmail' WHERE (`id` = '$user_id')";


    $results = mysqli_query($db, $query);
    if($results){
        echo "Success";
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