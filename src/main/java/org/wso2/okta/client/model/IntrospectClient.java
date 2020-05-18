package org.wso2.okta.client.model;

import feign.Headers;
import feign.Param;
import feign.RequestLine;

public interface IntrospectClient {

    @RequestLine("POST")
    @Headers("Content-type:application/x-www-form-urlencoded")
    IntrospectInfo introspect(@Param("token") String token, @Param("token_type_hint") String tokenType);
}
