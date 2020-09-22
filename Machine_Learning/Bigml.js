/** Requires BigML Node.js bindings
 *
 * Install via: npm install bigml
 *
 * or clone it:
 *   git clone https://github.com/bigmlcom/bigml-node.git
 */
var bigml = require('bigml');
// Downloads and generates a local version of the model.
var model = new bigml.LocalModel('model/5f69bab695a9306a9e0020f2', new bigml.BigML("galhadida80", "33b1ef017b9bf25af4a2bb9c033613ed96afc479", {"domain": "bigml.io"}));

var inputData = [{ ".city": "Jerusalem", ".topic": "Medication", ".language": "ENGLISH", ".gender": "Male", ".age": 18 }
	, { ".city": "Jerusalem", ".topic": "Medication", ".language": "ENGLISH", ".gender": "Male", ".age": 99 }];
model.predict(inputData, function (error, data) {

	console.log(data);
	console.log(data["prpbability"]);
});
