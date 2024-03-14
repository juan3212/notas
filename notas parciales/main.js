// Add JS 
const url = new URLSearchParams(window.location.search);
const route = 'https://colegiobilinguecedam.com/notas/api/'
const studentId = url.get('studentId');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

fetch(`${route}notasParciales/${studentId}`)
.then(res => res.json())
.then(data => printData(data))
.catch(err => console.log(err))

function addRow (data){
    const tbody = document.getElementById('tableBody');
    const row = document.createElement('tr');
    const cellSubject = document.createElement('td');
    const cellGrade = document.createElement('td');
    const cellHI = document.createElement('td');
    const cellEvaluation = document.createElement('td');
    cellSubject.textContent = firstWord(data.subject);
    cellGrade.textContent = data.grade;
    cellHI.textContent = data.hi;
    cellEvaluation.textContent = evaluation(data.grade);
    row.appendChild(cellSubject);
    row.appendChild(cellGrade);
    row.appendChild(cellHI);
    row.appendChild(cellEvaluation);
    tbody.appendChild(row);
}

function firstWord(str){
    let a = str.split("")
    a.splice(a.indexOf(" "), a.length-1)
    
    return a.join("")
}

function evaluation(grade){
    switch (true){
        case grade <6:
            return "Low"
        case 6<=grade && grade<8:
            return "Basic"
        case 8<=grade && grade<9.3:
            return "High"
        case grade >=9.3:
            return "Superior" 
    }
}

function printData(data){
    const courseSpace = document.getElementById('course');
    const nameSpace = document.getElementById('studentName');
    const dateSpace = document.getElementById('date');
    const course  = firstWord(data[0].grado);
    const name = data[0].apellido + " " + data[0].nombre;
    courseSpace.textContent = course;
    nameSpace.textContent = name;
    dateSpace.textContent = `Fecha de emisión: ${day}/${month}/${year}`;

    data.forEach(element => {
        const subject= element.materia;
        const grade = element.promedio;
        const hi = element.ih;
        const rowData = {'subject': subject, 'grade': grade, 'hi': hi};
        //addRow(rowData);
    });
}
