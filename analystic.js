<script>
    window.mraid = {
        EVENTS: {
            ASSETREADY: 'assetReady',
            ASSETREMOVED:
                'assetRemoved',
            ASSETRETIRED: 'assetRetired',
            ERROR: 'error',
            INFO: 'info',
            READY: 'ready',
            HEADINGCHANGE: 'headingChange',
            KEYBOARDCHANGE: 'keyboardChange',
            LOCATIONCHANGE:
                'locationChange',
            NETWORKCHANGE: 'networkChange',
            ORIENTATIONCHANGE: 'orientationChange',
            RESPONSE: 'response',
            SCREENCHANGE: 'screenChange',
            SHAKE: 'shake',
            SIZECHANGE: 'sizeChange',
            STATECHANGE: 'stateChange',
            TILTCHANGE: 'tiltChange',
            VIEWABLECHANGE: 'viewableChange'
        },
        STATES: {
            UNKNOWN: 'unknown', DEFAULT: 'default', RESIZED: 'resized', EXPANDED: 'expanded',
            HIDDEN: 'hidden', LOADING: 'loading'
        }, listeners: {}, state: "loading", viewable: false,
        closedState: 0, expandedState: 0, userTouched: false, clickInProgress: false,
        contractInProgress: false, getState: function () {
            return this.state;
        }, getVersion: function
            () {
            return "2.0";
        }, getViewable: function () {
            return this.viewable;
        }, getPlacementType:
            function () {
                return "inline";
            }, isViewable: function () {
            return this.viewable;
        },
        useCustomClose: function (shouldUseCustomClose) {
            return false;
        }, supports: function
            (featureName) {
            return false;
        }, getExpandProperties: function () {
            return {
                width:
                    jQuery(window).width(), height: jQuery(window).height(), useCustomClose: false
            };
        },
        setExpandProperties: function (newProperties) {
        }, getOrientationProperties: function () {
            return {};
        }, setOrientationProperties: function (newProperties) {
        }, getScreenSize: function
            () {
            return this.getCurrentPosition();
        }, getMaxSize: function () {
            return
            this.getCurrentPosition();
        }, getDefaultPosition: function () {
            return
            this.getCurrentPosition();
        }, getCurrentPosition: function () {
            return {
                x: 0, y: 0, width:
                    jQuery(window).width(), height: jQuery(window).height()
            };
        }, addEventListener: function
            (event, listener) {
            this.listeners[event] = this.listeners[event] || [];
            var eventListeners =
                this.listeners[event];
            for (var existing in eventListeners) {
                if (listener === existing)
                    return;
            }
            eventListeners.push(listener);
        }, removeEventListener: function (event, listener) {
            if (this.listeners.hasOwnProperty(event)) {
                var eventListeners = this.listeners[event];
                if
                (eventListeners) {
                    var idx = eventListeners.indexOf(listener);
                    if (idx !== -1) {
                        eventListeners.splice(idx, 1);
                    }
                }
            }
        }, resize: function () {
        }, expand: function () {
            if
            (!this.userTouched || this.contractInProgress) return;
            if (this.expandedState == 0) {
                this.expandedState = 2;
                var self = this;
                setTimeout(function () {
                    window.location.href =
                        "applovin://com.applovin.sdk/adservice/expand_ad";
                    self.expandedState = 1;
                    setTimeout(function () {
                        self.markExpanded();
                    }, 100);
                }, 10);
            }
        }, open: function (targetUrl) {
            if (!this.clickInProgress) {
                this.clickInProgress = true;
                var redirectUrl =
                    "https://prod-a-events.applovin.com/redirect?clcode=4!v3!1592448.1702017666!kVTEvdCiXr8r_5nTdrswlkoP5efdO34QvWVpdw2uvloh3mQoe5srlbWohFLoPmI5kyrw7UNRks3Xbkt_SR_LQmsIpeZDu7pM7CJobNPz-oNCOyhoR70j-ebG7eHEIJYmLGnutG-7aXGwsdJXyoyk9esbeSEbob2pa7BTF2O7ZC7WCEy2HbZLrFdG6qJJs8lxRF-rUazNFh97H0TvYRTAX_zl9c40oeW5drZPsU-KNTt1qpIralNcavi-WLJtHfM4HkwRfjMGbxXJc6_LJEpCtVgXgsECg8AjzvrsLWlW4uQt3nsbFdG1hTH1_OzsoC0LCerg98q_Ljx6dUN2SCpfsY5ncDq4OM4wiaXJbcasHd8FSS44FtyfJbgwoI00n1usgWX34YjCOtaB2u_vmIqhlMvYFtz1eoDTIb3YvKfL3xC0zVccDz1xn4X9f2st3P4fmINiqSJ6IMRzA6ihLbv9RBO9NfRkL_ElctQBvc_sxPPj-oJw9qcdiTBFdFMcAKZvx9P3n60cj-ALr09vj7S7jcQMOrALVv1FOVwcmGSvKrfO7eSbQipizrwOMd9GF5O6fo7mOOP60OtX5mqvp4y3lDBailcniXrNZ444gX65br9AUCNkDi6i4OGA-AL6qOyqKlLNzz5fVQ1l4WfIRKYwY-ot3ZgOa10eiaxlKcnEex4_YcB6tqvuoqmXDq7_dpNXhWUlMGFY3nZ-wtB9pQivu3a4nsUbzJ7knqRAemxIU4DHYjCIqB8f52OguFwSa7K13C4AS2iZ0GMuoTixN3qbvCm4hH6JuSmWVzKsEMlZSaI*";
                if (redirectUrl.startsWith("http")) {
                    var finalUrl = redirectUrl + "&n=" +
                        encodeURIComponent(targetUrl);
                    window.location.href = finalUrl;
                } else {
                    setTimeout(function
                        () {
                        var img = new Image();
                        img.src = targetUrl;
                    }, 100);
                    window.location.href = redirectUrl;
                }
                var self = this;
                setTimeout(function () {
                    self.clickInProgress = false;
                }, 1000);
            }
        },
        close: function () {
            if (this.expandedState == 1) {
                this.expandedState = 0;
                var self = this;
                setTimeout(function () {
                    window.location.href =
                        "applovin://com.applovin.sdk/adservice/contract_ad";
                    self.contractInProgress = true;
                    setTimeout(function () {
                        self.contractInProgress = false;
                    }, 1000);
                    setTimeout(function () {
                        self.markContracted();
                    }, 100);
                }, 10);
            } else if (this.expandedState == 2) {
            }
        }, fireEvent:
            function (type) {
                var eventListeners = this.listeners[type];
                if (eventListeners) {
                    var args =
                        Array.prototype.slice.call(arguments);
                    args.shift();
                    for (var i = 0; i <
                    eventListeners.length; i++) {
                        eventListeners[i].apply(null, args);
                    }
                }
            }, markReady: function
            () {
            var self = this;
            setTimeout(function () {
                self.state = self.STATES.DEFAULT;
                self.viewable
                    = true;
                self.fireEvent(self.EVENTS.VIEWABLECHANGE, self.viewable);
                self.fireEvent(self.EVENTS.READY);
            }, 10);
        }, markHidden: function () {
            this.state =
                this.STATES.HIDDEN;
            this.fireEvent(this.EVENTS.STATECHANGE, this.state);
            this.viewable =
                false;
            this.fireEvent(this.EVENTS.VIEWABLECHANGE, this.viewable);
        }, markResized: function () {
            var self = this;
            setTimeout(function () {
                self.state = self.STATES.RESIZED;
                self.fireEvent(self.EVENTS.STATECHANGE, self.state);
            }, 200);
        }, markExpanded: function () {
            this.state = this.STATES.EXPANDED;
            this.fireEvent(this.EVENTS.STATECHANGE, this.state);
            this.fireEvent(this.EVENTS.SIZECHANGE);
        }, markContracted: function () {
            this.state =
                this.STATES.DEFAULT;
            this.fireEvent(this.EVENTS.STATECHANGE, this.state);
            this.fireEvent(this.EVENTS.SIZECHANGE);
        }, __noSuchMethod__: function (id, args) {
        }
    };
    var
        applovinMraid = window.mraid;
    jQuery(document).ready(function () {
        if (!document.hidden) {
            setTimeout(function () {
                applovinMraid.markReady();
            }, 500);
        } else {
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden &&
                    !applovinMraid.viewable) {
                    applovinMraid.markReady();
                }
            });
        }
        document.addEventListener("orientationchange", function () {
            if (applovinMraid.expandedState
                == 1) {
                applovinMraid.markResized();
            }
        });
        document.addEventListener('touchstart', function () {
            applovinMraid.userTouched = true;
            setTimeout(function () {
                applovinMraid.userTouched =
                    false;
            }, 1000);
        });
        window["al_onBackPressed"] = function () {
            applovinMraid.close();
        };
        window["al_onCloseTapped"] = function () {
            applovinMraid.close();
        };
        var
            attachClickHandlerFunc = function () {
                var clickHandler = function (event) {
                    var width =
                        jQuery(window).width();
                    var closeAreaSize = Math.min(width * 0.17, 50);
                    var x = 0;
                    var y = 0;
                    if (event.type == 'touchend') {
                        var touch = event.touches[0] || event.changedTouches[0];
                        x =
                            touch.pageX;
                        y = touch.pageY;
                    } else if (event.type == 'mouseup') {
                        x = event.pageX;
                        y =
                            event.pageY;
                    }
                    if (x > (width - closeAreaSize) && y < closeAreaSize) {
                        applovinMraid.close();
                    }
                };
                window.addEventListener("touchend", clickHandler);
                window.addEventListener("mouseup",
                    clickHandler);
            };
        var attachClickHandlerTimeoutSec = parseInt("0") || 0;
        if
        (attachClickHandlerTimeoutSec > 0) {
            setTimeout(attachClickHandlerFunc, 1000 *
                attachClickHandlerTimeoutSec);
        } else if (attachClickHandlerTimeoutSec == 0) {
            attachClickHandlerFunc();
        }
    });
    var addClickTrackingUrlsToDocument = function () {
        document.addEventListener("click", function () {
            var clickTrackingUrls = "".split(",");
            for (let i = 0; i < clickTrackingUrls.length; i++) {
                setTimeout(function () {
                    var img = new
                    Image();
                    img.src = clickTrackingUrls[i];
                }, 100);
            }
        });
    };
    if (document.readyState ===
        "complete") {
        addClickTrackingUrlsToDocument();
    } else {
        document.addEventListener("DOMContentLoaded", addClickTrackingUrlsToDocument);
    }
</script>
