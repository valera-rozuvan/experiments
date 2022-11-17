// Valera Rozuvan
// 05.06.2013

var minNumber = 1000, // All numbers found must be higher than this number.
    findNNumbers = 5, // How many numbers to find.
    number, // We store in memory only one found number at a time.
    c1, // Used as a counter in the for-loop.
    MAX_ITER = 1000, // The limit of iterations to do. This will be set to correct limit, once the firstnumber is found.
    foundFirst = false; // Flag will be set to true when the first number is found.

$('#output').append('New version: <br />');

// We find initial number by using the logarithm.
number = Math.pow(2, Math.ceil(Math.log(minNumber) / Math.log(2)));

for (c1 = 0; c1 < findNNumbers; c1 += 1, number *= 2) {
    $('#output').append(number + ' ');
}

$('#output').append('<br /><br />Old version: <br />');

// We start with the lowest number that is a power of 2.
number = 2;

for (c1 = 1; c1 < MAX_ITER; c1 += 1, number *= 2) {
    if ((number > minNumber) && (foundFirst === false)) {
        MAX_ITER = c1 + findNNumbers;
        foundFirst = true;
    }
    if (foundFirst === true) {
        $('#output').append(number + ' ');
    }
}
