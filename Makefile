install:
	npm install
build:
	npm run build
debug:
	npm start
deploy-setup:
	cp gcp/.gcloudignore ./.gcloudignore
	cp gcp/app.yaml ./app.yaml
	cp gcp/main.py ./main.py
	cp gcp/requirements.txt ./requirements.txt
deploy: deploy-setup build
	y | gcloud app deploy --project policyengine-app
	rm app.yaml
	rm .gcloudignore
	rm main.py
	rm requirements.txt
format:
	black . -l 79
