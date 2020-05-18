package org.wso2.okta.client;

import feign.RequestTemplate;
import feign.codec.EncodeException;
import feign.codec.Encoder;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.stream.Collectors;

public class FormEncoder implements Encoder {
    @Override
    public void encode(Object o, Type type, RequestTemplate requestTemplate) throws EncodeException {
        Map<String, Object> params = (Map<String, Object>) o;
        String paramString = params.entrySet().stream()
                .map(this::urlEncodeKeyValuePair)
                .collect(Collectors.joining("&"));
        requestTemplate.body(paramString);
    }

    private String urlEncodeKeyValuePair(Map.Entry<String, Object> entry) {
        try {
            return URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()) + '='
                    + URLEncoder.encode(String.valueOf(entry.getValue()), StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException ex) {
            throw new EncodeException("Error occurred while URL encoding message", ex);
        }
    }
}
