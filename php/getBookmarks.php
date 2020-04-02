<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
$project_id = array();
session_start();
try {
    $user_id = $_SESSION["user_id"];
	//$user_id = 6;
    $query = "SELECT project_id FROM `projectplatfromv1`.`bookmark` WHERE user_id = $user_id";
    $results = mysqli_query($db, $query);

    while ($row = mysqli_fetch_assoc($results)) {
                 $project_id[] = $row["project_id"];
             }

    if($project_id){
         foreach ($project_id as $value) {
             //$query = "SELECT id,projectName,pictureURL FROM `projectplatfromv1`.`projects` WHERE id=$value";
               $query = "SELECT DISTINCT projectplatfromv1.projects.id,projectName,pictureURL,uploadTime,username,nickname
             	FROM projectplatfromv1.projects
             	INNER JOIN projectplatfromv1.members
             	ON projects.owner_id = projectplatfromv1.members.id
             	WHERE projects.id=$value";
             $results2 = mysqli_query($db, $query);
             if($results2){
                 while ($row = mysqli_fetch_array($results2,MYSQLI_ASSOC)){
                     $data[]=$row;
                 }
             }
		}
        $formatter = array("Projects",$data);
        $json = json_encode($formatter);
        echo $json;
    }else{
        $formatter = array("Error: ",mysqli_error($db));
        $json = json_encode($formatter);
        echo $json;
//    	echo "Error message: %s\n", mysqli_error($db) ;
        }
    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }
mysqli_close($db);
?>