/*
 * Author: Valera Rozuvan
 * Date: 10.10.2013
 *
 * An example of function to check for looping chains.
 */

var chain1 = [
        {next: null, data: 'a1'},
        {next: null, data: 'a2'},
        {next: null, data: 'a3'},
        {next: null, data: 'a4'},
        {next: null, data: 'a5'}
    ],
    chain2 = [
        {next: null, data: 'b1'},
        {next: null, data: 'b2'},
        {next: null, data: 'b3'},
        {next: null, data: 'b4'}
    ],
    c1;

// First we will create a chain that does not loop.
for (c1 = 0; c1 < chain1.length - 1; c1 += 1) {
    chain1[c1].next = chain1[c1 + 1];
}

// Now create a looping chain.
for (c1 = 0; c1 < chain2.length - 1; c1 += 1) {
    chain2[c1].next = chain2[c1 + 1];
}
chain2[c1].next = chain2[0];

// You can inspect both chains in the browsers console.
console.log(chain1[0]);
console.log(chain2[0]);

// And now we will figure out which chain loops and which does not.
$('#output').append('chain1 loops: ' + chainLoops(chain1[0]).toString() + '<br />');
$('#output').append('chain2 loops: ' + chainLoops(chain2[0]).toString() + '<br />');

return;

/*
 * This function accepts an object which has a property `next`. The `next`
 * property points to a next object in a chain, or is `null`.
 *
 * There are two types of chains. The first type is a chain with the last element
 * having the `next` property set to `null`. The second type is a chain with the
 * last element linked to the first element (the last element has property `next`
 * pointing to the first element).
 *
 * Returns `false` if element belongs to a chain of first type.
 * Returns `true` if element belongs to a chain of second type (chain loops).
 *
 * The parameter `firstTime` must be truthy when the function is invoked from
 * within itself, and vice versa.
 */
function chainLoops(element, selfInvoked) {
    var result;

    if (!selfInvoked) {
        element.isNeedle = true;
    }

    if (element.next === null) {
        result = false;
    } else if (selfInvoked && element.hasOwnProperty('isNeedle') && element.isNeedle === true) {
        result = true;
    } else {
        result = chainLoops(element.next, true);
    }

    if (!selfInvoked) {
        delete element.isNeedle;
    }

    return result;
}
