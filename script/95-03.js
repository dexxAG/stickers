'use strict'

// Сделайте стикеры для оставления коротких записей. Стикеры должны представлять собой блоки текста, расположенные на странице в виде плиточки. Пользователь может создавать новые стикеры через textarea, а также редактировать и удалять их. Каждый новый стикер должен добавляться в конец плиточки.

/* let check = document.getElementById('check')
check.addEventListener('click', () => {
   console.log(EDITOR, 'EDITOR');
   console.log(memory, 'memory');
   console.log(deleted, 'deleted');
})  */

// разворачиваем базовые элементы

const main = document.createElement('div');
main.classList.add('main')
document.body.insertAdjacentElement('afterbegin', main);

const stickersZone = document.createElement('div');
stickersZone.classList.add('stickersZone');
main.appendChild(stickersZone)

const editZoneWide = document.createElement('div');
editZoneWide.classList.add('editZoneWide')
main.appendChild(editZoneWide)

// редактор

const editZone = document.createElement('div');
editZone.classList.add('editZone', 'border-dotted-left', 'border-dotted-right')
editZoneWide.appendChild(editZone)

const form = document.createElement('form');
form.classList.add('formClass');
editZone.appendChild(form)

const textArea = document.createElement('textarea');
textArea.classList.add('textAreaClass', 'fontBIG')
textArea.spellcheck = false;
// textArea.required = true;
textArea.id = 'main_text_area'
textArea.minLength = 1;
textArea.maxLength = 52;
textArea.autofocus = true;
// textArea.rows = 4;
form.appendChild(textArea)

// лейбл, сабмит, отмена

const label = document.createElement('label');
label.classList.add('labelClass', 'fontDEF')
label.setAttribute('for', textArea.id)
const typeStickerEdit = 'Редактирование стикера';
const typeSomething = 'Напишите сюда что-нибудь:';
const typeAware = 'Не более 52 символов';
const typeMore = 'Надо написать хоть что-то!'
label.textContent = typeSomething;
form.prepend(label)

const buttonSumbit = document.createElement('button');
buttonSumbit.type = 'button';
buttonSumbit.classList.add('buttonClass','buttonSubmit','hidden');
form.appendChild(buttonSumbit)

const buttonSumbitIcon = document.createElement('img');
buttonSumbitIcon.src = './footage/enter_new.png'
buttonSumbitIcon.classList.add('buttonIconClass', 'fontBIG')
buttonSumbit.appendChild(buttonSumbitIcon)

const buttonEsc = document.createElement('button');
buttonEsc.type = 'button';
buttonEsc.classList.add('buttonClass','buttonEsc','hidden');
form.appendChild(buttonEsc)

const buttonEscIcon = document.createElement('img');
buttonEscIcon.src = './footage/esc_new.png'
buttonEscIcon.classList.add('buttonIconClass', 'fontBIG')
buttonEsc.appendChild(buttonEscIcon)


// кнопки смены стилей

// текст

const changeTextCol = document.createElement('div');
changeTextCol.classList.add('sidebar', 'border-dotted-left', 'hidden');
editZoneWide.prepend(changeTextCol)

const textColLabel = document.createElement('div');
textColLabel.classList.add('sidebarLabel');
textColLabel.insertAdjacentText('afterbegin', 'Цвет текста');
changeTextCol.appendChild(textColLabel)

const textColVariants = document.createElement('div');
textColVariants.classList.add('colVariants');
changeTextCol.appendChild(textColVariants)

const textVar1 = document.createElement('div');
textVar1.classList.add('variant', 'whiteBG', 'blackText', 'fontBIG');
textVar1.insertAdjacentText('afterbegin', 'T');
textColVariants.appendChild(textVar1)

const textVar2 = document.createElement('div');
textVar2.classList.add('variant', 'whiteBG', 'whiteText', 'fontBIG');
textVar2.insertAdjacentText('afterbegin', 'T');
textColVariants.appendChild(textVar2)

const textVar3 = document.createElement('div');
textVar3.classList.add('variant', 'whiteBG', 'blueText', 'fontBIG');
textVar3.insertAdjacentText('afterbegin', 'T');
textColVariants.appendChild(textVar3)

