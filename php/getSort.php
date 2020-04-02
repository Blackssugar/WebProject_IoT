<?php
header('Content-Type:application/json; charset=utf-8');
require 'loginDB.php';
$data = [];
try {
     
	$order_by = $_POST['order_by']; //ASC OR DESC
	$order_col = $_POST['order_col'];// Views / Likes / Most Recent
	//$order_by = 'desc';
	//$order_col = 'Views';
	
	switch($order_col){
		case 'Views':
			$order_col = 'views';
			break;
		case 'Likes':
			$order_col = 'likes';
			break;
		case 'Most_Recent':
			$order_col = 'uploadTime';
			break;
	}
		
    $query = "SELECT * FROM projectplatfromv1.projects ORDER BY $order_col $order_by ";
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