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
var brainConfig={
	binaryThresh: 0.5,
    hiddenLayers: [6,6],     
    activation: 'sigmoid', 
    leakyReluAlpha: 0.01
}
var data;
var brain;
var accuracy=0;
var test_set_size=2444;
function setup(){
	// parsing the csv file using papa parser
	Papa.parse("Book.csv",config);
}
function parsingComplete(result,file){
	data=result.data;
	createNeuralNetwork();
	trainNeuralNetwork();
	accuracy=testNeuralNetwork();
	console.log("Accuracy= "+accuracy*100+"%");
}
function createNeuralNetwork(){
	// creating neural network with 2 hidden layers
	brain=new brain.NeuralNetwork(brainConfig);
}
function testNeuralNetwork(){
	var corrently_predicted=0;
	for(var i=8000;i<data.length;i++){
		var inputs=[];
		inputs[0]=parseInt(data[i][0])/40;
		inputs[1]=parseInt(data[i][1])/80;
		inputs[2]=parseInt(data[i][3])/600;
		var outputs=predict(inputs);
		if(analyseOutput(outputs)===data[i][4]){
			corrently_predicted++;
		}
	}
	return corrently_predicted/test_set_size;
}
function analyseOutput(outputs){
	var max_index=0;
	var max_value=outputs[0];
	var ouput_mapping_to_label=["critical","severe","mild","no"];
	for(var i=1;i<outputs.length;i++){
		if(outputs[i]>max_value){
			max_value=outputs[i];
			max_index=i;
		}
	}
	return ouput_mapping_to_label[max_index];
}
function predict(inputs){
	//predicting ouput for the given input
	return brain.run(inputs);
}
function trainNeuralNetwork(){
	// train the neural network
	var traning_data=[];
	for(var i=1;i<8000;i++){
		traning_data[i-1]=new Object();
		traning_data[i-1].input=[parseInt(data[i][0])/40,parseInt(data[i][1])/80,parseInt(data[i][3])/600];
		if(data[i][4]==="critical"){
			traning_data[i-1].output=[1,0,0,0];
		}
		else if(data[i][4]==="severe"){
			traning_data[i-1].output=[0,1,0,0];
		}
		else if(data[i][4]==="mild"){
			traning_data[i-1].output=[0,0,1,0];
		}
		else if(data[i][4]==="no"){
			traning_data[i-1].output=[0,0,0,1];
		}
	}
	brain.train(traning_data);
	console.log("Training Completed");
}