// кнопки смены стилей
// фон

const changeFonCol = document.createElement('div');
changeFonCol.classList.add('sidebar', 'border-dotted-right', 'hidden');
editZoneWide.appendChild(changeFonCol)

const fonColLabel = document.createElement('div');
fonColLabel.classList.add('sidebarLabel');
fonColLabel.insertAdjacentText('afterbegin', 'Цвет фона');
changeFonCol.appendChild(fonColLabel)

const fonColVariants = document.createElement('div');
fonColVariants.classList.add('colVariants');
changeFonCol.appendChild(fonColVariants)

const fonVar1 = document.createElement('div');
fonVar1.classList.add('variant', 'blackBG', 'blackText', 'fontBIG');
fonVar1.insertAdjacentText('afterbegin', 'Ф');
fonColVariants.appendChild(fonVar1)

const fonVar2 = document.createElement('div');
fonVar2.classList.add('variant', 'whiteBG', 'blackText', 'fontBIG');
fonVar2.insertAdjacentText('afterbegin', 'Ф');
fonColVariants.appendChild(fonVar2)

const fonVar3 = document.createElement('div');
fonVar3.classList.add('variant', 'blueBG', 'blackText', 'fontBIG');
fonVar3.insertAdjacentText('afterbegin', 'Ф');
fonColVariants.appendChild(fonVar3)

let stylizers = document.querySelectorAll('.variant')
let textChangers = textColVariants.querySelectorAll('.variant');
let fonChangers = fonColVariants.querySelectorAll('.variant');

// данные



let stickerCounter = 0;
let memory = [
   // {
   //    'stickerID': '1',
   //    'text': 'abc',
   //    'textClass' : '#123456',
   //    'bgClass': '#654321',
   // },
];
let deleted = [];

if (localStorage.getItem('memory')) {
   memory = JSON.parse(localStorage.getItem('memory'))
   for (let stickerOptions of memory) {
      createSticker(stickerOptions, 'storage')
   }
}
if (localStorage.getItem('stickerCounter')) {
   stickerCounter = JSON.parse(localStorage.getItem('stickerCounter'))
}

const EDITOR = {
   'text': `Здесь у нас рандомный текст на ${textArea.maxLength} символа, не более.`,
   'textClass': 'blackText',
   'bgClass': 'whiteBG',
   'source': 'new'
}

if (localStorage.getItem('EDITOR')) {
   let editorStorage = JSON.parse(localStorage.getItem('EDITOR'));

   EDITOR.text = editorStorage.text;
   EDITOR.textClass = editorStorage.textClass;
   EDITOR.bgClass = editorStorage.bgClass;
   EDITOR.source = editorStorage.source;

   refreshTextArea()

   if (EDITOR.text.length > 0) {
      showHidden()
      label.textContent = typeAware;
   }

   if (EDITOR.source !== 'new') {
      label.textContent = typeStickerEdit;

      removeOrAddEditingEffect(true)
   }
}

// логика

function EDITORtoDefault() {
   textArea.value = '';
   EDITOR['source'] = 'new';
   EDITOR['text'] = '';
   EDITOR['bgClass'] = 'whiteBG';
   EDITOR['textClass'] = 'blackText';
   textArea.focus();

   syncEDITOR()
}

function gatherText() {
   EDITOR['text'] = textArea.value;
}

function editTargetToEDITOR(stickerInformation) {
   EDITOR['source'] = stickerInformation['stickerID'];
   EDITOR['text'] = stickerInformation['text']
   EDITOR['textClass'] = stickerInformation['textClass']
   EDITOR['bgClass'] = stickerInformation['bgClass']

   removeOrAddEditingEffect(true)
}

function removeOrAddEditingEffect(add = true) {
   let stickers = stickersZone.querySelectorAll('.sticker');
   for (let sticker of stickers) {
      sticker.classList.remove('editing');
      if (add && sticker.dataset.id == EDITOR['source'] && sticker) {
         sticker.classList.add('editing');
      }
   }
};


