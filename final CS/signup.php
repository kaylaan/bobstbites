<HTML>
	<head>
		<title>Sign Up</title>
		<link rel="stylesheet" href="styles.css">
        <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
	</head>
	<body>
		<?php
			include "top.php";
			$username = $_POST['username'];
			$password = $_POST['password'];

			$filea = fopen("users.txt", "a");
			$line = $username . ":" . $password . "\n";
			fwrite($filea, $line);
			fclose($filea);

			print("<br><br><p>Successfully registered.</p>");
			print("<a href='signin.html'><p class='tryagain'>Log In</p></a>");

		?>
	</body>
</html>
