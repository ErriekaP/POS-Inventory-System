const mysql = require('mysql');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// View Items
exports.view = (req,res) => {

//Connect to DB
pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)
    //User the connection
    connection.query('SELECT * FROM item',(err,rows) => {
        // When done with the connection, release it
        connection.release();

        if(!err){
            res.render('home', {rows});
        } else{
            console.log(err);
        }

        console.log('The data from user table: \n', rows);


    });
});
};

//View Items POS
exports.items = (req,res) => {

//Connect to DB
pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)
    //User the connection
    connection.query('SELECT * FROM item',(err,rows) => {
        // When done with the connection, release it
        connection.release();

        if(!err){
            res.render('pos', {rows});
        } else{
            console.log(err);
        }

        console.log('The data from user table: \n', rows);


    });
});
};

//View Items Inventory
exports.invitems = (req,res) => {

    //Connect to DB
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('SELECT * FROM item',(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('inventory', {rows});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
    };


//Find item by search
exports.find = (req,res) => {

pool.getConnection((err,connection) => {
    if(err) throw err; //not connected!
    console.log('Connected as ID' + " " + connection.threadId)

    let searchTerm = req.body.search;

    //User the connection
    connection.query('SELECT * FROM item WHERE item_name LIKE ? OR item_category LIKE ? OR supplier LIKE ? ', ['%' + searchTerm + '%','%' + searchTerm + '%' ,'%' + searchTerm + '%'],(err,rows) => {
        // When done with the connection, release it
        connection.release();

        if(!err){
            res.render('home', {rows});
        } else{
            console.log(err);
        }

        console.log('The data from user table: \n', rows);


    });
});
}

exports.form = (req,res) => {
    res.render('add-item');
}

//Add new item by search
exports.create = (req,res) => {
  const {item_name, item_category, supplier, price, stock, description, date } = req.body;
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
    
        let searchTerm = req.body.search;
    
        //User the connection
        connection.query('INSERT INTO item SET item_name = ?, item_category = ? , supplier = ?, price = ?, stock = ?, description = ?, date = ?', [item_name,item_category,supplier,price,stock,description,date],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('add-item',{alert: 'Item added successfully.'});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
    

}
//Edit Item
exports.edit = (req,res) => {
    
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('SELECT * FROM item WHERE item_id = ?',[req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('edit-item', {rows});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
}

//Update Item
exports.update = (req,res) => {

    const{item_name, item_category, supplier,price,date,description} = req.body;
    
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('UPDATE item SET item_name = ?, item_category = ? , supplier = ? , price = ? , date = ? , description = ? WHERE item_id = ? ',[item_name, item_category, supplier, price, date, description, req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){

                pool.getConnection((err,connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + " " + connection.threadId)
                    //User the connection
                    connection.query('SELECT * FROM item WHERE item_id = ?',[req.params.id],(err,rows) => {
                        // When done with the connection, release it
                        connection.release();
                
                        if(!err){
                            res.render('edit-item', {rows, alert: `${item_name} has been updated`});
                        } else{
                            console.log(err);
                        }
                
                        console.log('The data from user table: \n', rows);          
                
                    });
                });

            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
}
//Order Item
exports.order = (req,res) => {

    const{item_name, item_category, supplier,price,stock} = req.body;
    
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('UPDATE item SET item_name = ?, item_category = ? , supplier = ? , price = ? , stock = ? WHERE item_id = ? ',[item_name, item_category, supplier, price, stock, req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){

                pool.getConnection((err,connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + " " + connection.threadId)
                    //User the connection
                    connection.query('SELECT * FROM item WHERE item_id = ?',[req.params.id],(err,rows) => {
                        // When done with the connection, release it
                        connection.release();
                
                        if(!err){
                            res.render('edit-item', {rows, alert: `${item_name} has been updated`});
                        } else{
                            console.log(err);
                        }
                
                        console.log('The data from user table: \n', rows);          
                
                    });
                });

            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
}

//View Items
exports.viewall = (req,res) => {

    //Connect to DB
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('SELECT * FROM item WHERE item_id = ?', [req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('view-item', {rows});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
    };

//Customer Tab//

// View Customers
exports.customerget = (req,res) => {

    //Connect to DB
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('SELECT * FROM customer',(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('customer-list', {rows});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
    };

//View Customer Button
exports.viewcust = (req,res) => {

    //Connect to DB
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('SELECT * FROM customer WHERE cust_id = ?', [req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('view-cust', {rows});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
    };

//Edit Customer
exports.editcust = (req,res) => {
    
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('SELECT * FROM customer WHERE cust_id = ?',[req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('edit-cust', {rows});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
}


//Update Customer
exports.updatecustomer = (req,res) => {

    const{cust_first_name, cust_last_name, phone_num} = req.body;
    
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
        //User the connection
        connection.query('UPDATE customer SET cust_first_name = ?, cust_last_name = ? , phone_num = ? WHERE cust_id = ? ',[cust_first_name, cust_last_name, phone_num, req.params.id],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){

                pool.getConnection((err,connection) => {
                    if(err) throw err; //not connected!
                    console.log('Connected as ID' + " " + connection.threadId)
                    //User the connection
                    connection.query('SELECT * FROM customer WHERE cust_id = ?',[req.params.id],(err,rows) => {
                        // When done with the connection, release it
                        connection.release();
                
                        if(!err){
                            res.render('edit-cust', {rows, alert: `${cust_first_name} has been updated`});
                        } else{
                            console.log(err);
                        }
                
                        console.log('The data from user table: \n', rows);          
                
                    });
                });

            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
}

//Find customer by search
exports.find = (req,res) => {

    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected!
        console.log('Connected as ID' + " " + connection.threadId)
    
        let searchTerm = req.body.search;
    
        //User the connection
        connection.query('SELECT * FROM customer WHERE cust_first_name LIKE ? OR cust_last_name LIKE ? ', ['%' + searchTerm + '%','%' + searchTerm + '%' ],(err,rows) => {
            // When done with the connection, release it
            connection.release();
    
            if(!err){
                res.render('customer-list', {rows});
            } else{
                console.log(err);
            }
    
            console.log('The data from user table: \n', rows);
    
    
        });
    });
    }

    exports.get_cust = (req,res) => {
        res.render('add-customer');
    }

    //Add new customer by search
    exports.create_cust = (req,res) => {
      const{ cust_first_name, cust_last_name, phone_num } = req.body;

        pool.getConnection((err,connection) => {
            if(err) throw err; //not connected!
            console.log('Connected as ID' + " " + connection.threadId)
        
            let searchTerm = req.body.search;
        
            //User the connection
            connection.query('INSERT INTO customer SET cust_first_name = ?, cust_last_name = ? , phone_num = ?', [cust_first_name,cust_last_name,phone_num],(err,rows) => {
                // When done with the connection, release it
                connection.release();
        
                if(!err){
                    res.render('add-customer');
                } else{
                    console.log(err);
                }
        
                console.log('The data from user table: \n', rows);
        
        
            });
        });
        
    
    }

/*//Router
router.get('', (req,res) => {
    res.render('home');
});*/
