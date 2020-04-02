<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
     
	$category = $_POST['category']; 
    $project_id = mysqli_real_escape_string($db, $_POST['projectId']);
	//$category = 'testCat1';
	
		
    $query = "SELECT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id
		WHERE category = '$category' AND projectplatfromv1.projects.id != '$project_id' LIMIT 0,5";
    $results = mysqli_query($db, $query);
    if($results){
        while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC)){
            $data[]=$row;
        }
        $formatter = array("Projects",$data);
        $json = json_encode($formatter);
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