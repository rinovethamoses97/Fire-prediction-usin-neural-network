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
	for(var i=1;i<data.length;i++){
		var inputs=[];
		inputs[0]=parseInt(data[i][0])/40;
		inputs[1]=parseInt(data[i][1])/80;
		inputs[2]=parseInt(data[i][2])/600;
		var output=[];
		if(inputs[4]==="critical"){

		}
		else if(inputs[4]==="severe"){

		}
		else if(inputs[4]==="mild"){

		}
		else if(inputs[4]==="no"){

		}
	}
}