The Lanczos filter, on its interval, is a product of two sinc functions. The
resulting function is then used as a convolution kernel to resample the input
field. In one dimension, its formula is given by:

\$L(x) = {
  (text{sinc}(x) * text{sinc}(x / a), -a < x < a),
  (0, text{otherwise})
:}\$

with \$a\$ a positive integer, typically \$2\$ or \$3\$, controlling the size
of the kernel. The parameter \$a\$ corresponds to the number of lobes of sinc,
as the normalized sinc has zeros at integers; thus \$a = 1\$ corresponds to
just the (positive) central lobe, while \$a = 2\$ has the central lobe and the
second lobe on each side, which are negative.

In the above, we can expand the sinc terms (for nonzero \$x\$ in the specified
range):

\$text{sinc}(x) * text{sinc}(x / a) =
(a * sin(pi * x) * sin(pi * x / a)) / (pi^2 * x^2)\$

<div
    id="placeholder2"
    style="
        width: 400px;
        height: 400px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;
    "
></div>

<span style="text-decoration: underline;">Figure 2.</span> For any positive
value of \$a\$, the Lanczos window and Lanczos filter are continuous and
differentiable even at the ends where they go to zero. In the case of positive
integer values of \$a\$, both sinc functions go to zero at the edge, so the edge
of the Lanczos filter is zero to second order, which means its derivative is
also continuous, and it is differentiable to second order. Thus integer values
yield a smoother cutoff, with no corner, which is why integers are generally
used. Use the slider below to change \$a\$, and see how the Lanczos kernel
changes.

<div
    style="
        width: 510px;
        height: 20px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;
        margin-top: 30px;
        position: relative;
    "
>
    <div
        id="a_slider_value2"
        style="
            width: 90px;
            position: absolute;
            top: -27px;
            left: 100px;
        "
    ></div>
    <div
        style="
            width: 90px;
            display: inline;
            float: left;
        "
    >\$a_text{min} = 0\$</div>
    <div
        id="a_slider2"
        style="
            width: 300px;
            display: inline;
            float: left;
        "
    ></div>
    <div
        style="
            margin-left: 20px;
            width: 90px;
            display: inline;
            float: left;
        "
    >\$a_text{max} = 5\$</div>
</div>
