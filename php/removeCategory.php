<?php
require 'loginDB.php';
try {
    $category = mysqli_real_escape_string($db, $_POST['category']);
	//$category = "testCat3";
    $query = "DELETE FROM `projectplatfromv1`.`category` WHERE category = '$category'";
    $results = mysqli_query($db, $query);
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