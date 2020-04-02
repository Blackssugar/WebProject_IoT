<?php
require 'loginDB.php';
session_start();
$user_id = $_SESSION["user_id"];
//$user_id = 32;

if(isset($_FILES['icon'])){
	$errors= array();
	$pic_name = $_FILES['icon']['name'];
	$pic_size = $_FILES['icon']['size'];
	$pic_tmp = $_FILES['icon']['tmp_name'];
	$pic_type = $_FILES['icon']['type'];
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
		//$store_location = "../member_icon/".$pic_name;
		$store_location = "../project_picture/".$pic_name;

		move_uploaded_file($pic_tmp,$store_location);

//		$query = "UPDATE 'projectplatfromv1'.'members' SET profile_pic = $store_location WHERE (`id` = '$user_id')";
        $query = "UPDATE `projectplatfromv1`.`members` SET  `profile_pic` = '$store_location' WHERE (`id` = '$user_id')";


        try{
        			$results = mysqli_query($db, $query);
        			if($results){
        				echo "OK";
        			}else{
        				echo "Upload failed";
        			}
        		}catch(Exception $e)
        		{
        		echo "Error: " . $e->getMessage();
        		}
	}else{
		print_r($errors);
	}
}


mysqli_close($db);
?>