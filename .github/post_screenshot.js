const fs = require('fs');
const github = require('@actions/github');
const core = require('@actions/core');

// Get input from the GitHub Actions workflow
const pathsStr = core.getInput('paths');
const repository = core.getInput('repository');
const runId = core.getInput('run_id');
const issueNumber = core.getInput('issue_number');
const token = core.getInput('token');

const paths = pathsStr.split(' ').filter(path => path !== '');
let body = '### Screenshots\n';

for (const path of paths) {
  const url = `https://github.com/${repository}/actions/runs/${runId}/artifacts/${path}/raw`;
  body += `#### ${path}\n`;
  body += `<img src="${url}" width="400" />\n`;
}

const octokit = github.getOctokit(token);

octokit.rest.issues.createComment({
  issue_number: issueNumber,
  owner: repository.split('/')[0],
  repo: repository.split('/')[1],
  body: body
});
