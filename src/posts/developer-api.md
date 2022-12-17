
# How developers can explore the PolicyEngine API

The UK API explorer and US API explorer describe variables and policy parameters in our models.

Most of our users interact with PolicyEngine via our [UK](http://policyengine.org/uk) and [US](http://policyengine.org/us) web apps, where they enter household information and policy reforms to compute the impact of customisable tax and benefit policy. We’ve also made this information available to developers through our [Python](http://openfisca.us) [packages](http://openfisca.uk) and [web API](https://docs.google.com/document/u/1/d/1y-kRDOssYyRwEVTsntqGxoBtvFS4HKMQD-U0Ga9YzJE/preview). Today, we’re launching **companion tools in the [UK](http://policyengine.org/uk/api-explorer) and [US](http://policyengine.org/us/api-explorer)** to explore core components of our API: variables and policy parameters.

## What the PolicyEngine API does

Anything you can do with the PolicyEngine app, you can do with our API. Here are some examples:

1. Get parameters in our tax-benefit model, along with details about their current value, their data type and their descriptions ([policyengine.org/uk/parameters](https://policyengine.org/uk/parameters))

1. Get variables in our tax-benefit model, along with details about their current value, their data type and their descriptions ([policyengine.org/uk/parameters](https://policyengine.org/uk/parameters))

1. Calculate tax-benefit variables for a given household ([policyengine.org/us/calculate](https://policyengine.org/uk/calculate))

![*A [Google Colab notebook](https://colab.research.google.com/drive/1dvmYfLKwDWLnn3gJyqmQmVTw3VQ7Qx-a?usp=sharing) showing how to use PolicyEngine’s /us/calculate endpoint to calculate a household’s Supplemental Nutrition Assistance Program benefit based on their employment income.*](https://cdn-images-1.medium.com/max/2000/0*gtH3HDNHXxtFKrlN)**A [Google Colab notebook](https://colab.research.google.com/drive/1dvmYfLKwDWLnn3gJyqmQmVTw3VQ7Qx-a?usp=sharing) showing how to use PolicyEngine’s /us/calculate endpoint to calculate a household’s Supplemental Nutrition Assistance Program benefit based on their employment income.**

Using this requires knowing the variables and parameters available, and what they represent. Until now, API users had to extract all of them, or consult our [openfisca-us](http://github.com/policyengine/openfisca-us) or [openfisca-uk](http://github.com/policyengine/openfisca-uk) repos. Now, it’s as simple as searching in [policyengine.org/uk/api-explorer](https://policyengine.org/uk/api-explorer) or [policyengine.org/us/api-explorer](https://policyengine.org/us/api-explorer).

## The API explorer

Inspired by other OpenFisca country models (for example, [OpenFisca-France’s legislation explorer](https://legislation.fr.openfisca.org/)), [policyengine.org/uk/api-explorer](https://policyengine.org/uk/api-explorer) and [policyengine.org/us/api-explorer](https://policyengine.org/us/api-explorer) display metadata for any variable or policy parameter.

The API explorer includes a search interface, which lists variables and parameters with similar names. Selecting one provides detail about it on the right, such as the entity, period, and default value for variables.

![*PolicyEngine’s [US API explorer](https://policyengine.org/us/api-explorer/snap) after searching for “snap” and selecting the snap variable.*](https://cdn-images-1.medium.com/max/3200/0*Z4p3pNn8Lt08PIXd)**PolicyEngine’s [US API explorer](https://policyengine.org/us/api-explorer/snap) after searching for “snap” and selecting the snap variable.**

For parameters, the API explorer shows the description, the location in the Python package’s parameter tree, and the current value.

![*PolicyEngine’s [UK API explorer](https://policyengine.org/uk/api-explorer/personal_allowance) after searching for “personal allowance” and selecting the personal_allowance parameter.*](https://cdn-images-1.medium.com/max/3200/0*K1vybVl3GOAxJrva)**PolicyEngine’s [UK API explorer](https://policyengine.org/uk/api-explorer/personal_allowance) after searching for “personal allowance” and selecting the personal_allowance parameter.**

If you’d like to use the PolicyEngine API, please [get in touch](mailto:hello@policyengine.org). We’re excited to see what new products developers build using our open-source tax-benefit models!
