install:
	npm install
build:
	npm run build
debug:
	npm start
deploy:
	cp gcp/.gcloudignore ./.gcloudignore
	cp gcp/app.yaml ./app.yaml
	cp gcp/app.py ./app.py
	y | gcloud app deploy --project policyengine-app
	rm app.yaml
	rm .gcloudignore
	rm app.py
