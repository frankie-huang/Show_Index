<?php
header("Content-Type: text/html;charset=utf-8");
// if(PHP_OS=='WINNT'){
//     $dir="F:\\phpStudy\\WWW\\frankie";
// }else{
//     $dir="/var/www/";
// }
$dir=dirname(__FILE__).'*';
var_dump($dir);
if(PHP_OS=='WINNT'){
    $dir=preg_replace('/\\\\\w+\*/','',$dir);
    $file=scandir($dir);
    $dirone=preg_match('/\w+\*/',$dir.'*',$matchs);
    if($dirone==1){
        $dirone=preg_replace('/\*/','',$matchs[0]);
    }else{
        print_r(0);
    }
}else{
    $dir=preg_replace('/\/\w+\*/','',$dir);
    $file=scandir($dir);
    $dirone=preg_match('/\w+\*/',$dir.'*',$matchs);
    if($dirone==1){
        $dirone=preg_replace('/\*/','',$matchs[0]);
    }else{
        print_r(0);
    }
}
array_push($file,$dirone);
array_push($file,PHP_OS);
$file=json_encode($file);
print_r($file);
?>