const mysql = require('mysql'); //npm i mysql

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123321",
    database: "mydb"
  });
  
  //Insert data
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO tasks (description,done) VALUES ('Running', '0')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    //Search task
    let searchParam="Run";
    con.query(`SELECT * FROM tasks WHERE description LIKE '%${searchParam}%'`, function (err, result) {
        if (err) throw err;
        console.log(result);
    });

    //Delete task
    let id = 1;
    con.query(`DELETE FROM tasks WHERE id = ${id}`, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });

    //Update task
    con.query(`UPDATE tasks SET done = true WHERE id=4`, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });

  });

