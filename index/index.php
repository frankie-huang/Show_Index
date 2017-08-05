<?php
header("Content-Type: text/html;charset=utf-8");
// if(PHP_OS=='WINNT'){
//     $dir="F:\\phpStudy\\WWW\\frankie";
// }else{
//     $dir="/var/www/";
// }

//获取当前目录，以'*'结尾便于截取最后一个目录
$dir=dirname(__FILE__).'*';

//判断是windows或是linux/Mac
if(PHP_OS=='WINNT'){
    //去掉目录最后一个，定位到父目录
    $dir=preg_replace('/\\\\\w+\*/','',$dir);

    //获取父目录下的所有文件
    $file=scandir($dir);

    //获取父目录名称
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

//返回数组，最后一个标志系统，倒数第二个是父目录名称
array_push($file,$dirone);
array_push($file,PHP_OS);
$file=json_encode($file);
print_r($file);

?>