<?php

    $email_address = "example@example.com";                     // Your email address
    $secret_key = "6LdHCQwTAAAAAE3YmyHwSxYuvyw5jXrdejFEbmds";   // Your Captcha secret Key

    $form_error = "";
    $captcha = $_POST["g-recaptcha-response"];
    $contact_name = $_POST["contact_name"];
    $contact_email = $_POST["contact_email"];
    $contact_phone = $_POST["contact_phone"];
    $contact_subject = "Car Reservation";                       // Your Email Message subject
    $contact_choose_car = $_POST["contact_choose_car"];
    $contact_pickup_location = $_POST["contact_pickup_location"];
    $contact_dropoff_location = $_POST["contact_dropoff_location"];
    $contact_pickup_date = $_POST["contact_pickup_date"];
    $contact_pickup_time = $_POST["contact_pickup_time"];
    $contact_dropoff_date = $_POST["contact_dropoff_date"];
    $contact_dropoff_time = $_POST["contact_dropoff_time"];

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
    Email
    ========================================================================== */
    if (empty($contact_email)) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-email">Your Email is required.</div>';
            return false;
        }
    } elseif (!isValidEmail($contact_email)) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-email">Please enter a valid Email address.</div>';
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
    Choose a car
    ========================================================================== */
    if(isset($contact_choose_car) && strlen(trim($contact_choose_car)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-choose-car">Please choose a car.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Pick-up Location
    ========================================================================== */
    if(isset($contact_pickup_location) && strlen(trim($contact_pickup_location)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-pickup-location">Please choose Pick-up location.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Drop-off Location
    ========================================================================== */
    if(isset($contact_dropoff_location) && strlen(trim($contact_dropoff_location)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-dropoff-location">Please choose Drop-off location.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Pick-up Date
    ========================================================================== */
    if(isset($contact_pickup_date) && strlen(trim($contact_pickup_date)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-pickup-date">Please choose Pick-up date.</div>';
            return false;
        }
    } elseif (!validateDate($contact_pickup_date)) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-pickup-date">Please enter a valid Pick-up date.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Pick-up Time
    ========================================================================== */
    if(isset($contact_pickup_time) && strlen(trim($contact_pickup_time)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-pickup-time">Please choose Pick-up time.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Drop-off Date
    ========================================================================== */
    if(isset($contact_dropoff_date) && strlen(trim($contact_dropoff_date)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-dropoff-date">Please choose Drop-off date.</div>';
            return false;
        }
    } elseif (!validateDate($contact_dropoff_date)) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-dropoff-date">Please enter a valid Drop-off date.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Drop-off Time
    ========================================================================== */
    if(isset($contact_dropoff_time) && strlen(trim($contact_dropoff_time)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-dropoff-time">Please choose Drop-off time.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Compare Dates
    ========================================================================== */
    $contact_pickup_date_time = $_POST["contact_pickup_date"] . ' ' . $_POST["contact_pickup_time"];
    $contact_dropoff_date_time = $_POST["contact_dropoff_date"] . ' ' . $_POST["contact_dropoff_time"];

    $contact_pickup_date_time = str_replace('/', '-', $contact_pickup_date_time);
    $contact_pickup_date_time = new DateTime($contact_pickup_date_time);

    $contact_dropoff_date_time = str_replace('/', '-', $contact_dropoff_date_time);
    $contact_dropoff_date_time = new DateTime($contact_dropoff_date_time);

    if($contact_pickup_date_time >= $contact_dropoff_date_time) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-pickup-date error-pickup-time error-dropoff-date error-dropoff-time">The Drop-off date must be after the Pick-up date.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Terms ( Checkbox )
    ========================================================================== */
    if(!isset($_POST["contact_terms"])) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-terms">You have to accept the terms and conditions.</div>';
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
"You have been contacted by $contact_name with regards to $contact_subject and the details as follows:

Email Address:      $contact_email
Phone number:       $contact_phone
Car Model:          $contact_choose_car
Pick-up Location:   $contact_pickup_location
Pick-up Date:       $contact_pickup_date
Pick-up Time:       $contact_pickup_time
Drop-off Location:  $contact_dropoff_location
Drop-off Date:      $contact_dropoff_date
Drop-off Time:      $contact_dropoff_time

";

    $headers  = "From: $contact_email" . PHP_EOL;
    $headers .= "Reply-To: $contact_email" . PHP_EOL;
    $headers .= "MIME-Version: 1.0" . PHP_EOL;
    $headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
    $headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

    if (mail($email_address, $send_subject, $send_message, $headers)) {
        echo '<div class="success-message">Thank you ' . $contact_name . ', your message was sent successfully.</div>';
        return false;
    } else {
        echo 'Please make sure PHP mail() is enabled.';
        return false;
    }

    function isValidEmail($contact_email) {
        return preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i", $contact_email);
    }

    function validateDate($date) {
        $d = DateTime::createFromFormat('d/m/Y', $date);
        return $d && $d->format('d/m/Y') == $date;
    }


?>