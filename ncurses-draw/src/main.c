#include <ncurses.h>

int main(int argc, char *argv[])
{
    initscr();

    WINDOW *win = newwin(10, 20, 1, 1);

    box(win, '*', '*');
    mvwaddch(win, 3, 3, 'H');
    mvwaddstr(win, 4, 3, "Hello, world!");
    touchwin(win);
    wrefresh(win);

    getchar();
    endwin();

    return 0;
}
