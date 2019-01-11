const head = document.head;
const body = document.body;
const urlAbsolute = window.location.href; 
const urlRelative = window.location.pathname;
const scraped = {};
const status = [];

const headSelectors = {
	title: "title",
	description: "meta[name='description']",
	canonical: "link[rel='canonical']",
	robots: "meta[name='robots']",
	charset: "meta[charset]",
	hreflang: "link[hreflang]",
	alternateMobile:"link[media='only screen and (max-width: 640px)']",
	prevPagination:"link[rel='prev']",
	nextPagination:"link[rel='next']",
	amp: "link[rel='amphtml']"
};

const bodySelectors = {
	h1: "h1",
	h2: "h2",
	/*h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",*/
	img: "img",
	links: "a"
};


function scrapeTags(obj, part) {
	for(let prop in obj) {
		scraped[prop] = Array.from(part.querySelectorAll(`${obj[prop]}`));
	}
};

function showStatus(obj) {
	console.log(urlAbsolute);
	for(let prop in obj) {
		if(obj[prop].length > 1) {
			if(prop == "img") {
				console.log(`Images: ${obj[prop].length}`);
			} if(prop == "links") {
				console.log(`Links: ${obj[prop].length}`);
			} if(prop != "img" && prop != "links") {	
				obj[prop].map(tag => {
					if(tag.outerHTML) {
						/*console.log(`${prop}:	${tag.outerHTML}`);*/
						status.push({tag:prop, html:tag.outerHTML});
					} else {
						/*console.log(tag);*/
						status.push({tag:prop, html:tag});
					}
				});
			}
		} if(obj[prop].length == 0) {
			/*console.log(`${prop}: No detected`); */
			status.push({tag:prop, html:`No detected`})
		} if(obj[prop].length == 1)  {
			/*console.log(`${prop}:	${obj[prop][0].outerHTML}`);*/
			status.push({tag:prop, html:obj[prop][0].outerHTML});
		}
	}	
	console.table(status);
};

scrapeTags(headSelectors, head);
scrapeTags(bodySelectors, body);
showStatus(scraped);
