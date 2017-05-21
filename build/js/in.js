var app = angular.module('myApp', []);


app.controller('InCtrl', function($scope,$http,$location,$filter) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    host='http://192.168.1.40:1000/'


    $scope.tallas = [{
	  id: 1,
	  nombre: 'S',
	}, {
	  id: 2,
	  nombre: 'M',
	},
	{
	  id: 3,
	  nombre: 'X',
	},
	{
	  id: 4,
	  nombre: 'XL',
	}



	];



	i=0
	j=0
	k=0
	l=0
	m=0

    $scope.almacen = function () {



    	i=i+1

    	var resto = i % 2; 

    	console.log(resto)

    	if (resto==0){

    		$scope.alm = false

    	}
    	else{

    		$scope.alm = true
    		$scope.cen= false
    		$scope.tor=false
    		j=0
    		k=0

    	}

    }

       $scope.torre = function () {

    	j=j+1

    	var resto = j % 2; 

    	console.log(resto)

    	if (resto==0){

    		$scope.tor = false

    	}
    	else{

    		$scope.tor = true
    		$scope.alm=false
    		$scope.cen=false
    		i=0
    		k=0

    	}

    }

       $scope.centro = function () {

    	k=k+1

    	var resto = k % 2; 

    	console.log(resto)

    	if (resto==0){

    		$scope.cen = false
    	}
    	else{

    		$scope.cen = true
    		$scope.alm=false
    		$scope.tor=false
    		i=0
    		j=0

    	}

    }


       $scope.entrada = function () {

    	l=l+1

      $scope.listado = $scope.listadoentrada

    	$scope.form=true

    	var resto = l % 2; 

    	console.log(resto)

    	if (l>0){

    		$scope.ent = true
    		$scope.sal =false
    	}
   

    }


          $scope.salida = function () {

          	$scope.form=true

            $scope.listado=$scope.listadosalida

    	m=m+1

    	var resto = m % 2; 

    	console.log(resto)

    	if (m>0){

    		$scope.sal = true
    		$scope.ent =false
    	}
    

    }


      $http.get(host+'modelos').success(function(data) {


      	console.log('iiii',data)

      	$scope.modelos = data
    
      })

      $http.get(host+'proveedores').success(function(data) {


        console.log('proveedores',data)

        $scope.proveedores = data
    
      })

        $http.get(host+'listado').success(function(data) {


      	$scope.listado = data
    
      })


      $http.get(host+'colores').success(function(data) {


      	console.log('iiii',data)

      	$scope.colores = data
    
      })

      $http.get(host+'ubicacion').success(function(data) {

      	$scope.ubicacion = data
    
      })

       $http.get(host+'tallas').success(function(data) {

      	$scope.tallas = data
    
      })

      $http.get(host+'listado').success(function(data) {

      	$scope.listado = data

        $scope.listadoentrada  = $filter('filter')($scope.listado,{ 'tipo' : 'Entrada'})

        $scope.listadosalida  = $filter('filter')($scope.listado,{ 'tipo' : 'Salida'})
    
      })


      $scope.eliminap = function(data){

          $http.get(host+'elimina/'+data).success(function(data) {

                      $http.get(host+'listado').success(function(data) {

                      $scope.listado = data

                      $scope.listadoentrada  = $filter('filter')($scope.listado,{ 'tipo' : 'Entrada'})

                      $scope.listadosalida  = $filter('filter')($scope.listado,{ 'tipo' : 'Salida'})

                      })




        
          })

      }

      $scope.traertotalizador = function(data){

        console.log(data)

        $scope.id_modelo = data

        $http.get(host+'totalizador/'+data+'/'+5).success(function(data) {

          console.log('hhdhd',data[0])

          $scope.totaldata = data

    
        })


      }

       $scope.trae = function(data){

          if (data==5){

          $scope.titulo ='Almacen'

        }
         if (data==2){

          $scope.titulo ='Torre'

        }


        if (data==3){

          $scope.titulo ='Centro'

        }


        $http.get(host+'total/'+data).success(function(data) {

          

          $scope.totalxubicacion = data

          console.log('$scope.totalxubicacion',$scope.totalxubicacion)



    
        })



      }



      $http.get(host+'total/5').success(function(data) {

          

          $scope.totalxubicacion = data

          console.log('$scope.totalxubicacion',$scope.totalxubicacion)



    
        })



      

      $scope.yy='hhfhfhf'




      $scope.enviar = function(data){

      	if ($scope.ent==true){


      	data.tipo = 'Entrada'


      	}

      	if ($scope.sal==true){


      	data.tipo = 'Salida'


      	}


      	console.log(data)


      	  $http({

          url: host+"ingreso",
          data: data,
          method: 'POST'

          }).
          success(function(data) {


            $http.get(host+'listado').success(function(data) {

            $scope.listado = data

                    $scope.listadoentrada  = $filter('filter')($scope.listado,{ 'tipo' : 'Entrada'})

        $scope.listadosalida  = $filter('filter')($scope.listado,{ 'tipo' : 'Salida'})

            })


          });



      }










});