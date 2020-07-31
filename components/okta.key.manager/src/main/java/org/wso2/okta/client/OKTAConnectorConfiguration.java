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

package org.wso2.okta.client;

import org.osgi.service.component.annotations.Component;
import org.wso2.carbon.apimgt.api.model.ConfigurationDto;
import org.wso2.carbon.apimgt.api.model.KeyManagerConnectorConfiguration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component(
        name = "okta.configuration.component",
        immediate = true,
        service = KeyManagerConnectorConfiguration.class
)
public class OKTAConnectorConfiguration implements KeyManagerConnectorConfiguration {

    @Override
    public String getImplementation() {

        return OktaOAuthClient.class.getName();
    }

    @Override
    public String getJWTValidator() {

        return null;
    }

    @Override
    public List<ConfigurationDto> getConnectionConfigurations() {

        List<ConfigurationDto> configurationDtoList = new ArrayList<>();
        configurationDtoList
                .add(new ConfigurationDto("apiKey", "API KEY", "input", "API Key Generated From Okta UI", "", true,
                        true, Collections.emptyList(), false));
        configurationDtoList
                .add(new ConfigurationDto("client_id", "Client ID", "input", "Client ID of service Application", "",
                        true,
                        false, Collections.emptyList(), false));
        configurationDtoList
                .add(new ConfigurationDto("client_secret", "Client Secret", "input",
                        "Client Secret of service Application", "", true,
                        true, Collections.emptyList(), false));
        return configurationDtoList;
    }

    @Override
    public List<ConfigurationDto> getApplicationConfigurations() {

        List<ConfigurationDto> configurationDtoList = new ArrayList<>();
        configurationDtoList
                .add(new ConfigurationDto("application_type", "Application Type", "select", "Type Of Application to " +
                        "create", "web", false,
                        false, Arrays.asList("web", "native", "service", "browser"), false));
        configurationDtoList
                .add(new ConfigurationDto("response_types", "Response Type", "select", "Type Of Token response", "",
                        true,
                        false, Arrays.asList("code", "token", "id_token"), true));
        configurationDtoList
                .add(new ConfigurationDto("token_endpoint_auth_method", "Token endpoint Authentication Method",
                        "select", "How to Authenticate Token Endpoint", "client_secret_basic", true,
                        true, Arrays.asList("client_secret_basic", "client_secret_post", "client_secret_jwt"), false));
        return configurationDtoList;
    }

    @Override
    public String getType() {

        return OktaConstants.OKTA_TYPE;
    }
}
