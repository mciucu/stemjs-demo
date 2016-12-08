# stemjs-demo

### Installation instructions:

Run ```init.sh```


### Running:

The simplest way to get the website up and running:
(using Python's SimpleHttpServer)

```python -m SimpleHTTPServer```


### Useful information:

Rollup can be run (from the src folder) with the ```-c --watch``` options to monitor for any file changes
and recompile.

``` rollup -c --watch ```

However note that it may occasionally crash.
One way to get around this is to run it in a continuous loop:

``` while true; do rollup -c --watch; done ```


