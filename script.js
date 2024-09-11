"use strict";

void function(){

let cursorX = 0
let cursorY = 0
let lastTick = Date.now()

let taskList
let taskNumber
let mistakes
let tasksFailed
let specialTasksFailed
let isTyping
let isBold
let isItalic
let fontSizeSelected
let invincibilityTime
let trafficTime
let keyEmojiUsed
let taskPressesData
let batteryPercent
let ballPosition
let unlockedLock
let finalTimer
let startTime
let updateBall = function(){}

let task99ObfuscateTimer = Date.now()

let mechanics = document.createElement("div")
mechanics.id = "mechanics"

let trafficLight = document.createElement("div")
trafficLight.style["background-color"] = "#999"
trafficLight.style.border = "8px solid #999999"
trafficLight.style.float = "left"
trafficLight.style["margin-right"] = "20px"

let redLight = document.createElement("div")
redLight.style["background-color"] = "#f00"
redLight.style["border-radius"] = "50%"
redLight.style.margin = "8px"
redLight.style.width = "28px"
redLight.style.height = "28px"

let yellowLight = document.createElement("div")
yellowLight.style["background-color"] = "#ff0"
yellowLight.style["border-radius"] = "50%"
yellowLight.style.margin = "8px"
yellowLight.style.width = "28px"
yellowLight.style.height = "28px"

let greenLight = document.createElement("div")
greenLight.style["background-color"] = "#0f0"
greenLight.style["border-radius"] = "50%"
greenLight.style.margin = "8px"
greenLight.style.width = "28px"
greenLight.style.height = "28px"

let batteryMenu = document.createElement("div")
batteryMenu.style.float = "left"
batteryMenu.style["margin-right"] = "20px"

let batteryTop = document.createElement("div")
batteryTop.style["background-color"] = "black"
batteryTop.style.width = "20px"
batteryTop.style.height = "5px"
batteryTop.style.transform = "translateX(12px)"

let batteryBorder = document.createElement("div")
batteryBorder.style.width = "40px"
batteryBorder.style.height = "100px"
batteryBorder.style.border = "2px solid black"

let batteryFill = document.createElement("div")
batteryFill.style["background-color"] = "yellow"

let chargeButton = document.createElement("button")
chargeButton.id = "chargeButton"
chargeButton.textContent = "Charge!"

let timerBorder = document.createElement("div")
timerBorder.style.float = "left"
timerBorder.style["margin-right"] = "20px"
timerBorder.style["background-color"] = "#999"
timerBorder.style.border = "4px solid #999"
timerBorder.style["border-radius"] = "6px"
timerBorder.style["-webkit-user-select"] = "none"
timerBorder.style["-ms-user-select"] = "none"
timerBorder.style["user-select"] = "none"
timerBorder.style["pointer-events"] = "none"

let timer = document.createElement("div")
timer.style.width = "3.6rem"
timer.style["background-color"] = "black"
timer.style.border = "0.5rem solid black"
timer.style["border-radius"] = "4px"
timer.style.color = "#f00"
timer.style["font-size"] = "2rem"
timer.style["font-family"] = "monospace"
timer.style["text-align"] = "center"
timer.style["text-shadow"] = "0 0 8px #ff0000"

timer.textContent = "1:00"

let boldButton = document.createElement("button")
boldButton.style["margin-right"] = "4px"

let italizeButton = document.createElement("button")
italizeButton.style["margin-right"] = "4px"

let fontSizeMenu = document.createElement("div")
fontSizeMenu.style["margin-top"] = "8px"

let fontSizeSelection = document.createElement("select")
fontSizeSelection.classList.add("button")
fontSizeSelection.value = "1.6rem"
fontSizeSelection.style["font-size"] = "1.6rem"

let winScreen = document.createElement("div")
winScreen.innerHTML = "You Win!<br>Good job and thank you for playing!"
winScreen.style["text-align"] = "center"
winScreen.style["font-size"] = "3.2rem"
winScreen.style["font-weight"] = "bold"
winScreen.style["text-shadow"] = "0 0 1rem yellow"

const primesAbove70 = [71, 73, 79, 83, 89, 97]

const id = id => document.getElementById(id)

document.body.insertBefore(mechanics, id("tasks"))

trafficLight.appendChild(redLight)
trafficLight.appendChild(yellowLight)
trafficLight.appendChild(greenLight)

batteryBorder.appendChild(batteryFill)

batteryMenu.appendChild(batteryTop)
batteryMenu.appendChild(batteryBorder)
batteryMenu.appendChild(chargeButton)

timerBorder.appendChild(timer)

let defaultFontSize = document.createElement("option")
defaultFontSize.value = "1.6rem"
defaultFontSize.textContent = "Default"
defaultFontSize.classList.add("button")
fontSizeSelection.appendChild(defaultFontSize);

[28, 24, 20, 18, 16, 14, 12, 10, 8, 6, 5, 4, 3, 2].forEach(fontSize => {
	let fontSizeOption = document.createElement("option")
	fontSizeOption.value = fontSize + "px"
	fontSizeOption.textContent = fontSize + " pixels"
	fontSizeOption.classList.add("button")
	fontSizeSelection.appendChild(fontSizeOption)
})

let smallestFontSize = document.createElement("option")
smallestFontSize.value = "1px"
smallestFontSize.textContent = "1 pixel"
smallestFontSize.classList.add("button")
fontSizeSelection.appendChild(smallestFontSize)

fontSizeMenu.appendChild(document.createTextNode("Font Size: "))
fontSizeMenu.appendChild(fontSizeSelection)

id("userArea").appendChild(fontSizeMenu)

const startGame = function(){
	taskList = [generate(0)]
	mistakes = 0
	tasksFailed = [0, 0, 0]
	specialTasksFailed = {
		10: 0,
		20: 0,
		30: 0,
		40: 0,
		50: 0,
		60: 0,
		70: 0,
		80: 0,
		90: 0
	}
	
	isTyping = false
	isBold = false
	isItalic = false
	trafficTime = 0
	invincibilityTime = 0
	keyEmojiUsed = null
	fontSizeSelected = "1.6rem"
	taskNumber = 1
	taskPressesData = [0, 0, 0, 0, 0, 0]
	batteryPercent = 100000
	ballPosition = 0
	unlockedLock = false
	finalTimer = 0
	startTime = Date.now()
	
	id("tasks").innerHTML = ''
	
	id("input").value = ''
	
	id("userArea").classList.remove("hide")
	id("tasks").classList.remove("hide")
	mechanics.classList.remove("hide")
	
	id("failScreen").classList.add("hide")
	
	mechanics.remove()
	
	batteryMenu.remove()
	trafficLight.remove()
	timerBorder.remove()
	
	boldButton.remove()
	italizeButton.remove()
	
	fontSizeMenu.remove()
	fontSizeSelection.value = "1.6rem"
	
	updateInputStyle()
	updateTasks()
	
	document.removeEventListener("paste", failTask80)
}

const toRomanNumeral = number => {
	if (number <= 3) return "I".repeat(number)
	if (number === 4) return "IV"
	if (number <= 8) return "V" + toRomanNumeral(number - 5)
	if (number === 9) return "IX"
	if (number <= 39) return "X".repeat(number / 10) + toRomanNumeral(number % 10)
	if (number <= 49) return "XL" + toRomanNumeral(number - 40)
	if (number <= 89) return "L" + toRomanNumeral(number - 50)
	if (number <= 99) return "XC" + toRomanNumeral(number - 90)
	return "C"
}

const toOrdinal = number => ["zeroeth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"][number]

const toCardinal = number => {
	let ones = ['', "-one", "-two", "-three", "-four", "-five", "-six", "-seven", "-eight", "-nine"]
	let teen = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
	let tens = ['', '', "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
	
	if (number === 0) return "zero"
	if (number < 10) return ones[number].slice(1)
	if (number < 20) return teen[number - 10]
	if (number < 100) return tens[Math.floor(number / 10)] + ones[number % 10]
	if (number < 1000) return ones[Math.floor(number / 100)].slice(1) + " hundred" + (number % 100 ? (" " + toCardinal(number % 100)) : '')
	if (number < 1e6) return toCardinal(Math.floor(number / 1000)) + " thousand" + (number % 1000 ? (" " + toCardinal(number % 1000)) : '')
}

const failTask70 = () => {
	if (taskNumber >= 101) return true
	specialTasksFailed[70]++
	mistakes++
}

const failTask80 = () => {
	if (taskNumber >= 101) return true
	specialTasksFailed[80]++
	mistakes++
	updateSpecialTask(80)
}

const task10Condition = txt => {
	if (taskNumber >= 100) return true
	if (txt === "Here it is:") return true
	specialTasksFailed[10]++
	mistakes++
}

const task20Condition = () => {
	if (taskNumber >= 101) return true
	
	let even = taskNumber % 2 === 0
	let third = taskNumber % 3 === 0
	let fail = false
	
	if (even && !isBold) fail = true
	if (third && !isItalic) fail = true
	if (!even && isBold) fail = true
	if (!third && isItalic) fail = true
	
	if (fail) {
		specialTasksFailed[20]++
		mistakes++
	}
}

const task30Condition = () => {
	if (taskNumber >= 101) return true
	
	let correct = true
	if (taskNumber >= 30 && taskNumber <= 34 && fontSizeSelected !== "28px") correct = false
	if (taskNumber >= 35 && taskNumber <= 39 && fontSizeSelected !== "24px") correct = false
	if (taskNumber >= 40 && taskNumber <= 44 && fontSizeSelected !== "20px") correct = false
	if (taskNumber >= 45 && taskNumber <= 49 && fontSizeSelected !== "18px") correct = false
	if (taskNumber >= 50 && taskNumber <= 54 && fontSizeSelected !== "16px") correct = false
	if (taskNumber >= 55 && taskNumber <= 59 && fontSizeSelected !== "14px") correct = false
	if (taskNumber >= 60 && taskNumber <= 64 && fontSizeSelected !== "12px") correct = false
	if (taskNumber >= 65 && taskNumber <= 69 && fontSizeSelected !== "10px") correct = false
	if (taskNumber >= 70 && taskNumber <= 74 && fontSizeSelected !== "8px") correct = false
	if (taskNumber >= 75 && taskNumber <= 79 && fontSizeSelected !== "6px") correct = false
	if (taskNumber >= 80 && taskNumber <= 84 && fontSizeSelected !== "5px") correct = false
	if (taskNumber >= 85 && taskNumber <= 89 && fontSizeSelected !== "4px") correct = false
	if (taskNumber >= 90 && taskNumber <= 94 && fontSizeSelected !== "3px") correct = false
	if (taskNumber >= 95 && taskNumber <= 99 && fontSizeSelected !== "2px") correct = false
	if (taskNumber === 100 && fontSizeSelected === "1px") correct = false
	
	if (correct) return true
	
	specialTasksFailed[30]++
	mistakes++
}

const task50Condition = txt => {
	if (taskNumber >= 100) return true
	
	let romanNumeral = toRomanNumeral(taskNumber)
	let reverse = Array.from(romanNumeral).reverse().join('')
	
	if (primesAbove70.includes(taskNumber) && !txt.includes(reverse)) failTask70()
	
	if (txt.includes(romanNumeral) || txt.includes(reverse)) return true
	
	specialTasksFailed[50]++
	mistakes++
}

const task60Condition = traffic => {
	if (trafficTime <= 12000) return true
	specialTasksFailed[60]++
	mistakes++
}

const task90Condition = () => {
	if (taskNumber < 90 || taskNumber >= 101) return finalTimer = Date.now()
	
	timer.textContent = Math.ceil((finalTimer - Date.now()) / 1000 + 100)
	
	if (Date.now() - finalTimer < 100000) return true
	specialTasksFailed[90]++
	mistakes++
	finalTimer = Date.now()
}

const task99Obfuscate = () => {
	if (taskNumber !== 99) return false
	
	taskList[79].display.style["font-family"] = ''
	
	for (let i = 0; i < 98; i++) {
		let random = ''
		
		for (let j = 0; j < 4; j++) random += String.fromCharCode(Math.floor(Math.random() * 256))
		
		id("tasks").children[i].innerHTML = (i + 1) + ". " + random
	}
}

const task100Obfuscate = () => {
	for (let i = 0; i < 99; i++) id("tasks").firstChild.remove()
}

const generate = (taskId, seed) => {
	let display = document.createElement("div")
	let data = null
	let answer = null
	let criteria = () => true
	let run = false
	
	let task
	
	try {
	
	switch(taskId){
	
	case 1: {
		let variation = Math.floor(Math.random()*4)
		if (seed !== undefined) variation = seed[0]
		
		let colour = ["red", "green", "blue", "yellow"][variation]
		
		task = document.createTextNode("Put the colour of this square: ")
		display.appendChild(task)
		
		task = document.createElement("div")
		task.classList.add("box", colour)
		display.appendChild(task)
		
		data = [variation]
		criteria = txt => txt.toLowerCase().includes(colour)
		
		break;
	}
	case 2: {
		let numbers = []
		for (let i = 0; i < 5; i++) numbers.push(Math.floor(Math.random() * 11))
		
		let largest = numbers.toSorted((num1, num2) => num1 < num2)[0]
		let firstIndex = -1
		
		numbers.forEach((item, index) => {
			if (item !== largest) return
			if (firstIndex === -1) return firstIndex = index
			numbers[index] = largest - 1
		})
		
		if (seed !== undefined) numbers = seed
		
		task = document.createTextNode("Pick the greatest number: " + numbers.join(", "))
		display.appendChild(task)
		
		data = numbers
		criteria = txt => txt.includes(String(largest))
		
		break;
	}
	case 3: {
		let numbers = []
		for (let i = 0; i < 5; i++) numbers.push(Math.floor(Math.random() * 10) + 1)
		if (seed !== undefined) numbers = seed
		
		task = document.createTextNode("Add these numbers: " + numbers.join(", "))
		display.appendChild(task)
		
		data = numbers
		answer = String(numbers.reduce(function(accumulator, count){return accumulator + count}))
		criteria = txt => txt.includes(answer)
		
		break;
	}
	case 4: {
		let variation = Math.floor(Math.random() * 4)
		
		let words = [
			["The rock is broken", "rock"],
			["The floor is cold", "floor"],
			["The stairs are large", "stair"],
			["The plane is flying", "plane"]
		]
		
		if (seed !== undefined) variation = seed[0]
		
		task = document.createTextNode("Put the noun in the sentence: " + words[variation][0] + ".")
		display.appendChild(task)
		
		data = [variation]
		criteria = txt => txt.toLowerCase().includes(words[variation][1])
		
		break;
	}
	case 5: {
		let variation = Math.floor(Math.random() * 4)
		let words = ["mp4", "png", "txt", "wav"]
		if (seed !== undefined) variation = seed[0]
		
		let fileFormat = words[variation]
		
		task = document.createTextNode("Put in the best description of the file format ")
		display.appendChild(task)
		
		task = document.createElement("span")
		task.style["text-decoration"] = "underline"
		task.textContent = "." + fileFormat
		display.appendChild(task)
		
		task = document.createTextNode(" from these options: Video, Audio, Image, Document.")
		display.appendChild(task)
		
		data = [variation]
		criteria = txt => txt.toLowerCase().includes(["video", "image", "document", "audio"][variation])
		
		break;
	}
	case 6: {
		let numbers = []
		for (let i = 0; i < 2; i++) numbers.push(Math.floor(Math.random() * 9) + 2)
		if (seed !== undefined) numbers = seed
		
		task = document.createTextNode("Multiply " + numbers[0] + " by " + numbers[1] + ".")
		display.appendChild(task)
		
		data = numbers
		criteria = txt => txt.includes(String(numbers[0] * numbers[1]))
		
		break;
	}
	case 7: {
		task = document.createTextNode("Put in the month.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes([
			"january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"
		][(new Date).getMonth()])
		
		break;
	}
	case 8: {
		task = document.createTextNode("Put in a leap year.")
		display.appendChild(task)
		
		criteria = txt => {
			if (isNaN(txt)) return false
			let number = Number(txt)
			if (number % 100 === 0 && number % 400 !== 0) return false
			if (number % 4 === 0) return true
			if (number % 400 === 0) return true
			return false
		}
		
		break;
	}
	case 9: {
		task = document.createTextNode("Put the answer to task #3.")
		display.appendChild(task)
		
		criteria = txt => txt.includes(taskList[3].answer)
		data = document.createTextNode("3. ???")
		run = () => taskList[3].display.replaceWith(data)
		
		break;
	}
	case 10: {
		task = document.createTextNode("After this sentence, start of every input with \"Here it is:\", exactly.")
		display.appendChild(task)
		
		run = () => taskList[9].data.replaceWith(taskList[3].display)
		
		break;
	}
	case 11: {
		task = document.createTextNode("Take the sum of all numbers from 1 to 10.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("55")
		
		break;
	}
	case 12: {
		task = document.createTextNode("Put in the less than symbol.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("<")
		
		break;
	}
	case 13: {
		task = document.createTextNode("Put in a number that has the same amount of letters as its value.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("4") || txt.toLowerCase().includes("four")
		
		break;
	}
	case 14: {
		task = document.createTextNode("Simplify (1+8+9×6-81+52)×0.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("0") || txt.toLowerCase().includes("zero")
		
		break;
	}
	case 15: {
		task = document.createTextNode("Close or reload the tab.")
		display.appendChild(task)
		
		criteria = () => false
		run = () => {
			let data = ''
			
			for (let taskId = 1; taskId <= 6; taskId++) taskList[taskId].data.forEach(number => data += String.fromCharCode(number))
			data += String.fromCharCode(tasksFailed[0] + tasksFailed[1] * 15)
			data += String.fromCharCode(specialTasksFailed[10])
			data += String.fromCharCode(mistakes)
			
			let startTimeBuffer = new ArrayBuffer(8)
			let startTimeDataView = new DataView(startTimeBuffer)
			
			startTimeDataView.setFloat64(0, startTime, true);
			
			(new Uint8Array(startTimeBuffer)).forEach(character => data += String.fromCharCode(character))
			
			localStorage.setItem("task-data", data)
		}
		
		break;
	}
	case 16: {
		task = document.createTextNode("Put in a tertiary colour.")
		display.appendChild(task)
		
		criteria = txt => [
			"teal",
			"amber",
			"magenta",
			"chartreuse",
			"violet",
			"vermillion",
			"spring green",
			"azure",
			"rose",
			"slate",
			"russet",
			"citron"
		].reduce((condition, colour) => condition || txt.toLowerCase().includes(colour), false)
		
		run = () => localStorage.getItem("task-data") !== null ? localStorage.removeItem("task-data") : false
		
		break;
	}
	case 17: {
		task = document.createTextNode("Put in a day of the week.")
		display.appendChild(task)
		
		criteria = txt => ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].reduce((a, c) => a || txt.toLowerCase().includes(c), false)
		
		break;
	}
	case 18: {
		task = document.createTextNode("Put in the ampersand symbol.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("&")
		
		break;
	}
	case 19: {
		task = document.createTextNode("Put in all the integers starting from 0 to 20, from least to greatest, with no spacers.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("01234567891011121314151617181920")
		
		break;
	}
	case 20: {
		task = document.createTextNode("Every even task must be bolded and every task divisible by three must be italicized, otherwise don't add styling.")
		display.appendChild(task)
		
		criteria = () => true
		
		run = () => {
			id("userArea").appendChild(boldButton)
			id("userArea").appendChild(italizeButton)
		}
		
		break;
	}
	case 21: {
		task = document.createTextNode("Put the full link to this page.")
		display.appendChild(task)
		
		criteria = txt => {
			let href = location.href
			if (href.at(-1) === "/") href = href.slice(0, -1)
			return txt.includes(href)
		}
		
		break;
	}
	case 22: {
		let numbers = []
		numbers.push(Math.floor(Math.random() * 4) + 1)
		numbers.push(Math.floor(Math.random() * 4) + 1)
		let words = [null, "hydrogen", "helium", "lithium", "beryllium"]
		
		task = document.createTextNode("Add the atomic numbers of " + words[numbers[0]] + " and " + words[numbers[1]])
		display.appendChild(task)
		
		criteria = txt => txt.includes(String(numbers[0] + numbers[1]))
		
		break;
	}
	case 23: {
		task = document.createTextNode("Put in a star emoji.")
		display.appendChild(task)
		
		criteria = txt => Array.from("⭐🌟🌠✨⋆☆⭑✦✧✩✰✪💫⭒✬✭✮✯✫✡꙳★🔯⛧⛥⛤⍟✵✶⚝🟌").reduce((accumulator, star) => accumulator || txt.includes(star), false)
		
		break;
	}
	case 24: {
		task = document.createTextNode("Put in the rate of change of distance.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("speed")
		
		break;
	}
	case 25: {
		task = document.createTextNode("Put in a hindu-arabic numeral.")
		display.appendChild(task)
		
		criteria = txt => /[0-9]/.test(txt)
		
		break;
	}
	case 26: {
		task = document.createTextNode("Put the century of the Steam Age.")
		display.appendChild(task)
		
		criteria = txt => {
			let lowerCase = txt.toLowerCase()
			let correct = lowerCase.includes("19")
			correct = correct || lowerCase.includes("18")
			correct = correct || lowerCase.includes("20")
			correct = correct || lowerCase.includes("eighteen")
			correct = correct || lowerCase.includes("nineteen")
			correct = correct || lowerCase.includes("twenty")
			correct = correct || lowerCase.includes("twentieth")
			return correct
		}
		
		break;
	}
	case 27: {
		task = document.createTextNode("Put in the complete latin phrase of QED.")
		display.appendChild(task)
		
		criteria = txt => {
			let lowerCase = txt.toLowerCase()
			let correct = lowerCase.includes("quod")
			correct = correct && lowerCase.includes("erat")
			correct = correct && lowerCase.includes("demonstrandum")
			return correct
		}
		
		break;
	}
	case 28: {
		task = document.createTextNode("Put the date with a leap second before 2020. (DD/MM/YYYY)")
		display.appendChild(task)
		
		criteria = txt => txt.includes("31/12/2016")
		
		break;
	}
	case 29: {
		let variation = Math.floor(Math.random() * 2)
		
		task = document.createTextNode("Put in the name of the " + ["neoproterozoic", "mesoproterozoic"][variation] + " supercontinent.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("rodinia")
		
		break;
	}
	case 30: {
		task = document.createTextNode("The font size of the input must decrease every 5 tasks starting from 28 pixels.")
		display.appendChild(task)
		
		criteria = () => true,
		run = () => id("userArea").appendChild(fontSizeMenu)
		
		break;
	}
	case 31: {
		task = document.createTextNode("Your input must have exactly seven letter g's.")
		display.appendChild(task)
		
		criteria = function(txt){
			let lowerCase = txt.toLowerCase()
			let amount = 0
			
			while (amount < 9) {
				amount++
				if (!lowerCase.includes("g")) break
				lowerCase = lowerCase.slice(lowerCase.indexOf("g") + 1)
			}
			
			return amount === 7
		}
		
		break;
	}
	case 32: {
		task = document.createTextNode("Your input must include only a single element from the periodic table that has two letters, only for this task.")
		display.appendChild(task)
		
		criteria = txt => {
			let after = txt.slice(11).toLowerCase()
			let wrong = "He,Li,Be,Ne,Na,Mg,Al,Si,Cl,Ar,Ca,Sc,Ti,Cr,Mn,Fe,Co,Ni,Cu,Zn,Ga,Ge,As,Se,Br,Ke,Rb,Sr,Zr,Nb,Mo,Tc,Ru,Rh,Pd,Ag,Cd,In,Sn,Sb,Te,Xe,Cs,Ba,La,Ce,Pr,Nd,Pm,Sm,Eu,Gb,Tb,Dy,Ho,Er,Tm,Yb,Lu,Hf,Ta,Re,Os,Ir,Pt,Au,Hg,Tl,Pb,Bi,Po,At,Rn,Fr,Ra,Ac,Th,Pa,Np,Pu,Am,Cm,Bk,Cf,Es,Fm,Md,No,Lr,Rf,Db,Sg,Bh,Hs,Mt,Ds,Rg,Cn,Nh,Fl,Mc,Lv,Ts,Og"
			.split(",").reduce((accumulator, elm) => accumulator || after.includes(elm), false)
			
			return !wrong
		}
		
		break;
	}
	case 33: {
		let numbers = []
		for (let amount = 0; amount < 25; amount++) numbers.push(Math.floor(Math.random() * 900) + 100)
		
		task = document.createTextNode("Pick the smallest number from the selection: " + numbers.join(", "))
		display.appendChild(task)
		
		criteria = txt => txt.includes(numbers.reduce((accumulator, number) => Math.min(accumulator, number)).toString())
		
		break;
	}
	case 34: {
		task = document.createTextNode("Put in the acceleration of the gravity of the Earth to two decimal places.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("9.8")
		
		break;
	}
	case 35: {
		task = document.createTextNode(".tebahpla eht fo rettel tsal eht ni tuP")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("z")
		
		break;
	}
	case 36: {
		task = document.createTextNode("Put in the task number.")
		display.appendChild(task)
		
		run = () => {
			for (let i = 1; i < 36; i++) taskList[i].display.remove()
			
			// https://scp-wiki.wikidot.com/scp-1459-j
			let xsponge = document.createElement("div")
			xsponge.textContent = ""
			xsponge.style.display = "block"
			xsponge.style.float = "left"
			xsponge.style.width = (427 / 15) + "px"
			xsponge.style.height = "28px"
			xsponge.style.color = "black"
			xsponge.style["background-color"] = "black"
			xsponge.style["-webkit-user-select"] = "none"
			xsponge.style["-ms-user-select"] = "none"
			xsponge.style["user-select"] = "none"
			xsponge.style["pointer-events"] = "none"
			
			let format = document.createTextNode(". ")
			
			taskList[36].display.childNodes[0].replaceWith(format)
			taskList[36].display.insertBefore(xsponge, format)
		}
		
		break;
	}
	case 37: {
		task = document.createTextNode("Put in the full name of the inventor of the reflecting telescope.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("isaac") && txt.toLowerCase().includes("newton")
		run = () => {
			for (let taskId = 35; taskId > 0; taskId--) {
				id("tasks").insertBefore(taskList[taskId].display, id("tasks").children[0])
			}
			
			taskList[36].display.childNodes[0].replaceWith(document.createTextNode("36"))
			id("tasks").children[35].childNodes[0].replaceWith(document.createTextNode("36"))
			
			id("tasks").scrollTo(0, 999999999)
		}
		
		break;
	}
	case 38: {
		task = document.createTextNode("Click or tap ")
		display.appendChild(task)
		
		let button = document.createElement("button")
		
		button.addEventListener("click", () => taskNumber === 38 ? taskPressesData[0]++ : null)
		
		button.textContent = "this button"
		button.classList.add("button")
		display.appendChild(button)
		
		task = document.createTextNode(" exactly 17 times.")
		display.appendChild(task)
		
		criteria = () => taskPressesData[0] === 17
		
		break;
	}
	case 39: {
		task = document.createTextNode("Put in an octothorpe.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("#")
		
		break;
	}
	case 40: {
		task = document.createTextNode("From now on, your battery must not go below 0% nor exceed 100%, clicking the charge button increases your battery by 10%.")
		display.appendChild(task)
		
		run = () => {
			mechanics.appendChild(batteryMenu)
			
			document.body.insertBefore(mechanics, id("tasks"))
		}
		
		break;
	}
	case 41: {
		task = document.createTextNode("Put in a direct link to a youtube channel")
		display.appendChild(task)
		
		criteria = txt => {
			let lowerCase = txt.toLowerCase()
			if (!lowerCase.includes("youtube")) return false
			
			let channelLink = lowerCase.slice(lowerCase.indexOf("youtube"))
			if (!channelLink.includes("/")) return false
			
			channelLink = channelLink.slice(channelLink.indexOf("/") + 1)
			
			if (channelLink.includes("user/"))		 return channelLink.length >= 6
			else if (channelLink.includes("c/"))	   return channelLink.length >= 3
			else if (channelLink.includes("channel/")) return channelLink.length === 32
			else if (channelLink.includes("@"))		return channelLink.length >= 4 && channelLink.length <= 32
				
			return false
		}
		
		break;
	}
	case 42: {
		task = document.createTextNode("Modify the equation so it becomes true: ")
		display.appendChild(task)
		
		let button = document.createElement("button")
		
		button.addEventListener("click", () => {
			if (taskNumber !== 42) return false
			taskPressesData[0]++
			button.textContent = 42 - taskPressesData[0]
		})
		
		button.textContent = "42"
		button.classList.add("button")
		display.appendChild(button)
		
		task = document.createTextNode(" = 0")
		display.appendChild(task)
		
		criteria = () => taskPressesData[0] === 42
		
		break;
	}
	case 43: {
		task = document.createTextNode("Put in the year that Constantinepole fell.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("1453")
		
		break;
	}
	case 44: {
		task = document.createTextNode("Put in a noble gas.")
		display.appendChild(task)
		
		criteria = txt => {
			let lowerCase = txt.toLowerCase()
			let correct = lowerCase.includes("helium")
			correct = correct || lowerCase.includes("he")
			correct = correct || lowerCase.includes("neon")
			correct = correct || lowerCase.includes("ne")
			correct = correct || lowerCase.includes("argon")
			correct = correct || lowerCase.includes("ar")
			correct = correct || lowerCase.includes("krypton")
			correct = correct || lowerCase.includes("kr")
			correct = correct || lowerCase.includes("xenon")
			correct = correct || lowerCase.includes("xe")
			correct = correct || lowerCase.includes("radon")
			correct = correct || lowerCase.includes("rn")
			return correct
		}
		
		break;
	}
	case 45: {
		task = document.createTextNode("Put in the rate of change of speed.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("acceleration")
		
		break;
	}
	case 46: {
		let variation = Math.floor(Math.random() * 4)
		let word = ["HTTPS", "SNMP", "ICMP", "FTP"][variation]
		
		task = document.createTextNode("Put in the meaning of the internet protocol: " + word + ".")
		display.appendChild(task)
		
		criteria =txt => {
			let lowerCase = txt.toLowerCase()
			let correct = true
			
			if (variation === 0) {
				correct = correct && lowerCase.includes("hypertext")
				correct = correct && lowerCase.includes("transfer")
				correct = correct && lowerCase.includes("secure")
			} else if (variation === 1) {
				correct = correct && lowerCase.includes("simple")
				correct = correct && lowerCase.includes("network")
				correct = correct && lowerCase.includes("management")
			} else if (variation === 2) {
				correct = correct && lowerCase.includes("internet")
				correct = correct && lowerCase.includes("control")
				correct = correct && lowerCase.includes("message")
			} else if (variation === 3) {
				correct = correct && lowerCase.includes("file")
				correct = correct && lowerCase.includes("transfer")
			}
			
			correct = correct && lowerCase.includes("protocol")
			
			return correct
		}
		
		break;
	}
	case 47: {
		task = document.createTextNode("Your input must have exactly 20% of its letters as the letter \"q\".")
		display.appendChild(task)
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			let length = lowercase.length
			let letters = 0
			let amount_q = 0
			
			for (let index = 0; index < length; index++) {
				if ((/[a-z]/).test(lowercase[index])) letters++
				else if (lowercase[index] === "q") amount_q++
			}
			
			return amount_q === letters / 5
		}
		
		break;
	}
	case 48: {
		let text_put = task = document.createTextNode("Put")
		let text_in = task = document.createTextNode("in")
		let text_exactly = task = document.createTextNode("exactly")
		let text_two = task = document.createTextNode("two")
		let text_question = task = document.createTextNode("question")
		let text_marks = task = document.createTextNode("marks")
		let text_period = task = document.createTextNode(".")
		
		task = document.createElement("span")
		task.style.display = "inline-block"
		task.style.width = "6.5rem"
		
		display.appendChild(task)
		task.appendChild(text_period)
		
		run = () => {
			text_period.remove()
			task.appendChild(text_put)
			
			setTimeout(() => {
				text_put.remove()
				task.appendChild(text_in)
			}, 1500)
			
			setTimeout(() => {
				text_in.remove()
				task.appendChild(text_exactly)
			}, 3000)
			
			setTimeout(() => {
				text_exactly.remove()
				task.appendChild(text_two)
			}, 5000)
			
			setTimeout(() => {
				text_two.remove()
				task.appendChild(text_question)
			}, 6500)
			
			setTimeout(() => {
				text_question.remove()
				task.appendChild(text_marks)
			}, 8250)
			
			setTimeout(() => {
				text_marks.remove()
				task.appendChild(text_period)
			}, 9750)
			
			setTimeout(run, 11250)
		}
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			let length = lowercase.length
			let questionAmount = 0
			
			for (let index = 0; index < length; index++) {
				if (lowercase[index] === "?") questionAmount++
				if (questionAmount > 2) break
			}
			
			return questionAmount === 2
		}
		
		break;
	}
	case 49: {
		task = document.createTextNode("Put the square root of the current task number.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("7") || txt.toLowerCase().includes("seven")
		
		break;
	}
	case 50: {
		task = document.createTextNode("You must include the roman numeral representation of the task number, even for the following tasks.")
		display.appendChild(task)
		
		break;
	}
	case 51: {
		task = document.createTextNode("Put in a key emoji.")
		display.appendChild(task)
		
		criteria = txt => {
			if (txt.includes("🔑")) keyEmojiUsed = "🔑"
			if (txt.includes("🗝️")) keyEmojiUsed = "🗝️"
			if (txt.includes("🗝")) keyEmojiUsed = "🗝"
			if (txt.includes("🔑") || txt.includes("🗝️") || txt.includes("🗝")) return true
			return false
		}
		
		break;
	}
	case 52: {
		task = document.createTextNode("Take the sum of all integers from 1 to 100.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("5050") || txt.includes("5,050")
		
		break;
	}
	case 53: {
		task = document.createTextNode("Click or tap the square that will allow you to win.")
		display.appendChild(task)
		
		task = document.createTextNode(" ")
		display.appendChild(task)
		
		let taskState = document.createElement("span")
		taskState.classList.add("taskState")
		display.appendChild(taskState)
		
		let board = [
			[
				"O#O",
				"XXO",
				"!XX"
			],
			[
				"XXO",
				"O#O",
				"!XX"
			],
			[
				"X!O",
				"X#O",
				"OXX"
			],
			[
				"!XO",
				"X#O",
				"OXX"
			],
			[
				"XXO",
				"!#O",
				"OXX"
			],
			[
				"XXO",
				"X#O",
				"O!X"
			],
			[
				"O#O",
				"!XX",
				"XXO"
			]
		]
		
		board = board[Math.floor(Math.random() * board.length)]
		
		let transforms = Math.floor(Math.random() * 8)
		
		if (transforms % 2 === 0) board.reverse()
		
		if (transforms % 4 > 1) for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
			board[rowIndex] = Array.from(board[rowIndex]).reverse().join('')
		}
		
		if (transforms > 3) for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
			board[rowIndex] = Array.from(board[rowIndex])
			
			let temporaryCharacter = board[0][0]
			board[0][0] = board[2][0]
			board[2][0] = board[2][2]
			board[2][2] = board[0][2]
			board[0][2] = temporaryCharacter
			
			temporaryCharacter = board[0][1]
			board[0][1] = board[1][0]
			board[1][0] = board[2][1]
			board[2][1] = board[1][2]
			board[1][2] = temporaryCharacter
			
			for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
				board[rowIndex] = board[rowIndex].join('')
			}
		}
		
		let squareCorrect
		let squareWrong
		
		let addCross = square => {
			let line = document.createElement("line")
			line.setAttribute("x1", 4)
			line.setAttribute("y1", 4)
			line.setAttribute("x2", 28)
			line.setAttribute("y2", 28)
			line.setAttribute("stroke", "black")
			line.setAttribute("stroke-width", 4)
			line.setAttribute("fill", "transparent")
			square.appendChild(line)
			
			line = document.createElement("line")
			line.setAttribute("x1", 28)
			line.setAttribute("y1", 4)
			line.setAttribute("x2", 4)
			line.setAttribute("y2", 28)
			line.setAttribute("stroke", "black")
			line.setAttribute("stroke-width", 4)
			line.setAttribute("fill", "transparent")
			square.appendChild(line)
		}
		
		let addKnot = square => {
			let knot = document.createElement("circle")
			knot.setAttribute("cx", 16)
			knot.setAttribute("cy", 16)
			knot.setAttribute("r", 12)
			knot.setAttribute("stroke", "black")
			knot.setAttribute("stroke-width", 4)
			knot.setAttribute("fill", "transparent")
			square.appendChild(knot)
		}
		
		for (let rowIndex = 0; rowIndex < 3; rowIndex++){
			let row = document.createElement("div")
			
			row.style.display = "flex"
			
			for (let squareIndex = 0; squareIndex < 3; squareIndex++){
				let type = board[rowIndex][squareIndex]
				let square = document.createElement("svg")
				square.classList.add("square")
				square.setAttribute("width", 32)
				square.setAttribute("height", 32)
				
				if (type === "X") {
					addCross(square)
				} else if (type === "O") {
					addKnot(square)
				}
				
				row.appendChild(square)
				square.outerHTML += ''
				
				if (type === "#") {
					squareCorrect = row.children[squareIndex]
				} else if (type === "!") {
					squareWrong = row.children[squareIndex]
				}
			}
			
			display.appendChild(row)
		}
		
		criteria = () => taskPressesData[0] === 1,
		
		squareCorrect.style.cursor = "pointer"
		squareWrong.style.cursor = "pointer"
		
		squareCorrect.addEventListener("click", () => {
			if (taskPressesData[0] !== 0 || taskNumber !== 53) return
			
			squareCorrect.style.cursor = ''
			squareWrong.style.cursor = ''
			
			taskPressesData[0] = 1
			addKnot(squareCorrect)
			squareCorrect.outerHTML += ''
		})
		
		squareWrong.addEventListener("click", () => {
			if (taskPressesData[0] !== 0 || taskNumber !== 53) return
			
			squareCorrect.style.cursor = ''
			squareWrong.style.cursor = ''
			
			taskPressesData[0] = 2
			addKnot(squareWrong)
			squareWrong.outerHTML += ''
			
			addCross(squareCorrect)
			squareCorrect.outerHTML += ''
		})
		
		break;
	}
	case 54: {
		let numbers = []
		numbers.push(Math.floor(Math.floor(Math.random() * 4) / 2) * 2 + 2)
		numbers.push(Math.floor(Math.floor(Math.random() * 4) / 2) * 2 + 2)
		
		task = document.createTextNode("Put in the area of a triangle with a height of " + numbers[0] + " and base of " + numbers[1] + ".")
		display.appendChild(task)
		criteria = txt => txt.includes(String(numbers[0] * numbers[1] / 2))
		
		run = () => {
			let task53 = taskList[53].display
			
			if (tasksFailed.includes(53)) Array.from(task53.children).forEach(row => {
				Array.from(row.children).forEach(square => {
					Array.from(square.children).forEach(svgElm => svgElm.setAttribute("stroke", "red"))
				})
			})
			else Array.from(task53.children).forEach(row => {
				Array.from(row.children).forEach(square => {
					Array.from(square.children).forEach(svgElm => svgElm.setAttribute("stroke", "#0b0"))
				})
			})
		}
		
		break;
	}
	case 55: {
		let variations = []
		
		variations.push(Math.floor(Math.random() * 3))
		variations.push(Math.floor(Math.random() * 3))
		
		let variation = [
			["Barry wasn’t making our project", "I had ordered some pizza", "They had been playing games for two hours"],
			["Carry is trying to study", "I have finished making my book", "We have been preparing for the finals"],
			["Larry will be going to Turkey", "I shall go back to my job", "Somebody will have completed this already"]
		][variations[0]][variations[1]]
		
		task = document.createTextNode("Put in the tense of the sentence: " + variation + ".")
		display.appendChild(task)
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			
			if (!lowercase.includes(["past", "present", "future"][variations[0]])) return false
			
			if (variations[1] === 2 && lowercase.includes("continous") && lowercase.includes("perfect")) return true
			return lowercase.includes(["continuous", "perfect"][variations[1]])
		}
		
		break;
	}
	case 56: {
		task = document.createTextNode("Put in the roman numeral for 3999 in standard form.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("MMMCMXCIX")
		
		break;
	}
	case 57: {
		task = document.createTextNode("Put in the 256th character for the American Standard Code for Information Interchange"),
		display.appendChild(task)
		
		criteria = txt => txt.includes("ÿ")
		
		break;
	}
	case 58: {
		task = document.createTextNode("Only click or tap the button coloured green. ")
		display.appendChild(task)
		
		let taskState = document.createElement("span")
		taskState.classList.add("taskState")
		display.appendChild(taskState)
		
		let colourYellowButton = document.createElement("button")
		colourYellowButton.style["background-color"] = "yellow"
		colourYellowButton.style.border = "2px solid #aa0"
		colourYellowButton.textContent = "Green"
		colourYellowButton.classList.add("button")
		colourYellowButton.addEventListener("click", () => taskPressesData[0]++)
		
		let colourYellowDiv = document.createElement("div")
		colourYellowDiv.appendChild(colourYellowButton)
		colourYellowDiv.style["margin-bottom"] = "2px"
		display.appendChild(colourYellowDiv)
		
		let colourGreenButton = document.createElement("button")
		colourGreenButton.style["background-color"] = "lime"
		colourGreenButton.style.border = "2px solid #0a0"
		colourGreenButton.textContent = "Yellow"
		colourGreenButton.classList.add("button")
		colourGreenButton.addEventListener("click", () => taskPressesData[1]++)
		display.appendChild(colourGreenButton)
		
		let colourGreenDiv = document.createElement("div")
		colourGreenDiv.appendChild(colourGreenButton)
		colourGreenDiv.style["margin-bottom"] = "2px"
		display.appendChild(colourGreenDiv)
		
		let colourBlueButton = document.createElement("button")
		colourBlueButton.style["background-color"] = "blue"
		colourBlueButton.style.border = "2px solid #00a"
		colourBlueButton.textContent = "Orange"
		colourBlueButton.classList.add("button")
		colourBlueButton.addEventListener("click", () => taskPressesData[2]++)
		display.appendChild(colourBlueButton)
		
		let colourBlueDiv = document.createElement("div")
		colourBlueDiv.appendChild(colourBlueButton)
		colourBlueDiv.style["margin-bottom"] = "2px"
		display.appendChild(colourBlueDiv)
		
		let colourPurpleButton = document.createElement("button")
		colourPurpleButton.style["background-color"] = "#c0c"
		colourPurpleButton.style.border = "2px solid #808"
		colourPurpleButton.textContent = "Red"
		colourPurpleButton.classList.add("button")
		colourPurpleButton.addEventListener("click", () => taskPressesData[3]++)
		display.appendChild(colourPurpleButton)
		
		let colourPurpleDiv = document.createElement("div")
		colourPurpleDiv.appendChild(colourPurpleButton)
		colourPurpleDiv.style["margin-bottom"] = "2px"
		display.appendChild(colourPurpleDiv)
		
		let colourRedButton = document.createElement("button")
		colourRedButton.style["background-color"] = "red"
		colourRedButton.style.border = "2px solid #800"
		colourRedButton.textContent = "Purple"
		colourRedButton.classList.add("button")
		colourRedButton.addEventListener("click", () => taskPressesData[3]++)
		display.appendChild(colourRedButton)
		
		let colourRedDiv = document.createElement("div")
		colourRedDiv.appendChild(colourRedButton)
		colourRedDiv.style["margin-bottom"] = "2px"
		display.appendChild(colourRedDiv)
		
		let colourOrangeButton = document.createElement("button")
		colourOrangeButton.style["background-color"] = "#f80"
		colourOrangeButton.style.border = "2px solid #b50"
		colourOrangeButton.textContent = "Blue"
		colourOrangeButton.classList.add("button")
		colourOrangeButton.addEventListener("click", () => taskPressesData[3]++)
		display.appendChild(colourOrangeButton)
		
		let colourOrangeDiv = document.createElement("div")
		colourOrangeDiv.appendChild(colourOrangeButton)
		display.appendChild(colourOrangeDiv)
		
		criteria = () => taskPressesData[1] > 0 && taskPressesData.reduce((accumulator, count) => accumulator + count, 0) === taskPressesData[1]
		
		break;
	}
	case 59: {
		task = document.createTextNode("Put in the unit for measuring energy or work.")
		display.appendChild(task)
		
		criteria = txt => {
			let lowerCase = txt.toLowerCase()
			let correct = lowerCase.includes("joule")
			correct = correct || lowerCase.includes("j")
			correct = correct || lowerCase.includes("nm")
			correct = correct || (lowerCase.includes("newton") && lowerCase.includes("meter"))
			correct = correct || (lowerCase.includes("kilowatt") && lowerCase.includes("hour"))
			correct = correct || lowerCase.includes("kwh")
			return correct
		}
		
		break;
	}
	case 60: {
		task = document.createTextNode("You cannot type or submit while the traffic light is red. You can still charge while it is red.")
		display.appendChild(task)
		
		mechanics.appendChild(trafficLight)
		
		break;
	}
	case 61: {
		let numbers = []
		for (let i = 0; i < 4; i++) numbers.push(Math.floor(Math.random() * 8) + 1)
		
		task = document.createTextNode("Convert the number " + numbers[0] + "," + numbers[1] + numbers[2] + numbers[3] + " as a word")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes(toCardinal(numbers[0] * 1000 + numbers[1] * 100 + numbers[2] * 10 + numbers[3]))
		
		break;
	}
	case 62: {
		let numbers = []
		numbers.push(Math.floor(Math.random() * 7) + 1)
		numbers.push(Math.floor(Math.random() * (9 - numbers[0])) + numbers[0] + 1)
		numbers = [numbers[1] ** 2 - numbers[0] ** 2, 2 * numbers[0] * numbers[1], numbers[0] ** 2 + numbers[1] ** 2]
		// Formula to generate hypotenuses with all integers
		
		task = document.createTextNode("Put in the length of the hypotenuse when the sides are " + numbers[0] + " and " + numbers[1])
		criteria = txt => txt.includes(numbers[2].toString())
		
		break;
	}
	case 63: {
		task = document.createTextNode("Put in the arroba symbol.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("@")
		
		break;
	}
	case 64: {
		task = document.createTextNode("Put in the current task number in binary, only for this task.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("1000000")
		
		break;
	}
	case 65: {
		task = document.createTextNode("Move the yellow circle by rotating, such that it is inside the blue region when submitted.")
		display.appendChild(task)
		
		task = document.createTextNode(" ")
		display.appendChild(task)
		
		task = document.createElement("span")
		task.classList.add("taskState")
		display.appendChild(task)
		
		task = document.createElement("div")
		task.style.width = "calc(max(20vw, 20vh) + 4px)"
		task.style.height = task.style.width
		display.appendChild(task)
		
		let container = document.createElement("div")
		container.style.width = "max(18vw, 18vh)"
		container.style.height = "max(2vw, 2vh)"
		container.style.border = "2px solid black"
		task.appendChild(container)
		
		let ball = document.createElement("div")
		ball.style["border-radius"] = "50%"
		ball.style.border = "2px solid black"
		ball.style["background-color"] = "yellow"
		ball.style.width = "calc(max(2vw, 2vh) - 4px)"
		ball.style.height = ball.style.width
		ball.style.position = "absolute"
		ball.style["z-index"] = 98
		container.appendChild(ball)
		
		let blueRegion = document.createElement("div")
		blueRegion.style.width = "max(3.7vw, 3.7vh)"
		blueRegion.style.height = "max(2vw, 2vh)"
		blueRegion.style["background-color"] = "lightblue"
		blueRegion.style.transform = "translateX(max(7.1vw, 7.1vh))"
		container.appendChild(blueRegion)
		
		criteria = () => ballPosition >= 45 && ballPosition <= 55
		
		let holdCursorX = 0
		let holdCursorY = 0
		let mousedown = false
		let lastMousedown = false
		let rotation = 0
		let deltaRotation = 0
		
		let lastTop = 0
		
		let mouseup = () => {
			mousedown = false
			if (taskNumber !== 65) document.removeEventListener("mouseup", mouseup)
		}
		
		display.addEventListener("touchstart", event => {
			holdCursorX = event.changedTouches[0].clientX
			holdCursorY = event.changedTouches[0].clientY
			deltaRotation = -Math.PI / 2
		})
		
		container.addEventListener("mousedown", () => mousedown = true)
		document.addEventListener("mouseup", mouseup)
		
		updateBall = diff => {
			container.parentElement.style.transform = "translate(max(-3vw, -3vh), max(-3vw, -3vh))"
			let boundingRect = container.parentElement.getBoundingClientRect()
			
			if (mousedown){
				holdCursorX = cursorX
				holdCursorY = cursorY
				
				document.body.style.cursor = "grabbing"
				container.style.cursor = "grabbing"
			} else {
				holdCursorY += boundingRect.top - lastTop
				
				document.body.style.cursor = ""
				container.style.cursor = "grab"
			}
			
			let centerX = (boundingRect.left + boundingRect.width / 2)
			let centerY = (boundingRect.top + boundingRect.height / 2)
			
			lastTop = boundingRect.top
			
			if (mousedown && !lastMousedown) deltaRotation = rotation + Math.atan2(holdCursorX - centerX, holdCursorY - centerY)
			
			rotation = deltaRotation - Math.atan2(holdCursorX - centerX, holdCursorY - centerY)
			
			lastMousedown = mousedown
			
			container.style.transform = "translateY(max(8vw, 8vh)) rotate(" + rotation + "rad)"
			container.parentElement.style.transform = ''
			
			ballPosition += Math.sin(rotation) * diff
			if (ballPosition > 100) ballPosition = 100
			if (ballPosition < 0) ballPosition = 0
			
			ball.style.transform = "translateX(calc(max(.16vw, .16vh) * " + ballPosition + "))"
		}
		
		break;
	}
	case 66: {
		let variation =  Math.floor(Math.random() * 4)
		let words = [
			"cotton-like, puffy and low-level",
			"low-level, horizontally layered and with a uniform base",
			"amorphous and nearly uniform",
			"delicate and whispy"
		][variation]
		
		task = document.createTextNode("Put in the genus of clouds that are " + words)
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes(["cumulus", "stratus", "nimbus", "cirrus"][variation])
		updateBall = () => {}
		
		break;
	}
	case 67: {
		task = document.createTextNode("Put in the name of the very first civilization.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("mesopotamia")
		
		break;
	}
	case 68: {
		task = document.createTextNode("Unlock the lock (Hopefully, you didn't lose it).")
		display.appendChild(task)
		
		let lock = document.createElement("svg")
		lock.setAttribute("width", 60)
		lock.setAttribute("height", 80)
		display.appendChild(lock)
		
		task = document.createElement("circle")
		task.setAttribute("cx", 30)
		task.setAttribute("cy", 24)
		task.setAttribute("r", 24)
		task.setAttribute("fill", "#999")
		lock.appendChild(task)
		
		task = document.createElement("circle")
		task.setAttribute("cx", 30)
		task.setAttribute("cy", 24)
		task.setAttribute("r", 8)
		task.setAttribute("fill", "white")
		lock.appendChild(task)
		
		task = document.createElement("rect")
		task.setAttribute("x", 6)
		task.setAttribute("y", 24)
		task.setAttribute("width", 16)
		task.setAttribute("height", 16)
		task.setAttribute("fill", "#999")
		lock.appendChild(task)
		
		task = document.createElement("rect")
		task.setAttribute("x", 38)
		task.setAttribute("y", 24)
		task.setAttribute("width", 16)
		task.setAttribute("height", 16)
		task.setAttribute("fill", "#999")
		lock.appendChild(task)
		
		task = document.createElement("rect")
		task.setAttribute("x", 22)
		task.setAttribute("y", 24)
		task.setAttribute("width", 16)
		task.setAttribute("height", 16)
		task.setAttribute("fill", "white")
		lock.appendChild(task)
		
		task = document.createElement("rect")
		task.setAttribute("y", 40)
		task.setAttribute("width", 60)
		task.setAttribute("height", 40)
		task.setAttribute("fill", "#b80")
		lock.appendChild(task)
		
		lock.outerHTML += ''
		
		criteria = () => unlockedLock
		
		run = () => {
			if (!id("input").value.includes(keyEmojiUsed)) keyEmojiUsed = null
			
			lock = taskList[68].display.children[0]
			
			lock.style.cursor = "not-allowed"
			
			if (keyEmojiUsed === null) return
			
			lock.style.cursor = "pointer"
			
			lock.addEventListener("click", () => {
				if (unlockedLock) return
				
				unlockedLock = true
				lock.style.cursor = ''
				
				lock.children[2].setAttribute("fill", "white")
				
				id("input").value = id("input").value.replace(keyEmojiUsed, '')
			})
		}
		
		break;
	}
	case 69: {
		task = document.createTextNode("Put in the answer to this expression, that is written in Reverse Polish Notation: 4 2 × 6 9 × 4 2 × + + 1 -.")
		display.appendChild(task)
		
		criteria = txt => txt.includes(69)
		
		break;
	}
	case 70: {
		task = document.createTextNode("From this task onward, if a number is prime, reverse your answer except \"Here it is:\".")
		display.appendChild(task)
		
		break;
	}
	case 71: {
		task = document.createTextNode("Put in the name of this disaccharide: ")
		display.appendChild(task)
		
		let svg = document.createElement("svg")
		svg.setAttribute("width", 256)
		svg.setAttribute("height", 150)
		svg.style.transform = "translateY(2px)"
		
		function createLine(x1, y1, x2, y2){
			let line = document.createElement("line")
			
			line.setAttribute("x1", x1)
			line.setAttribute("y1", y1)
			line.setAttribute("x2", x2)
			line.setAttribute("y2", y2)
			line.setAttribute("stroke", "black")
			line.setAttribute("stroke-width", 1)
			
			line.style.stroke = "black"
			
			return line
		}
		
		function createPolyLine(points){
			let polyline = document.createElement("polyline")
			
			polyline.setAttribute("points", points)
			polyline.setAttribute("stroke", "black")
			polyline.setAttribute("stroke-width", 1)
			polyline.setAttribute("fill", "transparent")
			
			polyline.style.stroke = "black"
			
			return polyline
		}
		
		function createText(x, y, string, fontSize){
			let txt = document.createElement("text")
			txt.setAttribute("x", x)
			txt.setAttribute("y", y)
			txt.textContent = string
			txt.style["font-size"] = fontSize + "px"
			txt.style.fill = "black"
			
			return txt
		}
		
		svg.appendChild(createPolyLine("75,36 91,64 71,99 30,99 10,64 30,29 65,29"))
		svg.appendChild(createLine(10, 49, 10, 79))
		svg.appendChild(createText(0, 47, "OH", 12))
		svg.appendChild(createText(5, 89, "H", 12))
		
		svg.appendChild(createLine(30, 14, 30, 44))
		svg.appendChild(createText(8, 9, "CH", 12))
		svg.appendChild(createText(26, 13, "2", 8))
		svg.appendChild(createText(30, 9, "OH", 12))
			
		svg.appendChild(createText(67, 34, "OH", 12))
		
		svg.appendChild(createLine(70, 84, 70, 114))
		svg.appendChild(createText(65, 83, "H", 12))
		svg.appendChild(createText(61, 124, "OH", 12))
		
		svg.appendChild(createLine(30, 84, 30, 114))
		svg.appendChild(createText(21, 83, "OH", 12))
		svg.appendChild(createText(25, 124, "H", 12))
		
		svg.appendChild(createPolyLine("91,79 91,49 110,61"))
		svg.appendChild(createText(87, 89, "H", 12))
		svg.appendChild(createText(95, 67, "β", 12))
		
		svg.appendChild(createText(110, 69, "O", 12))
		
		svg.appendChild(createPolyLine("139,49 139,79 120,67"))
		
		svg.appendChild(createPolyLine("204,36 220,64 200,99 159,99 139,64 159,29 194,29"))
		
		svg.appendChild(createLine(159, 14, 159, 44))
		svg.appendChild(createText(137, 9, "CH", 12))
		svg.appendChild(createText(155, 13, "2", 8))
		svg.appendChild(createText(159, 9, "OH", 12))
		
		svg.appendChild(createText(196, 34, "O", 12))
		
		svg.appendChild(createLine(220, 49, 220, 79))
		svg.appendChild(createText(210, 47, "OH", 12))
		svg.appendChild(createText(215, 89, "H", 12))
		
		svg.appendChild(createLine(199, 84, 199, 114))
		svg.appendChild(createText(194, 83, "H", 12))
		svg.appendChild(createText(190, 124, "OH", 12))
		
		svg.appendChild(createLine(159, 84, 159, 114))
		svg.appendChild(createText(150, 83, "OH", 12))
		svg.appendChild(createText(154, 124, "H", 12))
		
		svg.appendChild(createText(240, 70, "α", 20))
		
		svg.appendChild(createText(4, 149, "Galactose", 20))
		svg.appendChild(createText(142, 149, "Glucose", 20))
		
		display.appendChild(svg)
		
		svg.outerHTML += ''
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			
			if (lowercase.includes("esotcal")) return true
			
			failTask70()
			
			return lowercase.includes("lactose")
		}
		
		break;
	}
	case 72: {
		let numbers = []
		let stored = []
		
		numbers.push(Math.floor(Math.random() * 19) - 9)
		numbers.push(Math.floor(Math.random() * 18) - 9)
		numbers.push(Math.floor(Math.random() * 26))
		
		if (numbers[1] >= numbers[0]) numbers[1]++
		
		stored.push(numbers[0] + numbers[1])
		stored.push(numbers[0] * numbers[1])
		stored.push("abcdefghijklmnopqrstuvwxyz".at(numbers[2]))
		
		task = document.createTextNode("Your input, for this task, must contain all roots to the polynomial with " + stored[2] + " as the variable: ")
		display.appendChild(task)
		
		task = document.createTextNode(stored[2])
		display.appendChild(task)
		
		task = document.createElement("sup")
		task.textContent = "3"
		display.appendChild(task)
		
		if (stored[0] === 1) {
			task = document.createTextNode("+" + stored[2])
		} else if (stored[0] === -1) {
			task = document.createTextNode("-" + stored[2])
		} else if (stored[0] < 0) {
			task = document.createTextNode(stored[0] + stored[2])
		} else if (stored[0] > 0) {
			task = document.createTextNode("+" + stored[0] + stored[2])
		}
		
		display.appendChild(task)
		
		task = document.createElement("sup")
		task.textContent = "2"
		display.appendChild(task)
		
		if (stored[1] === 1) {
			task = document.createTextNode("+" + stored[2])
		} else if (stored[1] === -1) {
			task = document.createTextNode("-" + stored[2])
		} else if (stored[1] < 0) {
			task = document.createTextNode(stored[1] + stored[2])
		} else if (stored[1] > 0) {
			task = document.createTextNode("+" + stored[1] + stored[2])
		}
		
		display.appendChild(task)
		
		criteria = txt => txt.includes(0) && txt.includes(-numbers[0]) && txt.includes(-numbers[1])
		
		run = () => {
			let task71 = taskList[71].display.children[0].children
			
			if (tasksFailed.includes(71)) Array.from(task71).forEach(elm => {
				if (elm.style.fill !== '')   elm.style.fill = "red"
				if (elm.style.stroke !== '') elm.style.stroke = "red"
			})
			else Array.from(task71).forEach(elm => {
				if (elm.style.fill !== '')   elm.style.fill = "#0b0"
				if (elm.style.stroke !== '') elm.style.stroke = "#0b0"
			})
		}
		
		break;
	}
	case 73: {
		let variation = Math.floor(Math.random() * 3)
		let word = ["inferno", "purgatorio", "paradisio"][variation]
		
		task = document.createTextNode("Put in the name of the " + toOrdinal(variation + 1) + " book of \"The Divine Comedy\".")
		display.appendChild(task)
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			
			if (lowercase.includes(word.split('').reverse().join(''))) return true
			
			failTask70()
			
			return lowercase.includes(word)
		}
		
		break;
	}
	case 74: {
		let atomType = [
			["Ununnilium", 1],
			["Unununium", 2],
			["Ununbium", 2],
			["Ununtrium", 3],
			["Ununquadum", 4],
			["Ununpentium", 5],
			["Ununhexium", 6],
			["Ununseptium", 7],
			["Ununoctium", 8]
		]
		
		atomType = atomType[Math.floor(Math.random() * atomType.length)]
		
		task = document.createTextNode("Put in the valence electrons for " + atomType[0] + ".")
		display.appendChild(task)
		
		criteria = txt => txt.includes(atomType[1])
		
		break;
	}
	case 75: {
		task = document.createTextNode("Check all checkboxes (affected by traffic light).")
		display.appendChild(task)
		
		let taskState = document.createElement("span")
		taskState.classList.add("taskState")
		display.appendChild(taskState)
		
		let checkboxes = document.createElement("div")
		
		for (let i = 0; i < 100; i++) {
			let checkInput = document.createElement("input")
			checkInput.type = "checkbox"
			checkInput.addEventListener("click", task60Condition)
			checkboxes.appendChild(checkInput)
		}
		
		criteria = () => Array.from(checkboxes.children).reduce((accumulator, elm) => accumulator || elm.value === "on")
		
		display.appendChild(checkboxes)
		
		break;
	}
	case 76: {
		let variation = Math.floor(Math.random() * 8)
		
		let scrabble = [
			"quartziferous",
			"quartzitic",
			"quartzose",
			"quatorzains",
			"quatorze",
			"quazziest",
			"quizzicality",
			"quizzification"
		][variation]
		
		let blankTile = Math.floor(Math.random() * (scrabble.length - 1)) + 1
		
		let letterValues = {
			a: 1,
			b: 3,
			c: 3,
			d: 2,
			e: 1,
			f: 4,
			g: 2,
			h: 4,
			i: 1,
			j: 8,
			k: 5,
			l: 1,
			m: 3,
			n: 1,
			o: 1,
			p: 3,
			q: 10,
			r: 1,
			s: 1,
			t: 1,
			u: 1,
			v: 4,
			w: 4,
			x: 8,
			y: 4,
			z: 10
		}
		
		let scrabbleValue = 0
		
		task = document.createTextNode("Put in the point value of this scrabble word, blank tiles are underlined: ")
		display.appendChild(task)
		
		task = document.createElement("span")
		task.textContent = scrabble.slice(0, blankTile)
		display.appendChild(task)
		
		task = document.createElement("span")
		task.style["text-decoration-line"] = "underline"
		task.textContent = scrabble[blankTile]
		display.appendChild(task)
		
		task = document.createElement("span")
		task.textContent = scrabble.slice(blankTile + 1)
		display.appendChild(task)
		
		task = document.createTextNode(".")
		display.appendChild(task)
		
		for (let index in scrabble) {
			if (index == blankTile) continue
			scrabbleValue += letterValues[scrabble[index]]
		}
		
		criteria = txt => txt.includes(scrabbleValue)
		
		run = Array.from(taskList[75].display.lastChild.children).forEach(elm => elm.disabled = true)
		
		break;
	}
	case 77: {
		let variation = Math.floor(Math.random() * 3)
		let word = ["globe", "plain", "tissue"][variation]
		let answer = ["bogle", "lapin", "suites"][variation]
		
		task = document.createTextNode("Put in an anagram of " + word + ", excluding itself.")
		display.appendChild(task)
		
		criteria = () => txt.toLowerCase().includes(word)
		
		break;
	}
	case 78: {
		let variation = Math.floor(Math.random() * 2)
		
		let word = ["northern", "southern"][variation]
		
		task = document.createTextNode("Put in the name of the " + word + " lights.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("aurora") && txt.toLowerCase().includes(["borealis", "australis"][variation])
		
		break;
	}
	case 79: {
		let font = ["serif", "cursive", "monospace"][Math.floor(Math.random() * 3)]
		
		task = document.createTextNode("Put in the name of the font family of this text.")
		display.appendChild(task)
		
		display.style["font-family"] = font
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			
			if (lowercase.includes(Array.from(font).reverse().join(''))) return true
			
			failTask70()
			
			return lowercase.includes(font)
		}
		
		run = () => id("tasks").children[78].style["font-family"] = font
		
		break;
	}
	case 80: {
		task = document.createTextNode("You must no longer paste, starting from this task.")
		display.appendChild(task)
		
		document.addEventListener("paste", failTask80)
		
		run = () => {
			if (taskList[79].display.style["font-family"] !== "monospace") return
			let taskState79 = taskList[79].display.getElementsByClassName("taskState")[0]
			taskState79.textContent = taskState79.textContent === "✔" ? "/" : "X"
		}
		
		break;
	}
	case 81: {
		task = document.createElement("text")
		task.textContent = "Put in a "
		task.style.color = "white"
		display.appendChild(task)
		
		task = document.createTextNode("s")
		display.appendChild(task)
		
		task = document.createElement("text")
		task.textContent = "ix l"
		task.style.color = "white"
		display.appendChild(task)
		
		task = document.createTextNode("e")
		display.appendChild(task)
		
		task = document.createElement("text")
		task.textContent = "tter eng"
		task.style.color = "white"
		display.appendChild(task)
		
		task = document.createTextNode("l")
		display.appendChild(task)
		
		task = document.createElement("text")
		task.textContent = "ish word that starts with \""
		task.style.color = "white"
		display.appendChild(task)
		
		task = document.createTextNode("e")
		display.appendChild(task)
		
		task = document.createElement("text")
		task.textContent = "\" and "
		task.style.color = "white"
		display.appendChild(task)
		
		task = document.createTextNode("c")
		display.appendChild(task)
		
		task = document.createElement("text")
		task.textContent = "ontains "
		task.style.color = "white"
		display.appendChild(task)
		
		task = document.createTextNode("t")
		display.appendChild(task)
		
		task = document.createElement("text")
		task.textContent = "wo \"t\"'s"
		task.style.color = "white"
		display.appendChild(task)
		
		task = document.createTextNode(".")
		display.appendChild(task)
		
		criteria = txt => txt.includes("entity") || txt.includes("estate") || txt.includes("extent") ||  txt.includes("extort")
		
		break;
	}
	case 82: {
		let abstractNounsSelected = 0
		let concreteNounsSelected = 0
		
		let abstractNouns = [
			"Satisfaction",
			"Philosphy",
			"Progress",
			"Infinity",
			"Addition",
		]
		
		let concreteNouns = [
			"Library",
			"Electricity",
			"Pythagoras",
			"Saturn",
			"Chandragupta"
		]
		
		let abstractNounRequirement = abstractNouns.length
		
		let words = abstractNouns.concat(concreteNouns)
		
		for (let omits = 0; omits < 4; omits++) {
			let position = Math.floor(Math.random() * words.length)
			if (abstractNouns.includes(words[position])) abstractNounRequirement--
			words.splice(position, 1)
		}
		
		for (let swaps = 0; swaps < 10; swaps++) {
			let position1 = Math.floor(Math.random() * words.length)
			let position2 = Math.floor(Math.random() * (words.length - 1))
			
			if (position2 >= position1) position2++
			
			let temp = words[position1]
			words[position1] = words[position2]
			words[position2] = temp
		}
		
		task = document.createElement("div")
		task.textContent = "Select all abstract nouns: "
		task.style.transform = "rotate(180deg)"
		display.appendChild(task)
		
		let taskState = document.createElement("span")
		taskState.classList.add("taskState")
		display.appendChild(taskState)
		
		words.forEach(word => {
			let checkInput = document.createElement("input")
			checkInput.type = "checkbox"
			checkInput.addEventListener("click", () => {
				let selector = -1
				
				if (checkInput.checked) selector = 1
				
				if (abstractNouns.includes(word)) abstractNounsSelected += selector
				else concreteNounsSelected += selector
			})
			
			checkInput.style.transform = "translateY(-4px)"
			checkInput.style["margin-right"] = "0.5rem"
			
			let div = document.createElement("div")
			
			div.appendChild(checkInput)
			div.appendChild(document.createTextNode(word))
			
			div.style["margin-left"] = "1rem"
			
			display.appendChild(div)
		})
		
		criteria = txt => abstractNounsSelected === abstractNounRequirement && concreteNounsSelected === 0
		
		break;
	}
	case 83: {
		let variation = Math.floor(Math.random() * 4)
		
		let words = [
			"antidisestablishmentarianism",
			"honorificabilitudinitatibus",
			"dichlorodifluoromethane",
			"incomprehensibilities"
		]
		
		task = document.createTextNode("Put in the word \"" + words[variation] + "\" backwards.")
		display.appendChild(task)
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			
			if (lowercase.includes(words[variation])) return true
			
			failTask70()
			
			return lowercase.includes(words[variation].split('').reverse().join(''))
		}
		
		break;
	}
	case 84: {
		task = document.createTextNode("Put in the name of the ancient Indian religious principle of non-violence.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("ahimsa")
		
		break;
	}
	case 85: {
		let variation = Math.floor(Math.random() * 2)
		
		let keyReplaced = "QW"[variation]
		
		task = document.createTextNode("Put in the key from the AZERTY keyboard layout that replaces the \"" + keyReplaced + "\" key in the QWERTY keyboard layout.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("az"[variation])
		
		break;
	}
	case 86: {
		task = document.createTextNode("Put in the symbol used to denote a pointer in the C programming language.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("*")
		
		break;
	}
	case 87: {
		task = document.createTextNode("Solve the following limit: ")
		display.appendChild(task)
		
		let svg = document.createElement("svg")
		svg.setAttribute("width", 256)
		svg.setAttribute("height", 40)
		svg.style.transform = "translateY(4px)"
		
		function createLine(x1, y1, x2, y2){
			let line = document.createElement("line")
			
			line.setAttribute("x1", x1)
			line.setAttribute("y1", y1)
			line.setAttribute("x2", x2)
			line.setAttribute("y2", y2)
			line.setAttribute("stroke", "#700")
			line.setAttribute("stroke-width", 2)
			
			line.style.stroke = "#700"
			
			return line
		}
		
		function createPolyLine(points){
			let polyline = document.createElement("polyline")
			
			polyline.setAttribute("points", points)
			polyline.setAttribute("stroke", "black")
			polyline.setAttribute("stroke-width", 2)
			polyline.setAttribute("fill", "transparent")
			
			polyline.style.stroke = "#700"
			
			return polyline
		}
		
		function createText(x, y, string, fontSize, fontFamily){
			let txt = document.createElement("text")
			txt.setAttribute("x", x)
			txt.setAttribute("y", y)
			txt.textContent = string
			txt.style["font-size"] = fontSize + "px"
			if (fontFamily != undefined) txt.style["font-family"] = fontFamily
			txt.style.fill = "#700"
			
			return txt
		}
		
		svg.appendChild(createText(4, 24, "lim", 24, "serif"))
		svg.appendChild(createLine(10, 32, 26, 32))
		svg.appendChild(createPolyLine("22,28 26,32 22,36"))
		svg.appendChild(createText(0, 37, "x", 16))
		svg.appendChild(createText(28, 38, "0", 16))
		
		svg.appendChild(createText(46, 20, "x", 24))
		svg.appendChild(createLine(42, 24, 62, 24))
		svg.appendChild(createText(46, 40, "x", 24))
		
		display.appendChild(svg)
		
		svg.outerHTML += ''
		
		criteria = txt => txt.includes(7)
		
		break;
	}
	case 88: {
		task = document.createTextNode("Decode this message: Zed sx dro drsbn voddob yp dro kvzrklod.")
		display.appendChild(task)
		
		criteria = txt => txt.toLowerCase().includes("c")
		
		break;
	}
	case 89: {
		task = document.createTextNode("Put in the county of Britain, that Badminton was first played in.")
		display.appendChild(task)
		
		criteria = txt => {
			let lowercase = txt.toLowerCase()
			
			if (lowercase.includes("gloucestershire")) return true
			
			failTask70()
			
			return lowercase.includes("gloucestershire".split('').reverse().join(''))
		}
		
		break;
	}
	case 90: {
		task = document.createTextNode("For the final tasks, each task will require an answer in one hundred seconds.")
		display.appendChild(task)
		
		mechanics.appendChild(timerBorder)
		
		break;
	}
	case 91: {
		task = document.createTextNode("Type the alphabet.")
		display.appendChild(task)
		
		criteria = () => txt.toLowerCase.includes("abcdefghijklmnopqrstuvwxyz")
		
		break;
	}
	case 92: {
		let numbers = []
		let denominator = 1
		
		for (let amount = 0; amount < 3; amount++) {
			numbers.push((Math.floor(Math.random() * 5) + 1) * (Math.floor(Math.random() * 2) * 2 - 1))
			denominator *= numbers[amount]
		}
		
		let sum = numbers.reduce((accumulator, value) => accumulator + denominator / value, 0)
		
		let extraDenominator = sum - denominator
		let extraNumerator = denominator
		
		numbers.push(- extraDenominator / extraNumerator)
		
		numbers.push(Infinity)
		
		for (let swaps = 0; swaps < 10; swaps++) {
			let position1 = Math.floor(Math.random() * numbers.length)
			let position2 = Math.floor(Math.random() * (numbers.length - 1))
			
			if (position2 >= position1) position2++
			
			let temp = numbers[position1]
			numbers[position1] = numbers[position2]
			numbers[position2] = temp
		}
		
		task = document.createTextNode("Put in the harmonic mean of these: " + numbers.reduce((accumulator, value) => {
			return accumulator + ", " + (value === Infinity ? "∞" : (Number.isInteger(value) ? value : Math.abs(extraNumerator) * Math.sign(-extraNumerator * extraDenominator) + "/" + Math.abs(extraDenominator)))
		}, '').slice(2) + ".")
		display.appendChild(task)
		
		criteria = () => txt.toLowerCase.includes("5")
		
		break;
	}
	case 93: {
		let hue = Math.floor(Math.random() * 360)
		let saturation = Math.floor(Math.random() * 101)
		let lightness = Math.floor(Math.random() * 101)
		
		let saturationPercent = saturation / 100;
		let lightPercent = lightness / 100;
		
		let c = (1 - Math.abs(2 * lightPercent - 1)) * saturationPercent;
		let x = c * (1 - Math.abs((hue / 60) % 2 - 1));
		let m = lightPercent - c / 2;
		
		let red, green, blue
		
		if (0 <= hue && hue < 60) {
			red = c
			green = x
			blue = 0
		} else if (60 <= hue && hue < 120) {
			red = x
			green = c
			blue = 0
		} else if (120 <= hue && hue < 180) {
			red = 0
			green = c
			blue = x
		} else if (180 <= hue && hue < 240) {
			red = 0
			green = x
			blue = c
		} else if (240 <= hue && hue < 300) {
			red = x
			green = 0
			blue = c
		} else {
			red = c
			green = 0
			blue = x
		}
		
		red = Math.round((red + m) * 255).toString(16)
		green = Math.round((green + m) * 255).toString(16)
		blue = Math.round((blue + m) * 255).toString(16)
		
		task = document.createTextNode("Put in the hex code of this colour: ")
		display.appendChild(task)
		
		let hex = "#" + red.padStart(2, "0") + green.padStart(2, "0") + blue.padStart(2, "0")
		
		let colour = document.createElement("div")
		colour.style.border = "2px solid black"
		colour.style["border-radius"] = "50%"
		colour.style["background-color"] = hex
		colour.classList.add("box")
		display.appendChild(colour)
		
		criteria = () => txt.toLowerCase.includes(hex)
		
		break;
	}
	case 94: {
		let word = "pneumonoultramicroscopicsilicovolcanoconiosis"
		let vowels = word.replace(/[bcdfghjklmnpqrstvwxyz]/g, '')
		
		let order = Math.floor(Math.random() * vowels.length)
		
		task = document.createTextNode("Put in the " + toOrdinal(order + 1) + " vowel of \"" + word + "\"")
		display.appendChild(task)
		
		criteria = () => vowels[order]
		
		break;
	}
	case 95: {
		let satisfied = false;
		
		task = document.createTextNode("Click or tap ")
		display.appendChild(task)
		
		let button = document.createElement("button")
		
		button.addEventListener("click", () => {
			if (taskNumber !== 95) return
			if (taskPressesData[0] > 0) return
			
			taskPressesData[0] = 1
			
			if (trafficTime > 11000 && trafficTime <= 12200) satisfied = true
		})
		
		button.textContent = "this button"
		button.classList.add("button")
		button.style["border-color"] = "#A00"
		button.style.color = "#A00"
		display.appendChild(button)
		
		task = document.createTextNode(" when the traffic light is yellow.")
		display.appendChild(task)
		
		criteria = () => satisfied
		
		break;
	}
	case 96: {
		task = document.createTextNode("Type the contents of this task exactly.")
		display.appendChild(task)
		
		criteria = txt => txt.includes("Type the contents of this task exactly.")
		
		break;
	}
	case 97: {
		task = document.createTextNode("Solve the following integral:")
		display.appendChild(task)
		
		let svg = document.createElement("svg")
		svg.setAttribute("width", 256)
		svg.setAttribute("height", 80)
		svg.style.transform = "translateY(2px)"
		
		let integral = document.createElement("path")
		integral.style.fill = "#a00"
		integral.setAttribute("d", `
			m 30,12
			c 0,0
			-1.643637,2.512539
			1.165414,4.326154
			2.101827,1.357008
			4.374448,-0.947721
			4.423083,-2.392598
			0.06557,-1.947857
			-1.207095,-3.450667
			-3.426136,-3.594802
			-1.454432,-0.09447
			-3.110941,0.150223
			-4.374162,1.091266
			-2.526441,1.882103
			-3.734136,3.090554
			-5.488554,8.198213
			-1.76764,5.146155
			-1.883263,14.253273
			-2.563806,22.518013
			-0.710457,8.628024
			-1.809971,17.213493
			-2.910258,20.968098
			-0.49328,1.683264
			-1.575837,2.806019
			-3.13237,4.005514
			-0.681763,0.525379
			-0.955383,0.366811
			-0.955383,0.366811
			0,0
			1.237371,-4.077859
			-2.072068,-4.772128
			-1.65472,-0.347135
			-3.540333,0.77172
			-3.714297,2.860471
			-0.173964,2.088751
			1.202784,3.237623
			3.144014,3.572635
			1.941229,0.335012
			3.987409,-0.163188
			7.516949,-3.890969
			3.52954,-3.727781
			4.14468,-15.501781
			4.931113,-23.997286
			0.393217,-4.247752
			0.991809,-11.504128
			1.679056,-17.234721
			0.687247,-5.730593
			1.167932,-8.258337
			2.715575,-9.984341
			1.547642,-1.726004
			3.06183,-2.040331
			3.06183,-2.04033
			z
		`)
		
		function createText(x, y, string, fontSize){
			let txt = document.createElement("text")
			txt.setAttribute("x", x)
			txt.setAttribute("y", y)
			txt.textContent = string
			txt.style["font-size"] = fontSize + "px"
			txt.style["font-family"] = "serif"
			txt.style.fill = "#A00"
			
			return txt
		}
		
		svg.appendChild(integral)
		svg.appendChild(createText(38, 17, "π", 24))
		svg.appendChild(createText(21, 74, "-π", 24))
		svg.appendChild(createText(42, 56, "sinθ", 32))
		svg.appendChild(createText(100, 56, "cosθ", 32))
		svg.appendChild(createText(162, 56, "dθ", 32))
		
		display.appendChild(svg)
		svg.outerHTML += ''
		
		svg = display.children[0]
		
		criteria = txt => txt.includes("0")
		
		break;
	}
	case 98: {
		task = document.createTextNode("Put in the amount of seconds you have played.")
		display.appendChild(task)
		
		let trueTimePassed = (Date.now() - startTime) / 1000
		
		let lowestTimeBound = Math.floor(trueTimePassed - 8)
		let upperTimeBound = Math.ceil(trueTimePassed + 8)
		
		if (lowestTimeBound < 0) lowestTimeBound = 0
		
		criteria = txt => {
			let inRange = false
			
			while (lowestTimeBound <= upperTimeBound) {
				inRange |= txt.includes(lowestTimeBound)
				lowestTimeBound++
			}
			
			return inRange
		}
		
		break;
	}
	case 99: {
		let variation = Math.floor(Math.random() * 7) + 1
		
		task = document.createTextNode("Put in task #" + variation + "0 exactly.")
		display.appendChild(task)
		
		console.log(generate(variation * 10).display.textContent)
		
		criteria = txt => txt.includes(generate(variation * 10).display.textContent)
		
		break;
	}
	case 100: {
		task = document.createTextNode("To complete the game: The input must be empty, then submit.")
		display.appendChild(task)
		
		criteria = txt => txt === '' ? true : mistakes = 3
		
		display.style["font-size"] = "3.2rem"
		display.style["font-weight"] = "bold"
		display.style["animation-name"] = "final"
		display.style["animation-duration"] = "600ms"
		display.style["animation-iteration-count"] = "infinite"
		display.style["animation-direction"] = "alternate"
		
		run = task100Obfuscate
		
		break;
	}
	case 101: {
		if (mistakes < 3) winGame()
		break;
	}
	default: {
		task = document.createElement("span")
		task.style = "color:red;font-weight:bold"
		task.appendChild(document.createTextNode("The task is missing."))
		
		display.appendChild(task)
	}
	
	}
	
	} catch(error) {
		task = document.createTextNode(error)
		display.appendChild(task)
	}
	
	return {
		display: display,
		data: data,
		answer: answer,
		criteria: criteria,
		run: run
	}
}

const updateInputStyle = function(){
	let box = id("input")
	box.style["font-weight"] = ''
	box.style["font-style"] = ''
	box.style["font-size"] = fontSizeSelected
	
	if (isBold) {
		box.style["font-weight"] = "bold"
		boldButton.classList.add("invert")
	} else {
		boldButton.classList.remove("invert")
	}
	
	if (isItalic) {
		box.style["font-style"] = "italic"
		italizeButton.classList.add("invert")
	} else {
		italizeButton.classList.remove("invert")
	}
}

const failGame = function(){
	taskList = null
	
	id("userArea").classList.add("hide")
	id("tasks").classList.add("hide")
	mechanics.classList.add("hide")
	
	id("failScreen").classList.remove("hide")
}

const winGame = function(){
	taskList = null
	
	id("header").classList.add("hide")
	id("userArea").classList.add("hide")
	id("tasks").classList.add("hide")
	mechanics.classList.add("hide")
	
	document.body.style["background-color"] = "#FFFFDD"
	document.body.appendChild(winScreen)
}

const boldInput = function(){
	isBold = !isBold
	updateInputStyle()
}

const italizeInput = function(){
	isItalic = !isItalic
	updateInputStyle()
}

const fontSizeInput = function(fontSize){
	fontSizeSelected = fontSize
	updateInputStyle()
}

const submit = function(){
	if (taskList === null) return
	
	let task = taskList[taskNumber]
	let input = id("input").value
	
	if (taskNumber >= 10) task10Condition(input.slice(0, 11))
	if (taskNumber >= 20) task20Condition()
	if (taskNumber >= 30) task30Condition()
	if (taskNumber >= 50) task50Condition(input)
	if (taskNumber >= 60) task60Condition()

	if (!task.criteria(input)) {
		tasksFailed[mistakes] = taskNumber
		mistakes++
	}
	
	if (mistakes >= 3) return failGame()
	
	taskPressesData = [0, 0, 0, 0, 0, 0]
	taskNumber++
	updateTasks()
	
	finalTimer = Date.now()
	
	if (taskList[taskNumber].run) setTimeout(taskList[taskNumber].run)
}

const updateTaskState = taskElement => {
	if (taskNumber % 10 === 1) return
	
	let taskState = document.createElement("span")
	taskState.classList.add("taskState")
	
	if (taskElement.getElementsByClassName("taskState").length !== 0) taskState = taskElement.getElementsByClassName("taskState")[0]
	
	if (tasksFailed.includes(taskNumber - 1)) {
		taskElement.style.color = "#A00"
		taskElement.style["border-color"] = "#A00"
		taskState.textContent = "✖"
	} else if (taskNumber >= 91) {
		taskElement.style.color = "#800"
		taskState.textContent = "✔"
	} else if (taskNumber >= 81) {
		taskElement.style.color = "hsl(" + ((90 - taskNumber) * 40 / 3) + ",100%,25%)"
		taskState.textContent = "✔"
	} else {
		taskElement.style.color = "#080"
		taskElement.style["border-color"] = "#080"
		taskState.textContent = "✔"
	}
	
	if (taskElement.getElementsByClassName("taskState").length !== 0) return
	
	taskElement.appendChild(document.createTextNode(" "))
	taskElement.appendChild(taskState)
}

const updateSpecialTask = index => {
	let specialTaskElement = taskList[index].display
	
	if (specialTasksFailed[index] === 0) {
		if (specialTaskElement.getElementsByClassName("taskState").length === 0) {
			specialTaskElement.style.color = "#880"
			specialTaskElement.style["border-color"] = "#BB0"
			
			let taskState = document.createElement("span")
			taskState.classList.add("taskState")
			taskState.textContent = "?"
			
			specialTaskElement.appendChild(document.createTextNode(" "))
			specialTaskElement.appendChild(taskState)
		}
	} else {
		specialTaskElement.style.color = "red"
		specialTaskElement.style["border-color"] = "red"
		specialTaskElement.lastChild.textContent = "✖ ".repeat(specialTasksFailed[index])
	}
}

const updateTasks = () => {
	if (taskList[taskNumber] === undefined) taskList[taskNumber] = generate(taskNumber)
	id("mistakes").innerHTML = mistakes
	
	if (taskList === null) return
	
	let taskElement = taskList[taskNumber].display
	taskElement.insertBefore(document.createTextNode(taskNumber + ". "), taskElement.childNodes[0])
	
	if (taskNumber >= 90)	   taskElement.style.color = "#A00"
	else if (taskNumber >= 81)  taskElement.style.color = "#" + (taskNumber - 80) + "00"
	
	id("tasks").appendChild(taskElement)
	
	updateTaskState(taskList[taskNumber - 1].display)
	
	for (let index = 10; index < taskList.length - 1 && index < 100; index += 10) updateSpecialTask(index)
}

const updateBattery = function(diff){
	if (taskList === null || taskNumber < 40 || taskNumber >= 101) return
	
	batteryMenu.style.display = ''
	batteryPercent -= diff
	
	if (batteryPercent > 100000 || batteryPercent < 0) {
		let taskElement = id("tasks").children[39]
		
		batteryPercent = 100000
		specialTasksFailed[40]++
		mistakes++
		
		updateSpecialTask(40)
	}
	
	batteryFill.style.height = (batteryPercent / 1000) + "px"
	batteryFill.style.transform = "translateY(" + (100 - (batteryPercent / 1000)) + "px)"
}

const updateTraffic = function(diff){
	if (taskList === null || taskNumber < 60 || taskNumber >= 100) return
	
	trafficTime += diff
	trafficTime = trafficTime % 15000
	
	invincibilityTime -= diff
	if (invincibilityTime < 0) invincibilityTime = 0
	
	redLight.style.opacity = 0
	yellowLight.style.opacity = 0
	greenLight.style.opacity = 0
	
	if (trafficTime > 0 && trafficTime <= 11000) return greenLight.style.opacity = 1
	if (trafficTime > 11000 && trafficTime <= 12000) return yellowLight.style.opacity = 1
	
	redLight.style.opacity = 1
	
	if (isTyping && invincibilityTime === 0) {
		let taskElement = taskList[60].display
		let taskState = taskElement.lastChild
		
		invincibilityTime = 3000
		specialTasksFailed[60]++
		mistakes++
		
		taskState.textContent = " ✖".repeat(specialTasksFailed[60])
		taskElement.style.color = "red"
	}
}

const updateInterval = function(){
	let diff = Date.now() - lastTick
	lastTick = Date.now()
	updateBattery(diff)
	updateTraffic(diff)
	updateBall(diff)
	task90Condition()
	
	task99ObfuscateTimer += diff
	
	if (Date.now() - task99ObfuscateTimer > 1000 && taskNumber === 99) {
		task99Obfuscate()
		task99ObfuscateTimer = Date.now()
	}
	
	id("mistakes").innerHTML = mistakes
	if (mistakes >= 3) failGame()
	isTyping = false
	
	setTimeout(updateInterval)
}

startGame()

if (localStorage.getItem("task-data") !== null) {
	try {
		let stored = localStorage.getItem("task-data")
		let data = []
		
		Array.from(stored).forEach((character, position) => data[position] = character.charCodeAt(0))
		
		console.log(data)
		
		taskList = [generate(0)]
		taskList.push(generate(1, [data[0]]))
		taskList.push(generate(2, [data[1], data[2], data[3], data[4], data[5]]))
		taskList.push(generate(3, [data[6], data[7], data[8], data[9], data[10]]))
		taskList.push(generate(4, [data[11]]))
		taskList.push(generate(5, [data[12]]))
		taskList.push(generate(6, [data[13], data[14]]))
		
		tasksFailed = [data[15] % 15, Math.floor(data[15] / 15), 0]
		specialTasksFailed[10] = data[16]
		
		mistakes = data[17]
		
		startTime = ( new DataView( Uint8Array.from( data.slice(18) ).buffer ) ).getFloat64(0, true)
		
		for (let i = 7; i <= 15; i++) taskList.push(generate(i))
		
		id("tasks").firstChild.remove()
		
		for (;taskNumber <= 16; taskNumber++) {
			updateTasks()
			
			if (taskList[taskNumber].run) setTimeout(taskList[taskNumber].run)
		}
	
		taskNumber = 16
	} catch(error) {
		console.log(error)
	}
	
	localStorage.removeItem("task-data")
}

boldButton.classList.add("button")
italizeButton.classList.add("button")

boldButton.style["font-weight"] = "bold"
italizeButton.style["font-style"] = "italic"

boldButton.innerHTML = "Bold"
italizeButton.innerHTML = "Italics"

boldButton.addEventListener("click", boldInput)
italizeButton.addEventListener("click", italizeInput)

id("input").addEventListener("keydown", () => isTyping = true)

id("submit").addEventListener("click", submit)
fontSizeSelection.addEventListener("change", () => fontSizeInput(fontSizeSelection.value))
chargeButton.addEventListener("click", () => batteryPercent += 10000)
id("retryButton").addEventListener("click", startGame)

document.addEventListener("keydown", event => event.key === "Enter" ? submit() : null)

document.addEventListener("mousemove", event => {
	cursorX = event.clientX
	cursorY = event.clientY
})

document.addEventListener("mousemove", event => {
	cursorX = event.clientX
	cursorY = event.clientY
})

updateInterval()

window.skipTask = function(){
	alert("Cheater! =(")
	delete window.skipTask
	
	setInterval(function(){
		document.title = "Cheater! =("
		document.body.innerHTML = "<span id='failScreen'>Cheater! =(</span>"
		console.error("Cheater! =(")
		console.error("Cheater! =( ")
	})
}

Object.defineProperty(window, "skipTask", {
	get: function(){
		skipTask()
		return {} = amount => {}
	},
	set: function(){
		skipTask()
	},
	configurable: true,
	enumerable: true,
})

}()