var lib = {

	elementSwap : function(htmlString, ObjToReplace){
		if(ObjToReplace.outerHTML) { //if outerHTML is supported
			ObjToReplace.outerHTML=htmlString;
		}
		else { //if outerHTML is not supported
			var tmpObj=document.createElement("div");
			tmpObj.innerHTML='<!--THIS DATA SHOULD BE REPLACED-->';
			ObjParent=ObjToReplace.parentNode; 
			ObjParent.replaceChild(tmpObj,ObjToReplace);
			ObjParent.innerHTML=ObjParent.innerHTML.replace('<div><!--THIS DATA SHOULD BE REPLACED--></div>',htmlString);
		}
	},
	
	timeSpan : function(date1 = new Date(), date2 = new Date(), setting = 'h') {
		let span;
		switch(setting) {
			  case "h":
				span = Math.max(0,Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 3600)));
				break;
			  case "d":
				span = Math.max(0,Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)));
				break;
			  default:
				span = undefined;
				console.log('timeSpan wrong setting, please write h or d');
				break;
			}
		return span;
	},
	
	fontLoader : function (family) {
        let headID = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css?family=' + family;
		headID.appendChild(link);
    },

	cssLoader : function (path) {
		let style = document.createElement('link');
		style.rel = 'stylesheet';
		style.href = chrome.extension.getURL(path);
		return style;
    }
};

export default lib;