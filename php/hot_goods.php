<?php
include "conn.php";
$conn->query('SET NAMES UTF8');//设置字符集
$result=$conn->query("select * from  hot_goods");
$arr=array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}
echo json_encode($arr) ;