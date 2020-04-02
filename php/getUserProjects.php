<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
        $owner_id = mysqli_real_escape_string($db, $_POST['user_id']);
		//$owner_id = 5;
		$query = "SELECT projectplatfromv1.projects.id,projectName,fileURL,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id
		WHERE owner_id = $owner_id;";
		$results = mysqli_query($db, $query);
		if($results){
			while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC)){
				$data[]=$row;
			}
			$formatter = array("Projects",$data);
			$json = json_encode($formatter);
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