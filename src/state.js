


export var parentArr = []

// export var mainFormDivls = ""
// export var mainParentId = ""
// export var mainQuestionId = ""
// export var mainQuesOptionId = ""
// export var divOptNodeID = ""
export var my_ls_name = "allEntries"
export var my_mainCount = "mainCount"
export var my_secCount = "secCount"
export var my_quesCount = "quesCount"
export var my_optCount = "optCount"
export var matchIdxEntries = "matchIndex"
export var quescount = 1

export var existingEntries
existingEntries = JSON.parse(localStorage.getItem(my_ls_name));
var existEntries = JSON.parse(localStorage.getItem(my_ls_name));
if (existEntries === null) {
  localStorage.setItem(my_ls_name, JSON.stringify(parentArr));
  existingEntries = JSON.parse(localStorage.getItem(my_ls_name));
  console.log(`existingEntries`, existingEntries.length)
}
export function prentHavExistingArr() {
  if (parentArr.length == 0) {
    parentArr = existingEntries
  }
}

export function generateUUID() {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      var r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      var r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
};