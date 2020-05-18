package org.wso2.okta.client.model;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class JWKS {

    @SerializedName("key")
    private List<JWKKey> jwkKeys  = new ArrayList();

    public List<JWKKey> getJwkKeys() {

        return jwkKeys;
    }

    public void setJwkKeys(List<JWKKey> jwkKeys) {

        this.jwkKeys = jwkKeys;
    }
}
