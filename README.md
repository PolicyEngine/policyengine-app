# Welcome :wave: !

This is the official front-end app of PolicyEngine, a non-profit with the mission of computing the impact of public policy for the world. <br/><br/>
![PolicyEngineWebApp](https://github.com/PolicyEngine/policyengine-app/assets/14987227/70a1a74f-4585-42ec-8642-e4f4f6c2088b)

# Prerequisites

We recommend that you use the latest Node version 19. To easily manage your node versions, get the Node Version Manager [nvm](https://github.com/nvm-sh/nvm) and then do

```
nvm install 19 && nvm use 19
```

# Contributing

## Choosing an Issue

All of our code changes are made against a GitHub issue. If you're new to the project, go to **Issues** and search for good first issues `label: "good first issue"`.

We also maintain a priority issue board, available [here](https://github.com/orgs/PolicyEngine/projects/12) or under the **Projects** tab > **App Repo Management** > **Issue Tracker**.

Currently, we don't assign contributors. If you see an open issue that no one's opened a PR against, it's all yours! Feel free to make some edits, then open a PR, as described below.

## Setting Up

1. Fork the repo

```
https://github.com/PolicyEngine/policyengine-app/fork
```

2. Install dependencies

```
make install
```

3. Start a server on localhost to see your changes

```
make debug
```

Now you're ready to start developing!

## Testing

You've finished your contribution, but now what? 

To test your changes against our series of automated tests, run

```
make test
```

We also recommend, but do not yet require, that you add tests for any new features or bug-fixes you add, so we can gradually build up the code coverage. We use [Jest](https://jestjs.io/docs/tutorial-react) and the [React Testing Library](https://github.com/testing-library/react-testing-library). You can run your tests locally with `make test` and they will be run again in the PR pre-flight.

We also use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to lint our codebase. Before opening a pull request, please be sure to run
```
make format
```
This will automatically lint your code for you. Linting is also checked in the PR pre-flight.

## Opening a Pull Request

Now you've finished your contribution! Please open a pull request (PR) from your fork against the `master` branch. At times, it may take some time for the team to review your PR, especially for larger contributions, so please be patient--we will be sure to get to it.

In the first line of your PR, please make sure to include the following:
```
Fixes {issue_number}
```
This makes it much easier for us to maintain and prune our issue board.

Please try to be detailed in your PRs about the changes you made and why you made them. You may find yourself looking back at them for reference in the future, or needing insight about someone else's changes. We've included a template, but please feel free to add as much as you can. Save yourself a conversation and write it all in the PR!

Here are some [best practices](https://deepsource.io/blog/git-best-practices/) for using Git.

When you're ready for review, switch the PR from `Draft` to `Ready for review` and add a contributor as a reviewer.

# License

Distributed under the AGPL License. See `LICENCE` for more info.

# Acknowledgements

Thanks to Othneil Drew for his [README template](https://github.com/othneildrew/Best-README-Template).
