<?php
require 'loginDB.php';
$data = [];
try {
//		$project_id = mysqli_real_escape_string($db, $_POST['project_id']);
        $project_id = $_POST['project_id'];
		//$project_id = [5707,5708];
        foreach($project_id as $value){
            $query = "DELETE FROM `projectplatfromv1`.`projects` WHERE (`id` = '$value')";
            $results = mysqli_query($db, $query);
        }
		//$query = "DELETE FROM `projectplatfromv1`.`projects` WHERE `id` IN ('$project_id');"
		if($results){
			echo "OK";
		}else{
			echo "Error message: %s\n", mysqli_error($db) ;
		}
    }
catch(Exception $e)
    {
    echo "Error:" . $e->getMessage();
    }
mysqli_close($db);
?>