<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$info = [];
$description = [];
$tag = [];
$querycomplete = true;
try {

		$project_query = "SELECT DISTINCT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id";
		$project_results = mysqli_query($db, $project_query);
		if($project_results){
			while ($row = mysqli_fetch_array($project_results,MYSQLI_ASSOC)){
				$info[]=$row;
			}						
		}else{
			$querycomplete = false;
			echo "Error message: %s\n", mysqli_error($db) ;
			}
		
		if($querycomplete){
			
			$formatter = array("Projects",$info);
			/*$formatter1 = array("Project_Information",$data1);
			
			$formatter2 = array("Project_Description",$data2);*/
			$json = json_encode($formatter);
			echo $json;
		}
    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }
mysqli_close($db);
?>