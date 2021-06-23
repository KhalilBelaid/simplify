(async () => {

	// Highlight background to showcase debug mode
	document.body.style.backgroundColor = "silver";
	console.clear();
	
	// Dynamic import
	const src = chrome.extension.getURL('src/js/content_main.js');
	const contentScript = await import(src);
	contentScript.main(/* chrome: no need to pass it */);
})();
