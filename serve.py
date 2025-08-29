#!/usr/bin/env python3
import http.server
import socketserver
import os

# Change to the directory containing the website files
os.chdir(r'C:\Users\akshay.bapat\Downloads\Hoskbrew\52.71.178.156')

PORT = 8080
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print(f"Press Ctrl+C to stop the server")
    httpd.serve_forever()