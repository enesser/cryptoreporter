/**
 * Data Mapper: provides a mapping between Nomics API and D3.
 */

'use strict';

/**
 * Returns a hierarchal D3 data set from a Nomics REST API response object.
 *
 * @param   {Object}  apiData  [API data from Nomics]
 * @return  {Object}           [hierarchal D3 data]
 */
const map = (apiData) => {

    const data = { 'children': [] };
    const main = data.children;

    apiData.forEach((currency) => {
        // use 24 hour data to track price changes
        if (currency['1d']) {

            // currency information
            const name = currency.currency;
            const price = currency.price;

            // price differences
            const difference = Number.parseFloat(currency['1d'].price_change_pct) * 100;
            const difference_abs = Math.abs(difference);

            main.push({
                name: name,
                group: 'A',
                value: difference_abs,
                difference: difference,
                price: price,
                value_display: difference.toFixed(2)
            });
        }
    });

    return data;
};

module.exports = { map };