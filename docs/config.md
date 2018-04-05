# Integrate WSO2 API Store with an external IAM using the Okta OAuth Authorization Server

In this guide, we explain how to integrate the WSO2 API Store with an external Identity and Access Management server (IAM) using the Okta OAuth Authorization Server
to manage the OAuth clients and tokens required by WSO2 API Manager. This is a sample client implementation that consumes APIs exposed by Okta OAuth.
 
## Follow the instructions below to configure the third-party Key Manager

### Step 1 : Prerequisites

Create an Okta developer account. Get the Instance URL, authorization server ID, API Key and configure the access policy and the rule.

1. Go to the [Okta sign up page](https://developer.okta.com/signup/). Create an Okta account and get the Okta instance URL.

   E.g., [https://dev-76342239.oktapreview.com](https://dev-76342239.oktapreview.com)
   
    ![alt text](images/signup.png)
   
   
2. Get the authorization server ID by following the steps below :

    1. Go to the **Authorization Servers** section in the **API** tab.
    2. Create a new authorization server. Alternatively, you can use the default server.
        ![alt text](images/authorization_server.png)

3. Get the API key :
    
    1. Log in to the created account and go to the **API** tab and select **Tokens**.
        ![alt text](images/token.png)
    2. Click **Create Token** and provide the name for the token.
    3. After successful token creation, copy the Token value for the further use.
    
4. Create Access Policies : If you already have at least one access policy in your authorization server, skip the following steps and go to `step 1: (5)`.

    1. In the Okta Developer Dashboard, navigate to **API > Authorization Servers**.
    2. Choose the name of an Authorization Server.
    3. Choose **Access Policies > Add Policy**
    4. Provide the requested information.
        ![alt text](images/access_policy.png)
    5. Click **Create Policy** to save the policy.
    
5. Create Rules for Access Policy : If you already have at least one rule in your access policy,  skip the following steps and go to `step 1: (6)`.
    
    1. In the Okta Developer Dashboard, navigate to **API > Authorization Servers**.
    2. Choose the name of an authorization server, and select **Access Policies**.
    3. Choose the name of an access policy, and select **Add Rule**.
        ![alt text](images/rule.png)
    4. Enter the requested information.
    5. Click **Create Rule** to save the rule.
    
    

### Step 2: Configure WSO2 API Manager

1. Download latest OKTA-OAuth-Client-x.x.x.jar from [here](https://github.com/wso2-extensions/apim-keymanager-okta/releases).
2. Copy that JAR file into the `<API-M_HOME>/repository/components/lib` directory.
3. Uncomment the `<APIKeyManager>` parameter in the `<API-M_HOME>/repository/conf/api-manager.xml` file. 
Change the values based on your third-party API.
>> **Note :** Replace the value of the `<oktaInstanceUrl>` parameter with the client registration endpoint that you obtained in `step 1: (1)`. Replace the value of the `<apiKey>` parameter with the API key obtained in `step 1: (3)`.

>> **Note :** The `org.wso2.okta.client.OktaOAuthClient` class, mentioned in the following example, extends the Key Manager interface.

>> **Note :** Create a common application using `step 3: (3) & (4)`. Obtain the common client id and secret then update the  `<client_id>` and `<client_secret>`. This is only used to authenticate with the introspect endpoint.

```xml
    <APIKeyManager>
       <KeyManagerClientImpl>org.wso2.okta.client.OktaOAuthClient</KeyManagerClientImpl>
       <Configuration>
         <oktaInstanceUrl>https://dev-76342239.oktapreview.com</oktaInstanceUrl>
         <authorizationServerId>default</authorizationServerId>
         <apiKey>00eka_bXcTzsssaaa4W1dvAIbqcSDdmdKqw1</apiKey>
         <client_id>0oadecu24ftznggfL0h7</client_id>
         <client_secret>DpqHUmldfdJVR8kpRhSRB_wpKQg</client_secret>
       </Configuration>
    </APIKeyManager>
```
4. The API Store sub theme is re-written to change the UI for this scenario. Follow the steps below to configure the UI :
    1. Copy the `locale_default.json` file from [here](https://github.com/wso2-extensions/apim-keymanager-okta/blob/OKTA-OAuth-Client-1.0.0/src/main/resources/locale_default.json) and paste it into the `<API-M_HOME>/repository/deployment/server/jaggeryapps/store/site/conf/locales/jaggery` directory.
    2. Copy the `okta` theme folder from [here](https://github.com/wso2-extensions/apim-keymanager-okta/tree/OKTA-OAuth-Client-1.0.0/src/main/resources/okta)
    3. Paste the `okta` theme folder into the `<API-M_HOME>/repository/deployment/server/jaggeryapps/store/site/themes/wso2/subthemes` directory.
    4. Go to the `<API-M_HOME>/repository/deployment/server/jaggeryapps/store/site/conf` directory. Edit the `site.json` file as shown below.
    
        ```json
        {
          "theme" : {
          "base" : "wso2",
          "subtheme" : "okta"
        },
        ```

        The default `site.json` will be as follows,
        
        ```json
        {
          "theme" : {
          "base" : "wso2"
        },
        ```

### Step 3: Run the sample

You have connected WSO2 API Manager with a third-party Okta authorization server. Let's see how WSO2 API Manager creates OAuth clients at Okta OAuth, when applications are registered in the API Store.

1. Start **WSO2 API Manager**.
2. **Sign in to the WSO2 API Store :**
    1. Store UI :
       ![alt text](images/sign_in.png)
    2. cURL command :
        ```
        curl -k -X POST -c cookies https://localhost:9443/store/site/blocks/user/login/ajax/login.jag -d 'action=login&username=admin&password=admin'
        ```
        
3. **Create an application :**
    1. Store UI :
    
       Go to the API Store and click the **Applications tab**. Click **ADD APPLICATION** to create a new application.
       ![alt text](images/add_application.png)
    2. cURL command :
        ```
        curl -k -X POST -b cookies https://localhost:9443/store/site/blocks/application/application-add/ajax/application-add.jag -d 'action=addApplication&application=OktaClientApp&tier=Unlimited&description=&callbackUrl=https://www.google.lk'
        ```
        
4. **Generate an Application Key :** 
    
    Register an OAuth client in the Okta authorization server and generate the access token.
    1. Store UI :
       
       After creating an application, go to the **Production Keys** tab of the Application, then click the Generate Keys button.
       
       >>Note : Please make a note of this Consumer Secret and Access Token values, as it will be the only one time that you will be able to view it.
       
       ![alt text](images/generate_keys.png)
       
       | Element | Description |
       | ------------- |-------------|
       | Application Grant Types (Mandatory) | Select the grant types for the application. |
       | Callback URL (Mandatory) | Redirection URI string for use in redirect-based flows. E.g., http://google.lk/ |
       | Application Type (Mandatory) | Client application type. |
       | Response Types (Mandatory) | Array of OAuth 2.0 response type strings. You can provide multiple values through a string separated by commas. |
       | Token Endpoint Auth Method (Mandatory) | Requested authentication method for the token endpoint. |
       | Token Scope (Mandatory) | The scope of the access token. You can provide multiple values through a string separated by commas. |
       | Token Grant Type (Mandatory) | Determines the mechanism Okta uses to authorize the creation of the tokens. The grant type supported is `client_credentials`. |
           
   2. cURL command :
   
      You need to send the specific parameters required by the Okta OAuth Server in `jsonParams` as shown below.
      ```
      curl -k -X POST -b cookies https://localhost:9443/store/site/blocks/subscription/subscription-add/ajax/subscription-add.jag -d 'action=generateApplicationKey&application=OktaClientApp&authorizedDomains=ALL&keytype=PRODUCTION&validityTime=3600&callbackUrl=https://www.google.lk&jsonParams={"response_types": "code,token,id_token", "grant_types": "refresh_token,authorization_code,implicit,client_credentials,password","token_endpoint_auth_method": "client_secret_basic","application_type": "web", "tokenGrantType" : "client_credentials", "tokenScope": "scope1,scope2"}'
      ```
      
5. **Update the existing application :**
   
   1. Store UI: 
   
      Go back to the **Applications** page in the **WSO2 API Store**. Select the application to be edited. Click **EDIT**.
      ![alt text](images/edit_application.png)
      
   2. cURL command :
      ```
      curl -X POST -b cookies https://localhost:9443/store/site/blocks/application/application-update/ajax/application-update.jag -d 'action=updateApplication&applicationOld=OktaClientApp&applicationNew=NewApp2&tier=Unlimited&descriptionNew=&callbackUrlNew=https://httpbin.org/get'
      ```
      
6. **Update grant types :**

    Edit the application details in Okta.
    
    1. Store UI: 
    
        Go to **Production Keys** tab of the Application, fill out the values to be updated and click **Update**.
        ![alt text](images/update_grants.png)
        
    2. cURL command :
        1. Write a JSON string with the required parameters. 
           >> Note : Make sure to include the following parameter in the JSON string .
           >>  "updateAppInOkta" : "true"

           E.g.,
            ``` json
            {"response_types":"code,token,id_token","grant_types":"refresh_token,authorization_code,implicit","token_endpoint_auth_method": "client_secret_basic","application_type": "web", "updateAppInOkta" : "true"}'
            ```
            
        2. Encode them with a [URL encoder](https://www.urlencoder.org/).
        3. Use the encoded value for the jsonParams parameter as shown in the sample cURL command given below.
            ```
            curl 'https://localhost:9443/store/site/blocks/subscription/subscription-add/ajax/subscription-add.jag' -H 'Content-Type: application/x-www-form-urlencoded' -d 'action=updateClientApplication&application=OktaClientApp&keytype=PRODUCTION&callbackUrl=https://httpbin.org/get&jsonParams=%7B%22response_types%22%3A%22code%2Ctoken%2Cid_token%22%2C%22grant_types%22%3A%22refresh_token%2Cauthorization_code%2Cimplicit%22%2C%22token_endpoint_auth_method%22%3A%20%22client_secret_basic%22%2C%22application_type%22%3A%20%22web%22%2C%20%22updateAppInOkta%22%20%3A%20%22true%22%7D' -k -b cookies
            ```
            
7. **Delete an OAuth Application :** 
    
    To delete an OAuth application in the Okta server, do the following.

    1. Store UI: 
        
        Go to the Applications page in the WSO2 API Store. Click Delete to delete your application.
        ![alt text](images/delete_application.png)
        
    2. cURL command :
        ```
        curl -k -X POST -b cookies https://localhost:9443/store/site/blocks/subscription/subscription-add/ajax/subscription-add.jag -d 'action=deleteAuthApplication&consumerKey=0oadf3m45jgYaadbJWb0h7'
        ```
        
8. **Provision an Out-of-Band OAuth Client :** Provision an OAuth client created in the Okta server.
    
    Enable the option to provide out-of-band keys by opening the `<API-M_HOME>/repository/deployment/server/jaggeryapps/store/site/conf/site.json` file and changing the `"mapExistingAuthApps"` setting to `true`.

      > ``"mapExistingAuthApps" : true`
    
    1. Store UI : 
        
        After creating an application, go to the **Production Keys** tab of the Application.
    
         ![alt text](images/map_application.png)
    
        Click Provide Keys under Map Existing OAuth Keys.
        
         ![alt text](images/map_application_details.png)
    
         Fill out the required parameters and click Save. You will be redirected to the page that has application and access token details.
         
         >>**Note :** Please make a note of this Consumer Secret and Access Token values, as it will be the only one time that you will be able to view it.

    2. cURL command :
        ```
        curl -X POST -b cookies https://localhost:9443/store/site/blocks/subscription/subscription-add/ajax/subscription-add.jag -d 'action=mapExistingOauthClient&applicationName=OktaClientApp&keytype=PRODUCTION&callbackUrl=https://www.google.lk&authorizedDomains=ALL&validityTime=3600&client_id=0oadae8nosfopVl7dA0h7&jsonParams={"username":"admin","key_type":"PRODUCTION","client_secret":"bsdsds7-MN0vivfHLO37VyB9M1P19-Ku2qF8OAHH","validityPeriod":"3600", "tokenScope":"test", "tokenGrantType" : "client_credentials"}'
        ```
    
9. **Clean partially-created keys :**

    Clean any partially-created keys from the API Manager database, before adding a new subscription. Partially-created keys can remain in the API Manager databases when an OAuth application of a third-party Okta server gets deleted through the API Store UI. It only deletes the mapping that is maintained within API Manager.

    1. Store UI : 
    
        Go to the **Production Keys** tab of the Application and click **Clean up**.
    
        ![alt text](images/cleanup.png)
    2. cURL command :
    
        ```
        curl -X POST -b cookies https://localhost:9443/store/site/blocks/subscription/subscription-add/ajax/subscription-add.jag -d 'action=cleanUpApplicationRegistration&applicationName=OktaClientApp&keyType=PRODUCTION'
        ```

10. **Revoke the token and re-generate the access token from the OAuth Provider :**
    1. Store UI : 
    
        Go to the **Production Keys** tab of the Application. Provide the token scope and click **Regenerate**.
    
        >> **Note :** Please make a note of this Consumer Secret and Access Token values, as it will be the only one time that you will be able to view it.
        
        ![alt text](images/regenerate_token.png)

    2. cURL command :
        1. Update the token endpoint in the `<API-M_HOME>/repository/deployment/server/synapse-configs/default/api/_TokenAPI_.xml` file accordingly.
            
            E.g., [https://dev-76321439.oktapreview.com/oauth2/default/v1/token](https://dev-76321439.oktapreview.com/oauth2/default/v1/token)
            
        2. Update the revoke endpoint in the `<API-M_HOME>/repository/deployment/server/synapse-configs/default/api/_RevokeAPI_.xml` file accordingly.
            
            E.g., [https://dev-76321439.oktapreview.com/oauth2/default/v1/revoke](https://dev-76321439.oktapreview.com/oauth2/default/v1/revoke)
            
        3. Replace `<ConsumerKey:ConsumerSecret>` with the `Base64 encoded ConsumerKey:ConsumerSecret` of the client application you just created.
              ```
              curl -k -d "token=eyJraWQiOiJHTmtDeWd3dklXLTJjV1pGaXNVMkdKa2dXRi1WRk04R2tzeDc4VHZwTU00IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULm5oNmhlNy0yNm1YZUgxc" -H "Authorization: Basic <ConsumerKey:ConsumerSecret>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:8243/revoke
              ```
              
            After revoking the access token, you need to follow the step below to regenerate the new access token.
        
        4. Obtain a token from the OAuth Provider.
           Replace `<ConsumerKey:ConsumerSecret>` with the `Base64 encoded ConsumerKey:ConsumerSecret` of the client application you just created.
              ```
              curl -k -d "grant_type=client_credentials&scope=test" -H "Authorization: Basic <ConsumerKey:ConsumerSecret>" -H "Content-Type: application/x-www-form-urlencoded" https://localhost:8243/token
              ```
              
11. **Validate tokens by subscribing to the Okta application :**
    1. Sign in to the API Publisher and deploy the sample API (PizzaShackAPI), if you haven't done so already : 
        
        ![alt text](images/deploy_api.png)

    2. Assuming you still have the OAuth client created earlier, subscribe to this API as follows :
        1. Store UI: 
        
            Select the application from the drop down menu and click Subscribe.
        
            ![alt text](images/subscribe_api.png)
              
        2. cURL command :
        
            ```
            curl -X POST -b cookies https://localhost:9443/store/site/blocks/subscription/subscription-add/ajax/subscription-add.jag -d 'action=addAPISubscription&name=PizzaShackAPI&version=1.0.0&provider=admin&tier=Unlimited&applicationName=OktaClientApp'
            ```
    
    3. Invoke the API using the token obtained :
        
        1. Store UI: 
        
            Copy the Access Token that generated in the previous `step 4` or `step 8` or `step 10(b)` and paste it in the API Console UI as follows.
        
            ![alt text](images/invoke_api.png)
    
            You can invoke the API now.
            
        2. cURL command :
            ```
            curl -X GET --header 'Accept: application/json' --header 'Authorization: Bearer eyJraDH2LexQssMURzB56q78dmRa0NmDpH1o2FGYrVxCLeNcypJq6OlrzXw7N_R9H1f1OwH5GnT3pHssXjblr4qBKunIj6hRA0-lqHcwq3hcxusb2wgnUta_xudrUfXFn9bQXb5pkg' 'https://172.17.0.1:8243/pizzashack/1.0.0/menu'
            ```
            