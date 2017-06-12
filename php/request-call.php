<?php

    $email_address = "example@example.com";                     // Your email address
    $secret_key = "6LdHCQwTAAAAAE3YmyHwSxYuvyw5jXrdejFEbmds";   // Your Captcha secret Key

    $form_error = "";
    $captcha = $_POST["g-recaptcha-response"];
    $contact_name = $_POST["contact_name"];
    $contact_phone = $_POST["contact_phone"];
    $contact_call_back_time = $_POST["contact_call_back_time"];

    /* ==========================================================================
    Name
    ========================================================================== */
    if(isset($contact_name) && strlen(trim($contact_name)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-name">Your name is required.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Phone
    ========================================================================== */
    if(isset($contact_phone) && strlen(trim($contact_phone)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-phone">Your Phone number is required.</div>';
            return false;
        }
    } elseif (!is_numeric($contact_phone) || strlen($contact_phone) < 10 || strlen($contact_phone) > 10) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-phone">Phone number must be 10 digits.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Call Back Time
    ========================================================================== */
    if(isset($contact_call_back_time) && strlen(trim($contact_call_back_time)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-call-back-time">Please choose a time that suits you.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Captcha
    ========================================================================== */
    if(isset($captcha) && strlen(trim($captcha)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-captcha">Please verfiy you are not a robot</div>';
            return false;
        }
    } elseif(isset($captcha) && strlen(trim($captcha)) > 1) {
        $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secret_key . "&response=" . $captcha);
        if (strpos($response, "false") !== false) {
            $form_error = "Error Accuore";
            if (!empty($form_error)) {
                echo '<div class="error-captcha">Check your site keys</div>';
                return false;
            }
        }
    }

    /* ==========================================================================
    Send Message
    ========================================================================== */
    $send_subject = "You've been contacted by: " . $contact_name;
    $send_message =
"You have been contacted by $contact_name with regards to Request a call back and the details as follows:

Contact details:

Name: $contact_name
Phone Number: $contact_phone
Call back time: $contact_call_back_time

";

    $headers  = "From: $email_address" . PHP_EOL;
    $headers .= "Reply-To: $email_address" . PHP_EOL;
    $headers .= "MIME-Version: 1.0" . PHP_EOL;
    $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
    $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

    if (mail($email_address, $send_subject, $send_message, $headers)) {
        echo '<div class="success-message">Thank you ' . $contact_name . ' we will call you on ' . $contact_phone . ' at ' . $contact_call_back_time . '.</div>';
        return false;
    } else {
        echo 'Please make sure PHP mail() is enabled.';
        return false;
    }
?>