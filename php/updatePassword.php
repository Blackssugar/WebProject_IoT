<?php
require 'loginDB.php';
session_start();
try {
		$user_id = $_SESSION["user_id"];
//        $user_id = 6;
		//$old_password = mysqli_real_escape_string($db, $_POST['oldPassword']);
		//$new_password = mysqli_real_escape_string($db, $_POST['newPassword']);
		$old_password = md5(mysqli_real_escape_string($db, $_POST['oldPassword']));
        $new_password = md5(mysqli_real_escape_string($db, $_POST['newPassword']));

		$query = "SELECT password FROM `projectplatfromv1`.`members` WHERE (`id` = '$user_id')";
		$results = mysqli_query($db, $query);
		while ($row = mysqli_fetch_row($results)) {
			$setted_password = "$row[0]";
		}

		if($setted_password == $old_password){
			$query2 = "UPDATE `projectplatfromv1`.`members` SET `password` = '$new_password' WHERE (`id` = '$user_id')";
			$results2 = mysqli_query($db, $query2);
            if($results){
                echo "OK";
            }else{
                echo "Error message: %s\n", mysqli_error($db) ;
            }
		}
		else{
		    echo "Error";
        }
	
    
    }
catch(Exception $e)
    {
    echo "Error: " . $e->getMessage();
    }
mysqli_close($db);
?>