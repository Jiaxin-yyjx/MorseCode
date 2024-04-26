$(document).ready(function () {
	let question_index = quiz_question['question_index']
	let choices = quiz_question['choices']
	let mode = quiz_question['mode']
	
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
		choice_correct_answer = question_answer_pair[0];
		choice = question_answer_pair[1];
		let button = document.createElement('button');
		button.className = 'btn btn-outline-secondary multiple-choice-button';
		if (quiz_question['user_answer'] == choice){
			button.className = 'btn btn-outline-danger multiple-choice-button';
		}
		if (quiz_question['correct_answer'] == choice){
			button.className = 'btn btn-outline-success multiple-choice-button';
		}
		button.textContent = choice_correct_answer;
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

function constructure_sound_button(choice_letter, choice_morse_code, outer_div){
	let sound = document.createElement('div');
	sound.setAttribute("class", "col-md-auto multiple-choice-button-for-sound");
	sound.setAttribute('id', 'audioContainer' + choice_letter);
	Array.from(choice_letter).forEach((letter, index)=>{
		let audio = document.createElement('audio');
		audio.setAttribute('id', index);
		let source = document.createElement('source');
		source.setAttribute('src', '/static/audios/Morse-'+letter+'.mp3');
		audio.append(source);
		sound.append(audio);
	})
		
	// Add this text so that user could click on
	let play_sound_image_icon = $('<img src="/static/images/icon.png" width="25" height="25">');
	$(sound).append(play_sound_image_icon);

	sound.addEventListener('click',function(){
		// audio.play().catch(e => console.error('Error playing audio:', e));
		var audios = document.querySelectorAll('#audioContainer'+ choice_letter + ' audio');
		// let currentAudioIndex = 0;
		function playAudio(index) {
			if (index < audios.length) {
				audios[index].play();
				audios[index].addEventListener('ended', function() {
						playAudio(index + 1);  // Play the next audio when current ends
				});
			}
		}
		playAudio(0);
	})
	outer_div.append(sound);
}

function constructure_multiple_choice_answers(question_index, answers_container, choices, mode){
	

	choices.forEach((question_answer_pair, index)=>{
		let outer_div =  document.createElement('div');
		outer_div.setAttribute("class", "row justify-content-md-center");
		let button_div = document.createElement('div');
		button_div.setAttribute("class", "col-md-auto");
		// let audio_div = document.createElement('div');
		// audio_div.setAttribute("class", "col-md-auto");

		choice_letter = question_answer_pair[0];
		choice_morse_code = question_answer_pair[1];
		let button = document.createElement('button');
		if (mode =="QUIZ"){
			button.className = 'btn btn-outline-secondary multiple-choice-button-for-sound';
		}else if (mode == "REVIEW"){
			button.className = 'btn btn-outline-secondary multiple-choice-button-for-sound';
			if (quiz_question['user_answer'] == choice_morse_code){
				button.className = 'btn btn-outline-danger multiple-choice-button-for-sound';
			} 
			if (quiz_question['correct_answer'] == choice_morse_code){
				button.className = 'btn btn-outline-success multiple-choice-button-for-sound';
			}
		}
		button.textContent = String.fromCharCode(index + 97);
		button.setAttribute('answer_id', choice_morse_code);  // Custom attribute to identify the button
		button_div.appendChild(button);
		outer_div.appendChild(button_div);
		constructure_sound_button(choice_letter, choice_morse_code, outer_div);
		answers_container.appendChild(outer_div);
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
