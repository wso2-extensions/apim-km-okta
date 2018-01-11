/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * you may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.wso2.okta.client;

/**
 * This class will hold constants related to Okta key manager implementation.
 */
public class OktaConstants {
    public static final String UTF_8 = "UTF-8";
    public static final String HTTP_HEADER_CONTENT_TYPE = "Content-Type";
    public static final String APPLICATION_JSON = "application/json";
    public static final String AUTHORIZATION = "Authorization";
    public static final String AUTHENTICATION_BASIC = "Basic ";
    public static final String AUTHENTICATION_SSWS = "SSWS ";
    public static final String CLIENT_ENDPOINT = "/oauth2/v1/clients";
    public static final String INTROSPECT_ENDPOINT = "/v1/introspect";
    public static final String TOKEN_ENDPOINT = "/v1/token";
    public static final String REVOKE_ENDPOINT = "/v1/revoke";
    public static final String OAUTH2 = "/oauth2/";
    public static final String GRANT_TYPE = "grant_type";
    public static final String GRANT_TYPE_CLIENT_CREDENTIALS = "client_credentials";
    public static final String ACCESS_TOKEN_SCOPE = "scope";
    public static final String REGISTRAION_API_KEY = "apiKey";
    public static final String CLIENT_REDIRECT_URIS = "redirect_uris";
    public static final String CLIENT_GRANT_TYPES = "grant_types";
    public static final String CLIENT_NAME = "client_name";
    public static final String CLIENT_ID = "client_id";
    public static final String CLIENT_SECRET = "client_secret";
    public static final String CLIENT_TOKEN_ENDPOINT_AUTH_METHOD = "token_endpoint_auth_method";
    public static final String CLIENT_APPLICATION_TYPE = "application_type";
    public static final String CLIENT_RESPONSE_TYPES = "response_types";
    public static final String CLIENT_LOGO_URI = "logo_uri";
    public static final String CLIENT_URI = "client_uri";
    public static final String CLIENT_INITIATE_LOGIN_URI = "initiate_login_uri";
    public static final String CLIENT_POST_LOGOUT_REDIRECT_URIS = "post_logout_redirect_uris";
    public static final String CLIENT_ID_ISSUED_AT = "client_id_issued_at";
    public static final String CLIENT_SECRET_EXPIRES_AT = "client_secret_expires_at";
    public static final String TOKEN = "token";
    public static final String TOKEN_TYPE_HINT = "token_type_hint";
    public static final String ACCESS_TOKEN = "access_token";
    public static final String ACCESS_TOKEN_ACTIVE = "active";
    public static final String ACCESS_TOKEN_EXPIRY = "exp";
    public static final String ACCESS_TOKEN_ISSUED = "iat";
    public static final String ACCESS_TOKEN_USER_NAME = "username";
    public static final String ACCESS_TOKEN_AUDIENCE = "aud";
    public static final String ACCESS_TOKEN_ISSUER = "iss";
    public static final String ACCESS_TOKEN_TYPE = "token_type";
    public static final String ACCESS_TOKEN_SUBJECT = "sub";
    public static final String ACCESS_TOKEN_USER_ID = "uid";
    public static final String ACCESS_TOKEN_IDENTIFIER = "jti";
    public static final String ACCESS_TOKEN_EXPIRES_IN = "expires_in";
    public static final String OKTA_INSTANCE_URL = "oktaInstanceUrl";
    public static final String OKTA_AUTHORIZATION_SERVER_ID = "authorizationServerId";
    public static final String TOKEN_SCOPE = "tokenScope";
    public static final String TOKEN_GRANT_TYPE = "tokenGrantType";
    public static final String UPDATE_APP_IN_OKTA = "updateAppInOkta";
    public static final String ERROR_WHILE_PARSE_RESPONSE = "Error while parsing response json";
    public static final String ERROR_ENCODING_METHOD_NOT_SUPPORTED = "Encoding method is not supported";
    public static final String ERROR_COULD_NOT_READ_HTTP_ENTITY = "Could not read http entity for response";
    public static final String STRING_FORMAT = "%s %s";
    public static final String ERROR_OCCURRED_WHILE_READ_OR_CLOSE_BUFFER_READER = "Error has occurred while reading " +
            "or closing buffer reader";

    OktaConstants() {
    }
}
