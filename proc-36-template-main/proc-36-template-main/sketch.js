var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var feed, lastFed
var horario,aa


//create feed and lastFed variable here


function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('comida');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here
  feed = createButton("feed the dog")
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46, 139, 87);
  foodObj.display();
//console.log(hour())
  //write code to read fedtime value from the database 
    lastFed = database.ref('horario-da-refeicao')
    lastFed.on("value",(data) =>{
      aa = data.val()
    })
    console.log(aa)
    push()
    stroke("black")
    fill("black")
    text("ultima refeiçao" + aa,100,100)
    pop()
  //write code to display text lastFed time here


  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS -= 1
  horario = hour()
  database.ref('/').update({
    "horario-da-refeicao": horario})
  database.ref('/').update({
    comida: foodS
  })

}

//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    comida: foodS
  })
}
