
<?php
include "conn.php";
$conn->query('SET NAMES UTF8');//设置字符集
if(isset($_POST['username'])){
    $user=$_POST['username'];
    $password=sha1($_POST['password']);
   $result= $conn->query("select * from register where username='$user'and password='$password'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}