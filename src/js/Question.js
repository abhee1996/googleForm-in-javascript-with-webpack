
import {
  mainParentId,
  // parentArr 
} from '@/createForm'
import { createMultiNode, createSelectOptionNode } from '@/index'
import {
  my_ls_name, my_quesCount,
  my_optCount,
  parentArr,
} from '@/state'
var existEntries = JSON.parse(localStorage.getItem(my_ls_name));
import { textAreaNode } from '@/components/textAreaNode'
import { inputNode } from '@/components/inputNode'  //inputNode(cls, id ,type)
import { createAnchorNode, createDivNode } from '@/components/createElements'
import { createButtonNode } from '@/components/buttonNode' //createButtonNode(clas,id)

export var quescount = 1
export var Optcount = 1

export var uuidget = ""
var optguid = "" //
var guid = ""
function newUuidget() {
  return Math.random().toString(16).substring(2, 10) + (new Date()).getTime().toString(36);
}
function newGuidget() {
  let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
  return [u.substr(0, 8), u.substr(8, 4)].join('-') + u.length;
}
//variables
export var mainQuestionId = ""
export var getquestionID = ''
export var getquestionOptionID = ''
export var mainQuesOptionId = ""
export var divOptNodeID = ""
export var currSelectedQtype = 'radio'


