var entryList = [ null,
                  ["entry_2051379942", "dummy building name"], 
                  ["entry_145066371" , ""],
                  ["entry_245708505" , "高1", "高2", "高3", "高卒"],
                  ["entry_950733399" , "高校進度対応コース", "志望大学別受験コース"],
                  ["entry_1677092645", ""], 
                  ["entry_958921360" , "英語", "数学", "国語", "理科", "社会"],
                  ["entry_1094300140", "とてもわかりやすかった", "わかりやすかった", "あまりわからなかった", "まったくわからなかった"],
                  ["entry_917395982" , "とても前向きに学習できている", "前向きに学習できている", "あまり前向きに学習できていない", "まったく前向きに学習できていない"],
                  ["entry_156270085" , "とても忙しい", "忙しい", "あまり忙しくない", "まったく忙しくない"],
                  ["entry_1875463355", "とても集中できた", "集中できた", "あまり集中できなかった", "まったく集中できなかった"],
                  ["entry_23034015"  , "とても役に立った", "役に立った", "あまり役に立たなかった", "まったく役に立たなかった"],
                  ["entry_932576748" , ""],
                  ["entry_254725833" , "とても熱心に指導してくれた", "熱心に指導してくれた", "あまり熱心に指導してくれなかった", "まったく熱心に指導してくれなかった"],
                  ["entry_1410177112", "とても楽しかった", "楽しかった", "あまり楽しくなかった", "まったく楽しくなかった"],
                  ["entry_306974533" , ""]
                ];

var valueList = [ null,
                  "いちのみやみなみ", // 校舎名 
                  "", // 生徒氏名
                  0,  // 学年
                  0,  // コース
                  "", // 代ゼミ講師氏名
                  [false, false, false, false, false, false], // 受講科目
                  0,  // 授業の分かりやすさ
                  0,  // 学習意欲
                  0,  // 学校・部活の忙しさ
                  0,  // 授業の集中度
                  0,  // 授業の有用性
                  "", // 担任講師氏名
                  0,  // 担任講師の熱意
                  0,  // 本日の塾・授業の楽しさ
                  ""  // 単語テスト進捗
                ];

window.onload = function(){
	op.initialize();
	op.setTutor();
}

var op = {
	myTable : undefined,
	initialize : function() {
		op.myTable = document.getElementById("myTable");
	},
	ClickCell : function() {
		var row = event.target.parentNode.rowIndex;
		var col = event.target.cellIndex;
		op.setValue(row, col, false);
	},
	setValue : function(i, val, isOverwriting) {
		if(Array.isArray(valueList[i]) == false) {
			valueList[i] = val;
		} else {
			op.setArray(i, val, isOverwriting);
		}
		if(typeof(val) != 'string') {
			op.setRowColor(i, val);
		}
	},
	setArray(i, val, isOverwriting) {
		if(isOverwriting == true) {
			valueList[i] = valueList[i].map(function(){return false;});
			valueList[i][val] = true;
		} else {
			valueList[i][val] = ! valueList[i][val];
		}
	},
	setRowColor : function(row, col) {
		if(Array.isArray(valueList[row]) == false) {
			for(var i = 1; i < entryList[row].length; i++) {
				setColor(op.myTable.rows[row].cells[i], "#000000", "#ffffff");
			}
			if(col > 0) {
				setColor(op.myTable.rows[row].cells[col], "#ffffff", "#000000");
			}
		} else {
			for(var i = 1; i < entryList[row].length; i++) {
				if(valueList[row][i] == false) {
					setColor(op.myTable.rows[row].cells[i], "#000000", "#ffffff");
				} else {
					setColor(op.myTable.rows[row].cells[i], "#ffffff", "#000000");
				}
			}
		}
	},
	setStudentName : function() {
		var studentName = event.target.value;
		op.setValue(2, studentName, false);
		op.setProfile(studentName);
	},
	setProfile : function(studentName) {
		for(var i = 0; i < studentList.length; ++i) { // very very dasai
			if(studentList[i][2] == studentName) {
				for(var j = 3; j < 16; ++j) {
					switch(typeof(studentList[i][j])) {
						case 'number':
							op.setValue(j, studentList[i][j], true); // 科目も多分これでいける
							break;
						case 'string':
							break;
						default:
							;
					}
				}
				document.getElementById("yozemi").value = studentList[i][5];
				op.setValue(5, studentList[i][5], false);
				document.getElementById("word").value   = studentList[i][15];
				op.setValue(15, studentList[i][15], false);
				break;
			}
		}
	},
	setTutor : function() {
		var tutorName = tutorList[new Date().getDay()];
		document.getElementById("tutor").value  = tutorName;
		op.setValue(12, tutorName, false);
	}
};

var jump = {
	link : "https://docs.google.com/forms/d/e/1FAIpQLSflJmwEB9ZWqFhEID4cMOSvP5Pa9yhehmfkPmE18FD6gFtQlA/viewform?",
	submit : function() {
		var urlArray = [];
		valueList.forEach(function(value, index, ar) {
			var tmp = jump.generateParameter(value, index);
			if(tmp != "") {
				urlArray.push(tmp);
			}
		});
		var url = jump.link + array2string(urlArray, "&");
		console.log(url);
		window.location.href = url;
	},
	generateParameter : function(value, index) {
		var ret = "";
		switch(typeof(value)) {
			case 'number':
				if(value != 0) {
					ret = entryList[index][0] + "=" + entryList[index][value];
				}
				break;
			case 'string':
				if(value != "") {
					ret = entryList[index][0] + "=" + value;
				}
				break;
			case 'object':
				if(Array.isArray(value) == true) {
					var retList = [];
					for(var i = 1; i < valueList[index].length; ++i) {
						if(valueList[index][i] == true) {
							retList.push(entryList[index][i]);
						}
					}
					ret = array2string(retList, "|");
					if(ret !=  "") {
						ret = entryList[index][0] + "=" + array2string(retList, "|");
					}
				}
				break;
			default:
				break;
		}
		return ret;
	}
}

function setColor(obj, color, background) {
	obj.style.color = color;
	obj.style.backgroundColor = background;
}

/*
 *  文字列配列 array を 文字列 split で区切って1つの文字列に結合
 */
function array2string(array, split) {
	if(Array.isArray(array) == false) {
		return null;
	}
	var ret = "";
	for(let i = 0; i < array.length; ++i) {
		if(i == 0) {
			ret = ret + array[i];
		} else {
			ret = ret + split + array[i];
		}
	}
	return ret;
}