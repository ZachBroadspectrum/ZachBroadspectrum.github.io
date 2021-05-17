
function handleFile(e) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        
        var first_sheet_name = workbook.SheetNames[0];

        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        var HTMLOUT = document.getElementById('htmlout')
        var OUT = document.getElementById('out')

        HTMLOUT.innerHTML = ""
        HTMLOUT.innerHTML = XLSX.utils.sheet_to_html(worksheet)
        console.log(XLSX.utils.sheet_to_html(worksheet));

        window.jsonTable = XLSX.utils.sheet_to_json(worksheet)
        console.log(jsonTable);
        OUT.innerText = JSON.stringify(jsonTable)
        createSchoolList()
        
    };
    reader.readAsArrayBuffer(f);
}

function loadExample(e) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        
        var first_sheet_name = workbook.SheetNames[0];

        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        var HTMLOUT = document.getElementById('htmlout')
        var OUT = document.getElementById('out')

        HTMLOUT.innerHTML = ""
        HTMLOUT.innerHTML = XLSX.utils.sheet_to_html(worksheet)
        console.log(XLSX.utils.sheet_to_html(worksheet));

        jsonTable = XLSX.utils.sheet_to_json(worksheet)
        console.log(jsonTable);
        OUT.innerText = JSON.stringify(jsonTable)
        createSchoolList()
        
    };
    reader.readAsArrayBuffer(f);
}

function createSchoolList() {
    let SCHOOLLIST = document.getElementById('schoolList')
    let ICONLIST = document.getElementById('iconList')
    let schoolKey = _.keys(_.countBy(jsonTable, function(jsonTable) { return jsonTable.test2; }))
    console.log(schoolKey);
    SCHOOLLIST.innerHTML = ""
    schoolKey.forEach(function(item){
        SCHOOLLIST.innerHTML += `<li><a href="index.html" class="button selector"><i class="fa fa-home fa-4x pull-left"></i> ${item}</a></li>`
        ICONLIST.innerHTML +=   `<span class="fa-layers fa-fw" style="background:DodgerBlue; padding: 5px 5px; margin: 5px 5px;" onclick="schoolLink('${item}')">
                                <i class="fas fa-school" style="color:Moccasin"></i>
                                <span class="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3" style="font-weight:900; color:black;">${item}</span>
                                </span>`
        return
    });

}
