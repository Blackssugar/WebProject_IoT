<?php

header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';

$data = [];

try {
    $user_id = $_POST["user_id"];
    //$user_id = 6;
    //$user_name=$_POST['userName'];
    $query = "SELECT * FROM members WHERE id IN (SELECT user_id FROM followers WHERE follower_id=$user_id);";

    $results = mysqli_query($db, $query);

    if($results){
    	while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC)){
    		$data[]=$row;
    	}
        $json = json_encode($data);
        echo $json;
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