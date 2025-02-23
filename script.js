function getStockData() {
    const symbol = document.getElementById("symbol").value.trim();
    const apiKey = 'YOUR_ALPHAVANTAGE_API_KEY'; // Replace with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

    if (!symbol) {
        alert("Please enter a stock symbol.");
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data['Time Series (1min)']) {
                const latestData = data['Time Series (1min)'];
                const latestTimestamp = Object.keys(latestData)[0];
                const stockData = latestData[latestTimestamp];

                const stockName = symbol.toUpperCase();
                const stockPrice = stockData['4. close'];
                const stockChange = ((stockPrice - stockData['1. open']) / stockData['1. open']) * 100;

                document.getElementById("stockName").innerText = `Stock: ${stockName}`;
                document.getElementById("stockPrice").innerText = `Price: $${parseFloat(stockPrice).toFixed(2)}`;
                document.getElementById("stockChange").innerText = `Change: ${stockChange.toFixed(2)}%`;

                const stockChangeElement = document.getElementById("stockChange");
                if (stockChange > 0) {
                    stockChangeElement.classList.add('up');
                    stockChangeElement.classList.remove('down');
                } else if (stockChange < 0) {
                    stockChangeElement.classList.add('down');
                    stockChangeElement.classList.remove('up');
                } else {
                    stockChangeElement.classList.remove('up', 'down');
                }
            } else {
                alert("Error fetching data. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error fetching data. Please try again.");
        });
}
