<?php

try {
    $db = mysqli_connect('cs26-2.cvspeoxc96xq.us-east-2.rds.amazonaws.com', 'admin', '12345678', 'projectplatfromv1');
    //echo "Login successfully";
    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;
?>