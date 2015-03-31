<?php 
    include_once("NavigationLogic.php");
    $active = new NavigationLogic();
?>
<ul id="puremed-menu">
    <li class="first">
        <a class="<?php echo $active->checkActiveClass(0);?>" href="index.php">Home</a>
    </li>
    <li>
        <a class="<?php echo $active->checkActiveClass(1); ?>" href="about.php">About Us</a>
    </li>
    <li class="parent">
        <a class="<?php echo $active->checkActiveClass(2); ?>" href="#">Health Products</a>
        <ul>
          <li><a href="symgard.php">SymGard</a></li>
          <li><a href="stummy.php">Stummy Plus</a></li>
          <li><a href="osteoease.php">OsteoEase</a></li>
        </ul>
    </li>
    <li class="parent">
        <a class="<?php echo $active->checkActiveClass(3); ?>" href="#">Beauty Products</a>
        <ul>
          <li><a href="argam-serum.php">Argam Serum</a></li>
          <li><a href="sun-protection.php">Sun Protection</a></li>
          <li><a href="treatment-shampoo.php">Treatment Shampoo</a></li>
          <li><a href="conditioner.php">Conditioner</a></li>
          <li><a href="treatment-hair.php">Treatment Hair</a></li>
        </ul>
    </li>
    <li class="parent">
        <a class="<?php echo $active->checkActiveClass(4); ?>" href="#">Coming Soon</a>
        <ul>
          <li><a href="bio-marine.php">Bio-Marine</a></li>
          <li><a href="celladerm.php">Celladerm</a></li>
          <li><a href="sheep-placenta.php">EC Sheep Placenta</a></li>
          <li><a href="glucolite.php">Glucolite</a></li>
          <li><a href="nutriq.php">Nutri Q</a></li>
          <li><a href="deer-placenta.php">Deer Placenta</a></li>
        </ul>
    </li>
    <li>
        <a class="<?php echo $active->checkActiveClass(5); ?>" href="contact.php">Contact Us</a>
    </li>
</ul>