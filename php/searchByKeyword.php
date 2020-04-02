<?php
//header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {

    $project_keyword = mysqli_real_escape_string($db, $_POST['keyword']);
    //$tag = mysqli_real_escape_string($db, $_POST['tag']);
	//$project_keyword = 'iot';

    $query = "SELECT DISTINCT projectplatfromv1.projects.* 
	FROM projectplatfromv1.projects 
	LEFT JOIN projectplatfromv1.tags
	ON projects.id = projectplatfromv1.tags.projectid 
	WHERE projectName LIKE '%$project_keyword%' 
	OR tag LIKE '%$project_keyword%' ";
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