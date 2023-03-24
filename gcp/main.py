from flask import Flask, send_from_directory, request, redirect
from pathlib import Path
from gcp.social_card_tags import add_social_card_tags

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
    return r


def send_index_html():
    # Load the index.html file contents and send it
    with open(app.static_folder + "/index.html") as f:
        index_html = f.read()
    try:
        index_html = add_social_card_tags(
            index_html, request.path, request.args
        )
    except Exception as e:
        pass
    # Return with correct headers
    return index_html, 200, {"Content-Type": "text/html"}


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path == "":
        return send_index_html()
    else:
        try:
            return send_from_directory(app.static_folder, path)
        except FileNotFoundError:
            return send_index_html()


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
    return send_index_html()


if __name__ == "__main__":
    app.run()
