$(document).ready(function () {
	let question_index = quiz_question['question_index']
	let choices = quiz_question['choices']
	let mode = quiz_question['mode']
	
	const answers_container = document.getElementById('multiple_choice_answers');
	const previous_button_div = document.getElementById('previous_button');
	constructure_multiple_choice_answers(question_index, answers_container, choices, mode);
	if (mode == "REVIEW"){
		constructure_back_to_results_buttons(previous_button_div);
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

// TODO: Choice now only support string, could further support video
function constructure_multiple_choice_answers(question_index, answers_container, choices, mode){
	choices.forEach((choice, index)=>{
		let button = document.createElement('button');
		if (mode =="QUIZ"){
			button.className = 'btn btn-secondary';
		}else if (mode == "REVIEW"){
			button.className = 'btn btn-secondary';
			if (quiz_question['user_answer'] == choice){
				button.className = 'btn btn-danger';
			} 
			if (quiz_question['correct_answer'] == choice){
				button.className = 'btn btn-success';
			}
		}
		button.textContent = index;
		button.setAttribute('answer_id', choice);  // Custom attribute to identify the button
		answers_container.appendChild(button);
		
		let sound = document.createElement('div');
		sound.setAttribute('data-audio-url', '/static/audios/Morse-'+choice+'.mp3');
		sound.setAttribute('sound_letter', choice);
		// let icon = $('<ion-icon name="logo-google-playstore"></ion-icon>');
		// $(sound).append(icon);
		let p = $('<p>sound</p>');
		$(sound).append(p);
		const audioUrl = sound.getAttribute('data-audio-url');
		const audio = new Audio(audioUrl);
		sound.addEventListener('click',function(){
			console.log(123)
			audio.play().catch(e => console.error('Error playing audio:', e));
		})
		answers_container.append(sound);
	})
	if (mode == "QUIZ"){
		answers_container.addEventListener('click', function(event) {
			if (event.target.tagName === 'BUTTON') {
					let data = {}
					data['question_index'] = question_index;
					data['answer_content'] = event.target.getAttribute('answer_id');
					console.log(data);
					$.ajax({
						type: "POST",
						url: "submit_sound_multiple_choice_answer",                
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


document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.morse-code-card, .morsemenu-char-card, .playcharsound').forEach(function(card) {
			const audioUrl = card.getAttribute('data-audio-url');
			const audio = new Audio(audioUrl);

			card.addEventListener('click', function() {
					audio.play().catch(e => console.error('Error playing audio:', e));
			});
	});
});
