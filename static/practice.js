$(document).ready(function() {
    $('.input-group').each(function() {
        const $group = $(this);
        const letter = $group.data('letter');
        console.log(letter);
        const $inputField = $group.find('.inputField');
        const $feedback = $group.find('.feedback');

        $group.find('.dot').click(function() {
            $inputField.val($inputField.val() + ".");
        });

        $group.find('.dash').click(function() {
            $inputField.val($inputField.val() + "-");
        });

        $group.find('.delete').click(function() {
            $inputField.val('');
            $feedback.text('✔ / ❌');
        });

        $group.find('.submit').click(function() {
            let userInput = $inputField.val();
            console.log(userInput);
            console.log(morse_code_dict[letter]);
            if (userInput === morse_code_dict[letter]) {
                $feedback.text('✔').removeClass('incorrect').addClass('correct');
            } else {
                $feedback.text('❌').removeClass('correct').addClass('incorrect');
            }
        });
    });
});
