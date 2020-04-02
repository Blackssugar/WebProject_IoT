<?php
require 'loginDB.php';
$project_id = $_POST['project_id'];
//$project_id = 5817;
$ok = true;

//PIC UPLOAD
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
		$query = "UPDATE `projectplatfromv1`.`projects`
		SET `pictureURL` = '$store_location' WHERE (`id` = '$project_id')";
		$results = mysqli_query($db, $query);
		//echo "Pic upload successful";
	}else{
		$ok = false;
		print_r($errors);
	}
}
//FILE UPLOAD
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
		$query = "UPDATE `projectplatfromv1`.`projects`
		SET `fileURL` = '$store_location' WHERE (`id` = '$project_id')";
		$results = mysqli_query($db, $query);
		//echo "File upload successful";
	}else{
		$ok = false;
		print_r($errors);
	}
}
//PROJECT NAME
if(!empty($_POST['projectName'])){
	$project_name = mysqli_real_escape_string($db, $_POST['projectName']);
	//$project_name = "python";

	$query = "UPDATE `projectplatfromv1`.`projects` SET `projectName` = '$project_name' WHERE (`id` = '$project_id')";
	try{
		$results = mysqli_query($db, $query);
		if($results){
			//echo "OK";
		}else{
			echo "query failed";
		}
	}catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }

}
//CATEGORY
if(!empty($_POST['category'])){
	$project_category = mysqli_real_escape_string($db, $_POST['category']);
	//$project_category = "test123";
	$query = "UPDATE `projectplatfromv1`.`projects` SET `category` = '$project_category' WHERE (`id` = '$project_id')";
	try{
		$results = mysqli_query($db, $query);
		if($results){
			//echo "OK";
		}else{
			echo "query failed";
		}
	}catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }
}
//TAGS
if(!empty($_POST['tags'])){
//if(true){
	$tag = mysqli_real_escape_string($db, $_POST['tags']);
	//$tag = "testTag";
	$query = "UPDATE `projectplatfromv1`.`tags` SET `tag` = '$tag' WHERE (`projectid` = '$project_id');";
	$results = mysqli_query($db, $query);
	if($results){
		//echo "OK";
	}else{
		$ok = false;
		echo "Error message: %s\n", mysqli_error($db) ;
	}

}
//PROJECT DESCRIPTION

foreach ($_POST as $key => $value){
	//add description titles
	if ((strpos($key, 'section_title') !== false)) {
		$str_arr = preg_split ("/\_/", $key);
		$description_title = mysqli_real_escape_string($db,$value);
		$pos = mysqli_real_escape_string($db,end($str_arr));

		$checkdata=" SELECT * FROM projects_descriptions WHERE project_id='$project_id' ";
        $results = mysqli_query($db, $checkdata);
        $num_rows = mysqli_num_rows($results);

        if($num_rows > 0)
        {
        $query = "UPDATE `projectplatfromv1`.`projects_descriptions` SET `description_titles` = '$description_title'
                		WHERE (`project_id` = '$project_id') and (`pos` = '$pos')";
        }
        else
        {
        $query = "INSERT INTO projectplatfromv1.projects_descriptions (project_id,pos,description_titles)
        		VALUES ('$project_id', '$pos','$description_title')";
        }

		$results = mysqli_query($db, $query);
		if($results){
			//echo "OK";
		}else{
			$ok = false;
			echo "Error message: %s\n", mysqli_error($db) ;
		}
	}

	//add descriptions
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
if($ok){
		echo "OK";
	}
mysqli_close($db);
?>