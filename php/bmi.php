<?php

    $form_error = "";
    $bim_weight = $_POST["bim_weight"];
    $bim_height = $_POST["bim_height"];

    /* ==========================================================================
    Weight
    ========================================================================== */
    if(isset($bim_weight) && strlen(trim($bim_weight)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-weight">Your weight is required.</div>';
            return false;
        }
    } elseif (!is_numeric($bim_weight) || strlen($bim_weight) < 2 || strlen($bim_weight) > 3) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-weight">Please enter valid weight.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Height
    ========================================================================== */
    if(isset($bim_height) && strlen(trim($bim_height)) < 1) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-height">Your height is required.</div>';
            return false;
        }
    } elseif (!is_numeric($bim_height) || strlen($bim_height) < 2 || strlen($bim_height) > 3) {
        $form_error = "Error Accuore";
        if (!empty($form_error)) {
            echo '<div class="error-height">Please enter valid height.</div>';
            return false;
        }
    }

    /* ==========================================================================
    Calculation
    ========================================================================== */
    $finalBmi = $bim_weight / ($bim_height / 100 * $bim_height / 100);

    if ($finalBmi < 15 ) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Very severely underweight.</div>';
    } elseif ($finalBmi < 16) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are severely underweight.</div>';
    } elseif ($finalBmi < 18.5) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are underweight.</div>';
    } elseif ($finalBmi < 25) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Normal (healthy weight).</div>';
    } elseif ($finalBmi < 30) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are overweight.</div>';
    } elseif ($finalBmi < 35) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Obese Class I (Moderately obese).</div>';
    } elseif ($finalBmi < 40) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Obese Class II (Severely obese).</div>';
    } elseif ($finalBmi >= 40) {
        echo '<div class="success-message">Your BMI is: ' . round($finalBmi, 2) . ' kg/m<sup>2</sup>, This means you are Obese Class III (Very severely obese).</div>';
    }

?>