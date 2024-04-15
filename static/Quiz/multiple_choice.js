$(document).ready(function () {
	const answers_container = document.getElementById('multiple_choice_answers');
	constructure_multiple_choice_answers(question_index,answers_container, choices);
	
	const previous_button_div = document.getElementById('previous_button');
	// const next_button_div = document.getElementById('next_button');
	// constructure_previous_next_buttons(previous_button_div, next_button_div);
});

// TODO: Choice now only support string, could further support video
function constructure_multiple_choice_answers(question_index, answers_container, choices){
	choices.forEach((choice, index)=>{
		let button = document.createElement('button');
		button.textContent = choice;
		button.className = 'btn btn-secondary';
		button.setAttribute('answer_id', index);  // Custom attribute to identify the button
		answers_container.appendChild(button);
	})

	answers_container.addEventListener('click', function(event) {
		if (event.target.tagName === 'BUTTON') {
				
				// console.log('Button clicked:', event.target.textContent);
				// console.log('Button index:', event.target.getAttribute('answer_id'));
				let data = {}
				data['question_index'] = question_index;
				data['answer_id'] = event.target.getAttribute('answer_id');
				data['answer_content'] = event.target.textContent;
				console.log(data);
				$.ajax({
					type: "POST",
					url: "submit_multiple_choice_answer",                
					dataType : "json",
					contentType: "application/json; charset=utf-8",
					data : JSON.stringify(data),
					success: function(result){
						if (result['number_of_question'] == 10){
							window.location.href = "/quiz_result";
						}else{
							window.location.href = "/get_a_new_question";
						}
					},
					error: function(result){
						console.log("error", result);
					}
				})
		}
	});
}

function constructure_previous_next_buttons(previous_button_div, next_button_div){
	let next_button = document.createElement('button');
	next_button.textContent = "Next";
	next_button.className = 'btn btn-primary';
	next_button_div.appendChild(next_button);
	next_button_div.addEventListener('click',function(event){
		if (event.target.tagName === 'BUTTON') {
			window.location.href = "/get_a_new_question";
		}
	})
}
