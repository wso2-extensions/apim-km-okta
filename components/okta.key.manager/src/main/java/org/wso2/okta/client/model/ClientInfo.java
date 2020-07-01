/*
 *  Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.wso2.okta.client.model;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class ClientInfo {

    @SerializedName("client_id")
    private String clientId;
    @SerializedName("application_type")
    private String applicationType;
    @SerializedName("client_id_issued_at")
    private Long clientIdIssuedTime;
    @SerializedName("client_name")
    private String clientName;
    @SerializedName("client_secret")
    private String clientSecret;
    @SerializedName("client_secret_expires_at")
    private Long clientSecretExpiredTime;
    @SerializedName("grant_types")
    private List<String> grantTypes = new ArrayList<>();
    @SerializedName("initiate_login_uri")
    private String loginInitiationUri;
    @SerializedName("client_uri")
    private String clientUri;
    @SerializedName("logo_uri")
    private String logoUri;
    @SerializedName("redirect_uris")
    private List<String> redirectUris = new ArrayList<>();
    @SerializedName("post_logout_redirect_uris")
    private List<String> logoutRedirectUris = new ArrayList<>();
    @SerializedName("response_types")
    private List<String> responseTypes = new ArrayList<>();
    @SerializedName("token_endpoint_auth_method")
    private String tokenEndpointAuthMethod;
    @SerializedName("tos_uri")
    private String tosUri;
    @SerializedName("policy_uri")
    private String policyUri;
    @SerializedName("request_object_signing_alg")
    private String requestObjectSigningAlgorithm;
    @SerializedName("jwks")
    private JWKS jwks;

    public String getClientId() {

        return clientId;
    }

    public void setClientId(String clientId) {

        this.clientId = clientId;
    }

    public String getApplicationType() {

        return applicationType;
    }

    public void setApplicationType(String applicationType) {

        this.applicationType = applicationType;
    }

    public Long getClientIdIssuedTime() {

        return clientIdIssuedTime;
    }

    public void setClientIdIssuedTime(Long clientIdIssuedTime) {

        this.clientIdIssuedTime = clientIdIssuedTime;
    }

    public String getClientName() {

        return clientName;
    }

    public void setClientName(String clientName) {

        this.clientName = clientName;
    }

    public String getClientSecret() {

        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {

        this.clientSecret = clientSecret;
    }

    public Long getClientSecretExpiredTime() {

        return clientSecretExpiredTime;
    }

    public void setClientSecretExpiredTime(Long clientSecretExpiredTime) {

        this.clientSecretExpiredTime = clientSecretExpiredTime;
    }

    public List<String> getGrantTypes() {

        return grantTypes;
    }

    public void setGrantTypes(List<String> grantTypes) {

        this.grantTypes = grantTypes;
    }

    public String getLoginInitiationUri() {

        return loginInitiationUri;
    }

    public void setLoginInitiationUri(String loginInitiationUri) {

        this.loginInitiationUri = loginInitiationUri;
    }

    public String getClientUri() {

        return clientUri;
    }

    public void setClientUri(String clientUri) {

        this.clientUri = clientUri;
    }

    public String getLogoUri() {

        return logoUri;
    }

    public void setLogoUri(String logoUri) {

        this.logoUri = logoUri;
    }

    public List<String> getRedirectUris() {

        return redirectUris;
    }

    public void setRedirectUris(List<String> redirectUris) {

        this.redirectUris = redirectUris;
    }

    public List<String> getLogoutRedirectUris() {

        return logoutRedirectUris;
    }

    public void setLogoutRedirectUris(List<String> logoutRedirectUris) {

        this.logoutRedirectUris = logoutRedirectUris;
    }

    public List<String> getResponseTypes() {

        return responseTypes;
    }

    public void setResponseTypes(List<String> responseTypes) {

        this.responseTypes = responseTypes;
    }

    public String getTokenEndpointAuthMethod() {

        return tokenEndpointAuthMethod;
    }

    public void setTokenEndpointAuthMethod(String tokenEndpointAuthMethod) {

        this.tokenEndpointAuthMethod = tokenEndpointAuthMethod;
    }

    public String getTosUri() {

        return tosUri;
    }

    public void setTosUri(String tosUri) {

        this.tosUri = tosUri;
    }

    public String getPolicyUri() {

        return policyUri;
    }

    public void setPolicyUri(String policyUri) {

        this.policyUri = policyUri;
    }

    public String getRequestObjectSigningAlgorithm() {

        return requestObjectSigningAlgorithm;
    }

    public void setRequestObjectSigningAlgorithm(String requestObjectSigningAlgorithm) {

        this.requestObjectSigningAlgorithm = requestObjectSigningAlgorithm;
    }

    public JWKS getJwks() {

        return jwks;
    }

    public void setJwks(JWKS jwks) {

        this.jwks = jwks;
    }
}
