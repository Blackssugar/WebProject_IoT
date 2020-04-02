<?php

require 'loginDB.php';
$data = [];

try {
	$user_id = $_POST['user_id'];
	//$user_name = ["joe","jay"];
	foreach($user_id as $value) {
	    $query = "DELETE FROM projectplatfromv1.members WHERE id = '$value'";
	    $results = mysqli_query($db, $query);
	}

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