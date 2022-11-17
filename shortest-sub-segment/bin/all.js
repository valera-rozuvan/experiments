jQuery.noConflict();

(function ($, undefined) {
  var searchForm, submitBtn, resetBtn, inputText, outputText,

    // Return status constants.
    LINES_LESS_THAN_THREE      = 0,
    NUM_SEARCH_WORDS_INVALID   = 1,
    SEARCH_WORDS_LESS_THAN_ONE = 2,
    NUM_SEARCH_WORDS_MISMATCH  = 3,
    INPUT_OK                   = 4,

    state = {
      searchText: '',
      numSearchWords: 0,
      searchWords: []
    };

  $(document).ready(init);

  return;

  function init() {
    searchForm = $('form[name="search_form"]');
    searchForm.submit(submitForm);

    submitBtn = searchForm.find('input[type="submit"]');
    submitBtn.on('click', submitBtnClick);

    resetBtn = searchForm.find('input[type="reset"]');
    resetBtn.on('click', resetBtnClick);

    inputText = searchForm.find('textarea[name="input_text"]');
    outputText = searchForm.find('textarea[name="output_text"]');
  }

  // In reality, this callback method will never be called. The submit
  // button has a handler attached which prevents the default action - the
  // submission of the form.
  //
  // But just in case we will later rewrite things, keep this method for now.
  function submitForm(e) {
    e.preventDefault();
  }

  function submitBtnClick(e) {
    var errStatus;

    e.preventDefault();

    errStatus = parseRawText();
    if (errStatus !== INPUT_OK) {
      outputError(errStatus);
    }

    stripUnwantedChars();

    writeTextToOuput(state.searchText);
  }

  function resetBtnClick(e) {
    e.preventDefault();

    inputText.val('');
  }

  function getRawText() {
    return inputText.val();
  }

  function allowAlphaAndSpace(text) {
    // We only allow a-z, A-Z, and space characters.
    return text.replace(/[^A-Za-z\s]/g, '');
  }

  function allowOnlyAlpha(text) {
    // We only allow a-z, and A-Z characters.
    return text.replace(/[^A-Za-z]/g, '');
  }

  function replaceMultipleSpacesWithOne(text) {
    // Multiple consequent spaces will be replaced with 1 space.
    return text.replace(/\s{2,}/g, ' ');
  }

  function stripUnwantedChars() {
    state.searchText = allowAlphaAndSpace(state.searchText);
    state.searchText = replaceMultipleSpacesWithOne(state.searchText);

    $.each(state.searchWords, function (index, word) {
      state.searchWords[index] = allowOnlyAlpha(
          state.searchWords[index]
      );
    });
  }

  function parseRawText() {
    var rawText, tempLines, searchText, numSearchWords;

    // Get the raw text.
    rawText = getRawText();
    tempLines = rawText.split('\n');

    if (tempLines.length < 3) {
      return LINES_LESS_THAN_THREE;
    }

    // The first line of test is the one that we will be search in.
    searchText = tempLines.shift();

    // The second line of text contains the number of search words.
    numSearchWords = parseInt(tempLines.shift(), 10);

    if (!isFinite(numSearchWords)) {
      return NUM_SEARCH_WORDS_INVALID;
    }

    if (numSearchWords < 1) {
      return SEARCH_WORDS_LESS_THAN_ONE;
    }

    // The rest of the lines contain search words, one word per line.
    if (numSearchWords != tempLines.length) {
      return NUM_SEARCH_WORDS_MISMATCH;
    }

    // Store the parsed data.
    state.searchText = searchText;
    state.numSearchWords = numSearchWords;
    state.searchWords = tempLines;

    return INPUT_OK;
  }

  function outputError(errStatus) {
    var e = '[ERROR]: ';

    switch (errStatus) {
      case LINES_LESS_THAN_THREE:
        writeTextToOuput(e + 'Input is less than 3 lines!');
        break;

      case NUM_SEARCH_WORDS_INVALID:
        writeTextToOuput(e + 'Number of search words is invalid!');
        break;

      case SEARCH_WORDS_LESS_THAN_ONE:
        writeTextToOuput(e + 'Number of search words less than 1!');
        break;

      case NUM_SEARCH_WORDS_MISMATCH:
        writeTextToOuput(
          e + 'Number of search words does not match ' +
          'actual number of lines with search words!'
        );
        break;

      default:
        writeTextToOuput(e + 'Something went wrong!');
        break;
    }

    throw '"output error"';
  }

  function writeTextToOuput(text) {
    outputText.val(text);
  }


  // Work in progress beyond this point.


  // Get a string of text. Transform it into an array of charaters.
  function textToCharArray(text) {
    var charAr;

    charAr = text.split('');

    return charAr;
  }

  // Get an array of words. Each word is an array of characters. Get a string of text. The string is an array of
  // characters. Get a starting point.
  //
  // Check if one of the words is located in the string positioned at the starting point.
  //
  // Return an object containing two properties:
  //
  //   num_word: the number of the word which was found; null if no word was found at the starting point.
  //   next_starting_point: the index of the start of next word. -1 if the end of the string was reached
  function (words, text, startIndex) {
    var possibleMatches = [],
      match = null,
      sumPossM = 0,
      retVal = {
        num_word: null,
        next_starting_point: -1
      },
      c1, c2, c3;

    for (c1 = 0; c1 < words.length; c1 += 1) {
      possibleMatches.push(1);
    }

    c2 = 0;
    for (c1 = startIndex; c1 < text.length; c1 += 1) {
      for (c3 = 0; c3 < words.length; c3 += 1) {
        if (possibleMatches[c3] === 0) {
          continue;
        }

        if (words[c3].length <= c2) {
          possibleMatches[c3] = 0;

          continue;
        }

        if (words[c3][c2] !== text[c1]) {
          possibleMatches[c3] = 0;
        }
      }

      c2 += 1;
    }

    for (c2 = c1; c2 < text.length; c2 += 1) {
      if (text[c2] !== ' ') {
        break;
      }
    }

    for (c1 = 0; c1 < possibleMatches.length; c1 += 1) {
      if (possibleMatches[c1] === 1) {
        match = c1;
      }

      sumPossM += possibleMatches[c1];
    }

    if (match !== null && sumPossM === 1) {
      retVal.num_word = match;
    }

    if (c2 < text.length) {
      retVal.next_starting_point = c2;
    }

    return retVal;
  }
}(jQuery));
