<?php

require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;


// Load Composer's autoloader
//require '../vendor/autoload.php';


$errors = [];
// connect to database
require 'loginDB.php';


/*
  Accept email of user whose password is to be reset
  Send email to user to reset their password
*/
$type = $_POST['type'];

if ($type == 'reset-password') {
    $email = mysqli_real_escape_string($db, $_POST['email']);
    // ensure that the user exists on our system
    $query = "SELECT email FROM members WHERE email='$email'";
    $results = mysqli_query($db, $query);

    if (empty($email)) {
        echo "Your email is required";
        array_push($errors, "Your email is required");
    }else if(mysqli_num_rows($results) <= 0) {
        echo "Sorry, no user exists on our system with that email";
        array_push($errors, "Sorry, no user exists on our system with that email");
    }
    // generate a unique random token of length 100
    $token = bin2hex(random_bytes(50));

    if (count($errors) == 0) {
        $sql = "INSERT INTO password_resets(email, token) VALUES ('$email', '$token')";
        $results = mysqli_query($db, $sql);

        // Instantiation and passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 2;                                       // Enable verbose debug output
            $mail->isSMTP();                                            // Set mailer to use SMTP
            $mail->Host       = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'comp5703cs26@gmail.com';                     // SMTP username
            $mail->Password   = '19960530';                               // SMTP password
            $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
            $mail->Port       = 587;                                    // TCP port to connect to

            //Recipients
            $mail->setFrom('comp5703cs26@gmail.com', 'Chris');
            $mail->addAddress($email, 'Tom');     // Add a recipient



            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Password reset';
            $mail->Body    = "Hi there, click on this link to reset your password on our site. http://localhost/COMP5703-CS26/views/setNewPsw.html?token=$token";
            $mail->send();

//            header('location: /cs26/php/pending.php?email=' . $email); //TODO: Change this to server link
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }

    }
}

// ENTER A NEW PASSWORD
if ($type == 'new_password') {
    $new_pass = mysqli_real_escape_string($db, $_POST['new_pass']);
    $new_pass_c = mysqli_real_escape_string($db, $_POST['new_pass_c']);
    $token = mysqli_real_escape_string($db, $_POST['token']);
    // Grab to token that came from the email link
    //$token = $_SESSION['token'];

    if (count($errors) == 0) {
        // select email address of user from the password_reset table
        $sql = "SELECT email FROM password_resets WHERE token='$token' LIMIT 1";
        $results = mysqli_query($db, $sql);
        $email = mysqli_fetch_assoc($results)['email'];

        if ($email) {
            //encode password with md5
            $new_pass = md5($new_pass);
            $sql = "UPDATE members SET password='$new_pass' WHERE email='$email'";
            $results = mysqli_query($db, $sql);
            if($results){
                echo "OK";
            }else{
                echo "Error message: %s\n", mysqli_error($db) ;
            }
        }else{
            header("location: http://localhost/COMP5703-CS26/views/setNewPsw.html?token=$token");
        }
    }
}
?>
