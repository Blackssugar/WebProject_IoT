<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
	$user_id = $_SESSION["user_id"];
	//$user_id = 6;
    $query = "SELECT email FROM projectplatfromv1.members WHERE id = $user_id";
    $results = mysqli_query($db, $query);
    if($results){
		while ($row = mysqli_fetch_assoc($results)) {
			echo $row["email"];
		}
       
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