<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Set recipient email address
    $to = "muhammad.shan404@gmail.com";

    // Compose the email message
    $headers = "From: $name <$email>";
    $email_message = "Subject: $subject\n\n$message";

    // Send email
    mail($to, $subject, $email_message, $headers);

    // Redirect after sending email (you can customize this URL)
    header("Location: thank_you.html");
    exit();
}

?>
