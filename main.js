//Financial data
var data = { "financials": [
    {
        "date": "2023-06-04",
        "income": 141990.74,
        "expenses": 61757.28,
        "currency": "KES"
    },
    {
        "date": "2023-07-04",
        "income": 130209.13,
        "expenses": 55640.33,
        "currency": "KES"
    },
    {
        "date": "2023-08-03",
        "income": 140270.46,
        "expenses": 94191.88,
        "currency": "KES"
    },
    {
        "date": "2023-09-02",
        "income": 141455.95,
        "expenses": 96263.1,
        "currency": "KES"
    },
    {
        "date": "2023-10-02",
        "income": 136553.14,
        "expenses": 33351.11,
        "currency": "KES"
    },
    {
        "date": "2023-11-01",
        "income": 123779.05,
        "expenses": 73374.59,
        "currency": "KES"
    }
    ]
}

/***** Populating Table *******/   
var body = document.getElementById("t_body");
//Arrays for plotting graphs
const income_arr = [];
const expenses_arr = [];
const date_arr = [];
const net_arr = [];

for(var i=0; i < data.financials.length; i++){
    //Create row cells
    let row = body.insertRow(i);
    let val_no = row.insertCell(0);
    let val_date = row.insertCell(1);
    let val_currency= row.insertCell(2);
    let val_income = row.insertCell(3);
    let val_expense = row.insertCell(4);
    let val_net = row.insertCell(5);
    //populate the cells
    val_no.innerHTML = i+1;
    val_date.innerHTML = data.financials[i].date;
    val_currency.innerHTML = data.financials[i].currency;
    val_income.innerHTML = data.financials[i].income;
    val_expense.innerHTML = data.financials[i].expenses;
    val_net.innerHTML = Math.round(data.financials[i].income - data.financials[i].expenses);

    //populate date, income and expenses arrays for further use
    date = new Date(data.financials[i].date);
    date_arr.push(date.getMonth());
    //date_arr.push(new Date(data.financials[i].date));
    income_arr.push(data.financials[i].income);
    expenses_arr.push(data.financials[i].expenses);
    net_arr.push(Math.round(data.financials[i].income - data.financials[i].expenses));
}


/***** Data Plotting Function*******/   
function plot_graph(income, expense, net_cash, date, element_id){
    //Income data
    const inc_data = {
        x: date,
        y: income,
        type: "scatter",
        mode: "lines",
        name: "Income"
    };
    //Expenses Data
    const exp_data = {
        x: date,
        y: expense,
        type: "scatter",
        mode: "lines",
        name: "Expenses"
    };
    //Net Cash Data
    const net_data = {
        x: date,
        y: net_cash,
        type: "scatter",
        mode: "lines",
        name: "Net Cash"
    };
    //Layout
    const layout = {
        xaxis: {title: "Months"},
        yaxis: {range: [30000, 160000], title: "Price in KES"},
        height: 400,
        width: 800
    };
    var plot_data = [inc_data, exp_data, net_data];
    Plotly.newPlot(element_id, plot_data, layout);
}

//Line Graph - Historical Financial Data
plot_graph(income_arr,expenses_arr,net_arr,date_arr,'line');

/***** Forecasting Method*******/               
function forecast(){
    let sum_inc = 0;
    let sum_exp = 0;
    let sum_net = 0;

    for(var j = 0; j < income_arr.length; j++){
        sum_inc += income_arr[j];
        sum_exp += expenses_arr[j];
        sum_net += income_arr[j] - expenses_arr[j];
    }
    //Compute average values
    var avg_income = sum_inc / income_arr.length;
    var avg_expenses = sum_exp / expenses_arr.length;
    var exp_net_cash = sum_net / net_arr.length;

    income_arr.push(avg_income);
    expenses_arr.push(avg_expenses);
    date_arr.push(11);
    net_arr.push(exp_net_cash);

    //Replot line graph
    plot_graph(income_arr,expenses_arr,net_arr,date_arr,'line');
    
    //Add new entry to table
    let new_row = body.insertRow(6);
    let new_val_no = new_row.insertCell(0);
    let new_val_date = new_row.insertCell(1);
    let new_val_currency= new_row.insertCell(2);
    let new_val_income = new_row.insertCell(3);
    let new_val_expense = new_row.insertCell(4);
    let new_val_net = new_row.insertCell(5);

    //populate the cells
    new_val_no.innerHTML = 7;
    new_val_date.innerHTML = "2023-12-4";
    new_val_currency.innerHTML = "KES";
    new_val_income.innerHTML = Math.round(avg_income*100)/100;
    new_val_expense.innerHTML = Math.round(avg_expenses*100)/100;
    new_val_net.innerHTML = Math.round(exp_net_cash*100)/100;
}