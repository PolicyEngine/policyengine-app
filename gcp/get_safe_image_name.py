import argparse


def get_safe_image_name(image_name):
    # Replace all /, ?, . and = from the path and query string combined with -.
    # This is to make sure that the image name is safe to use as a filename.
    # First, drop the https:// and http:// from the image name and start it with a /
    if ".org" in image_name:
        image_name = image_name.split(".org")[1]
    if ":5000" in image_name:
        image_name = image_name.split(":5000")[1]
    if ":3000" in image_name:
        image_name = image_name.split(":3000")[1]
    image_name = (
        image_name.replace("/", "-")
        .replace("?", "-")
        .replace("=", "-")
        .replace(".", "-")
        .replace("&", "-")
    )
    return image_name


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("image_name", type=str, help="The name of the image")
    args = parser.parse_args()
    print(get_safe_image_name(args.image_name))
