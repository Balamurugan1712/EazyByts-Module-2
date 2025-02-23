let portfolio = {};
let stockPrices = {
    AAPL: 145,  // Example stock prices
    TSLA: 650,
    GOOGL: 2750
};

document.getElementById("trading-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const stockSymbol = document.getElementById("stock").value.toUpperCase();
    const quantity = parseInt(document.getElementById("quantity").value);

    if (stockSymbol && quantity) {
        // Simulate buying the stock
        if (!portfolio[stockSymbol]) {
            portfolio[stockSymbol] = { quantity: 0, purchasePrice: stockPrices[stockSymbol] };
        }
        portfolio[stockSymbol].quantity += quantity;

        // Update trading response
        document.getElementById("trading-response").innerHTML = `You bought ${quantity} shares of ${stockSymbol}.`;

        // Update portfolio info
        updatePortfolio();
        updatePerformance();
    }
});

// Update the portfolio section
function updatePortfolio() {
    const portfolioInfo = document.getElementById("portfolio-info");
    let portfolioText = "<h3>Your Portfolio:</h3>";

    if (Object.keys(portfolio).length === 0) {
        portfolioText += "<p>No stocks purchased yet.</p>";
    } else {
        Object.keys(portfolio).forEach(stock => {
            const stockInfo = portfolio[stock];
            portfolioText += `<p>${stock}: ${stockInfo.quantity} shares</p>`;
        });
    }

    portfolioInfo.innerHTML = portfolioText;
}

// Update the performance section
function updatePerformance() {
    const performanceInfo = document.getElementById("performance-info");
    let performanceText = "<h3>Portfolio Performance:</h3>";
    let totalValue = 0;
    let totalInvested = 0;

    if (Object.keys(portfolio).length === 0) {
        performanceText += "<p>No performance data available.</p>";
    } else {
        Object.keys(portfolio).forEach(stock => {
            const stockInfo = portfolio[stock];
            const currentPrice = stockPrices[stock];
            const stockValue = currentPrice * stockInfo.quantity;
            const investedAmount = stockInfo.purchasePrice * stockInfo.quantity;

            totalValue += stockValue;
            totalInvested += investedAmount;

            performanceText += `<p>${stock}: 
                                    ${stockInfo.quantity} shares at $${currentPrice} 
                                    (Invested: $${investedAmount.toFixed(2)}, Current: $${stockValue.toFixed(2)})</p>`;
        });

        const profitLoss = totalValue - totalInvested;
        performanceText += `<h3>Total Portfolio Value: $${totalValue.toFixed(2)}</h3>`;
        performanceText += `<h3>Total Invested: $${totalInvested.toFixed(2)}</h3>`;
        performanceText += `<h3>Profit/Loss: $${profitLoss.toFixed(2)}</h3>`;
    }

    performanceInfo.innerHTML = performanceText;
}
