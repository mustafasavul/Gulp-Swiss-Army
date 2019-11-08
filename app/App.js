var SAVUL = {
    "UI": {},
    "Helper": {}
};

/**
 * jQuery initialize
 */
$(function() {
    SAVUL.UI = new UI();
    SAVUL.Helper = new Helper();

    SAVUL.UI.init();
});
