function handleFile(e) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        
        var first_sheet_name = workbook.SheetNames[0];

        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        window.jsonTable = XLSX.utils.sheet_to_json(worksheet)
        createSchoolListEmployee()
    };
    reader.readAsArrayBuffer(f);
}


function pageLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('school');
    alert(myParam)
    window.selectedSchool = schoolName
    OUT.innerText = selectedSchool;
}

function schoolLink(schoolName) {
    let OUT = document.getElementById('out')
    let HTMLOUT = document.getElementById('htmlout')
    selectedSchool = schoolName;
    let filteredData = jsonTable.filter(function(row) {
        return row.test2 ==schoolName;
    });
    HTMLOUT.innerHTML = ""
    OUT.innerText = ""
    filteredData.forEach((row) => {
        OUT.innerText += `${row.test1},${row.test2} \n`;
    });
    

}

function createSchoolListEmployee() {
    let ICONLIST = document.getElementById('iconList')
    let schoolKey = _.keys(_.countBy(jsonTable, function(jsonTable) { return jsonTable.test2; }))
    console.log(schoolKey);
    ICONLIST.innerHTML = ""
    schoolKey.forEach(function(item){
        ICONLIST.innerHTML +=   `<span class="fa-layers fa-fw" style="background:DodgerBlue; padding: 5px 5px; margin: 5px 5px;" onclick="schoolLink('${item}')">
                                <i class="fas fa-school" style="color:Moccasin"></i>
                                <span class="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3" style="font-weight:900; color:black;">${item}</span>
                                </span>`
        return
    });

}