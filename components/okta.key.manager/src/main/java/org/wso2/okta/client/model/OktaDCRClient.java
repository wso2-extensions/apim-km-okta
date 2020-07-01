package org.wso2.okta.client.model;

import feign.Headers;
import feign.Param;
import feign.RequestLine;

public interface OktaDCRClient {

    @RequestLine("POST")
    @Headers("Content-Type: application/json")
    public ClientInfo createApplication(ClientInfo clientInfo);


    @RequestLine("GET /{clientId}")
    @Headers("Content-Type: application/json")
    public ClientInfo getApplication(@Param("clientId") String clientId);

    @RequestLine("PUT /{clientId}")
    @Headers("Content-Type: application/json")
    public ClientInfo updateApplication(@Param("clientId") String clientId,ClientInfo clientInfo);

    @RequestLine("DELETE /{clientId}")
    @Headers("Content-Type: application/json")
    public void deleteApplication(@Param("clientId") String clientId);

    @RequestLine("PUT /{clientId}/lifecycle/newSecret")
    @Headers("Content-Type: application/json")
    public ClientInfo regenerateClientSecret(@Param("clientId") String clientId);
}
