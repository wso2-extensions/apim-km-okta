# Integrate Okta as a Third Party Key Manager for WSO2 API Manager

This Okta key manager implementation allows you to integrate the WSO2 API Developer Portal with an external Identity and Access Management server (IAM)
by using the Okta OAuth Authorization Server to manage the OAuth clients and tokens required
by WSO2 API Manager. We have a sample client implementation that consumes the APIs exposed by Okta OAuth.

## Getting Started

To get started, go to [Integrate WSO2 API Develper Portal with an external IAM using the Okta OAuth authorization server](docs/config.md). 

## Build

APIM 3.x version related code can be found in the master branch. APIM 2.6 related code can be found in 2.x branch

Use the following command to build this implementation
`mvn clean install`

## How You Can Contribute

To contribute to the Okta key manager development, fork the github repository and send your pull requests to
[https://github.com/wso2-extensions/apim-keymanager-okta](https://github.com/wso2-extensions/apim-keymanager-okta)
