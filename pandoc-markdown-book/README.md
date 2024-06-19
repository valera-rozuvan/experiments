# Pandoc Markdown Book

To make this book you will need:

- pandoc v2.7.3
- [pandoc-crossref](https://github.com/lierdakil/pandoc-crossref)
- latex
 
Then run the script for the output you want to build.

```bash
./compile_pdf.sh
```

The script will make a PDF (or HTML or epub) in the build directory.

If you want the ebook available on Kindle you will need to grab the [kindlegen](https://www.amazon.com/gp/feature.html?docId=1000765211). Then feed the epub file to kindlegen and you will have a mobi version of your book.

```bash
./kindlegen ./build/output.epub
```

## License

You are free to use these scripts however you like.

## Other projects used

Many thanks to the [Eisvogel pandoc-latex-template](https://github.com/Wandmalfarbe/pandoc-latex-template) and the [pandoc-crossref](https://github.com/lierdakil/pandoc-crossref) filter.

The background image in `/backgrounds` is from the Eisvogel project.