REACT_APP_DEBUG ?= false

install:
	bun install --frozen-lockfile
	pip3 install -U black

build:
	bun run build

debug-no-lint:
	ESLINT_NO_DEV_ERRORS=true bun run start

debug:
	REACT_APP_DEBUG=true bun run start

test:
	node metadata_fetch.mjs
	bun run test

deploy-setup:
	cp gcp/.gcloudignore ./.gcloudignore
	cp gcp/app.yaml ./app.yaml
	cp gcp/main.py ./main.py
	cp gcp/social_card_tags.py ./social_card_tags.py
	cp gcp/requirements.txt ./requirements.txt
	cp -r social_cards/ build/static/media/social_cards

deploy: build deploy-setup
	gcloud config set app/cloud_build_timeout 1000
	y | gcloud app deploy --project policyengine-app
	rm app.yaml
	rm .gcloudignore
	rm main.py
	rm requirements.txt

format:
	black . -l 79
	bun run fix
