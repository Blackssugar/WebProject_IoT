<?php
header('Content-Type:application/json; charset=utf-8');
require 'login.php';
$data = [];

try {
    $sort_type = mysqli_real_escape_string($db, $_POST['sortType']);
    $sort_order = mysqli_real_escape_string($db, $_POST['sortOrder']);

    //$sort_type = "uploadTime";
    //$sort_order = "DESC";

    if ($sort_order==="ASC") {
        if ($sort_type==="likes") {
            $query = "SELECT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id ORDER BY likes ASC;";
        }
        else if ($sort_type==="views") {
            $query = "SELECT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id ORDER BY views ASC;";
        }
        else if ($sort_type==="uploadTime") {
            $query = "SELECT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id ORDER BY uploadTime ASC;";
        }
    }
    else if ($sort_order==="DESC") {
        if ($sort_type==="likes") {
            $query = "SELECT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id ORDER BY likes DESC;";
        }
        else if ($sort_type==="views") {
            $query = "SELECT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id ORDER BY views DESC;";
        }
        else if ($sort_type==="uploadTime") {
            $query = "SELECT projectplatfromv1.projects.id,projectName,pictureURL,category,likes,views,username
		FROM projectplatfromv1.projects INNER JOIN projectplatfromv1.members ON projects.owner_id = projectplatfromv1.members.id ORDER BY uploadTime DESC;";
        }
    }

    $results = mysqli_query($db, $query);

    if($results){
    	while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC)){
    		$data[]=$row;
    	}
        $json = json_encode($data);
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