function refreshTextArea() {
   textArea.value = EDITOR['text'];

   classListToggler(textArea.classList, ['textAreaClass', 'fontBIG', EDITOR['textClass'], EDITOR['bgClass']], textArea)
   classListToggler(['blueBG', 'whiteBG', 'blackBG'], [EDITOR['bgClass']], ...textChangers)
   classListToggler(['blueText', 'whiteText', 'blackText'], [EDITOR['textClass']], ...fonChangers)
}

function showHidden() {
   changeFonCol.classList.remove('hidden')
   changeTextCol.classList.remove('hidden')
   buttonSumbit.classList.remove('hidden')
   buttonEsc.classList.remove('hidden')
}

function hideHidden() {
   changeFonCol.classList.add('hidden')
   changeTextCol.classList.add('hidden')
   buttonSumbit.classList.add('hidden')
   buttonEsc.classList.add('hidden')
}


function classListToggler(classesToRemove, classesToAdd, ...elements) {
   for (let element of elements) {
      element.classList.remove(...classesToRemove)
      element.classList.add(...classesToAdd)
   }
}

function addToMemory(stickerInformation) {
   memory.push(stickerInformation)
}

function addToStorage() {
   let memoryJSON = JSON.stringify(memory);
   localStorage.setItem('memory', memoryJSON)

   let stickerCounterJSON = JSON.stringify(stickerCounter);
   localStorage.setItem('stickerCounter', stickerCounterJSON)
}

function syncEDITOR() {
   let EDITOR_JSON = JSON.stringify(EDITOR);
   localStorage.setItem('EDITOR', EDITOR_JSON)
}

function createSticker(options, origin = 'new') {

   if (origin === 'new') {
      let stickerInfo = {
         'text': options.text,
         'textClass': options.textClass,
         'bgClass': options.bgClass,
         'stickerID': ++stickerCounter
      }
      addToMemory(stickerInfo)
      addToStorage()
      createStickerBody(stickerInfo)
   } else if (origin === 'storage' || origin === 'deleted') {
      let stickerInfo = {
         'text': options.text,
         'textClass': options.textClass,
         'bgClass': options.bgClass,
         'stickerID': options.stickerID
      }
      createStickerBody(stickerInfo)
   }

   function createStickerBody(stickerInfo) {
      // тело

      let sticker = document.createElement('div');
      sticker.classList.add('sticker', stickerInfo['textClass'], stickerInfo['bgClass']);
      sticker.dataset.id = stickerInfo['stickerID']
      stickersZone.appendChild(sticker)

      let stickerTextWrap = document.createElement('div');
      stickerTextWrap.classList.add('stickerTextWrap')
      sticker.appendChild(stickerTextWrap);

      // ТЕКСТ СТИКЕРА!!!

      let stickerText = document.createElement('p')
      stickerText.classList.add('stickerText', 'fontDEF')
      stickerText.textContent = stickerInfo['text'];
      stickerTextWrap.appendChild(stickerText)

      // кнопки стикера

      let stickerButtonsWrap = document.createElement('div');
      stickerButtonsWrap.classList.add('stickerButtonsWrap')
      sticker.appendChild(stickerButtonsWrap)

      let stickerButtonEdit = document.createElement('button');
      stickerButtonEdit.classList.add('stickerButton', 'stickerButtonEdit');
      stickerButtonsWrap.appendChild(stickerButtonEdit)

      let imgEdit = document.createElement('img');
      imgEdit.classList.add('stickerButtonImg');
      imgEdit.src = './footage/edit.png'
      stickerButtonEdit.appendChild(imgEdit)

      let stickerButtonTop = document.createElement('button');
      stickerButtonTop.classList.add('stickerButton', 'stickerButtonTop');
      stickerButtonsWrap.appendChild(stickerButtonTop)

      let imgTop = document.createElement('img');
      imgTop.classList.add('stickerButtonImg');
      imgTop.src = './footage/star.png'
      stickerButtonTop.appendChild(imgTop)

      let stickerButtonDel = document.createElement('button');
      stickerButtonDel.classList.add('stickerButton', 'stickerButtonDel');
      stickerButtonsWrap.appendChild(stickerButtonDel)

      let imgDel = document.createElement('img');
      imgDel.classList.add('stickerButtonImg');
      imgDel.src = './footage/delete.png'
      stickerButtonDel.appendChild(imgDel)

      // кликеры

      stickerButtonEdit.addEventListener('click', function startEdit() {
         let id = this.closest('.sticker').dataset.id;
         let index = memory.findIndex(sticker => sticker['stickerID'] == id);
         let stickerInfo = memory[index];

         editSticker(stickerInfo)
      })

      stickerButtonDel.addEventListener('click', function() {
         let id = this.closest('.sticker').dataset.id;
         let sticker = this.closest('.sticker');
         let index = memory.findIndex(sticker => sticker['stickerID'] == id);

         sticker.remove()
         deleted.push(...memory.splice(index, 1))

         addToStorage()
      })

      stickerButtonTop.addEventListener('click', function() {
         let id = this.closest('.sticker').dataset.id;
         let sticker = this.closest('.sticker');
         let index = memory.findIndex(sticker => sticker['stickerID'] == id);
         let stickerData = memory.splice(index, 1);

         sticker.remove()
         memory.unshift(...stickerData)
         stickersZone.prepend(sticker)
         
         addToStorage()
      })

      stickerTextWrap.addEventListener('click', function() {
         let text = this.querySelector('p').textContent;
         
         textToSpeech(text)
      })
   }

}


