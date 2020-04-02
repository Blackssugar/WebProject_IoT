<?php
require 'loginDB.php';
try {
    session_start();
    $user_id = $_SESSION["user_id"];
//    $user_id = 6;
	$viewed_id = mysqli_real_escape_string($db, $_POST['viewed_id']);
//	$viewed_id = 5;
	$query = "SELECT COUNT(*) FROM projectplatfromv1.followers WHERE follower_id = $user_id AND user_id = $viewed_id";
 
    $results = mysqli_query($db, $query);

    if($results){
    	while($count = mysqli_fetch_assoc($results)){
			echo $count["COUNT(*)"];
//            echo $_SESSION["user_id"];
		}    
    }else{
    	echo "0" ;
    }


    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }

mysqli_close($db);
?>