// Create Question Function
export function questionSec(mainParentId) {
  //Optcount = 1
  uuidget = newUuidget()
  console.log('new question uuidget', uuidget);
  mainQuestionId = `addQuesDiv${uuidget}`
  getquestionID = `quesTxtId${mainQuestionId}`
  var formDivId = document.getElementById(`${mainParentId}`)

  var questionDivNode = createDivNode('addQuesDiv', mainQuestionId,formDivId)

  var questxtDiv = createMultiNode(questionDivNode, 'div', `questxtDiv`)
  var questionText = textAreaNode(`questionText`, getquestionID, 'my question is ?')
  var addMultiOptions = createAnchorNode('addMultiOptions text-warning', `${getquestionOptionID}`, `#`)

  var moreOptsBtn = document.createTextNode(`add options`)
  var divOptionsNode = createDivNode('optionsInDiv', "",questionDivNode)
  questionDivNode.addEventListener('click', selectedQuestion)
  addMultiOptions.addEventListener('click', function (e) {
    e.preventDefault()
    quesOptions(divOptionsNode, getquestionID)
  })
  fixTextArea()
  //if (questionDivNode) formDivId.appendChild(questionDivNode)

  if (questionText) questxtDiv.appendChild(questionText)
  createSelectOptionNode(questxtDiv, 'sel')
  createMultiNode(questionDivNode, 'br')
  if (moreOptsBtn) addMultiOptions.appendChild(moreOptsBtn)
  if (addMultiOptions) questionDivNode.appendChild(addMultiOptions)
  createMultiNode(questionDivNode, 'br')
  //if (divOptionsNode) questionDivNode.appendChild(divOptionsNode)
  quesOptions(divOptionsNode, getquestionID) //create mcqs options
  if (quescount > 1) {
    //delete button
    var delDivNode = createDivNode(`delQuesNode`, "",questionDivNode);
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fas fa-trash-alt`)
    var delBtn = createButtonNode(` btn btn-light `, mainQuestionId)
    delBtn.addEventListener('click', delQuestion)
    //if (delDivNode) questionDivNode.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)
  }

  quescount++
  localStorage.setItem(my_quesCount, quescount);
  return divOptionsNode

}

function selectedQuestion(e) {
  var getQueId = e.currentTarget.id
  mainQuestionId = getQueId
  getQueId = ''
  return mainQuestionId
}
function selectedQuestionOption(e) {
  var getQueOPtId = e.currentTarget.id
  divOptNodeID = getQueOPtId
  getQueOPtId = ''
 //selectedQuestion(e)
  return divOptNodeID
}
export function emptyQuestion() {
  mainQuestionId = ''
  divOptNodeID = ''
  getquestionID =''

}
export function emptyQuestionOptions() {
  // mainQuestionId = ''
  divOptNodeID = ''

}
function selectedQtype(e) {
  qTypeId = e.currentTarget.id
  currSelectedQtype = qTypeId
  qTypeId = ''
}
//Create Question options func

export function quesOptions(divOptionsNode, getquestionID) {
  var getquestion = document.getElementById(`${getquestionID}`)
  guid = newGuidget()

  console.log('guid:', guid);
  divOptNodeID = `addOptInQNode${guid}`
  getquestionOptionID = `quesOptionTextId${divOptNodeID}`
  var divOptNode = createDivNode('addRadioInDiv', divOptNodeID,divOptionsNode)
  var optTypeRadio = inputNode('questionOptions r1', "", currSelectedQtype, "")
  var quesOptionText = inputNode(`quesOptionText r1`, getquestionOptionID, 'text', 'option text')
  // if (divOptNode) divOptionsNode.appendChild(divOptNode)
  divOptNode.addEventListener('click',selectedQuestionOption )
  if (optTypeRadio) divOptNode.appendChild(optTypeRadio)
  if (quesOptionText) divOptNode.appendChild(quesOptionText)
  if (Optcount > 1) {
    //delete button
    var delDivNode = createDivNode(`delQuesOptionNode`, "",divOptNode);
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fa fa-close`)
    var delBtn = createButtonNode(` btn btn-light `, divOptNodeID)

    delBtn.addEventListener('click', delQuestOptions)
    //if (delDivNode) divOptNode.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)
  }
  Optcount++
  localStorage.setItem(my_optCount, Optcount);
}
function fixTextArea() {
  // Add active class to the current button (highlight it)
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) / 1.1 + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }, false);
  }
}
function delQuestion(e) {
  var getCurrQuestionId = e?.currentTarget?.id
  var getCurrQues = document.getElementById(getCurrQuestionId)
  var getQueid = selectedQuestion(e)
  if (localStorage.getItem(my_ls_name) !== null) {
    var ls_data = JSON.parse(localStorage.getItem(my_ls_name));

    for (var i = 0; i < ls_data.length; i++) {
      if (ls_data[i]?.CurrentSecId === mainParentId) {
        for (var j = 0; j < ls_data[i].questions.length; j++) {
          if (ls_data[i].questions[j].qId == getCurrQuestionId) {
            ls_data[i]?.questions?.splice(j, 1)
            parentArr[i]?.questions?.splice(j, 1)
            getCurrQues?.remove()
            break;
          }
          else if (ls_data[i].questions[j].qId == "") {
            ls_data[i]?.questions?.splice(j, 1)
            parentArr[i]?.questions?.splice(j, 1)
            getCurrQues?.remove()
            break;
          }
    

        }
      }
    }
    getCurrQues?.remove()

    localStorage.setItem(my_ls_name, JSON.stringify(ls_data));
  }
  else {
    getCurrQues?.remove()
    // break;
  }
}
function delQuestOptions(e) {
  //delete question option
  var getCurrOptBtnId = e?.currentTarget?.id//.getAttribute("id")//,value);//e?.currentTarget?.id

  var getCurrQuesOption = document.getElementById(getCurrOptBtnId)

  if (localStorage.getItem(my_ls_name) !== null) {
    var ls_data = JSON.parse(localStorage.getItem(my_ls_name));
    // check and enter in selected div
    for (var i = 0; i < ls_data.length; i++) {
      if (ls_data[i]?.CurrentSecId == mainParentId) {
        // check and enter in selected Question
        for (var j = 0; j < ls_data[i].questions.length; j++) {
          if (ls_data[i].questions[j].qId == mainQuestionId) {
            for (var k = 0; k < ls_data[i].questions[j].options.length; k++) {
              if (ls_data[i].questions[j].options[k].optId == getCurrOptBtnId) {
                ls_data[i]?.questions[j]?.options.splice(k, 1)
                parentArr[i]?.questions[j]?.options.splice(k, 1)
                getCurrQuesOption?.remove()
                break;
              }
              else if (ls_data[i].questions[j].options[k].optId == "") {
                ls_data[i]?.questions[j]?.options.splice(k, 1)
                parentArr[i]?.questions[j]?.options.splice(k, 1)
                getCurrQuesOption?.remove()
                break;
              }

            }
          }
        }
      }
      
    }
    getCurrQuesOption?.remove()

    localStorage.setItem(my_ls_name, JSON.stringify(ls_data));
  }
  else {
    getCurrQuesOption?.remove()
  }
}
// ReCreate Question Function
export function ReCreateQuestionNode(mainParentId, reMakQuesId, reMakQuesOptionId) {
  mainQuestionId = reMakQuesId
  getquestionID = `quesTxtId${mainQuestionId}`
  var formDivId = document.getElementById(`${mainParentId}`)
  var questionDivNode = createDivNode('addQuesDiv', mainQuestionId,formDivId)
  var questxtDiv = createMultiNode(questionDivNode, 'div', `questxtDiv`)
  var questionText = textAreaNode(`questionText`, getquestionID, 'my question is ?')
  var addMultiOptions = createAnchorNode('addMultiOptions text-warning', `${getquestionOptionID}`, `#`)
  var moreOptsBtn = document.createTextNode(`add options`)
  var divOptionsNode = createDivNode('optionsInDiv', "",questionDivNode)
  questionDivNode.addEventListener('click', selectedQuestion)
  addMultiOptions.addEventListener('click', function (e) {
    e.preventDefault()
    quesOptions(divOptionsNode, getquestionID)
   // RecreateQuestionsOptions(divOptionsNode, getquestionID, reMakQuesOptionId)
  })
  fixTextArea()
  //if (questionDivNode) formDivId.appendChild(questionDivNode)
  if (questionText) questxtDiv.appendChild(questionText)
  createSelectOptionNode(questxtDiv, 'sel')
  createMultiNode(questionDivNode, 'br')
  if (moreOptsBtn) addMultiOptions.appendChild(moreOptsBtn)
  if (addMultiOptions) questionDivNode.appendChild(addMultiOptions)
  createMultiNode(questionDivNode, 'br')
  //if (divOptionsNode) questionDivNode.appendChild(divOptionsNode)
  RecreateQuestionsOptions(divOptionsNode, getquestionID, reMakQuesOptionId) //create mcqs options
  if (quescount > 0) {
    //delete button
    var delDivNode = createDivNode(`delQuesNode`, "",questionDivNode);
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fas fa-trash-alt`)
    var delBtn = createButtonNode(` btn btn-light `, mainQuestionId)
    delBtn.addEventListener('click', delQuestion)
    //if (delDivNode) questionDivNode.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)
  }

  quescount++
  localStorage.setItem(my_quesCount, quescount);

  return divOptionsNode

}
//ReCreate Question options func

export function RecreateQuestionsOptions(divOptionsNode, getquestionID, reMakQuesOptionId) {
  var getquestion = document.getElementById(`${getquestionID}`)
  divOptNodeID = reMakQuesOptionId
  getquestionOptionID = `quesOptionTextId${reMakQuesOptionId}`

  var divOptNode = createDivNode('addRadioInDiv', divOptNodeID,divOptionsNode)

  divOptNode.addEventListener('click',selectedQuestionOption )

  var optTypeRadio = inputNode('questionOptions r1', "", currSelectedQtype, "")

  var quesOptionText = inputNode(`quesOptionText r1`, getquestionOptionID, 'text', 'option text')

  //if (divOptNode) divOptionsNode.appendChild(divOptNode)
  if (optTypeRadio) divOptNode.appendChild(optTypeRadio)
  if (quesOptionText) divOptNode.appendChild(quesOptionText)
  if (Optcount > 0) {
    //delete button
    var delDivNode = createDivNode(`delQuesOptionNode`, '',divOptNode);
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fa fa-close`)
    var delBtn = createButtonNode(` btn btn-light `, divOptNodeID)

    delBtn.addEventListener('click', delQuestOptions)
    //if (delDivNode) divOptNode.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)
  }
  Optcount++
  localStorage.setItem(my_optCount, Optcount);

}