CREATE TABLE `inventorymanagement`.`item` (`item_id` INT NOT NULL AUTO_INCREMENT , `item_name` VARCHAR(200) NOT NULL , `item_category` VARCHAR(50) NOT NULL , `supplier` VARCHAR(50) NOT NULL , `price` FLOAT NOT NULL , `stock` INT NOT NULL , `desc` TEXT NOT NULL , `date` DATE NOT NULL ) ENGINE = InnoDB;