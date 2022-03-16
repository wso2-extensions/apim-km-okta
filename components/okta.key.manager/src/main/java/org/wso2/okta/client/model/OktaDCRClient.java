package org.wso2.okta.client.model;

import feign.Headers;
import feign.Param;
import feign.RequestLine;
import org.wso2.carbon.apimgt.impl.kmclient.KeyManagerClientException;

public interface OktaDCRClient {

    @RequestLine("POST")
    @Headers("Content-Type: application/json")
    public ClientInfo createApplication(ClientInfo clientInfo) throws KeyManagerClientException;


    @RequestLine("GET /{clientId}")
    @Headers("Content-Type: application/json")
    public ClientInfo getApplication(@Param("clientId") String clientId) throws KeyManagerClientException;

    @RequestLine("PUT /{clientId}")
    @Headers("Content-Type: application/json")
    public ClientInfo updateApplication(@Param("clientId") String clientId, ClientInfo clientInfo) throws KeyManagerClientException;

    @RequestLine("DELETE /{clientId}")
    @Headers("Content-Type: application/json")
    public void deleteApplication(@Param("clientId") String clientId) throws KeyManagerClientException;

    @RequestLine("PUT /{clientId}/lifecycle/newSecret")
    @Headers("Content-Type: application/json")
    public ClientInfo regenerateClientSecret(@Param("clientId") String clientId) throws KeyManagerClientException;
}
