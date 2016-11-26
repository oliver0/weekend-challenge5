var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';

router.get('/', function(req,res){
  console.log('reached get route!');
  // get employees from DB
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT id, first_name, last_name, job_title, annual_salary, active '+
                 'FROM employees',
    function(err, result){
      done();

      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
      console.log(result.rows);
      res.send(result.rows);
    });

  });

});

router.post('/', function(req, res){
  console.log('reached post route');
  var employee = req.body;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('INSERT INTO employees (first_name, last_name, job_title, annual_salary) ' +
                  'VALUES ($1, $2, $3, $4)',
    [employee.first_name, employee.last_name, employee.job_title, employee.annual_salary],
    function(err, result){
      done();

      if(err){
        console.log('insert query error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }

    });
  });
});

router.put('/:id', function(req, res) {
  var employeeId = req.params.id;
  console.log("employeeId: ", employeeId);
  var isActive = req.body;
  console.log('is employee active? ', isActive.active);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'UPDATE employees SET active=$1 ' +
      'WHERE id=$2',
      // array of values to use in the query above
      [isActive.active, employeeId],
      function(err, result) {
        if(err) {
          console.log('update error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });
});

router.delete('/:id', function(req, res){
  var employeeId = req.params.id;
  console.log(employeeId);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query('DELETE FROM employees WHERE id = $1',
    [employeeId],
    function(err, result){
      done();

      if(err){
        res.sendStatus(500);
        console.log('delete query error: ', err);
      } else {
        res.sendStatus(200);
      }
    });
  });
});



module.exports = router;
