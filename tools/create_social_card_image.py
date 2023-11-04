from PIL import Image, ImageDraw, ImageFont
from argparse import ArgumentParser

LOGO = "./src/redesign/images/logos/policyengine/profile/blue_bg.png"
ROBOTO_SERIF_FONT = "./tools/RobotoSerif.ttf"
SIZE_MULTIPLIER = 2


def create_social_card(
    title: str,
    image_path: str,
    output_path: str = "social_card.png",
):
    # Create a social card with the given title and image.
    # Put a blue bar at the bottom overlaid with the title.

    # Load the image. 800px by 418px is the ideal size.
    image = Image.open(image_path)
    image_width, image_height = image.size
    # Cover height and width, centred, without stretching
    aspect_ratio = image_width / image_height
    if aspect_ratio > 800 / 418:
        # Too wide
        new_width = int(418 * aspect_ratio)
        new_height = 418
    else:
        # Too tall
        new_width = 800
        new_height = int(800 / aspect_ratio)
    image = image.resize(
        (new_width * SIZE_MULTIPLIER, new_height * SIZE_MULTIPLIER)
    )

    # Create a blank canvas
    canvas = Image.new(
        "RGB",
        (800 * SIZE_MULTIPLIER, 418 * SIZE_MULTIPLIER),
        color=(255, 255, 255),
    )
    # Paste the image
    canvas.paste(image, (0, 0))

    # Create a blue bar at the bottom
    draw = ImageDraw.Draw(canvas)
    draw.rectangle(
        [
            (0 * SIZE_MULTIPLIER, (418 - 70) * SIZE_MULTIPLIER),
            (800 * SIZE_MULTIPLIER, 418 * SIZE_MULTIPLIER),
        ],
        fill=(44, 100, 150),
    )

    # Load a font- Roboto Serif
    font = ImageFont.truetype(ROBOTO_SERIF_FONT, 25 * SIZE_MULTIPLIER)
    # Get the size of the text
    _, text_height = draw.textsize(title, font=font)
    # Calculate the position of the text. Should be inside the box
    text_x = 20 * SIZE_MULTIPLIER
    text_y = (418 - 70) * SIZE_MULTIPLIER + (
        70 * SIZE_MULTIPLIER - text_height
    ) / 2
    # Draw the text with colour
    draw.text((text_x, text_y), title, font=font)

    # Add the logo to the bottom right
    logo = Image.open(LOGO)
    logo = logo.resize((60 * SIZE_MULTIPLIER, 60 * SIZE_MULTIPLIER))
    canvas.paste(
        logo,
        ((800 - 60 - 20) * SIZE_MULTIPLIER, (418 - 45 - 20) * SIZE_MULTIPLIER),
    )

    # Save the image
    canvas.save(output_path)


if __name__ == "__main__":
    parser = ArgumentParser()
    # Args: title, image_path, output_path
    parser.add_argument("title", type=str)
    parser.add_argument("image_path", type=str)
    parser.add_argument("output_path", type=str)
    args = parser.parse_args()

    create_social_card(args.title, args.image_path, args.output_path)
