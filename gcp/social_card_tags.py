import json
from pathlib import Path
from bs4 import BeautifulSoup


# Load src/posts/posts.json
with open("src/posts/posts.json") as f:
    posts: list = json.load(f)
    post_by_slug = {post["filename"].split(".md")[0]: post for post in posts}


def get_title(path: str, query_params: dict):
    # /{country}/page => 'PolicyEngine COUNTRY | Page'

    country = path.split("/")[1].upper()

    if "/blog/" in path:
        slug = path.split("/blog/")[1]
        if slug not in post_by_slug:
            slug = f"{country.lower()}-{slug}"
        post = post_by_slug[slug]
        return f"{post['title']} | PolicyEngine {country}"

    main_text = ""
    if "reform" in query_params:
        main_text += f"Reform #{query_params['reform']} | "

    try:
        page_name = path.split("/")[2].capitalize()
    except IndexError:
        page_name = "Home"
    main_text += f"{page_name} | "
    main_text += f"PolicyEngine {country}"
    return main_text


def get_image(path: str, query_params: dict):
    # Replace all /, ? and = from the path and query string combined with -

    country = path.split("/")[1].upper()
    if len(query_params) > 0:
        joined_query_params = "-".join(
            [f"{k}-{v}" for k, v in query_params.items()]
        )
        path = path + "-" + joined_query_params
    
    original_path = path

    path = (
        path.replace("/", "-")
        .replace("?", "-")
        .replace("=", "-")
        .replace(".", "-")
    )

    # Search the "./social_cards" directory for a file with the same name as the path and any extension
    if "/blog/" in original_path:
        slug = original_path.split("/blog/")[1]
        if slug not in post_by_slug:
            slug = f"{country.lower()}-{slug}"
        post = post_by_slug[slug]
        filename = post["image"].split(".")[0]
        # React builds the image filename as 'original_name.hash.extension'. Find it by searching for the original name
        image_folder = Path("./build/static/media")
        image_files = list(image_folder.glob(f"{filename}.*"))
        if len(image_files) > 0:
            filename = image_files[0].name
            return f"https://policyengine.org/static/media/{filename}"
    
    social_card_folder = Path("./social_cards")
    social_card_files = list(social_card_folder.glob(f"{path}.*"))
    if len(social_card_files) > 0:
        filename = social_card_files[0].name
        return f"https://policyengine.org/static/media/social_cards/{filename}"
    else:
        return f"https://policyengine.org/static/media/social_cards/main_logo.png"


def get_description(path: str, query_params: dict):
    country = path.split("/")[1].upper()

    if "/blog/" in path:
        slug = path.split("/blog/")[1]
        if slug not in post_by_slug:
            slug = f"{country.lower()}-{slug}"
        post = post_by_slug[slug]
        return f"{post['description']}"
    elif "/household/" in path:
        if "reform" in query_params:
            return f"See the impact of reform #{query_params['reform']} on your household on PolicyEngine {country}"
        else:
            return (
                f"Calculate your taxes and benefits on PolicyEngine {country}"
            )
    elif "/policy/" in path:
        if "reform" in query_params:
            return f"See the economic impact of reform #{query_params['reform']} on PolicyEngine {country}"
        return f"See the full the impact of a policy reform on PolicyEngine {country}"


def add_social_card_tags(html_file: str, path: str, query_params: dict = {}):
    # Add social card tags to the html file

    title = get_title(path, query_params)
    description = get_description(path, query_params)
    image_url = get_image(path, query_params)

    # Use beautiful soup to add the tags for Twitter and Facebook
    soup = BeautifulSoup(html_file, "html.parser")
    soup.title.string = title

    # Add meta tags for Twitter
    twitter_card = soup.new_tag(
        "meta",
        attrs={"name": "twitter:card", "content": "summary_large_image"},
    )

    twitter_title = soup.new_tag(
        "meta", attrs={"name": "twitter:title", "content": title}
    )
    twitter_description = soup.new_tag(
        "meta", attrs={"name": "twitter:description", "content": description}
    )
    if image_url:
        twitter_image = soup.new_tag(
            "meta", attrs={"name": "twitter:image", "content": image_url}
        )
        soup.head.append(twitter_image)
    soup.head.append(twitter_card)
    soup.head.append(twitter_title)
    soup.head.append(twitter_description)

    # Add meta tags for Facebook
    og_title = soup.new_tag(
        "meta", attrs={"property": "og:title", "content": title}
    )
    og_description = soup.new_tag(
        "meta", attrs={"property": "og:description", "content": description}
    )
    if image_url:
        og_image = soup.new_tag(
            "meta", attrs={"property": "og:image", "content": image_url}
        )
        soup.head.append(og_image)
    soup.head.append(og_title)
    soup.head.append(og_description)

    return soup.prettify()
