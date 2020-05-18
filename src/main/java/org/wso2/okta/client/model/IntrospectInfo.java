package org.wso2.okta.client.model;

import com.google.gson.annotations.SerializedName;

public class IntrospectInfo {

    @SerializedName("active")
    private boolean active;
    @SerializedName("aud")
    private String audience;
    @SerializedName("client_id")
    private String clientId;
    @SerializedName("device_id")
    private String deviceId;
    @SerializedName("exp")
    private long expiry;
    @SerializedName("iat")
    private long issuedAt;
    @SerializedName("iss")
    private String issuer;
    @SerializedName("jti")
    private String jti;
    @SerializedName("nbf")
    private long nbf;
    @SerializedName("scope")
    private String scope;
    @SerializedName("sub")
    private String sub;
    @SerializedName("token_type")
    private String tokenType;
    @SerializedName("uid")
    private String uid;
    @SerializedName("username")
    private String username;

    public boolean isActive() {

        return active;
    }

    public void setActive(boolean active) {

        this.active = active;
    }

    public String getAudience() {

        return audience;
    }

    public void setAudience(String audience) {

        this.audience = audience;
    }

    public String getClientId() {

        return clientId;
    }

    public void setClientId(String clientId) {

        this.clientId = clientId;
    }

    public String getDeviceId() {

        return deviceId;
    }

    public void setDeviceId(String deviceId) {

        this.deviceId = deviceId;
    }

    public long getExpiry() {

        return expiry;
    }

    public void setExpiry(long expiry) {

        this.expiry = expiry;
    }

    public long getIssuedAt() {

        return issuedAt;
    }

    public void setIssuedAt(long issuedAt) {

        this.issuedAt = issuedAt;
    }

    public String getIssuer() {

        return issuer;
    }

    public void setIssuer(String issuer) {

        this.issuer = issuer;
    }

    public String getJti() {

        return jti;
    }

    public void setJti(String jti) {

        this.jti = jti;
    }

    public long getNbf() {

        return nbf;
    }

    public void setNbf(long nbf) {

        this.nbf = nbf;
    }

    public String getScope() {

        return scope;
    }

    public void setScope(String scope) {

        this.scope = scope;
    }

    public String getSub() {

        return sub;
    }

    public void setSub(String sub) {

        this.sub = sub;
    }

    public String getTokenType() {

        return tokenType;
    }

    public void setTokenType(String tokenType) {

        this.tokenType = tokenType;
    }

    public String getUid() {

        return uid;
    }

    public void setUid(String uid) {

        this.uid = uid;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {

        this.username = username;
    }
}
