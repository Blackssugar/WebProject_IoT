<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
    
	
    $query = "SELECT projectplatfromv1.projects.id,projectName,username,category,pictureURL FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id ORDER BY views+likes DESC LIMIT 0,10";
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