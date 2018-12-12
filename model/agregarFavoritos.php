<?php
include 'conexion.php';

$id = $_POST['id'];
$titulo = $_POST['titulo'];
$descripcion = $_POST['descripcion'];
$detalle = $_POST['detalle'];
$imagen = $_POST['imagen'];

$consulta = "INSERT INTO `favorito`(`id`,`titulo`, `descripcion`, `detalle`, `imagen`) VALUES ('$id','$titulo', '$descripcion', '$detalle', '$imagen')";
$respuesta = false;
mysqli_query($conexion,$consulta);
if(mysqli_affected_rows($conexion) > 0){
    $respuesta = true;
}
$salida = array('respuesta' => $respuesta);
print json_encode($salida);
?>