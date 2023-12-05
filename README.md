# CashFlowForecast
A simple cash flow forecasting tool to predict cash flow for the next month.

##Setup
The project contains a HTML file and a JS file. It is simple to setup by cloning the repository directly to your device and opening the HTML file using your browser of choice(preferably Chrome, Edge).

#How It Works
I used a simple approach for the forecasting where I used the average to predict the values for the enxt month. I computed the average values of the income, expenses and net cash flow. I computed the net cash flow per month using the formula _net cash = income - expense_. 
Using this approach, the landing page contains the static historical data provided, represented both in tabular form and using a line graph. To predict the next month's forecast, the *Forecast button* is pressed and the new data values are added to the table and the graph plot. That way, one can visually see the expected income, expenses and net cash flow for the next month.
