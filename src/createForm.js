// import {   mainFormDivls } from '@/state'
import { body, debounce } from '@/index'
// import { saveAllWork } from '@/js/addToLocalStorage'
import { my_ls_name, my_mainCount, my_secCount, parentArr, generateUUID } from '@/state'

// import { mainQuestionId, divOptNodeID, emptyQuestion } from '@/js/Question'
import {textAreaNode } from '@/components/textAreaNode'
import {createButtonNode } from '@/components/buttonNode' 
import {createDivNode,createDivNodeClass } from '@/components/createElements'

var currEntries = JSON.parse(localStorage.getItem("allEntries"))

console.log(`existingEntries in lc file`, currEntries.length)

export var mainFormDivls = ""
export var mainParentId = ""
export var maincount = 1
export var secCount = 1

export var secId = ''
var uuid = "";
export function formDiv() {
  var FormDivls = createDivNode(`rounded-3  FormDivls`,`FormDivlsformDiv${uuid}`,body)
  var FormDivNode = createDivNode(`rounded-3 mainParentFormDiv`,`formDiv${uuid}`,FormDivls)
  var formHrNode = document.createElement('div')

  FormDivNode.addEventListener('click', selectedParent)
  FormDivls.addEventListener('click', selectFormDivls)
  return { FormDivls, FormDivNode , formHrNode, uuid }
}
//Section Function
export function createSectionNode() {
  //divNode.setAttribute('class', 'rounded-3 addSecDiv')
  uuid = generateUUID()

  var frmDiv = formDiv()

  // if (frmDiv) body.appendChild(frmDiv.FormDivls)
  // if (frmDiv.FormDivls) frmDiv.FormDivls.appendChild(frmDiv.FormDivNode)
   if (frmDiv.formHrNode) frmDiv.FormDivls.appendChild(frmDiv.formHrNode)
   var divNode = createDivNodeClass('rounded-3 addSecDiv',frmDiv.FormDivNode)

  //if (divNode) frmDiv.FormDivNode.appendChild(divNode)
  //section title node
  var SecHeading = textAreaNode(`SecTitle`,`SecTitleId${secCount}`,'Untititled Title')
 
  //section description node
  var SecDis = textAreaNode(`SecDis`,`SecDisId${secCount}`,'add Discription')

  if (SecHeading) divNode.appendChild(SecHeading)
  if (SecDis) divNode.appendChild(SecDis)


  if (secCount >= 2) {
    //delete button
    var delDivNode = createDivNodeClass(`delSecNode`,frmDiv.FormDivls);
    //delDivNode.setAttribute('class', `delSecNode`)
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fas fa-trash-alt`)

    var delBtn = createButtonNode(`btn btn-light `,`FormDivlsformDiv${frmDiv.uuid}`)
    

    delBtn.addEventListener('click', SectionDel)
    //if (delDivNode) frmDiv.FormDivls.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)

  }
  fixTextArea()

  secCount++
  maincount++

  localStorage.setItem(my_secCount, secCount);
  localStorage.setItem(my_mainCount, maincount);

}
function selectFormDivls(e) {
  mainParentId = mainParentId
  var msecId = e.currentTarget.id
  mainFormDivls = msecId
  msecId = ''
}

function selectedParent(e) {
  secId = e.currentTarget.id
  mainParentId = secId
  secId = ''


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
function SectionDel(e) {
  var getIdtoDel = e.currentTarget.id
  var getCurrSec = document.getElementById(getIdtoDel)
  var pikCurrSecChild = getCurrSec.children[0]
  var pikformDIvId = pikCurrSecChild.id
  if (localStorage.getItem(my_ls_name) !== null) {
    var ls_data = JSON.parse(localStorage.getItem(my_ls_name));
    for (var i = 0; i < ls_data.length; i++) {
      if (ls_data[i].CurrentSecId == pikformDIvId) {
        delete ls_data.splice(i, 1)
        delete parentArr.splice(i, 1)
        var getCurrSec = document.getElementById(getIdtoDel)
        getCurrSec?.remove()
        break;
      }
      else if (ls_data[i].CurrentSecId == "") {
        delete ls_data.splice(i, 1)
        delete parentArr.splice(i, 1)
        var getCurrSec = document.getElementById(getIdtoDel)
        getCurrSec?.remove()
        break;
      }

    }
    localStorage.setItem(my_ls_name, JSON.stringify(ls_data));
    getCurrSec?.remove()

  } else {
    var getCurrSec = document.getElementById(getIdtoDel)
    getCurrSec?.remove()

  }
}

//recreate form after reload and delete form 
export function RecreateformDiv(reMakSecId) {
  var FormDivls = createDivNode(`rounded-3  FormDivls`,`FormDivls${reMakSecId}`,body)
  var FormDivNode = createDivNode(`rounded-3 mainParentFormDiv ${reMakSecId}`,reMakSecId,FormDivls)
  var formHrNode = document.createElement('div')

  formHrNode.setAttribute('style', `border-bottom: 1px solid lightgrey ;`)
  FormDivNode.addEventListener('click', selectedParent)
  FormDivls.addEventListener('click', selectFormDivls)
  RecreateSectNode(FormDivls, FormDivNode, formHrNode, reMakSecId)
}
export function RecreateSectNode(FormDivls, FormDivNode, formHrNode, reMakSecId) {
  var divNode = createDivNodeClass('rounded-3 addSecDiv',FormDivNode)

   if (formHrNode) FormDivls.appendChild(formHrNode)
  //section title node
  var SecHeading = textAreaNode(`SecTitle`,`SecTitleId${secCount}`,'Untititled Title')

  //section description node
  var SecDis = textAreaNode(`SecDis`,`SecDisId${secCount}`,'add Discription')
 
  if (SecHeading) divNode.appendChild(SecHeading)
  if (SecDis) divNode.appendChild(SecDis)
  if (secCount >= 2) {
    //delete button
    var delDivNode = createDivNodeClass(`delSecNode`,FormDivls);
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fas fa-trash-alt`)

    var delBtn = createButtonNode(` btn btn-light `,`FormDivls${reMakSecId}`)
    

    delBtn.addEventListener('click', SectionDel)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)

  }
  fixTextArea()

  secCount++
  maincount++
  localStorage.setItem(my_secCount, secCount);
  localStorage.setItem(my_mainCount, maincount);

}