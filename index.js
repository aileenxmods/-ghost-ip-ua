/*
 * Creator: Ghostxmods
 * T.me/GXDDoS
*/

const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&proxy_format=ipport&format=text';

async function fetchProxies() {
    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const proxies = response.data.trim().split('\n');
            return proxies;
        } else {
            console.error('Failed to fetch proxies:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching proxies:', error.message);
        return [];
    }
}

async function ghostproxy(filename) {
    const proxies = await fetchProxies();
    return new Promise((resolve, reject) => {
        if (proxies.length > 0) {
            const data = proxies.join('\n');
            fs.writeFile(filename, data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filename);
                }
            });
        } else {
            reject(new Error('No proxies fetched.'));
        }
    });
}

async function ghostua(filename) {
    try {
        const userAgentURL = 'https://raw.githubusercontent.com/craeckor/user-agent-scraper/main/curl-user-agents.txt';

        const response = await axios.get(userAgentURL);
        const userAgentList = response.data.split('\n');
        fs.writeFileSync(filename, userAgentList.join('\n'));
        console.log(`User agents saved to ${filename}`);

    } catch (error) {
        console.error('Error scraping user agents:', error.message);
        throw error;
    }
}

module.exports = {
    ghostproxy,
    ghostua
};

