Remove-Item -Recurse -Force "./static"
Copy-Item "./build/*" -Destination "./" -Recurse -force