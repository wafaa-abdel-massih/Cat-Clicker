// model (object contain of all the data of cats and admin state)
var catModel = {
  adminState : false,
  current: null,
  catsList: [
    {
      name: "Fluffy",
      http: "img/fluffy.jpg",
      clicks: 0
    },
    {
      name: "Bannister",
      http: "img/bannnister.jpg",
      clicks: 0
    },
    {
      name: "Nathan",
      http: "img/nathan.jpg",
      clicks: 0
    },
    { name: "Fatty",
      http:"img/fatty.jpg",
      clicks: 0
    },
    { name: "Biggie",
      http: "img/biggi.jpg",
      clicks: 0
    }
  ]
};

// cat display area's view
var catView = {

  init: function(){
    // store pointers to our DOM elements for easy access later
    this.catContainer = document.getElementById('cat-info-display');
    this.catName = document.getElementById('cat-name');
    this.catImage = document.getElementById('cat-img');
    this.counter = document.getElementById('cat-count');

    // on click, increment the current cat's counter
    this.catImage.addEventListener('click', function(){
        octopus.incrementCounter();
    });

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cat
    var currentCat = octopus.getCurrentCat();
    this.counter.textContent = currentCat.clicks;
    this.catName.textContent = currentCat.name;
    this.catImage.src = currentCat.http;
  }
};

// cat list view
var catListView = {

  init: function() {
    // store the DOM element for easy access later
    this.catListContainer = document.getElementById('sidebar');

    // render this view (update the DOM elements with the right values)
    this.render();
  },

  render: function() {
    var cat, elem;
    // get the cats we'll be rendering from the octopus
    var cats = octopus.getCatsList();

    // empty the cat list
    this.catListContainer.innerHTML = '';

    // loop over the cats
    for (let i = 0; i < cats.length; i++) {
      // this is the cat we're currently looping over
      cat = cats[i];

      // make a new cat list item and set its text
      elem = document.createElement('div');
      elem.classList.add('cat-link');
      elem.textContent = cat.name;
      // on click, setCurrentCat and render the catView
      // (this uses our closure-in-a-loop trick to connect the value
      //  of the cat variable to the click event function)
      // and check if admin button is clicked then update inputs element's values
      elem.addEventListener('click', (function(catCopy) {
          return function() {
              octopus.setCurrentCat(catCopy);
              catView.render();
              if(octopus.checkAdminState()){
                octopus.fillInputs();
              }
          };
      })(cat));
      
      // finally, add the element to the list
      this.catListContainer.appendChild(elem);
    }
  }
};

// admin view
var adminView= {
  
  init: function(){
    // store pointers to our DOM elements for easy access later
    this.adminElem = document.getElementById("admin");
    this.url = document.getElementById("url");
    this.name = document.getElementById("name"); 
    this.click = document.getElementById("click"); 
    this.render();
  },

  render: function(){
    // on click admin button change admin state to true
    // and display info about current cat
    if(!octopus.checkAdminState()){
      this.adminElem.addEventListener('click', function(){
        octopus.fillInputs();
        document.getElementById("info").setAttribute("style","display: flex;");
        octopus.changeAdminState();
      })
    }
    this.saveChanges();
    this.cancelChanges(); 
  },
  // on click save button save new data from the octopus
  saveChanges: function(){
      document.getElementById("save").addEventListener("click", function(){
        octopus.saveDate();
    })
  },
  // on click cancle button 
  // set admin state to false and hidden info area 
  cancelChanges: function(){
      document.getElementById("cancle").addEventListener("click", function(){
        document.getElementById("info").setAttribute("style","display: none;");
        octopus.changeAdminState();
        
    })
  }
};

// octopus
var octopus = {

  init: function(){
    // set current cat to the first one in the model initially
    // call cat view, cat list view and admin view to initialize.
    catModel.current = catModel.catsList[0]; 
    catView.init();
    catListView.init();
    adminView.init();
  },
  getCatsList: function(){
    return catModel.catsList;
  },
  setCurrentCat: function(cat){
    catModel.current = cat;
  },
  // increment current cat's clicks
  incrementCounter: function(){
    catModel.current.clicks ++;
    catView.render();
  },
  // return current cat 
  getCurrentCat: function(){
    return catModel.current;
  },
  // show current cat's date in input elements
  fillInputs: function(){
    adminView.click.value = catModel.current.clicks;
    adminView.name.value = catModel.current.name;
    adminView.url.value = catModel.current.http;
  },
  // switch admin state
  changeAdminState: function(){
    if(catModel.adminState==true){
      catModel.adminState = false;
    }
    else {
      catModel.adminState = true;
    }
  },
  // check admin button if clicked
  checkAdminState: function(){
    return catModel.adminState;
  },
  // update cat model to the new ones,
  // rerender list view and cat display view by the new data
  saveDate: function(){
    catModel.current.name = adminView.name.value;
    catModel.current.http = adminView.url.value;
    catModel.current.clicks = adminView.click.value;
    catListView.render();
    catView.render();
  }
}

// start to loading the page 
octopus.init();