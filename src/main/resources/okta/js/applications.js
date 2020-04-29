/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
;(function( $ ) {
    $.fn.zclip = function() {
        if(typeof ZeroClipboard == 'function'){
            var client = new ZeroClipboard( this );
            client.on( "ready", function( readyEvent ) {
              client.on( "aftercopy", function( event ) {
                var target = $(event.target);
                target.attr("title","Copied!")
                target.tooltip('enable');
                target.tooltip("show");
                target.tooltip('disable');
              });
            });
        }else{
            console.warn('Warning : Dependency missing - ZeroClipboard Library');
        }
        return this;
    };
}( jQuery ));

var GrantTypes = function (available) {
    //order will be preserved in the response map
    this.config = {
        "authorization_code":"Code",
        "implicit":"Implicit",
        "refresh_token":"Refresh Token", 
        "password":"Password", 
        "iwa:ntlm":"IWA-NTLM", 
        "client_credentials":"Client Credential", 
        "urn:ietf:params:oauth:grant-type:saml2-bearer":"SAML2",
    }

    this.available = {};
    for(var i=0;i < available.length;i++){
        this.available[available[i]] = this.config[available[i]];
    }
};

GrantTypes.prototype.getMap = function(selected){
    var grants = [];
    if(selected !=undefined)
        grants = selected.toString().split(" ");
    var map = [];
    for(var grant in this.available){
        var selected = grants.indexOf(grant) > -1;
        map.push({ key: grant , name:this.available[grant], "selected" : selected});
    }

    return map;
};