function editSticker(stickerInformation) {
   editTargetToEDITOR(stickerInformation)
   refreshTextArea()
   label.textContent = typeStickerEdit;

   textArea.focus()
   showHidden()
}


function updateSticker(sourceID) {
   let index = memory.findIndex(sticker => sticker['stickerID'] == sourceID);

   if (index !== -1) {
      memory[index]['text'] = EDITOR['text'];
      memory[index]['textClass'] = EDITOR['textClass'];
      memory[index]['bgClass'] = EDITOR['bgClass'];

      addToStorage()

      let sticker = stickersZone.querySelector(`[data-id="${sourceID}"]`);
      let stickerText = sticker.querySelector('p')
      stickerText.textContent = memory[index]['text'];

      classListToggler(sticker.classList, ['sticker', memory[index]['textClass'], memory[index]['bgClass']], sticker)
   } else {
      let options = {
         'text': EDITOR['text'],
         'textClass': EDITOR['textClass'],
         'bgClass': EDITOR['bgClass'],
      }
      createSticker(options);
   }
}


function textToSpeech(text) {
   window.speechSynthesis.cancel();

   const utterance = new SpeechSynthesisUtterance(text);
   window.speechSynthesis.speak(utterance)
}

function validateInput(text) {
   return text.trim().length > 0;
}

function submit() {
   gatherText();
      if (EDITOR['source'] === 'new') {
         let options = {
            'text': EDITOR['text'],
            'textClass': EDITOR['textClass'],
            'bgClass': EDITOR['bgClass'],
         }
         createSticker(options);

         EDITORtoDefault()
         refreshTextArea()
         hideHidden()
         label.textContent = typeSomething;
      } else {

         updateSticker(EDITOR['source'])

         EDITORtoDefault()
         refreshTextArea()
         hideHidden()
         label.textContent = typeSomething;
      }
}

// эвенты

// сабмит и отмена энтером

textArea.addEventListener('keydown', function (evt) {

   if (evt.key === 'Escape') {
      EDITORtoDefault();
      refreshTextArea();
      hideHidden();
      label.textContent = typeSomething;
      
      removeOrAddEditingEffect(false)

   }
   
   if (evt.key === 'Enter' && (evt.ctrlKey)) {
      textArea.value += '\n'
   }

   if (evt.key === 'Enter' && (!evt.ctrlKey && !evt.shiftKey)) {
      evt.preventDefault();

      if (validateInput(textArea.value)) {
         submit()
      } else {
         label.textContent = typeMore;
      }
   }

})

// отмена кнопкой

buttonEsc.addEventListener('click', () => {
   EDITORtoDefault();
   refreshTextArea();
   hideHidden();
   label.textContent = typeSomething;
   
   removeOrAddEditingEffect(false)
})

// сабмит кнопкой

buttonSumbit.addEventListener('click', function () {
   if (validateInput(textArea.value)) {
      submit()
   } else {
      label.textContent = typeMore;
   }
})

