const s1_jukeboxes = ["jhw0"];
const s2_jukeboxes = ["dsf0"];
const s3_jukeboxes = ["jfw0"]; 

const s1_volumeIDs = [
  "20753",
	"20754",
	"20755",
	"20757",
	"20758",
	"20759",
	"20761",
	"20762",
	"20765",
	"20767",
	"20768",
	"20771",
	"20775",
	"20779",
	"20783",
	"20784",
	"20785",
	"20787",
	"20789",
	"20791",
	"20792",
	"20794",
	"20795",
	"20797",
];

const s2_volumeIDs = [
	"12552",
	"12553",
	"12554",
	"12556",
	"12557",
	"12558",
	"12561",
	"12563",
	"12565",
	"12567",
	"12568",
	"12573",
	"12575",
	"12579",
	"12582",
	"12584",
	"12586",
	"12587",
	"12589",
	"12591",
	"12593",
	"12594",
	"12596",
	"12598",
];

const s3_volumeIDs = [
	"17243",
	"17244",
	"17246",
	"17247",
	"17248",
	"17251",
	"17253",
	"17255",
	"17257",
	"17258",
	"17263",
	"17265",
	"17269",
	"17262",
	"17264",
	"17266",
	"17267",
	"17269",
	"17271",
	"17273",
	"17274",
	"17275",
	"17276",
	"17278",
];

const mode = [
	"Full",
	"Full",
	"Full",
	"Appendable",
];

function makeBarcodes(prefix, min, max, mediaID) {
	// Barcode = Human readable prefix (batch, eg by company) +
	//           variable segments (incremented based on number of tapes used) +
	//           media id (eg. L7 = Cartridge Type LTO-7, 15TB)
	// eg "LEM120L7"

	// Generate random no repeating variable segments (mid part)
	const variableSegments = [];
	function generateUniqueRandom(min, max) {
		let random = Math.floor(Math.random() * (max - min + 1) + min);

		//Coerce to number by boxing
		random = Number(random);

		if (!variableSegments.includes(random)) {
			variableSegments.push(random);
			return random;
		} else {
			if (variableSegments.length < max - min) {
				//Recursively generate number
				return generateUniqueRandom(min, max);
			} else {
				console.log("No more numbers available.");
				return false;
			}
		}
	}
	for (i = 0; i < 24; i++) {
		generateUniqueRandom(min, max);
	}

	// Add prefix, convert Segments from int to strings, and add mediaID
	const barcodes = [];
	for (let i = 0; i < variableSegments.length; i++) {
		const string = prefix + variableSegments[i].toString() + mediaID;
		barcodes.push(string);
	}
	return barcodes;
}

function makeLabels(prefix, min, max) {

  const randDigits = [];
	function generateUniqueRandom(min, max) {
		let random = Math.floor(Math.random() * (max - min + 1) + min);

		//Coerce to number by boxing
		random = Number(random);

		if (!randDigits.includes(random)) {
			randDigits.push(random);
			return random;
		} else {
			if (randDigits.length < max - min) {
				//Recursively generate number
				return generateUniqueRandom(min, max);
			} else {
				console.log("No more numbers available.");
				return false;
			}
		}
	}
	for (i = 0; i < 24; i++) {
		generateUniqueRandom(min, max);
  }
  
  const labels = []
  for (let i = 0; i < 24; i++) {
    const string = prefix + randDigits[i]
    labels.push(string)
  }
  return labels
}

function makeJukebox(volumeIDs, labels, prefix, min, max, mediaID, mode) {
	// Barcode = Human readable prefix + var + media id (L7 = LTO-7, 15TB)

	// make array of ["1", "2"... "24"]
	const slotStrings = [];
	const slotcount = 24;
	const slots = new Array(slotcount);
	for (let i = 0; i < slotcount; i++) {
		slots[i] = i + 1;
		const string = slots[i].toString();
		slotStrings.push(string);
	}

	function randomMode() {
		const randomMode = Math.floor(Math.random() * mode.length);
		return mode[randomMode];
	}

	const jukebox = [];
	for (let i = 0; i < slotStrings.length; i++) {
		const volume = {
			volumeID: volumeIDs[i],
			label: labels[i],
			// barcode: makeBarcodes("LEM", 110, 198, "L7")[i],
			barcode: makeBarcodes(prefix, min, max, mediaID)[i],
			// mode: mode[randomMode],
			mode: randomMode(),
			slot: slotStrings[i],
		};
		jukebox.push(volume);
	}
	return jukebox;
}

const s1_labels = makeLabels("BackupNFS.00", 10, 50);
const s2_labels = makeLabels("Archive.00", 30, 70);
const s3_labels = makeLabels("Projects.00", 50, 95);

const s1_jukebox = makeJukebox(s1_volumeIDs, s1_labels, "LEM", 110, 198, "L7", mode)
const s2_jukebox = makeJukebox(s2_volumeIDs, s2_labels, "EAG", 350, 390, "L7", mode)
const s3_jukebox = makeJukebox(s3_volumeIDs, s3_labels, "BRI", 650, 690, "L7", mode)

// console.log('s1_jukebox:', s1_jukebox)
// console.log('s2_jukebox:', s2_jukebox)
// console.log('s3_jukebox:', s3_jukebox)

exports.s1_jukeboxes = s1_jukeboxes;
exports.s2_jukeboxes = s2_jukeboxes;
exports.s3_jukeboxes = s3_jukeboxes;

exports.s1_volumeIDs = s1_volumeIDs;
exports.s2_volumeIDs = s2_volumeIDs;
exports.s3_volumeIDs = s3_volumeIDs;

exports.s1_jukebox = s1_jukebox;
exports.s2_jukebox = s2_jukebox;
exports.s3_jukebox = s3_jukebox;


