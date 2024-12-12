<?php
header('Content-Type: application/json');

$productName = isset($_GET['productName']) ? trim($_GET['productName']) : '';

$file = fopen("product.txt", "r");
$result = [];
$found = false;

if ($file) {
    while (!feof($file) && !$found) {
        $line = fgets($file);
        if ($line) {
            $line = rtrim($line);
            $parts = explode(":", $line, 2); // Split only into 2 parts
            if (strtolower($productName) === strtolower(trim($parts[0]))) {
                $result = ['name' => $parts[0], 'description' => $parts[1], 'image' => strtolower(str_replace(' ', '-', $parts[0])) . '.png'];
                $found = true;
            }
        }
    }
    fclose($file);
}

if ($found) {
    echo json_encode(['success' => true, 'data' => $result]);
} else {
    // Debug: Return the search term for verification
    echo json_encode(['success' => false, 'message' => 'Product not found', 'searchedFor' => $productName]);
}
?>
