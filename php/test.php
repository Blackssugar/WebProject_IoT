<!doctype php>
<?php


/*
 * $pad='' gives $pad a default value, meaning we don't have 
 * to pass printArray a value for it if we don't want to if we're
 * happy with the given default value (no padding)
 */

require 'loginDB.php';
//mysqli_real_escape_string($db, $_POST['projectName']);

$project_id = 5706;

foreach ($_POST as $key => $value){
			//if ((strpos($key, 'section') !== false) && (strpos($key, 'section_title') === false)) {
			if ((strpos($key, 'section_title') !== false)) {
				//echo $key;
				$str_arr = preg_split ("/\_/", $key);
				$description_title = mysqli_real_escape_string($db,$value);
				$pos = mysqli_real_escape_string($db,end($str_arr));
				$query = "INSERT INTO projectplatfromv1.projects_descriptions (project_id,pos,description_titles) 
				VALUES ('$project_id', '$pos','$description_title')";
				$results = mysqli_query($db, $query);
				/*$query = "INSERT INTO projectplatfromv1.projects_descriptions (project_id,pos,description_titles,descriptions) 
				VALUES ('$project_id', '$pos','$description_title', '$description')";
				$results = mysqli_query($db, $query);*/
				if($results){    	
					echo "OK";
				}else{
					echo "Error message: %s\n", mysqli_error($db) ;
					
				}

			}
			if ((strpos($key, 'section') !== false) && (strpos($key, 'section_title') === false)) {
				//echo $key;
				$str_arr = preg_split ("/\_/", $key);
				$description = mysqli_real_escape_string($db,$value);
				$pos = mysqli_real_escape_string($db,end($str_arr));
				$query = "UPDATE `projectplatfromv1`.`projects_descriptions` SET `descriptions` = '$description' 
				WHERE (`project_id` = '$project_id') and (`pos` = '$pos')";
				//UPDATE `projectplatfromv1`.`projects_descriptions` SET `descriptions` = '2' WHERE (`project_id` = '5706') and (`pos` = '1');
				$results = mysqli_query($db, $query);
				/*$query = "INSERT INTO projectplatfromv1.projects_descriptions (project_id,pos,description_titles,descriptions) 
				VALUES ('$project_id', '$pos','$description_title', '$description')";
				$results = mysqli_query($db, $query);*/
				if($results){    	
					echo "OK";
				}else{
					echo "Error message: %s\n", mysqli_error($db) ;
					
				}

			}
			

		}



/*foreach ($_POST as $key => $value){
	if (strpos($key, 'section') !== false) {
		$str_arr = preg_split ("/\_/", $key);
		$descriptions = mysqli_real_escape_string($db,$value);
		$pos = mysqli_real_escape_string($db,end($str_arr));
		echo $descriptions;
		echo $pos;
		$query = "INSERT INTO projectplatfromv1.projects_descriptions (project_id,pos,descriptions) VALUES ('$project_id', '$pos', '$descriptions')";
		$results = mysqli_query($db, $query);
		if($results){    	
			echo "OK";
		}else{
			 echo "Error message: %s\n", mysqli_error($db) ;
			echo "query failed";
		}
		
	}else{
			echo "query failed outside";
	}
	
} */




//INSERT INTO `projectplatfromv1`.`projects_descriptions` (`project_id`, `pos`, `descriptions`) VALUES ('5706', '3', 'Description3');

/*foreach ($_POST as $key => $value){
			if (strpos($key, 'section') !== false) {
				//$key = mysqli_real_escape_string($db, $_POST['$key']);
				echo $value;
			}
    	}*/

?>