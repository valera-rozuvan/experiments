The following commands were done to produce the current state of source tree:

```shell
mkdir book
cd book/
git clone https://gitlab.com/pianomanfrazier/pandoc-markdown-book.git
d pandoc-markdown-book/
cd pandoc-markdown-book/
ls -ahl
code .
sudo aptitude search pandoc-crossref
./compile_pdf.sh 
pandoc --version
./compile_pdf.sh 
sudo aptitude install xelatex
sudo aptitude search xelatex
which xelatex
sudo aptitude install texlive-xetex
which xelatex
./compile_pdf.sh 
sudo aptitude install texlive-fonts-recommended texlive-fonts-extra
./compile_pdf.sh 
git status 
git diff
rm -rf ./example-output.pdf 
git diff
git status 
./compile_pdf.sh 
git status 
./compile_pdf.sh 
git diff templates/eisvogel.latex
./compile_pdf.sh 
```

NOTE: The file `templates/eisvogel.latex` has been modified to make it work with current Linux Mint packages.
