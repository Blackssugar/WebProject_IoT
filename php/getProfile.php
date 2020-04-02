<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
    $user_id = $_POST["user_id"];
    //$user_id = 6;
    $query = "SELECT * FROM projectplatfromv1.members where id = '$user_id'";
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