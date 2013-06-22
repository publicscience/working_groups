To get Three.js to run locally, the best option is to run a webserver so you can load in files/models.

To do this, first make sure you are in the three.js root directory!

From here, you can use python to fire up a simple HTTP server, like so:

python -m SimpleHTTPServer

And that is it!

From there, you can load the webgl_loader_obj.html example in your browser like so:

http://0.0.0.0:8000/examples/webgl_loader_obj.html

It is important your webserver is loaded in the three.js root directory so that it can find essential dependencies in the build folder.
