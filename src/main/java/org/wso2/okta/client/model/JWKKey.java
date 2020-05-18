package org.wso2.okta.client.model;

import com.google.gson.annotations.SerializedName;

public class JWKKey {

    @SerializedName("e")
    private String e;
    @SerializedName("kid")
    private String kid;
    @SerializedName("kty")
    private String kty;
    @SerializedName("n")
    private String n;
    @SerializedName("x")
    private String x;
    @SerializedName("y")
    private String y;

    public String getE() {

        return e;
    }

    public void setE(String e) {

        this.e = e;
    }

    public String getKid() {

        return kid;
    }

    public void setKid(String kid) {

        this.kid = kid;
    }

    public String getKty() {

        return kty;
    }

    public void setKty(String kty) {

        this.kty = kty;
    }

    public String getN() {

        return n;
    }

    public void setN(String n) {

        this.n = n;
    }

    public String getX() {

        return x;
    }

    public void setX(String x) {

        this.x = x;
    }

    public String getY() {

        return y;
    }

    public void setY(String y) {

        this.y = y;
    }
}