;(function ( $, window, document, undefined ) {
    var pluginName = "codeHighlight";

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = $(element);
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            this.editor = CodeMirror.fromTextArea(this.element[0], {
              mode:  "shell",
              readOnly: true,
              lineWrapping: true
            });
        },

        refresh: function(){
            this.editor.refresh();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

;(function ( $, window, document, undefined ) {
    var source = $("#keys-template").html();    
    var template;
    if(source != undefined && source !="" ){
        template = Handlebars.compile(source);
    }        

    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode:function(e){
    var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);
    r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){
    u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+
    this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;
    e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));
    o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));
    a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);
    if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t}
    ,_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);
    if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);
    t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);
    t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;
    while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){
    c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);
    t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    // Create the defaults once
    var pluginName = "keyWidget",
        defaults = {
            username: "Username",
            password: "Password"           
        };

    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = $(element);
        this.app = options.app;
        this.type = options.type;
        this.app.show_keys = ( $.cookie('OAuth_key_visibility') === 'true');
        this.grants = new GrantTypes(options.grant_types);
        this.app.grants = this.grants.getMap(this.app.grants);

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {
            this.selectDefaultGrants();

            this.render();

            //register actions
            this.element.on( "click", ".regenerate", $.proxy(this.regenerateToken, this));
            this.element.on( "click", ".generatekeys", $.proxy(this.generateKeys, this));
            this.element.on( "click", ".provide_keys", $.proxy(this.provideKeys, this));
            this.element.on( "click", ".provide_keys_save", $.proxy(this.provideKeysSave, this));
            this.element.on( "click", ".provide_keys_cancel", $.proxy(this.provideKeysCancel, this));
            this.element.on( "click", ".show_keys", $.proxy(this.toggleKeyVisibility, this));
            this.element.on( "click", ".generateAgainBtn", $.proxy(this.generateAgainBtn, this));
            this.element.on( "click", ".update_grants", $.proxy(this.updateGrants, this));
            this.element.on( "change", ".callback_url", $.proxy(this.change_callback_url, this));
            this.element.on( "change", ".application_type", $.proxy(this.change_application_type, this));
            this.element.on( "change", ".response_types", $.proxy(this.change_response_types, this));
            this.element.on( "change", ".token_endpoint_auth_method", $.proxy(this.change_token_endpoint_auth_method, this));
            this.element.on( "change", ".tokenScope", $.proxy(this.change_tokenScope, this));
            this.element.on( "change", ".tokenGrantType", $.proxy(this.change_tokenGrantType, this));
            this.element.on( "change", ".revokeTokenScope", $.proxy(this.change_revokeTokenScope, this));
            this.element.on( "change", ".access_token", $.proxy(this.change_access_token, this));
            this.element.on( "change", ".ConsumerSecret", $.proxy(this.change_ConsumerSecret, this));
            this.element.on( "change", ".ConsumerKey", $.proxy(this.change_ConsumerKey, this));
            this.element.on( "change", ".MapAppConsumerSecret", $.proxy(this.change_MapAppConsumerSecret, this));
            this.element.on( "change", ".token_scope", $.proxy(this.change_token_scope, this));
            this.element.on( "change", ".token_grantType", $.proxy(this.change_token_grantType, this));
        },

	    change_token_grantType: function(e){
            this.app.token_grantType = $(e.currentTarget).val();
        },
	    change_token_scope: function(e){
            this.app.token_scope = $(e.currentTarget).val();
        },
	    change_MapAppConsumerSecret: function(e){
            this.app.MapAppConsumerSecret = $(e.currentTarget).val();
        },
	    change_ConsumerKey: function(e){
            this.app.ConsumerKey = $(e.currentTarget).val();
        },
	    change_ConsumerSecret: function(e){
            this.app.ConsumerSecret = $(e.currentTarget).val();
        },
	    change_access_token: function(e){
            this.app.Key = $(e.currentTarget).val();
        },
	    change_revokeTokenScope: function(e){
            this.app.revokeTokenScope = $(e.currentTarget).val();
        },
	    change_application_type: function(e){
            this.app.application_type = $(e.currentTarget).val();
            this.render();
        },
	    change_response_types: function(e){
            this.app.response_types = $(e.currentTarget).val();
            this.render();
        },
	    change_token_endpoint_auth_method: function(e){
            this.app.token_endpoint_auth_method = $(e.currentTarget).val();
            this.render();
        },
	    change_tokenScope: function(e){
            this.app.tokenScope = $(e.currentTarget).val();
            this.render();
        },
	    change_tokenGrantType: function(e){
            this.app.tokenGrantType = $(e.currentTarget).val();
            this.render();
        },
        change_callback_url: function(e){
            this.app.callbackUrl = $(e.currentTarget).val();
            this.selectDefaultGrants();
            this.render();
        },

        selectDefaultGrants: function(){
            /* If keys are not generated select grants by default */
            if(this.app.ConsumerKey == undefined || this.app.ConsumerKey == ""){                
                for(var i =0 ;i < this.app.grants.length;i++){
                    if((this.app.grants[i].key == "iwa:ntlm" ||
                    this.app.grants[i].key == "urn:ietf:params:oauth:grant-type:saml2-bearer") ){
                        this.app.grants[i].selected = false;
                        this.app.grants[i].disabled = true;
                    }else{
                        this.app.grants[i].selected = true;
                        delete this.app.grants[i].disabled
                    }                    
                }
            }else{
                for(var i =0 ;i < this.app.grants.length;i++){
                    if((this.app.grants[i].key == "iwa:ntlm" ||
                    this.app.grants[i].key == "urn:ietf:params:oauth:grant-type:saml2-bearer") ){
                        this.app.grants[i].selected = false;
                        this.app.grants[i].disabled = true;
                    }else{
			this.app.grants[i].selected = true;
                        delete this.app.grants[i].disabled
                    }                 
                }                
            } 
        },

        toggleKeyVisibility: function(el, options) {
            this.app.show_keys = !this.app.show_keys;
            $.cookie('OAuth_key_visibility', this.app.show_keys );
            this.render();
            return false;            
        },

        provideKeys: function(){
            this.app.provide_keys_form = true;
            this.render();
            return false;
        },

        provideKeysCancel: function(){
            this.app.provide_keys_form = false;
            this.render();
            return false;
        },

        provideKeysSave: function(){
	    var _this=this;
           
	    $("#mapAppForm").validate({
    	    submitHandler: function(form) {
            jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
                action: "mapExistingOauthClient",
                applicationName: _this.app.name,
                keytype: _this.type,
                callbackUrl: _this.app.callbackUrl,
                jsonParams: JSON.stringify({"key_type" : _this.type, "client_secret":_this.app.MapAppConsumerSecret,
                "tokenScope":_this.app.token_scope,"tokenGrantType" : _this.app.token_grantType,}),
                client_id : _this.app.ConsumerKey,
                validityTime: 3600 //set a default value.
            }, $.proxy(function (result) {
                if (!result.error) {
                    _this.app.ConsumerKey = _this.app.ConsumerKey;
                    _this.app.ConsumerSecret = _this.app.MapAppConsumerSecret;
                    _this.app.Key = result.data.key.accessToken;
                    _this.render();
                } else {
                    jagg.message({content: i18n.t("Error occurred while saving OAuth application. Please check if you have provided valid Consumer Key & Secret."), type: "error"});
                }
            },_this), "json");
            return false;
	}});
        },

        generateAgainBtn: function(){
            var elem = this.element.find(".generateAgainBtn");
            var keyType = this.type;
            var applicationName = this.app.name;

            jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
                action:"cleanUpApplicationRegistration",
                applicationName:applicationName,
                keyType:keyType
            }, function (result) {
                if (!result.error) {
                    location.reload();
                } else {
                    jagg.message({content:result.message,type:"error"});
                }
            }, "json");
        },

        generateKeys: function(){  
	    var _this=this;
          
            var validity_time = this.element.find(".validity_time").val();
            var selected = this.element.find(".grants:checked")
                           .map(function(){ return $( this ).val();}).get().join(",");
            var scopes = $('#scopes option:selected')
                            .map(function(){ return $( this ).val();}).get().join(" ");
            
            this.element.find('.generatekeys').buttonLoader('start');

            $("#generateKeyForm").validate({
            submitHandler: function(form) {
                jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
                    action: "generateApplicationKey",
                    application: _this.app.name,
                    keytype: _this.type,
                    callbackUrl: _this.app.callbackUrl,
                    validityTime: validity_time,
                    tokenScope: "",
                    jsonParams:'{"client_name": "'+_this.app.name+'", "redirect_uris": "'+_this.app.callbackUrl +
                    '", "response_types": "'+_this.app.response_types+'", "grant_types": "'+selected
                    +'","token_endpoint_auth_method": "'+_this.app.token_endpoint_auth_method+'","tokenScope": "'
                    +_this.app.tokenScope+'","application_type": "'+_this.app.application_type+'","tokenGrantType" : "'
                    +_this.app.tokenGrantType+'"}',
                }, $.proxy(function (result) {
                    _this.element.find('.generatekeys').buttonLoader('stop');
                    if (!result.error) {
                        if ((typeof(result.data.key.appDetails) != 'undefined') ||  (result.data.key.appDetails != null)){
                            var appDetails = JSON.parse(result.data.key.appDetails);
                            _this.app.grants = _this.grants.getMap(appDetails.grant_types);
                        }

                        _this.app.ConsumerKey = result.data.key.consumerKey,
                        _this.app.ConsumerSecret = result.data.key.consumerSecret,
                        _this.app.Key = result.data.key.accessToken,
                        _this.app.KeyScope = result.data.key.tokenScope,
                        _this.app.ValidityTime = result.data.key.validityTime,
                        _this.app.keyState = result.data.key.keyState,
                        _this.render();
                    } else {
                        jagg.message({content: result.message, type: "error"});
                    }
                },_this), "json");

                return false;
            }});
        },

        regenerateToken: function(){  
	    var _this=this;

            var validity_time = this.element.find(".validity_time").val();
            var scopes = "";
            if(this.element.find("select.scope_select").val() != null) {
                scopes = this.element.find("select.scope_select").val().join(" ");
            }

            this.element.find('.regenerate').buttonLoader('start');

            $("#reGenerateKeyForm").validate({
            submitHandler: function(form) {
                jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
                    action:"refreshToken",
                    application:_this.app.name,
                    keytype:_this.type,
                    oldAccessToken:_this.app.Key,
                    clientId:_this.app.ConsumerKey,
                    clientSecret: _this.app.ConsumerSecret,
                    validityTime:validity_time,
                    tokenScope:_this.app.revokeTokenScope
                }, $.proxy(function (result) {
                    _this.element.find('.regenerate').buttonLoader('stop');
                    if (!result.error) {
                        _this.app.Key = result.data.key.accessToken;
                        _this.app.ValidityTime = result.data.key.validityTime;
                        _this.app.KeyScope = result.data.key.tokenScope.join();
                        _this.render();
                        _this.element.find('input.access_token').animate({ opacity: 0.1 }, 500).animate({ opacity: 1 },
                        500);
                    } else {
                        jagg.message({content:result.message,type:"error"});
                    }

                }, _this), "json");
                return false;
            }});
        },

        updateGrants: function(){
	    var _this=this;

            this.element.find('.update_grants').buttonLoader('start');
            var selected = this.element.find(".grants:checked")
                           .map(function(){ return $( this ).val();}).get().join(",");
            if(selected == ""){
            selected = "refresh_token,implicit,password,client_credentials,authorization_code";
            }

            $("#updateForm").validate({
                submitHandler: function(form) {
                jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
                    action:"updateClientApplication",
                    application:_this.app.name,
                    keytype:_this.type,
                    jsonParams: '{"grant_types":"'+selected+'", "client_id": "'+_this.app.ConsumerKey+'", "client_name": "'
                    +_this.app.name+'", "redirect_uris": "'+_this.app.callbackUrl+'","response_types": "'
                    +_this.app.response_types+'","token_endpoint_auth_method": "'+_this.app.token_endpoint_auth_method
                    +'","application_type": "'+_this.app.application_type+'","updateAppInOkta" : "true"}',
                    callbackUrl:_this.app.callbackUrl
                }, $.proxy(function (result) {
                    _this.element.find('.update_grants').buttonLoader('stop');
                    if (!result.error) {
                    } else {
                        jagg.message({content:result.message,type:"error"});
                    }
                }, _this), "json");
                return false;
            }});
        },

        render: function(){                   
            this.app.basickey = Base64.encode(this.app.ConsumerKey+":"+this.app.ConsumerSecret);
            this.app.username = this.options.username;
            this.app.password = this.options.password;
            this.app.provide_keys = this.options.provide_keys;

            this.element.html(template(this.app));
            this.element.find(".copy-button").zclip();
            this.element.find(".selectpicker").selectpicker({dropupAuto:false}); 
            this.element.find(".curl_command").codeHighlight();           
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

$(document).ready(function() {
    $("#subscription-actions").each(function(){
        var source   = $("#subscription-actions").html();
        var subscription_actions = Handlebars.compile(source);
        var source   = $("#subscription-api-name").html();
        var subscription_api_name = Handlebars.compile(source);

        var sub_list = $('#subscription-table').datatables_extended({
            "ajax": {
                "url": jagg.getBaseUrl()+ "/site/blocks/subscription/subscription-list/ajax/subscription-list.jag?action=getSubscriptionByApplication&app="+$("#subscription-table").attr('data-app'),
                "dataSrc": function ( json ) {
                    if(json.apis.length > 0){
                        $('#subscription-table-wrap').removeClass("hide");
                    }
                    else{
                        $('#subscription-table-nodata').removeClass("hide");
                    }
                    return json.apis
                }
            },
            "columns": [
                { "data": "apiName",
                  "render": function ( data, type, rec, meta ) {
                      return subscription_api_name(rec);
                  }
                },
                { "data": "subscribedTier" },
                { "data": "subStatus" },
                { "data": "apiName",
                  "render": function ( data, type, rec, meta ) {
                      return subscription_actions(rec);
                  }
                }
            ],
        });

        $('#subscription-table').on( 'click', 'a.deleteApp', function () {
            var row = sub_list.row( $(this).parents('tr') );
            var record = row.data();
            $('#messageModal').html($('#confirmation-data').html());
            $('#messageModal h3.modal-title').html(i18n.t("Confirm Delete"));
            $('#messageModal div.modal-body').html('\n\n'+i18n.t("Are you sure you want to unsubscribe from ") +'<b>"'
            + record.apiName + '-' + record.apiVersion + '</b>"?');
            $('#messageModal a.btn-primary').html(i18n.t("Yes"));
            $('#messageModal a.btn-other').html(i18n.t("No"));
            $('#messageModal a.btn-primary').click(function() {
                jagg.post("/site/blocks/subscription/subscription-remove/ajax/subscription-remove.jag", {
                    action:"removeSubscription",
                    name: record.apiName,
                    version: record.apiVersion,
                    provider:record.apiProvider,
                    applicationId: $("#subscription-table").attr('data-appid')
                   }, function (result) {
                    if (!result.error) {
                        window.location.reload(true);
                        urlPrefix = "name=" + $("#subscription-table").attr('data-app') + "&" + urlPrefix;
                        location.href = "../../site/pages/application.jag?" + urlPrefix+"#subscription";
                    } else {
                        jagg.message({content:result.message,type:"error"});
                    }
                }, "json"); });
            $('#messageModal a.btn-other').click(function() {
                return;
            });
            $('#messageModal').modal();
        });
    });

    $("#application-actions").each(function(){
        var source   = $("#application-actions").html();
        var application_actions = Handlebars.compile(source);

        var source   = $("#application-name").html();
        var application_name = Handlebars.compile(source);

        var app_list = $('#application-table').datatables_extended({
            serverSide: true,
            processing: true,
            paging: true,
            "ajax": {
                "url": jagg.url("/site/blocks/application/application-list/ajax/application-list.jag?action=getApplicationsWithPagination"),
                "dataSrc": function ( json ) {
                    if(json.applications.length > 0){
                        $('#application-table-wrap').removeClass("hide");
                    }
                    else{
                        $('#application-table-nodata').removeClass("hide");
                    }
                    return json.applications
                }
            },
            "columns": [
                { "data": "name",
                  "render": function(data, type, rec, meta){
                    var context = rec ;
                    if(rec.groupId !="" && rec.groupId != undefined)
                        context.shared = true;
                    else
                        context.shared = false;
                    var value = application_name(context);
                    if(rec.isBlacklisted == 'true' || rec.isBlacklisted == true){
                        value = value.replace((">"+rec.name+"<"),("><font color='red'>" + rec.name
                        + i18n.t(" (Blacklisted)") + "<"));

                    }
                    return  value;
                  }
                },
                { "data": "tier" },
                { "data": "status",
                  "render": function(status, type, rec, meta){
                    var result;
                    if(status=='APPROVED'){
                        result='ACTIVE';
                    } else if(status=='REJECTED') {
                        result='REJECTED';
                    } else{
                        result='INACTIVE <p><i>Waiting for approval</i></p>';
                    }
                    return new Handlebars.SafeString(result);
                  }
                },
                { "data": "apiCount" },
                { "data": "name",
                  "render": function ( data, type, rec, meta ) {
                      
                      // show delete and edit actions
                      rec.isOwner = true;
                      if (loggedInUser.toLowerCase() !== rec.owner.toLowerCase()) {
                        rec.isOwner = false;
                      }

                      rec.isActive = false;
                      if(rec.status=='APPROVED'){
                          rec.isActive = true;
                      }
                      return application_actions(rec);
                  }
                },
            ],
        });

        $('#application-table').on( 'click', 'a.deleteApp', function () {
            var appName = $(this).attr("data-id");
            var apiCount = $(this).attr("data-count");
            $('#messageModal').html($('#confirmation-data').html());
            if(apiCount > 0){
                $('#messageModal h3.modal-title').html(i18n.t("Confirm Delete"));
                $('#messageModal div.modal-body').text('\n\n' +i18n.t("This application is subscribed to ")
                    + apiCount + i18n.t(" APIs. ") +i18n.t("Are you sure you want to remove the application ")+'"' +
                     appName + '"'+i18n.t("? This will cancel all the existing subscriptions and keys associated with" +
                     "the application. "));
            } else {
                $('#messageModal h3.modal-title').html(i18n.t("Confirm Delete"));
                $('#messageModal div.modal-body').text('\n\n'+i18n.t("Are you sure you want to remove the application ")
                +'"' + appName + '" ?');
            }
            $('#messageModal a.btn-primary').html(i18n.t("Yes"));
            $('#messageModal a.btn-other').html(i18n.t("No"));
            $('#messageModal a.btn-primary').click(function() {
                jagg.post("/site/blocks/application/application-remove/ajax/application-remove.jag", {
                    action:"removeApplication",
                    application:appName
                }, function (result) {
                    if (!result.error) {
                        window.location.reload(true);
                    } else {
                        jagg.message({content:result.message,type:"error"});
                    }
                }, "json");
            });
            $('#messageModal a.btn-other').click(function() {
                window.location.reload(true);
            });
            $('#messageModal').modal();


        });
    });

    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
        $(".curl_command").each(function(){ $(this).data("plugin_codeHighlight").editor.refresh()});
    });
});
