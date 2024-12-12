<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<link href="styles.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
	</head>
	<body>
		<?php 
		include "top.php";
		$user = $_POST['username'];
		$password = $_POST['password'];

		login();

		function login() {
			// use global variables
			global $user, $password;

			// open file to read info
			$filer = fopen('users.txt', 'r');

			$flag = false;

			// feof (end of file) returns true if there are more lines after and returns false if there are no more lines
			while(!(feof($filer))) {

				// get line from file
				$line = fgets($filer);

				// remove \n from line
				$line = rtrim($line);

				// split line on colon
				$list = explode(':', $line);

				// check to see if there's a match between txt and user input
				if ($user == $list[0] && $password == $list[1]) {
					$flag = true;
					header("Location: https://i6.cims.nyu.edu/~ml8098/final/home.html");
					exit();
					break;
				}
			}

			// check to see if flag = false
			if ($flag == false) {
				print('<br><br><p>Your username and/or password is incorrect.</p>');
				print('<br><a href="signin.html"><p class="tryagain">Try again</p></a>');
			}
		}

		?>
	</body>
</html>
