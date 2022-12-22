from flask import Flask, send_from_directory, request, redirect
from pathlib import Path

app = Flask(__name__, static_folder="build")

# Should redirect to https


@app.before_request
def before_request():
    if request.url.startswith("http://"):
        url = request.url.replace("http://", "https://", 1)
        code = 301
        return redirect(url, code=code)


@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path == "":
        return send_from_directory(app.static_folder, "index.html")
    else:
        try:
            return send_from_directory(app.static_folder, path)
        except FileNotFoundError:
            return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def page_not_found(e):
    if request.path.startswith("/static/js/main."):
        js_file = next(
            Path(app.static_folder).joinpath("static/js").glob("*.js")
        )
        return send_from_directory(js_file.parent, js_file.name)
    if request.path.startswith("/static/css/main."):
        css_file = next(
            Path(app.static_folder).joinpath("static/css").glob("*.css")
        )
        return send_from_directory(css_file.parent, css_file.name)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run()
