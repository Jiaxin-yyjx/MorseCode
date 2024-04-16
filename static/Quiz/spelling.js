$(document).ready(function () {
	let mode = quiz_question['mode']
	let question_index = quiz_question['question_index']
	
	const clearBtn = document.getElementById('clearBtn');
	const ansInput = document.getElementById('ansInput');
	const previous_button_div = document.getElementById('previous_button');
	const next_button_div = document.getElementById('next_button');
	if (mode=="QUIZ"){
		constructure_previous_next_buttons(question_index, previous_button_div, next_button_div);
		document.getElementById('dotButton').addEventListener('click', function() {
			document.getElementById('ansInput').value += '.';
			updateClearButtonVisibility() 
		});
		document.getElementById('dashButton').addEventListener('click', function() {
			document.getElementById('ansInput').value += '-';
			updateClearButtonVisibility() 
		});
		clearBtn.addEventListener('click', function() {
			ansInput.value = '';
			updateClearButtonVisibility() 
		});
		function updateClearButtonVisibility() {
			clearBtn.style.display = ansInput.value ? 'block' : 'none';
		}
	}
	if (mode == "REVIEW"){
		$('#dotButton').prop('disabled', true);
		$('#dashButton').prop('disabled', true);
		// Adding correct answer here
		document.getElementById('ansInput').value = quiz_question['user_answer']
		constructure_back_to_results_buttons(next_button_div)
	}
	
});

function constructure_back_to_results_buttons(next_button_div){
	let back_to_results = document.createElement('button');
	back_to_results.textContent = "Results";
	next_button_div.appendChild(back_to_results);
	next_button_div.addEventListener('click',function(event){
		window.location.href = "/quiz_result";
	})
}

function constructure_previous_next_buttons(question_index, previous_button_div, next_button_div){
	let next_button = document.createElement('button');
	next_button.textContent = "Next";
	next_button.className = 'btn btn-primary';
	next_button_div.appendChild(next_button);
	next_button_div.addEventListener('click',function(event){
		if (event.target.tagName === 'BUTTON') {
			let data = {}
			data['question_index'] = question_index;
			data['answer_content'] = document.getElementById('ansInput').value;
			console.log(data);
			$.ajax({
				type: "POST",
				url: "submit_spelling_answer",                
				dataType : "json",
				contentType: "application/json; charset=utf-8",
				data : JSON.stringify(data),
				success: function(result){
					if (result['number_of_question'] == 10){
						window.location.href = "/quiz_result";
					}else{
						window.location.href = "/get_a_new_question";
					}
					console.log("success");
				},
				error: function(result){
					console.log("error", result);
				}
			})
		}
	})
}