// слушатель на поле ввода, интерактив
textArea.addEventListener('input', () => {
   gatherText()
   syncEDITOR()

   if (textArea.value.length > 0) {
      showHidden()
      label.textContent = typeAware;
   } else {
      hideHidden()
      label.textContent = typeSomething;
   }
})

// клики на стилизацию
;(function () {
      textVar1.addEventListener('click', () => {
         classListToggler(['blueText', 'whiteText'], ['blackText'], textArea, fonVar1, fonVar2, fonVar3);
         EDITOR['textClass'] = 'blackText';
         textArea.focus()
         syncEDITOR()
      })

      textVar2.addEventListener('click', () => {
         classListToggler(['blueText', 'blackText'], ['whiteText'], textArea, fonVar1, fonVar2, fonVar3);
         EDITOR['textClass'] = 'whiteText';
         textArea.focus()
         syncEDITOR()
      })

      textVar3.addEventListener('click', () => {
         classListToggler(['blackText', 'whiteText'], ['blueText'], textArea, fonVar1, fonVar2, fonVar3);
         EDITOR['textClass'] = 'blueText';
         textArea.focus()
         syncEDITOR()
      })

      fonVar1.addEventListener('click', () => {
         classListToggler(['blueBG', 'whiteBG'], ['blackBG'], textArea, textVar1, textVar2, textVar3);
         EDITOR['bgClass'] = 'blackBG';
         textArea.focus()
         syncEDITOR()
      })

      fonVar2.addEventListener('click', () => {
         classListToggler(['blueBG', 'blackBG'], ['whiteBG'], textArea, textVar1, textVar2, textVar3);
         EDITOR['bgClass'] = 'whiteBG';
         textArea.focus()
         syncEDITOR()
      })

      fonVar3.addEventListener('click', () => {
         classListToggler(['blackBG', 'whiteBG'], ['blueBG'], textArea, textVar1, textVar2, textVar3);
         EDITOR['bgClass'] = 'blueBG';
         textArea.focus()
         syncEDITOR()
      })
})()








/* Что с этим сделать

!1. Реализовать редактирование. Передавать внутренний ID через this в форму, пусть source принимает его. И после жмяка сабмита пусть ищет среди запощенных этот айдишник, и обновляет его. Функция по поиску айдишнкиа примерная накидана уже там.

!2. Реализовать удаление. По аналогии с редактированием, через this пусть бахает элемент из memory, затем обновляет "выдачу" (написать функцию выдачи, кстати!). При удалении пусть проверяет, если вдруг искомый стикер в стадии редактирования, тогда пусть меняет sourse на new.

!3. Реализовать вынос "в топ списка". Функцию уже написал.

!4. Реализовать связь с localStorage. 

!5. Разобраться со stickerZone. Почему переполняет весь экран? Ведь должен быть скролл только зоны.

6. Д Е С И Г Н - Х У И Г Н. Почему иконки внутри кнопок КРИВЫЕ? (сделал меньше на 1px)

?7. При нажатии Энтер на клаве имитировать нажатие кнопки в инпуте

?8. Реализовать логику "спасения из удаления". После нажатия на Del параллельно с удалением инфы об элементе и его самого, копировать его в массив (push), подобный памяти. Показывать кнопку "Вернуть удалённое" (в угол инпута? в угол окна?). По клику доставать его из массива удалённых (pop), возвращать в stickerZone (как сохранить позицию до удаления? как избежать конфликта при редактировании, чтобы не съехал индекс? лучше в конец. впрочем вроде валидация по data-id прикручена) -- куда пихать кнопки? нужно переосмысление дизайна

9. По аналогии с прошлым добавить кнопку "Удалить всё". По нажатии все стикеры по очереди переезжают в массив удалённых, а память очищается.
Помимо возвращения одного можно попробовать возвращать вообще все. Но кнопка для этого нужна только после нажатия "Удалить всё". 

10. Дата добавления и редактирования стикера. Через timestamp. Реализовать как маленький лейбл книзу от стикера.

11. Анимация при звуке. Анимация при включении/выключении. В общем, играть с этим.

!12. Валидатор

!13. Выделение на стикере, пока он редактируется. Бордер?

!14. Сброс через ESC
*/

