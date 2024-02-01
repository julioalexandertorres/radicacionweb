<?php
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    //comprobamos si existe un directorio para subir el archivo
    //si no es así, lo creamos
    if (!is_dir("files/"))
        mkdir("files/", 0777);
    $name = [];
    //print_r("php");
    //print_r ($_FILES['GBDfil']['tmp_name']);
        foreach ($_FILES as $key => $error) {
            print_r ($key);
            $tmp_name = $_FILES[$key]['tmp_name'];
            //print_r($tmp_name);
            // basename() may prevent filesystem traversal attacks;
            // further validation/sanitation of the filename may be appropriate
            $name[$key] = basename($_FILES[$key]['name']);
            move_uploaded_file($tmp_name, "files/".$name[$key]);
        }
    //exec("python.py");
    $arr = implode(",", $name);
    echo $arr;
    /*$query = 'psql -h 104.154.211.159 -d Barranquilla -U postgres -c "copy reg1 from STDIN with delimiter as ';';" < C:/Bitnami/wampstack-5.6.30-2/apache2/htdocs/barranquilla/import/files/re1.csv';
    print_r ($query);
    exec($query);*/
} else {
    throw new Exception("Error Processing Request", 1);
}
?>
