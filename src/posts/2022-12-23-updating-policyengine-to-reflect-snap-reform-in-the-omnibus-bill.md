# Updating PolicyEngine to reflect SNAP reform in the omnibus bill

A step-by-step guide to syncing our code with the latest legislation

![](https://cdn-images-1.medium.com/max/5812/1*yzcpIgHZDulGcD9o8Qqaag.png)

The US Senate has recently passed the [Consolidated Appropriations Act of 2023](https://www.appropriations.senate.gov/imo/media/doc/JRQ121922.PDF), also known as the omnibus bill. If the House of Representatives and President Biden sign it, it will create or amend several federal programs. One of these programs is the Supplemental Nutrition Assistance Program (SNAP), which is modeled by PolicyEngine in the US. The omnibus bill will terminate SNAP emergency allotments after February 2023 payments. Previously, the Families First Coronavirus Response Act authorized emergency allotments to provide additional assistance to SNAP-eligible households. PolicyEngine uses a [dataset of emergency allotment policies from snapscreener.com](https://www.snapscreener.com/blog/emergency-allotments), which currently shows that emergency allotments are active in 34 states and the District of Columbia.

In the accompanying video, we demonstrate the process we follow to update our open source code to reflect policy reforms such as this one. This process includes [filing an issue](https://github.com/PolicyEngine/policyengine-us/issues/1591), creating a new Git branch, writing a test using test-driven development, updating the logic, and passing the test before [filing a pull request](https://github.com/PolicyEngine/policyengine-us/pull/1592).

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/lW83x3JgNcU" frameborder="0" allowfullscreen></iframe></center>

If you are interested in contributing to our open source software, we welcome assistance with modeling new policies, improving our architecture, and building user-friendly experiences for those learning about taxes and benefits or designing policy reforms. Please reach out to me at [max@policyengine.org](mailto:max@policyengine.org) if you would like to join our team.
