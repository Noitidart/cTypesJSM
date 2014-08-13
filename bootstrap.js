function startup(aData, aReason) {
	/* HOW TO USE
	*  Components.utils.import('chrome://ctypesjsm/content/wintypes.jsm');
	*  Cu.import('chrome://ctypesjsm/content/wintypes.jsm');
	*/
}

function shutdown(aData, aReason) {
	if (aReason == APP_SHUTDOWN) return;
	Components.utils.unload('chrome://ctypesjsm/content/wintypes.jsm'); //i do this here because if re-install, then it will update it with the new modules i pack with this addon
}

function install() {}

function uninstall() {}