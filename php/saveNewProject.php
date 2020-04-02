<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require 'loginDB.php';

$ok = true;


if(!(empty($_FILES['pictureURL']['name']))){
	$errors= array();
	$pic_name = $_FILES['pictureURL']['name'];
	$pic_size = $_FILES['pictureURL']['size'];
	$pic_tmp = $_FILES['pictureURL']['tmp_name'];
	$pic_type = $_FILES['pictureURL']['type'];
	$ext_tmp = explode('.',$pic_name);
	$pic_ext=strtolower(end($ext_tmp));
	

	$extensions= array("jpeg","jpg","png");

	if(in_array($pic_ext,$extensions)=== false){
		$errors[]="This file extension for Project Picture is not allowed, please choose a JPEG/JPG/PNG file.";
	}

	if($pic_size > 2097152) {
		$errors[]='File size must be less than 2 MB';
	}

	if(empty($errors)==true) {
		$store_location = "../project_picture/".$pic_name;
		move_uploaded_file($pic_tmp,$store_location);
		//echo "Pic upload successful";
	}else{
		$ok = false;
		print_r($errors);
	}
}
if(!(empty($_FILES['fileURL']['name']))){
	$errors= array();
	$file_name = $_FILES['fileURL']['name'];
	$file_size = $_FILES['fileURL']['size'];
	$file_tmp = $_FILES['fileURL']['tmp_name'];
	$file_type = $_FILES['fileURL']['type'];
	$ext_tmp = explode('.',$file_name);
	$file_ext=strtolower(end($ext_tmp));
	if($file_size > 2097152) {
		$errors[]='File size must be less than 2 MB';
	}

	if(empty($errors)==true) {
		$store_location = "../project_file/".$file_name;
		move_uploaded_file($file_tmp,$store_location);
		//echo "File upload successful";
	}else{
		$ok = false;
		print_r($errors);
	}
}


try {
		//project Info
		$pic_store_location = "";
		$file_store_location = "";
		$project_name = mysqli_real_escape_string($db, $_POST['projectName']);
		$category = mysqli_real_escape_string($db, $_POST['category']);
		$ownerId = mysqli_real_escape_string($db, $_SESSION["user_id"]);
		//$ownerId = 5;
		$uploadTime = date("Y-m-d H:i:s");
		if(!(empty($_FILES['pictureURL']['name']))){
			$pic_name = $_FILES['pictureURL']['name'];
			$pic_store_location = "../project_picture/".$pic_name;
			
		}
		if(!(empty($_FILES['fileURL']['name']))){
			$file_name = $_FILES['fileURL']['name'];
			$file_store_location = "../project_file/".$file_name;	
		}
		
    
        // Todo: you need defind description variable in here
        $description = "";
		if(!(empty($_FILES['fileURL']['name'])) && !(empty($_FILES['pictureURL']['name']))){
			//echo "UPLODADED";
			$query = "INSERT INTO projectplatfromv1.projects (projectName,uploadTime,pictureURL,fileURL,category,owner_id) VALUES ('$project_name','$uploadTime','$pic_store_location','$file_store_location','$category','$ownerId')";
			$results = mysqli_query($db, $query);
		}
		elseif(!(empty($_FILES['fileURL']['name'])) && (empty($_FILES['pictureURL']['name']))){
			//echo "NO PICTURE";
			$query = "INSERT INTO projectplatfromv1.projects (projectName,uploadTime,fileURL,category,owner_id) VALUES ('$project_name','$uploadTime','$file_store_location','$category','$ownerId')";
			$results = mysqli_query($db, $query);
		}
		elseif(!(empty($_FILES['pictureURL']['name'])) && (empty($_FILES['fileURL']['name']))){
			//echo "NO FILE";
			$query = "INSERT INTO projectplatfromv1.projects (projectName,uploadTime,pictureURL,category,owner_id) VALUES ('$project_name','$uploadTime','$pic_store_location','$category','$ownerId')";
			$results = mysqli_query($db, $query);
		}else{
			//echo "NO FILE AND PICTURE";
			$query = "INSERT INTO projectplatfromv1.projects (projectName,uploadTime,category,owner_id) VALUES ('$project_name','$uploadTime','$category','$ownerId')";
			$results = mysqli_query($db, $query);
		}
		
		if($results){    	
			//echo "OK";
		}else{
			$ok = false;
			echo "Error message: %s\n", mysqli_error($db) ;
		}
	
		//Get project_id
		$project_id_query = "SELECT id FROM projectplatfromv1.projects WHERE projectName = '$project_name' AND uploadTime = '$uploadTime'";
		$results = mysqli_query($db, $project_id_query);
		if($results){
			$row = mysqli_fetch_assoc($results);
			$project_id = $row["id"];
		}else{
			$ok = false;
			echo "Error message: %s\n", mysqli_error($db) ;
		}  
			
		//description
		
		foreach ($_POST as $key => $value){
			if ((strpos($key, 'section_title') !== false)) {
				$str_arr = preg_split ("/\_/", $key);
				$description_title = mysqli_real_escape_string($db,$value);
				$pos = mysqli_real_escape_string($db,end($str_arr));
				$query = "INSERT INTO projectplatfromv1.projects_descriptions (project_id,pos,description_titles) 
				VALUES ('$project_id', '$pos','$description_title')";
				$results = mysqli_query($db, $query);
				if($results){    	
					//echo "OK";
				}else{
					$ok = false;
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
				$results = mysqli_query($db, $query);
				if($results){    	
					//echo "OK";
				}else{
					$ok = false;
					echo "Error message: %s\n", mysqli_error($db) ;
					
				}

			}
		
		}
	
		//Tags
		
		$tag = mysqli_real_escape_string($db, $_POST['tags']);    
		$query = "INSERT INTO projectplatfromv1.tags (tag,projectid) VALUES ('$tag','$project_id')";
		$results = mysqli_query($db, $query);					
		if($results){    	
			//echo "OK";
		}else{
			$ok = false;
			echo "Error message: %s\n", mysqli_error($db) ;
		}
		
		if($ok){    	
			echo "OK";
		}
    }
catch(Exception $e)
    {
	$ok = false;
    echo "Error: " . $e->getMessage();
    }
mysqli_close($db);
?>
