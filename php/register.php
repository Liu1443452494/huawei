<?php
include "conn.php";
$conn->query('SET NAMES UTF8');//设置字符集
if(isset($_POST['username'])){
    $uesr=$_POST['username'];
    $password=sha1($_POST['password']);
    $conn->query("insert register values(null,'$uesr','$password')");
}
if(isset($_POST['user'])){
    $user=$_POST['user'];
    $result=$conn->query("select * from register where username='$user'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}