angular.module("Reproductor", [])
    .controller("ControladorReproductor", function ($scope, $http) {

        $scope.artistaSeleccionado = "";
        $scope.artistas = [];
        $scope.canciones = [];
        $scope.cancionSeleccionada = "";
        $scope.rutaCanciones = "";
        $scope.reproductor = new Audio();
        $scope.duracion = 0;
        $scope.tiempoActual = 0;

        //cargue de los datos (solo posible mediante servicio)
        $http.get("datos/Musiteca.json")
            .then(function (datos) {
                $scope.artistas = datos.data.Artistas;
            });

        $scope.seleccionarArtista = function (artista) {

            $scope.canciones = artista.Canciones;
            $scope.artistaSeleccionado = artista.Nombre;

        }

        $scope.seleccionarCancion = function (cancion) {
            $scope.cancionSeleccionada = cancion.Titulo + " - " + $scope.artistaSeleccionado;
            $scope.rutaCancion = "canciones/" + $scope.artistaSeleccionado + " - " + cancion.Titulo + ".mp3";
            if ($scope.reproductor.src !== $scope.rutaCancion) {
                $scope.reproductor.src = $scope.rutaCancion;
                $scope.duracion = $scope.reproductor.duration;
                $scope.tiempoActual = 0;
            }

            $scope.reproducir = function () {
                $scope.reproductor.play();
            }


        }

        $scope.pausar = function () {
            $scope.reproductor.pause();
        }


        $scope.ubicarTiempoCancion = function () {
            $scope.reproductor.currentTime = $scope.tiempoActual;

        }

    });
