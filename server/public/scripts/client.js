var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  // .when('/home', {
  //   templateUrl: '/views/templates/home.html',
  //   controller: 'HomeController'
  // })
  .when('/employees', {
    templateUrl: '/views/templates/employees.html',
    controller: 'EmployeeController',
    controllerAs: 'employees'
  })
  .otherwise({
    redirectTo: 'employees'
  });
}]);

app.controller("EmployeeController", ["$http", function($http){
  console.log('running');

  var self = this;
  self.newEmployee = {};
  self.totalMonthlyExpenditure = 0;
  self.employees = [];
  getEmployees();

  console.log("Array of employees", self.employees);



  function getEmployees() {
    self.totalMonthlyExpenditure = 0;
    $http.get('/employees')
    .then(function(response) {
      self.employees = response.data;
      self.employees.forEach(function(employee){
          if(employee.active){
            self.totalMonthlyExpenditure += employee.annual_salary;
          }
        });
      self.totalMonthlyExpenditure = self.totalMonthlyExpenditure / 12;
    });
  };

  self.addEmployee = function() {
    $http.post('/employees', self.newEmployee)
      .then(function(response) {
        console.log('POST finished. Get employees again.');
        getEmployees();
        self.newEmployee = {};
      });
  }

  self.updateActive = function(employee) {
    var isActive = {};
    isActive.active = !employee.active;
    console.log(isActive);
    $http.put('/employees/'+employee.id, isActive)
      .then(function(response) {
        console.log('UPDATE finished. Get employees again.');
        getEmployees();
      });
  }

  // self.deleteEmployee = function(employee){
  //   $http.delete('/employees/'+ employee.id)
  //     .then(function(response){
  //       console.log('DELETE finished. Get employees again.');
  //       getEmployees();
  //     });
  // }
}]);
