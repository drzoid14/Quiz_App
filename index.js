let number = 0;
let score = 0;

//Buttons change screens, hiding the intro, revealing the question,
//changing to the feedback screen, and restarting the quiz at the 
//end
$(function(){
	$(`.begin`).on('click',(function(event){
		console.log('hi');
		$(`.stats`).css('display','flex');
		$(`.startScreen`).hide();
		$('body').css('background-image','url(https://static.comicvine.com/uploads/scale_super/13/138994/4129237-marvel_vs_dc_657.jpg');
		$('body').css('background-color','lightgray');
		$(`#questionScreen`).html(generateQuestion());
	}
	));
	
});	
	
	//Generate questions in the div
	function generateQuestion() {
		if (number < STORE.length) {
		  $(`#questionScreen`).show();
		  console.log(`${STORE[number].quest}`);
			return `<div class = "question"> 
					<h1>Question</h1>
					<h3 role="Document">${STORE[number].quest}</h3>
					  <div class = "answers">
						  <form role = "Answer Options" onsubmit="getFeedback()">
						    <fieldset>
						      <legend>Answers</legend>
				  		  	<label class="option">
					  		  	<input type="radio" id='a' value="${STORE[number].ans[0]}" name="ans" required><span class='button'>${STORE[number].ans[0]}</span>
				  			  </label></br>
				  			  <label class="option">
					  			  <input type="radio" id='b' value="${STORE[number].ans[1]}" name="ans" required><span class='button'>${STORE[number].ans[1]}</span>
			  				  </label></br>
				  			  <label class ="option">
					  			  <input type="radio" id='c' value="${STORE[number].ans[2]}" name="ans" required><span class='button'>${STORE[number].ans[2]}</span>
				  			  </label></br>
				  			  <label class = "option">
		  						  <input type="radio" id='d' value="${STORE[number].ans[3]}" name="ans" required><span class='button'>${STORE[number].ans[3]}</span>
			  				  </label></br>
				  				  <button type="submit" class = "submit" >Submit</button>
				  			</fieldset>  
			  			</form>
			  		</div>`	;

		} else {
		        showFinal();
		}
	}
	
		
//Checks users submitted value against the bank of correct Answer		
function checkAnswer() {
      let selected = $('input[name=ans]:checked').val();
      let correct = STORE[number].correct;
      
 //checks value of A: B: C: or D: 
     if(selected.startsWith(correct)===true) {
    console.log('success');
    correctAnswer();
    console.log(score);
    return `<div class = "right">
	      		<p>Correct! <span>${STORE[number].feed} </span> Great job!</p>
	    	</div>
	    	<div><button type="submit" onclick="nextQuestion()">Next Question</button>`;
  } else {
          
          return `<div class = 'wrong'>
	     		<p>Sorry! <span>${STORE[number].feed} </span></p>
	      	</div>
	      	<div><button type="submit" onclick="nextQuestion()">Next Question</button>`;	
  }
  
  
}		
//On submitting answer, changes screens and gives feedback	
function getFeedback(){
  event.preventDefault();
  $('#questionScreen').hide();
  $(`#feedbackScreen`).css(`display`,`block`);
   $(`#feedbackScreen`).html(checkAnswer());
}

//If an answer is correct, increases score and updates header 
function correctAnswer() {
      score+=1;
    $(`#correct`).text(score);
}

//moves to next question, hides feedback, updates header
function nextQuestion() {
  number+=1;
  $(`#number`).text(number+1);
	$(`#questionScreen`).html(generateQuestion());
  $(`#feedbackScreen`).hide();
}		

//Gives final feedback
function showFinal() {
  console.log('finalScreen ran');
  $(`.finalScreen`).css(`display`,`block`);
  $(`.finalScreen`).html(showResults());
}	


//Gives the final score on final screen
function showResults() {
  $(`.stats`).hide();
  $(`#feedbackScreen`).hide();
  $(`#finalScore`).text(score);
  $(`.results`).css('display','block');
  if(score>7) {
    return `<div class = 'great'> <h3>Great Job! Seeing as you know your random comic book knowledge, I hope you enjoyed the quiz!</h3></div>
    <div class = 'button'><button type = "submit" onclick="restartQuiz()">Try Again</button></div>
    `;
  } else if(score>5) {
    return `<div class = 'fair'> <h3>Not Bad! You probable have some knowledge, at least enough to get more than half right. I hope you learned something new and interesting today!</h3></div>
        <div class = 'button'><button type = "submit" onclick="restartQuiz()">Try Again</button></div>
    `;
  } else {
    return `<div class = 'poor'> <h3>Good Try! Not everyone is a nerd, and that's OK.  I hope you had fun and learned something new today!</h3></div>
        <div class = 'button'><button type = "submit" onclick="restartQuiz()">Try Again</button></div>
    `;
  }
}

//Resets score to 0, updates header
function resetScore(){
  score=0;
  $(`#correct`).text(score);
}


//restarts questions, updeates header
function resetNumber(){
  number=0;
  $(`#number`).text(number+1);
}

//Restarts the quiz, returns to start page
function restartQuiz() {
  resetNumber();
  resetScore();
	$(`.startScreen`).show();
	$('body').css('background-image','url(https://i.pinimg.com/originals/0d/7d/ea/0d7dea8e2f40c7abe12295a63b31c1d3.jpg');
	$('.finalScreen').hide();
	$('.results').hide();
  $(`.stats`).hide();
}

