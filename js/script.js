const filterByType = (type, ...values) => values.filter(value => typeof value === type), // объявляется функция filterBytype с аргументами: типом данных и массивом данных для проверки, которая фильтрует массив значений по условию typeof value === type, и создает из них новый массив

	hideAllResponseBlocks = () => { //объявление функции hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // декларировние переменной responseBlocksArray и запись в нее массива из элементов div.dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none'); // перебор массива responseBlocksArray циклом forEach и каждому эелементу массива установка CSS свойства display = 'none'
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //объявление функции showResponseBlock с аргументами blockSelector, msgText, spanSelector
		hideAllResponseBlocks(); //вызов функции hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; // получение элемента переданного в аргумент blockSelector и установка стиля display = 'block'
		if (spanSelector) { // если spanSelector сущесвтует
			document.querySelector(spanSelector).textContent = msgText; // то в этот селектор записываем сообщение msgText
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //объявление функции showError которая принимает аргумент msgText и вызывает функию showResponseBlock с аргументами ('.dialog__response-block_error', msgText, '#error')

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //объявление функции showResults которая принимает аргумент msgText и вызывает функию showResponseBlock с аргументами ('.dialog__response-block_ok', msgText, '#ok')

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),//объявление функции showNoResults которая вызывает функию showResponseBlock с аргументом ('.dialog__response-block_no-results')

	tryFilterByType = (type, values) => { // объявление функции tryFilterByType с аргументами (type, values)
		try { // блок try из конструкции try..catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //объявление переменной valuesArray, запись в нее массива из данных полученных от выполнения метода eval, в шаблонной строке метода eval указан вызов функции 
			const alertMsg = (valuesArray.length) ? //объявление переменной alertMsg, запись в нее шаблонной строки получаемой из условия: если valuesArray.length не 0, то `Данные с типом ${type}: ${valuesArray}`, иначе `Отсутствуют данные типа ${type}`
				`Данные с типом ${type}: ${valuesArray}` : // шаблонная строка
				`Отсутствуют данные типа ${type}`; // шаблонная строка
			showResults(alertMsg); // вызов функции showNoResults c аргументом alertMsg
		} catch (e) { // блок catch c аргументом e
			showError(`Ошибка: ${e}`); // вызов функции showError с ргументом в виде шаблонной строки с указанием ошибки
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получаем кнопку на форме

filterButton.addEventListener('click', e => { // ставим на кнопку прослушиватель событий, событие 'click', вызов колбэк функции
	const typeInput = document.querySelector('#type'); // получение инпутов на форме по ID
	const dataInput = document.querySelector('#data'); // получение инпутов на форме по ID

	if (dataInput.value === '') { // если значение dataInput пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // то вызывается метод setCustomValidity с сообщением 'Поле не должно быть пустым!'
		showNoResults(); // вызв функции showNoResults
	} else { иначе
		dataInput.setCustomValidity(''); // в метод setCustomValidity передается пустая строка
		e.preventDefault(); // страница не обновляется 
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызывается функция tryFilterByType с аргументами (typeInput.value.trim(), dataInput.value.trim()) в которых удалены пробелы
	}
});

