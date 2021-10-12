const numbers = document.querySelectorAll(".number")
const operations = document.querySelectorAll(".operation")
const deleteButton = document.querySelector(".delete")
const reset = document.querySelector(".reset")
const input = document.querySelector(".number-input")
const selectSlider = document.querySelector(".select-slider")
const selectCircle = document.querySelector(".select-circle")
const equals = document.querySelector(".calculate")
const regexOne = /[-+/x]/g
const regexTwo = /^[1-9].*$/g
const regexThree = /[1-9]/g
const regexFour = /^F[1-9]?[0-2]?/g
let result = false
var symbolCount = 0
const zero = document.querySelector(".zero")
const decimal = document.querySelector(".decimal")

const calculate = () => {
    symbolCount = 0
    input.value = input.value.replaceAll('.','')
    input.value = input.value.replaceAll(',','.')
    let sign = input.value.match(regexOne)
    let numbers = input.value.split(regexOne)
    if(numbers[0]==="")
    {
        numbers[0]="0"
    }
    if(numbers[1]==="")
    {
        numbers[1]="0"
    }
    if(numbers[2])
    {
        numbers[0]="-"+numbers[1]
        numbers[1]=numbers[2]
        sign.splice(0,1)
    }
    if(sign[0]==='+')
    {
        input.value = parseFloat(numbers[0]) + parseFloat(numbers[1])
        input.value = input.value.replaceAll(".",",")
    }
    else if(sign[0]==='-')
    {
        input.value = parseFloat(numbers[0]) - parseFloat(numbers[1])
        input.value = input.value.replaceAll(".",",")
    }
    else if(sign[0]==='x')
    {
        input.value = parseFloat(numbers[0]) * parseFloat(numbers[1])
        input.value = input.value.replaceAll(".",",")
    }
    else if(sign[0]==='/')
    {
        input.value = parseFloat(numbers[0]) / parseFloat(numbers[1])
        input.value = input.value.replaceAll(".",",")
    }
    if(input.value==="Infinity")
    {
        input.value = "Cannot divide by zero"
        input.value = input.value.replaceAll(".",",")
    }
}

const normalNumbersInput = (number) => {
    let symbolCheck = input.value.substring(input.value.length-1)
    let numbers = input.value.split(regexOne)
    if(symbolCheck==="0"&&!numbers[numbers.length-1].match(regexTwo)&&!numbers[numbers.length-1].includes(","))
    {
        input.value = input.value.substring(0, input.value.length-1) 
        input.value += number
    }
    else
    {
        input.value += number
    }
}

const zeroInput = () => {
    let numbers = input.value.split(regexOne)
    let symbolCheck = input.value.substring(input.value.length-1)
    if(numbers[numbers.length-1].match(regexTwo)){
        input.value += "0"
    }
    else if(numbers[numbers.length-1].includes(","))
    {
        input.value += "0"
    }
    if(symbolCheck===""||symbolCheck==="-"||symbolCheck==="+"||symbolCheck==="/"||symbolCheck==="x")
    {
        input.value += "0"
    }
}

const decimalInput = () => {
    let numbers = input.value.split(regexOne)
    let symbolCheck = input.value.substring(input.value.length-1)
    if(!numbers[numbers.length-1].includes(","))
    {
        input.value += ","
    }
    if(symbolCheck===""||symbolCheck==="-"||symbolCheck==="+"||symbolCheck==="/"||symbolCheck==="x")
    {
        input.value = input.value.substring(0,input.value.length-1)
        input.value += "0,"
    }
}

const deleteInput = () => {
    let symbolCheck = input.value.substring(input.value.length-1)
    if(symbolCheck==="-"||symbolCheck==="+"||symbolCheck==="/"||symbolCheck==="x")
    {
        symbolCount -= 1
    }
    input.value = input.value.substring(0, input.value.length-1) 
}

const resetInput = () => {
    input.value = ""
}

const signInput = (sign) => {
    let symbolCheck = input.value.substring(input.value.length-1)
    if(symbolCheck==="-"||symbolCheck==="+"||symbolCheck==="/"||symbolCheck==="x" && sign!=='-')
    {
        input.value = input.value.substring(0, input.value.length-1) 
        input.value += sign
    }
    else if(symbolCheck==="," || symbolCheck===".")
    {
        input.value = input.value.substring(0, input.value.length-1) 
        input.value += sign
        symbolCount += 1
    }
    else if(symbolCheck==="" && sign!=="-")
    {
        input.value += "0"
        input.value += sign
        symbolCount += 1
    }
    else if(symbolCheck==="" && sign==="-")
    {
        input.value += sign
    }
    else
    {
        input.value += sign
        symbolCount += 1
    }
    if(symbolCount>1)
    {
        calculate()
        input.value += sign
        symbolCount += 1
    }
}

