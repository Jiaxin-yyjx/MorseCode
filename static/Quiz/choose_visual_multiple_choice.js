$(document).ready(function () {
	let question_index = quiz_question['question_index']
	let question = quiz_question['question']
	let choices = quiz_question['choices']
	let mode = quiz_question['mode']
	// const visual_image = document.getElementById('visual_image')
	// visual_image.setAttribute('src', '/static/visuals/Morse-'+question+'.png');

	const question_image = document.getElementById('question_image');
	Array.from(question).forEach(function (letter){
		// let visual_image = document.createElement('img')
		// visual_image.setAttribute('src', '/static/visuals/Morse-'+letter+'.png');
		// question_image.appendChild(visual_image);
		$('#question_image').append(
			$('<img>', {
					src: '/static/visuals/Morse-' + letter + '.png',
					width: '40',
					height: '30'
			})
		);
	})

	const answers_container = document.getElementById('multiple_choice_answers');
	const previous_button_div = document.getElementById('previous_button');
	constructure_multiple_choice_answers(question_index, answers_container, choices, mode);
	if (mode == "REVIEW"){
		constructure_back_to_results_buttons(previous_button_div);
		show_choies_correct_answer(choices);
	}
});

// When in the review mode, we will git out each choice corresponding answer
function show_choies_correct_answer(choices){
	const choices_answer_container = document.getElementById('choices_answer_container');
	// Set the format first and let it show.
	choices_answer_container.setAttribute('class', 'col addoneline');

	// Show each choices their correct answer
	const choices_answer = document.createElement('div');
	choices_answer.setAttribute('id', "choices_answer");
	choices_answer.setAttribute('class', "row text-layout");
	
	// Similiar when creating the original choice but seperate for easy format purpose
	choices.forEach((question_answer_pair, index)=>{
		choice_letter = question_answer_pair[0];
		choice_morse_code = question_answer_pair[1];
		let button = document.createElement('button');
		button.className = 'btn btn-outline-secondary multiple-choice-button';
		if (quiz_question['user_answer'] == choice_letter){
			button.className = 'btn btn-outline-danger multiple-choice-button';
		}
		if (quiz_question['correct_answer'] == choice_letter){
			button.className = 'btn btn-outline-success multiple-choice-button';
		}
		button.textContent = choice_morse_code;
		button.setAttribute('choice_answer_id', index);  // Custom attribute to identify the button
		choices_answer.appendChild(button);
	});

	choices_answer_container.appendChild(choices_answer);
}


function constructure_back_to_results_buttons(next_button_div){
	let back_to_results = document.createElement('button');
	back_to_results.textContent = "Results";
	back_to_results.setAttribute('class', "btn btn-outline-info");
	next_button_div.appendChild(back_to_results);
	next_button_div.addEventListener('click',function(event){
		window.location.href = "/quiz_result";
	})
}

function constructure_multiple_choice_answers(question_index, answers_container, choices, mode){
	choices.forEach((question_answer_pair, index)=>{
		choice_letter = question_answer_pair[0];
		choice_morse_code = question_answer_pair[1];
		let button = document.createElement('button');
		if (mode =="QUIZ"){
			button.className = 'btn btn-outline-secondary multiple-choice-button';
		}else if (mode == "REVIEW"){
			button.className = 'btn btn-outline-secondary multiple-choice-button';

			if (quiz_question['user_answer'] == choice_letter){
				button.className = 'btn btn-outline-danger multiple-choice-button';
			}
			if (quiz_question['correct_answer'] == choice_letter){
				button.className = 'btn btn-outline-success multiple-choice-button';
			}
		}
		button.textContent = choice_letter;
		button.setAttribute('answer_id', index);  // Custom attribute to identify the button
		answers_container.appendChild(button);
	})
	if (mode == "QUIZ"){
		answers_container.addEventListener('click', function(event) {
			if (event.target.tagName === 'BUTTON') {
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
								// setTimeout(20)
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
