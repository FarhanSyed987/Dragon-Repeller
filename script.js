let xp=0;
let health=100;
let gold=50;
let currentWeapon=0;
let fighting;
let inventory=["stick"];
let monsterHealth;

const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText");
const monsterNameText=document.querySelector("#monsterName");
const monsterStats=document.querySelector("#monsterStats");
const monsterHealthText=document.querySelector("#monsterHealth");

const monsters=[
    {
        name:"Slime",
        level:2,
        health:15
    },
    {
        name:"Fanged Beast",
        level:8,
        health:60
    },
    {
        name:"Dragon",
        level:20,
        health:300
    }
]

const weapons=[
    {
        name: "Stick",
        power: 5
    },
    {
        name: "Dagger",
        power: 30
    },
    {
        name: "Claw Hammer",
        power: 50
    },
    {
        name: "Sword",
        power: 100
    }
]
const locations=[
    {
        name: "Town Square",
        "button text": ["Go to store","Go to cave","Fight Dragons"],
        "button function": [goStore,goCave,fightDragon],
        text: "You are in town square."
    },
    {
        name: "Store",
        "button text": ["Buy 10 health (10 golds)","Buy weapon (30 golds)","Go to Town Square"],
        "button function": [buyHealth,buyWeapon,goTown],
        text: "You are in store."
    },
    {
        name: "Cave",
        "button text": ["Fight Slime","Fight the flanged beast","Go to Town Square"],
        "button function": [fightSlime,fightBeast,goTown],
        text: "You entered the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack","Dodge","Run"],
        "button function": [attack,dodge,goTown]
    },
    {
        name: "kill monster",
        "button text": ["Run to town","Run to town","Run to town"],
        "button function": [goTown,goTown,easterEgg],
        text: "The monster dies! You won!! You gained xp and golds."
    },
    {
        name: "lose",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button function": [restart,restart,restart],
        text: "You died!"
    },
    {
        name: "win",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button function": [restart,restart,restart],
        text: "You defeated the DRAGON!!! YOU WON THE GAME!"
    },
    {
        name: "easterEgg",
        "button text": ["2","8","Go to Town Square"],
        "button function": [pickTwo,pickEight,goTown],
        text: "You found a secret game! Pick a number. Numbers will be randomly choosen between 0 and 10. If your number matches with one of the random number, you win"
    }
]

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function update(locations){
    button1.innerText=locations["button text"][0];
    button2.innerText=locations["button text"][1];
    button3.innerText=locations["button text"][2];
    button1.onclick=locations["button function"][0];
    button2.onclick=locations["button function"][1];
    button3.onclick=locations["button function"][2];
    text.innerText=locations.text;
}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function buyHealth(){
    if (gold>=10){
        gold-=10;
        health+=10;
        goldText.innerText=gold;
        healthText.innerText=health;
    }
    else{
        text.innerText="You do not have enough gold to buy health";
    }
}

function buyWeapon(){
    if (currentWeapon<3){
        if (gold>=30){
            gold-=30;
            currentWeapon++;
            goldText.innerText=gold;
            let newWeapon=weapons[currentWeapon].name;
            text.innerText="You now have a "+ newWeapon+".";
            inventory.push(newWeapon);
            text.innerText+= " In your inventory you have "+ inventory;
        }
        else{
            text.innerText="You do not have enough gold for a newer weapon";
        }
    }
    else {
        text.innerText="You already have all the weapon in your inventory.";
        button2.innerText="Sell weapon for 20 golds";
        button2.onclick=sellWeapon;
    }
}

function sellWeapon(){
    if (inventory>1){
        gold+=20;
        goldText.innerText=gold;
        let currentWeapon=inventory.shift();
        text.innerText="You sold a "+ currentWeapon+ ".";
        text.innerText+=" In you inventory you have: "+ inventory;
    } 
    else{
        text.innerText("Dont sell your only weapon!");
    } 
}

function fightSlime(){
    fighting=0;
    goFight(); 
}
function fightBeast(){
    fighting=1;
    goFight(); 

}
function fightDragon(){
    fighting=2;
    goFight(); 
}

function goFight(){
    update(locations[3]);
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display="block"
    monsterNameText.innerText=monsters[fighting].name;
    monsterHealthText.innerText=monsters[fighting].health;
}

function attack(){
    text.innerText="The "+monsters[fighting].name+" attacks.";
    text.innerText=" You attack it with your "+weapons[currentWeapon].name+"."; 
    health-=getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()){
        monsterHealth-=weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    }
    else{
        text.innerText+=" You missed.";
    }
    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if (health<=0){
        lost();
    }
    else if(monsterHealth<=0){
        (fighting===2)? winGame():defeatMonster();
    }

    if (Math.random<0.1  && inventory.length!==1){
        text.innerText+=" Your "+inventory.pop()+" breaks.";
        currentWeapon--;
    }
}

function isMonsterHit(){
    return Math.random()>0.2 || health<20;
}

function getMonsterAttackValue(level){
    let hit=(level*5)-(Math.floor(Math.random()*xp));
    console.log(hit);
    return hit;
}

function dodge(){
    text.innerText="You dodged the attack from "+monsters[fighting].name+".";
}

function lost(){
    update(locations[5]);

}

function winGame(){
    update(locations[6]);

}

function defeatMonster(){
    gold+=Math.floor(monsters[fighting].level*10);
    xp+=monsters[fighting].level;
    goldText.innerText=gold;
    xpText.innerText=xp;
    update(locations[4])
}

function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory=["stick"];
    goldText.innerText=gold;
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown();
}

function easterEgg(){
    update(locations[7]);
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}

function pick(guess){
    let numbers=[];
    while (numbers.length<10){
        numbers.push(Math.floor(Math.random()*11));
    }
    text.innerText=" You picked "+guess+". Here are the random numbers:\n"
    for (let i=0;i<10;i++){
        text.innerText+=numbers[i]+"\n";
    }
    if (numbers.indexOf(guess)!==-1){
        text.innerText=" Right! You won 30 golds";
        gold+=30;
        goldText.innerText=gold;
    }
    else{
        text.innerText=" Wrong! You lost 10 health";
        health-=10;
        healthText.innerText=health;
    }
}