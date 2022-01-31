export var body = document.querySelector('.body')

export var maincount = 1
export var secCount = 1
export var quescount = 1
export var ttlcount = 1
export var secId = ''
export var mainParentId = ""
export var parentArr = []


function formDiv() {
  var FormDivls = document.createElement('div')
  var FormDivNode = document.createElement('div')
  var formHrNode = document.createElement('div')
  FormDivls.setAttribute('id', `FormDivls${maincount}`)
  FormDivNode.setAttribute('id', `formDiv${maincount}`)
  FormDivNode.setAttribute('class', `rounded-3 mainParentFormDiv formDiv${maincount}`)
  formHrNode.setAttribute('style', `border-bottom: 1px solid lightgrey ;`)
  FormDivNode.addEventListener('click', selectedParent)
  return { FormDivls, FormDivNode, formHrNode }
}


function selectedParent(e) {
  secId = e.currentTarget.id
  mainParentId = secId
  secId = ''
}

export function createTitleDiscNode() {
  var divNode = document.createElement('div')
  divNode.setAttribute('class', 'rounded-3 addSecDiv')

  var frmDiv = formDiv()
  if (frmDiv) body.appendChild(frmDiv.FormDivls)
  if (frmDiv.FormDivls) frmDiv.FormDivls.appendChild(frmDiv.FormDivNode)
  if (frmDiv) body.appendChild(frmDiv.formHrNode)
  if (divNode) frmDiv.FormDivNode.appendChild(divNode)
  var SecHeading = document.createElement('textarea')
  SecHeading.setAttribute('class', `SecTitle`)
  SecHeading.setAttribute('id', `SecTitleId${secCount}`)
  SecHeading.setAttribute('placeholder', 'Untititled Title')
  var SecDis = document.createElement('textarea')
  SecDis.setAttribute('class', `SecDis`)
  SecDis.setAttribute('id', `SecDisId${secCount}`)
  SecDis.setAttribute('placeholder', 'add Discription')
  if (SecHeading) divNode.appendChild(SecHeading)
  if (SecDis) divNode.appendChild(SecDis)
  fixTextArea()
  if (parentArr == null) parentArr = [];

  secCount++
  maincount++
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











export function localArr() {
  var initialstate = {
    CurrentSecId: mainParentId,
    title: '',
    discription: '',
    questions: [
    ]
  }
  var quesState = {
    qId: mainQuestionId,
    //qId: getquestionID,
    question: '',
    Qtype: '',
    options: [
    ]
  }
  var optionsState = {
    optId: divOptNodeID,
    option: '',
    correct: false
  }

  var getCurrSec = document.getElementById(mainParentId)
  var child = getCurrSec?.children[0]; //get title and discription
  var subChild = child?.children[0]?.value || child?.childNodes[0]?.value// get Title
  var subChild1 = child?.children[1]?.value || child?.childNodes[1]?.value //get discription
  var child2 = getCurrSec?.children[1];

  var subChild2OfId = document.getElementById(getquestionID)
  var subChild2 = subChild2OfId?.value || ''
  console.log(`subChild2OfId ,subChild2`, subChild2OfId, subChild2)
  var child3 = child2?.children[2]

  var getsubChild3ById = document.getElementById(getquestionOptionID)  //get question options
  var subChild3 = getsubChild3ById?.value
 // if (parentArr.filter(each => { return each.CurrentSecId === mainParentId; }).length > 0) {
  if (parentArr.find(each => { return each.CurrentSecId === mainParentId; })) {
    //update sectio + add questions
    for (let i = 0; i < parentArr.length; i++) {
      if (parentArr[i]?.CurrentSecId === mainParentId) {
        parentArr[i].title = subChild
        parentArr[i].discription = subChild1
        matchQIndex = currEntries[i]?.questions?.length;
        let questionIdIndex = -1;
        let optionIdIndex = -1;
        parentArr[i].questions.forEach(function(each, j) {
            if(each.qId === mainQuestionId){
              questionIdIndex = j;
            }
        })

        if(questionIdIndex > -1){
            parentArr[i].questions[questionIdIndex].question = subChild2;
            parentArr[i].questions[questionIdIndex].Qtype = "MCQs";
            matchOptionIndex = matchOptionIndex == undefined ? currEntries[i]?.questions[j]?.options?.length:parentArr[i].questions[j].options.length
            //update option
            parentArr[i].questions[questionIdIndex].options?.forEach(function(option, k) {
              if(option.optId === divOptNodeID){
                optionIdIndex = k;
              }
            })

            if(optionIdIndex > -1){
              parentArr[i].questions[questionIdIndex].options[optionIdIndex].option = subChild3;
              parentArr[i].questions[questionIdIndex].options[optionIdIndex].correct = false;
            }
            else {
              //add new options related to same question
              parentArr[i].questions[j].options.push(optionsState)
              for (let t = matchOptionIndex; t < parentArr[i].questions[j].options.length; t++) {
                if (parentArr[i].questions[j].options[t].optId === divOptNodeID) {
                  parentArr[i].questions[j].options[t].option = subChild3
                  parentArr[i].questions[j].options[t].correct = false
                }
              }
              matchOptionIndex = parentArr[i].questions[j].options.length
              emptyQuestionOptions()
            }
            emptyQuestion()
                break;
        }

       // if (parentArr[i].questions.filter(each => { return each.qId === mainQuestionId; }).length > 0) {
          //update question and new or more add options
        //  for (let j = 0; j < parentArr[i].questions.length; j++) {
        //    if (parentArr[i].questions[j]?.qId === mainQuestionId) {
              // parentArr[i].questions[j].question = subChild2
              // parentArr[i].questions[j].Qtype = "MCQs"
              // matchOptionIndex = matchOptionIndex == undefined ? currEntries[i]?.questions[j]?.options?.length:parentArr[i].questions[j].options.length
              //  if (divOptNodeID !== "") {
        //      if (parentArr[i].questions[j].options.filter(each => { return each.optId === divOptNodeID; }).length > 0) {
                //update existing options 
         //       for (let k = 0; k <= parentArr[i].questions[j].options.length; k++) {
         //         if (parentArr[i].questions[j].options[k]?.optId === divOptNodeID) {
                  //  parentArr[i].questions[j].options[k].option = subChild3
                  //  parentArr[i].questions[j].options[k].correct = false
                 // }
                //}
               // emptyQuestion()
               // break;
              //}
              // else {
              //   //add new options related to same question
              //   parentArr[i].questions[j].options.push(optionsState)
              //   for (let t = matchOptionIndex; t < parentArr[i].questions[j].options.length; t++) {
              //     if (parentArr[i].questions[j].options[t].optId === divOptNodeID) {
              //       parentArr[i].questions[j].options[t].option = subChild3
              //       parentArr[i].questions[j].options[t].correct = false
              //     }
              //   }
              //   matchOptionIndex = parentArr[i].questions[j].options.length
              //   emptyQuestionOptions()
              // }
              // }
          //  }
         // }
         // break;
        //}
        else {
          // add new question and options* in same section if not exist
          if (mainQuestionId !== "") {
            parentArr[i].questions.push(quesState)
            for (let q = matchQIndex; q < parentArr[i].questions.length; q++) {
              if (parentArr[i].questions[q].qId === mainQuestionId) {
                parentArr[i].questions[q].question = subChild2
                parentArr[i].questions[q].Qtype = 'MCQs'
                parentArr[i].questions[q].options.push(optionsState) // if options* ofsame question if not exist
                for (let g = 0; g < parentArr[i].questions[q].options.length; g++) {
                  if (parentArr[i].questions[q].options[g].optId === divOptNodeID) {
                    parentArr[i].questions[q].options[g].option = subChild3
                    parentArr[i].questions[q].options[g].correct = false
                  }
                }

              }
            }
            emptyQuestion()
            matchQIndex = parentArr[i].questions.length
          }
        }
      }
      console.log(`parentArr:`, parentArr)
      console.log(`parentArr[i].questions:`, parentArr[i].questions)
    }
  }
  else {
    parentArr.push(initialstate)

    if (parentArr[matchIndex]?.CurrentSecId === mainParentId) {
      parentArr[matchIndex].title = subChild
      parentArr[matchIndex].discription = subChild1
      parentArr[matchIndex].questions
      if (mainQuestionId !== "") {
        //for (let i = 0; i < parentArr.length; i++) {
          if (parentArr[matchIndex].questions.filter(each => { return each.qId === mainQuestionId; }).length > 0) {

            parentArr[matchIndex].questions.push(quesState)
            if (parentArr[matchIndex].questions[matchQIndex]?.qId === mainQuestionId) {
              parentArr[matchIndex].questions[matchQIndex].question = subChild2
              parentArr[matchIndex].questions[matchQIndex].Qtype = "MCQs"
              if (divOptNodeID !== "") {
                parentArr[matchIndex].questions[matchIndex].options.push(optionsState)
                if (parentArr[matchIndex].questions[matchIndex].options[matchIndex]?.optId === divOptNodeID) {
                  parentArr[matchIndex].questions[matchIndex].options[matchIndex].option = subChild3
                  parentArr[matchIndex].questions[matchIndex].options[matchIndex].correct = false
                  //break;
                }
                console.log('divOptNodeID', divOptNodeID);
                //divOptNodeID = ""
              }
              //mainQuestionId = ""

            }

          }
        //}
      }
      emptyQuestion()
      matchIndex = parentArr.length;
      matchQIndex = parentArr[matchIndex]?.questions?.length
    }
    emptyQuestion()
    matchIndex = parentArr.length;
    matchQIndex = parentArr[matchIndex]?.questions?.length

    console.log('matchIndex', matchIndex);
    console.log('matchQIndex', matchQIndex);
  }


}