install:
	npm install
build:
	npm run build
debug:
	npm start
deploy:
	cp gcp/* .
	y | gcloud app deploy --project policyengine-app
	rm app.yaml
	rm .gcloudignore
	rm app.py
