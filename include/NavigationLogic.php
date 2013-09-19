<?php 
/**
* To find out which top menu to highlight
*/
class NavigationLogic
{
    public $filename;
    public $top_menu = array(
        0 => "index",
        1 => "about",
        2 => "health-product",
        3 => "beauty-product",
        4 => "coming-soon",
        5 => "contact"
    );
    public $submenu_menu = array(
        "symgard"           => 2,
        "stummy"            => 2,
        "osteoease"         => 2,
        "argam-serum"       => 3,
        "sun-protection"    => 3,
        "treatment-shampoo" => 3,
        "conditioner"       => 3,
        "treatment-hair"    => 3,
        "bio-marine"        => 4,
        "celladerm"         => 4,
        "sheep-placenta"    => 4,
        "glucolite"         => 4,
        "nutriq"            => 4,
        "deer-placenta"     => 4
    );

    public function __construct()
    {
        $file = basename($_SERVER['PHP_SELF']);
        $info = pathinfo($file);
        $this->filename =  basename($file,'.'.$info['extension']);
    }

    public function checkActiveClass($nth)
    {
        $result = "";

        if($this->top_menu[$nth] == $this->filename){
            $result = "active";
        }
        elseif(count($this->submenu_menu)){
            foreach ($this->submenu_menu as $key => $value) {
                if($key == $this->filename && $value == $nth){
                    $result = "active";
                }
            }
        }

        return $result;
    }
}