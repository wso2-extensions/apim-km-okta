package org.wso2.okta.client;

import com.nimbusds.jwt.JWTClaimsSet;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.wso2.carbon.apimgt.impl.jwt.JWTValidatorImpl;

import java.text.ParseException;
import java.util.List;

import static org.wso2.okta.client.OktaConstants.SCOPE;

public class OktaJWTValidator extends JWTValidatorImpl {
    private static final Log log = LogFactory.getLog(OktaJWTValidator.class);
    @Override
    protected JWTClaimsSet transformJWTClaims(JWTClaimsSet jwtClaimsSet) {
        JWTClaimsSet.Builder jwtClaimBuilder = new JWTClaimsSet.Builder(jwtClaimsSet);
        if (jwtClaimsSet.getClaim(SCOPE) != null) {
            if (jwtClaimsSet.getClaim(SCOPE) instanceof List) {
                try {
                    jwtClaimBuilder.claim(SCOPE, String.join(" ", jwtClaimsSet.getStringListClaim(SCOPE)));
                } catch (ParseException e) {
                    log.error("error while parsing scope claim", e);
                }
            }
        }
        jwtClaimsSet = super.transformJWTClaims(jwtClaimBuilder.build());
        return jwtClaimsSet;
    }
}
