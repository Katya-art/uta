let tokeize = require("../tokenizer")

var dict ={"дуже":1.15, "зовсім":1.20}

function first_method(data){
	var sum = 0
	var tone = 0
	var result = 0
	var coeff = 1
	var res_msg = ""
	for (var item of data){
		var tmp = item.tone
		tmp *= coeff
		coeff = 1
		if (typeof(item.interpretation) == "object"){
			var names = item.interpretation.map(
				function (list){
				return list.mainForm
				})
			if (Object.keys(dict).includes(names) == true){
				coeff = dict[names]
				console.log(coeff)
			}
		}
		if (item.tone != 0){
			sum ++
			tone += tmp
		}
	}
	result = tone / sum
	if (result >= 0.5 && result < 1.5){
		res_msg = "neutral"
	} else if (result >1.5 ){
		res_msg = "positive"
	} else {
		res_msg = "negetive"
	}
	return res_msg
}

module.exports = {
	route: "/my_try",
	handler: (req, res) => {
		tokeize(req.body.text)
			.then(tokens => {
				res.send({tone:first_method(tokens)})
			})
	}
}

