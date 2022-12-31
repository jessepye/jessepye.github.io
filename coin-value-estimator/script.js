/*chartJS*/
/*chartjs-plugin-labels*/

var simpleExplanation=document.getElementById("explanation").innerHTML;
var sampleExplanation="Grab a handful of coins, count the number of quarters, dimes, nickels, and pennies, and fill in the values below."

var quarters=150;
var dimes=80;
var nickels=40;
var pennies=200;

const defaultQuarters=150;
const defaultDimes=80;
const defaultNickels=40;
const defaultPennies=200;

const quarterWeight=5.670;
const dimeWeight=2.268;
const nickelWeight=5.000;
const pennyWeight=2.500;

const defaultTotalWeight=defaultQuarters*quarterWeight+defaultDimes*dimeWeight+defaultNickels*nickelWeight+defaultPennies*pennyWeight;

var numberChart = new Chart(document.getElementById("numberChart"), {
    type: 'doughnut',
    data: {
        labels: ["Quarters", "Dimes", "Nickels", "Pennies"],
        datasets: [
            {
                label: "Number of Coins",
                backgroundColor: ["#4ea5dd", "#d793db","#3cba9f","#e8c3b9","#c45850"],
                //data: [quarters,dimes,nickels,pennies]
                data: []
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Number of coins'
        },
        plugins: {
            labels: {
                render: 'value',
            },
            precision: 2
        }
    }
});
var weightChart = new Chart(document.getElementById("weightChart"), {
    type: 'doughnut',
    data: {
        labels: ["Quarters", "Dimes", "Nickels", "Pennies"],
        datasets: [
            {
                label: "Weight of Coins",
                backgroundColor: ["#4ea5dd", "#d793db","#3cba9f","#e8c3b9","#c45850"],
                //data: [150*5.670,80*2.268,40*5.00,200*2.5]
                data: []
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Weight of coins'
        },
        plugins: {
            labels: {
                render: 'value',
            },
        }
    }
});
var valueChart = new Chart(document.getElementById("valueChart"), {
    type: 'doughnut',
    data: {
        labels: ["Quarters", "Dimes", "Nickels", "Pennies"],
        datasets: [
            {
                label: "Value of Coins",
                backgroundColor: ["#4ea5dd", "#d793db","#3cba9f","#e8c3b9","#c45850"],
                //data: [150*0.25,80*0.10,40*0.5,200*0.01]
                data: []
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Value of coins'
        },
        plugins: {
            labels: {
                render: function (args) {
                    return '$' + args.value.toFixed(2);
                }
            }
        }
    }
});

function updateGraphs() {
    document.getElementById("chartArea").style.display = 'inline';

    var coinInputAreaElements=document.getElementById("coinInputArea");

    var estimationType=document.getElementById("typeOfEstimateArea")[0].value;
    var weight=document.getElementById("weightInputArea")[0].value;
    var weightUnits=document.getElementById("weightInputArea")[1].value;
    
    var totalValue=0;
    //make sure to display the weight in the units the user selected
    var unitScalingFactor = 1;

    const ouncesPerPound = 453.59237;

    //Let's make sure that "weight" is always computing using grams
    if(weightUnits=="grams"){
        //We don't have to do anything
    }
    else if(weightUnits=="pounds"){
        weight*=ouncesPerPound;
        unitScalingFactor=1/ouncesPerPound;
    }

    if(estimationType=="simple") {
        var quarterCountEstimate=Math.round(defaultQuarters*weight/defaultTotalWeight);
        var dimeCountEstimate=Math.round(defaultDimes*weight/defaultTotalWeight);
        var nickelCountEstimate=Math.round(defaultNickels*weight/defaultTotalWeight);
        var pennyCountEstimate=Math.round(defaultPennies*weight/defaultTotalWeight);
        numberChart.data.datasets[0]["data"]=[quarterCountEstimate,dimeCountEstimate,nickelCountEstimate,pennyCountEstimate];


        //The *100 inside of Math.round and /100 outside of it allow us to round to 2 decimal places, even though Math.round can only round to integers
        var totalWeightOfQuarters = Math.round(unitScalingFactor*100*(150*5.670)/(150*5.670 + 80*2.268 + 40*5.00 + 200*2.5)*weight)/100;
        var totalWeightOfDimes = Math.round(unitScalingFactor*100*(80*2.268)/(150*5.670 + 80*2.268 + 40*5.00 + 200*2.5)*weight)/100;
        var totalWeightOfNickels = Math.round(unitScalingFactor*100*(40*5.000)/(150*5.670 + 80*2.268 + 40*5.00 + 200*2.5)*weight)/100;
        var totalWeightOfPennies = Math.round(unitScalingFactor*100*(200*2.500)/(150*5.670 + 80*2.268 + 40*5.00 + 200*2.5)*weight)/100;
        weightChart.data.datasets[0]["data"]=[totalWeightOfQuarters,totalWeightOfDimes,totalWeightOfNickels,totalWeightOfPennies];

        var totalValueOfQuarters = Math.round(4*Math.round(100*(defaultQuarters*0.25*weight/defaultTotalWeight))/100)/4;
        var totalValueOfDimes    = Math.round(10*Math.round(100*(defaultDimes*0.10*weight/defaultTotalWeight))/100)/10;
        var totalValueOfNickels  = Math.round(20*Math.round(100*(defaultNickels*0.05*weight/defaultTotalWeight))/100)/20;
        var totalValueOfPennies  = Math.round(100*(defaultPennies*0.01*weight/defaultTotalWeight))/100;
        valueChart.data.datasets[0]["data"]=[totalValueOfQuarters,totalValueOfDimes,totalValueOfNickels,totalValueOfPennies];

        totalValue = totalValueOfQuarters + totalValueOfDimes + totalValueOfNickels + totalValueOfPennies;
    }

    else if(estimationType=="sample") {
        quarters=parseInt(coinInputAreaElements[0].value);
        dimes=parseInt(coinInputAreaElements[1].value);
        nickels=parseInt(coinInputAreaElements[2].value);
        pennies=parseInt(coinInputAreaElements[3].value);

        var totalWeight = quarters*quarterWeight + dimes*dimeWeight + nickels*nickelWeight + pennies*pennyWeight;

        var quarterCountEstimate=Math.round(quarters*weight/totalWeight);
        var dimeCountEstimate=Math.round(dimes*weight/totalWeight);
        var nickelCountEstimate=Math.round(nickels*weight/totalWeight);
        var pennyCountEstimate=Math.round(pennies*weight/totalWeight);
        numberChart.data.datasets[0]["data"]=[quarterCountEstimate,dimeCountEstimate,nickelCountEstimate,pennyCountEstimate];

        //The *100 inside of Math.round and /100 outside of it allow us to round to 2 decimal places, even though Math.round can only round to integers
        var totalWeightOfQuarters = Math.round(unitScalingFactor*100*quarters*quarterWeight*weight/totalWeight)/100;
        var totalWeightOfDimes = Math.round(unitScalingFactor*100*dimes*dimeWeight*weight/totalWeight)/100;
        var totalWeightOfNickels = Math.round(unitScalingFactor*100*nickels*nickelWeight*weight/totalWeight)/100;
        var totalWeightOfPennies = Math.round(unitScalingFactor*100*pennies*pennyWeight*weight/totalWeight)/100;
        weightChart.data.datasets[0]["data"]=[totalWeightOfQuarters,totalWeightOfDimes,totalWeightOfNickels,totalWeightOfPennies];

        var totalValueOfQuarters = Math.round(4*Math.round(100*(quarters*0.25*weight/totalWeight))/100)/4;
        var totalValueOfDimes    = Math.round(10*Math.round(100*(dimes*0.10*weight/totalWeight))/100)/10;
        var totalValueOfNickels  = Math.round(20*Math.round(100*(nickels*0.05*weight/totalWeight))/100)/20;
        var totalValueOfPennies  = Math.round(100*(pennies*0.01*weight/totalWeight))/100;
        valueChart.data.datasets[0]["data"]=[totalValueOfQuarters,totalValueOfDimes,totalValueOfNickels,totalValueOfPennies];

        totalValue = totalValueOfQuarters + totalValueOfDimes + totalValueOfNickels + totalValueOfPennies;
    }


    document.getElementById("finalEstimate").style.display = 'block';
    document.getElementById("finalEstimateParagraph").innerHTML = "Your coins are worth approximately <span id='money'>$"+totalValue.toFixed(2)+"</span>.";

    numberChart.update();
    weightChart.update();
    valueChart.update();
}

function updateInputArea(){
    var estimationType=document.getElementById("typeOfEstimateArea")[0].value;
    if(estimationType=="simple"){
        document.getElementById("coinInputArea").style.display = 'none';
        document.getElementById("explanation").innerHTML = simpleExplanation;
        /*
           var coinInputAreaElements=document.getElementById("coinInputArea");
           coinInputAreaElements[0].value=""
           coinInputAreaElements[1].value=""
           coinInputAreaElements[2].value=""
           coinInputAreaElements[3].value=""
         */
    }
    else if(estimationType=="sample"){
        document.getElementById("coinInputArea").style.display = 'inline';
        document.getElementById("explanation").innerHTML = sampleExplanation;

    }
}
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
}
