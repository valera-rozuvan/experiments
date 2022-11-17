As you probably know, there exists a mighty function in the JavaScript world

    console.log();

To a JS developer it is a godsend - output messages, variable values, objects,
etc. to the in-browser console.

However, not all browsers support this function and/or provide a console. Also,
sometimes you don't want to switch to the console back and forth to check if
something was logged there. For this, a custom function was written

    logme();

It performs 2 main tasks

1. Checks if the console is available, and sends log info there.
2. Stores the log info for future use.

Now, the stored log info can be accessed whenever you want. I have decided to
make it available via 2 methods

1. Whenever `logme()` is called.
2. On [Ctrl+Click] event, triggered anywehere on the empty part of a page.

See the Example below to get a further feel for it.
