
const httpOptions = {
  headers: { 'X-Mashape-Key': 'ajp0wkSehryzWQo24JvhNAuCF6RX2wyN'}
};

const EventModel = function () {
  let numberOfGuests = 4;
  let observers = [];
  let selectedId = localStorage.getItem("ID");
  //let menuArray = JSON.parse(localStorage.getItem("MA"));
  let menuArray = new Array();
  let i;
  let dishType = "all";
  let dishFilter = '';
  let code = 'SE';
  let countryCode = '';
  let date;


  this.setNumberOfGuests = function (num) {
    if (num <= 0) {
      numberOfGuests = 0;
    }
    numberOfGuests = num;
    localStorage.setItem("NOG", num)
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    if (JSON.parse(localStorage.getItem("NOG"))) {
        return JSON.parse(localStorage.getItem("NOG"));
      } else {
          return numberOfGuests;
        }
  };

  this.setId = function(id) {
    localStorage.setItem("ID", id);
    notifyObservers();
  };

  this.getId = function() {
    if (localStorage.getItem("ID")){
    return localStorage.getItem("ID");
    }
  };

  this.addEvent = function(dishSelected) {
    menuArray.push(dishSelected);
    notifyObservers();
    /*
    if (JSON.parse(localStorage.getItem("MA"))) {
      //console.log(JSON.parse(localStorage.getItem("MA")).length);
        for (i = 0; i <= menuArray.length - 1; i++) {
            if (dishSelected.dishDeet.id === menuArray[i].dishDeet.id) {
                menuArray.splice(i, 1);
            }
        }
        menuArray.push(dishSelected);
        notifyObservers();
        localStorage.setItem("MA", JSON.stringify(menuArray));
      }
    else {
      let menuArray = [];
      menuArray.push(dishSelected);
      notifyObservers();
      localStorage.setItem("MA", JSON.stringify(menuArray));
      }
      */


    }

  this.getFullMenu = function() {
        var fullMenu = [];
        for (i in menuArray) {
          fullMenu.push(menuArray[i])
        }
        return fullMenu;

      /*
            var fullMenu = [];
      if (JSON.parse(localStorage.getItem("MA"))){
      for (i = 0; i <= JSON.parse(localStorage.getItem("MA")).length - 1; i++) {
          fullMenu.push(JSON.parse(localStorage.getItem("MA"))[i])
      }
    }*/

  }

  this.getFullPrice = function() {
      let totalPrice = 0;
      if (JSON.parse(localStorage.getItem("MA"))){
          //for (i in menuArray) {
          menuArray = JSON.parse(localStorage.getItem("MA"))
          for (i = 0; i <= menuArray.length - 1; i++) {

            totalPrice += menuArray[i].dishDeet.pricePerServing * this.getNumberOfGuests();
          }
          return totalPrice;

      }
      return Math.floor(totalPrice);
  }

  //Removes dish from menu
  /*
  this.removeDishFromMenu = function(id) {
      for (i in menuArray) {
          if (id == menuArray[i].dishDeet.id) {
              menuArray.splice(i, 1);
              localStorage.setItem("MA", JSON.stringify(menuArray))
          }
          notifyObservers();
      }
      return menuArray;
  }
  */

  //test-Remove
  this.removeDishFromMenu = function(id){
    for (i in menuArray) {
      if (id == menuArray[i]) {
        menuArray.splice(i, 1)
      }
      notifyObservers();
    }
    return menuArray;
}

/*
  this.setDishType = function(type) {
    dishType = type;
    notifyObservers();

    return dishType;
  }

  this.getDishType = function() {
    return dishType;
  }

  this.setDishFilter = function(filter) {
    dishFilter = filter;
    notifyObservers();

    return dishFilter;
  }

  this.getDishFilter = function() {
    return dishFilter;
  }*/

  this.setDate = function(setDate){
    date = setDate;
    console.log(date);
    notifyObservers();
    return date;
  }

  this.getDate = function(){
    return date;
  }

  // API Calls

  this.getEventsPerCity = function (countryCode) {
    let url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ajp0wkSehryzWQo24JvhNAuCF6RX2wyN&countryCode=' +  countryCode + '&size=50' ;
    return fetch(url)
      .then(processResponse)
      .catch(handleError)
  }

  /*
  this.getAllDishes = function (dishType, dishFilter) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type='+dishType+'&query='+dishFilter
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)

  }
*/
  this.getDish = function (id) {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information'
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)

  }
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
    console.log(observers);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());

  };
};

export const modelInstance = new EventModel();
