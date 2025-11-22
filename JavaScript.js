/* --- الجزء الخاص بتغيير الثيم (موجود سابقاً) --- */
let $toggler = document.getElementById('toggler'),
    $calculator = document.querySelector('.calculator');

if($calculator.classList.contains('dark')) {
  $toggler.querySelector('#light').style.display = 'block';
  $toggler.querySelector('#dark').style.display = 'none';
} else {
  $toggler.querySelector('#light').style.display = 'none';
  $toggler.querySelector('#dark').style.display = 'block';
}

$toggler.addEventListener('click', function() {
  $calculator.classList.toggle('dark');
  
  if($calculator.classList.contains('dark')) {
    $toggler.querySelector('#light').style.display = 'block';
    $toggler.querySelector('#dark').style.display = 'none';
  } else {
    $toggler.querySelector('#light').style.display = 'none';
    $toggler.querySelector('#dark').style.display = 'block';
  }
});

/* --- الجزء الجديد: منطق الآلة الحاسبة --- */

// تعريف العناصر
const operationScreen = document.querySelector('.calculator-operation');
const resultScreen = document.querySelector('.calculator-operation-result');
const buttons = document.querySelectorAll('.calculator-button');

let currentInput = ""; // الرقم الذي يتم كتابته حالياً
let history = "";      // العملية كاملة

// دالة لتحديث الشاشة
function updateScreen(value, isResult = false) {
    resultScreen.innerText = value;
    if(!isResult) {
        operationScreen.innerText = history;
    }
}

// الاستماع لضغطة الأزرار
buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const btnText = btn.innerText.trim();
        
        // 1. زر المسح (C)
        if (btnText === 'C') {
            currentInput = "";
            history = "";
            updateScreen("0");
            operationScreen.innerText = "";
            return;
        }

        // 2. زر الحذف (Backspace) - أيقونة الممحاة
        if (btn.querySelector('.bi-eraser-fill')) {
            currentInput = currentInput.toString().slice(0, -1);
            if (currentInput === "") currentInput = "0";
            updateScreen(currentInput);
            return;
        }

        // 3. زر النتيجة (=)
        if (btn.classList.contains('equal')) {
            try {
                // استبدال الرموز لتتناسب مع لغة البرمجة
                // الرمز × يتحول لـ * والرمز ÷ يتحول لـ /
                let expression = history + currentInput;
                // تنظيف المعادلة لحمايتها (بسيط)
                let finalResult = eval(expression); 
                
                // عرض النتيجة
                operationScreen.innerText = expression.replace('*', '×').replace('/', '÷');
                updateScreen(finalResult, true);
                currentInput = finalResult;
                history = "";
            } catch (error) {
                updateScreen("Error", true);
            }
            return;
        }

        // 4. التعامل مع العمليات الحسابية والأرقام
        // نحتاج تحديد نوع الزر بناءً على موقعه أو الأيقونة بداخله لأن الـ HTML لا يحتوي على ID
        
        let valueToAdd = "";

        if (btn.querySelector('.bi-plus')) valueToAdd = "+";
        else if (btn.querySelector('.bi-dash')) valueToAdd = "-";
        else if (btn.querySelector('.bi-x')) valueToAdd = "*";
        else if (btn.querySelector('.bi-percent')) valueToAdd = "/100"; // النسبة المئوية
        else if (btn.querySelector('.bi-dot')) valueToAdd = ".";
        else if (index === 1) valueToAdd = "/"; // زر القسمة (موقعه الثاني في الـ HTML)
        else {
            // إذا لم يكن رمزاً، فهو رقم
            valueToAdd = btnText;
        }

        // منطق الكتابة
        if (['+', '-', '*', '/'].includes(valueToAdd)) {
            history += currentInput + valueToAdd;
            currentInput = "";
            operationScreen.innerText = history;
        } else {
            if (currentInput === "0" && valueToAdd !== ".") currentInput = valueToAdd;
            else currentInput += valueToAdd;
            updateScreen(currentInput);
        }
    });
});