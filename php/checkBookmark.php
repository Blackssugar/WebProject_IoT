<?php
require 'loginDB.php';
session_start();
try {
	$project_id = mysqli_real_escape_string($db, $_POST['project_id']);
	//$project_id = '5704';
    $owner_id = $_SESSION["user_id"];
	//$owner_id = '5';
	
	$query = "SELECT COUNT(*) FROM projectplatfromv1.bookmark WHERE project_id = $project_id AND user_id = $owner_id ";
    $results = mysqli_query($db, $query);

    if($results){
    	while($count = mysqli_fetch_assoc($results)){
			echo $count["COUNT(*)"];
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