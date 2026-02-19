function toggleMode(){
    document.body.classList.toggle("dark-mode");
}

function predict(){

    document.getElementById("loader").style.display="block";

    let name=document.getElementById("name").value;
    let cgpa=document.getElementById("cgpa").value;
    let skills=document.getElementById("skills").value;
    let aptitude=document.getElementById("aptitude").value;
    let comm=document.getElementById("comm").value;

   fetch("https://placement-backend-xxxx.onrender.com/predict"),{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name:name,
            cgpa:cgpa,
            skills:skills,
            aptitude:aptitude,
            comm:comm
        })
    })
    .then(res=>res.json())
    .then(data=>{

        document.getElementById("loader").style.display="none";

        document.getElementById("result").innerHTML=
        "Prediction: "+data.prediction;

        let table=document.getElementById("studentTable");
        let row=table.insertRow(-1);
        row.insertCell(0).innerHTML=name;
        row.insertCell(1).innerHTML=data.prediction;

        drawChart(cgpa,skills,aptitude,comm);
    })
}

function drawChart(cgpa,skills,aptitude,comm){

    let ctx=document.getElementById('myChart').getContext('2d');

    new Chart(ctx,{
        type:'bar',
        data:{
            labels:["CGPA","Skills","Aptitude","Communication"],
            datasets:[{
                label:'Performance',
                data:[cgpa,skills,aptitude,comm]
            }]
        }
    });
}