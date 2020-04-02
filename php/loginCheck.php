<?php
require 'loginDB.php';

try {
    // prepare sql and bind parameters
	$user_type = $_POST['userType'];
    $login_id=$_POST['username'];
    //$vpass=$_POST['password'];
    $vpass= md5($_POST['password']);
	//$name='comp5703';
    //$vpass='123';
	if($user_type === 'user'){
		$query = " SELECT password,id FROM members WHERE (username='$login_id' OR email='$login_id') ";
		$results = mysqli_query($db, $query);
		$row=mysqli_fetch_assoc($results);

		$pass = $row["password"];
	}
	if($user_type === 'admin'){
		$query = " SELECT password,id FROM admin WHERE (username='$login_id' OR email='$login_id') ";
		$results = mysqli_query($db, $query);
		$row=mysqli_fetch_assoc($results);
		$pass = $row["password"];
	}
		
    if($pass === $vpass)
    {
        session_start();
        $_SESSION['user_id'] = $row['id'];
        setcookie("userType", $user_type,time()+36000,"/");
        echo "Match";
    }
    else
    {
         echo "NoMatch";
    }

    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;
?>