numbers.forEach(x=>x.querySelector("button").addEventListener("click",()=>{normalNumbersInput(x.querySelector("button").textContent)}))

operations.forEach(x=>x.querySelector("button").addEventListener("click",()=>{signInput(x.querySelector("button").textContent)}))

deleteButton.addEventListener("click",()=>{deleteInput()})

reset.addEventListener("click",()=>{resetInput()})

equals.addEventListener("click",()=>{calculate()})

zero.addEventListener("click",()=>{zeroInput()})

decimal.addEventListener("click",()=>{decimalInput()})

selectCircle.addEventListener("click", (e)=>{
    let posX = e.pageX-selectSlider.offsetLeft
    let sliderWidth = e.path[1].offsetWidth
    if(posX<(sliderWidth/3))
    {
        selectCircle.classList.remove("select-circle-position-one")
        selectCircle.classList.remove("select-circle-position-three")
        selectCircle.classList.add("select-circle-position-two")
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme","light")
    }
    else if(posX>((sliderWidth/3)*2))
    {
        selectCircle.classList.remove("select-circle-position-two")
        selectCircle.classList.remove("select-circle-position-three")
        selectCircle.classList.add("select-circle-position-one")
        document.documentElement.classList.remove("light")
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme","normal")
    }
    else
    {
        selectCircle.classList.remove("select-circle-position-one")
        selectCircle.classList.remove("select-circle-position-two")
        selectCircle.classList.add("select-circle-position-three")
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme","dark")
    }
})

selectSlider.addEventListener("mousedown",(e)=>{
    let posX = e.pageX-selectSlider.offsetLeft
    let sliderWidth = e.path[1].offsetWidth
    if(posX<(sliderWidth/3))
    {
        selectCircle.classList.remove("select-circle-position-two")
        selectCircle.classList.remove("select-circle-position-three")
        selectCircle.classList.add("select-circle-position-one")
        document.documentElement.classList.remove("light")
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme","normal")
    }
    else if(posX>((sliderWidth/3)*2))
    {
        selectCircle.classList.remove("select-circle-position-one")
        selectCircle.classList.remove("select-circle-position-two")
        selectCircle.classList.add("select-circle-position-three")
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme","dark")
    }
    else
    {
        selectCircle.classList.remove("select-circle-position-one")
        selectCircle.classList.remove("select-circle-position-three")
        selectCircle.classList.add("select-circle-position-two")
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme","light")
    }
})

window.addEventListener("load", function(){
    let themeValue = localStorage.getItem("theme")
    if(themeValue===null)
    {
        if(window.matchMedia("(prefers-color-scheme: dark)").matches)
        {
            selectCircle.classList.remove("select-circle-position-one")
            selectCircle.classList.remove("select-circle-position-two")
            selectCircle.classList.add("select-circle-position-three")
            document.documentElement.classList.remove("light")
            document.documentElement.classList.add("dark")
            themeValue = "dark"
        }
        else if(window.matchMedia("(prefers-color-scheme: light)").matches)
        {
            selectCircle.classList.remove("select-circle-position-one")
            selectCircle.classList.remove("select-circle-position-three")
            selectCircle.classList.add("select-circle-position-two")
            document.documentElement.classList.add("light")
            document.documentElement.classList.remove("dark")
            themeValue = "light"
        }
        else
        {
            document.documentElement.classList.remove("light")
            document.documentElement.classList.remove("dark")
            selectCircle.classList.remove("select-circle-position-two")
            selectCircle.classList.remove("select-circle-position-three")
            selectCircle.classList.add("select-circle-position-one")
            themeValue = "normal"
        }
    }
    else if(themeValue==="normal")
    {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.remove("dark")
        selectCircle.classList.remove("select-circle-position-two")
        selectCircle.classList.remove("select-circle-position-three")
        selectCircle.classList.add("select-circle-position-one")
    }
    else if(themeValue==="light")
    {
        selectCircle.classList.remove("select-circle-position-one")
        selectCircle.classList.remove("select-circle-position-three")
        selectCircle.classList.add("select-circle-position-two")
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
    }
    else if(themeValue==="dark")
    {
        selectCircle.classList.remove("select-circle-position-one")
        selectCircle.classList.remove("select-circle-position-two")
        selectCircle.classList.add("select-circle-position-three")
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
    }
})

window.addEventListener("keydown",(e)=>{
    e.preventDefault()
    if(e.key.match(regexThree) && !e.key.match(regexFour))
    {
        normalNumbersInput(e.key)
    }
    else if(e.key.match(regexOne))
    {
        signInput(e.key)
    }
    else if(e.key === "*")
    {
        signInput("x")
    }
    else if(e.key==="Enter")
    {
        calculate()
    }
    else if(e.key===".")
    {
        decimalInput()
    }
    else if(e.key==="0")
    {
        zeroInput()
    }
    else if(e.key==="Backspace")
    {
        deleteInput()
    }
})