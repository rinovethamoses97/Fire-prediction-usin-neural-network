var config={
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: false,
	transformHeader: undefined,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: parsingComplete,
	error: undefined,
	download: true,
	skipEmptyLines: false,
	chunk: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
};
var data;
var brain;
function setup(){
	// parsing the csv file using papa parser
	Papa.parse("Book.csv",config);
}
function parsingComplete(result,file){
	data=result.data;
	createNeuralNetwork();
}
function createNeuralNetwork(){
	// creating neural network with 3 input nodes, 3 hidden layer nodes, 3 output nodes
	brain=new NeuralNetwork(3,3,3);
}
function train(){
	// train the neural network
}