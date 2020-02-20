# Integrate WSO2 API Manager 3.0.0 with an external IAM using the Okta OAuth Authorization Server

In this guide, we explain how to integrate the WSO2 API Manager with an external Identity and Access Management server (IAM) using the Okta OAuth Authorization Server
to manage the OAuth clients and tokens required by WSO2 API Manager. This is a sample client implementation that consumes APIs exposed by Okta OAuth.
 
## Follow the instructions below to configure the third-party Key Manager

### Step 1 : Prerequisites

Create an Okta developer account. Get the Instance URL, authorization server ID, API Key and configure the access policy and the rule.

1. Go to the [Okta sign up page](https://developer.okta.com/signup/). Create an Okta account and get the Okta instance URL.

   E.g., [https://dev-735404.okta.com](https://dev-735404.okta.com)
   
    ![alt text](images/signup.png)
   
   
2. Get the authorization server ID by following the steps below :

    1. Go to the **Authorization Servers** section in the **API** tab.
    2. Create a new authorization server. Alternatively, you can use the default server.
        ![alt text](images/authorization_server.png)

    3. Add a default scope. For that select the authorization server (ex: default) and go to the **Scopes** tab and create a new scope (say default). Select the default tick.
        ![alt text](images/default_scope.png)

        ![alt text](images/scope_list.png)

3. Get the API key :
    
    1. Go to the **Authorization Servers** section in the **API** tab and select the **Tokens** tab.
    2. Click **Create Token** and provide the name for the token.
    3. After successful token creation, copy the Token value for the further use.
    
    ![alt text](images/token.png)

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
    
6. Create OAuth application to get credentials to access the introspect api: 
   
    1. Go to the **Applications** tab and select **Add Application** button.
    2. Select **Web** type in the list and select next
        ![alt text](images/add_application_intro.png)
    3. Under the **Grant type allowed** section, tick **Client Credentials**
    4. Once app is created, note down the **Client ID** and **Client secret** under **Client Credentials** section. 

### Step 2: Configure WSO2 API Manager

1. Download latest OKTA-OAuth-Client-2.x.x.jar from [here](https://github.com/wso2-extensions/apim-keymanager-okta/releases).
2. Copy that JAR file into the `<API-M_HOME>/repository/components/lib` directory.
3. Uncomment or add the following parameters in the `<API-M_HOME>repository/conf/deployment.toml` file. Change the values based on your third-party API.

    ```xml
    [apim.oauth_config]
    set_jwt_as_opaque_token = true

    [apim.key_manager]
    key_manager_client_impl = "org.wso2.okta.client.OktaOAuthClient"
    key_validation_handler_impl = "org.wso2.okta.client.OktaKeyValidationHandler"

    [apim.key_manager.configuration]
    oktaInstanceUrl = "https://dev-735404.okta.com"
    defaultScope = "default"
    authorizationServerId = "default"
    apiKey = "xxxxxxxxxxxxxxxxxxxx"
    client_id = "0oa2b1ir5x9qbp5AS4x6"
    client_secret = "xxxxxxxxxxxxxxxxxxx"
    ```

    | Element | Description |
    | ------------- |-------------|
    |**oktaInstanceUrl** | Url generated in the section 1|
    |**defaultScope** | Scope defined in the point 3 in section 2|
    |**authorizationServerId** | Server id which was created in point 2 in section 2|
    |**apiKey** | Token generated in section 3|
    |**client_id** | Client id generated from section 6|
    |**client_secret** | Client secret generated from section 6 |   

### Step 3: Run the sample

You have connected WSO2 API Manager with a third-party Okta authorization server. Let's see how WSO2 API Manager creates OAuth clients at Okta OAuth, when applications are registered in the Dev Portal.

1. Start **WSO2 API Manager**.
2. **Sign in to the Dev Portal :**
    1. Dev Portal UI :
       Sign in using the **SIGN-IN** button at the top right corner.
       <!--![alt text](images/sign_in.png)-->
    2. Generate access token to access dev portal apis :
       follow the steps in [here](http://wso2.github.io/carbon-apimgt/apidocs/store/v1/#guide) to generate an access token to access dev portal apis. For APM 3.0.0 please use v0.16 as the version for /client-registration api.
        
3. **Create an application :**
    1. Dev Portal UI :
    
       Go to the Dev Portal and click the **Applications**. Click **ADD NEW APPLICATION** to create a new application.
       <!--![alt text](images/add_application.png)-->
    2. cURL command :
        ```
        curl -k -X POST \
            -H "Authorization: Bearer e3f6a2f4-1b88-3458-8a39-99e54c7d283a" \
            -H "Content-Type: application/json" \
            -d'{ 
            "name":"OktaAPP",
            "throttlingPolicy":"Unlimited",
            "description":"Okta sample App",
            "tokenType":"OAUTH",
            "groups":null,
            "attributes":{ 

            }
            }' https://localhost:9443/api/am/store/v1.0/applications
        ```

        **Note** note down the **applicationId** returned in the response. This will be used in the next step
        
4. **Generate an Application Key :** 
    
    Register an OAuth client in the Okta authorization server and generate the access token.
    <!--
    1. Dev Portal UI :
       
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
          --> 
   1. cURL command :
   
      You need to send the specific parameters required by the Okta OAuth Server in `additionalProperties` as shown below.
      ```
        curl -k -X POST \
            -H "Authorization: Bearer e3f6a2f4-1b88-3458-8a39-99e54c7d283a" -H "Content-Type: application/json" \
            -d '{
            "keyType":"PRODUCTION",
            "grantTypesToBeSupported":[
                "refresh_token",
                "password",
                "client_credentials",
                "authorization_code",
                "implicit"
            ],
            "callbackUrl":"https://www.wso2.com",
            "validityTime":3600,
            "additionalProperties": "{\"response_types\": \"code,token,id_token\", \"grant_types\": \"refresh_token,authorization_code,implicit,client_credentials,password\",\"token_endpoint_auth_method\": \"client_secret_basic\",\"application_type\": \"web\", \"tokenGrantType\" : \"client_credentials\", \"tokenScope\": \"scope1,scope2\"}"
            }' https://localhost:9443/api/am/store/v1.0/applications/4f320831-98eb-45a1-99eb-aa4c2b60c03f/generate-keys
      ```
      **Note**
      `additionalProperties` element contains the parameters that need to be passed for the Okta.
      
      **Note** Response for the above request contains the access token issued by Okta. You could note down this value or you could generate it again using Okta token apis (https://developer.okta.com/docs/reference/api/oidc/#token)
        ```
        curl -X POST \
            -H "Content-type:application/x-www-form-urlencoded" \
            "https://dev-735404.okta.com/oauth2/default/v1/token" \
            -d "client_id=<client_id>&client_secret=<secret>&grant_type=client_credentials&scope=default"
        ```
    
5. **Invoke an API**
    1. Log in to the Publisher portal and publish an API.
    2. Log in to the Dev portal and subscribe the API to the previously created Application in step 1.
       <!--![alt text](images/subscribe.png)-->
    3. Invoke the api using the previously generated token. You could use the **Try Out** feature in the Dev Portal to test this
       <!--![alt text](images/invoke.png) -->
<!--     
**Update the existing application :**
   
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
 -->           
6.  **Delete an OAuth Application :** 
    
    To delete an OAuth application in the Okta server, do the following.

    1. Dev Portal UI: 
        
        Go to the Applications page in the WSO2 Dev Portal. Click Delete to delete your application.
        <!--![alt text](images/delete_application.png) -->
        
    2. cURL command :
        ```
        curl -k -X DELETE \
        -H "Authorization: Bearer e3f6a2f4-1b88-3458-8a39-99e54c7d283a" \
        https://localhost:9443/api/am/store/v1.0/applications/4f320831-98eb-45a1-99eb-aa4c2b60c03f
        ```
        
7.  **Provision an Out-of-Band OAuth Client :** Provision an OAuth client created in the Okta server.
    
    Enable the option to provide out-of-band keys by opening the `<API-M_HOME>repository/conf/deployment.toml` file and uncommenting the `#[apim.devportal]` setting to `enable_key_provisioning = true`.

      ```
        [apim.devportal]
        enable_key_provisioning = true
      ```
    **Prerequisites**
    Create an application in Okta as mentioned in the step 6 in section 1 and get the client id and the client secret.

    1. Dev portal UI : 
        
        After creating an application, go to the **Production Keys** tab of the Application.
    
        Go to Provide Keys under Provide Existing OAuth Keys.
        
        <!-- ![alt text](images/map_application_details.png) -->
    
         Fill out the required parameters and click Save. You will be redirected to the page that has application and access token details.
         
         <!--![alt text](images/map_gen_token.png)-->

         >>**Note :** If you have not provide consumer secret, the access token will not be generated.
         
         >>**Note :** Please make a note of this Consumer Secret and Access Token values, as it will be the only one time that you will be able to view it.

8.  **Revoke the token and re-generate the access token from the OAuth Provider :**
  <!--  1. Dev Portal UI : 
    
        Go to the **Production Keys** tab of the Application. Provide the token scope and click **Regenerate**.
    
        >> **Note :** Please make a note of this Consumer Secret and Access Token values, as it will be the only one time that you will be able to view it.
-->
    1. cURL command :
            
        1. Replace `<ConsumerKey:ConsumerSecret>` with the `Base64 encoded ConsumerKey:ConsumerSecret` of the client application you just created.
              ```
              curl -k -d "token=eyJraWQiOiJHTmtDeWd3dklXLTJjV1pGaXNVMkdKa2dXRi1WRk04R2tzeDc4VHZwTU00IiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULm5oNmhlNy0yNm1YZUgxc" -H "Authorization: Basic <ConsumerKey:ConsumerSecret>" -H "Content-Type: application/x-www-form-urlencoded" https://dev-76321439.oktapreview.com/oauth2/default/v1/revoke
              ```
              
            After revoking the access token, you need to follow the step below to regenerate the new access token.
        
        2. Obtain a token from the OAuth Provider.
           Replace `<ConsumerKey:ConsumerSecret>` with the `Base64 encoded ConsumerKey:ConsumerSecret` of the client application you just created.
              ```
              curl -k -d "grant_type=client_credentials&scope=test" -H "Authorization: Basic <ConsumerKey:ConsumerSecret>" -H "Content-Type: application/x-www-form-urlencoded" https://dev-76321439.oktapreview.com/oauth2/default/v1/token
              ```
            