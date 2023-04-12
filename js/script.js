class htmlElement {
	constructor(id) {
		this.element = document.getElementById(id);
	}

	append(tag, content) {
		let childElement = document.createElement(tag);
		childElement.textContent = content;
		this.element.appendChild(childElement);
	}

	removeAllChild() {
		let count = this.element.childElementCount;
		for (let i = 0; i < count; i++) {
			this.element.removeChild(this.element.firstChild);
		}
	}
}

class Random {
	int(min, max) {
		let result = min + Math.floor(Math.random() * (max - min));
		return result;
	}

	intArray(min, max, length) {
		let result = [];
		for (let i = 0; i < length; i++) {
			result.push(this.int(min, max));
		}
		return result;
	}
}

function createPartition(blockCount, elementCount) {
	let [min, max] = [0, elementCount];
	let bothEnds = [min, max];
	let rnd = new Random();
	let result = bothEnds.concat(rnd.intArray(min, max, blockCount - 1));
	result.sort((a, b) => a - b);
	return result;
}

function createText(toDoList, partition, day) {
	let [st, ed] = [partition[day], partition[day + 1]]
	let actCount = ed - st;
	let action = '';
	if (actCount == 0) {
		action = 'お休みになった';
	} else {
		for (let i = 0; i < actCount; i++) {
			action += toDoList[st + i];
			if (i < actCount - 1) {
				action += 'と';
			} else {
				action += 'をつくられた';
			}
		}
	}
	let result = `${day + 1}日目　神は${action}。`;
	return result;
}

function run() {
	const week = 7;
	let toDoList = ["天", "地",  "光",  "空",  "大地", "海",  "植物", "太陽", "月", "星", "魚", "鳥", "獣", "家畜", "人"];
	let wa = new htmlElement('writeArea');
	wa.removeAllChild();
	let partition = createPartition(week, toDoList.length);
	for (let i = 0; i < week; i++) {
		wa.append('p', createText(toDoList, partition, i))
	}
}