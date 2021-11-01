export const API_URL = "http://localhost:8080";

export const login = `${API_URL}/login`;

export const loginUser = (username) => {
	return `${API_URL}/login${username}`;
};
export const getTitle = (title) => {
	return `${API_URL}/map${title}`;
};
export const getNeighbourhood = (neighbourhood) => {
	return `${API_URL}/map${neighbourhood}`;
};
export const neighbourhoods = [
	"Downtown",
	"Mount Pleasant",
	"West End",
	"Strathcona",
	"Shaughnessy",
	"Stanley Park",
	"Grandview-Woodland",
	"Kensington-Cedar Cottage",
	"Kitsilano",
	"Fairview",
	"Marpole",
	"RileyPark",
	"Oakridge",
	"Sunset",
	"Hastings-Sunrise",
	"Killarney",
	"South Cambie",
	"Arbutus Ridge",
	"West Point Grey",
];
