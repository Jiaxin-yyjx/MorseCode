$(document).ready(function () {
	quiz_dashboard.forEach((quiz_question, index)=>{
		let tr = document.createElement('tr');
		let th = document.createElement('th');
		let td = document.createElement('td');
		let a = document.createElement('a');
		a.setAttribute('href', '/review_question/'+index)
		a.innerHTML = index+1
		if (quiz_question['correct']){
			td.innerHTML = '&#10004\;';
		}else{
			tr.setAttribute('class','table-danger');
			td.innerHTML = '&#10006\;';
		}
		th.setAttribute('scope', 'row');
		th.appendChild(a);
		tr.appendChild(th);
		tr.appendChild(td);
		document.querySelector("tbody").appendChild(tr);
	})
	
});

