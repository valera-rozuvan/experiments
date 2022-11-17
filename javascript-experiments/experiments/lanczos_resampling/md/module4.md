To understand how the Lanczos filter can be applied to images, lets consider a
simple example. Suppose we have an image filled with a solid color
RGB(127, 12, 202)
<span style="background-color: rgb(127, 12, 202);">
&nbsp;&nbsp;&nbsp;
</span>
, and we want to use the lanczos filter on it. We will use the filter on each
color layer individually.

First we will define a central reference pixel. It will get a radius vector
\\( \vec{r}\_0 = (0, 0) \\) with a length of \\( | \vec{r}\_0 | = 0 \\). All
other pixels will have a radius vector extended from this central reference
pixel. Obviously, each such radius vector will have a length
\\( | \vec{r} | \\) other than \$0\$.

Next we will define a conversion function which will transform a vector to the
\$x\$ coordinate

\\( x = C( \vec{r} ) = \frac {| \vec{r} |} {L} \times a \\).

The parameter \$L\$ represents the length of a vector that will be mapped to
\$x = a\$.

The final step is to generate a weight for each pixel. More precisely for each
pixel's radius vector. For this, we will use the Lanczos kernel

\\( w_{\vec{r}} = L(C( \vec{r} )) = L(x) \\).

Because of the nature of the Lanczos kernel, pixels that lie farther than
distance \$L\$ from the central pixel will get a weight of \$0\$. Also, the
closer the pixel is to the central pixel, the closer its weight will be to
\$1\$. By definition, the central pixel has a weight of \$1\$, since

\\( L(C(\vec{r}_0)) = L(0) = 1 \\).

Now we can calculate new values of R, G, and B layers for each pixel, where a
pixel is represented by a vector \\( \vec{r} \\)


\$ {
  (R\_text{new} = w\_{vec r} \times R\_text{old}),
  (G\_text{new} = w\_{vec r} \times G\_text{old}),
  (B\_text{new} = w\_{vec r} \times B\_text{old})
:}
\$