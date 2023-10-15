install:
	npm ci
build:
	npm run build
debug-no-lint:
	ESLINT_NO_DEV_ERRORS=true npm start
debug:
	npm start
test:
	npm run test
deploy-setup:
	cp gcp/.gcloudignore ./.gcloudignore
	cp gcp/app.yaml ./app.yaml
	cp gcp/main.py ./main.py
	cp gcp/social_card_tags.py ./social_card_tags.py
	cp gcp/requirements.txt ./requirements.txt
deploy: build deploy-setup
	gcloud config set app/cloud_build_timeout 1000
	y | gcloud app deploy --project policyengine-app
	rm app.yaml
	rm .gcloudignore
	rm main.py
	rm requirements.txt
format:
	black . -l 79
