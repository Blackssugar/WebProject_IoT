<?php

require 'loginDB.php';
$data = [];

try {
	
	$user_keyword = $_POST['user_keyword'];
	$query = "SELECT * FROM projectplatfromv1.members WHERE username LIKE '%$user_keyword%' ";
	$results = mysqli_query($db, $query);

    if($results){
    	while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC)){
    		$data[]=$row;
    	}
        $json = json_encode($data);
        echo $json;
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