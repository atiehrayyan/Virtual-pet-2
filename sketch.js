//Create variables here
var dog , happyDog;
var database;
var foodS , foodStock;
var feedTime,lastFeed;
var feed,addFood;
var foodObj;

function preload(){
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database
  createCanvas(500, 500);

  foodObj = new Food();
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20);
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFeed=data.val();
  });
  
  fill(255,255,254);
  textSize(15);
  if(lastFeed>=12){
    text("Last Feed : "+ lastFeed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFeed + " AM", 350,30);
   }

   /*
  stroke("black");
  text("Food remaining :"+foodS,170,200);
  textSize(13);
  text("Note: press UP_ARROW key to feed Drago Milk!",130,10,300,20);
   */
  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

/*Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
} 
*/

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


