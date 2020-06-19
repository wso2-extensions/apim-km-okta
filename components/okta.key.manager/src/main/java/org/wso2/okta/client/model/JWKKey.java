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
