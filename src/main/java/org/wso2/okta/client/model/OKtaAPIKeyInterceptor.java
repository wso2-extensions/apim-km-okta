package org.wso2.okta.client.model;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import feign.Util;

public class OKtaAPIKeyInterceptor implements RequestInterceptor {
    private String apiKey;

    public OKtaAPIKeyInterceptor(String apiKey) {
        Util.checkNotNull(apiKey, "apiKey", new Object[0]);
        this.apiKey = apiKey;
    }

    @Override
    public void apply(RequestTemplate requestTemplate) {
        requestTemplate.header("Authorization","SSWS ".concat(apiKey));
    }
}
