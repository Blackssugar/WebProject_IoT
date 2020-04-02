<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
    $project_id = mysqli_real_escape_string($db, $_POST['projectId']);
    //$project_id = '5703';
    $query = "SELECT * FROM projectplatfromv1.comments where project_id = '$project_id'";
    $results = mysqli_query($db, $query);
    if($results){
        while ($row = mysqli_fetch_array($results,MYSQLI_ASSOC)){
            $data[]=$row;
        }
        $formatter = array("comment",$data);
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
