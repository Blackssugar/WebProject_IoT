<?php

require 'loginDB.php';
$data = [];

try {
	
	
	$query = "SELECT * FROM projectplatfromv1.members ";
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