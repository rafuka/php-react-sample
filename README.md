# Practice app with React, PHP and MySQL

## Required software

* MySQL server
* php7 (with mysqli)
* npm version >= 6.4.1
* node version >= 10.8.0

## Usage

The following are instruction to test this app locally:

1. Clone the repo
2. `npm install` it
3. Make sure you have PHP version 7
4. Create a MySQL database with any name you'd like
5. Update the `config.php` file on this repo to reflect the credentials and info for accessing the database. Specifically the user, database name, and user password.
6. Run the `db.sql` script in the `server` folder to create the necessary tables and populate them with some data.

sudo mysql -u <username> -p < db.sql

