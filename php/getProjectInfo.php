<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$info = [];
$description = [];
$tag = [];
$querycomplete = true;
try {
		$project_id = mysqli_real_escape_string($db, $_POST['projectId']);
		//$project_id = 5706;
		$project_query = "SELECT projectplatfromv1.projects.id,owner_id,projectName,username,pictureURL,fileURL,uploadTime,likes,views,category 
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id
		WHERE projectplatfromv1.projects.id = $project_id AND owner_id = projectplatfromv1.members.id ";
		$project_results = mysqli_query($db, $project_query);
		$project_description_query = "SELECT pos,description_titles,descriptions FROM projectplatfromv1.projects_descriptions where project_id = '$project_id'";
		$description_results = mysqli_query($db,$project_description_query);
		$project_tag_query = "SELECT tag FROM projectplatfromv1.tags where projectid = '$project_id'";
		$tag_results = mysqli_query($db,$project_tag_query);
		if($project_results){
			while ($row = mysqli_fetch_array($project_results,MYSQLI_ASSOC)){
				$info[]=$row;
			}						
		}else{
			$querycomplete = false;
			echo "Error message: %s\n", mysqli_error($db) ;
			}
		if($description_results){
			while ($row = mysqli_fetch_array($description_results,MYSQLI_ASSOC)){
				$description[]=$row;
			}	
		}else{
			$querycomplete = false;
			echo "Error message: %s\n", mysqli_error($db) ;
		}
		if($description_results){
			while ($row = mysqli_fetch_array($tag_results,MYSQLI_ASSOC)){
				$tag[]=$row;
			}	
		}else{
			$querycomplete = false;
			echo "Error message: %s\n", mysqli_error($db) ;
		}
		if($querycomplete){
			
			$formatter = array("Project",array("Project_Information",$info),array("Project_Descriptions",$description),array("Project_Tags",$tag));
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