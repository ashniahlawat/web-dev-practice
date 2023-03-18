(function(global){

  var dc = {}

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var insertProperty = function (string, propName, propValue) {
    string = string.replace(new RegExp(propName, "g"), propValue);
    return string;
  };

  
  document.getElementById("main-content").innerHTML = '<input id="name" class="col-lg-2" type="text" placeholder="Enter your name"><button id="NextLT" class="col-lg-1">Next</button><div id="intro">Multiplication helper - Learn and test yourself</div>';
  
  dc.showNavButton = function(){
    learn = '<button onclick="#" class="col-lg-3" id="learn"><h4>Learn</h4></button>'
    SphinxHeading = '<div class="navbar-brand col-lg-3"><a href="index.html"><h1>Sphinx</h1></a></div>'
    test = '<button onclick="#" class="col-lg-3" id="test"><h4>Test</h4></button>'
    insertHtml(".navbar-header", learn+SphinxHeading+test)
    name = document.getElementById("name").value
    document.getElementById("main-content").innerHTML ='<div id="Greeting">Hi '+name +'!</div>'
    document.querySelector("#learn").addEventListener("click", dc.learn1)
    document.querySelector("#test").addEventListener("click", dc.TestButtons)
    } 

    document.querySelector("#NextLT").addEventListener("click", dc.showNavButton)

  dc.learn1 = function(){
    ichoice = '<input id="choice" type="text" placeholder="Choose from 2-12: ">'
    Go = '<button id="Go">NEXT</button>'
    document.getElementById("main-content").innerHTML = ichoice + Go;
     
    document.querySelector("#Go").addEventListener("click", function(){
      choice = document.getElementById("choice").value 
      multipliers = [];
      if(isNaN(choice)){
        alert("Please enter a valid number.");
      }
      else{
        document.getElementById("main-content").innerHTML = ""
        dc.startLearning(1, 1, Math.floor(Math.random() * 13)+2);
      }
  })

  }


  
  dc.startLearning = function(q, attempts, multiplier){
    
    if(attempts==4){
      multipliers.push(multiplier);
      q+=1
      attempts=1
      multiplier = Math.floor(Math.random() * 13)+2;
    }
    if(!(multipliers.includes(multiplier))){
            var qLabel = '<div id="qLabel">Question '+ q + ' Attempt ' + attempts +'</div>'
            var question = '<div id="question">' + choice  + ' x ' + multiplier +'</div>'
            document.getElementById("main-content").innerHTML += qLabel + question + '<input id="answer-input" class="col-lg-2" type="text" placeholder="Answer ...">' + '<button id="NextQ" class="col-lg-1">Next</button>';
            
  
            // answer=document.getElementById("answer-input").value
            // if(answer=multiplier*choice){
            //   document.getElementById("main-content").innerHTML = '<div id="correctAnswer">Correct!</div>'
            // }
            if(q<=5){
              document.querySelector("#NextQ").addEventListener("click", function(){
              answer=document.getElementById("answer-input").value
              document.getElementById("main-content").innerHTML = ""
              if(answer==(multiplier*choice)){
                document.getElementById("main-content").innerHTML += '<div class="result Correct">Correct!</div>'
                multipliers.push(multiplier);
                dc.startLearning(q+1, 1, Math.floor(Math.random() * 13)+2);
              }
              else if(answer>(multiplier*choice+3)){
                document.getElementById("main-content").innerHTML += '<div class="result Incorrect">Your answer is too large</div>'
                dc.startLearning(q, attempts+1, multiplier);
              }
              else if(answer<(multiplier*choice-3)){
                document.getElementById("main-content").innerHTML += '<div class="result Incorrect">Your answer is too small</div>'
                dc.startLearning(q, attempts+1, multiplier);
              }
              else{
                document.getElementById("main-content").innerHTML += '<div class="result WRONG">Incorrect</div>'
                dc.startLearning(q, attempts+1, multiplier);
              }
              
              
              })
            }
            else{
              document.getElementById("main-content").innerHTML = '<div class="result END">The End...</div>'
            }
            
          
    }
    else{
      newmultiplier = Math.floor(Math.random() * 13)+2;
      dc.startLearning(q, attempts, newmultiplier);
    }


  }

  dc.TestButtons = function(){
    MixedMultiTable = '<button class="TestButtons" id="MixedMultiTable">Questions from Mixed multiplication tables</button>'
    ChoiceMultiTable = '<button class="TestButtons" id="ChoiceMultiTable">Choose from tables 2-12</button>'
    document.getElementById("main-content").innerHTML = MixedMultiTable + ChoiceMultiTable

    


    document.querySelector("#ChoiceMultiTable").addEventListener("click", dc.Test1)
    document.querySelector("#MixedMultiTable").addEventListener("click", dc.Test2) 
  }

    dc.Test1 = function(){
    QuestionNumber = '<input id="QuestionNumber" type="text" placeholder="Number of Questions: ">'
    ichoice = '<input id="choice" style="opacity:1;" type="text" placeholder="Choose from 2-12: ">'
    Go = '<button id="Go">NEXT</button>'
    document.getElementById("main-content").innerHTML = QuestionNumber + ichoice + Go;
     
    document.querySelector("#Go").addEventListener("click", function(){
      choice = document.getElementById("choice").value 
      QuesNumber=document.getElementById("QuestionNumber").value  
      if(isNaN(choice) || isNaN(QuesNumber)){
        alert("Please enter a valid number.");
      }
      else{
        document.getElementById("main-content").innerHTML = ""
        score=0;
        multipliers=[];
        dc.startTest(1, Math.floor(Math.random() * 13)+2);
      }
  })

  }


  
  dc.startTest = function(q, multiplier){
    if(!(multipliers.includes(multiplier))){
      var qLabel = '<div id="testQ">Question '+ q+'</div>'
      var question = '<div id="question">' + choice  + ' x ' + multiplier +'</div>'
      document.getElementById("main-content").innerHTML += qLabel + question + '<input id="answer-input" class="col-lg-2" type="text" placeholder="Answer ...">' + '<button id="NextQ" class="col-lg-1">Next</button>';
          
      if(q<=QuesNumber){
        document.querySelector("#NextQ").addEventListener("click", function(){
          answer=document.getElementById("answer-input").value
          document.getElementById("main-content").innerHTML = ""
          if(answer==(multiplier*choice)){
            document.getElementById("main-content").innerHTML += '<div class="result Correct">Correct!</div>'
            multipliers.push(multiplier);
            score+=1
            dc.startTest(q+1, Math.floor(Math.random() * 13)+2);
            }
          else{
            document.getElementById("main-content").innerHTML += '<div class="result WRONG">Incorrect</div>'
            multipliers.push(multiplier);
            dc.startTest(q+1, Math.floor(Math.random() * 13)+2);
          }

        })
      }
      else{
        if(score==QuesNumber){
          document.getElementById("main-content").innerHTML = name + '<div class="result testresult">Your score is '+score+'/'+ QuesNumber+'. Well done full marks</div>'
        }
        else{
          document.getElementById("main-content").innerHTML = name + '<div class="result testresult">Your score is '+score+'/'+ QuesNumber+'. Have another practice</div>'
        }
        
      }

    }
    else{
      newmultiplier = Math.floor(Math.random() * 13)+2
      dc.startTest(q, newmultiplier);
    }
  }


  dc.Test2 = function(){
    QuestionNumber = '<input id="QuestionNumber" type="text" placeholder="Number of Questions: ">'
    Go = '<button id="Go">NEXT</button>'
    document.getElementById("main-content").innerHTML = QuestionNumber + Go;
    document.querySelector("#Go").addEventListener("click", function(){
      QuesNumber=document.getElementById("QuestionNumber").value 
      if(isNaN(QuesNumber)){
        alert("Please enter a valid number.");
      }
      else{
        document.getElementById("main-content").innerHTML = ""
        score=0;
        choices = [];
        multipliers=[];
        dc.startTest2(1, Math.floor(Math.random() * 13)+2, Math.floor(Math.random() * 13)+2);
      }
    })
  }

  dc.startTest2 = function(q, choice, multiplier){
    if(!(multipliers.includes(multiplier))&& !(choices.includes(choice))){
      var qLabel = '<div id="testQ">Question '+ q+'</div>'
      var question = '<div id="question">' + choice  + ' x ' + multiplier +'</div>'
      document.getElementById("main-content").innerHTML += qLabel + question + '<input id="answer-input" class="col-lg-2" type="text" placeholder="Answer ...">' + '<button id="NextQ" class="col-lg-1">Next</button>';
          
      if(q<=QuesNumber){
        document.querySelector("#NextQ").addEventListener("click", function(){
          answer=document.getElementById("answer-input").value
          document.getElementById("main-content").innerHTML = ""
          if(answer==(multiplier*choice)){
            document.getElementById("main-content").innerHTML += '<div class="result Correct">Correct!</div>'
            multipliers.push(multiplier);
            choices.push(choice);
            score+=1
            dc.startTest2(q+1, Math.floor(Math.random() * 13)+2, Math.floor(Math.random() * 13)+2);
            }
          else{
            document.getElementById("main-content").innerHTML += '<div class="result WRONG">Incorrect</div>'
            multipliers.push(multiplier);
            choices.push(choice);
            dc.startTest2(q+1, Math.floor(Math.random() * 13)+2, Math.floor(Math.random() * 13)+2);
          }

        })
      }
      else{
        if(score==QuesNumber){
          document.getElementById("main-content").innerHTML = name + '<div class="result testresult">Your score is '+score+'/'+ QuesNumber+'. Well done full marks</div>'
        }
        else{
          document.getElementById("main-content").innerHTML = name + '<div class="result testresult">Your score is '+score+'/'+ QuesNumber+'. Have another practice</div>'
        }
        
      }

    }
    else{
      newmultiplier = Math.floor(Math.random() * 13)+2
      newchoice = Math.floor(Math.random() * 13)+2
      dc.startTest2(q, newchoice, newmultiplier);
    }
  }


    
  
  global.$dc = dc;

  })(window);
// <input id="choice" type="text" placeholder="Choose from 2-12: " class="col-lg-3" style="margin-left:36%;clear:left;margin-bottom:10px;font-size:1.5em;"><button id="Nextbutton" class="col-lg-2" style="margin-left:36%;clear:left;margin-bottom:10px;font-size:1.5em;">NEXT</button>';