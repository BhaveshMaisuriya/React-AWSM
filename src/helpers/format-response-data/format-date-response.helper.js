import moment from "moment"

function isDate(string,originalFormat = "YYYY-MM-DD"){
  return moment(string, originalFormat, true).isValid()
}

function formatDate(stringDate, originalFormat = "YYYY-MM-DD", targetFormat = "DD-MM-YYYY") {
  return moment(stringDate, originalFormat).format(targetFormat)
}

export default function formatDateResponseList(list){
    if(!list){
    return null;
  }
  if(list.length === 0 ){
    return list;
  }

  return list.reduce((initArray,item)=>{
    for(const key in item){
      if(typeof item[key] !== "string" || !item[key]){
        continue;
      }
      const splitValue = item[key].split(" ");
      splitValue.forEach((item,index)=> {
        if(isDate(item)){
          splitValue[index] = formatDate(item);
        }
      });
      item[key] = splitValue.join(" ");
    }
    initArray.push(item);
    return initArray;
  },[])
}

/*
format following date format:
1. "YYYY-MM-DD" --> "DD-MM-YYYY"
2. "single YYYY-MM-DD" --> "single DD-MM-YYYY"
3. "from YYYY-MM-DD to YYYY-MM-DD" --> "from DD-MM-YYYY to DD-MM-YYYY"
4. All cases that date and string together include will keep the position of string and date but
 date will be formatted
* */