import  { useEffect } from 'react';
import './styles/DragDropAdd.css';

const DragDropOperation = ({operator}) => {
  var symbols = ["apple", "banana", "orange", "grape", "pencil"];
  var targetFruit = "apple";
  var basketCounter = 0;
  var maxTargetCount = 0;
  var score = 0;
  var highScore = 0;
  var draggedSymbol = null;
  var currentSymbolIndex = 0;

  function shuffleSymbols() {
    symbols.sort(() => Math.random() - 0.5);
  }
  const containerStyle = {
    backgroundImage: 'url("https://webstockreview.net/images/morning-clipart-sunny-landscape-4.jpg")',
    /*
     * different background for subtraction page
     * backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/000/550/499/original/cartoon-forest-hill-landscape-vector-nature-background-illustration.jpg")',
     */
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Set the height as needed
    // Add other styles as needed
  };

  const operatorSymbolStyle = ()=>{
    switch(operator) {
        case "+" :
            return {   
                backgroundImage: 'url("https://i.pinimg.com/originals/7d/de/b5/7ddeb519a4500e81366982f14b5beee6.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        case "-" : 
            return {
                backgroundImage: 'url("https://icon-library.com/images/minus-icon-png/minus-icon-png-17.jpg")',
                backgroundSize: '120px',
                backgroundPosition: 'center',
            }

        default:
            console.log("Unknown Operator")
    }
  }

  function createSymbol(symbol, count, container, movable) {
    const symbolsPerRow = 4; // Number of symbols per row
    const symbolSize = 50;
    const padding = 30; // Increased padding for more space between symbols
  
    for (let i = 0; i < count; i++) {
      const symbolElement = document.createElement("img");
      symbolElement.className = "symbol";
      symbolElement.src = `/images/${symbol}.png`; // Assuming all symbols are in the public directory
      symbolElement.draggable = movable;
      
      symbolElement.addEventListener("dragstart", createDragStartHandler(symbolElement));
  
      const row = Math.floor(i / symbolsPerRow);
      const col = i % symbolsPerRow;
  
      const posX = col * (symbolSize + padding);
      const posY = row * (symbolSize + padding);
  
      symbolElement.style.top = posY + "px";
      symbolElement.style.left = posX + "px";
       symbolElement.style.marginLeft=70+"px"
      //  symbolElement.style.marginRight=70+"px"
      container.appendChild(symbolElement);
    }
  }
  

  function createDragStartHandler(element) {
    return function (event) {
      draggedSymbol = element;
      event.dataTransfer.setDragImage(element, 0, 0);
      draggedSymbol.style.transition = "none";
    };
  }

  function drag(event) {
    if (draggedSymbol) {
      draggedSymbol.style.left = event.clientX - draggedSymbol.width / 2 + "px";
      draggedSymbol.style.top = event.clientY - draggedSymbol.height / 2 + "px";
    }
  }

  function drop(event) {
    event.preventDefault();
    if (draggedSymbol && isApple(draggedSymbol)) {
      symbols.splice(symbols.indexOf(targetFruit), 1);
      basketCounter++;
      document.getElementById("basket").textContent = "Basket: " + basketCounter;

      draggedSymbol.style.transition = "transform 0.2s ease-in-out";
      draggedSymbol.style.left = "0px";
      draggedSymbol.style.top = "0px";
      draggedSymbol.style.display = "none";

      document.getElementById("basket-container").appendChild(draggedSymbol);
      draggedSymbol = null;
    }
  }

  function displayTemporaryMessage(message) {
    var messageElement = document.createElement("div");
    messageElement.className = "temporary-message";
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

    setTimeout(function () {
      document.body.removeChild(messageElement);
    }, 2000);
  }

  function isApple(element) {
    var symbol = element.src.split("/").pop().split(".")[0];
    return symbol === targetFruit;
  }

  const resetGame = ()=>{
    basketCounter = 0;
    document.getElementById("basket").textContent = "Basket: 0";

    shuffleSymbols();

    var targetCount1,targetCount2,box1,box2,box3;

    switch(operator) {
        case "+" :

            maxTargetCount = Math.floor(Math.random() * 14) + 2;
            // document.getElementById("maxTarget").textContent = "Max Target: " + maxTargetCount;

            targetCount1 = Math.floor(Math.random() * (maxTargetCount - 1)) + 1;
            targetCount2 = maxTargetCount - targetCount1;

            box3 = document.getElementById("box3");
            box3.innerHTML = "";
            box2 = document.getElementById("box2");
            box2.innerHTML = "";
            box1 = document.getElementById("box1");
            box1.innerHTML = "";

            createSymbol(targetFruit, targetCount1, document.getElementById("box1"), false);
            createSymbol(targetFruit, targetCount2, document.getElementById("box2"), false);
            createSymbol(targetFruit, 16, document.getElementById("box3"), true);
        
            break;
        case "-" :
                targetCount2 = Math.floor(Math.random() * 14) + 2;
    

                targetCount1 = Math.floor(Math.random() * (targetCount2 - 1)) + 1;
                maxTargetCount = targetCount2 - targetCount1;
                // document.getElementById("maxTarget").textContent = "Max Target: " + maxTargetCount;

                box3 = document.getElementById("box3");
                box3.innerHTML = "";
                box2 = document.getElementById("box2");
                box2.innerHTML = "";
                box1 = document.getElementById("box1");
                box1.innerHTML = "";

                createSymbol(targetFruit, targetCount2, document.getElementById("box1"), false);
                createSymbol(targetFruit, targetCount1, document.getElementById("box2"), false);
                createSymbol(targetFruit, 16, document.getElementById("box3"), true);

            break;
        default: 
            console.log("Unknown Division Parameter")

    }

    if (currentSymbolIndex === symbols.length) {
      currentSymbolIndex = 0;
    }
  }

  function submitAnswer() {
    if (basketCounter === maxTargetCount) {
      currentSymbolIndex = (currentSymbolIndex + 1) % 5;
      // document.getElementById("symbol").textContent = "index: " + currentSymbolIndex;

      switch (currentSymbolIndex) {
        case 0:
          targetFruit = "apple";
          break;
        case 1:
          targetFruit = "banana";
          break;
        case 2:
          targetFruit = "grape";
          break;
        case 3:
          targetFruit = "orange";
          break;
        case 4:
          targetFruit = "pencil";
          break;
        default:
          targetFruit = "apple";
      }

      // document.getElementById("fruit").textContent = "fruit: " + targetFruit;

      score = score + 10;
      if (score >= highScore) {
        highScore = score;
        document.getElementById("highScore").textContent = "highScore: " + highScore;
      }
      document.getElementById("score").textContent = "Score: " + score;
      displayTemporaryMessage("Correct Answer");
      resetGame();
    } else {
      currentSymbolIndex = 0;
      targetFruit = "apple";
      // document.getElementById("symbol").textContent = "index: " + currentSymbolIndex;
      score = 0;
      document.getElementById("score").textContent = "Score: 0";
      alert("Basket count is incorrect. Try again!");
      resetGame();
    }
  }

  useEffect(() => {
    shuffleSymbols();
    resetGame();

    var basketContainer = document.createElement("div");
    basketContainer.id = "basket-container";
    document.body.appendChild(basketContainer);

    document.body.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    document.body.addEventListener("drop", drop);
    document.body.addEventListener("drag", drag);

    return () => {
      // Cleanup event listeners or other resources on unmount if necessary
      document.body.removeEventListener("dragover", function (event) {
        event.preventDefault();
      });

      document.body.removeEventListener("drop", drop);
      document.body.removeEventListener("drag", drag);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container" id="basket">
      
        Basket: 0
      </div>
      <img src="https://clipart-library.com/img/1078553.png" alt="Basket" className="basket-image" />
      <img src="https://i.pinimg.com/originals/a8/fc/be/a8fcbef17839235c1f092466fdbb361a.png" alt="frame" className="frame"/>
      {/* <img src="https://www.onlygfx.com/wp-content/uploads/2018/01/rectangle-flower-frame-vector-2-7.png" alt="frame2" className="frame2" /> */}
      {/* <div className="container" id="maxTarget">
        Max Target: 0
      </div> */}
      <div className="container" id="score">
        Score: 0
      </div>
      <div className="container" id="highScore">
        High Score: 0
      </div>
      <div className="container" id="box1"></div>
      <div className="container" id="plus" style={operatorSymbolStyle()}>
        
      </div>
      <div className="container" id="box2"></div>
      <div className="container" id="box3" ></div>
      <div className="container" id="symbol">
        {/* index: 0 */}
      </div>
      <div className="container" id="fruit">
        {/* fruit: apple */}
      </div>
      <button onClick={submitAnswer} className='submit-button'>Submit</button>
    </div>
  );
};

export default DragDropOperation;
