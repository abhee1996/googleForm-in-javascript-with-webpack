
// Test import of a JavaScript module
import {
  createSectionNode, mainParentId,
  RecreateSectNode, RecreateformDiv,
  // parentArr,
  formDiv,
} from '@/createForm'
// import { createTitleDiscNode } from '@/js/TitleDiscription'
//import { mainParentId } from '@/js/TitleDiscription'
//import { localArr } from '@/js/saveTolocalStrg'
import { saveAllWork, localArr, matchIndex, addToLocalStorage, addCountToLocalStorage } from '@/js/addToLocalStorage'
import { questionSec, quesOptions, ReCreateQuestionNode, RecreateQuestionsOptions } from '@/js/Question'
import {
  my_ls_name,
  existingEntries,
  parentArr,
  prentHavExistingArr,
  generateUUID,
} from '@/state'
// Test import of styles
import '@/styles/index.scss'
import '@/styles/style.css'
//import '@/'
export var bodyNode = document.querySelector('body')
export var body = document.querySelector('.body')
var createSec = document.getElementById('createSec')
createSec.addEventListener('click', function () {

  //formDiv(uuid)
  createSectionNode()
})
let addQuestion = document.getElementById('addQuestion')
// var addTitleAndText = document.getElementById('addTitleAndText')
export var previewer = document.getElementById('previewer')
export var saveWork = document.getElementById('saveWork')



//onselect pick ids of 
//var mainFormDivls = ""
//var mainParentId = ""
//var mainQuestionId = ""
//var mainQuesOptionId = ""
//var divOptNodeID = ""
// var my_ls_name = "allEntries"
// var existingEntries = JSON.parse(localStorage.getItem(my_ls_name));
// var maincount = 1
// var secCount = 1
// var quescount = 1
// var Optcount = 1
// var secId = ''
// var getquestionID = ''
// var currSelectedQtype = 'radio'
// var getquestionOptionID = ''
// var parentArr = []


// function selectFormDivls(e) {
//   mainParentId = mainParentId
//   var msecId = e.currentTarget.id
//   mainFormDivls = msecId
//   msecId = ''
// }

var reMakSecId
if (existingEntries.length > 0) {
  prentHavExistingArr()
  console.log('parentArr', parentArr);
  for (let i = 0; i < existingEntries.length; i++) {
    reMakSecId = existingEntries[i].CurrentSecId
    //RecreateSectNode(reMakSecId)
    RecreateformDiv(reMakSecId)

    console.log('existingEntries.length', existingEntries.length);
    console.log('existingEntries[i].questions.length', existingEntries[i].questions.length);
    var SecTitleAll = document.querySelector(`#SecTitleId${i + 1}`)
    var SecDisAll = document.querySelector(`#SecDisId${i + 1}`)

    SecTitleAll.innerText = existingEntries[i]?.title
    SecDisAll.innerText = existingEntries[i]?.discription
    const mainParentId = existingEntries[i]?.CurrentSecId
    const optCnt = 0

    if (existingEntries.filter(each => { return each.CurrentSecId === existingEntries[i]?.CurrentSecId }).length > 0) {
      for (var j = 0; j < existingEntries[i].questions.length; j++) {
        let reMakQuesId = existingEntries[i].questions[j].qId
        if (existingEntries[i].questions.filter(each => { return each.qId === existingEntries[i].questions[j]?.qId }).length > 0) {
          for (var k = 0; k < existingEntries[i].questions[j].options.length; k++) {
            var reMakQuesOptionId = existingEntries[i].questions[j].options[k].optId
          }
        }
        const getdivOptionsNode = ReCreateQuestionNode(mainParentId, reMakQuesId, reMakQuesOptionId)
        const reGenques = `#quesTxtId${reMakQuesId}`//${j + 41}`
        var questionTextIdAll = document.querySelector(reGenques)
        questionTextIdAll.innerText = existingEntries[i].questions[j].question

        if (existingEntries[i].questions.filter(each => { return each.qId === existingEntries[i].questions[j]?.qId }).length > 0) {
          for (var f = 0; f < existingEntries[i].questions[j].options.length; f++) {


            const reGenOpt = `#quesOptionTextId${reMakQuesOptionId}`

            if (existingEntries[i].questions[j].options.filter(each => { return each.optId === existingEntries[i].questions[j]?.options[f]?.optId }).length > 0) {

              var quesOptionTextAll = document.querySelector(reGenOpt)
              quesOptionTextAll.value = existingEntries[i].questions[j].options[f].option
              if (f !== existingEntries[i].questions[j].options.length - 1) {
                RecreateQuestionsOptions(getdivOptionsNode, reGenques, reMakQuesOptionId) //create mcqs options

              }
              optCnt++
            }




          }
        }
      }
    }

  }
}
else {
  console.log('existingEntries.length', existingEntries.length);

  if (existingEntries.length == 0) {

    var createfrm = createSectionNode()
    let sid = 1
    var SecTitleAll = document.getElementById(`SecTitleId${sid}`)
    var SecDisAll = document.getElementById(`SecDisId${sid}`)
    SecTitleAll.innerText = " untitled Title "
    SecDisAll.innerText = "untitled Discription"

  }
}
export function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () { callback.apply(this, args); }, wait);
  };
}

window.addEventListener('keyup', debounce(() => {

  saveAllWork()
}, 5000))
// }
addQuestion.addEventListener('click', function () {
  // debugger;
  questionSec(mainParentId)
})

function selectedQtype(e) {
  qTypeId = e.currentTarget.id
  currSelectedQtype = qTypeId
  qTypeId = ''
}


saveWork.addEventListener('click', function () {
  saveAllWork()
}, false)




export function createMultiNode(parent, node, cls) {
  var createNode = document.createElement(node)
  if (createNode) parent.appendChild(createNode)
  if (createNode) createNode.setAttribute('class', cls)
  return createNode
}

export function createSelectOptionNode(parent, cls) {
  var selectNode = document.createElement('select')
  var option1 = document.createElement('option')
  if (option1) option1.setAttribute('id', 'radio')

  var option2 = document.createElement('option')
  if (option2) option2.setAttribute('id', 'checkbox')

  var opt1 = document.createTextNode('multiple Choice')
  var opt2 = document.createTextNode('checkboxes')
  if (selectNode) parent.appendChild(selectNode)
  if (option1) selectNode.appendChild(option1)
  if (option2) selectNode.appendChild(option2)

  if (opt1) option1.appendChild(opt1)
  if (opt2) option2.appendChild(opt2)
  if (selectNode) selectNode.setAttribute('class', cls)
  if (selectNode) selectNode.setAttribute('id', 'SelQuesType')
  if (selectNode) selectNode.setAttribute('onchange', 'showOptions(this)')
  var SelQuesType = document.getElementById('SelQuesType')
  SelQuesType.addEventListener('change', function () {
    var getAllatype = document.querySelectorAll(`.${uniqueOptionsType}`)
    for (op = 0; op < getAllatype?.length; op++) {
      getAllatype[op].setAttribute('type', currSelectedQtype)
    }
  }, false)
  return selectNode
}

function showOptions(e) {
  var selOptionId = e[e.selectedIndex].id
  currSelectedQtype = selOptionId
  selOptionId = ''
  console.log("id is ", e[e.selectedIndex].id); // get id

}



previewer.addEventListener('click', function () {
  preView()
})
function preView() {
  window.location.href = './docFormViewer.html'
}

