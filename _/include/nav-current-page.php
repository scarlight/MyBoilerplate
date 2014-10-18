<?php 

    $filename = basename($_SERVER['PHP_SELF']);
    $links = array(
        0 => "index.php",
        1 => "about-us.php",
        2 => "product.php",
        3 => "contact-us.php"
    );

    foreach ($links as $key => $value) {
        if($filename == $value){
            $links[$key] = "selected";
        }
        else{
            $links[$key] = "";
        }
    }
?>

<ul id="nichiwa-menu">
    <li class="<?php echo $links[0]; ?>"><a href="index.php" class="">Home</a></li>
    <li class="<?php echo $links[1]; ?>"><a href="about-us.php" class="">About Us</a></li>
    <li class="<?php echo $links[2]; ?>"><a href="product.php" class="">Product</a></li>
    <li class="<?php echo $links[3]; ?>"><a href="contact-us.php" class="">Contact Us</a></li>
</ul>